import { configureStore } from '@reduxjs/toolkit'
import modalReducer from './modal/modal.reducer'

export const store = configureStore({
  reducer: {
    modal: modalReducer
  },
})

export type RootState = ReturnType<typeof store.getState>
export default store