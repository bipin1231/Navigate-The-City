import React from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { Button, ButtonGroup } from "@nextui-org/react";
import { Input } from "@nextui-org/input";

import { useForm, Controller } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux'
import authService from "../../appwrite/auth";
import { login as authLogin } from '../../ticketStore/authSlice';
import { GoogleLogin, useGoogleLogin } from '@react-oauth/google';
import { jwtDecode } from "jwt-decode";
import service from '../../appwrite/config';

function LoginPage() {

  const navigate = useNavigate();
  const dispatch = useDispatch()

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();
  const onSubmit = async (data) => {
    console.log(data);

    //navigate('/selectbus',{state:{...data}});

    try {

      const session = await authService.login(data)
      if (session) {
        const userData = await authService.getCurrentUser()
        if (userData) {
          dispatch(authLogin(userData));
          await service.storeUserLocation({userId:userData.$id,name:userData.name,status:true});
          navigate("/")
          console.log(userData);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const googleAuth = () => {
    authService.googleLogin() 
    }
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Sign in to your account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Or{' '}
            <Link to={'/signuppage'}>
            <span href="#" className="font-medium text-blue-600 hover:text-blue-500">
              create a new account
            </span>
            </Link>
          </p>
        </div>
        <form className="mt-8 space-y-6"  onSubmit={handleSubmit(onSubmit)}>
          <input type="hidden" name="remember" defaultValue="true" />
       
          <div className="rounded-md shadow-sm space-y-4">
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

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember_me"
                name="remember_me"
                type="checkbox"
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="remember_me" className="ml-2 block text-sm text-gray-900">
                Remember me
              </label>
            </div>

            <div className="text-sm">
              <a href="#" className="font-medium text-blue-600 hover:text-blue-500">
                Forgot your password?
              </a>
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Sign in
            </button>
          </div>
        </form>
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

      </div>
    </div>
  );
}

export default LoginPage;
