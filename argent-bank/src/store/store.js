import { configureStore } from '@reduxjs/toolkit'

import { userReducer } from '../reducers/userReducer'

let state = {}

export const store = configureStore({
  preloadedState: state,
  reducer: {
    user: userReducer,
  },
})
