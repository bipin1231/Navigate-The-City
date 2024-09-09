import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

import {NextUIProvider} from '@nextui-org/react'
import { HashRouter as Router } from 'react-router-dom';



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

import store from './ticketStore/store.js'
import { Provider } from 'react-redux'
import Signup from './components/Login/Signup.jsx'

import { PersistGate } from 'redux-persist/integration/react'
import { persistStore } from 'redux-persist'

import { GoogleOAuthProvider } from '@react-oauth/google';
import SimpleMap from './components/Map/SimpleMap.jsx'
import MultipleUserMap from './components/Map/MultipleUserMap.jsx'
import OldMultipleUserMap from './components/Map/OldMultipleUserMap.jsx'
import CompanySignup from './components/Login/CompanySignup.jsx'
import DriverSignup from './components/Login/DriverSignup.jsx'
import AddBus from './components/company/AddBus.jsx'
import AddRoute from './components/company/AddRoute.jsx'
import ViewBusList from './components/company/ViewBusList.jsx'
import DriverInfo from './components/User/DriverInfo.jsx'
import CompanyInfo from './components/User/CompanyInfo.jsx'
import LandingPage from './components/LandingPage/LandingPage.jsx'
import LoginPage from './components/LandingPage/LoginPage.jsx'
import SignUpPage from './components/LandingPage/SignupPage.jsx'
import ContactPage from './components/LandingPage/ContactPage.jsx'
import NewMultipleUser from './components/Map/NewMapComponent/NewMultipleUser.jsx'

let persistor=persistStore(store)

const router=createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Layout/>}>
      <Route path='/' element={<LandingPage/>}/>
      <Route path='home' element={<LandingPage/>}/>
      <Route path='searchbus' element={<SearchBus/>}/>
      <Route path='selectbus' element={<SelectBus/>}/>
      <Route path='selectseat' element={<SelectSeat/>}/>
      <Route path='ticketcard' element={<TicketCard/>}/>
      <Route path='confirmationcard' element={<ConfirmationCard/>}/>
      <Route path='route' element={<BusRoute/>}/>
      <Route path='login' element={<Login/>}/>
      <Route path='loginpage' element={<LoginPage/>}/>
      <Route path='signup' element={<Signup/>}/>
      <Route path='signuppage' element={<SignUpPage/>}/>
      <Route path='contact' element={<ContactPage/>}/>

      <Route path='companysignup' element={<CompanySignup/>}/>
      <Route path='driversignup' element={<DriverSignup/>}/>
 
      {/* <Route path='map' element={<Map/>}/> */}
      <Route path='map' element={<OldMultipleUserMap/>}/>
      <Route path='newmap' element={<NewMultipleUser/>}/>
      <Route path='addbus' element={<AddBus/>}/>
      <Route path='addroute' element={<AddRoute/>}/>
      <Route path='viewbuslist' element={<ViewBusList/>}/>
      <Route path='DriverInfo' element={<DriverInfo/>}/>
      <Route path='CompanyInfo' element={<CompanyInfo/>}/>
    </Route>
  )
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>

      <Provider store={store}>
        <NextUIProvider>
       <PersistGate persistor={persistor}>
       <GoogleOAuthProvider clientId="577751632897-bb8suvilk3crnlfr4lpcvbs3k4jcdsif.apps.googleusercontent.com">
     <RouterProvider router={router}/> 
    {/* <LandingPage/> */}
   </GoogleOAuthProvider>
   </PersistGate>
   </NextUIProvider>
   </Provider>

  </React.StrictMode>,
  
)
