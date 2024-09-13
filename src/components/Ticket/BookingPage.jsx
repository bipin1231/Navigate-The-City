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
      name: data.name,
      contact: data.contact,
      age: data.age,
    };
    // Navigate to the next page and pass the booking data as state
    navigate('/comfirmationpage', { state: bookingData });

  };
  // const [name, setName] = useState(''); // State for capturing the user's name and passing to another file
  const [gender, setGender] = useState(""); //this state sets the gender radio mark

  const handleChange = (e) => {
    setGender(e.target.value);
  };

  return (
    <div className='mt-[60px] flex items-center flex-col'>
      <h1 className='text-center font-semibold lg:font-bold text-lg lg:text-3xl py-2'>Booking Page</h1>

      <div className='w-[95%] md:w-[60%] bg-blue-100 p-3 mb-4 rounded-lg'> 
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
              <hr className='text-red-900 w-full border-1 border-black' />

              {/* input section of user details */}
            <p>Please fill your details below form</p>
        <div className="flex justify-center">
          <div className="bg-blue-400 p-3 rounded-lg grid gap-y-2">
            {/* <label htmlFor="full-name" className="sr-only">
              Full Name
            </label> */}
            <input
              id="full-name"
              name="name"
              type="text"
              autoComplete="name"
              required
              className="appearance-none rounded-md px-4 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none"
              placeholder="Your Name"
              {...register("name")}
            />

            {/* <label htmlFor="contact" className="sr-only">
              Full Name
            </label> */}
            <input
              id="contact"
              name="contact"
              type="text"
              autoComplete="name"
              required
              className="appearance-none rounded-md px-4 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none"
              placeholder="Contact"
              {...register("contact")}
            />
            <input
              id="age"
              name="age"
              type="text"
              autoComplete="name"
              required
              className="appearance-none rounded-md px-4 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none"
              placeholder="Age"
              {...register("age")}
            />
            <div className="flex gap-x-3">
              <legend className="text-gray-700 font-medium">Gender</legend>
              <div className="flex items-center space-x-4">
                <label htmlFor="male" className="flex items-center space-x-2">
                  <input
                    id="male"
                    name="gender"
                    type="radio"
                    value="male"
                    checked={gender === "male"}
                    onChange={handleChange}
                    className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                  />
                  <span className="text-gray-700">Male</span>
                </label>
                <label htmlFor="female" className="flex items-center space-x-2">
                  <input
                    id="female"
                    name="gender"
                    type="radio"
                    value="female"
                    checked={gender === "female"}
                    onChange={handleChange}
                    className="h-4 w-4 text-pink-600 border-gray-300 focus:ring-pink-500"
                  />
                  <span className="text-gray-700">Female</span>
                </label>
                <label htmlFor="other" className="flex items-center space-x-2">
                  <input
                    id="other"
                    name="gender"
                    type="radio"
                    value="other"
                    checked={gender === "other"}
                    onChange={handleChange}
                    className="h-4 w-4 text-green-600 border-gray-300 focus:ring-green-500"
                  />
                  <span className="text-gray-700">Other</span>
                </label>
              </div>
            </div>
          </div>
        </div>

          <div className='w-[60%] font-semibold text-lg flex justify-center'>
            <Button type='submit' radius="full" className='bg-green-400 font-semibold text-lg px-10'>
              Proceed
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default BookingPage;
