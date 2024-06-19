import React,{useState,useEffect} from 'react'

import {Card, CardHeader, CardBody, CardFooter,Divider} from "@nextui-org/react";

import service from '../../appwrite/config';

function BusRoute() {

const [routeInfo,setRouteInfo]=useState([]);
const [busInfo,setBusInfo]=useState([]);
//const [routes,setRoutes]=useState([]);

useEffect(()=>{
  const fetchRouteInfo = async () => {
  
    const data = await service.fetchRoute();

   setRouteInfo(data.documents)
   
  }
  const fetchBusInfo = async () => {
  
    const data = await service.fetchBus();

   setBusInfo(data.documents)
   
  }

  fetchRouteInfo();
  fetchBusInfo();

  // routeInfo.map((r)=>(
  //   setRoutes(`${r.from}+" to "+${r.to}`)
   
  //  ))
  //  console.log("rouuuurre",routes);
},[])



console.log("info",routeInfo);
console.log("buss",busInfo);
  return (
   
  <div className='w-full flex justify-center gap-4'>
        <Card className='w-[90%] md:w-[40%] mt-10'>
     
        {routeInfo.map((r,index)=>(
          <div key={index}>
                 <CardBody>
              <div  className='w-full flex justify-center'>
              <Card className='w-[90%]  bg-neutral-900 text-white'>
            <CardHeader>
            <h1><span>{r.from} To {r.to}</span></h1>
            </CardHeader>
            <Divider/>
            <CardHeader>
            {/* <p>Total Bus : 5</p> */}
            </CardHeader>
          </Card>
         </div>
         </CardBody>
         </div>
        ))}
      

     
    </Card>
   </div>
 
  )
}

export default BusRoute
