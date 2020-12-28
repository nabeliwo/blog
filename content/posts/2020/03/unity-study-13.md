---
title: "【Unity勉強】13日目：SteamVR Plugin を使って VR 開発をする"
description: "Unity で SteamVR Plugin を使って簡単に VR 開発をする話。"
date: "2020-03-30"
tags: ["unity", "vr"]
image: ""
---

## お久しぶりです

なんかこの Unity 開発日記、当初の目的は勉強した日のメモだったはずがちょっとはまともなことを書かなきゃな、と思い始めてからある程度作業がまとまったところにいくまで投稿しづらい感じになってしまった。僕の中で。

決して12日目以降何もやってないわけではないんです！やってるけどそんなに投稿するほどのこともないなあ…ってなっちゃってたんです…！  
ということでもうちょっと気軽に投稿していかなきゃな、という気持ちで今回は勉強メモ。

## SteamVR Plugin を使ってみた

SteamVR という、 Steam の VR 環境上で動くゲームを作るためのモジュールを提供しているアセットがあります。  
Valve 社が提供している！公式の！やつ！

[SteamVR Plugin | Integration | Unity Asset Store](https://assetstore.unity.com/packages/tools/integration/steamvr-plugin-32647)

今回はそれを使って HTC Vive で動く簡単なサンプルを作ってみました。  
作ったのはこれ。

<blockquote class="twitter-tweet"><p lang="ja" dir="ltr">テレポートができるようになった <a href="https://t.co/SrGb0cEEfs">pic.twitter.com/SrGb0cEEfs</a></p>&mdash; nabeliwo (@nabeliwo) <a href="https://twitter.com/nabeliwo/status/1245366581711921153?ref_src=twsrc%5Etfw">April 1, 2020</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

オブジェクトを掴んで投げたりできるようにしたのと、テレポートをできるようにした。

## メモ

- アセットストアから SteamVR Plugin をインストールする
  - この際に色々と聞かれるんだけど Accept All する
  - VR 開発をする上での良い感じの設定にしてくれるっぽい
- SteamVR Plugin は、 HTC Vive や Oculus Rift などのハードに依らない実装を提供するために、アクションという抽象化されたレイヤーを作ってそれを各種コントローラのインプットに紐付ける形をとっている
  - なのでまずコントローラの UI を開いて各ボタンに割り当てるアクションを作成して、それをスクリプトから指定する、みたいな流れ
- 位置トラッキング・モーショントラッキングはとても簡単で、 SteamVR Plugin が提供する Prefab の `[CameraRig]` をシーンに置いて再生するだけで HMD とコントローラのトラッキングができる
  - あとは通常の Unity 開発と同じでコントローラとオブジェクトの接触判定をしたりコントローラのトリガーをハンドリングしてオブジェクトと joint したりするだけ
- このチュートリアルのサイトがすごく良かった
  - [HTC Vive Tutorial for Unity | raywenderlich.com](https://www.raywenderlich.com/9189-htc-vive-tutorial-for-unity)
  - ただ最新の Unity と SteamVR Plugin のバージョンだとこのサンプルプロジェクトをダウンロードして開いてもうまく動かなかったので、サンプルプロジェクトは使わずに自分で1から作ってコードとかだけ真似した

## おわり

実際に作ったもののコードはこちら。  
[nabeliwo/unity-steamvr-study](https://github.com/nabeliwo/unity-steamvr-study)

なんとなく VR 開発のノリがわかってきたのでゲームっぽいものをどんどん作っていくぞ！  
おしまい。

## 参考記事

- [Unity＋HTC Vive開発メモ - フレームシンセシス](https://framesynthesis.jp/tech/unity/htcvive/)
- [[Unity] Steam VR Plugin 2.2.0を動かせたので、やったことを書いてく - Qiita](https://qiita.com/AI_Kiritan/items/bfe647c31f1686f8c715)
