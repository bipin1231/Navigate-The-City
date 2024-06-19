import React from 'react'
import { Card, CardHeader, CardBody, CardFooter, Divider } from "@nextui-org/react";
import { Button, ButtonGroup, Input } from "@nextui-org/react";
function ConfirmationCard() {
  return (
    <div className='w-full flex justify-center'>
      <Card className='w-[90%] md:w-[40%]  flex mt-10 justify-center  '>


        <CardHeader className='align-middle items-center flex  justify-center'>
          <h1 className='text-2xl font-semibold'>Confirmation</h1>
        </CardHeader>
        <CardBody className='flex  justify-center gap-10'>

          <Card className=''>
            <CardHeader className=' flex flex-col justify-start text-xl font-semibold'>
              <h1>Trip Details</h1>

            </CardHeader>
            <Divider />
            <CardBody>
              <div className='flex justify-around'>
                <div className='flex flex-col gap-5 '>

                  <p className='text-lg font-medium'>
                    Route
                  </p>



                  <p className='text-lg font-medium'>
                    Date
                  </p>


                  <p className='text-lg font-medium'>
                    No. of Passenger
                  </p>


                  <p className='text-lg font-medium'>
                    Price
                  </p>


                </div>
                <div>
                  <div className='flex flex-col gap-5'>

                    <p className='text-lg font-medium'>
                      ktm-chitwan
                    </p>


                    <p className='text-lg font-medium'>
                      2023-01-01
                    </p>
                    <p className='text-lg font-medium'>
                      3
                    </p>
                    <p className='text-lg font-medium'>
                      800
                    </p>


                  </div>

                </div>
              </div>
            </CardBody>



          </Card>
          <Card className=''>
            <CardHeader className=' flex flex-col justify-start text-xl font-semibold'>
              <h1>Contact Details</h1>

            </CardHeader>
            <Divider />
            <CardBody>
              <div className='flex justify-around'>
                <div className='flex flex-col gap-5 '>
                  <p className='text-lg font-medium'>
                  Name
                  </p>
                
<p className='text-lg font-medium'>
                 Email
                  </p>
           <p className='text-lg font-medium'>
                    Phone
                  </p>
                </div>
                <div className='flex flex-col gap-5 '>
                  <p className='text-lg font-medium'>
                ashfa adhajs
                  </p>

                  <p className='text-lg font-medium'>
             hajdja
                  </p>


                  <p className='text-lg font-medium'>
                 djhjhjdja
                  </p>


                 
                </div>
              </div>

            </CardBody>
            <Divider />
            <CardFooter className='flex justify-between'>

            </CardFooter>

          </Card>



        </CardBody>
        <CardFooter>
        <Button radius="full" className='w-full font-semibold text-lg'>
          Confirm
          </Button>
        </CardFooter>
      </Card>


    </div>
  )
}

export default ConfirmationCard
