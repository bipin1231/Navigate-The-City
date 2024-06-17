import React from 'react'
import {Card, CardHeader, CardBody, CardFooter,Divider} from "@nextui-org/react";
import { useLocation } from 'react-router-dom';

import { Link } from 'react-router-dom';
import {useDispatch,useSelector} from 'react-redux'
import { search } from '../../ticketStore/ticketSlice';

function SelectBus() {
  let busSearch={
    from:"",
    to:"",
    date:"",
  }

//   const location = useLocation();
//   const data = location.state; 
// //  console.log(data);
  
//   busSearch.from=data.From.value
//   busSearch.to=data.To.value
//   busSearch.date=data.date

  //console.log(busSearch);

  const info=useSelector(state=>state.tkt)
  console.log(info);
  return (
    <div className='w-full flex mt-10 justify-center gap-4'>
        <Card className='w-[90%] md:w-[40%] '>
      <CardBody>
       
      <div className='w-full flex justify-center cursor-pointer '>
     
        <Card className='w-[90%]  bg-neutral-900 text-white hover:bg-gray-950'>
        <Link to={'/selectseat'}>
      <CardHeader>
      <h1 className='font-semibold text-xl'>Bipin Travels</h1>
      </CardHeader>
      <Divider/>
      <CardBody>
      <p>Total Seat : 32</p>
      <p>Available Seat : 10</p>
      </CardBody> </Link>
    </Card>
   
   </div>
  
   <div className='w-full flex justify-center mt-4 cursor-pointer'>
        <Card className='w-[90%]  bg-neutral-900 text-white hover:bg-gray-950'>
      <CardHeader>
      <h1 className='font-semibold text-xl'>Super Express</h1>
      </CardHeader>
      <Divider/>
      <CardBody>
      <p>Total Seat : 35</p>
      <p>Available Seat : 7</p>
      </CardBody>
    </Card>
   </div>
      </CardBody>
    </Card>
   </div>
  )
}

export default SelectBus
