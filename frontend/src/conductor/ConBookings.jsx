import React, { useState, useEffect } from 'react';
import axios from 'axios';


const ConBookings = () => {
  const [approvedBookings, setApprovedBookings] = useState([]);
  const [searchCriteria, setSearchCriteria] = useState({
    fromDate: '',
    toDate: ''
  });

  useEffect(() => {
    // Fetch all approved bookings initially
    axios.get('http://localhost:8070/api/bookings/approved')
      .then(response => {
        setApprovedBookings(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const handleChange = (e) => {
    setSearchCriteria({ ...searchCriteria, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { fromDate, toDate } = searchCriteria;
  
      const response = await axios.get('http://localhost:8070/api/bookings/approved', {
        params: { fromDate, toDate }
      });
      setApprovedBookings(response.data);
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to search bookings');
    }
  };

  return (
    

        <div className="p-10 bg-[#fbfbfb] flex-grow">
          <h2 className="text-2xl font-bold mb-4">Approved Bookings</h2>
          <div className='mb-8'>
            <form onSubmit={handleSubmit} className="max-w-4xl mx-auto">
              <div className="flex flex-wrap justify-between items-center gap-4 p-4 bg-white shadow rounded-lg">
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700">Date From</label>
                  <input
                    type="date"
                    name="fromDate"
                    value={searchCriteria.fromDate}
                    onChange={handleChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700">Date To</label>
                  <input
                    type="date"
                    name="toDate"
                    value={searchCriteria.toDate}
                    onChange={handleChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
                <button 
                  type="submit"
                  className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-md shadow hover:bg-blue-900 transition duration-300"
                >
                  Search
                </button>
              </div>
            </form>
          </div>
          <div className="bg-gray-100 mx-auto px-8 py-6 rounded-lg shadow-md w-full">
            <div className="overflow-x-auto">
              <table className="min-w-screen divide-y divide-gray-200">
                <thead className="bg-gray-500">
                  <tr>
                    <th className="px-16 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">Passenger Name</th>
                    <th className="px-16 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">Email</th>
                    <th className="px-16 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">Date</th>
                    <th className="px-16 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">Turn Time</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {approvedBookings.map(booking => (
                    <tr key={booking._id}>
                      <td className="px-16 py-4 whitespace-nowrap">{booking.passengerName}</td>
                      <td className="px-16 py-4 whitespace-nowrap">{booking.email}</td>
                      <td className="px-16 py-4 whitespace-nowrap">{new Date(booking.date).toLocaleDateString()}</td>
                      <td className="px-16 py-4 whitespace-nowrap">{booking.turnTime}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      
  );
};

export default ConBookings;
