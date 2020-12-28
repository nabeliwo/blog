---
title: "React アプリケーションのボイラープレートを作った"
description: "普段 TypeScript や React を使ってアプリケーションを作っているけれどその立ち上げがめんどくさかったのでボイラープレートを用意した話。"
date: "2020-02-16"
tags: ["javascript", "made"]
image: ""
---

僕が個人で何かのアプリケーションを作るとき、最近は手癖で TypeScript + React でとりあえず始めている。 Redux を入れるかどうかは性質を考えてから決めているけれど、先の2つに関してはほぼ無思考で入れている。  
それが良いか悪いかは別として、毎度環境を作るのにめんどくさかったのでボイラープレートを作った。 [create-react-app](https://github.com/facebook/create-react-app) とかもあるんだけれど、個人的にああいうツールは完全に自分の思想とマッチするわけではないのでどこかしら妥協したり後から手直しすることになるので、それだったら自分で用意したものを使う方が良いという判断。

アプリケーションの性質によって変わるのでとりあえず2つに分けて作った。

- [static-site-boilerplate-with-react-ts-webpack](https://github.com/nabeliwo/static-site-boilerplate-with-react-ts-webpack)  
- [prettier-eslint-stylelint-boilerplate](https://github.com/nabeliwo/prettier-eslint-stylelint-boilerplate)

## static-site-boilerplate-with-react-ts-webpack

アプリケーションを作るとき、バックエンドも含めるか static なページにするかでまず分岐点がある。  
バックエンド含めて作る場合は [Next.js](https://nextjs.org/) を入れたりとか色々やることがあるんだけれど、僕がパッと作りたくなるようなものは大体 static なページで完結することが多いので、まずはそっちの方だけ対応するようなボイラープレートにした。

技術的な要素としてはこんな感じ。

- TypeScript
- Webpack
- React
- ReactDOM

Webpack で ts-loader を使って TypeScript のトランスパイルをしている。  
開発環境用には webpack-dev-server でローカルサーバーを立てて開発して、本番用には用意してある index.html にビルドした js のパスを埋めて吐き出すようにしている。  
最終的には `public` ディレクトリをホストすれば動くようになっている。ガワは div が一つだけの空の HTML なので、 SEO とか色々気にする人だったらちょっとそこらへん考えないといけないかもしれない。そういうの考えたら [Gatsby.js](https://www.gatsbyjs.org/) 使ったり Next.js のスタティックビルドを使ったりとかすべきなんだろうけど、そこまでする必要があるか？ってなったのでこのリポジトリではそこは考えていない。

バックエンドが必要になるパターンもたまにはあるのでそれ用のボイラープレートもそのうち作るかも。

## prettier-eslint-stylelint-boilerplate

これは lint や format をするためのボイラープレート。  
わざわざ分けているのは、アプリケーションの内容によって先にあげたようにバックエンドを含めたり static なものにしたりみたいな分岐は起こるけれど、 lint や format はどんな時でも変わらない設定になるので別リポジトリで用意した。

技術的な要素としてはこんな感じ。

- Prettier
- ESLint
- stylelint

ESLint や stylelint の設定は以下の技術用の設定が含まれている。

- TypeScript
- React
- styled-components

ESLint の設定は [eslint-config-smarthr](https://github.com/kufu/eslint-config-smarthr) を使っている。これは自分は SmartHR の中の人で、現状自分が考える最適の設定になっているしそこに変更をかけるのも大変ではないので、という理由なので、いつか退職したらそこの部分は変えるかもしれない。

## カビを生えさせないために

こういうボイラープレートは作った後に放置してしまうとどんどん時代に取り残されて、いざアプリケーション作るぞとなった時に古くて使えないということがあるので、常にライブラリを最新に保つ必要がある。

そんなわけで今回はライブラリの自動アップデートに [Renovate](https://github.com/renovatebot/renovate) を使っている。 Renovate は依存しているライブラリに更新があった場合に自動で PR を送ってくれるツール。  
似たツールに [dependabot](https://dependabot.com/) というものがあって、以前はこちらを使っていたが Renovate の方が設定を細かくできるのでこちらに移行した。

Renovate の設定も共通化している。  
[renovate.json](https://github.com/kufu/renovate-config/blob/master/renovate.json)

あとは [GitHub Actions](https://help.github.com/ja/actions/getting-started-with-github-actions/about-github-actions) を使ったことがなかったので、 PR 単位でビルドしたり lint したりしてる。良い感じ。

## 終わり

こんな感じ。  
最近は [Snowpack](https://www.snowpack.dev/) が出てきて、少なくとも static-site-boilerplate-with-react-ts-webpack の方はいらなくなる時代になってきている感はあるけれど、とは言えまだまだ使えないライブラリがあったり、細かい最適化をやろうとすると難しいみたいなこともあるので、現状は今回作ったボイラープレートを使いまわしていくのが良いかなーと考えている。

終わり。
