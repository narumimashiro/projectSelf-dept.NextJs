---
title: 'C#の基礎についてメモ'
date: '20221204'
thumbnail: '/images/program.jpg'
---

# **C#メモ 基礎の基礎**

## **C#に関連する知識まとめ**

C#について調べたことを忘れないようにメモしたページです。
不定期(←ここ大事)で更新していくつもりです

## **ヘッダーファイル(.h/.hpp)が存在しない**

C#のソースファイルにはC/C++のようにヘッダーファイルは存在していないようです。
なので、外部ファイルの関数などを使用したいときに「#include *.h」のようにincludeするのではなく、代わりに名前空間namespaceで色々とやりとりをしているようです。

例) using
```C#
using System;
```

## **プロパティ**

クラスの持つメンバ変数をpublicにするのは好ましくないため、カプセル化をすることが基本です。
そうなるとクラスが持つ変数にどうやってアクセスするかの問題が発生しますが、解決方法の1つとしては変数の値をreturnするようなpublicな関数を用意してあげることと、今回のテーマであるプロパティを使用することの2つになります。

```C#
public class Player
{
  string name;
  int HP;
  int MP;
  int ATK;

  // プロパティ
  public string Name {
    get { return this.name; }
    set { this.name = value; }
  }

  // func
  public string getName {
    return this.name;
  }
}

// ** main ****** 使う側
Player player = new Player("Sample1");
Debug.log(player.Name); // Sample1
player.Name = "Sample2";
Debug.log(player.Name); // Sample2
```
