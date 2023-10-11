---
title: "React のホバー時のスタイル変更を簡単にレスポンシブ対応させる"
description: "要素にホバーした際のスタイル変更のめんどいあれこれを React で簡単にやっちゃう話です。"
date: "2018-05-13"
tags: ["javascript", "css"]
image: ""
---

要素にホバーした時にスタイルを変更するやり方ってどうやるのって聞かれたら普通に `:hover` っていう擬似クラスに対してスタイルあててそれで終わり簡単でしょみたいな話になるわけですね。

しかしそこでレスポンシブな要素に対してっていう条件がつくとちょっと難しくなってくる。  
`:hover` に対してスタイルを当ててしまうとスマートフォンでタップした際におかしな挙動になる。そこで Media Query を使って PC サイズのときは `:hover`, スマホサイズのときは `:active` に対してスタイルを当てるっていうやり方もあるんだけど、 `:active` という擬似クラスは Android でうまく動かなかったりするのでそれもだめだったりする。  
(そもそも Media Query だと画面サイズ判定なので PC かスマホかという判定に対して不正確という問題もありつつ)

じゃあ今までどうしてたかっていうとわざわざこの対応のために JavaScript を書いてた。  
ユーザーエージェントを見て、 PC だった場合は `mouseEnter` 時に `.hover` というクラスを与えて `mouseLeave` 時にそれを外す。スマホだった場合は `touchStart` 時にクラスを与えて `touchEnd` 時にそれを外す。  
この処理を与えたい要素に対して `.js-hover` みたいなクラスを与えてその要素を取得して一括で処理とかしてた。  
そうすると CSS は `.hover` に対してスタイルをあてるだけで良いので CSS はシンプルに保てる。みたいな。  

それが昔のやり方。ここまでが前提。

## React コンポーネントでどうしようという話

最近はずっと React でクライアントを作っているので、この問題を React コンポーネントではどう解決するかってのを考えてみた。

そもそもとして、一つのコンポーネントに対してレスポンシブ対応させるっていうのが微妙っていう考え方もあったりする。

[CSSレスポンシブデザインをSPAで使うと破滅する](https://scrapbox.io/shokai/CSS%E3%83%AC%E3%82%B9%E3%83%9D%E3%83%B3%E3%82%B7%E3%83%96%E3%83%87%E3%82%B6%E3%82%A4%E3%83%B3%E3%82%92SPA%E3%81%A7%E4%BD%BF%E3%81%86%E3%81%A8%E7%A0%B4%E6%BB%85%E3%81%99%E3%82%8B)

この記事でどういう話をしているかというと、コンポーネントをレスポンシブ化するのは複雑化しすぎるのでもう PC とスマホでコンポーネント別にしちゃおうよっていうそういう主旨。  
この記事を読んだとき、僕が抱えていたコンポーネントのレスポンシブ対応だるすぎる問題に対して「あーもう分けちゃうんで良いんだ、気が楽になったー」となって大分感動した。  
ただまあそれでもどうしてもホバー時のスタイルみたいなとこのためだけに対してだと別コンポーネント用意したくないしそこはなんとかしたいみたいなときもあって、そこを解決したかった。

というわけで作ってみた。

```js
const hoverProvider = WrappedComponent => {
  return class HoverProviderComponent extends React.Component {
    constructor(props) {
      super(props)

      this.state = {
        isHover: false,
      }
    }

    onMouseEnter = e => {
      const { onMouseEnter } = this.props
      if (onMouseEnter) onMouseEnter(e)
      if (isTouchDevice) return
      this.setState({ isHover: true })
    }

    onMouseLeave = e => {
      const { onMouseLeave } = this.props
      if (onMouseLeave) onMouseLeave(e)
      if (isTouchDevice) return
      this.setState({ isHover: false })
    }

    onTouchStart = e => {
      const { onTouchStart } = this.props
      if (onTouchStart) onTouchStart(e)
      if (isMouseDevice) return
      this.setState({ isHover: true })
    }

    onTouchEnd = e => {
      const { onTouchEnd } = this.props
      if (onTouchEnd) onTouchEnd(e)
      if (isMouseDevice) return
      this.setState({ isHover: false })
    }

    render() {
      const { isHover } = this.state
      const { children, className } = this.props

      return (
        <WrappedComponent
          {...this.props}
          className={`${isHover ? 'hover' : ''} ${className || ''}`}
          onMouseEnter={this.onMouseEnter}
          onMouseLeave={this.onMouseLeave}
          onTouchStart={this.onTouchStart}
          onTouchEnd={this.onTouchEnd}
        >
          {children}
        </WrappedComponent>
      )
    }
  }
}
```

これはちょっと前から React 界隈で流行っている [HOC](https://postd.cc/react-higher-order-components-in-depth/) パターンというのを使っている。

で、この関数の使い方はこう。

```js
const Link = hoverProvider(<a href="" className="link">リンク</a>)
```

ホバー時のスタイル変更の処理を与えたい要素を `hoverProvider` に渡すとレスポンシブ対応された `.hover` クラスの着脱機能を持ったコンポーネントが返される。  
これでリンクとかそういう要素全部この関数で包んであげればそれで ok な状態になる。シンプル。

CSS 側はこう。シンプル。

```css
.link {
  color: blue;
}
.link.hover {
  color: green;
}
```

## 解説

この関数に渡されたコンポーネントが `WrappedComponent` という変数に入ってくる。  
で、この `WrappedComponent` に対して `onMouseEnter` などのイベントリスナを登録してあげて state をごにょごにょしてクラスをつけたり消したりしているだけ。

React のイベントリスナの部分のソースを読んでなくてちょっと自信なかったから自分で `isTouchDevice` とか `isMouseDevice` みたいなユーザエージェントの判定処理を用意して、万が一スマホで `onMouseEnter` が呼ばれてしまったときの保険として処理を止めるようにしている。  
けどそこは大丈夫だと思うのでこの部分の処理は外してしまってもいいかも・・・多分・・・。

あと気をつけなきゃいけない点としては `WrappedComponent` に対してすでに `onMouseEnter` とかが貼られている可能性があるので、そこをこっちのイベントハンドラの中でちゃんと呼んであげること。  
同様に `className` もすでに与えられているものがあるかと思うので、それと結合して `hover` を `className` にあてること。

それくらい。

## 終わり

僕の中ではこれで問題がシンプルに解決できたかなと思うけど、「それセンスないだろ」とか「悪手だろ」とか「ここ考慮漏れしてませんかね？」とかあったら [@nabeliwo](https://twitter.com/nabeliwo) に教えていただけると嬉しいです。  
以上 :beer:
