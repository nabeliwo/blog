---
title: "【Unity勉強】9日目：VRoid で作った VRM を VRChat にアップロードして動かす"
description: "VRChat を自分のアバターで遊んでみたかったのでついにやってみた。"
date: "2020-01-19"
tags: ["unity", "vr"]
image: ""
---

[VRoid](https://vroid.com/) で作ったアバターを [VRChat](https://www.vrchat.com/) で動かしてみたかったのでやり方調べてみました。  
最近は VRChat 熱が高まってきた僕です。友達いないので全然慣れてないんですけど！誰か一緒にやりましょう！

動画撮りたかったんだけどまだ良い感じのやり方がわかってないので写真だけ撮りました。

<blockquote class="twitter-tweet"><p lang="ja" dir="ltr">髪が揺れるようになったんだけど髪が揺れそうな写真を撮らないというミスを犯しました <a href="https://twitter.com/hashtag/VRChat?src=hash&amp;ref_src=twsrc%5Etfw">#VRChat</a> <a href="https://t.co/GpYUuzLkwg">pic.twitter.com/GpYUuzLkwg</a></p>&mdash; でこりを (@dekoiliwo) <a href="https://twitter.com/dekoiliwo/status/1218596715567046656?ref_src=twsrc%5Etfw">January 18, 2020</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

## 作業メモ

この動画が最高でこれ見ながらやったら簡単にできた。

`youtube:https://www.youtube.com/embed/N8BtIugB_qg`

注意点としては Unity のバージョンは 2017.4.28f1 でやること。 Unity Hub を使うと Unity のバージョンを簡単に管理できて便利。  
VRChat SDK は[公式から落とす](https://docs.vrchat.com/docs/setting-up-the-sdk)。  
VRM Converter for VRChat は [booth で無料で配布している](https://booth.pm/ja/items/1025226)。とは言えめちゃめちゃありがたいのでお布施しました :pray:

ちょっと困ったこととしては、 VRM Converter によって Convert されてできたオブジェクトの VRC_Avatar Descriptor というコンポーネントの View Position を良い感じの値に変える必要があるんだけど、変えてしばらくたってから見ると元に戻ってしまっていてなぜなんだとなっている…。  
変えたあとに save してプロジェクトを再起動しても元に戻ってしまっていてまったくわからない…。  
-> これプロジェクト作り直ししたら保存されるようになった。謎すぎた…。

ここからは動画に載ってないことについての話。

Unity 上で Hierarchy に入れた VRM に対して VRM Converter for VRChat で「Duplicate and Convert for VRChat」ってのをするんだけど、その際にデフォルトの設定のままだと僕のアバターの場合は実際に VRChat で動かした時に肩がめちゃめちゃなで肩になってしまった違和感があった。

ググるとこんなツイートがあったので書いてある通りに「肩の高さ」を0.01に変更したら良い感じになった。

<blockquote class="twitter-tweet"><p lang="ja" dir="ltr">VRM Converter for VRChatの「肩の高さ」の調整メモ_φ(･_･<br>数値を大きくするといかり肩になっていきます💡<br>Converterのバージョンは v16.0.0 です<a href="https://twitter.com/hashtag/VRChat?src=hash&amp;ref_src=twsrc%5Etfw">#VRChat</a> <a href="https://twitter.com/hashtag/VRoid?src=hash&amp;ref_src=twsrc%5Etfw">#VRoid</a> <a href="https://t.co/FOEN6dcBIr">pic.twitter.com/FOEN6dcBIr</a></p>&mdash; 双尾ゆい🐰バーチャルクリエーター (@twintail_vtuber) <a href="https://twitter.com/twintail_vtuber/status/1177881006088454145?ref_src=twsrc%5Etfw">September 28, 2019</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

次に、髪の毛を重力に合わせて動かしたかったので、やり方を調べた。揺れ物を動かすには [Dynamic Bone](https://assetstore.unity.com/packages/tools/animation/dynamic-bone-16743) を入れる必要があるっぽい。  
有料のアセットなんだけど買った。

Dynamic Bone の設定のやり方はこの動画が参考になった。

`youtube:https://www.youtube.com/embed/9KprP2xd4vo`

あとはこのブログを見ながら細かい値の調整をした。  
[Dynamic Boneを使ってVRChatでもVRoidの髪の毛揺らしたい。 - Pikali’s diary](https://pikali.hatenablog.com/entry/2019/01/14/101628)

ここまでやったけど実際に動かしてみると、確かに髪の毛は揺れるんだけど髪の毛が顔にめり込んでしまって辛かった。  
髪の毛が当たる部分に当たり判定を入れてめり込まないようにする作業が必要っぽい。

Dynamic Bone の中に Dynamic Bone Collider というのがあって、髪の毛をめり込ませたくないオブジェクトのところに空のオブジェクトを作って Dynamic Bone Collider を当てて、それを髪の毛側の Dynamic Bone に渡してお互いを認識させてあげる。  
その上でお互いの radius やらの値を調整して良い感じに反発する位置を見つける。これを髪の毛に入っているボーンの数だけやったのでめちゃくちゃ面倒くさかった。これ新しいモデル作るたびにやらなきゃいけないのかなーとか考えるとなかなか辛い気持ちになった。  
多分実際はもうちょっと賢いやり方があるはずなので模索していきたい。もしくは知ってる人いたら教えてください :pray:

最後にもう一つ困ったこと。  
実際に VRChat で動かしてみると、 Dynamic Bone がなぜか効いていなくてなんでやろと思っていたらパフォーマンス的な問題で Dynamic Bone の制限があったらしい。特定の数を超えている場合は Dynamic Bone が機能しない状態になっているらしく、 VRChat の Safety -> Performance Operation -> Limit Dynamic Bone Usage のチェックを外すと Dynamic Bone が機能した。  
ただこれをすると多分 VRChat のパフォーマンスに影響を与えてしまうので、この制限にひっかからないようにモデルを作るのが大事なんだろうな〜と思った。

## 終わり

VRChat で楽しいことしたいってのがモチベーションになってここにきてさらに勉強熱が高まっているのでどんどんやっていきたい。  
次は自作のワールドを VRChat にあげたい。終わり。
