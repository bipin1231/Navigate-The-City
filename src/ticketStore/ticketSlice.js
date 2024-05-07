import { createSlice } from "@reduxjs/toolkit";
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import { persistReducer, persistStore } from 'redux-persist';

const initialState={
  key:'ticket',
  ticketData:{
    text:"hello world",
  
  },
  seatPrice:{},
  storage
}

//const persistedReducer = persistReducer(initialState);

export const ticketSlice=createSlice({
  name:"ticket",
initialState,
  reducers:{
    search:(state,action)=>{
      state.ticketData=action.payload
    },
    seatPrices:(state,action)=>{
      state.seatPrice=action.payload
    },
  //  persistedReducer
  }
})

export const {search,seatPrices}=ticketSlice.actions

export default ticketSlice.reducer

//export const persistor=persistStore(ticketSlice)
