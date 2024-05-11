import React, { useState } from 'react'

import { Link, NavLink, useNavigate } from 'react-router-dom'


import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/react";
import { DatePicker } from "@nextui-org/date-picker";



import { Button, ButtonGroup } from "@nextui-org/react";

import { useForm, Controller } from 'react-hook-form';

import { useDispatch, useSelector } from 'react-redux'

import { Input } from "@nextui-org/input";

import authService from "../../appwrite/auth";
import { login as authLogin } from '../../ticketStore/authSlice';

import { GoogleLogin, useGoogleLogin } from '@react-oauth/google';
import { jwtDecode } from "jwt-decode";
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
  
      const session = await authService.login(data)
      if (session) {
          const userData = await authService.getCurrentUser()
          if(userData) dispatch(authLogin(userData));
          navigate("/")
         console.log(userData);
      }
  } catch (error) {
      console.log(error);
  }



  };

const googleAuth=
    useGoogleLogin({
      onSuccess:(takeResponse)=>console.log(takeResponse)
    })  
 

  





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
                 Login
                  </Button>
                  <div>
                   
                  <Button 
                  color='pri'
                  radius="full" className='w-full font-semibold text-lg'
                  onClick={()=>googleAuth()}
                  >
                     <img className='w-9 bg-transparent' src="https://imagepng.org/wp-content/uploads/2019/08/google-icon.png" alt="" />
               <p> Sign in with Google</p>
                  </Button>
</div>


                  <GoogleLogin
                  
  onSuccess={credentialResponse => {
    console.log(credentialResponse);
    console.log(jwtDecode(credentialResponse.credential));

    const userData=authService.googleLogin();
  }}
  onError={() => {
    console.log('Login Failed');
  }}
/>;
             
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
