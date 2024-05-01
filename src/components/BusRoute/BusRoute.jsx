import React from 'react'

import {Card, CardHeader, CardBody, CardFooter,Divider} from "@nextui-org/react";



function BusRoute() {
  return (
   
  <div className='w-full flex mt-10 justify-center gap-4'>
        <Card className='w-[40%] '>
      <CardBody>
      <div className='w-full flex justify-center'>
        <Card className='w-[90%]  bg-neutral-900 text-white'>
      <CardHeader>
      <h1><span>Chitwan To Kathmandu</span></h1>
      </CardHeader>
      <Divider/>
      <CardHeader>
      <p>Total Bus : 5</p>
      </CardHeader>
    </Card>
   </div>
   <div className='w-full flex justify-center mt-4'>
        <Card className='w-[90%]  bg-neutral-900 text-white'>
      <CardHeader>
      <h1><span>Chitwan To Kathmandu</span></h1>
      </CardHeader>
      <Divider/>
      <CardHeader>
      <p>Total Bus : 15</p>
      </CardHeader>
    </Card>
   </div>
      </CardBody>
    </Card>
   </div>
 
  )
}

export default BusRoute
