import React, { useContext, useState, useEffect } from 'react';
import { CgProfile } from "react-icons/cg";
import { FaRegBell, FaEnvelope } from "react-icons/fa";
//import { HiMenuAlt1, HiMenuAlt3 } from 'react-icons/hi';
import { AuthContext } from '../../context/AuthContext';
import axios from 'axios';

const AdminHeader = () => {
  const { user, dispatch } = useContext(AuthContext);
  const [bookingNotifications, setBookingNotifications] = useState([]);
  const [cancellationNotifications, setCancellationNotifications] = useState([]);
  const [showBookingNotifications, setShowBookingNotifications] = useState(false);
  const [showCancellationNotifications, setShowCancellationNotifications] = useState(false);

  useEffect(() => {
    refreshNotifications();
  }, []);

    const refreshNotifications = async () => {
    fetchBookingNotifications();
    fetchCancellationNotifications();
    };

  const fetchBookingNotifications = async () => {
    try {
      const response = await axios.get('http://localhost:8070/api/bookings/pending');
      setBookingNotifications(response.data);
    } catch (error) {
      console.error('Error fetching booking notifications:', error);
    }
  };

  const fetchCancellationNotifications = async () => {
    try {
      const response = await axios.get('http://localhost:8070/api/notifications/cancellations');
      setCancellationNotifications(response.data);
    } catch (error) {
      console.error('Error fetching cancellation notifications:', error);
    }
  };

  const toggleBookingNotifications = () => {
    setShowBookingNotifications(!showBookingNotifications);
  };

  const toggleCancellationNotifications = () => {
    setShowCancellationNotifications(!showCancellationNotifications);
  };


 /*const toggleMenu = () => {
    setShowMenu(!showMenu);
  };*/

  const handleLogout = () => {
    alert(`Goodbye, ${user.email}!`);
    dispatch({ type: "LOGOUT" });
    localStorage.removeItem("userToken");
    window.location.href = "/dashboard";
  };

  return (
    <div className='fixed top-0 left-0 bg-gray-900 text-white h-16 flex items-center justify-between px-6 w-screen z-10'>
      <h1 className="text-lg font-semibold">XpressBookings</h1>
      <div className='flex items-center gap-[35px] relative'>
      <div className='relative'>
          <FaRegBell onClick={toggleBookingNotifications} className='cursor-pointer'/>
          {bookingNotifications.length > 0 && (
            <span className='absolute top-2 right-0 bg-red-600 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center'>
              {bookingNotifications.length}
            </span>
          )}

          {showBookingNotifications && (
            <div className='absolute right-0 mt-2 w-64 bg-white text-black shadow-lg rounded-lg'>
              <h3 className='text-sm font-bold p-2'>New Booking Requests</h3>
              <ul>
                {bookingNotifications.length > 0 ? (
                  bookingNotifications.map(notification => (
                    <li key={notification._id} className='p-2 border-b'>
                      <p className='text-xs'>Passenger: {notification.passengerName}</p>
                      <p className='text-xs'>Date: {new Date(notification.date).toLocaleDateString()}</p>
                      <p className='text-xs'>From: {notification.from}</p>
                      <p className='text-xs'>Departure: {notification.departure}</p>
                    </li>
                  ))
                ) : (
                  <li className='p-2 text-xs'>No new booking requests.</li>
                )}
              </ul>
            </div>
          )}
        </div>
        <div className='relative'>
          <FaEnvelope onClick={toggleCancellationNotifications} className='cursor-pointer'/>
          {cancellationNotifications.length > 0 && (
            <span className='absolute top-2 right-0 bg-red-600 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center'>
              {cancellationNotifications.length}
            </span>
          )}

          {showCancellationNotifications && (
            <div className='absolute right-0 mt-2 w-64 bg-white text-black shadow-lg rounded-lg'>
              <h3 className='text-sm font-bold p-2'>Cancellation Requests</h3>
              <ul>
                {cancellationNotifications.length > 0 ? (
                  cancellationNotifications.map(notification => (
                    <li key={notification._id} className='p-2 border-b'>
                      <p className='text-xs'>Passenger: {notification.passengerName}</p>
                      <p className='text-xs'>Date: {new Date(notification.date).toLocaleDateString()}</p>
                      <p className='text-xs'>From: {notification.from}</p>
                      <p className='text-xs'>Departure: {notification.departure}</p>
                    </li>
                  ))
                ) : (
                  <li className='p-2 text-xs'>No cancellation requests.</li>
                )}
              </ul>
            </div>
          )}
        </div>
        <div className='flex justify-center items-center space-x-4'>
          {user ? (
            <div className='flex items-center space-x-4'>
              <span className='text-[#6f8ebd]'>Welcome, Admin {user.email}</span>
              <button
                onClick={handleLogout}
                className="py-2 px-5 border rounded bg-blue text-black bg-blue-100 hover:bg-blue dark:hover:text-white"
              >
                Logout
              </button>
              {/*<div className='md:hidden flex items-center gap-4'>
                {showMenu ? (
                  <HiMenuAlt1 onClick={toggleMenu} className='cursor-pointer transition-all' size={30} />
                ) : (
                  <HiMenuAlt3 onClick={toggleMenu} className='cursor-pointer transition-all' size={30} />
                )}
              </div>*/}
            </div>
          ) : (
            <a href='/profile'><CgProfile /></a>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminHeader;
