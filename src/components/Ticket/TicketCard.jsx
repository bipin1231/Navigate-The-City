import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { Card, CardHeader, CardBody, CardFooter, Divider } from "@nextui-org/react";
import { Button, ButtonGroup } from "@nextui-org/react";
import Select from 'react-select';
import { useForm, Controller } from 'react-hook-form';
import { Input } from "@nextui-org/input";
import { useNavigate } from 'react-router-dom';
function TicketCard() {
  const navigate = useNavigate();
  const [myObject, setMyObject] = useState({ key: 'value' });
  const location = useLocation();

  const seats = location.state.seatNo
  useEffect(() => {
    const data = localStorage.getItem('data');
    if (data) {
      setMyObject(JSON.parse(data));
    }



  }, []);

  const price = location.state.price;

  const { register, handleSubmit, control } = useForm();
  const onSubmit = (data) => {
    console.log(data);
    console.log(myObject.date);
    console.log(myObject);
    console.log(price);


      navigate('/confirmationcard');

  }

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
                      {/* {myObject.From.value}-
                     {myObject.To.value} */}
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
                        {myObject.date}
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
                {seats.length * price}


              </p>

            </CardFooter>

          </Card>
          <Card className=''>
            <CardHeader className=' flex flex-col justify-start text-xl font-semibold'>
              <h1>Contact Details</h1>

            </CardHeader>
            <Divider />
            <CardBody>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className='flex justify-center'>
                  <div className='flex flex-col gap-5 w-[60%]'>
                    <Input
                      variant='underlined'
                      color='black'
                      type="email" label="Email"
                      {...register("email")}
                    />
                    <Input
                      color='primary'
                      max={10}
                      type="number" label="Number"
                      {...register("number")}
                      />
                    <Input

                      color='primary'
                      type="text" label="Full Name" 
                      {...register("name")}
                      />
                        <Button type='submit' radius="full" className='w-full font-semibold text-lg'>
                  Continue
                  </Button>
                  </div>
                </div>
              </form>
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
