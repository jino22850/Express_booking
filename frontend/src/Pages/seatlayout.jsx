import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Seatlayout = ({ show, onClose, bus, onSelectSeat }) => {
  const [seats, setSeats] = useState([]);

  /*if (!show) {
    return null;
  }*/

  const seatLayout = [
    [{ seat: '1', visible: true }, { seat: '2', visible: true }, { seat: '3', visible: false }, { seat: '4', visible: true }],
    [{ seat: '5', visible: true }, { seat: '6', visible: true }, { seat: '7', visible: false }, { seat: '8', visible: true }],
    [{ seat: '9', visible: true }, { seat: '10', visible: true }, { seat: '11', visible: false }, { seat: '12', visible: true }],
    [{ seat: '13', visible: true }, { seat: '14', visible: true }, { seat: '15', visible: false }, { seat: '16', visible: true }],
    [{ seat: '17', visible: true }, { seat: '18', visible: true }, { seat: '19', visible: false }, { seat: '20', visible: true }],
    [{ seat: '21', visible: true }, { seat: '22', visible: true }, { seat: '23', visible: false }, { seat: '24', visible: true }],
    [{ seat: '25', visible: true }, { seat: '26', visible: true }, { seat: '27', visible: true }, { seat: '28', visible: true }],
  ];

  useEffect(() => {
    const fetchSeats = async () => {
      try {
        const response = await axios.get(`/api/seats/${bus._id}`);
        setSeats(response.data);
      } catch (error) {
        console.error('Error fetching seats:', error);
      }
    };

    if (bus._id) {
      fetchSeats();
    }
  }, [bus._id]);

  const handleSeatClick = (seatId) => {
    const selectedSeat = seats.find(seat => seat.id === seatId);
    if (selectedSeat && selectedSeat.status === 'available') {
      onSelectSeat(seatId);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-lg relative">
        <button onClick={onClose} className="absolute top-2 right-2 text-gray-600 hover:text-gray-800">&times;</button>
        <div className="mb-4">
          <h4 className="text-xl font-semibold text-gray-800 text-center">Seat Layout for {bus.departureLocation} to {bus.arrivalLocation}</h4>
        </div>
        <div className="grid grid-cols-3 gap-1">
          <div className="col-span-1 flex flex-col justify-between">
            {/* Left side */}
            {seatLayout.slice(0, 5).map((row, rowIndex) => (
              <div key={rowIndex} className="flex">
                {row.slice(0, 2).map((seat, seatIndex) => (
                  <div
                    key={`${rowIndex}-${seatIndex}`}
                    className={`${
                      seat.visible ? 'block' : 'hidden'
                    } w-6 h-6 bg-blue-500 text-white flex justify-center items-center rounded m-1 cursor-pointer hover:bg-blue-700`}
                    onClick={() => handleSeatClick(seat.seat)}
                  >
                    {seat.seat}
                  </div>
                ))}
              </div>
            ))}
          </div>
          <div className="col-span-2 flex flex-col justify-between">
            {/* Right side */}
            {seatLayout.map((row, rowIndex) => (
              <div key={rowIndex} className="flex">
                {row.slice(2).map((seat, seatIndex) => (
                  <div
                    key={`${rowIndex}-${seatIndex}`}
                    className={`${
                      seat.visible ? 'block' : 'hidden'
                    } w-6 h-6 bg-blue-500 text-white flex justify-center items-center rounded m-1 cursor-pointer hover:bg-blue-700`}
                    onClick={() => handleSeatClick(seat.seat)}
                  >
                    {seat.seat}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
        <div className="seat-grid mt-4">
          {seats.map((seat) => (
            <button
              key={seat.id}
              className={`seat ${seat.status === 'occupied' ? 'bg-gray-500' : 'bg-blue-500'} w-6 h-6 text-white flex justify-center items-center rounded m-1 cursor-pointer hover:bg-blue-700`}
              onClick={() => handleSeatClick(seat.id)}
              disabled={seat.status === 'occupied'}
            >
              {seat.id}
            </button>
          ))}
        </div>
        <div className="mt-4 flex justify-end">
          <button onClick={() => onSelectSeat(null)} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700">Close</button>
        </div>
      </div>
    </div>
  );
};

export default Seatlayout;