import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import { useNavigate } from 'react-router-dom';
import Wifi from '../Assests/WIFI.jpg';
import Ac from '../Assests/Ac.jpg';
import Seat from '../Assests/seat.jpg';
import Location from '../Assests/location.jpg';
import Water from '../Assests/waterbottle.jpg';
import { motion } from 'framer-motion';
import { AuthContext } from '../Components/context/AuthContext';

Modal.setAppElement('#root');

const Booking = () => {
  const [cancelModalIsOpen, setCancelModalIsOpen] = useState(false); 
  const [seatModalIsOpen, setSeatModalIsOpen] = useState(false); 
  const [bookingId, setBookingId] = useState('');
  const [responseMessage, setResponseMessage] = useState('');
  const [searchCriteria, setSearchCriteria] = useState({
    turnTime: '',
    departureLocation: '',
    arrivalLocation: ''
  });
  const [searchResults, setSearchResults] = useState([]);
  const [selectedBus, setSelectedBus] = useState(null); 
  const [seatBooking, setSeatBooking] = useState({ date: '', turnTime: '', busId: '' });
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const openCancelModal = () => setCancelModalIsOpen(true);
  const closeCancelModal = () => setCancelModalIsOpen(false);

  const openSeatModal = () => setSeatModalIsOpen(true);
  const closeSeatModal = () => setSeatModalIsOpen(false);

  const handleInputChange = (event) => setBookingId(event.target.value);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.put(`http://localhost:8070/api/bookings/cancel-request/${bookingId}`);
      setResponseMessage(response.data.message);
    } catch (error) {
      if (error.response) {
        setResponseMessage(error.response.data.message);
      } else {
        setResponseMessage('An error occurred while cancelling the booking.');
      }
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8070/api/buses');
        setSearchResults(response.data);
      } catch (error) {
        console.error('Error fetching initial data:', error);
      }
    };
    fetchData();
  }, []);

  const handleChange = (e) => {
    setSearchCriteria({ ...searchCriteria, [e.target.name]: e.target.value });
  };

  const handleSubmitt = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get('http://localhost:8070/api/buses', {
        params: searchCriteria
      });
      setSearchResults(response.data);
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to search buses');
    }
  };

  const handleSeatBookingChange = (e) => {
    setSeatBooking({ ...seatBooking, [e.target.name]: e.target.value });
  };

  const handleSeatBooking = async (event) => {
    event.preventDefault();
    const { date, turnTime, busId } = seatBooking;

    try {
      const response = await axios.get(`http://localhost:8070/api/availability`,{
        params: {
          date,
          turnTime,
          busId
        }
      });
      const availableSeats = response.data;
      console.log("Available Seats:", availableSeats);
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to fetch available seats');
    }
  };

  const handleViewSeat = async (bus) => {
    setSelectedBus(bus); 
    openSeatModal(); 
  };

  const handleBookNow = async (bus) => {
    navigate('/seatbooking', { state: { bus } });
  }

  const handleCancelBooking = (busId) => {
    setBookingId(busId);
    openCancelModal();
  }

  const handleUnregisterUser = () => {
    alert('Please log in or register to book a seat.');
    navigate('/login')
  }

  return (
    <div className="bg-gray-100 min-h-screen p-8">
      <button className='item-end text-sm text-blue-600 hover:text-blue-300 text-bold' onClick={handleCancelBooking}>cancelbooking</button>
      <Modal
        isOpen={cancelModalIsOpen}
        onRequestClose={closeCancelModal}
        contentLabel="Cancel Booking"
        className="p-8 rounded-lg shadow-lg w-1/2 mx-auto mt-16 bg-orange-50"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
      >
        <h2 className="text-2xl font-bold mb-4 justify-center items-center">Cancel Booking</h2>
        <p className='text-gray-700 text-sm'>Cancel your booking before 2 days...</p>
        <form onSubmit={handleSubmit}>
          <label htmlFor="bookingId" className="block text-lg mb-2">Booking ID:</label>
          <input
            type="text"
            id="bookingId"
            value={bookingId}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded-md mb-4"
            required
          />
          <button type="submit" className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition duration-300">Submit</button>
        </form>
        {responseMessage && <p className="mt-4 text-gray-700">{responseMessage}</p>}
        <button onClick={closeCancelModal} className="mt-4 text-gray-500 hover:text-gray-700 transition duration-300">Close</button>
      </Modal>

      <motion.h2 className="text-3xl font-bold mb-6 text-center">Search Buses</motion.h2>

      <form onSubmit={handleSubmitt} className="max-w-4xl mx-auto mb-8">
        <div className="flex flex-wrap justify-between items-center gap-4 p-4 bg-white shadow rounded-lg">
          <div className="flex-1">
            <label htmlFor="departureLocation" className="block text-sm font-medium text-gray-700">Departure Location:</label>
            <input
              type="text"
              id="departureLocation"
              name="departureLocation"
              value={searchCriteria.departureLocation}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>

          <div className="flex-1">
            <label htmlFor="arrivalLocation" className="block text-sm font-medium text-gray-700">Arrival Location:</label>
            <input
              type="text"
              id="arrivalLocation"
              name="arrivalLocation"
              value={searchCriteria.arrivalLocation}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>

          <motion.button
            type="submit"
            className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-md shadow hover:bg-blue-700 transition duration-300"
          >
            Search
          </motion.button>
        </div>
      </form>

      <div>
        <motion.h3 className="text-2xl font-bold mb-4 text-center">XPress Bookings</motion.h3>
        <motion.p className="text-lg mb-8 text-center">
          Book your seat now!
          <p className='text-sm text-gray-700'>Book Your Seat Even a Day in Advance</p>
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {searchResults.map((bus) => (
            <motion.div
              key={bus._id}
              className="bg-white p-6 rounded-lg shadow-lg border border-gray-200"
            >
              <div className="flex flex-col justify-between space-y-4">
                <div className="flex justify-between items-center">
                  <div className="flex flex-col">
                    <p className="text-lg font-medium text-gray-900">{bus.departureLocation}</p>
                    <p className="text-lg text-gray-500">{bus.arrivalLocation}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-md text-gray-500">Departure-Arrival:</p>
                    <p className="text-md text-gray-500">{bus.departureTime} - {bus.arrivalTime}</p>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <div className="text-left">
                    <p className="text-md text-gray-500">Price:</p>
                    <p className="text-md text-gray-900 font-semibold">Rs. {bus.price}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-md text-gray-500">Available Seats:</p>
                    <p className="text-md text-gray-900 font-semibold">{bus.availableSeats}</p>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <div className="text-left">
                    <p className="text-md text-gray-500">Turn Time:</p>
                    <p className="text-md text-gray-900 font-semibold">{bus.turnTime}</p>
                  </div>
                  <div className="flex space-x-2">
                    <img src={Wifi} alt="WiFi" className="w-6 h-6" />
                    <img src={Ac} alt="AC" className="w-6 h-6" />
                    <img src={Seat} alt="Seat" className="w-6 h-6" />
                    <img src={Water} alt="Water" className="w-6 h-6" />
                    <img src={Location} alt="Location" className="w-6 h-6" />
                  </div>
                </div>
                <motion.button
                  onClick={() => handleViewSeat(bus)}
                  className="mt-4 bg-green-300 text-white px-4 py-2 rounded-md shadow hover:bg-green-200 transition duration-300"
                >
                  CHECK AVAILABILITY
                </motion.button>

                {user ? (
                  <motion.button
                    onClick={() => handleBookNow(bus)}
                    className="mt-4 bg-green-500 text-white px-4 py-2 rounded-md shadow hover:bg-green-600 transition duration-300"
                  >
                    BOOK NOW
                  </motion.button>
                ) : (
                  <motion.button
                    onClick={handleUnregisterUser}
                    className="mt-4 bg-yellow-500 text-white px-4 py-2 rounded-md shadow hover:bg-yellow-600 transition duration-300"
                  >
                    BOOK NOW
                  </motion.button>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      <Modal
        isOpen={seatModalIsOpen}
        onRequestClose={closeSeatModal}
        contentLabel="Available Seats"
        className="p-8 rounded-lg shadow-lg w-1/3 mx-auto mt-16 bg-white"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
      >
        <h2 className="text-2xl font-bold mb-4 text-center">Available Seats</h2>
        {selectedBus && (
          <div className="mb-4">
            <p className="text-lg mb-2 text-center">{`Available seats for ${selectedBus.departureLocation} to ${selectedBus.arrivalLocation} (${selectedBus.departureTime} - ${selectedBus.arrivalTime}): ${selectedBus.availableSeats}`}</p>
            <form onSubmit={handleSeatBooking}>
              <div className="flex flex-col items-center space-y-2">
                <label>Date</label>
                <input
                  type="date"
                  name="date"
                  value={seatBooking.date}
                  onChange={handleSeatBookingChange}
                  className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-blue-500 transition duration-300"
                  required
                />
                <label>Turn Time</label>
                <input
                  type="text"
                  name="turnTime"
                  value={seatBooking.turnTime}
                  onChange={handleSeatBookingChange}
                  placeholder="Turn Time"
                  className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-blue-500 transition duration-300"
                  required
                />
                <input
                  type="text"
                  name="busId"
                  value={selectedBus._id}
                  readOnly
                  className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-blue-500 transition duration-300"
                  hidden
                />
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300">
                  Book Seat
                </button>
              </div>
            </form>
          </div>
        )}
        <button onClick={closeSeatModal} className="block mx-auto bg-blue-500 text-white px-4 py-2 rounded-md mt-4 hover:bg-blue-600 transition duration-300">Close</button>
      </Modal>
    </div>
  );
};

export default Booking;
