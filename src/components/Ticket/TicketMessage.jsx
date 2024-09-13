import React from 'react';
import { useSelector } from 'react-redux';
import { selectTicketData } from '../../ticketStore/ticketSlice'; // Make sure the path is correct

function TicketMessage() {
    const ticketData = useSelector(selectTicketData); 

  return (
    <div className='mt-[60px]'>
        <h1 className='mt-[60px] text-center font-semibold lg:font-bold text-lg lg:text-3xl py-2'>
      Ticket Purchase Message
    </h1>
      {/* Check if ticketData is defined before using it */}
      {ticketData ? (
        <div>
          <h2>Ticket Purchase Request Received!</h2>
          <p>Bus: {ticketData.busName}</p>
          <p>Name: {ticketData.name}</p>
          {/* <p>Seats: {ticketData.seat.join(', ')}</p> */}
          <p>Seats: {ticketData.seat}</p>
          <p>Price: Rs. {ticketData.price}/-</p>
          <p>Date: {ticketData.date}</p>
        </div>
      ) : (
        <p>No ticket purchase requests yet.</p>
      )}
    </div>
  );
}

export default TicketMessage;
