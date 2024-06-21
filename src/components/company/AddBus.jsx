import React, { useEffect } from 'react'

import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/react";
import { Input } from '@nextui-org/input';
import { Button, ButtonGroup } from "@nextui-org/react";
import { useForm, Controller } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux'
import service from '../../appwrite/config';
import authService from '../../appwrite/auth';
function AddBus() {
  const selector=useSelector(state=>state.auth.userData);
  //console.log(selector);
  
//   useEffect(()=>{
// const fetchUser=async()=>{
// const data=await service.fetchUser(selector.$id)
// console.log(data);

// }
// fetchUser();
// },[])

const {
  register,
  handleSubmit,
  formState: { errors }
} = useForm();
const onSubmit = async(data) => {
 
  console.log(data);

  try {
    const userData = await service.addBus(data)
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
        <div className='w-full flex justify-center gap-4 h-96'>
          <Card className='w-[90%] md:w-[40%] mt-10'>
            <CardBody>
              <div className='flex justify-center'>
                <div className='flex flex-col gap-5 w-[95%] md:w-[60%]'>
                  <Input
                    variant='underlined'
                    color='black'
                    type="text" label="Owner Full Name"
                    {...register("ownerName", {required: true })}
                  />
                  <Input
                    variant='underlined'
                    color='black'
                    type="text" label="Bus Route"
                    {...register("route", {required: true })}
                  />
               
                
                  <Input
                    variant='underlined'
                    color='black'
                    type="text" label="Current Bus No."
                    {...register("busNo", {required: true})}
/>
              
      
                  <Button type='submit' radius="full" className='w-full font-semibold text-lg'>
                  Add Bus
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

export default AddBus
