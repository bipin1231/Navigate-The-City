import React, { useState } from 'react'

import { Link, NavLink, useNavigate } from 'react-router-dom'


import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/react";
import { DatePicker } from "@nextui-org/date-picker";



import { Button, ButtonGroup } from "@nextui-org/react";

import { useForm, Controller } from 'react-hook-form';

import { useDispatch, useSelector } from 'react-redux'

import { Input } from "@nextui-org/input";

import authService from "../../appwrite/auth";

function Signup() {

  const [password, setPassword] = useState("");
  const [cpassword, setCPassword] = useState("");


  const navigate = useNavigate();



  const dispatch = useDispatch()

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();
  const onSubmit = async(data) => {
    console.log(data);

    //navigate('/selectbus',{state:{...data}});

    try {
      const userData = await authService.createAccount(data)
      if (userData) {
          const userData = await authService.getCurrentUser()
        console.log(userData);
     
      }
  } catch (error) {
      console.log(error);
  }

  };


  





  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='w-full flex mt-10 justify-center gap-4 h-96'>
          <Card className='w-[40%] '>
            <CardBody>
              <div className='flex justify-center'>
                <div className='flex flex-col gap-5 w-[60%]'>
                  <Input
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
                    {...register("password", {required: true })}
                  //  onChange={(e) => setPassword(e.target.value)}
                  />

                  {/* <Input
                    variant='underlined'
                    color='black'
                    type="password" label="Confirm Password"
                    {...register("cpassword")}
               
                  /> */}
              
      
                  <Button type='submit' radius="full" className='w-full font-semibold text-lg'>
                    Continue
                  </Button>
                </div>
              </div>
            </CardBody>
          </Card>
        </div>

      </form>

    </>
  )
}

export default Signup
