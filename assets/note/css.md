---
title: 'Sass/Scss/CSS'
date: '20221126'
thumbnail: '/images/css.jpg'
---

# **CSS Library**

## **CSS/SCSS/SASSの違い**

CSSを拡張して便利にしたり、メンテナンスがしやすいようにしたものが、SCSSとSASSです。

SCSSとSASSではスタイルの記述を入れ子形式にすることができます。
そのため、波括弧分のStep数が減らせるというメリットがあります。

SCSSとSASSの違いは書式の違いにあり、SASSはインデントを主としている記法となっているため、波括弧でスタイルを囲う必要はなくなり、またセミコロンで最後を閉じる必要がなくなっています。

## **CSSでは出来ない様々なこと一例**

### **1.変数の利用**

```scss
$var-css:red
h1
  color:$var-css
```
### **2.mixin 関数みたいなやつ**

```scss
@mixin func($color: #fff, $f-size: normal)
  color: $color
  font-size: $f-size
.cont-btn
  @include func(red, 20px)
```
※@mixinはSASSでは=で省略可能

### **3.inheritance 継承**

```scss
%css-share
  font-family: "Comic Sans MS"
  color: #fdeeef
.nav-text
  @extend %css-share
  font-size: 1em
```
参考サイト : <https://www.fenet.jp/dotnet/column/language/html-css/5245/>

## **最強なサイトたち**

公式リファレンス : <https://developer.mozilla.org/ja/docs/Web/CSS>

デザインアイディア帳 : <https://coco-factory.jp/ugokuweb/>