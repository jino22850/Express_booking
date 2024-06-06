import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Report = () => {
  const [data, setData] = useState([]);
  const [requestType, setRequestType] = useState('bookings');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const token = localStorage.getItem('token'); // Assuming the token is stored in local storage
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:8070/api/data', {
        params: { type: requestType, startDate, endDate },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
      alert('Failed to fetch data');
    }
  };

  const handleSearch = () => {
    fetchData();
  };

  const renderTable = () => {
    if (!data.length) {
      return <p>No data available</p>;
    }

    const columns = Object.keys(data[0]).filter((key) => key !== '_id' && key !== 'id');

    return (
      <table className="min-w-full border-collapse block md:table">
        <thead className="block md:table-header-group">
          <tr className="border border-grey-500 md:border-none block md:table-row">
            {columns.map((col) => (
              <th
                key={col}
                className="px-16 py-3 text-left text-xs font-medium text-black uppercase tracking-wider block md:table-cell"
              >
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="block md:table-row-group">
          {data.map((row, index) => (
            <tr
              key={index}
              className="border border-grey-500 md:border-none block md:table-row"
            >
              {columns.map((col) => (
                <td
                  key={col}
                  className="px-16 py-4 whitespace-nowrap block md:table-cell"
                >
                  {row[col]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Reports</h1>

      <div>
        <label>Start Date</label>
        <input
          type="date"
          name="startDate"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
      </div>

      <div>
        <label>End Date</label>
        <input
          type="date"
          name="endDate"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />
      </div>

      <div>
        <label>Report Type</label>
        <select
          value={requestType}
          onChange={(e) => setRequestType(e.target.value)}
        >
          <option value="bookings">All Bookings</option>
          <option value="approvedBookings">Approved Bookings</option>
          <option value="cancelledBookings">Canceled Bookings</option>
          <option value="pendingBookings">Pending Bookings</option>
          <option value="Users">Users</option>
          <option value="conductors">Conductors</option>
        </select>
      </div>

      <div>
        <button type="button" onClick={handleSearch}>
          Search
        </button>
      </div>

      {renderTable()}
    </div>
  );
};

export default Report;
