---
title: "TypeScript で Express サーバーと React アプリケーションを作る【最強の React ボイラープレートを作るぞシリーズ1】"
description: "最強の React ボイラープレートを目指して…。"
date: "2018-06-30"
tags: ["javascript"]
image: ""
---

## 前置き

今僕が個人開発でアプリケーション作るときって以下のスタックはほぼ確定してるんですよね。

- typescript
- express
- react
- react-router
- redux
- styled-components

で、毎回そのスタックで SSR(Server Side Rendering) 対応の SPA(Single Page Application) の基盤作ってログイン機能作ってってやるわけですが、ここまでってどんなアプリケーションでもほぼ同じなんですよね。  
なのでボイラープレートを作ろうと思いまして。

そしてついでなので解説記事でも書こうかなと思いまして。長すぎて何回かに分けたレベルだけれど興味ある人は読んでってくれよな。  
よし、やるぞ！！ :muscle:

(どんな性質のアプリケーションかの考慮もせず技術スタックだったり SPA + SSR だったりを決め打ちでやってることの是非はここでは問わないでね :star:)

## 目次

- [このシリーズについて](#このシリーズについて)
- [参考記事](#参考記事)
- [作った](#作った)
- [解説](#解説)

## このシリーズについて

「最強の React ボイラープレートを作るぞシリーズ」とは、 React アプリケーション開発をする際に、とりあえず fork したらあとはもうアプリケーションコードだけを書けばいい状態になっているボイラープレートリポジトリを作ることを目的とした記事シリーズです。

最終的な完成形はここ。  
[https://github.com/nabeliwo/ts-react-spa-ssr-boilerplate](https://github.com/nabeliwo/ts-react-spa-ssr-boilerplate)

ちなみにこのシリーズは Node v10.5.0 で動かしています。

### 最強の React ボイラープレートの定義

- 開発環境
  - 言語は TypeScript である
  - Webpack で Hot Module Replacement ができる
  - TSLint, Prettier で lint, format ができる
  - Jest, Enzyme でテストが書ける
  - Storybook でコンポーネントの確認ができる
- アプリケーション
  - React, React Router, Redux で作られた SPA である
  - バックエンドは Express サーバーであり、 React の SSR に対応している
  - メールアドレスログイン、 Twitter ログインの機能を持つ
  - 非ログインユーザーに対する特定ページへのアクセス制限機能を持つ

### このシリーズの記事一覧

1. TypeScript で Express サーバーと React アプリケーションを作る <- ｲﾏｺｺ
2. 今書いてる

## 参考記事

この記事を書くにあたって色々調べたので役に立ったリンクを載せておきます。

- [フロントエンドの全部揃っている環境が欲しくてreact-ssr-starterを作った - Qiita](https://qiita.com/osamu38/items/57822e4deb86c34e95a0)
- [技術要素編: web アプリが新陳代謝を続けるための依存関係の厳選（新規開発のメモ書きシリーズ1） ::ハブろぐ](https://havelog.ayumusato.com/develop/others/e747-scratch_memo_1.html)
- [TypeScriptのReact開発環境を作った - まさたか日記](http://mk.hatenablog.com/entry/2017/09/05/145230)
- [Compiler Options ・ TypeScript](https://www.typescriptlang.org/docs/handbook/compiler-options.html)
- [TypeScript2系のコンパイラのオプション一覧](https://qiita.com/IganinTea/items/f88bea469bff56cfbda6)

## 作った

まだ全然最強と言える域に達していないのですが、とりあえず途中まで作ってみた。  
[https://github.com/nabeliwo/ts-react-spa-ssr-boilerplate/tree/typescript-express-react](https://github.com/nabeliwo/ts-react-spa-ssr-boilerplate/tree/typescript-express-react)

TypeScript で Express サーバーを作って、クライアント側はとりあえず React だけ動かしているという状態。  
まだ SPA でもないし機能も何もない状態なのですが、とりあえずベースは作りました。

## 解説

- ビルドプロセス
- React コンポーネントの表示
- linter, formatter

雑に解説していくので足りない情報はリポジトリを見て補完してもらえると:pray:

### ビルドプロセス

Webpack で TypeScript を変換した上でバンドルしています。  
TypeScript だけで充分なので Babel は使用していないです。 tsconfig で ECMAScript のどこまで対応するかなど定義しています。

```
# ./tools/typescript/tsconfig.json

{
  "compilerOptions": {
    "jsx": "react",
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "noFallthroughCasesInSwitch": true,
    "noImplicitReturns": true,
    "noEmitOnError": true,
    "noUnusedParameters": true
  }
}
```

```
# ./tools/typescript/tsconfig.server.json

{
  "extends": "./tsconfig.json",
  "compilerOptions": {
    "module": "commonjs",
    "target": "es2017",
    "lib": [
      "es2017",
      "dom"
    ]
  }
}
```

```
# ./tools/typescript/tsconfig.client.json

{
  "extends": "./tsconfig.json",
  "compilerOptions": {
    "module": "esnext",
    "target": "es2015",
    "lib": [
      "es2015",
      "dom"
    ],
    "moduleResolution": "node"
  }
}
```

基本となる tsconfig.json があって、そこで TypeScript 自体の設定を行います。  
大事なのは、 React 使うときは jsx を react にする必要があるっていうくらいであとは TypeScript の型チェックをどれだけ厳しくするかとか、そういうやつです。

tsconfig.json を extend してサーバー用、クライアント用の設定ファイルを完成させます。

サーバー側は特にブラウザ考慮が必要ないため target を es2017 にしています。クライアント側はモダンブラウザを対象として変換を行うので target は es2015 。  
レガシーブラウザを意識する場合はもう少し設定に手を加える必要がありますが、今はやらないです。このシリーズの最後らへんでやるかも…。

次に Webpack の設定。

```javascript
// ./webpack.config.js

const serverConfig = require('./tools/webpack/server.config')
const clientConfig = require('./tools/webpack/client.config')

module.exports = [serverConfig, clientConfig]
```

```javascript
// ./tools/webpack/server.config.js

const path = require('path')

module.exports = {
  target: 'node',
  entry: {
    server: './src/server.ts',
  },
  output: {
    path: path.join(__dirname, '../../dist'),
    filename: '[name].bundle.js',
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: 'awesome-typescript-loader',
            options: {
              configFileName: './tools/typescript/tsconfig.server.json',
            },
          },
        ],
      },
    ],
  },
}
```

```javascript
// ./tools/webpack/client.config.js

const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')

const env = process.env.NODE_ENV
const isDevelopment = env === 'development'

const baseConfig = {
  entry: {
    client: './src/client.tsx',
  },
  output: {
    filename: '[name].bundle.js',
    path: path.join(__dirname, '../../public/assets/js'),
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'awesome-typescript-loader',
            options: {
              configFileName: './tools/typescript/tsconfig.client.json',
            },
          },
        ],
      },
    ],
  },
  plugins: [new webpack.EnvironmentPlugin({ NODE_ENV: `${env}` })],
}
const devConfig = merge(baseConfig, {
  devtool: 'source-map',
  plugins: [
    new webpack.NamedModulesPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
  ],
})
const prdConfig = merge(baseConfig, {})

module.exports = isDevelopment ? devConfig : prdConfig
```

TypeScript の変換するための loader として awesome-typescript-loader を使用しています。  
気をつけるところとしては、 resolve.extensions に .js も含める必要があります。自分のアプリケーションで .ts, .tsx しかなくても使用するライブラリ側で .js が存在するので入れておかないとエラーになってしまいます。

サーバー側は target の node にするくらいで特に難しいところはないです。  
クライアント側が development と production で plugin を変えるので少し複雑かも。サーバー側はタスク実行時に環境変数を設定するとそれがそのままプログラムに渡されるのですが、クライアント側の場合はプログラムにそれが渡ってこないので、 webpack.EnvironmentPlugin で渡してあげる必要があります。

そして実際に叩くファイルは `webpack.config.js` になるので、そこでサーバー用、クライアント用の設定を読んで同時に実行できるようにします。

あとは npm scripts でタスクを定義します。

```
# ./package.json
# 該当 script 以外は省略

{
  "scripts": {
    "dev": "nodemon ./dist/server.bundle.js",
    "watch": "cross-env NODE_ENV=development webpack --mode development -w"
  }
}
```

watch タスクで Webpack を実行しつつエントリポイントのファイルを監視しています。  
dev タスクで nodemon を使ってサーバーを立ち上げます。 nodemon は指定したファイルを監視して、変更があった場合にサーバーを再起動してくれるので便利。

### React コンポーネントの表示

Express サーバーを立ち上げて `/` にアクセスが来たときに HTML を返せるようにします。

何はともあれ HTML ファイルを用意。  
div 1個だけ置くやつ。

```html
<!-- ./public/index.html -->

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0">
  <meta name="format-detection" content="telephone=no, email=no, address=no">
  <title>ts-react-spa-ssr-boilerplate</title>
</head>
<body>

<div id="root"></div>

<script src="/assets/js/client.bundle.js"></script>
</body>
</html>
```

次に サーバー側のコードを書きます。

```javascript
// ./src/server.ts

import * as express from 'express'
import * as path from 'path'

import { server } from './constants/application'
import { env } from './constants/env'

const PORT = process.env.PORT || server.port
const app = express()

app.use(express.static(path.join(process.cwd(), 'public')))

app.listen(PORT, (err: Error) => {
  if (err) {
    global.console.error(err)
  }

  global.console.log(` ⚙️  ${env} app listening @ ${PORT} ⚙️ \n`)
  global.console.log(` --  launched @ ${Date()}  --`)
  global.console.log(
    '---------------------------------------------------------------------------\n\n',
  )
})
```

サーバー立てて、 `./public` にある index.html を返せるようにしてるだけですね。  
他に import してるファイルとかは設定系のどうでもいいやつなのでリポジトリ見てください。

次にクライアント。

```javascript
// ./src/client.tsx

import * as React from 'react'
import { render } from 'react-dom'

const root = document.getElementById('root')
const App = () => <h1>Hello World!</h1>

render(<App />, root)
```

超シンプル。これはアプリケーションとは言わない。

ここまででやったら、タブを2つ開いて `yarn run watch` と `yarn run dev` を実行して `http://localhost:3333` にアクセスすると Hello, World! が表示されているはず。

### linter, formatter

linter, formatter を入れます。これらはチーム開発でこそ力を発揮するものですが個人開発でも入れておくことで全て自動でフォーマットしてくれるので無駄なことに思考が囚われずにすみます。

今回は TypeScript なので linter は TSLint, スタイルはまだ1回も書いてませんが styled-components を使用するので stylelint, formatter は Prettier を使用します。  
lint タスクと format タスクを追加し、コミット時に自動で format が走るようにするところまでやります。

```
# ./tslint.json

{
  "defaultSeverity": "error",
  "rulesDirectory": ["tslint-plugin-prettier"],
  "extends": [
    "tslint:recommended",
    "tslint-config-prettier",
    "tslint-react"
  ],
  "rules": {
    "prettier": true,
    "ordered-imports": false,
    "object-literal-sort-keys": false
  }
}
```

TSLint の設定では Prettier と連携するために tslint-plugin-prettier と tslint-config-prettier を使います。  
rules で prettier を true にするのも忘れないように。

extends で用意されたルールを読み込んでいるんですが、納得いかないようなときは rules の中で上書きします。

```
# ./prettierrc

{
  "singleQuote": true,
  "trailingComma": "all",
  "semi": false
}
```

Prettier の設定。  
シングルクォーテーション、セミコロン無し、ケツカンマ有りは僕の好みです。

```
# ./stylelintrc

{
  "processors": ["stylelint-processor-styled-components"],
  "extends": [
    "stylelint-config-standard",
    "stylelint-config-styled-components",
    "stylelint-config-prettier"
  ],
  "rules": {},
  "syntax": "scss"
}
```

これもやってることは tslint.json とほぼ同じですね。

設定ファイルを用意したら npm script を追加します。  

```
# ./package.json
# 追加分以外は省略

{
  "scripts": {
    "lint:ts": "tslint 'src/**/*.ts{,x}'",
    "lint:css": "stylelint './src/**/*.ts{,x}'",
    "lint": "run-p lint:*",
    "format": "tslint --fix 'src/**/*.ts{,x}'",
    "precommit": "lint-staged"
  },
  "lint-staged": {
    "*.{ts,tsx}": [
      "tslint --fix",
      "git add"
    ]
  }
}
```

複数タスクを走らせるために npm-run-all を使用しています。  
lint タスクを走らせることで lint エラーの確認ができます。 format タスクを走らせることで lint 結果に基づいてファイルをフォーマットしてくれます。  

precommit で lint-staged の設定をしています。  
lint-staged と husky を使うことで commit 時に format を走らせているので、開発者は特にここらへん気にすることなく開発することができますね。

ただ lint-staged を使うとコミットが若干時間かかるので(数秒ですが)、それが嫌な人は抜いてしまっても良いかも。  
その場合は ci で lint タスクを走らせると良いですね。

はい、ここまでで今回は終わりです。  
続きは次回 :pray:
