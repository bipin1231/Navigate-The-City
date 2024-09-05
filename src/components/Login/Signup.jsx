import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Card, CardBody, Button, Input } from "@nextui-org/react";
import { useForm } from 'react-hook-form';
import authService from '../../appwrite/auth';

function Signup() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async(data) => {
    setLoading(true);
    console.log(errors);
    try {
      const userData = await authService.createAccount(data);
      if (userData) {
        const userData = await authService.getCurrentUser();
        authService.logout();
        console.log(userData);
        navigate('/login');
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='w-full flex justify-center gap-4'>
          <Card className='w-[90%] md:w-[40%] mt-10'>
          <p className='flex justify-center text-xl pt-4'>Signup</p>
            <CardBody>
              <div className='flex justify-center'>
                <div className='flex flex-col gap-5 w-[95%] md:w-[60%]'>
                  <Input
                    variant='underlined'
                    color='black'
                    type="text" label="Full Name"
                    {...register("name", { required: true })}
                  />
                  {console.log(errors)}
                  <Input
                    variant='underlined'
                    color='black'
                    type="email" label="Email"
                    {...register("email", { required: true })}
                  />
                  <Input
                    variant='underlined'
                    color='black'
                    type="password" label="Password"
                    {...register("password", { required: true, minLength: 8 })}
                  />
                  <Button type='submit' radius="full" className='w-full font-semibold text-lg'>
                    Signup
                  </Button>
                  <h1 className='text-center'>For a company?
                    <Link to={'/companysignup'}>
                      <span className='text-blue-600 cursor-pointer ml-2'>Sign Up</span>
                    </Link>
                  </h1>
                  <h1 className='text-center'>Are you a driver?
                    <Link to={'/driversignup'}>
                      <span className='text-blue-600 cursor-pointer ml-2'>Sign Up</span>
                    </Link>
                  </h1>
                </div>
              </div>
              {loading && (
                <div className='fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50'>
                  <img src="../loading.gif" alt="Loading..." className='w-24 h-24' />
                </div>
              )}
            </CardBody>
          </Card>
        </div>
      </form>
    </>
  );
}

export default Signup;
