+++
date        = "2018-06-26"
title       = "#1 素の React から段階的に TypeScript + React + Redux の SSR 対応 SPA (ログイン認証付き)に移行する工程やるから見てってな"
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
長すぎて何回かに分けたレベルだけれど興味ある人は読んで勉強してってくれよな。  
よし、やるぞ！！ :muscle:

(どんな性質のアプリケーションかの考慮もせず技術スタックだったり SPA + SSR だったりを決め打ちでやってることの是非はここでは問わないでね :star:)

## 目次

- [この記事のゴール](#この記事のゴール)
- [参考記事](#参考記事)
- [step1: ただの React 環境を作る](#step1-ただの-react-環境を作る)
- step2: TypeScript にする

**このシリーズの記事一覧**

- #1 <- ｲﾏｺｺ
- [#2](http://www.hoge.com)

ちなみにこのプロジェクトは Node v10.5.0 の環境で動かしています。

## この記事のゴール

以下の要件を満たすボイラープレートを作成することがこの記事のゴールです。

- 開発要件
  - 言語は TypeScript である
  - Webpack で Hot Module Replacement ができる
  - ESLint, Prettier で lint, format ができる
  - Jest, Enzyme でテストが書ける
  - Storybook でコンポーネントの確認ができる
- アプリケーション要件
  - React, React Router, Redux で作られた SPA である
  - バックエンドは Express サーバーであり、 React の SSR に対応している
  - メールアドレスログイン、 Twitter ログインの機能を持つ
  - ゲストユーザーに対する特定ページへのアクセス制限機能を持つ

このボイラープレートを取ってくればすぐにアプリケーションのロジックを書くことができるわけですね。  
最終的なボイラープレートはこのリポジトリに置いてあるので好きに使ってください。  
[https://github.com/nabeliwo/ts-react-spa-ssr-boilerplate](https://github.com/nabeliwo/ts-react-spa-ssr-boilerplate)

## 参考記事

この記事を書くにあたってめっちゃ色々調べたので役に立ったリンクを載せておきます。

- [フロントエンドの全部揃っている環境が欲しくてreact-ssr-starterを作った - Qiita](https://qiita.com/osamu38/items/57822e4deb86c34e95a0)
- [技術要素編: web アプリが新陳代謝を続けるための依存関係の厳選（新規開発のメモ書きシリーズ1） ::ハブろぐ](https://havelog.ayumusato.com/develop/others/e747-scratch_memo_1.html)

## step1: ただの React 環境を作る

step1 の全てのコードはこちら。  
[https://github.com/nabeliwo/ts-react-spa-ssr-boilerplate/tree/only-react](https://github.com/nabeliwo/ts-react-spa-ssr-boilerplate/tree/only-react)

まずは普通に React コンポーネントをただ表示するだけのものを作ります。  
作るんですがそれを表示するために express サーバーを立てます。別にただの index.html を置くだけでも良いっちゃ良いんですが、 express サーバー立てるのもめっちゃ簡単なので後々のことを考えてここでサーバー立てます。

まず依存ライブラリを全て入れます。  
このプロジェクトは yarn を使うのでまず最初に入れて、その後 dependencies と devDependencies を入れます。

```shell
$ npm i -g yarn
$ yarn add express react react-dom
$ yarn add -D @babel/core @babel/preset-react babel-loader@"8.0.0-beta.4" cross-env nodemon webpack webpack-cli
```

※ Webpack で Babel を読むための babel-loader が babel 7系の場合は最新バージョンを使わないと動かないのでバージョン指定しています。

まずはビルド環境を整えます。

Webpack のエンドポイントをサーバー用ととクライアント用で2つ用意します。  
今はあんまり違いはないのですが、後々設定が変わってくるので今のうちにわけちゃいます。

```javascript
// ./tools/webpack/client.config.js

const path = require("path");

const env = process.env.NODE_ENV || "development";
const isDevelopment = env === "development";

module.exports = {
  entry: {
    client: "./src/client.jsx"
  },
  output: {
    filename: "[name].bundle.js",
    path: path.join(__dirname, "../../public/assets/js")
  },
  devtool: isDevelopment ? "source-map" : false,
  resolve: {
    extensions: [".js", "jsx"]
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "babel-loader"
          }
        ]
      }
    ]
  }
};
```

```javascript
// ./tools/webpack/server.config.js

const path = require("path");

const env = process.env.NODE_ENV || "development";
const isDevelopment = env === "development";

module.exports = {
  target: "node",
  entry: {
    server: "./src/server.js"
  },
  output: {
    path: path.join(__dirname, "../../dist"),
    filename: "[name].bundle.js"
  },
  resolve: {
    extensions: [".js", ".jsx"]
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "babel-loader"
          }
        ]
      }
    ]
  }
};

```

```javascript
// ./webpack.config.js

const serverConfig = require("./tools/webpack/server.config");
const clientConfig = require("./tools/webpack/client.config");

module.exports = [serverConfig, clientConfig];

```

```
# ./.babelrc

{
  "presets": ["@babel/preset-react"]
}
```

現段階では特になにも難しいことはしていなくて、サーバーとクライアントとでエンドポイントと吐き出しを分けてるくらいです。  
Babel の設定も preset-react を入れてるだけです。

ここからアプリケーションのソースです。

```javascript
// ./src/server.js

import express from "express";
import path from "path";

import { server } from "./constants/application";
import { env } from "./constants/env";

const PORT = process.env.PORT || server.port;
const app = express();

app.use(express.static(path.join(process.cwd(), "public")));

app.listen(PORT, err => {
  if (err) {
    console.error(err);
  }

  console.log(` ⚙️  ${env} app listening @ ${PORT} ⚙️ \n`);
  console.log(` --  launched @ ${Date()}  --`);
  console.log(
    "---------------------------------------------------------------------------\n\n"
  );
});
```

express でサーバー立てて、 `./public` にある index.html を返せるようにしてるだけですね。  
他に import してるファイルとかは設定系のどうでもいいやつなのでリポジトリ見てください。

```javascript
// ./src/client.jsx

import React from "react";
import { render } from "react-dom";

const root = document.getElementById("root");
const App = () => <h1>Hello World!</h1>;

render(<App />, root);
```

1行のコンポーネントを描画してるだけの React です。

ここまでで `http://localhost:PORT` にアクセスすると React で描画された Hello, World! を返すだけのものができました。  
これを基本に少しずつ良い感じのボイラープレートにしていくぞ :muscle:

## step2: TypeScript にする

step2 の全てのコードはこちら。  
TODO: リポジトリのブランチ指定でリンク貼る。

TypeScript に変えていくのでビルド環境を書き変えていきます。  
わざわざ書き変えるなら最初から TypeScript で書けばよかったのでは…というのは何度も思ったのですがそうなるとこの記事の最初のコンセプトからぶれるのでしゃーなし…。

やっていくぞ！！！

ここでビルド環境ちゃんと作ります。  
モダンブラウザ用とレガシーブラウザ用で吐き出し設定変えたりとかそういうのです。で、レガシーブラウザ用で足りない API の Poliyfill を入れたりしていきます。  
ここを誰か一人が頑張ることでチームのみんなが楽できるのでしっかりやりましょう。
