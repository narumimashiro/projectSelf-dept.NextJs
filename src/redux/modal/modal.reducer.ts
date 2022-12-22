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