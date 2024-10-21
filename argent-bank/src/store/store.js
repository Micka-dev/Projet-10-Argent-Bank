import { configureStore } from '@reduxjs/toolkit'

import { userSlice } from '../slices/userSlice'

let state = {}

export const store = configureStore({
  preloadedState: state,
  reducer: {
    user: userSlice.reducer,
  },
})
