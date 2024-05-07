import {configureStore} from '@reduxjs/toolkit'
import ticketSlice from './ticketSlice'

export const store=configureStore({
  reducer:ticketSlice
})