+++
date        = "2017-06-08"
title       = "2ヶ月放置したプロジェクトに取り組む〜フロントエンドの場合〜"
description = "2ヶ月ぶりに触ったプロジェクトは時代から取り残されていました。"
tags        = ["tech", "javascript", "node"]
slug        = "tackle-put-project"
type        = "post"
+++

趣味開発って全てが自分のやる気次第だから1ヶ月間それしかやらない時期があったと思ったらぱったり2ヶ月間くらい放置して手をつけなくなるなんてこともある。  
で、ふとやる気が戻ってきて2ヶ月ぶりにコードに触るんだけれどさすがに2ヶ月ともなると色々状況が変わっているので実際にコードを書く前に色々やることがあって、そんなアレコレのメモ。

そんな話。

## 手順

1. Node, npmをアップデートする

## Node, npmをアップデートする

まずは何はともあれフロントエンドの開発には欠かせないNodeとnpmを最新にする。  
実際にプロダクション環境で運用しているものならまだしも趣味開発なので常に最新にしておきたいよねってことで。

Node使うならバージョン管理ツールは必須なのでそれありきで。個人的には [nodebrew](https://github.com/hokaccha/nodebrew) が好き。  
現在の最新バージョンであるv8.1.2にする。

```bash
$ nodebrew install-binary v8.1.2
$ nodebrew use v8.1.2
$ nodebrew alias default v8.1.2 # ついでにデフォルトにする
$ node -v # v8.1.2
```

hoge

http://hideack.hatenablog.com/entry/2015/07/13/233000
eslint fix ??

```js
import arrayFrom from './polyfill/array.from';

arrayFrom();

document.addEventListener('DOMContentLoaded', () => {
  // highlight.js
  const codes = Array.from(document.querySelectorAll('pre code'));
  if (codes.length) {
    codes.forEach(hljs.highlightBlock);
  }

  console.log(1234);

  const hoge = {
    piyo: 'fuga',
    'fuga': 1 + 1
  };
});
```
