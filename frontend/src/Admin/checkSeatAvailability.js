
/*import React, { useState } from 'react';
//import { Dialog, Transition } from '@headlessui/react';
//import { Fragment } from 'react';

const CheckSeatAvailability = ( {isOpen, onClose, booking, availability, onSubmit }) => {
    //const [busId, setBusId] = useState('');
    const [date, setDate] = useState('');
    const [turnTime, setTurnTime] = useState('');
  
    const handleSubmit = (event) => {
      event.preventDefault();
      onSubmit(booking, date, turnTime);
    };
  
    if (!isOpen) return null;
  
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 ">
        <div className="bg-white p-4 rounded shadow-lg w-1/2 h-1/2">
          <h2 className="text-xl font-bold mb-4">Check Seat Availability</h2>
          <form onSubmit={handleSubmit}>
           {/*} <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="busId">
                Bus ID
              </label>
              <input
                type="text"
                id="busId"
                value={busId}
                onChange={(e) => setBusId(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="date">
                Date
              </label>
              <input
                type="date"
                id="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="turnTime">
                Turn Time
              </label>
              <input
                type="text"
                id="turnTime"
                value={turnTime}
                onChange={(e) => setTurnTime(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              />
            </div>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300"
            >
              Check Availability
            </button>
            {availability && (
            <div className="mt-4">
              <p><strong>Total Seats:</strong> {availability.totalSeats}</p>
              <p><strong>Booked Seats:</strong> {availability.bookedSeats}</p>
              <p><strong>Available Seats:</strong> {availability.availableSeats}</p>
            </div>
          )}
          </form>
          
          <button
            onClick={onClose}
            className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition duration-300"
          >
            Close
          </button>
        </div>
      </div>
    );
  };
  

export default CheckSeatAvailability;*/

import React, { useState } from 'react';
import axios from 'axios';

const CheckSeatAvailability = () => {
  const [busId, setBusId] = useState('');
  const [date, setDate] = useState('');
  const [turnTime, setTurnTime] = useState('');
  const [availability, setAvailability] = useState(null);
  const [error, setError] = useState('');

  const handleCheckAvailability = async () => {
    try {
      const response = await axios.get('http://localhost:8070/api/availability', {
        params: { busId, date, turnTime },
      });
      setAvailability(response.data);
      setError('');
    } catch (err) {
      console.error('Error checking availability:', err);
      setError('Failed to check seat availability.');
      setAvailability(null);
    }
  };

  return (
    <div>
      <h1>Check Seat Availability</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleCheckAvailability();
        }}
      >
        <div>
          <label>Bus ID:</label>
          <input type="text" value={busId} onChange={(e) => setBusId(e.target.value)} required />
        </div>
        <div>
          <label>Date:</label>
          <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
        </div>
        <div>
          <label>Turn Time:</label>
          <input type="text" value={turnTime} onChange={(e) => setTurnTime(e.target.value)} required />
        </div>
        <button type="submit">Check Availability</button>
      </form>

      {availability && (
        <div>
          <h2>Availability</h2>
          <p>Total Seats: {availability.totalSeats}</p>
          <p>Booked Seats: {availability.bookedSeats}</p>
          <p>Available Seats: {availability.availableSeats}</p>
        </div>
      )}

      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default CheckSeatAvailability;