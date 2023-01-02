---
title: 'NextJsの動的ルーティング'
date: '20221126'
thumbnail: '/images/NextJs.jpg'
---

# **NextJsの動的ルーティング**

## **Routerについて**

Reactだとページ遷移をするためのRouterはDOMを用意して行わないといけなかったが、
NextJsはデフォルトでpagesディレクトリが用意されており、配下にファイルを置くことでそのファイルまでのpathがそのままURLとなり、
明示的にルーティング設定を記述する必要がなくなり、とても便利になっています。

公式リファレンス : <https://nextjs.org/docs/api-reference/next/router>

## **Link**

Linkをimportして、pathを指定してあげることで呼び出せます
```javascript
import Link from 'next/link' ...
<Link href="/">ルートディレクトリに移動</Link>
```
公式リファレンス : <https://nextjs.org/docs/api-reference/next/link>

## **Linkタグとaタグの違いは？**

リロードが入るか入らないかの違いがあります。
なので、基本的にはLinkタグを用います。