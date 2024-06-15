import React, { useState } from 'react'
import { Card, CardHeader, CardBody, CardFooter, Divider } from "@nextui-org/react";
import BusSeat from './BusSeat';
import { Button, ButtonGroup } from "@nextui-org/react";
import { Link,useNavigate } from 'react-router-dom';
import {useDispatch,useSelector} from 'react-redux'
import { seatPrices } from '../../ticketStore/ticketSlice';
function SelectSeat() {

    const dispatch=useDispatch();

  const totalSeats = 4;
  const price = 800;
  const [selectedSeat, setSelectedSeats] = useState([]);

  console.log(selectedSeat);
  const handleSeatSelect = (seatId) => {
    if (selectedSeat.includes(seatId)) {
      setSelectedSeats(selectedSeat.filter(seat => seat !== seatId));
    } else {
      setSelectedSeats([...selectedSeat, seatId]);
    }
  }

  const renderSeat = (seatalpha) => {
    const seats = [];

    for (let i = 1; i <= totalSeats; i++) {
      const seatId = seatalpha + i;
      const isSelected = selectedSeat.includes(seatId);
      seats.push(
        <BusSeat
          key={seatId}
          id={seatId}
          selected={isSelected}
          onSelect={handleSeatSelect}
        />
      )
    }


    return seats;
  }

  const navigate = useNavigate();

  const toComponentB=()=>{
    dispatch(seatPrices({selectedSeat,price}))
navigate('/ticketcard',{state:{seatNo:selectedSeat,price:price}});
  }


  return (
    <div className='w-full flex mt-5 justify-center gap-4'>
      <Card className='w-[90%] md:w-[50%] flex justify-center gap-4 '>


        <CardHeader className='align-middle items-center flex justify-center'>
          <h1>Choose your seat</h1>
        </CardHeader>
        <CardBody className='flex  justify-center'>

          <Card className=''>
            <CardHeader className="flex flex-col justify-start">
            {/* <CardHeader className="flex flex-col justify-start bg-[url('../')]"> */}

            </CardHeader>
            <div className='flex flex-col h-auto'>
              <div className=' flex justify-center gap-14  w-[100%] rounded-xl mb-7 md:my-7'>
                <div className='flex gap-4'>
                  <div className='flex gap-4 flex-col '>
                    {renderSeat("A")}
                  </div>
                  <div className='flex gap-4 flex-col '>
                    {renderSeat("B")}
                  </div>


                </div>
                <div className='flex gap-4'>
                  <div className='flex gap-4 flex-col '>
                    {renderSeat("C")}
                  </div>
                  <div className='flex gap-4 flex-col '>
                    {renderSeat("D")}
                  </div>
                </div>

              </div>

            </div>
          </Card>

          <CardFooter className='align-middle items-center flex flex-col gap-5 justify-center'>
            <div className='align-middle items-center flex  gap-4 justify-center'>
              <div className='flex gap-3 align-middle justify-center text-center items-center'>
                <div className='w-5 h-5 bg-blue-600 rounded-md'></div>
                <span>Choosen</span>
              </div>

              <div className='flex gap-2 align-middle justify-center text-center items-center'>
                <div className='w-5 h-5 bg-gray-500 rounded-md'></div>
                <span>Available</span>
              </div>

              <div className='flex  gap-2 align-middle justify-center text-center items-center'>
                <div className='w-5 h-5 bg-yellow-500 rounded-md'></div>
                <span>Booked</span>
              </div>
            </div>
            <div className='flex items-start justify-start w-[58%] '>
              {selectedSeat.length > 0 && (
                <p>Selected Seats: {selectedSeat.join(', ')}</p>
              )}
            </div>
            <div className='flex items-start justify-start w-[58%] '>
              {selectedSeat.length > 0 && (
                <p>Price: {(selectedSeat.length) * price}</p>
              )}
            </div>
            <div className='flex items-start justify-center '>
              {/* {selectedSeat.length > 0 && (
                <Link to={'/ticketcard'}
                state={{ from: "the-page-id" }}
                 >
               <Button type='' radius="full" className=' font-semibold text-lg'>
               Proceed
             </Button>
             </Link>
              )} */}

         
                <Button
                onClick={()=>{toComponentB()}}
                type='' radius="full" className=' font-semibold text-lg'>
                  Proceed
                </Button>
           
            </div>

          </CardFooter>

        </CardBody>
        <CardFooter>

        </CardFooter>
      </Card>


    </div>


  )
}

export default SelectSeat
