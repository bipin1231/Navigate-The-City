import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

import {NextUIProvider} from '@nextui-org/react'



import { Route,RouterProvider,createBrowserRouter,createRoutesFromElements } from 'react-router-dom'

import Login from './components/Login/Login.jsx'
import BusRoute from './components/BusRoute/BusRoute.jsx'
import Home from './components/Home/Home.jsx'
import Layout from './Layout.jsx'

import SelectBus from './components/Ticket/SelectBus.jsx'
import SelectSeat from './components/Ticket/SelectSeat.jsx'
import SearchBus from './components/Ticket/SearchBus.jsx'
import TicketCard from './components/Ticket/TicketCard.jsx'
import ConfirmationCard from './components/Ticket/ConfirmationCard.jsx'


import { store } from './ticketStore/store'
import { Provider } from 'react-redux'
const router=createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Layout/>}>
      <Route path='/' element={<Home/>}/>
      <Route path='home' element={<Home/>}/>
      <Route path='searchbus' element={<SearchBus/>}/>
      <Route path='selectbus' element={<SelectBus/>}/>
      <Route path='selectseat' element={<SelectSeat/>}/>
      <Route path='ticketcard' element={<TicketCard/>}/>
      <Route path='confirmationcard' element={<ConfirmationCard/>}/>
      <Route path='route' element={<BusRoute/>}/>
      <Route path='login' element={<Login/>}/>
    </Route>
  )
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <Provider store={store}>
        <NextUIProvider>
       
   <RouterProvider router={router}/>
   
   </NextUIProvider>
   </Provider>
  </React.StrictMode>,
)
