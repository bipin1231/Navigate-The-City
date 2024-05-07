import React from 'react'
import { useState,useEffect } from 'react';
import SelectBus from './SelectBus';
import { Link, NavLink,useNavigate } from 'react-router-dom'
import Select from 'react-select';

import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/react";
import { DatePicker } from "@nextui-org/date-picker";

import { parseDate, getLocalTimeZone } from "@internationalized/date";
// import {useDateFormatter} from "@react-aria/i18n";

import { Button, ButtonGroup } from "@nextui-org/react";

import { useForm, Controller } from 'react-hook-form';

import {useDispatch,useSelector} from 'react-redux'
import { search} from '../../ticketStore/ticketSlice';


function SearchBus() {

  // const [isClearable, setIsClearable] = useState(true);
  // const [isSearchable, setIsSearchable] = useState(true);
  // const [isDisabled, setIsDisabled] = useState(false);
  // const [isLoading, setIsLoading] = useState(false);
  // const [isRtl, setIsRtl] = useState(false);
  const navigate = useNavigate();

  const [busInfo,setBusInfo]= useState({});

  const colourOptions = [
    { label: 'Kathmandu', value: 'Kathmandu' },
    { label: 'Chitwan', value: 'Chitwan' },
    { label: 'Pokhara', value: 'Pokhara' },

  ];

  const today = new Date();
  const y = today.getFullYear();
  const m = today.getMonth() + 1 < 10 ? "0" + (today.getMonth() + 1) : (today.getMonth() + 1);
  const d = today.getDate() < 10 ? "0" + today.getDate() : today.getDate();


  const [value, setValue] = React.useState(parseDate(`${y}-${m}-${d}`));

  function todayDate() {
    const today = new Date();
    const y = today.getFullYear();
    const m = today.getMonth() + 1 < 10 ? "0" + (today.getMonth() + 1) : (today.getMonth() + 1);
    const d = today.getDate() < 10 ? "0" + today.getDate() : today.getDate();

    setValue(parseDate(`${y}-${m}-${d}`));
  }
  function tomorrowDate() {
    const today1 = new Date();
    const today = new Date(today1);
    today.setDate(today1.getDate() + 1);
    const y = today.getFullYear();
    const m = today.getMonth() + 1 < 10 ? "0" + (today.getMonth() + 1) : (today.getMonth() + 1);
    const d = today.getDate() < 10 ? "0" + today.getDate() : today.getDate();
    setValue(parseDate(`${y}-${m}-${d}`));

  }


  const dispatch=useDispatch()
  
  const { register, handleSubmit, control } = useForm();
  const onSubmit = (data) =>{

    localStorage.setItem('data', JSON.stringify(data));
  //  e.preventDefault();
  
    dispatch(search(data))

   
 navigate('/selectbus',{state:{...data}});


   
  } 


  


  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='w-full flex mt-10 justify-center gap-4 h-96'>
          <Card className='w-[40%] '>
            <CardBody>
              <div className='flex gap-7 justify-center flex-col items-center'>
                <Controller
                  name="From"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <Select
                      className="basic-single w-[60%] mt-7 cursor-text"
                      // classNamePrefix="From"
                      placeholder="From"
                      // isDisabled={isDisabled}
                      // isLoading={isLoading}
                      // isClearable={isClearable}
                      // isRtl={isRtl}
                      // isSearchable={isSearchable}
                      name="city"
                      {...field}
                      options={colourOptions}

                    />
                  )}
                />
                <Controller

                  name="To"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <Select
                      className="basic-single w-[60%] cursor-text"
                      // classNamePrefix="From"
                      placeholder="To"
                      // isDisabled={isDisabled}
                      // isLoading={isLoading}
                      // isClearable={isClearable}
                      // isRtl={isRtl}
                      // isSearchable={isSearchable}
                      name="city"
                      {...field}
                      options={colourOptions}

                    />
                  )}
                />

                <div className='className= w-[60%]'>
                  <DatePicker label="Date"
                    value={value}
                    onChange={setValue}
                    {...register("date")}
                  />
                </div>
                <div className='flex gap-3 justify-start w-[60%]'>
                  <Button color="primary" onClick={todayDate}>
                    Today
                  </Button>
                  <Button color="primary" onClick={tomorrowDate}>
                    Tomorrow
                  </Button>
                </div>
                <div className='w-[60%] font-semibold text-lg'>
                  {/* <Link to={'/selectbus'}> */}
                  <Button type='submit' radius="full" className='w-full font-semibold text-lg'>
                    Search Bus
                  </Button>
                  {/* </Link>  */}
                </div>
              </div>
            </CardBody>
          </Card>
        </div>

      </form>

















      {/* <div className=' h-90 mt-16 flex justify-center'>
      <div className='rounded-xl bg-neutral-500 gap-7 p-4 flex flex-col items-center justify-center w-[30%]'>
        <input className='p-3 rounded-lg w-[60%] h-14 mt-3 outline-none' type="text" placeholder='From' />
        <input className='p-3 outline-none rounded-lg h-14 w-[60%]' type="text" placeholder='TO' />
        <input type="date" className='p-3 outline-none rounded-lg h-14 w-[60%]'
        
        /> 
    
        <div className=' flex  w-[60%] gap-4'>
          <span className='bg-gray-500 w-24 p-3 rounded-md cursor-pointer'
         
          >Today</span>
          <span className='bg-gray-500 w-24 p-3 rounded-md cursor-pointer'
           
          >Tommorow</span>

       

        </div> 
        
        <div className='bg-sky-700 w-[60%] items-center text-center h-12 rounded-xl text-2xl align-bottom pt-2 text-white font-medium cursor-pointer'><Link to={'/selectbus'}>Search Bus  </Link></div>
      
         </div></div> */}







    </>
  )
}

export default SearchBus
