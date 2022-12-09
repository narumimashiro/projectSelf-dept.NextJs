import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import * as SampleType from './sample.types'

const initialState = {
  sample_message: 'sample message',
} as SampleType.SampleState

const sampleSlice = createSlice({
  name: 'sample',
  initialState,
  reducers: {
    dispMessage(state, action: PayloadAction<string>) {
      state.sample_message = action.payload
    },
  }
})
export const sampleReducer = sampleSlice.actions
export default sampleSlice.reducer