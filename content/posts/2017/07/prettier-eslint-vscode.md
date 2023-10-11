---
title: "PrettierをEslintと連携してコード自動整形かつVisual Studio Codeでオートフォーマットする"
description: "Prettierがとても便利なのでVisual Studio Codeから使えるようにした。"
date: "2017-07-12"
tags: ["javascript"]
image: ""
---

[prettier](https://github.com/prettier/prettier) は JavaScript のコードフォーマッター。  
そして [prettier-eslint-cli](https://github.com/prettier/prettier-eslint-cli) を使うと勝手に `.eslintrc` の設定見つつフォーマットしてくれるので最高に便利だった。

そんなわけで :heart: My Favorite Editor :heart: である Visual Studio Code での快適なコードフォーマット環境を作るためにいろいろ調べたことをメモしました。

## やったこと

1. **まずは普通にprettier使ってみる**
2. **Visual Studio Code で保存時に自動フォーマット**
3. **チーム開発のための git commit 時の自動フォーマット**

って感じ。

## まずは普通にprettier使ってみる

必要なのは [prettier-eslint-cli](https://github.com/prettier/prettier-eslint-cli) くらい。  
あとは別途 eslint の設定を作っておく必要があるけどそこはまあお好きに。余談だけれど個人的に [@mizchi](https://twitter.com/mizchi) さんの [eslint-config-mizchi](https://github.com/mizchi/eslint-config-mizchi) が良かった。

あとはコマンド叩くだけだけれどこういうのは npm script にしたい性分なのでそっちのタスクにしておく。  
なので `package.json` に以下を記述。

```js
{
  // ...略
  "scripts": {
    "format": "prettier-eslint --write \"src/**/*.js\""
  }
  // 略...
}
```

jsファイルは `./src` 以下にある想定。  
あとは `npm run format` を叩いたら勝手にフォーマットしてくれる。ちなみに `--write` オプションはファイルを編集してそのまま上書き保存してくれるよってやつ。

## Visual Studio Code で保存時に自動フォーマット

これを Marketplace でインストールして有効にしておく。  
[Prettier - JavaScript formatter](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)

あとは vscode 上で `cmd + ,` すると開かれる `settings.json` に以下を追記すれば良い。

```js
{
  "editor.formatOnSave": true,
  "prettier.eslintIntegration": true
}
```

これで `cmd + s` したときに勝手に `.eslintrc` 見てフォーマットしてくれる。

## チーム開発のための git commit 時の自動フォーマット

これらを使う。

* [husky](https://github.com/typicode/husky) : git コマンドにフックをはさめるようにする
* [lint-staged](https://github.com/okonet/lint-staged) : git のステージング領域のファイルに対して処理をする

`package.json` に以下を追記。

```js
{
  // ...略
  "scripts": {
    "precommit": "lint-staged"
  },
  "lint-staged": {
    "*.js": ["prettier-eslint --write", "git add"]
  },
  // 略...
}
```

これで `git commit` をしたときに prettier でのフォーマットを挟むことができるのでフォーマットされていないソースが commit されることを防ぐことができる。

## まとめ

コードレビューの負担も減るし、何も考えずにがんがんコード書いても勝手にフォーマットしてくれるので余計な時間も取られないし、良いことづくめだと思います。  
特にやらない理由はない気がする。

そんなことより Vim を :heart: My Favorite Editor :heart: にしたくて勉強している最近なのだけれどやっぱり込み入ってくると vscode を開いちゃうので完全に Vim 縛りで開発やったりとかした方が良いかもしれない。そんなことを思った。おわり。
