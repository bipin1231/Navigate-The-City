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
const [userData,setUserData]=useState([])

  const {
    register,
    handleSubmit,
   
  } = useForm();
  const onSubmit = async(data) => {
    console.log(data)
   if(!found){
 try{
      const userInfo = await service.searchBus(data)
      console.log(userInfo.documents[0])
      if (userInfo.total>0) {
       setUserData(userInfo.documents[0])
      setFound(true)
    
      
      }else   alert("nodata found")
      
   

   }
  catch(error){
   console.log("something went wrong")
  }
}

   if(found){
    try {
      const userData = await authService.createDriverAccount(data)
      if (userData) {
        const doc = await authService.getCurrentUser()
        authService.logout();
     console.log(userData);
     navigate("/loginpage")
      }
  } catch (error) {
      console.log(error);
  }
   }
 
  };








  return (
    <>
      {/* <form onSubmit={handleSubmit(onSubmit)}>
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

      </form> */}


<div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Are You A Driver
          </h2>
       
        </div>

        {!found && 
                 <form className="mt-8 space-y-6"  onSubmit={handleSubmit(onSubmit)}>
                 <Input
                    variant='bordered'
              
                    type="text"
                     label="Enter Bus Number"
                    {...register("busNo", {required: true })}
                  />
         
                  <Button type='submit' radius="full" className='w-full font-semibold text-slate-50 text-lg bg-blue-600'>
                   Search
                  </Button>
                  </form>
}
{found && 
        <form className="mt-8 space-y-6"  onSubmit={handleSubmit(onSubmit)}>
          <input type="hidden" name="remember" defaultValue="true" />
       
          <div className="rounded-md shadow-sm space-y-4">
          <Input 
          variant="bordered" 
          value={userData.driver}
          type="text" 
          label="Full Name" 
          {...register("name", { required: true })}
          />
          <Input 
          variant="bordered" 
          type="email" 
          label="Email" 
          {...register("email", { required: true })}
          />
          <Input 
          variant="bordered" 
          type="password" 
          label="password" 
          {...register("password", { required: true })}
          />
           
          </div>

     

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Sign Up
            </button>
          </div>
        </form>
}
  

     
     

      </div>
    </div>

    </>
  )
}

export default DriverSignup
