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