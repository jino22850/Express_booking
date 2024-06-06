import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CancelBooking = ({ refreshNotifications }) => {
  const [cancelRequests, setCancelRequests] = useState([]);

  useEffect(() => {
    // Fetch cancel requests when the component mounts
    fetchCancelRequests();
  }, []);

  const fetchCancelRequests = async () => {
    try {
      const response = await axios.get('http://localhost:8070/api/bookings/cancelled');
      setCancelRequests(response.data);
    } catch (error) {
      console.error('Error fetching cancel requests:', error);
    }
  };

  /*const handleCancelBooking = async (id) => {
    try {
      await axios.delete(`http://localhost:8070/api/seat/cancel/${id}`);
      // After successful cancellation, fetch updated cancel requests
      fetchCancelRequests();
      alert('Booking cancelled successfully');
    } catch (error) {
      console.error('Error cancelling booking:', error);
      alert('Failed to cancel booking');
    }
  };*/

  return (
    <div className='min-w-max'>
      <h2 className="text-2xl font-semibold mb-4 mt-20 ml-20">Cancel Requests</h2>
      {cancelRequests.length > 0 ? (
       <table className="min-w-screen divide-y divide-gray-200 ml-44 mt-16 items-center justify-between">
       <thead className="bg-gray-500">
            <tr>
            <th scope="col" className="px-20 py-4 text-left text-xs font-medium text-black uppercase tracking-wider">Passenger Name</th>
            <th scope="col" className="px-16 py-4 text-left text-xs font-medium text-black uppercase tracking-wider">Date</th>
            <th scope="col" className="px-16 py-4 text-left text-xs font-medium text-black uppercase tracking-wider">From</th>
            <th scope="col" className="px-16 py-4 text-left text-xs font-medium text-black uppercase tracking-wider">Departure</th>
         
            </tr>
          </thead>
          <tbody>
            {cancelRequests.map(request => (
              <tr key={request._id} className="border-b">
                <td className="px-14 py-4 whitespace-nowrap">{request.passengerName}</td>
                <td className="px-14 py-4 whitespace-nowrap">{new Date(request.date).toLocaleDateString()}</td>
                <td className="px-14 py-4 whitespace-nowrap">{request.from}</td>
                <td className="px-14 py-4 whitespace-nowrap">{request.departure}</td>
                
                  {/*<button
                    type="button"
                    onClick={() => handleCancelBooking(request._id)} // Call handleCancelBooking function with booking ID
                    className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 focus:outline-none"
                  >
                    Cancel
            </button>*/}
                
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-sm text-gray-500">No cancel requests found.</p>
      )}
    </div>
  );
};

export default CancelBooking;
