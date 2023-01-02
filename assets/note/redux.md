---
title: 'Redux Library'
date: '20230102'
thumbnail: '/images/NextJs.jpg'
---

# **Redux Library**

## **Reduxとは**

ReduxとはUIの状態(state)を管理するための状態管理ライブラリ。  
FaceBook社が提唱しているFluxというデータフロー管理のためのアーキテクチャパターンを採用しています。

Webアプリは、アプリケーション全体にまたがってデータやオブジェクトを保存したり、共有したりする必要があります。  
状態管理ライブラリがない場合、親コンポーネントから子コンポーネントにPropsの形で受け渡すが、規模が大きくなったり、階層の違うコンポーネントに対して渡すときには慎重に行わないと行けず、不具合の原因になりうる。

そんな不安定で管理が複雑な状態を改善することができるのが、Reduxとなります。  
Reduxにはこれから紹介する、「3つのコンセプト」と「4つの要素」によって実現しています。

## **3つのコンセプト**

1. 信頼できる唯一の情報源であること。

Reduxではアプリケーションの状態をStateと呼ばれるオブジェクトツリーで管理しており、Storeがそれを保持しています。  
後ほど具体例を記述するが、Stateはオブジェクトを宣言するのと同じように宣言的で可視化されているので、どのようなデータを管理しているのかが簡単に把握できます。

2. Read Only読み取り専用であること。

Stateに直接アクセスをして値を書き換えることは基本的には許可されていなく、値を書き換えるためにはActionと呼ばれるオブジェクトを発行しなくてはいけません。そのような一元化した仕組みにすることで意図しないタイミングでの値の書き換わりなどを防ぎ、不具合が起きる可能性を低めています。

3. 状態の管理は純粋関数で行われること。

Reducerという純粋関数でStateの変更を行っています。  
先ほどちらっと出てきたActionというオブジェクトとStoreで保持されているStateを用いて、新しいStateを生成します。


# **Modalウィンドウ用Redux**

警告ウィンドウなどユーザーに操作を促すために使われるModalウィンドウですが、今回はこのModalウィンドウの実装をコンポーネントで用意し、それを必要なページにimportし、データをPropsの形で渡して実現するのではなく、状態管理ライブラリ**Redux**を用いて実現してみます。
Reduxを使うことのメリットとしては、いちいちimportする必要がなくなるくらいかもしれませんが、(あとは初期設計ではいらないと思ったが、後付けで必要になったときにPropsを渡すような親子関係ではなく、完全に分離されているので気軽に導入しやすいとか？)Reduxで調べると出てくる解説の多くはTODOリスト作ってみようだと思うので、こういったこともできるのか、ふむふむと思っていただけたら幸いです。

## **ディレクトリ構成**

```Text
src―redux
     |―store.ts
     |―modal
        |―modal.reducer.ts
        |―modal.types.ts
```

## **store.ts**

```ts
import { configureStore } from '@reduxjs/toolkit'
import modalReducer from './modal/modal.reducer'

export const store = configureStore({
  reducer: {
    modal: modalReducer
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

# **How to use redux**
以下、タイトルとサイズを状態管理して可変にしているモーダルウィンドウ  
useSelectorでStateの値を取得、Vuexのgettersみたいなもの  
useDispatchでStateの値を変更する、VuexのActions,Mutationsみたいなもの

## **モーダルウィンドウを呼び出しているComponent**

```ts
const dispatch = useDispatch()
const openModal = () => {
  const modalInfo= {
      title: 'Notice',
      style: {
        width: 900,
        height: 600,
        fSize: 50,
      },
      component: 'commingsoon'
    }
    dispatch(modalReducer.openModal(modalInfo))
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
//     component: 'commingsoon',
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
                <footer className="flex h-1/6 items-center justify-end pr-8">
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

参考ページ : <https://reffect.co.jp/react/redux-toolkit#Redux_Toolkit>

参考ページ : <https://qiita.com/10mi8o/items/5b5ded0504b0f28ac611>
