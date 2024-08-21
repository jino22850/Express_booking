import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { MdModeEdit, MdDelete } from "react-icons/md";
import { FaUserFriends } from "react-icons/fa";

const AddUser = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8070/api/users/search')
      .then(res => {
        setUsers(res.data);
        setSearchResults(res.data);
      })
      .catch(err => console.error(err));
  }, []);

  useEffect(() => {
    const results = users.filter(user =>
      user.username.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setSearchResults(results);
  }, [searchTerm, users]);

  const handleSearch = () => {};

  const handleDelete = async (email) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await axios.delete(`http://localhost:8070/api/users/${email}`);
        const updatedUsers = users.filter((user) => user.email !== email);
        setUsers(updatedUsers);
        setSearchResults(updatedUsers);
      } catch (error) {
        console.error('Error deleting user:', error);
        alert('An error occurred while deleting the user. Please try again.');
      }
    }
  };

  return (
    <div className="ml-6 mt-16 pt-4 px-8">
      <div className="flex items-center space-x-4 mb-6">
        <FaUserFriends className="text-4xl text-blue-900" />
        <h2 className="text-3xl font-semibold text-blue-900">User Accounts</h2>
      </div>
      <div className="flex items-center space-x-4 mb-2">
        <label className='text-gray-700 font-medium text-sm'>Search Users:</label>
        <input
          type='text'
          className='border border-gray-300 rounded-md py-2 px-4 bg-gray-200'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button className='bg-yellow-500 text-white rounded-md px-6 py-2 hover:bg-yellow-600 transition duration-300' onClick={handleSearch}>Search</button>
      </div>
      <div className="border-b-8 border-blue-900 mb-6"></div>
      
      <div className='w-full'>
        <table className="w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-8 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Username</th>
              <th scope="col" className="px-8 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
              <th scope="col" className="px-8 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Address</th>
              <th scope="col" className="px-8 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Gender</th>
              <th scope="col" className="px-8 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Mobile Number</th>
              <th scope="col" className="px-8 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
              <th scope="col" className="px-8 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {searchResults.map(user => (
              <tr key={user._id}>
                <td className="px-8 py-4 whitespace-nowrap text-sm">{user.username}</td>
                <td className="px-8 py-4 whitespace-nowrap text-sm">{user.email}</td>
                <td className="px-8 py-4 whitespace-nowrap text-sm">{user.address}</td>
                <td className="px-8 py-4 whitespace-nowrap text-sm">{user.gender}</td>
                <td className="px-8 py-4 whitespace-nowrap text-sm">{user.mobileNumber}</td>
                <td className="px-8 py-4 whitespace-nowrap text-sm">{user.role}</td>
                <td className="px-8 py-4 whitespace-nowrap text-sm">
                  <div className='flex space-x-4'>
                    <button className='bg-red-500 text-white text-sm rounded-md px-1 py-1 hover:bg-red-600 transition duration-300' onClick={() => handleDelete(user.email)}><MdModeEdit /></button>
                    <button className='bg-blue-500 text-white text-sm rounded-md px-1 py-1 hover:bg-blue-600 transition duration-300' onClick={() => handleDelete(user.email)}><MdDelete /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AddUser;
