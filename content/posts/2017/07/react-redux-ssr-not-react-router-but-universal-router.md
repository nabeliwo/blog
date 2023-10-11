---
title: "react-routerではなくuniversal-routerでReact + ReduxのSSR + SPAする"
description: "react-routerからuniversal-routerに移行したくなったのでそのときの行程メモ。"
date: "2017-07-04"
tags : ["javascript"]
image: ""
---

[react-router](https://github.com/ReactTraining/react-router)がv4になったことで既存のアプリケーションが完全に壊れて困っちゃった人。いると思います。  
まあでも頑張ればv4でも動くようにできるしv3からマイグレートする系記事もぽつぽつと出ているので、詰んでしまったりv3に居残り続けるみたいな選択にはならないと思いますが。  
しかしそこは今後もドラスティックなメジャーバージョンアップを行うことが予想されるreact-routerなので、この際別のルーティングライブラリを選択してもいいのではないか、みたいな。  
そういうモチベーションで今回の記事を書いてみました。

そしてこの記事ではreact-routerの代わりにuniversal-routerを使います。  

## universal-router is...

[universal-router](https://github.com/kriasoft/universal-router)

名前の通りUniversalなルーターです。クライアントでもサーバーでも動くよっていうあれ。  
githubにmiddleware-styleって書いてある通り、ルーティングのactionでnext()して親から子に順番に処理がまわるみたいな感じ。

APIがシンプルなので覚えることが少なく、react-routerで言うonEnterのタイミングでasyncでデータを取得してコンポーネントを返すみたいなのも簡単に実装できるので割と良かったです。

他にもルーティングのライブラリはいっぱいあるのですが、universal-routerは最近ちらほら名前を聞くので調べてみたら上記の通り簡単に使えそうだなってなったので選んだ次第です。

## 結論

やってみた結果思ったことはこんな感じ。

* **universal-routerを使うということはReduxとhistoryとの繋ぎこみを自分でやるということ**
* **universal-routerを使うということはReactとrouterとの繋ぎこみを自分でやるということ**
* **universal-routerを使うということはhistory毎のscroll位置の保存みたいな泥臭いことを自分でやるということ**
* **まあでも自由を得ることができるのでそれは嬉しいよね**

(ルーターというコンテキストにおいてReduxは全然関係ないけれど、今回はReact + ReduxのSSR + SPA環境においてのルーティングという話なので許してください。)

もうこれ見てやる気を失った方はそっとページを閉じちゃってください…。  
結局のところuniversal-routerが提供するのは本当にただのルーティングなので、URLに対して何をするかってだけなわけで、Reactのことを考えているわけでもないしhistory管理のことを考えてるわけでもないです、当然ですけど。

つまりは、react-routerの代わりだ！わーい！みたいなテンションだと結構辛いよっていう話ですね。  
なのでこれ以降はどうやってReduxでhistory管理するか、どうやってuniversal-routerをReactに繋ぎこむかっていうとこに焦点を当てて話を進めていきます。  
ちなみにscroll位置の保存みたいなのは今回は書きません。

今回の実装の全体は以下のリポジトリで見れます。  
[nabeliwo/react-redux-universal-router-ssr-sample](https://github.com/nabeliwo/react-redux-universal-router-ssr-sample)

## Reduxでhistoryを管理する

SPAを作るにあたり必須なのがhistory管理なわけですが、react-routerを使ってると[react-router-redux](https://github.com/ReactTraining/react-router/tree/master/packages/react-router-redux)も一緒に使うことで特にアプリケーション側で考えることなくhistoryは管理されるしstateにroutingという形で現在のhistoryが渡ってきます。

そういうところを自分で実装することになります。  
勉強になりますね :innocent: わーい

以下の記事がとても参考になりました。  
[An Introduction to the Redux-First Routing Model](https://medium.freecodecamp.org/an-introduction-to-the-redux-first-routing-model-98926ebf53cb)

上記の記事を元に(というかそのまんまに)Reduxでのhistory管理は実装しました。  

**actions/history.js**

```js
export const PUSH = 'HISTORY_PUSH'
export const REPLACE = 'HISTORY_REPLACE'
export const GO = 'HISTORY_GO'
export const GO_BACK = 'HISTORY_GO_BACK'
export const GO_FORWARD = 'HISTORY_GO_FORWARD'
export const LOCATION_CHANGE = 'HISTORY_LOCATION_CHANGE'

export const push = href => ({
  type: PUSH,
  payload: href
})
export const replace = href => ({
  type: REPLACE,
  payload: href
})
export const go = index => ({
  type: GO,
  payload: index
})
export const goBack = () => ({
  type: GO_BACK
})
export const goForward = () => ({
  type: GO_FORWARD
})
export const locationChange = ({ pathname, search, hash }) => ({
  type: LOCATION_CHANGE,
  payload: {
    pathname,
    search,
    hash
  }
})
```

history管理する上で必要なアクションを全て用意します。  
それにプラスして最後にlocationが変わったことをReducerに伝える `locationChange` というActionCreatorを用意しています。

**middlewares/history.js**

```js
const historyMiddleware = history => () => next => action => {
  switch (action.type) {
    case PUSH:
      history.push(action.payload)
      break

    case REPLACE:
      history.replace(action.payload)
      break

    case GO:
      history.go(action.payload)
      break

    case GO_BACK:
      history.goBack()
      break

    case GO_FORWARD:
      history.goForward()
      break

    default:
      return next(action)
  }
}

export default historyMiddleware
```

`actions/history.js` で呼ばれたactionはreducerで処理せずmiddlewareで対応します(基本的にstateの変更はしないため)。  
ここで[history](https://github.com/reacttraining/history)の処理を呼び出してURLを更新します。このmiddlewareに渡されるhistoryはクライアントかサーバーかによってbrowserHistoryだったりmemoryHistoryだったりします。

**reducers/history.js**

```js
const initialState = {
  pathname: '/',
  search: '',
  hash: ''
}

const historyReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOCATION_CHANGE:
      return Object.assign({}, state, action.payload)

    default:
      return state
  }
}

const rootReducer = combineReducers({
  routing: historyReducer
})

export default rootReducer
```

storeで持つhistoryのstateはpathnameとsearchとhasnの値のみになります。  
reducerでは、 `LOCATION_CHANGE` のactionだけ処理します。  

**store/configureStore.js**

```js
export default function configureStore(initialState, history) {
  const middlewares = applyMiddleware(
    historyMiddleware(history)
  )

  return createStore(
    rootReducer,
    initialState,
    compose(middlewares)
  )
}
```

historyのmiddlewareとreducerをstoreに紐づけます。

**components/Link.js**

```js
import { push as pushAction, replace as replaceAction } from '../actions/history'

class Link extends React.Component {
  constructor(props) {
    super(props)
    this._handleClick = this._handleClick.bind(this)
  }

  _handleClick(e) {
    e.preventDefault()

    const { replace, dispatch, to } = this.props

    if (replace) {
      dispatch(replaceAction(to))
    } else {
      dispatch(pushAction(to))
    }
  }

  render() {
    return (
      <a href="" onClick={this._handleClick}>
        {this.props.children}
      </a>
    )
  }
}

export default connect()(Link)
```

react-routerにも存在するLinkってやつを実装します。  
中身としては、historyをpushしたりreplaceするだけです。

**components/App.js**

```js
function dispatchLocationChange(dispatch, location) {
  dispatch(
    locationChange({
      pathname: location.pathname,
      search: location.search,
      hash: location.hash
    })
  )
}

class App extends React.PureComponent {
  constructor(props) {
    super(props)

    const { children, dispatch, history } = this.props

    this.state = { children }

    dispatchLocationChange(dispatch, history.location)
    history.listen(location => dispatchLocationChange(dispatch, location))
  }

  componentWillUpdate(prevProps, prevState) {
    const prevRouter = prevProps.routing
    const currentRouter = this.props.routing

    if (prevRouter.pathname !== currentRouter.pathname || prevRouter.hash !== currentRouter.hash || prevRouter.search !== currentRouter.search) {
      const { router } = this.props

      router.resolve({ path: prevRouter.pathname })
      .then(route => {
        this.setState({
          children: route.component
        })
      })
    }
  }

  render() {
    return React.Children.only(this.state.children)
  }
}

export default connect(state => ({
  routing: state.routing
}))(App)
```

routerがどのコンポーネントを持ってくるかみたいな部分はuniversal-routerの処理なので後述します。  
ルートのコンポーネントであるApp.jsの中でhistoryの変更を監視して、locationに変更があった場合にlocationChangeをdispatchしてstoreのデータを変更します。

っていう流れです。  
Reduxあるあるですが、historyを管理するためだけにファイル数が相当増えるのが厄介ですね…。

## universal-routerをReactに繋ぎこむ

Reduxでのhistory管理ができたので、あとはuniversal-routerをReactに繋ぎこんで、それをReduxと連携させます。  
クライアントとサーバーの両方のエンドポイントを用意する必要もあります。

**router.js**

```js
import Router from 'universal-router'
import routes from './routes'

export default new Router(routes)
```

ここではただインスタンスを作るだけで、実際の設定は別ファイルでやっています。  
ただ、universal-routerのAPIを見ればわかりますが、インスタンス化する際にルーティング時のフックとなる処理を色々挟んだりできるので、そういうことがしたい場合はここに書くことができます。


**routes/index.js**

```js
import home from './home'
import users from './users'

const routes = {
  path: '/',

  children: [
    {
      path: '/',
      action: home
    },
    {
      path: '/users',
      action: users
    }
  ],

  async action({ next }) {
    const route = await next()

    route.title = `${route.title || 'Untitled Page'} - SSR Sample`
    route.description = route.description || ''

    return route
  }
}

export default routes
```

これがuniversal-routerのルーティングの設定になります。  
`/` にアクセスがきた場合は `action` が呼ばれます。 `action` 内にある `next()` では、 `children` の中でさらにルーティングでマッチした要素の `action` を呼び出します。  
async使って同期的に書くことができますね。ちなみに子要素の設定は別のファイルに書いています。

**routes/home/Home.js**

```js
const Home = () => (
  <div>
    <h1>Home</h1>
    <nav>
      <ul>
        <li>
          <Link to="/users">to users</Link>
        </li>
      </ul>
    </nav>
  </div>
)

export default Home
```

**routes/home/index.js**

```js
import Home from './Home'

async function action() {
  return {
    title: 'Home',
    description: 'This is Home page',
    component: <Home />
  }
}

export default action
```

この子要素の中の `action` で実際に表示したいコンポーネントを返したり、ページ毎にtitleやdescriptionを変えたりするための値を渡したりしてます。  
ここでページ内で使いたいデータをフェッチしてコンポーネントに渡すのがベターかと思います。

**client.js**

```js
async function startApp() {
  const initialState = JSON.parse(document.getElementById('initial-state').getAttribute('data-json'))
  const history = createBrowserHistory()
  const store = configureStore(initialState, history)
  const route = await router.resolve({ path: location.pathname })

  render(
    <Provider store={store}>
      <App router={router} history={history}>{route.component}</App>
    </Provider>,
    document.getElementById('app')
  )
}

startApp()
```

クライアントのエンドポイントです。  
storeに渡すhistoryを定義したりとか。そして、 `router.resolve()` に現在のpathを与えて呼び出すことでマッチするコンポーネントを返してくれます。  
そしてそれを `App` に渡すことで適切なコンポーネントを表示します。  
これがuniversal-routerのルーティングのやり方。

**components/App.js**

```js
function dispatchLocationChange(dispatch, location) {
  dispatch(
    locationChange({
      pathname: location.pathname,
      search: location.search,
      hash: location.hash
    })
  )
}

class App extends React.PureComponent {
  constructor(props) {
    super(props)

    const { children, dispatch, history } = this.props

    this.state = { children }

    dispatchLocationChange(dispatch, history.location)
    history.listen(location => dispatchLocationChange(dispatch, location))
  }

  componentWillUpdate(prevProps, prevState) {
    const prevRouter = prevProps.routing
    const currentRouter = this.props.routing

    if (prevRouter.pathname !== currentRouter.pathname || prevRouter.hash !== currentRouter.hash || prevRouter.search !== currentRouter.search) {
      const { router } = this.props

      router.resolve({ path: prevRouter.pathname })
      .then(route => {
        this.setState({
          children: route.component
        })
      })
    }
  }

  render() {
    return React.Children.only(this.state.children)
  }
}

export default connect(state => ({
  routing: state.routing
}))(App)
```

Reduxでのhistory管理のところでも見せたソースですが、universal-routerとの繋ぎこみにおいても重要な部分なので再掲。  
`locationChange` によって `componentWillUpdate` が呼ばれたときに、その変更がroutingの値によるものだった場合、再度 `router.resolve()` を呼び出して、適切なコンポーネントを取得して、自身のstateに渡すことで表示するコンポーネントを変更しています。  
クライアントの処理はこれで終わり。

**server.js**

```js
const app = express()
const PORT = process.env.PORT || 3000

app.use(express.static(path.resolve(__dirname, '../public')))

app.get('*', async (req, res, next) => {
  try {
    const history = createMemoryHistory({ initialEntries: [req.path] })
    const store = configureStore({}, history)
    const route = await router.resolve({
      path: req.path,
      query: req.query
    })
    .catch(err => { throw new Error(err) })

    if (route.redirect) {
      res.redirect(route.status || 302, route.redirect)
      return
    }

    const data = Object.assign({}, route, {
      children: ReactDOM.renderToString(
        <Provider store={store}>
          <App router={router} history={history}>{route.component}</App>
        </Provider>
      ),
      initialState: store.getState()
    })

    const html = ReactDOM.renderToStaticMarkup(<Html {...data} />)
    res.status(route.status || 200)
    res.send(`<!doctype html>${html}`)
  } catch (err) {
    next(err)
  }
})

app.listen(PORT, () => {
  console.info(`The server is running at http://localhost:${PORT}/`)
})

export default app
```

サーバー側はリクエストがきた最初の1回だけ意識すれば良いのでクライアントよりは考え方が簡単になります。  
`router.resolve()` で取得したコンポーネントを `App` に渡して、それをさらに `Html` で包んでクライアントに返却します。  
サーバー側で生成するときは文字列にする必要があるので、 `renderToString` を使用します。

**components/Html.js**

```js
class Html extends React.PureComponent {
  render() {
    const { title, description, children, initialState } = this.props

    return (
      <html>
        <head>
          <meta name="description" content={description} />
          <title>{title}</title>
        </head>
        <body>
          <div id="app" dangerouslySetInnerHTML={{ __html: children }} />
          <script id="initial-state" type="text/plain" data-json={JSON.stringify(initialState)} />
          <script src="/client.js" />
        </body>
      </html>
    )
  }
}

export default Html
```

サーバー側から呼ばれるHTMLの雛形です。  
initialStateをscriptタグ内で保持してます。それをクライアント側で取得することで、サーバー側で生成したstateをクライアントで同期します。

以上です。

## まとめ

ここまでやってようやくSSR + SPAの基盤が作れます。  
react-routerで言うところのonEnterの代替になるものはactionであり、onLeaveに当たるものは存在しないので自分で実装する必要があります。

react-routerを使うと実際こっちが考えることが大分減るので、楽したいのであればreact-routerの今後も行われるであろうドラスティックな変更は許容して、react-router@v4を使っていくのが良いかと思います。  

universal-routerを使うことで得られるメリットとしては、middleware-styleなのでフック挟むのが簡単だったり、あとは本当にAPIがシンプルなのでやりたいことに対して簡単に実装ができます。(ここで言う簡単とはsimpleではなくeasyなのであれですが…)  
ちなみに今回のサンプルのルーティングは本当に基本的なことしか書いてないので、Real Worldではもっともっとここにいろんな処理を挟み込む必要がでてくるかと思います。でもまあそういうのも特に困ることなく書き加えられるかなと思います。

その分こちらの設計力とか処理をきれいに分けたりだとか、考えなきゃいけない領域は広がってしまうのですが、泥臭いことたくさんやる必要あった場合に沼にはまることが少ないのはこちらかなと。

そんな無理矢理メリットをひねり出したまとめでした :joy:  
おわり。
