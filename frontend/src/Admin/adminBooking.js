
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaBusAlt } from "react-icons/fa";
//import CheckSeatAvailability from './checkSeatAvailability';

const AdminBooking = () => {
  const [pendingBookings, setPendingBookings] = useState([]);
  //const [selectedBooking, setSelectedBooking] = useState(null);
  //const [availability, setAvailability] = useState(null);
 // const [isModalOpen, setIsModalOpen] = useState(false);
  const [isApproved, setIsApproved] = useState(false); // New state for displaying message box
  //const [approvedBookingId, setApprovedBookingId] = useState(null); // State to track the approved booking ID


  useEffect(() => {
    fetchPendingBookings();
  }, []);

  const fetchPendingBookings = async () => {
    try {
      const response = await axios.get('http://localhost:8070/api/bookings/pending');
      setPendingBookings(response.data);
    } catch (error) {
      console.error('Error fetching pending bookings:', error);
    }
  };

  /*const checkAvailability = async (booking, date, turnTime) => {
    try {
      const response = await axios.get('http://localhost:8070/api/availability', {
        params: {
          busId: booking.busId,
          date,
          turnTime,
        },
      });
      setAvailability(response.data);
    } catch (error) {
      console.error('Error checking availability:', error);
    }
  };

  const handleCheckAvailabilitySubmit = (booking, date, turnTime) => {
    checkAvailability(booking, date, turnTime);
  };*/

  const approveBooking = async (id) => {
    try {
      await axios.put(`http://localhost:8070/api/seat/approve/${id}`);
      fetchPendingBookings();
      setIsApproved(true);
    } catch (error) {
      console.error('Error approving booking:', error);
    }
  };

  /*const rejectBooking = async (id) => {
    try {
      await axios.put(`http://localhost:8070/api/seat/reject/${id}`);
      fetchPendingBookings();
      setSelectedBooking(null);
      setAvailability(null);
    } catch (error) {
      console.error('Error rejecting booking:', error);
    }
  };*/

  return (
    <div className='bg-gray-50 '>
      <div className="flex items-center space-x-4 mb-6">
        <FaBusAlt  className="text-4xl text-blue-900 ml-12 mt-16" />
        <h2 className="text-3xl font-semibold text-blue-900 mt-16">Pending Bookings</h2>
      </div>
                    <div className="border-b-8 border-blue-900 mb-6"></div>
                    
      {pendingBookings.length > 0 ? (
      <table className="min-w-screen divide-y divide-white ml-12 mr-7 mt-20">
        <thead className="bg-gray-500">
            <tr>
              <th scope="col" className="px-16 py-4 text-left text-xs font-medium text-black uppercase tracking-wider">Passenger Name</th>
              <th scope="col" className="px-16 py-4 text-left text-xs font-medium text-black uppercase tracking-wider">Email</th>
              <th scope="col" className="px-16 py-4 text-left text-xs font-medium text-black uppercase tracking-wider">Date</th>
              <th scope="col" className="px-16 py-4 text-left text-xs font-medium text-black uppercase tracking-wider">Turn Time</th>
              <th scope="col" className="px-16 py-4 text-left text-xs font-medium text-black uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody>
            {pendingBookings.map((booking) => (
              <tr key={booking._id}>
                <td className="px-14 py-4 whitespace-nowrap">{booking.passengerName}</td>
                <td className="px-14 py-4 whitespace-nowrap">{booking.email}</td>
                <td className="px-14 py-4 whitespace-nowrap">{new Date(booking.date).toLocaleDateString()}</td>
                <td className="px-14 py-4 whitespace-nowrap">{booking.turnTime}</td>
                <td className="px-14 py-4 whitespace-nowrap">
                  {/*<button
                    onClick={() => { setSelectedBooking(booking); setIsModalOpen(true); }}
                    className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600 transition duration-300 mr-2"
                  >
                    Check Availability
            </button>*/}
                  <button
                    onClick={() => approveBooking(booking._id)}
                    className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-900 transition duration-300 mr-2"
                  >
                    Approve
                  </button>
                  {/*<button
                    onClick={() => rejectBooking(booking._id)}
                    className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 transition duration-300"
                  >
                    Reject
          </button>*/}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
) : (
  <p className="text-sm text-gray-500">No pending bookings found.</p>
)}

        {isApproved && (
          <div className="bg-green-200 border border-green-600 text-green-600 px-4 py-3 rounded relative" role="alert">
            <strong className="font-bold">Booking Approved!</strong>
            <span className="block sm:inline">The booking has been approved successfully.</span>
            <span className="absolute top-0 bottom-0 right-0 px-4 py-3" onClick={() => setIsApproved(false)}>
              <svg className="fill-current h-6 w-6 text-green-500" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                <title>Close</title>
                <path fillRule="evenodd" d="M14.35 4.35a1 1 0 0 1 1.41 1.41L11.41 10l4.35 4.35a1 1 0 0 1-1.41 1.41L10 11.41l-4.35 4.35a1 1 0 1 1-1.41-1.41L8.59 10 4.24 5.65a1 1 0 0 1 1.41-1.41L10 8.59l4.35-4.35z" />
              </svg>
            </span>
          </div>
        )}
      </div>
    
  );
};

export default AdminBooking;