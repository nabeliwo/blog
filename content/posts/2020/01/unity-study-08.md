---
title: "【Unity勉強】8日目：Unity のプロジェクトを作って Git で管理する"
description: "ついに自分でゲームを作るのでとりあえず Git で管理できるようにする。"
date: "2020-01-18"
tags: ["unity"]
image: ""
---

書籍を一冊終わらせて2Dも3Dもなんとなくやり方はわかったのでついに自分で何かしらのものを作ろうと思います。まずは2Dのゲームを作ります。

自分の作品なので最終的には誰でも触れるように公開したいしプロジェクトも公開していきたいので Unity のプロジェクトを Git で管理できるようにする。

## Git で管理する

僕は普段の開発は mac を使っているんだけれど、 Unity での作業は重たそうという雑なイメージからうちにあるスペックつよつよな Windows マシンを使っている。  
そしてそもそも Windows マシンに Git が入っていないことに気づいた。  
まずは Git の公式サイトから Git クライアントをダウンロードして普通にインストールした。  
そして Unity で空のプロジェクトを作って CLI でそのフォルダに移動して Git 管理しようとしたが、そもそも mac とコマンドが違って全く操作がわからない…。  
`ls` 使えないし `pwd` 使えないし現在地すらわからない…。ということで調べつつよちよちと進めていく。

いつも自分でプロジェクト作るときはDドライブを使ってるんだけどDドライブへの行き方がわからなかった。  
こんな感じだった。  
[コマンドプロンプトでDドライブに移動する - Qiita](https://qiita.com/Nemy/items/3ab1f91010ea9908d673)

`D:` とか `C:` とか打つだけで移動できた。楽ちん。  
これでようやくコマンドプロンプトで Unity で作ったプロジェクトのディレクトリまで移動できた。

`git init` でローカルのリポジトリを作った。  
.gitignore は前にツイッター経由で教えてもらったやつを使う。

<blockquote class="twitter-tweet"><p lang="ja" dir="ltr">楽しみにしております。<br><br>ちなみにGitignoreは、<a href="https://t.co/S1hlk82NXc">https://t.co/S1hlk82NXc</a><br>をいれておけばよいですよ</p>&mdash; ぺペンゴツ (@ppengotsu) <a href="https://twitter.com/ppengotsu/status/1204205117982953472?ref_src=twsrc%5Etfw">December 10, 2019</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

Git LFS への対応もしないといけないので .gitattributes はこれを使った。  
[.gitattributes for Unity3D with git-lfs · GitHub](https://gist.github.com/nemotoo/b8a1c3a0f1225bb9231979f389fd4f3f)

とりあえずローカルリポジトリはできたので次はそれをリモートにあげて GitHub で管理をする。SSH 接続をするので公開鍵を GitHub に渡すんだけどそこらへんは mac と変わらなかった。  
普通に `C:Users/ユーザー名/` のところで `ssh-keygen` した。

そして作ったのがこちら。  
https://github.com/nabeliwo/genkai-run

名前は適当。まだ何もしていない作っただけの空のプロジェクトです。  
やり方間違ってるよ、とかこのファイルはあげちゃいけないやつだよ、とかあったら Twitter で [@nabeliwo](https://twitter.com/nabeliwo) に教えてもらえるとありがたいです :pray:

終わり。

## 参考

ちなみに今回はこの Qiita の記事を参考にした。  
[UnityプロジェクトをGitで管理 - Qiita](https://qiita.com/cs1000/items/07368892a599b2b7b836)

