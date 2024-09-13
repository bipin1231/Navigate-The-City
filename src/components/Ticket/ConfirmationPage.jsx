import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import service from '../../appwrite/config.js';

function ConfirmationPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const bookingData = location.state;

  const [payNowDialogBox, setPayNowDialogBox] = useState(false);
  const [payLaterDialogBox, setPayLaterDialogBox] = useState(false);

  const togglePayNowDialogBox = () => {
    setPayNowDialogBox(!payNowDialogBox);
  };
  // const togglePayNowDialogBox = () => {
  //   setPayNowDialogBox(!payNowDialogBox);
  // };
  const handleSendTicketData = async () => {
    setPayLaterDialogBox(!payLaterDialogBox);

    try {
      console.log('Sending ticket data:', {
        name: bookingData.name,
        seatNo: bookingData.seat.join(", "),
        busNo: bookingData.busName,
        date: bookingData.date,
        contact: bookingData.contact,
      });
      await service.addTicketInfo({
        name: bookingData.name,
        seatNo: bookingData.seat.join(", "),
        busNo: bookingData.busName,
        date: bookingData.date,
        contact: bookingData.contact,
      });

      console.log('Ticket information saved successfully.');
      // navigate("/ticketmessage");
    } catch (error) {
      console.error("Error saving ticket information:", error);
    }
  };

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
        <div className="flex justify-center text-sm md:text-base">
          <div className="w-[90%] md:w-[60%] lg:w-[45%] bg-gray-100 p-4 rounded-lg">
            <h1 className="text-lg md:text-2xl font-bold mb-2">{bookingData.busName}</h1>

            {/* ticket details starts*/}
            <div className="flex gap-x-8 md:gap-x-32">
              {/* left ticket details name and route */}
              <div>
                <div>
                  <h1 className="text-sky-800 text-xs md:text-sm">Name</h1>
                  <h1>
                    <span className="mr-4 md:mr-6">{bookingData.name}</span>
                    {bookingData.age}</h1>
                </div>
                <div>
                  <h1 className="text-sky-800 text-xs md:text-sm">Route</h1>
                  <h1>{bookingData.routeName}</h1>
                </div>
              </div>

              {/* right ticket details date */}
              <div>
                <div>
                  <h1 className="text-sky-800 text-xs md:text-sm">Date</h1>
                  <h1>{bookingData.date}</h1>
                </div>
                <div>
                  <h1 className="text-sky-800 text-xs md:text-sm">Seat</h1>
                  <h1>{bookingData.seat.join(", ")}</h1>
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
          <button className="bg-green-400 rounded py-1 px-4 border-1 border-green-400 duration-200 hover:scale-[1.1] hover:bg-green-300" onClick={togglePayNowDialogBox}>Pay Now</button>
          <button className="bg-green-400 rounded py-1 px-4 border-1 border-green-400 duration-200 hover:scale-[1.1] hover:bg-green-300" onClick={handleSendTicketData}>Pay Later</button>
        </div>

        {payNowDialogBox && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded shadow-lg">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl text-red-500 font-semibold">Sorry :(</h2>
              <button
                className="bg-red-500 text-white px-4 py-2 rounded"
                onClick={togglePayNowDialogBox}
              >
                X
              </button>
            </div>
            <p className="my-4">The Online Payment is not currently working!</p>
          </div>
        </div>
      )}
        {payLaterDialogBox && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded shadow-lg">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl text-yellow-500 font-semibold">Processing...</h2>
              <button
                className="bg-red-500 text-white px-4 py-2 rounded"
                onClick={handleSendTicketData}
              >
                X
              </button>
            </div>
            <p className="my-4">Your Booking is processing now!</p>
          </div>
        </div>
      )}



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
