import React, { useState } from 'react'
import { Card, CardHeader, CardBody, CardFooter, Divider } from "@nextui-org/react";
import BusSeat from './BusSeat';
import { Button, ButtonGroup } from "@nextui-org/react";
import { useLocation, useNavigate } from 'react-router-dom';
import {useDispatch,useSelector} from 'react-redux'
import { seatPrices } from '../../ticketStore/ticketSlice';
function SelectSeat({ onSeatSelect }) {

    const dispatch=useDispatch();

  const totalSeats = 8;
  // const pricePerSeat = 800;
  const [selectedSeat, setSelectedSeat] = useState([]);
  
const location = useLocation();
const pricePerSeat = location.state?.pricePerSeat || 0;

  // console.log(selectedSeat);
  // const handleSeatSelect = (seatId) => {
  //   if (selectedSeat.includes(seatId)) {
  //     setSelectedSeat(selectedSeat.filter(seat => seat !== seatId));
  //   } else {
  //     setSelectedSeat([...selectedSeat, seatId]);
  //   }
  // }
  const handleSeatSelect = (seatId) => {
    let updatedSeats;
    if (selectedSeat.includes(seatId)) {
      updatedSeats = selectedSeat.filter(seat => seat !== seatId);
    } else {
      updatedSeats = [...selectedSeat, seatId];
    }
    setSelectedSeat(updatedSeats);
    const totalPrice = updatedSeats.length * pricePerSeat;
    onSeatSelect(updatedSeats, totalPrice); // Pass updated seats to parent component
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

  // const navigate = useNavigate();

//   const toComponentB=()=>{
//     dispatch(seatPrices({selectedSeat,price}))
// navigate('/ticketcard',{state:{seatNo:selectedSeat,price:price}});
//   }


  return (
    <div className='w-full flex justify-center'>
      <Card className='w-[100%] flex justify-center'>


        <CardHeader className='items-center flex justify-center p-1'>
          <h1>Choose your seat</h1>
        </CardHeader>
        <CardBody className='flex justify-center'>

          <Card>
            <CardHeader className="flex flex-col">
            </CardHeader>
            <div className='flex flex-col h-auto'>
              <div className=' flex justify-center gap-10 w-[100%] mb-7'>
                <div className='flex gap-2'>
                  <div className='flex gap-4 flex-col '>
                    {renderSeat("A")}
                  </div>
                  <div className='flex gap-4 flex-col '>
                    {renderSeat("B")}
                  </div>


                </div>
                <div className='flex gap-2'>
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

          <CardFooter className='align-middle items-center flex flex-col gap-2 justify-center pb-0'>
            <div className='align-middle items-center flex  gap-4 justify-center'>
              <div className='flex gap-3 align-middle justify-center text-center items-center'>
                <div className='w-5 h-5'>
                  <img src='../selectedSeat.png' />
                </div>
                <span>Choosen</span>
              </div>

              <div className='flex gap-2 align-middle justify-center text-center items-center'>
                <div className='w-5 h-5'>
                  <img src='../availableSeat.png' />
                </div>
                <span>Available</span>
              </div>

              <div className='flex align-middle justify-center text-center items-center'>
                <div className='w-5 h-5'>
                  <img src='../bookedSeat.png' />
                </div>
                <span>Booked</span>
              </div>
            </div>
            <div className='flex items-start justify-start w-[80%] '>
              {selectedSeat.length > 0 && (
                <p>Selected Seats: {selectedSeat.join(', ')}</p>
              )}
            </div>
            <div className='flex items-start justify-start w-[80%] '>
              {selectedSeat.length > 0 && (
                <p>Price: Rs. {(selectedSeat.length) * pricePerSeat}/-</p>
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

         
                {/* <Button
                onClick={()=>{toComponentB()}}
                type='' radius="full" className=' font-semibold text-lg'>
                  Proceed
                </Button> */}
           
            </div>

          </CardFooter>

        </CardBody>
        {/* <CardFooter>

        </CardFooter> */}
      </Card>


    </div>


  )
}

export default SelectSeat
