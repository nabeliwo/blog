---
title: "【Unity勉強】12日目：GitHub for Unity が良いっぽい"
description: "Unity のプロジェクトを Git 管理する場合は GitHub for Unity が良いっぽいという情報を得たので試してみた。"
date: "2020-02-03"
tags: ["unity"]
image: ""
---

以前こんな感じで Unity プロジェクトを Git 管理する、という話をした。  
[【Unity勉強】8日目：Unity のプロジェクトを作って Git で管理する](https://blog.nabeliwo.com/2020/01/unity-study-08/)

この記事を公開した後にこんなアドバイスをもらった。

<blockquote class="twitter-tweet"><p lang="ja" dir="ltr"><a href="https://t.co/Lz664KM3zE">https://t.co/Lz664KM3zE</a> こういうのもある!</p>&mdash; 🅰️りさきゃん🛸 (@_risacan_) <a href="https://twitter.com/_risacan_/status/1218398547818643456?ref_src=twsrc%5Etfw">January 18, 2020</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

なんと Asset Store からインストールして Unity の GUI 上で Git の操作ができるらしい。  
[GitHub for Unity | Bring Git and GitHub into Unity](https://unity.github.com/)

めちゃ便利っぽい気がしたので調べつつ導入してみた。  
[【2018最新】Github for Unityの導入＆使い方](https://miyagame.net/github-for-unity/)

## 作業メモ

- Asset Store から GitHub for Unity を検索して import する
- Window -> GitHub でタブが追加されるのでまず Sign in をする
- Initialize a git repository for this project を選択すると勝手に initial commit してくれる
  - 最初から Git LFS 対応してたり .gitignore とか入ってたりした
- Changes タブで変更のあるファイルが一覧表示されているのでコミットしたいファイルを選択して Commit summary を入力して Commit to [master] をクリック
- Publish ボタンを押すとダイアログが開かれるのでそこで GitHub に publish するリポジトリの情報を入力して Publish をクリック
  - GitHub にリポジトリ作るのも勝手にやってくれる
- Pull や Push も Branch も基本的には GUI が見やすいので簡単だった

## 感想

これは最高の体験っぽい。  
ただ評判あんまりよくないって書いてあって、どこらへんがだめなんだろうと思って調べてみたら diff が見れなかったり、たまに Unity が落ちたりみたいなのが書いてあった。  
diff が見たいときは他のツール使うとして、突然 Unity が落ちるのは確かにつらいのでしばらく試してみて僕の環境でも同じことが起こったらやめて普通に Git 使うことにする。

とりあえず現状は楽で良い感じ。
