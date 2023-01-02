---
title: 'jQueryとは'
date: '20221125'
thumbnail: '/images/program.jpg'
---

# **jQueryとは**

## **jQueryとは**

jQueryとはプログラム言語であるJavaScriptを基に作成されたWebサイト製作に便利なツールで、JavaScriptのライブラリです。

## **3つの特徴**

- 1.HTMLやCSSを簡単に操作できる。
- 2.どんなブラウザでも使用できる。
- 3.プラグインで拡張できる。

### **1.HTMLやCSSを簡単に操作できる。**

スクロールをすると画像がフェードインして来たり、カーソルを当てると説明が浮かんでくる。といったアニメーションが簡単に製作可能になります。

### **2.どんなブラウザでも使用できる。**

Edge,InternetExplore,Google Chrome,Safari,Firefox、ブラウザに合わせて動きを変えて対応してくれるため、開発者は実行環境のことを気にせずに実装ができるようになります。

### **3.プラグインで拡張できる。**

jQuery UIでダイアログ、ウィジェット、アニメーションが簡単に作れるようになります。

## **jQueryとJavaScriptの違い**

- 1.プログラムの書き方。
- 2.クロスブラウザ対応。
- 3.実行速度の違い。

### **1.プログラムの書き方。**

JavaScriptは書き方が複数あるため、1つのアニメーションを書くにしても人それぞれ方法が異なり、開発者の数だけ書き方が存在します。

しかしjQueryはHTMLの要素と実行したい処理を書式 「$('セレクタ').メソッド(引数); 」の形で書くことで統一されているため、メンテナンスが容易になっています。

### **2.クロスブラウザ対応。**

JavaScriptはブラウザによって動きが変わるため、動作確認をする必要があります。
が、jQueryは複数ブラウザに対して動作保証があらかじめされているため、気にせずコーディングが可能となっています。

### **3.実行速度の違い。**

jQueryは複数ブラウザ対応やコードの書きやすさ重視のため、実行速度が"やや遅い"ので、速度重視のサイトには不向きというデメリットが存在します。

## **jQueryの使用方法**

- 1.ダウンロードする。
- 2.CDNを使用する。

### **1.ダウンロードする。**

公式サイトからダウンロード  
> <https://jquery.com/download/>

### **2.CDNを使用する。**
```html
//jQueryのCDN
<script src="https://code.jquery.com/jquery-3.5.1.min.js"></script>
 
//GoogleのCDN
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min."></script>
 
//MicrosoftのCDN
<script src="https://ajax.aspnetcdn.com/ajax/jQuery/jquery-3.5.0.min.js"></script>
```