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
    buttonItems: [{
      btnTitle: '',
      callback: Function.prototype,
    }]
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
      for (let i = 0; i < payload.buttonItems!.length; i++) {
        state.modalInfo.buttonItems[i].btnTitle = payload.buttonItems![i].btnTitle
        state.modalInfo.buttonItems[i].callback = payload.buttonItems![i].callback
      }
    },
    closeModal(state) {
      state.isModalOpen = false
    },
  }
})

export const modalReducer = modalSlice.actions
export default modalSlice.reducer