import React, { useState } from 'react'

import { Link, NavLink, useNavigate } from 'react-router-dom'


import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/react";
import { DatePicker } from "@nextui-org/date-picker";



import { Button, ButtonGroup } from "@nextui-org/react";

import { useForm, Controller } from 'react-hook-form';

import { useDispatch, useSelector } from 'react-redux'

import { Input } from "@nextui-org/input";
import authService from '../../appwrite/auth';
import service from '../../appwrite/config';
function DriverSignup() {


const navigate=useNavigate();

const [found,setFound]=useState(false);

  const {
    register,
    handleSubmit,
   
  } = useForm();
  const onSubmit = async(data) => {
   if(!found){
    try {
      const userData = await service.searchBus(data)
      if (userData) {
      setFound(true)
     
      }
  } catch (error) {
      console.log(error);
  }
   }

   if(found){
    try {
      const userData = await authService.createDriverAccount(data)
      if (userData) {
     
     console.log(userData);
      }
  } catch (error) {
      console.log(error);
  }
   }
  console.log(data);
  console.log("erorrrrr");
  };








  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='w-full flex justify-center gap-4'>
          <Card className='w-[90%] md:w-[40%] mt-10 '>
            <CardBody>
              <div className='flex justify-center'>
                <div className='flex flex-col gap-5 w-[95%] md:w-[60%]'>
              { found && <><Input
                    variant='underlined'
                    color='black'
                    type="text" label="Full Name"
                    {...register("name", {required: true })}
                  />
             
                  <Input
                    variant='underlined'
                    color='black'
                    type="email" label="Email"
                    {...register("email", {required: true })}
                  />
                  <Input
                    variant='underlined'
                    color='black'
                    type="password" label="Password"
                    {...register("password", {required: true,minLength:8 })}
                  />

                  <Button type='submit' radius="full" className='w-full font-semibold text-lg'>
                    Signup
                  </Button></>}
                 {!found && 
                 <>
                 <Input
                    variant='underlined'
                    color='black'
                    type="text" label="Enter Bus Number"
                    {...register("busNo", {required: true })}
                  />
         
                  <Button type='submit' radius="full" className='w-full font-semibold text-lg'>
                   Search
                  </Button>
                  </>
                  }
                
                </div>
              </div>
            </CardBody>
          </Card>
        </div>

      </form>

    </>
  )
}

export default DriverSignup
