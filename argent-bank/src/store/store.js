import { configureStore } from '@reduxjs/toolkit'
import { userReducer } from '../reducers/userReducer'
import { logIn } from '../actions/user.actions'

let state = {}

export const store = configureStore({
  preloadedState: state,
  reducer: {
    user: userReducer,
  },
})

store.dispatch(logIn(false))
