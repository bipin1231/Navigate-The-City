import React, { useState } from "react";
import { useLocation } from "react-router-dom";

function ConfirmationPage() {
  const location = useLocation();
  const bookingData = location.state;

  return (
    <div className="mt-[60px]">
      <h1 className="bg-blue-200 text-center font-semibold lg:font-bold text-lg lg:text-3xl py-3">
        Confirmation of
        <br />
        Your Ticket Purchase
      </h1>

      <div className="text-center py-3">
        <h1 className="font-bold">Hi {bookingData.name}</h1>
        <p>Your ticket booking is almost there!</p>
      </div>

      <div className="bg-blue-200 py-5">
        <p className="text-center mb-4">
          Following are the completed details of your ticket
        </p>

        {/* ticket section starts */}
        <div className="flex justify-center">
          <div className="bg-gray-100 p-4 rounded-lg">
            <h1 className="text-2xl font-bold mb-2">{bookingData.busName}</h1>

            {/* ticket details starts*/}
            <div className="flex gap-x-32">
              {/* left ticket details name and route */}
              <div>
                <div>
                  <h1 className="text-sky-800 text-sm">Name</h1>
                  <h1>
                    <span className="mr-6">{bookingData.name}</span>
                    {bookingData.age}</h1>
                </div>
                <div>
                  <h1 className="text-sky-800 text-sm">Route</h1>
                  <h1>{bookingData.routeName}</h1>
                </div>
              </div>

              {/* right ticket details date */}
              <div>
                <div>
                  <h1 className="text-sky-800 text-sm">Date</h1>
                  <h1>{bookingData.date}</h1>
                </div>
                <div>
                  <h1 className="text-sky-800 text-sm">Seat</h1>
                  <h1>{bookingData.seat}</h1>
                </div>
              </div>

            </div>
              {/* ticket details ends */}

              <hr className='text-red-900 w-full border-1 border-black my-2' />

              <div className="flex justify-between">
              <p>
              Total Price:
              </p>
              <p>
              Rs. {bookingData.price}/-
              </p>
              </div>
          </div>
        </div>

      </div>
         {/* ticket section ends */}

         <div className="flex justify-center gap-x-10 mt-4">
          <button className="bg-green-400 rounded py-1 px-4 border-1 border-green-400 duration-200 hover:scale-[1.1] hover:bg-green-300">Pay Now</button>
          <button className="bg-green-400 rounded py-1 px-4 border-1 border-green-400 duration-200 hover:scale-[1.1] hover:bg-green-300">Pay Later</button>
        </div>


        <div className="text-center mt-2 bg-blue-200">
          <p>
            Thanks you for choosing us, 
            <br />
            we hope that you have a safe journey!
          </p>
        </div>

    </div>
  );
}

export default ConfirmationPage;
