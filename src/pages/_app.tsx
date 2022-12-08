import type { ReactElement, ReactNode } from 'react'
import type { NextPage } from 'next'
import type { AppProps } from 'next/app'
import { Provider } from 'react-redux'
import store from '@/redux/store'
import '@/styles/globals.sass'
import Navbar from '@/components/layouts/navbar'

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  if(Component.getLayout) {
    return Component.getLayout(
      <Provider store={ store }>
        <Component { ...pageProps } />
      </Provider>
    );
  }

  return (
    <Provider store={ store }>
      <Navbar>
        <Component { ...pageProps } />
      </Navbar>
    </Provider>
  )
}