---
title: 'About Redux'
date: '20221225'
thumbnail: '/images/HatsuneMikuAtNightCode.jpg'
---

# ***Redux Library***

## **ディレクトリ構成**
Component思考が強いから(?)Vuexとは違って、特定のComponent用にReduxを用意する  
この記事はモーダルウィンドウ用に作ったReduxをもとに記述している
```
src―――redux
       |―store.ts
       |―modal
       |  |―modal.reducer.ts
       |  |―modal.types.ts
       |
       |―other
          |―other.reducer.ts
          |―other.types.ts
```

## **store.ts**
```ts
import { configureStore } from '@reduxjs/toolkit'
import modalReducer from './modal/modal.reducer'

export const store = configureStore({
  reducer: {
    modal: modalReducer,
    other: otherReducer,  // Reducerを登録していく
  },
})

export type RootState = ReturnType<typeof store.getState>
export default store
```

## **modal.reducer.ts**
```ts
import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import * as ModalType from './modal.types'

const initialState = {
  isModalOpen: false,
  modalInfo: {
    title: '',
    style: {
      width: 390,
      height: 260,
    },
  }
} as ModalType.ModalState

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    openModal(state, action: PayloadAction<ModalType.ModalInfo>) {
      state.isModalOpen = true
      const payload = {...action.payload}
      state.modalInfo.title = payload.title
      state.modalInfo.style = payload.style! ? payload.style
                                             : {width: 390, height: 260}
    },
    closeModal(state) {
      state.isModalOpen = false
    },
  }
})

export const modalReducer = modalSlice.actions
export default modalSlice.reducer
```

## **modal.types.ts**
```ts
export interface ModalStyle {
  width: number,
  height: number,
}

export type ModalInfo = {
  title: string,
  style?: {
    width: number,
    height: number,
  }
}

export interface ModalState {
  isModalOpen: boolean,
  modalInfo: {
    title: string,
    style: {
      width: number,
      height: number,
    },
  }
}
```

# ***How to use redux***
以下、タイトルとサイズを状態管理して可変にしているモーダルウィンドウ  
useSelectorでStateの値を取得、Vuexのgettersみたいなもの  
useDispatchでStateの値を変更する、VuexのActions,Mutationsみたいなもの

## **モーダルウィンドウを呼び出しているComponent**
```ts
const openModal = () => {
  const modal_info = {
    title: 'This is modal window',
    style: {
      width: 600,
      height: 400
    }
  }
  dispatch(modalReducer.openModal(modal_info))
}
```

## **Modal.tsx**
```ts
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '@/redux/store'
import { modalReducer } from '@/redux/modal/modal.reducer'
import { CSSTransition } from 'react-transition-group'
import styles from './Modal.module.sass'

const Modal = () => {
  const isModalOpen = useSelector((state: RootState) => state.modal.isModalOpen)
  const modal_info = useSelector((state: RootState) => state.modal.modalInfo)
  const dispatch = useDispatch()
  
  const closeModal = () => {
    dispatch(modalReducer.closeModal())
  }

  return (
    <CSSTransition
      in={isModalOpen}
      timeout={390}
      unmountOnExit
      classNames={{
        enter:       styles['modal-enter'],
        enterActive: styles['modal-enter-active'],
        enterDone:   styles['modal-enter-done'],
        exit      :  styles['modal-exit'],
        exitActive:  styles['modal-exit-active']
      }}>
      <div>
        <div className={styles['modal-overlay']} onClick={closeModal}>
          <div style={{width: modal_info.style.width + 'px', height: modal_info.style.height + 'px'}}
               onClick={(event) => event.stopPropagation()}>
              <div className={styles['modal-content']}>
                <header>{ modal_info.title }</header>
                <div>use this area message board</div>
                <footer>ok or close button</footer>
              </div>
          </div>
        </div>
      </div>
    </CSSTransition>
  )
}
export default Modal
```

## **// TODO 後で読む**

**[Redux入門者向け初めてのRedux Toolkit](https://reffect.co.jp/react/redux-toolkit#Redux_Toolkit)**

**[[Redux Toolkit] 4つの主要APIについて](https://qiita.com/10mi8o/items/5b5ded0504b0f28ac611)**
