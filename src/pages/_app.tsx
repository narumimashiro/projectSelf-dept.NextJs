import type { ReactElement, ReactNode } from 'react'
import type { NextPage } from 'next'
import type { AppProps } from 'next/app'
import { RecoilRoot } from 'recoil'
import { Provider } from 'react-redux'
import store from '@/redux/store'
import '@/styles/globals.sass'
import NavBar from '@/components/layouts/navbar'
import Modal from '@/components/modal/modal'


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
        <Modal />
        <Component { ...pageProps } />
      </Provider>
    )
  }

  return (
    <RecoilRoot>
      <Provider store={ store }>
        <NavBar>
          <Modal/>
          <Component { ...pageProps } />
        </NavBar>
      </Provider>
    </RecoilRoot>
  )
}