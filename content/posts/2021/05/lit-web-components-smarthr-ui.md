---
title: "Lit を使って Web Components で SmartHR UI を再現する"
description: "Lit という Web Components を作るためのパッケージがとても便利っぽかったので試してみた。"
date: "2021-05-12"
tags: ["web-components", "javascript"]
image: ""
---

Lit という Web Components を作るためのパッケージがリリースされました。  
[Lit | Simple. Fast. Web Components.](https://lit.dev/)

全く新しいツールというわけではなく、 [Polymer が新しくなったもの](https://twitter.com/buildWithLit/status/1384572662979043335)のようです。  
実装としては、これまであった `lit-html` と `lit-element` をモノレポ化してまとめたものになっていて、それをベースに実験的な機能が新しく追加されている状態です。

詳しい話は公式ドキュメントを見てみてください。  
また、 [@takanorip](https://twitter.com/takanoripe) さんが書いているこの記事がとてもわかりやすくまとまっています。  
[Introducing "Lit" for Web Components](https://zenn.dev/takanorip/articles/640f9fe9c6c8ca)

## Web Components で UI コンポーネント集を提供したい

今更な話ではありますが、 React でもなく Vue でもなく Web Components で UI コンポーネント集を提供することには大きな意義があります。  
Web Components で提供されたコンポーネントは React からでも Vue からでも、素の HTML からでも自由に使うことができるので、これまで特定の UI ライブラリに縛られて提供していたものが一気にユーザーが広がることになります。

もちろん UI ライブラリはアプリケーションのフロントエンドを素早く、かつ複雑なものをなるべくシンプルに作るために今後も必要なものになりますが、その末端である HTML 要素は Web Components で提供されたコンポーネントに置き換えることができるのではないでしょうか。

という理想論を描いていたので今回実際に試してみようかなと思いこの記事を書いています。

## SmartHR UI を Web Components 化したい

私は SmartHR という会社でエンジニアをやっています。そして SmartHR のフロントエンドは React で統一されています。  
社内の多くのプロダクトで UI を共通化するために [SmartHR UI](https://github.com/kufu/smarthr-ui) という React コンポーネント集を作っており、これを OSS 化しています。

社内では技術スタックを React で統一できているので現在は問題なく SmartHR UI が運用されていますが、今後[プラットフォーム化](https://mag.smarthr.jp/guide/vision/detail/smarthr_next_2018_miyata/)が進み、サードパーティーの SmartHR アプリが作られるような状況になったときに、 SmartHR UI が React を使っていないプロダクトからでも使えるようになっていると、間口が広がって良さそうです。  
また、社内でも今後どんどんプロダクトが増えていったときに React 以外の選択をする可能性もないことはないと思うので、そのようなときに Web Components 版 SmartHR UI があると嬉しいなーと思ってたりします(一人で悶々と考えてるだけのやつです)。

## やってみた

ということで、早速 Lit を使って SmartHR UI に存在するコンポーネントを再現してみました。  
とはいえ SmartHR UI は最近どんどん品質が上がっており、 UI パーツのカスタマイズ性や WAI-ARIA への対応など、これらを完全に再現するのは非常に大変なのでまずは最低限の機能だけを再現することを目指しました。またコンポーネントの数もだいぶ多くなっているので、実装テーマとして面白そうなものを少しだけ抜粋する形にしています。

実際のコードはこちらのリポジトリにあります。  
[nabeliwo/lit-smarthr-ui-sandbox](https://github.com/nabeliwo/lit-smarthr-ui-sandbox)

### Button

![Button Component](/images/post/2021/05/lit-web-components-smarthr-ui/01.png "Button Component")

単体の要素で完結するような、シンプルなコンポーネントはとても簡単に実装できます。  
基本的には見た目の装飾くらいしかやることがないので、スタイルがカプセル化された button タグを作るような感じになります。

theme という attribute を与えて見た目のテーマを変更したり、 size という attribute を与えてボタンの大きさを変更したりなどの工夫ができます。

![Button Component の HTML](/images/post/2021/05/lit-web-components-smarthr-ui/02.png "Button Component の HTML")

このように shadow-root が作られ、この中のスタイルはカプセル化され、外からの影響を受けません。

### Tooltip

![Tooltip Component](/images/post/2021/05/lit-web-components-smarthr-ui/03.png "Tooltip Component")

Tooltip はホバーすることで要素が出現するコンポーネントです。

![Tooltip Component hover](/images/post/2021/05/lit-web-components-smarthr-ui/04.png "Tooltip Component hover")

Button と違って動きはありますが、 hover をフックに CSS だけで完結できるものなので、基本的には実装は簡単です。  
ただ、 SmartHR UI の Tooltip における吹き出しの部分は `ReactDOM.createPortal` を使って実装されています。理由としては、 Tooltip が `overflow: hidden` なボックスの中に配置された場合に、吹き出し部分だけボックスをはみ出るような状況になったときに親要素の `overflow: hidden` によって吹き出しが見切れてしまう問題が起きたので、 `ReactDOM.createPortal` を使って body 内の最後に要素を追加して吹き出しを出現させるという方法をとっているためです。  
これと同じ手法を Lit で実現する方法が、僕が調べた限りでは見つかりませんでした。

そのため上記の問題は残ってしまうので `ReactDOM.createPortal` が必要となる処理の完全再現は難しそうです。

### Accordion

![Accordion Component](/images/post/2021/05/lit-web-components-smarthr-ui/05.png "Accordion Component")

SmartHR UI の Accordion の実装は、 `AccordionPanel`, `AccordionPanelItem`, `AccordionPanelTrigger`, `AccordionPanelContent` の4つのコンポーネントに分かれていて、以下のように使う側で組み合わせることで使用できます。

```tsx
import { AccordionPanel, AccordionPanelItem, AccordionPanelTrigger, AccordionPanelContent } from 'smarthr-ui'

const Component = () => (
  <AccordionPanel>
    <AccordionPanelItem name="accordionPanel1">
      <AccordionPanelTrigger>Accordion panel trigger</AccordionPanelTrigger>
      <AccordionPanelContent>Accordion panel content</AccordionPanelContent>
    </AccordionPanelItem>

    <AccordionPanelItem name="accordionPanel2">
      <AccordionPanelTrigger>Accordion panel trigger</AccordionPanelTrigger>
      <AccordionPanelContent>Accordion panel content</AccordionPanelContent>
    </AccordionPanelItem>
  </AccordionPanel>
)
```

今回は簡易な実装として、 `accordion-panel` と `accordion-panel-item` の2つのコンポーネントのみを実装しています。

![Accordion Component の HTML](/images/post/2021/05/lit-web-components-smarthr-ui/06.png "Accordion Component の HTML")

このように複数のコンポーネントによって1つの UI を作るタイプのコンポーネントを作る場合にも、 Lit で実装する際に課題がありました。  
SmartHR UI ではデフォルトだと、同じ AccordionPanel 内にある AccordionPanelItem の場合、一つの AccordionItem が開いた状態で別の AccordionPanelItem を開くと、もともと開いていたものが閉じる仕様になっています。この機能を実現するためには、 AccordionPanel 内で現在の開閉状態を state で持ち、それを `React.createContext` でコンテクストに埋め込み、 AccordionPanelItem でそのコンテクストを抽出して状態を反映させるという処理が必要になります。

このような親と子のコンポーネント間でコンテクストを使って連携するような手法は、現在はシンプルな方法では実現できません。  
今回 Web Components の実装の参考にさせてもらった [Spectrum Web Components](https://opensource.adobe.com/spectrum-web-components/#index) の実装を見てみると、 Accordion 内でカスタムイベントを定義していて、親の Accordion でそのカスタムイベントをリッスンしておいて、子の AccordionItem が開かれた際にはそのコンポーネントからカスタムイベントを発火することで親に要素が開いたことを伝えるような実装をしていました。そして親の Accordion は子として渡されている AccordionItem を保持していて、イベントを発火した子以外の AccordionItem の開閉の属性を閉じる側に変更させます。

だいぶ泥臭いことをしているな～というのが正直な感想で、 Spectrum Web Components への尊敬とつらみの気持ちがこみ上げてきます。

## 課題はたくさん

コンポーネントの追加は全然途中ではあるのですが、 GW が終わってしまいタイムアップなので一旦ここまでとします。  
ここまであげた課題の他にも SmartHR UI を再実装する上でいくつか課題が見つかったので箇条書きしておきます。

- attribute は文字列で渡すことになる
  - HTML から使用されることになるので、 attribute には文字列の値を渡さなければならない
  - Array や Object を文字列化して渡せばコンポーネント側では Array や Object として使用できるが、 HTML 内に Array や Object の文字列を記述するのは実際なかなか厳しいですよね
  - React や Vue のアプリケーションの末端を Web Components にする場合はあまり苦にはならなそうだけど
- attribute に関数を渡すことができない
  - イベントハンドラーを渡して UI パーツ内で起きたイベントに対してなんらかの処理を実行するようなコンポーネントが多く、それらを実現する方法が今は思いついていない
- attribute を定義しても間違った値が渡される場合がある
  - 当たり前だけど HTML から使用されるものなので、 tsx のようにコンポーネント使用時に型で縛ることはできない
  - 想定していない値が attribute に渡される可能性を考慮して丁寧にハンドリングする必要がある

とかとか色々。

## まとめ

言い訳タイムなのですが、 GW 後半の自由研究としてやったので、この記事を書くまでにがっつり時間を取ることができなかったので、調査不足や認識の間違いがあるかもしれません。  
もし間違っていることは書いてしまっていた場合は [Twitter](https://twitter.com/nabeliwo) などで教えていただけますとありがたいです :pray:

React や Vue のコンポーネントを作るときと違い、自分が作っているのは HTML なんだな、というのを強く意識させられたなーというのが感想です。  
最終的に使用される環境が HTML なので JS でごりごりやるような処理を入れるのは結構しんどかったです。

また、これは React や Vue でも同じなのですが、 Spectrum Web Components の実装を見るとキーボード操作への対応のコードが多くを占めており、やっぱり Web Components にしたところでコンポーネントライブラリの最も大変な部分は変わらないんだなーというお気持ちです。

今回は個人の研究レベルでしかないので大した成果が出ていないのですが、もし社内で Web Components の機運が高まったら社内の優秀なエンジニアの手を借りてがっつり進めていくかもしれない。なんてことになったら嬉しいなーーーーー！！なーーーー！！
