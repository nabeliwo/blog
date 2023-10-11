---
title: "Recoil 触ってみた感想"
description: "技術記事というよりかはただの Recoil を触って思ったことを雑に書く。"
date: "2020-07-30"
tags: ["javascript"]
image: ""
---

[Recoil](https://recoiljs.org/) という React のための state マネジメントライブラリが少し前に話題になりました。  
最近は手が遅くなってしまっていて、ずっと気になりつつも放置していたのですがやっと重い腰をあげて触ってみたのでその感想をまとめておこうと思います。

特に大きなアプリケーションを作ったわけではなく、チュートリアルや公式のサンプルを写経した範囲のみの感想です。

## はじめに

まずこの Recoil が現時点でプロダクトで使えるどうかという話ですが、 **普通に使えません**。

これは決して Recoil の設計や使い勝手がだめとかそういう話ではなく、このリポジトリは [Facebook Experimental](https://github.com/facebookexperimental) という organization で管理されていて、ここは Facebook がまだ本番で使うようなものではない実験的なプロジェクトを公開しつつ開発をする場であり、ここで開発されているライブラリは安定せず突然大幅な変更が入るようなこともあるからです。

あとは Recoil は React v18 で正式になると思われる Concurrent Mode の機能を使用することで性能をフルで発揮できるので、 React v18 がリリースされるまではプロダクトで使うという選択肢は取れないかなと思います(現在の React のバージョンは16系)。

とはいえ触ってみた感じめっちゃ良かったので、来る Concurrent Mode 時代の React アプリケーション設計を考えていく意味でも理解しておくことは良いのかなと思います。

## 参考にした記事

Recoil を知るという意味ではこの記事を読む必要はなく、以下の記事を読むのがめっちゃわかりやすいので良いです。

[Facebook製の新しいステート管理ライブラリ「Recoil」を最速で理解する](https://blog.uhy.ooo/entry/2020-05-16/recoil-first-impression/)

僕の記事はただの感想です。

## atom, selector 感想

グローバルな状態の持ち方は atom と selector という2種類があり、 atom が一番小さい状態の単位で、 selector は atom や他の selector の状態を使用して派生する状態を作ることができます。  
Redux と違ってシングルストアではなく、 React の Context のように使えつつ、グローバルで持てるっていうのがとても使いやすいし、一つの状態の変更によりアプリケーション全体が再描画されることもないのが省エネな設計です。

基本的に API が React の Hooks なので、最近の React に慣れてる人だとインターフェースもとても使いやすいと感じると思います。  
setter のみ、 getter のみを取れる API もあったりと、便利な API もたくさんありました。

また selector は、最初に説明したように atom や他の selector を元に派生の状態を作れるわけですが、 selector が依存している atom や他の selector の値が変わっても、その selector が返す値に変化がない限りはその selector に依存するコンポーネントが再描画されないという特徴があります。  
これは、例えば普通に React の state や Redux のストアの値を切り出してコンポーネントに渡した場合は、コンポーネント内で状態を加工して JSX に渡すことになりますが、その場合は最終的に表示される値が変わらなくても状態自体が変わった場合は再描画されるので、その面では明確なパフォーマンスの差がありそうです。

この基本的な atom と selector の2つだけで中規模くらいなアプリケーションなら便利にシュッと作れそうです。  
ただディレクトリをどう設計するかだったり、 atom, selector をコンポーネントとどう繋ぎ込むかのような設計は使う側でしっかり整備する必要があるので、設計力が問われるかなと思います。

## 非同期処理対応感想

ここまでは序の口で、ここまで話したことだけの機能であれば Recoil 便利だねーで終わるのですが、 Recoil がすごいのは非同期処理の扱いです。

selector は同期的なデータの取得だけでなく、 async 関数を作ることで非同期にデータを扱うことができます。  
なので selector 内で DB からデータを取得する、みたいなことができます。

非同期処理のサンプルはこんな感じです。

```javascript
const currentUserNameQuery = selector({
  key: 'CurrentUserName',
  get: async ({ get }) => {
    const response = await myDBQuery({
      userID: get(currentUserIDState),
    })

    return response.name
  },
})
```

で、コンポーネント側では async かそうでないかを気にする必要なく使用できるっていうのがすごい。

とはいえコンポーネント内で Promise 扱うわけだからデータ取得までの表示とかそういうのどうすんねんみたいな話になるわけですが、そこで React の Concurrent Mode を使います。

こんな感じになります。

```javascript
function MyApp() {
  return (
    <RecoilRoot>
      <React.Suspense fallback={<div>Loading...</div>}>
        <CurrentUserInfo />
      </React.Suspense>
    </RecoilRoot>
  )
}
```

Suspense を使って fallback を表示できます。 useTransition を使ってもっと自由に表示の管理もできますし、ここがとても簡単になりますね。

簡単になると言いつつも、今まで Redux で雑に全てをグローバルで管理してた、みたいなノリの考え方のままだと崩壊するのが間違いないので、 Recoil, Concurrent Mode を使った設計っていうのをしっかり考えていく必要はやっぱりありますねーって感じです。

## 終わり

最初に書いたように Recoil はまだ experimental なのでプロダクトで使えるようなものではないですが、個人の趣味開発で Recoil や React の Concurrent Mode を使った設計を経験しておくのはこれからの React アプリケーションを作って上でとても役に立つと思うので、とりあえずなんか作ってみるかーっていう感想で終わりとします。

ところで、我々の界隈には、「作る」って言葉を頭に思い浮かべたときにはすでに作っているのでそういう言葉はねえんだぜ〜「作った」なら使ってもいいッ！みたいな名言がありますね :innocent:  
(ジョジョファンに殺されそうな雑さ)
