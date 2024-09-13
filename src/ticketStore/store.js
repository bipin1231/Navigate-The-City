// import {configureStore} from '@reduxjs/toolkit'
// import ticketSlice from './ticketSlice'
// import authSlice from './authSlice'
// import storage from 'redux-persist/lib/storage';
// import { persistReducer } from 'redux-persist';
// import { combineReducers } from '@reduxjs/toolkit';

import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux'; // Use 'redux' instead of '@reduxjs/toolkit'
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import ticketSlice from './ticketSlice'; // Ensure correct path
import authSlice from './authSlice'; // Ensure correct path

const persistConfig={
  key:"root",
  version:1,
  storage
}

const reducer=combineReducers({
  tkt:ticketSlice,
  auth:authSlice
});

const persistedReducer=persistReducer(persistConfig,reducer);

const store=configureStore({
  reducer:persistedReducer
  // reducer:{
  //   tkt:ticketSlice,
  //   auth:authSlice
  // }

});
// Create persistor
export const persistor = persistStore(store);

export default store;

// const reducer={
//   ticketSlice,
//   authSlice
// }

// export const store=configureStore({reducer})