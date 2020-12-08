---
title: "React でぬるぬる動くゲームを作る技術"
description: "SmartHR Advent Calendar 2020 用のネタとして、 React で Canvas を使わずにゲームを作る話をします。"
date: "2020-12-21"
tags: ["react"]
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

### 完成形

まずは今回作るゲームの最終形はこんな感じになりますよ、というのを見せます。

TODO: ゲームのリンクとキャプチャの動画的なものを載せる。

なんのことはない2Dゲームですね。一応60FPS維持できているはず。  
この記事内で全てのコードを詳細に説明はしないので、細かいところが気になった場合はリポジトリを見てください。  
[nabeliwo/react-game-sample: 2D game sample made by React.](https://github.com/nabeliwo/react-game-sample)

### 環境構築

[create-react-app](https://ja.reactjs.org/docs/create-a-new-react-app.html#create-react-app) を使って雛形を作ります。  
create-react-app は一瞬で TypeScript にも対応している環境を用意できるので本当に便利ですね。個人的には実際に運用していくプロダクトでは使わないようにしているのですが、サンプルアプリケーション的なものを作るときは常に使うようにしています。

```bash
$ npx create-react-app react-game-sample --template typescript
```

作成されたディレクトリに入って `npm start` を叩くとアプリケーションが起動します。 HMR もデフォで対応されていてとても便利。  
`localhost:3000` を開くとこんな感じの画面になります。

![create-react-app を起動したときの画面](/images/post/2020/12/how-to-made-game-by-react/02.png "create-react-app を起動したときの画面")

このおしゃんなトップページは不要なので全ての要素を削除したり CSS のリセットをしたりお好みで linter, formatter を入れたりして環境を整えつつ、とりあえず Hello, World を表示するだけのまっさらな環境にします。

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



















## エピローグ

明日は我らがフロントエンド技術顧問、 [koba04](https://twitter.com/koba04) さんです。
