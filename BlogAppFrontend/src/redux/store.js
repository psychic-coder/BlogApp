import { configureStore } from '@reduxjs/toolkit'
import userReducer from './user/userSlice'
//in the above line we are importing the userSlice.reducer

export const store = configureStore({
  reducer: {
    user:userReducer,
  },
})