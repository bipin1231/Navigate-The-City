import {configureStore} from '@reduxjs/toolkit'
import ticketSlice from './ticketSlice'
import authSlice from './authSlice'
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';
import { combineReducers } from '@reduxjs/toolkit';

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
export default store;

// const reducer={
//   ticketSlice,
//   authSlice
// }

// export const store=configureStore({reducer})