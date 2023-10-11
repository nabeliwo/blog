---
title: "Windows 開発環境を作る"
description: "WSL2 使うととっても簡単に Windows で開発できるんだなって。"
date: "2020-10-19"
tags: ["pc"]
image: ""
---

やっぱり大層な自作ゲーミング PC というものを所持しているわけなのでこれをゲーム以外にも有効活用しない手はないということで、前々から Windows で開発する環境を作ってはいたのだけれど普段開発している Mac との違いに戸惑うことが多くて結局家で個人の開発をするときでも Mac を使ってしまう、という状況があった。  
WSL (Windows Subsystem for Linux) というものを使うと良いんだよ、という情報は知ってはいたのだけれどなんとなく腰が重くて放置していたのだけれどついに動き出すことができたのでメモ。

## 人の記事見てマネするだけの人生だった

基本的にはこの記事の通りにマネして色々と導入した感じ。  
[Windowsで開発](https://r7kamura.com/articles/2020-09-28-development-on-windows)

見つつやりつつ進めてく中で一個エラーで止まったところがあるのでメモしておく。

## ubuntu インストール後に起動するとエラーが出る (エラーコード: 0x80370102)

BIOS で仮想化が有効になっていないとこのエラーが出るらしい。  
https://docs.microsoft.com/ja-jp/windows/wsl/install-win10

久々に BIOS を起動して設定をいじったのでちょっと緊張した。  
BIOS の起動方法はマザボのメーカーごとに違うのでググる感じで。

## あとは色々入れる

あとは ubuntu なので普段 Mac で開発しているときに使っているものをガンガン入れていけば良い。  
homebrew が ubuntu で動くようになっていることを知らなくてそこに結構感動した。

あと僕は VSCode のテーマに結構こだわるタイプなんだけれど、 SynthWave なめっちゃ良いテーマがあって、ただ処理がめっちゃ重いのかなんなのか、 Mac でそのテーマに設定すると重すぎて VSCode が使い物にならなくなるやつがあって、それが Windows だと余裕で動くのが本当に嬉しかった。

<blockquote class="twitter-tweet"><p lang="ja" dir="ltr">VSCode のテーマ、今まで SynthWave &#39;84 っていうのを使ってたんだけど Synthwave x Fluoromachine っていうのに変えたらさらにギラギラし始めた<a href="https://t.co/x5uSm4v2uV">https://t.co/x5uSm4v2uV</a> <a href="https://t.co/Zz8Zcn2sHQ">pic.twitter.com/Zz8Zcn2sHQ</a></p>&mdash; nabeliwo / なべりを (@nabeliwo) <a href="https://twitter.com/nabeliwo/status/1316768983270318080?ref_src=twsrc%5Etfw">October 15, 2020</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

それ系の話で言うと、 Mac の iTerm2 で背景画像を設定すると若干動きがもっさりするという問題もあって、それも今の端末の Windows Terminal だと何の問題もないので最近はまっているゾンビランドサガの紺野純子さんにしたんだけれどとても良い。

<blockquote class="twitter-tweet"><p lang="ja" dir="ltr">ハァハァ… <a href="https://t.co/VSdfympg4f">pic.twitter.com/VSdfympg4f</a></p>&mdash; nabeliwo / なべりを (@nabeliwo) <a href="https://twitter.com/nabeliwo/status/1316731021535014912?ref_src=twsrc%5Etfw">October 15, 2020</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

## おわり

そんなわけで Windows で全く問題なく開発できるようになった。

仕事は会社支給の Mac を使わなきゃいけないのでまだ Mac は使ってるんだけど、仕事以外では完全に Windows を触っている状態になれたので満足。  
ついでに新しくキーボードも買ったりしてそれもまた満足しているのでまた今度記事書く。

終わり。
