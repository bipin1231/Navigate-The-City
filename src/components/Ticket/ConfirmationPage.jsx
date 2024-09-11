import React, { useState } from "react";
import { useLocation } from "react-router-dom";

function ConfirmationPage() {
  const location = useLocation();
  const { routeName, busName, date, seat, price } = location.state;
  const [gender, setGender] = useState("");

  const handleChange = (e) => {
    setGender(e.target.value);
  };

  return (
    <div className="mt-[60px]">
      <h1 className="text-center font-semibold lg:font-bold text-lg lg:text-3xl py-3">
        Confirmation Page
      </h1>
      <form action="" className="flex justify-center">
        <div className="bg-blue-200 w-[90%] md:w-[50%] py-4 mb-4 rounded-lg">
        <div className="flex justify-center">
          <div className="bg-blue-400 rounded-lg p-4 w-[90%] grid gap-y-2">
            <p className="bg-blue-200 rounded p-2">Route Name: {routeName}</p>
            <p className="bg-blue-200 rounded p-2">Selected Bus: {busName}</p>
            <p className="bg-blue-200 rounded p-2">Date: {date}</p>
            <p className="bg-blue-200 rounded p-2">
              Selected Seats: {seat.join(", ")}
            </p>
            <p className="bg-blue-200 rounded p-2">
              Total Price: Rs. {price}/-
            </p>
          </div>
        </div>

        {/* input section of user details */}
        <div className="flex justify-center p-4">
          <div className="w-[90%] bg-blue-400 p-3 rounded-lg grid gap-y-2">
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
            />
            <input
              id="age"
              name="age"
              type="text"
              autoComplete="name"
              required
              className="appearance-none rounded-md px-4 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none"
              placeholder="Age"
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

        <div className="flex justify-center gap-x-10">
          <button className="bg-green-400 rounded py-1 px-4 border-1 border-green-400 duration-200 hover:scale-[1.1] hover:bg-green-300">Pay Now</button>
          <button className="bg-green-400 rounded py-1 px-4 border-1 border-green-400 duration-200 hover:scale-[1.1] hover:bg-green-300">Pay Later</button>
        </div>

        </div>
      </form>
    </div>
  );
}

export default ConfirmationPage;
