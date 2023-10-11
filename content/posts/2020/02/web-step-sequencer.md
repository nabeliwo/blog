---
title: "ブラウザで動くステップシーケンサーを作った"
description: "React を使ってブラウザで動くステップシーケンサーを作ったのでその詳しい話。"
date: "2020-02-28"
tags: ["javascript", "made"]
image: "/images/post/2020/02/web-step-sequencer/01.png"
---

## ステップシーケンサーを作ってみたかった

そもそもステップシーケンサーって何かって言うと、こういうやつ。

`youtube:https://www.youtube.com/embed/Qtnf38cMggA`

:point_down: こういう企画もあったみたい。  
[こちらが、世界最大のステップシーケンサーです | ギズモード・ジャパン](https://www.gizmodo.jp/2018/10/the-biggest-step-sequencer-in-the-world.html)

簡単に言うと打ち込みで音楽を作るためのものなんだけど、僕はまともな楽器経験がドラムだけなので、こういうリズムと音が出る場所だけ決めたら音楽が作れるようなものはすごくありがたい。  
で、こういうのって物理マシンか結構ガチなソフトウェアでしか存在してなくて、ただ物理マシンは大体見た目がかっこいいのでそれはそれで良いんだけど、ちょっと敷居が高くて気軽に触れるようなものではない。

ところで Google が作ったこういう Web アプリケーションはある。  
![Chrome Music Lab - Song Maker](/images/post/2020/02/web-step-sequencer/02.png "Chrome Music Lab - Song Maker")

[Chrome Music Lab - Song Maker](https://musiclab.chromeexperiments.com/Song-Maker/)

これはすごくよくできていて、簡単なリズムパターンとメロディーを作ることができる。  
全然良いんだけど、個人的にはもうちょっと見た目がそれっぽくあってほしくて、あとは自由度ももう少し欲しかった。

なのでそういうのを自分で作ろうと思った、という話。

## 作った

作りました。  
[Web step sequencer built with React](https://cinnabar.nabeliwo.com/)

URL は cinnabar.nabeliwo.com なんだけど、 cinnabar のところはコードネームです。  
まだ正式なアプリケーション名も決めていないのでとりあえずコードネームで公開している。今年の僕はプロダクトのコードネームは全て宝石の名前でいこうと決めていて(なかなか恥ずかしい)、最初は辰砂の英語である cinnabar にした。

本当は Unity で作って VR 空間上で立体的なステップシーケンサーを作りたかったんだけど、まだ Unity 始めたばかりの僕ではいろんなところでつまづいてしまって厳しかったので、まずは自分が得意な領域である JavaScript で作ることにした。

技術的には、 UI は React で組んでいて(というか最近 React しか使っていなくて React なしでまともなアプリケーション設計できるか心配になっている)、音は Web Audio API を使っている。  
Web Audio API を使うのがはじめてだったのでどんな感じかなーと思っていたけど結構シンプルで良かった。

現状はまだ大した機能があるわけではないのもあって、 React だけで状態管理の設計も成立している。もう少し複雑だったら Redux やら何かしらのライブラリがほしくなるかも。

で、こんな感じに遊べる。

<blockquote class="twitter-tweet"><p lang="ja" dir="ltr">良い感じになってきたけどなんかたまに音がずれちゃうな <a href="https://t.co/HWYYhfZIGq">pic.twitter.com/HWYYhfZIGq</a></p>&mdash; nabeliwo (@nabeliwo) <a href="https://twitter.com/nabeliwo/status/1232342158276841475?ref_src=twsrc%5Etfw">February 25, 2020</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

ステップシーケンサーってこんな風に少しずつ音が追加されていって、最初ただの単音だったものがリズムになって音楽になっていく過程がとても楽しくて好き。

## 全然完成していない

ツイートにも書いてあるように、なぜかたまに音がずれてしまうことがあって、それはこのアプリケーションにとって致命的なバグなので直さないといけない。  
他にも色々あって、音源を選択し直したときに音が止まってしまう問題だったり、そもそも押しづらかったり、音源が少なかったり、リロードすると全てが消え去ってしまったりだとか、そこらへん全部直したい。  
あとはそもそも機能が全然足りてなくて、 mp3 出力だったりいろんなところにシェアできたり、人の作ったものをコピってそこから作りたかったり、自分の好きな音源をあげてそれを使えたりとか、そこらへんに対応していきたい。  
UI ももっとガビガビにかっこよくしていきたい。

なので全然まだアプリケーションとして出来上がったものではないんだけれどとりあえずおもちゃとして遊べる状態にはなったので公開してこうしてブログを書いている。

引き続きこのアプリケーションの開発は続けていこうと思います。  
最終的にはこれを VR 空間上でできるようにするのが目標なので Unity も継続的に勉強していきます。  
おわり。

良かったら遊んでみてください :pray:
