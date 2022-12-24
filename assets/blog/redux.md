---
title: 'Redux Library'
date: '20221223'
thumbnail: '/images/NextJs.jpg'
---

# ***Redux Library***

## **ディレクトリ構成**
Component思考が強いから(?)Vuexとは違って、特定のComponent用にReduxを用意する  
この記事はモーダルウィンドウ用に作ったReduxをもとに記述している
```Text
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

storeはアプリケーションすべてのstate値を保持しているオブジェクトでActionをStoreにDispatchするための手段を提供している。

```ts
import { configureStore } from '@reduxjs/toolkit'
import modalReducer from './modal/modal.reducer'

export const store = configureStore({
  reducer: {
    modal: modalReducer,
    other: otherReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          'modal/openModal',
        ],
        ignoredPaths: [
          'modal.modalInfo.buttonItems'
        ]
      },
    }),
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
      fSize: 25,
    },
    buttonItems: [{
      btnTitle: '',
      callback: Function.prototype,
    }],
    component: '',
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
                                             : initialState.modalInfo.style
      state.modalInfo.buttonItems = payload.buttonItems! ? payload.buttonItems.slice()
                                                         : initialState.modalInfo.buttonItems.slice()
      state.modalInfo.component = payload.component
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
  fSize: number,
}

export interface ButtonItems {
  btnTitle: string,
  callback: () => void,
}

export type ModalInfo = {
  title: string,
  style?: ModalStyle,
  buttonItems?: Array<ButtonItems>,
  component: string,
}

export interface ModalState {
  isModalOpen: boolean,
  modalInfo: {
    title: string,
    style: ModalStyle,
    buttonItems: Array<ButtonItems>,
    component: string,
  },
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
import styles from '@/styles/components/Modal.module.sass'
import { ButtonItems } from '@/redux/modal/modal.types'

// ViewComponent
import ComingSoon from './comingsoon'

// *** How to use Modal Window ************************** //
//
// const openModal = () => {
//   const modalInfo = {
//     title: 'This is sample modal',
//     style: { //default // other recommended styles
//       width: 390,      // 600, 900
//       height: 260,     // 400, 600
//       fSize: 25,       // 35,  50
//     },
//     buttonItems:[{
//       btnTitle: 'OK',
//       callback: () => clickOk(),
//     }],
//     component: 'comingsoon'
//   }
//   dispatch(modalReducer.openModal(modalInfo))
// }
//
// ****************************************************** //

interface CompProps {
  childComp: string
}

function ViewComponent(props: CompProps) {

  switch(props.childComp) {
  case 'commingsoon':
    return <ComingSoon/>
  default:
    console.log('Error, not found component')
    return <></>
  }
}

interface BtnProps {
  btnItems: Array<ButtonItems>,
  btnFont: number,
}
function ExecButton(props: BtnProps) {
  const execButton = props.btnItems.map((el) =>
    <li key={el.btnTitle}
        className="inline ml-3 list-none"
        onClick={el.callback}
    >
      <span style={{fontSize: props.btnFont / 2 + 'px'}}>
        {el.btnTitle}
      </span>
    </li>
  )

  return (
    <>{ execButton }</>
  );
}

const Modal = () => {
  const isModalOpen = useSelector((state: RootState) => state.modal.isModalOpen)
  const modalInfo = useSelector((state: RootState) => state.modal.modalInfo)
  const dispatch = useDispatch()
  
  const closeModal = () => {
    dispatch(modalReducer.closeModal())
  }

  return (
    <CSSTransition
      in={isModalOpen}
      timeout={390}
      unmountOnExit
      styles={{zIndex: 20}}
      classNames={{
        enter:       styles['modal-enter'],
        enterActive: styles['modal-enter-active'],
        enterDone:   styles['modal-enter-done'],
        exit:        styles['modal-exit'],
        exitActive:  styles['modal-exit-active']
      }}>
      <div>
        <div className={styles['modal-overlay']} onClick={closeModal}>
          <div style={{width: modalInfo.style.width + 'px', 
                       height: modalInfo.style.height + 'px',}}
               onClick={(event) => event.stopPropagation()}>
              <div className={styles['modal-content']}>
                <header className="flex h-1/6 justify-center">
                  <span className="font-bold"
                        style={{fontSize: modalInfo.style.fSize + 'px'}}>
                    {modalInfo.title}
                  </span>
                </header>
                <div className="h-2/3">
                  <ViewComponent
                    childComp={modalInfo.component} />
                </div>
                <footer className="flex h-1/6 items-center justify-end">
                  <ExecButton
                    btnItems={modalInfo.buttonItems}
                    btnFont={modalInfo.style.fSize} />
                  <li className="inline ml-3 list-none"
                      onClick={closeModal}>
                    <span className="font-bold hover:underline"
                          style={{fontSize: modalInfo.style.fSize / 2 + 'px'}}>Close</span>
                  </li>
                </footer>
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
