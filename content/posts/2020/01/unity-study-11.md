---
title: "【Unity勉強】11日目：VRChat SDK をいじる"
description: "VRChat への自作ワールドアップロードのやり方がわかったので、 SDK をいじって色々やってみる。"
date: "2020-01-30"
tags: ["unity", "vr"]
image: ""
---

前回は [VRChat](https://www.vrchat.com/) に自分のワールドをあげることができるようになりました。  
なので今回はそのワールド内で VRChat SDK のいろんな機能を使って遊んでみました。

この動画を見ながら真似したのですが、めちゃめちゃわかりやすくて最高でした。  
ありがとうございました :pray:

`youtube:https://www.youtube.com/embed/aYFuF12UZkY`

## 作業メモ

VRCSDK -> Prefabs -> World -> VRCWorld を Scene に置くことで VRChat のワールドになる。

### スイッチでオンオフの切り替えのできる鏡を作る

- VRCSDK -> Prefabs -> World -> VRCMirror を置く
- 3D Object の Cube を置いてこれをスイッチとする
- Cube に VRC_Trigger というコンポーネントを追加する
  - VRC_Trigger を追加すると VRC_Event Handler という Script も追加されるがこれはユーザーが触ることはないので気にしないで良い
- Inspector で VRC_Trigger の add をクリックして表示されるビューで Custom と書いてあるセレクトボタンを見ると色んなトリガーが用意されている
- Actions の + をクリックして表示される Event の中から何かしらを選ぶと、指定したトリガーが起きた際に指定した Event を起こすことができる
  - ここらへん色々種類が多くて難しいので VRCSDK -> Examples -> Scenes の中にあるサンプルの Scene で色々試してみると良い
- スイッチを押すとかやりたい場合はトリガーを onInteract にする
- Actions で SetGameObjectActive を選択するとオブジェクトのオンオフができる
- Receivers に対象とするオブジェクトを渡してあげる
  - 今回は VRCMirror
- Operation は False/True/Toggle とあるので適切なものを選択する

### ワープするドアを作る

- 3D Object の Cube を置いてこれをドアとする
- Cube に VRC_Trigger というコンポーネントを追加する
- Inspector で VRC_Trigger の add をクリックして表示されるビューで Custom と書いてあるセレクトボタンを押して OnAvatarHit を選択する
- Actions は TeleportPlayer を選択する
- TeleportPlayer の場合は Receivers はどこに飛ぶかを選択するものなので、適当に Empty Object を作ってそれを Receivers に入れる
- ドアに触れると Empty Object の位置にテレポートする

### 持てるオブジェクトを作る

- 3D Object の Cube を置く
- Cube に Add Component -> VRC_Pickup をすると持てるようになる
- VRC_Pickup をアタッチすると勝手に Rgidbody もつくので Use Gravity にチェックが入っていることを確認する
- Cube に Add Component -> VRC_Object Sync を追加する。これを追加しないと複数人でプレイするとき Cube の位置がずれる恐れがあるらしい

### アニメーションを作る

- 一つのスイッチを押すと横に回って、別のスイッチを押すと縦に回る Cube を作る
- 3つの Cube を作って、それぞれ Cube, SwitchH, SwitchV とする
- 基本的に一つのオブジェクトには一つの Animation しかあてられない
- 一つのオブジェクトで複数の Animation を管理したい場合は Project で Create -> Animator Controller を使う
- Cube に Animator Controller をアタッチする
- Project -> Create -> Animation で Horizontal, Vertical の2つのアニメーションを作る
  - ループしたい場合は Loop Time にチェックを入れる
- Animator タブをクリックする
  - 右クリック -> Create State -> Empty を作って Idle という名前にする
  - Idle は何も動いていない状態とする
  - Horizontal と Vertical の Animation を Abnimator タブにドラッグ&ドロップする
  - Idle で右クリック -> Make Transition で Idle から Horizontal へ線を引く。この時、 Idle から Horizontal へは線を2本、逆に Horizontal から Idle へ線を一本、合計3本の線を引く
  - Vertical の方も同じように合計3本の線を引く
  - Animator タブ -> Parameters -> + -> Bool で VerticalBool という名前で作る
  - Animator タブ -> Parameters -> + -> Trigger で VerticalTrigger という名前で作る
  - Animator タブ -> Parameters -> + -> Bool で HorizontalBool という名前で作る
  - Animator タブ -> Parameters -> + -> Trigger で HorizontalTrigger という名前で作る
  - Idle の Inspector で Idle -> Vertical に対して Conditions で VerticalBool: true と VerticalTrigger を渡す
  - 同じように Idle の Inspector で Idle -> Horizontal に対して Conditions で HorizontalBool: true と HorizontalTrigger を渡す
  - 逆に Vertical の Inspector で Vertical -> Idle に対して VerticalBool: false を渡す
  - 同じように Horizontal の Inspector で Horizontal -> Idle に対して HorizontalBool: false を渡す
  - ここまでで Idle と Vertical, Horizontal が条件で紐づけられた
- SwitchH, SwitchV に Add Component -> VRC_Trigger -> Add -> OnInteract を選ぶ。 Actions に AnimationBool を渡す。 Receivers は Cube を渡す。
- SwitchH の VRC_Trigger の Variable に HorizontalBool という文字列を入れて(Animation の Parameter)、 Operation を True にする
- SwitchV の VRC_Trigger の Variable に VerticalBool という文字列を入れて(Animation の Parameter)、 Operation を True にする
- これで onInteract が発生した際に Idle から Vertical(もしくは Horizontal) へと Animation の状態が移る
- 実際の Animation の動きを作る
  - Animation を選択して Animation タブを開く
  - 適当な時間のところをクリックして赤い線を置く
  - 録画ボタンを押した後に Cube の Transform の Rotation をいじる
  - そうすると Animation が記録される
  - これを Vertical と Horizontal 両方やる
- 完成した

## 感想

作ったワールドに入って動画を撮ってみたのがこちら。

`youtube:https://www.youtube.com/embed/l7hx1GBkShs`

めちゃめちゃすごい。  
コード何も書いてないのにここまでできてしまって本当にすごい。
