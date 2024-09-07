import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { Button, ButtonGroup } from "@nextui-org/react";
import { Input } from "@nextui-org/input";

import { useForm, Controller } from 'react-hook-form';

import { useDispatch, useSelector } from 'react-redux'

import authService from '../../appwrite/auth';

function SignUpPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();
  const onSubmit = async (data) => {
    console.log(errors);
    setLoading(true);
    
    try {
      const userData = await authService.createAccount(data)
      if (userData) {
        const userData = await authService.getCurrentUser()
        authService.logout();
        console.log(userData);
        navigate('/loginpage');

      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center mt-10 bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Create your account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Already have an account? {' '}
            <Link to={'/loginpage'}>
              <span href="#" className="font-medium text-blue-600 hover:text-blue-500">
                Sign in
              </span>
            </Link>
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <input type="hidden" name="remember" defaultValue="true" />

          <div className="rounded-md shadow-sm space-y-4">
          <Input
                    variant='bordered'
                    type="text" 
                    label="Full Name"
                    {...register("name", {required: true })}
                  />
          <Input
                    variant='bordered'
                    type="email" 
                    label="Email"
                    {...register("email", {required: true })}
                  />
             <Input
                    variant='bordered'
                    type="password" 
                    label="Password"
                    {...register("password", {required: true,minLength:8 })}
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
        <div className="mt-6 text-center space-y-2">
          <p className="text-gray-600">Or sign up as:</p>
          <div className="flex justify-center space-x-6">
            <a
              href="/signup-driver"
              className="text-blue-600 hover:text-blue-500 font-medium"
            >
              Driver
            </a>
            <a
              href="/signup-company"
              className="text-blue-600 hover:text-blue-500 font-medium"
            >
              Company
            </a>
          </div>
        </div>
        <div className="relative mt-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-gray-50 text-gray-600">OR</span>
          </div>
        </div>

        <div>
          <Button
            color=''
            radius="full" className='w-full font-semibold text-lg'
          // onClick={googleAuth}
          >
            <img className='w-9 bg-transparent' src="https://imagepng.org/wp-content/uploads/2019/08/google-icon.png" alt="" />
            <p> Sign in with Google</p>
          </Button>
        </div>

        {loading && (
          <div className='fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50'>
            <img src="../loading.gif" alt="Loading..." className='w-30 h-30' />
          </div>
        )}

      </div>
    </div>
  );
}

export default SignUpPage;
