import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import * as ModalType from './modal.types'

const initialState = {
  disp_message: 'temp',
  modal_style: {
    width: 390,
    height: 260,
  },
} as ModalType.ModalState

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    dispMessage(state, action: PayloadAction<string>) {
      state.disp_message = action.payload
    },
    modalWinSize(state, action: PayloadAction<ModalType.ModalStyle>) {
      state.modal_style = action.payload
    },
  }
})

export const { ...reducers } = modalSlice.actions
export default modalSlice.reducer