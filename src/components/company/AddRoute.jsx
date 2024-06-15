import React, { useEffect } from 'react'

import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/react";
import { Input } from '@nextui-org/input';
import { Button, ButtonGroup } from "@nextui-org/react";
import { useForm, Controller } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux'
import service from '../../appwrite/config';
import authService from '../../appwrite/auth';
function AddRoute() {
  const selector=useSelector(state=>state.auth.userData);

const {
  register,
  handleSubmit,
  formState: { errors }
} = useForm();
const onSubmit = async(data) => {
 
  console.log(data);

  try {
    const userData = await service.addRoute(data)
    if (userData) {
    
      console.log(userData);
     // navigate('/login');
   
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
                    type="text" label="From"
                    {...register("from", {required: true })}
                  />
                  <Input
                    variant='underlined'
                    color='black'
                    type="text" label="To"
                    {...register("to", {required: true })}
                  />
               
                
                
              
      
                  <Button type='submit' radius="full" className='w-full font-semibold text-lg'>
                  Add Route
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

export default AddRoute
