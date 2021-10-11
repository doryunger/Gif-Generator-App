import { configureStore } from '@reduxjs/toolkit'
import stateSlice from './createStateSlice'


export default configureStore({
  reducer: {
    appProgress: stateSlice,
  },
})