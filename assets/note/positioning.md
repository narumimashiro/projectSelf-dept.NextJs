---
title: 'CSSのポジションに関すること'
date: '20221207'
thumbnail: '/images/css.jpg'
---

# **`要素の配置位置に関連するCSS`**

## **float**

公式リファレンス : <https://developer.mozilla.org/ja/docs/Web/CSS/float>

要素を包含するブロックが左右どちらかに沿うように配置し、テキストやインライン要素が周りを回り込むように定義できる
text-alignやrightとかで左右に寄ってくれないな...など思ったらこれを使ってみると良いかもしれない


## **block/inline/inline-blockの違いについて**

block要素は<div>や<section>タグのようなコンテンツをまとめるための要素
- 縦に要素が並んでいく
- 幅と高さの調整ができる
- 余白の調整ができる
- 要素の配置を指定できない

inline要素はブロック要素の内容に用いられる
- 要素が横に並んでいく
- 幅と高さの調整が出来ない。
- 上下の余白が調整できない
- 要素の配置を指定できる

inline-block要素はblock要素とinline要素の中間
- 要素が横に並んでいく
- 幅と高さの調整ができる
- 余白の調整ができる
- 要素の配置を指定できる

参考ページ : <https://zero-plus.io/media/css-display-format-difference/>

## **要素が中央に寄ってくれない...ToT**

text-align: center が上手く効いてくれないことがあった...
text-alignはちょっと扱うのが難しいプロパティで、どこに対して中央なのかを示してあげないといけない

【条件】
- 中央寄せしたい要素がインライン要素であること。
- css記述箇所はブロック要素の親に書く必要がある。

NG例)
```html
<span {text-align: center;}">sample</span>
```
上記だとspanがインライン要素であることで条件1つ目は満たしているが、2つ目の方が達成できていないため、中央に寄らない

OK例)
```html
<p {text-align: center;}><span>sample</span></p>
```
上記のようにブロック要素でラップして、そちらに中央寄せの記述をしてあげる

参考ページ : <https://cotodama.co/css-center/#text-aligncenter-2>

## **display: flexについて**

display: flex;はブロック要素を横並びに並べてくれる