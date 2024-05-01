import React from 'react'
import { Card, CardHeader, CardBody, CardFooter, Divider } from "@nextui-org/react";
import BusSeat from './BusSeat';
function SelectSeat() {
  return (
    <div className='w-full flex mt-10 justify-center gap-4'>
      <Card className='w-[40%]  flex mt-10 justify-center gap-4 '>


        <CardHeader className='align-middle items-center flex justify-center'>
        <h1>Choose your seat</h1>
        </CardHeader>
        <CardBody className='flex  justify-center'>
         
          <Card className=''>
          <CardHeader className=' flex flex-col justify-start'>
          <p>Seats</p>
          <p>A1</p>
        </CardHeader>
            <div className='flex flex-col h-auto'>
              <div className=' flex justify-center gap-14  w-[100%] rounded-xl mt-7 mb-7'>
                <div className='flex gap-4'>
                  <BusSeat />
                  <BusSeat />
                </div>
                <div className='flex gap-4'>
                  <BusSeat />
                  <BusSeat />
                </div>

              </div>
             
            </div>
          </Card>

          <CardFooter className='align-middle items-center flex justify-center'>
            <div className='flex gap-3 align-middle justify-center text-center items-center'>
              <div className='w-5 h-5 bg-blue-600 rounded-md'></div>
              <span>Choosen</span>
            </div>

            <div className='flex gap-2 align-middle justify-center text-center items-center'>
              <div className='w-5 h-5 bg-gray-500 rounded-md'></div>
              <span>Available</span>
            </div>
            <div className='flex gap-2 align-middle justify-center text-center items-center'>
              <div className='w-5 h-5 bg-yellow-500 rounded-md'></div>
              <span>Booked</span>
            </div>
          </CardFooter>
        </CardBody>
      </Card>



    </div>


  )
}

export default SelectSeat
