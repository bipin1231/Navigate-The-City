import React from 'react'
import { useLocation } from 'react-router-dom'
import { Card, CardHeader, CardBody, CardFooter, Divider } from "@nextui-org/react";
import { Button, ButtonGroup } from "@nextui-org/react";
import Select from 'react-select';
import { useForm, Controller } from 'react-hook-form';
import {Input} from "@nextui-org/input";
function TicketCard() {

  const location = useLocation();
 
  const seats = location.state.seatNo
  const renderSeats= ()=>{
    

  }
  

  const price = location.state.price;


  return (
    <div className='w-full flex mt-5 justify-center'>
      <Card className='w-[40%]  flex mt-10 justify-center  '>


        <CardHeader className='align-middle items-center flex  justify-center'>
          <h1 className='text-2xl font-semibold'>Booking Confirmation</h1>
        </CardHeader>
        <CardBody className='flex  justify-center gap-10'>

          <Card className=''>
            <CardHeader className=' flex flex-col justify-start text-xl font-semibold'>
              <h1>Bipin Travels</h1>

            </CardHeader>
            <Divider />
            <CardBody>
              <div className='flex justify-around'>
                <div className='flex flex-col gap-5 '>
                  <div>
                    <p className='text-lg font-medium'>
                      Route
                    </p>
                    <p>
                      Kathmandu-Chitwan
                    </p>
                  </div>
                  <div>
                    <p className='text-lg font-medium'>
                      No. of Passenger
                    </p>
                    <p>
                      {seats.length}
                    </p>
                  </div>
                </div>
                <div>
                  <div className='flex flex-col gap-5'>
                    <div>
                      <p className='text-lg font-medium'>
                        Date
                      </p>
                      <p>
                        2023-1-1
                      </p>
                    </div>
                    <div>
                      <p className='text-lg font-medium'>
                        Seat No.
                      </p>
                      <p>
                      {seats.join(',')}
                      </p>
                    {/* <div className='flex'>
                      {seats.map((seat) => 
                        <p key={seat}>
                       {seat}
                        </p>
                      )}
</div> */}

                    </div>
                  </div>

                </div>
              </div>
            </CardBody>
            <Divider />
            <CardFooter className='flex justify-between'>


              <p className='text-lg font-medium'>
                Total Amount
              </p>


              <p className='text-lg font-medium'>
                {price}


              </p>

            </CardFooter>

          </Card>
          <Card className=''>
            <CardHeader className=' flex flex-col justify-start text-xl font-semibold'>
              <h1>Contact Details</h1>

            </CardHeader>
            <Divider />
            <CardBody>
              <div className='flex justify-center'>
                <div className='flex flex-col gap-5 w-[60%]'>
              <Input 
              variant='underlined'
              color='black'
              type="email" label="Email" />
              <Input 
              max={10}
              color='primary'
              type="number" label="Number" />
              <Input 
           
              color='primary'
              type="text" label="Full Name" />
              </div>
              </div>
            </CardBody>
            <Divider />
            <CardFooter className='flex justify-between'>

            </CardFooter>

          </Card>



        </CardBody>
        <CardFooter>

        </CardFooter>
      </Card>


    </div>
  )
}

export default TicketCard
