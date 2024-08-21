import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import Wifi from '../Assests/WIFI.jpg';
import Ac from '../Assests/Ac.jpg';
import Seat from '../Assests/seat.jpg';
import Location from '../Assests/location.jpg';
import Water from '../Assests/waterbottle.jpg';

const SeatBooking = () => {
  const location = useLocation();
  const [bus, setBusDetails] = useState({});
  const [booking, setBooking] = useState({
    passengerName: '',
    email: '',
    date: '',
    departure: '',
    from: '',
    turnTime: '',
  });

  useEffect(() => {
    if (location && location.state && location.state.bus) {
      const bus = location.state.bus;
      setBusDetails(bus);
      setBooking(prevBooking => ({
        ...prevBooking,
        from: bus.departureLocation,
        departure: bus.arrivalLocation,
        turnTime: bus.turnTime
      }));
    }
  }, [location]);

  const handleChange = (e) => {
    setBooking({ ...booking, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8070/api/book', { ...booking, busId: bus._id });
      alert('Successfully booked');
    } catch (error) {
      console.error('Error booking ticket:', error);
      alert('Failed to book ticket.');
    }
  };

  return (
    <div className="bg-gray-200 min-h-screen flex flex-col items-center py-8">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4">Bus Information</h1>
        <div className="mb-6">
          <p><strong>Departure Time:</strong> {bus.departureTime}</p>
          <p><strong>Arrival Time:</strong> {bus.arrivalTime}</p>
          <p><strong>Price:</strong> Rs. {bus.price}</p>
        </div>
        <div className="flex space-x-4 mb-6">
          <img src={Wifi} alt="WiFi" className="w-6 h-6"/>
          <img src={Ac} alt="AC" className="w-6 h-6"/>
          <img src={Seat} alt="Seat" className="w-6 h-6"/>
          <img src={Water} alt="Water" className="w-6 h-6"/>
          <img src={Location} alt="Location" className="w-6 h-6"/>
        </div>
        <form className="space-y-4 grid grid-cols-2 gap-x-4" onSubmit={handleSubmit}>
          <div className="flex flex-col">
            <label className="text-gray-600 mt-5">Passenger Name</label>
            <input
              type="text"
              name="passengerName"
              value={booking.passengerName}
              onChange={handleChange}
              className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-blue-500 transition duration-300 bg-gray-200"
              required
            />
          </div>
          <div className="flex flex-col">
            <label className="text-gray-600">Email</label>
            <input
              type="email"
              name="email"
              value={booking.email}
              onChange={handleChange}
              className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-blue-500 transition duration-300 bg-gray-200"
              required
            />
          </div>
          <div className="flex flex-col">
            <label className="text-gray-600">From</label>
            <input
              type="text"
              name="from"
              value={booking.from}
              onChange={handleChange}
              className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-blue-500 transition duration-300 bg-gray-200"
              required
            />
          </div>
          <div className="flex flex-col">
            <label className="text-gray-600">Departure</label>
            <input
              type="text"
              name="departure"
              value={booking.departure}
              onChange={handleChange}
              className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-blue-500 transition duration-300 bg-gray-200"
              required
            />
          </div>
          <div className="flex flex-col">
            <label className="text-gray-600">Turn</label>
            <input
              type="text"
              name="turnTime"
              value={booking.turnTime}
              onChange={handleChange}
              className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-blue-500 transition duration-300 bg-gray-200"
              required
            />
          </div>
          <div className="flex flex-col">
            <label className="text-gray-600">Date</label>
            <input
              type="date"
              name="date"
              value={booking.date}
              onChange={handleChange}
              className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-blue-500 transition duration-300 bg-gray-200"
              required
            />
          </div>
          <button
            type="submit"
            className="col-span-2 bg-blue-500 text-white rounded-md px-4 py-2 mt-4 hover:bg-blue-600 transition duration-300"
          >
            BOOK NOW
          </button>
        </form>
      </div>
    </div>
  );
};

export default SeatBooking;
