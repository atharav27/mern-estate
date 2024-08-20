import { configureStore, findNonSerializableValue } from '@reduxjs/toolkit'
import  useReducer  from './user/userSlice'

export const store = configureStore({
  reducer: {  user: useReducer},

  //we use this to prevent any error in our browser
  middleware: (getDefaltMiddleware) => getDefaltMiddleware({
    SerializableCheck: false,
  })
})