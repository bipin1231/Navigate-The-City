import React from 'react'
import {Card, CardHeader, CardBody, CardFooter,Divider} from "@nextui-org/react";
import { Link } from 'react-router-dom';

function SelectBus() {
  return (
    <div className='w-full flex mt-10 justify-center gap-4'>
        <Card className='w-[40%] '>
      <CardBody>
       
      <div className='w-full flex justify-center cursor-pointer '>
     
        <Card className='w-[90%]  bg-neutral-900 text-white hover:bg-gray-950'>
        <Link to={'/selectseat'}>
      <CardHeader>
      <h1 className='font-semibold text-xl'>Bipin Travels</h1>
      </CardHeader>
      <Divider/>
      <CardBody>
      <p>Total Seat : 32</p>
      <p>Available Seat : 10</p>
      </CardBody> </Link>
    </Card>
   
   </div>
  
   <div className='w-full flex justify-center mt-4 cursor-pointer'>
        <Card className='w-[90%]  bg-neutral-900 text-white hover:bg-gray-950'>
      <CardHeader>
      <h1 className='font-semibold text-xl'>Super Express</h1>
      </CardHeader>
      <Divider/>
      <CardBody>
      <p>Total Seat : 35</p>
      <p>Available Seat : 7</p>
      </CardBody>
    </Card>
   </div>
      </CardBody>
    </Card>
   </div>
  )
}

export default SelectBus
