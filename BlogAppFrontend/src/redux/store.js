import { configureStore,combineReducers  } from '@reduxjs/toolkit'
import userReducer from './user/userSlice'
//in the above line we are importing the userSlice.reducer

import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';


//if we have multiple reducers then we have the power to combine the reducers
const rootReducer=combineReducers({
  user:userReducer,
})
 const persistConfig={
  key:'root',
  storage,
  version:1,

 };

const persistedReducer=persistReducer(persistConfig,rootReducer);


//inplace of adding all the reducers we just added the persistedReducer
export const store=configureStore({
  reducer:persistedReducer,
  //the middleware is needed to prevent the error using redux toolkit
  middleware:(getDefaultMiddleware)=>
  getDefaultMiddleware({ serializableCheck:false}),
});

export const persistor=persistStore(store);

