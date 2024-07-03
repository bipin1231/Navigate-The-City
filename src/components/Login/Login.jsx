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
import service from '../../appwrite/config';
function Login() {
  const [password, setPassword] = useState("");
  const [cpassword, setCPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();
  const onSubmit = async (data) => {
    setLoading(true);
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
    } finally {
    setLoading(false);
  }
  };

  const googleAuth = () => {
    authService.googleLogin()
    }

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='w-full flex justify-center'>
          <Card className='w-[90%] md:w-[40%] mt-10'>
          <p className='flex justify-center text-xl pt-4'>Login</p>
            <CardBody className='p-3 md:p-6'>
              <div className='flex justify-center'>
                <div className='flex flex-col gap-7 w-[95%] md:w-[60%]'>
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
                    {...register("password", { required: true })}

                  />
                  <Button type='submit' radius="full" className='w-full font-semibold text-lg'>
                    Login
                  </Button>
                  <div>
                    <Button
                      color=''
                      radius="full" className='w-full font-semibold text-lg'
                      onClick={googleAuth}
                    >
                      <img className='w-9 bg-transparent' src="https://imagepng.org/wp-content/uploads/2019/08/google-icon.png" alt="" />
                      <p> Sign in with Google</p>
                    </Button>
                  </div>

                  {/* <GoogleLogin
                    onSuccess={credentialResponse => {
                      console.log(credentialResponse);
                      console.log(jwtDecode(credentialResponse.credential));
                      const userData = authService.googleLogin();
                      console.log(userData);
                    }}
                    onError={() => {
                      console.log('Login Failed');
                    }}
                  /> */}
               
                  <h1 className='text-center'>Don't have an account?
                    <Link to={'/signup'}>
                      <span className='text-blue-600 cursor-pointer ml-2'>Sign Up</span>
                    </Link>
                  </h1>
                </div>
              </div>
              {loading && (
                <div className='fixed inset-0 flex items-center justify-center'>
                  <img src="../loading.gif" alt="Loading..." className='w-30 h-30' />
                </div>
              )}
            </CardBody>
          </Card>
        </div>
      </form>
    </>
  )
}
export default Login