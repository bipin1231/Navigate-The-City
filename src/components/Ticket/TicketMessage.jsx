import React, { useEffect, useState } from "react";
import service from '../../appwrite/config';

function TicketMessage() {
  const [ticketData, setTicketData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filteredData, setFilteredData] = useState([]);

    // Define your filter criteria
    const [filterCriteria, setFilterCriteria] = useState({
      name: "",
      seatNo: "",
      busNo: "",
      date: "",
      // date: new Date().toISOString().split('T')[0],
      contact: "",
    });

    useEffect(() => {
      const fetchTickets = async () => {
        try {
          const result = await service.showTicketInfoForCompany();
          console.log('Fetched tickets:', result);
  
          // Apply filtering
          const filtered = result.documents.filter(ticket => {
            // const ticketDate = ticket.date.split(' ')[0]; // Extract date part
            // const ticketDate = ticket.date ? ticket.date.split(' ')[0] : null;

            return (
              (!filterCriteria.name || ticket.name.includes(filterCriteria.name)) &&
              (!filterCriteria.seatNo || ticket.seatNo.includes(filterCriteria.seatNo)) &&
              (!filterCriteria.busNo || ticket.busNo.includes(filterCriteria.busNo)) &&
              (!filterCriteria.date || ticket.date.includes(filterCriteria.date)) &&
              // (!filterCriteria.date || ticketDate === filterCriteria.date) &&
              (!filterCriteria.contact || ticket.contact.includes(filterCriteria.contact))
            );
          });
  
          setTicketData(result.documents); // Store the original data if needed
          setFilteredData(filtered); // Store the filtered data
        } catch (error) {
          console.error("Error fetching tickets:", error);
          setError(error);
        } finally {
          setLoading(false);
        }
      };
  
      fetchTickets();
    }, [filterCriteria]);

  if (loading) return (
    <div className='fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50'>
      <img src="../loading.gif" alt="Loading..." className='w-32 h-32' />
    </div>
  );

  if (error) return <p className="mt-[60px]">Error fetching data: {error.message}</p>;

  return (
    <div className="mt-[60px]">
      <h1 className="bg-blue-200 text-center font-semibold lg:font-bold text-lg lg:text-3xl py-3">
        Ticket Booked History
      </h1>
      <div className="text-center py-3">
        <p>Here are the details ticket booked history:</p>
      </div>
      <div className="bg-blue-200 p-5 grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">

        {ticketData.length > 0 ? (
          ticketData.map((ticket, index) => (
            <div key={index} className="bg-gray-100 p-4 rounded-lg mb-4">
              <h1 className="text-lg md:text-2xl font-bold mb-2">{ticket.busNo}</h1>
              
              <hr className="text-red-900 w-full border-1 border-black my-2" />
                <div>
                    <h1 className="text-sky-800 py-1 text-xs md:text-sm">Date: <span className="text-black">{ticket.date}</span></h1>
                  </div>
              <div className="flex gap-x-8 md:gap-x-32">
                <div>
                  <div>
                    <h1 className="text-sky-800 text-xs md:text-sm">Name</h1>
                    <h1>
                      <span className="mr-4 md:mr-6">{ticket.name}</span>
                    </h1>
                  </div>
                  <div>
                    <h1 className="text-sky-800 text-xs md:text-sm">Contact</h1>
                    <h1>{ticket.contact}</h1>
                  </div>
                </div>
                <div>
                  <div>
                    <h1 className="text-sky-800 text-xs md:text-sm">Seat</h1>
                    <h1>{ticket.seatNo}</h1>
                  </div>
                </div>
              </div>
              <hr className="text-red-900 w-full border-1 border-black my-2" />
             
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
