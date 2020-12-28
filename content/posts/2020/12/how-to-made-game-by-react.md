---
title: "React で2Dゲームを作る技術"
description: "SmartHR Advent Calendar 2020 用のネタとして、 React で Canvas を使わずにゲームを作る話をします。"
date: "2020-12-21"
tags: ["javascript"]
image: ""
---

これは [SmartHR Advent Calendar 2020]() の21日目のエントリです。

## アバン

ゲームを作るのは楽しい。これは真ですね。だってゲームって作るの楽しいですもんね。  
React を書くのは楽しい。これは真ですね。だって React って書くの楽しいですもんね。  
ということは React でゲームを作る、これは真かつ真ですね。つまりそういうことです。

## やること

ブラウザで動くゲームを作る場合は canvas 要素を使用します。  
JavaScript から DOM API を使って canvas の context を取得してその context に含まれる API でゲームを作っていくことになります。

ただ僕は今猛烈に React でゲームを作りたい気持ちであり、そしてゲームに内に出現するオブジェクトも全て React のコンポーネントとして扱いたいわけです。

ということでこの記事では canvas は使用せずに React っぽさを最大限活かしてゲームを作っていくこととします。  
この記事を読むことで得られる今後の役に立つ知識は特にありませんが、やはり React でゲームを作るときの tips 的なものなら幾許かは得られるかもしれません。ただ一つ大切なことを伝えておくと、ブラウザで動くゲームを作りたいなら普通に canvas で作ることをおすすめします。

## 本題

まずは今回作るゲームの最終形はこんな感じになりますよ、というのを見せます。

![今回作ったゲーム](/images/post/2020/12/how-to-made-game-by-react/00.gif "今回作ったゲーム")

