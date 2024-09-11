import React, {useState} from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { parseDate, getLocalTimeZone } from "@internationalized/date";
import { Button } from "@nextui-org/react";
import { DatePicker } from "@nextui-org/date-picker";
import { useForm } from 'react-hook-form';
import SelectSeat from './SelectSeat';

function BookingPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const routeName = location.state?.routeName || 'No route selected';
  const busName = location.state?.busName || 'No bus selected';

  const today = new Date();
  const y = today.getFullYear();
  const m = today.getMonth() + 1 < 10 ? "0" + (today.getMonth() + 1) : (today.getMonth() + 1);
  const d = today.getDate() < 10 ? "0" + today.getDate() : today.getDate();

  const [value, setValue] = React.useState(parseDate(`${y}-${m}-${d}`));
  const [selectedSeat, setSelectedSeat] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  function todayDate() {
    setValue(parseDate(`${y}-${m}-${d}`));
  }

  function tomorrowDate() {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const y = tomorrow.getFullYear();
    const m = tomorrow.getMonth() + 1 < 10 ? "0" + (tomorrow.getMonth() + 1) : (tomorrow.getMonth() + 1);
    const d = tomorrow.getDate() < 10 ? "0" + tomorrow.getDate() : tomorrow.getDate();
    setValue(parseDate(`${y}-${m}-${d}`));
  }

  const { register, handleSubmit } = useForm();

   // Function to handle seat selection from SelectSeat component
   const handleSeatSelection = (seat, price) => {
    setSelectedSeat(seat);
    setTotalPrice(price);
  };

  const onSubmit = (data) => {
    const bookingData = {
      routeName: routeName,
      busName: busName,
      date: value.toString(),
      seat: selectedSeat,  
      price: totalPrice,
    };
    // Navigate to the next page and pass the booking data as state
    navigate('/comfirmationpage', { state: bookingData });
  };

  return (
    <div className='mt-[60px] flex items-center flex-col'>
      <h1 className='text-center font-semibold lg:font-bold text-lg lg:text-3xl py-2'>Booking Page</h1>

      <div className='w-[90%] md:w-[60%] bg-blue-100 p-3 rounded-lg'> 
        <form className='flex flex-col items-center gap-3' onSubmit={handleSubmit(onSubmit)}>
          <p>Selected Route: {routeName}</p>
          <p>Selected Bus: {busName}</p>

          {/* select seat starts */}
          <div>
            {/* <SelectSeat /> */}
            <SelectSeat onSeatSelect={handleSeatSelection} />
          </div>
          {/* select seat ends */}

          {/* Select date section starts */}
          <div className='w-[70%] md:w-[45%]'>
            <DatePicker label="Date"
              value={value}
              onChange={setValue}
              {...register("date")}
            />
          </div>

          <div className='flex gap-3 justify-center w-[70%]'>
            <Button color="primary" onClick={todayDate}>
              Today
            </Button>
            <Button color="primary" onClick={tomorrowDate}>
              Tomorrow
            </Button>
          </div>
              {/* Select date section ends */}

          <div className='w-[60%] font-semibold text-lg'>
            <Button type='submit' radius="full" className='w-full font-semibold text-lg'>
              Proceed
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default BookingPage;
