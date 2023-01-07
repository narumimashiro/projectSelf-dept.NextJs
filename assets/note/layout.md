---
title: 'getLayoutの実装'
date: '20221231'
thumbnail: '/images/NextJs.jpg'
---

# **getLayoutの実装**

## **Layouts**

ページ上部にナビゲーションバーがどのページに遷移しても存在しているのをWebページでよく見かけるかと思います。

その実現方法に対する設計は2パターン存在すると思います。
- どのページも同じものを表示したい。
- 一部ページでは違うものを表示したい。

今回、以下に記述してあるサンプルコードは2つ目の「一部ページでは違うものを表示したい。」の実現方法となっています。

公式リファレンス : <https://nextjs.org/docs/basic-features/layouts>

## **navbar.tsx**
```typescript
import Link from "next/link";
import { ReactNode } from "react";
import styles from '@/styles/components/NavBar.module.sass'

interface Props {
  children: ReactNode;
}

const NavBar = ({ children }: Props) => {
  return (
    <>
    <div className={styles.navbar}>
      <nav className="flex absolute w-full h-20 justify-between top-0 left-0">
        <div>
          <Link href="/">
            <img className="h-full"
                 src="/images/sample.png"
                 alt="projectSelf"/>
          </Link>
        </div>
        <div className="flex mr-5">
          <li><Link href="/sample/profile">Profile</Link></li>
          <li><Link href="/sample/note">Note</Link></li>
        </div>
      </nav>
    </div>
    { children }
    </>
  )
}
export default NavBar
```

## **_app.ts**
```typescript
import type { ReactElement, ReactNode } from 'react'
import type { NextPage } from 'next'
import type { AppProps } from 'next/app'
import '@/styles/globals.sass'
import NavBar from '@/components/layouts/navbar'

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  
  if(Component.getLayout) {
    return Component.getLayout(
      <Component { ...pageProps } />
    );
  }

  return (
    <NavBar>
      <Component { ...pageProps } />
    <NavBar>
  )
}
```

**各コンポーネントでの実装方法**

個別のレイアウトを設定したい場合は以下のようにXXX.getLayoutで記述してあげることで、実現可能です。

```typescript
import type {ReactElement} from 'react'
page.getLayout = (page: ReactElement) => {
  return <layout>{page}</layout>
}
```