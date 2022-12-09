import { configureStore } from '@reduxjs/toolkit'
import sampleReducer from './sample/sample.reducer'

export const store = configureStore({
  reducer: {
    sample: sampleReducer
  },
})

export type RootState = ReturnType<typeof store.getState>
export default store