こちらのページで遊べます。 (PC だけだよ)  
[https://react-game-sample.netlify.app/](https://react-game-sample.netlify.app/)

弾がいっぱい飛んでくるのを避けながらこっちも弾を撃って撃退したりできる、そんなやつです。  
なんのことはない2Dゲームですね。キャプチャは gif なのであれですが実際遊ぶと60FPS近辺ではある気がしています。  
あと表示されているものは全て div タグです。

この記事内で全てのコードを詳細に説明はしないので、細かいところが気になった場合はリポジトリを見てください。  
[nabeliwo/react-game-sample: 2D game sample made by React.](https://github.com/nabeliwo/react-game-sample)

### 環境構築

[create-react-app](https://ja.reactjs.org/docs/create-a-new-react-app.html#create-react-app) を使って雛形を作ります。  
create-react-app は一瞬で TypeScript にも対応している環境を用意できるので本当に便利ですね。 create-react-app が依存している react-script がいまいち使いづらいので個人的には実際に運用していくプロダクトでは使わないようにしているのですが、サンプルアプリケーション的なものを作るときは使うようにしています。

```bash
$ npx create-react-app react-game-sample --template typescript
```

作成されたディレクトリに入って `npm start` を叩くとアプリケーションが起動します。 HMR もデフォで対応されていてとても便利。  
`localhost:3000` を開くとこんな感じの画面になります。

![create-react-app を起動したときの画面](/images/post/2020/12/how-to-made-game-by-react/02.png "create-react-app を起動したときの画面")

このおしゃんなトップページは不要なので全ての要素を削除したり CSS のリセットをしたりお好みで linter, formatter を入れたり tsconfig.json を良い感じにしたりして環境を整えつつ、とりあえず Hello, World を表示するだけのまっさらな環境にします。

ここまでで環境構築は終わりです。

### シーンの概念を作る

ゲームにはシーンという概念が存在します。  
例えばゲームを起動すると一番最初に「スタート」とか「設定」とかのボタンが出ている画面があって、「スタート」を押すと画面が切り替わって実際のゲーム画面になって操作ができて、クリアしたりゲームオーバーしたりするとリザルト画面に切り替わって、そんな感じのそれぞれの画面のことをシーンを呼びます。

それぞれのシーンごとに state を持ちつつも、シーンをまたいで共通の state を持ったりできると便利なのでそんな感じの実装にします。  
考えてみるとこれは普通に SPA を作るときのルーティングと同じですね。ゲームのシーンの場合は基本的には URL に追従する必要がない分シンプルかな、みたいな感じです。

実装の話をします。  
SPA でのルーティングの簡易版といった感じなので、以下のように一つの state だけで管理ができます。

```tsx
const Scene = () => {
  const [scene, setScene] = useState<SceneName>('intro')

  const handleClickChangeScene = (name: SceneName) => {
    setScene(name)
  }

  return (
    <div className="container">
      <div className="box">
        {scene === 'intro' && <Intro onClickChangeScene={handleClickChangeScene} />}
        {scene === 'stage' && <Stage onClickChangeScene={handleClickChangeScene} />}
        {scene === 'result' && <Result onClickChangeScene={handleClickChangeScene} />}
      </div>
    </div>
  )
}
```

シーンをまたいで管理する state はこのコンポーネント内で定義して各シーンに props として追加で渡してあげたら良さそうです。

ここまで実装するとこんな感じになります。ここまででシーンの管理の実装ができました。

![シーンのサンプル](/images/post/2020/12/how-to-made-game-by-react/01.gif "シーンのサンプル")

### 画面更新処理を作る

ゲームで画面内に存在する要素が動いているとき、内部的には何が起こっているのかというと、めっちゃ短いスパンで画面内の要素を全て消してもう一度表示してというのを繰り返しています。  
その消して表示する間に全ての要素の位置などの状態を計算して書き換えた上で表示する、ということをしています。

JavaScript において最も簡単にそれを表現するための方法が、 requestAnimationFrame です。

```typescript
const step = () => {
  render() // なにかを表示する処理
  requestAnimationFrame(step)
}

step()
```

requestAnimationFrame の引数に自身の関数を入れて再起的に実行することで step 関数が無限にまわって処理が繰り返されます。  
この例でいうと render 関数の中でゲームの状態を計算して画面を更新する処理を作れば常に要素が動き続けるようになります。

ただ requestAnimationFrame が処理を繰り返し実行する頻度はブラウザを表示しているディスプレイのリフレッシュレートに依存するので、仮にとても軽い処理を requestAnimationFrame で実行する場合は、ディスプレイのリフレッシュレートが144Hzだった場合1秒間に144回実行され、ディスプレイのリフレッシュレートが30Hzだった場合は1秒間に30回実行されます。

なのでそれを考慮した実装にしないとディスプレイによって動きが全然違うように見えてしまうかもしれません。

そこでどんなディスプレイでも近い動きをさせるために使用するのが setTimeout です。

```typescript
const step = () => {
  render() // なにかを表示する処理
  setTimeout(step, 16)
}

step()
```

setTimeout は requestAnimationFrame と違ってこちらで繰り返しの間隔を指定できます。  
本来は setTimeout は「指定したミリ秒後に渡したコールバック関数を実行する」という関数なのですが、そのコールバック関数の中でまた setTimeout を呼ぶことで繰り返し処理を実現できます。

ちなみに例として書いている16という数字は、16ミリ秒に1回処理を呼ぶということを示していて、16ミリ秒に1回というのは60FPSを実現するための数字です。16ミリ秒に1度画面を更新すれば1秒間に60回画面を更新できる計算です。

setTimeout よりもシンプルに繰り返しの間隔を指定しつつ繰り返し処理を実現できる setInterval という関数も存在するのですが、 setTimeout とは繰り返しの時間の開始タイミングが違って、その結果繰り返し処理が重い場合に処理が終わる前に再度繰り返し処理を実行してしまい不具合が起こることがあるので、重い処理を繰り返す場合は setTimeout を使う方がベターです。  
setTimeout であれば処理が重い場合に繰り返し時間を遅らせることで対応します。

詳しくは MDN をどうぞ。  
[WindowOrWorkerGlobalScope.setInterval() - Web API | MDN](https://developer.mozilla.org/ja/docs/Web/API/WindowOrWorkerGlobalScope/setInterval)

React の場合の話をすると、この繰り返し処理の中で state を更新すれば良さそうです。

```tsx
const Component = () => {
  const [position, setPosition] = useState(0)

  useEffect(() => {
    let req: number

    function step() {
      setPosition((currentPosition) => currentPosition + 1)
      req = requestAnimationFrame(step)
    }

    req = requestAnimationFrame(step)

    return () => {
      cancelAnimationFrame(req)
    }
  }, [])

  return (
    <div className="scene">
      <div className="player" style={{ top: position, left: position }} />
    </div>
  )
}
```

これが React でゲームの画面を更新する最もシンプルな形の処理です。  
useEffect の中で繰り返し処理を実行して、 useEffect の第二引数に空の配列を渡すことでコンポーネントがマウントされた最初に一度だけ繰り返し処理が始まるようになっています。  
useEffect の第一引数で関数を return することでコンポーネントがアンマウントされた時に cancelAnimationFrame が呼ばれて繰り返し処理が止まるようになっています。

:point_down: こんな感じの画面になります。

![react で繰り返し処理で要素が動く様子](/images/post/2020/12/how-to-made-game-by-react/03.gif "react で繰り返し処理で要素が動く様子")

### キーボード操作で要素を動かす

次に画面に存在するキャラクターをキーボード操作で動かせるようにしてみます。  
キーボードを押したことを検知するには keydown というイベントを取得すれば良いのですが、普通に `window.addEventListener('keydown', () => { /* キャラクターの位置の状態を動変える処理 */})` をすると想定通りの動きを実現することはできません。

なぜなのかは実際に動きを見てみるとわかります。  
シンプルに考えるとこのような実装をするかなと思います。

```tsx
export const Component = () => {
  const [x, setX] = useState(0)
  const [y, setY] = useState(0)

  useEffect(() => {
    const handleKeydown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'Up':
        case 'ArrowUp':
        case 'w':
          setY((currentY) => currentY - 1)
          break

        case 'Right':
        case 'ArrowRight':
        case 'd':
          setX((currentX) => currentX + 1)
          break

        case 'Down':
        case 'ArrowDown':
        case 's':
          setY((currentY) => currentY + 1)
          break

        case 'Left':
        case 'ArrowLeft':
        case 'a':
          setX((currentX) => currentX - 1)
          break

        default:
          break
      }
    }

    window.addEventListener('keydown', handleKeydown)

    return () => {
      window.removeEventListener('keydown', handleKeydown)
    }
  }, [])

  return (
    <div className="scene">
      <div className="player" style={{ top: y, left: x }} />
    </div>
  )
}
```

このように keydown で位置を更新していく実装にした場合、挙動としては以下のようになります。

![動きのイマイチな移動の様子](/images/post/2020/12/how-to-made-game-by-react/04.gif "動きのイマイチな移動の様子")

ちょっと gif だと伝わりにくいと思いますが、右移動から下移動、下移動から右移動に移行する際に一度動きが止まってしまっていることがわかるでしょうか。  
これは決してキー入力する際にあえて止めているわけではなくて、 OS の仕様としてキーを押しっぱなしにして連続キー入力を行う場合は最初の一度目のキー入力の発生と2度目以降のキー入力の発生の間に遅れが生じるようになっています。  
これは普段のタイピングを想像してもらえればわかると思いますが、タイピング中に「a」と押そうとして意図せず「aa」と入力されてしまっては不便なので押しっぱなしによる連続キー入力の判定はあえて2度目以降は遅らせて想定通りのキー入力になるようにしているんですね。

ただこれがゲームを作る上ではとても不便なので、キー入力の取得のやり方を変更する必要があります。  
以下のように、グローバルで keydown と keyup を見て window に紐付けた真偽値を更新させるようにします。

```typescript
window.isKeyDown = {}
window.addEventListener('keydown', (e) => {
  window.isKeyDown[`key_${e.key}`] = true
})
window.addEventListener('keyup', (e) => {
  window.isKeyDown[`key_${e.key}`] = false
})
```
つまり、下アローキーを押している間は `window.isKeyDown.key_ArrowDown` が true になっていて、キーを離すとそれが false になります。  
そしてコンポーネント側では先に説明したアニメーション処理と組み合わせて、現在の `window.isKeyDown` の値を見て常に位置情報を更新し続けるようにします。

```tsx
export const Stage = () => {
  const [x, setX] = useState(0)
  const [y, setY] = useState(0)

  useEffect(() => {
    const { isKeyDown } = window
    let req: number

    function step() {
      if (isKeyDown.key_Up || isKeyDown.key_ArrowUp || isKeyDown.key_w) {
        setY((currentY) => currentY - 1)
      }

      if (isKeyDown.key_Right || isKeyDown.key_ArrowRight || isKeyDown.key_d) {
        setX((currentX) => currentX + 1)
      }

      if (isKeyDown.key_Down || isKeyDown.key_ArrowDown || isKeyDown.key_s) {
        setY((currentY) => currentY + 1)
      }

      if (isKeyDown.key_Left || isKeyDown.key_ArrowLeft || isKeyDown.key_a) {
        setX((currentX) => currentX - 1)
      }

      req = requestAnimationFrame(step)
    }

    req = requestAnimationFrame(step)

    return () => {
      cancelAnimationFrame(req)
    }
  }, [])

  return (
    <div className="scene">
      <div className="player" style={{ top: y, left: x }} />
    </div>
  )
}
```

このようにキー入力が発生する度に更新するのではなく、キーが押されているかどうかの真偽値を見て更新し続ける、という実装にすることによってスムーズな動きになります。  

![スムーズに移動する様子](/images/post/2020/12/how-to-made-game-by-react/05.gif "スムーズに移動する様子")

スムーズになっているのがわかると思います。  
またこれによって、右と下を同時に押すことによって斜めに移動できるようになっています。

### FPS

requestAnimationFrame を使って要素を動かすことができるようになると、今そのゲームがどれくらいの FPS を出せているのかが気になってきますね。  
npm に上がっているパッケージには React アプリケーションの FPS を測ることができるものもあるのですが、実は意外と簡単に FPS 計測器を実装できるので自前で作ってみます。

```tsx
export const Stage = () => {
  const [frameTimeState, setFrameTimeState] = useState({
    fps: 0,
    lastStamp: performance.now(),
    framesCount: 0,
  })

  useEffect(() => {
    let req: number

    function step() {
      setFrameTimeState((current) => {
        const currentStamp = performance.now()
        const shouldUpdateFps = currentStamp - current.lastStamp > 1000

        if (shouldUpdateFps) {
          return {
            fps: current.framesCount,
            lastStamp: currentStamp,
            framesCount: 0,
          }
        } else {
          const newFramesCount = current.framesCount + 1

          return {
            ...current,
            framesCount: newFramesCount,
          }
        }
      })

      req = requestAnimationFrame(step)
    }

    req = requestAnimationFrame(step)

    return () => {
      cancelAnimationFrame(req)
    }
  }, [])

  return (
    <p className="fps">{frameTimeState.fps} FPS</p>
  )
}
```

requestAnimationFrame で呼び出される毎フレーム、今何回目のフレームかという値を更新しています。  
そして `performance.now` で常にタイムスタンプを保存していて、1秒たったところで現在のフレームのカウントを fps として保存しています。  
この実装で、1秒ごとに何回 requestAnimationFrame 内の処理が呼ばれたか、ということがわかります。

`performance.now` は `Date.now` でも問題ないですが、 `performance.now` の方がより精度が高いので使用しています。  
参考 : [performance.now() - Web API | MDN](https://developer.mozilla.org/ja/docs/Web/API/Performance/now)

このように、画面右上の FPS 表示が1秒ごとに更新されているのがわかると思います。

![FPS 計測器](/images/post/2020/12/how-to-made-game-by-react/06.gif "FPS 計測器")

### ゲームの中身を作る

ここまでで、 React でゲームを作る上での事前準備的なものの説明が全てできました。あとは React とは直接関係のないゲームロジックを作っていくだけになります。  
基本的には、ゲーム内で使う状態をコンポーネント内で useState で準備して、 requestAnimationFrame 内でその状態を更新するロジックを実装していくだけです。

ということでできました。

![あっという間にできてしまう](/images/post/2020/12/how-to-made-game-by-react/00.gif "あっという間にできてしまう")

実際ゲームの内容はあんまりこの記事とは関係ないので一気に完成まで飛ばしてしまいました。  
気になった人はソースコードを見ていただければと思います。移動処理とか衝突判定とか2Dゲームあるあるの処理が結構あります。

ゲーム: [https://react-game-sample.netlify.app/](https://react-game-sample.netlify.app/)  
GitHub: [nabeliwo/react-game-sample: 2D game sample made by React.](https://github.com/nabeliwo/react-game-sample)

ゲームのルールとしては、敵に当たるまでの経過時間と敵を倒した数との掛け合わせでポイントが計算されるので、敵に当たった時点のポイントをあげていく、みたいな感じです。

### パフォーマンス改善の話

canvas でゲームを作るときと違って、 React での描画処理が毎フレーム走るので、雑なコードを書いているとすぐに処理が重くなってしまって描画が止まるみたいなことが多々ありました。  
作っている中で出会ったものをいくつか紹介します。

- styled-components に値を渡してスタイルを指定したら一瞬で止まった
  - styled-components で作ったコンポーネントに位置情報を渡して動的にスタイルを指定していたら、描画の度にインスタンスが生成されて大変なことになりました
  - styled-components ではなく style 属性で直接指定することで解決しました
  - (そもそもなぜこんななんのスタイルもないものに styled-components を使ったのか)
- 
- 配列をネストして回すとすぐに止まる
  - 当然の話ですが、1フレームの間にできる処理は限られるので、配列を扱うときは気をつける必要があります
  - 今回で言うと弾と敵(n対n)の衝突判定をする際に、最初は敵の配列を回して一つ一つの敵に対して弾の配列を回して衝突判定をしたところ一瞬で止まりました
  - いくつか対策をしました
    - できる範囲で配列ではなく Map を使う
      - 欲しいものを一発で取れるので
      - とはいえ完全に配列を無くすのは無理
    - ステージのエリアを9つに分けて、違うエリアにいるオブジェクト同士ではそもそも衝突判定が走らないようにした
      - A~I の9エリアに分けて、位置情報を元に弾と敵をエリアで振り分けてそのエリア内で処理をすることで回す必要のある配列の要素数を減らしたりしました

みたいな感じで思ったよりも色んなところでつまづいて結構頭を使いました。

## エピローグ

今回は React でゲームを作る際に特別考えること、みたいなところに焦点をあてて書いてみました。

アドカレに参加したはいいがネタが思いつかなすぎて、ネタがないときは最終的に簡単なゲームを作る、というのが僕の定番パターンなのでこんなことになってしまいました。  
やり切った感がすごいのでクリスマスに思いを馳せながら寝ようと思います。

明日の担当は我らがフロントエンド技術顧問である [koba04](https://twitter.com/koba04) さんです。  
お楽しみに〜〜 :metal:
