import React, { useEffect, useState } from "react";
import service from '../../appwrite/config'; // Update the path to where your config.js is

function TicketMessage() {
  const [ticketData, setTicketData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const formattedDate = new Date().toISOString().split('T')[0]; // Example: YYYY-MM-DD
        console.log("Fetching tickets with parameters:", {
          name: "",
          seatNo: "",
          busNo: "",
          date: formattedDate,
          contact: "",
        });

        const result = await service.showTicketInfo({
          name: "", // Optional filter
          seatNo: "", // Optional filter
          busNo: "", // Optional filter
          date: formattedDate, // Optional filter
          contact: "", // Optional filter
        });

        console.log('Fetched tickets:', result);
        setTicketData(result.documents);
      } catch (error) {
        console.error("Error fetching tickets:", error);
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    fetchTickets();
  }, []);

  if (loading) return <p className="mt-[60px]">Loading...</p>;
  if (error) return <p className="mt-[60px]">Error fetching data: {error.message}</p>;

  return (
    <div className="mt-[60px]">
      <h1 className="bg-blue-200 text-center font-semibold lg:font-bold text-lg lg:text-3xl py-3">
        Company Review Page
      </h1>
      <div className="text-center py-3">
        <h1 className="font-bold">Ticket Details</h1>
        <p>Here are the details of the tickets:</p>
      </div>
      <div className="bg-blue-200 py-5">
        {ticketData.length > 0 ? (
          ticketData.map((ticket, index) => (
            <div key={index} className="bg-gray-100 p-4 rounded-lg mb-4">
              <h1 className="text-lg md:text-2xl font-bold mb-2">{ticket.busNo}</h1>
              <div className="flex gap-x-8 md:gap-x-32">
                <div>
                  <div>
                    <h1 className="text-sky-800 text-xs md:text-sm">Name</h1>
                    <h1>
                      <span className="mr-4 md:mr-6">{ticket.name}</span>
                    </h1>
                  </div>
                  <div>
                    <h1 className="text-sky-800 text-xs md:text-sm">Route</h1>
                    <h1>{ticket.routeName}</h1>
                  </div>
                </div>
                <div>
                  <div>
                    <h1 className="text-sky-800 text-xs md:text-sm">Date</h1>
                    <h1>{ticket.date}</h1>
                  </div>
                  <div>
                    <h1 className="text-sky-800 text-xs md:text-sm">Seat</h1>
                    <h1>{ticket.seatNo}</h1>
                  </div>
                </div>
              </div>
              <hr className="text-red-900 w-full border-1 border-black my-2" />
              <div className="flex justify-between">
                <p>Total Price:</p>
                <p>Rs. {ticket.price}/-</p>
              </div>
            </div>
          ))
        ) : (
          <p>No tickets available.</p>
        )}
      </div>
    </div>
  );
}

export default TicketMessage;
