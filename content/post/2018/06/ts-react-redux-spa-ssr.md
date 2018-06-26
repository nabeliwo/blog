+++
date        = "2018-06-26"
title       = "素の React から段階的に TypeScript + React + Redux の SSR 対応 SPA (ログイン認証付き)に移行する工程やるから見てってな"
description = "段階的にやればみんなわかりやすいかなと思ったのさ"
tags        = ["typescript", "react", "redux"]
slug        = "ts-react-redux-spa-ssr"
+++

今僕が個人開発でアプリケーション作るときって以下のスタックはほぼ確定してるんですよね。

- typescript
- express
- react
- react-router
- redux
- styled-components

で、毎回そのスタックで SSR(Server Side Rendering) 対応の SPA(Single Page Application) の基盤作ってログイン機能作ってってやるわけですが、ここまでってどんなアプリケーションでもほぼ同じなんですよね。  
なのでボイラープレートを作ろうと思いまして。

そしてついでなので解説記事でも書いて自分の理解を深めようかなということで、このエントリ用のリポジトリも立てて久々にがっつり記事を書きます。  
なのでものすっごい長い記事になると思うけれど興味ある人は読んで勉強してってくれよな。  
よし、やるぞ！！ :muscle:

(どんな性質のアプリケーションかの考慮もせず技術スタックだったり SPA + SSR だったりを決め打ちでやってることの是非はここでは問わないでね :star:)

## 目次

- この記事のゴール
- step1: ただの React 環境を作る
- step2: TypeScript にする

## この記事のゴール

以下の要件を満たすボイラープレートを作成することがこの記事のゴール地点です。

- 開発要件
  - 言語は TypeScript である
  - Hot Module Replacement ができる
  - linter, formatter がある
  - テストが書ける
  - storybook でコンポーネントの確認ができる
- アプリケーション要件
  - React, React Router, Redux で作られた SPA である
  - バックエンドは Express サーバーであり、 React の SSR に対応している
  - メールアドレスログイン、 Twitter ログインの機能を持つ
  - ゲストユーザーのアクセス制限機能を持つ

最終的なボイラープレートはこのリポジトリに置いてあるので好きに使ってください。  
TODO: リポジトリのブランチ指定でリンク貼る。

## step1: ただの React 環境を作る

step1 の全てのコードはこちら。  
TODO: リポジトリのブランチ指定でリンク貼る。

まずは普通に React コンポーネントをただ表示するだけのものを作ります。  
作るんですがそれを表示するために express サーバーを立てます。別にただの index.html を置くだけでも良いっちゃ良いんですが、 express サーバー立てるのもめっちゃ簡単なので後々のことを考えてここでサーバー立てちゃいます。



## step2: TypeScript にする

step2 の全てのコードはこちら。  
TODO: リポジトリのブランチ指定でリンク貼る。


