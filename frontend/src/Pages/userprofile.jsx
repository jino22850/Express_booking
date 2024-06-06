import React, { useState, useEffect, useContext } from 'react';
import { FaCircleUser } from "react-icons/fa6";
import { Link } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../Components/context/AuthContext';

const UserProfile = () => {
  const { user } = useContext(AuthContext);
  const [userData, setUserData] = useState({
    username: '',
    email: '',
    password: '',
    address: '',
    gender: '',
    mobileNumber: ''
  });

  const [editing, setEditing] = useState(false);

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const response = await axios.get('http://localhost:8070/api/users/profile', {
        headers: { Authorization: `Bearer ${user.token}` }
      });
      setUserData(response.data);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put('http://localhost:8070/api/users/profile', userData, {
        headers: { Authorization: `Bearer ${user.token}` }
      });
      alert('User updated successfully');
      setEditing(false);
      fetchUserData();
    } catch (error) {
      console.error('Error updating user data:', error);
      alert('Failed to update user');
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100 ml-24">
      <div className="w-full md:w-1/2 flex flex-col items-center justify-center bg-gradient-to-br from-black to-yellow-500 py-16 px-8 rounded-lg shadow-lg">
        <FaCircleUser className="w-44 h-44 rounded-full bg-gray-200 text-gray-400 cursor-pointer" />
        <h5 className="text-2xl text-white font-bold mt-4">{userData.username}</h5>
        <p className="text-lg text-white">Web Designer</p>
        <button onClick={() => setEditing(true)} className="text-white text-2xl mt-4 hover:text-opacity-75 cursor-pointer">
          Edit Profile
        </button>
        <Link to='/'>My Bookings</Link>
      </div>

      <div className="w-full md:w-full flex flex-col p-8">
        <h6 className="text-xl font-bold mb-4">Information</h6>
        {editing ? (
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <div className="flex items-center">
              <label htmlFor="username" className="text-sm font-medium text-gray-700 mr-4">Name</label>
              <input type="text" id="username" name="username" value={userData.username} onChange={handleInputChange} className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />
            </div>
            <div className="flex items-center">
              <label htmlFor="email" className="text-sm font-medium text-gray-700 mr-4">Email</label>
              <input type="email" id="email" name="email" value={userData.email} onChange={handleInputChange} className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" disabled />
            </div>
            <div className="flex items-center">
              <label htmlFor="address" className="text-sm font-medium text-gray-700 mr-4">Address</label>
              <input type="text" id="address" name="address" value={userData.address} onChange={handleInputChange} className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />
            </div>
            <div className="flex items-center">
              <label htmlFor="mobileNumber" className="text-sm font-medium text-gray-700 mr-4">Mobile Number</label>
              <input type="text" id="mobileNumber" name="mobileNumber" value={userData.mobileNumber} onChange={handleInputChange} className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />
            </div>
            <div className="flex items-center">
              <label htmlFor="password" className="text-sm font-medium text-gray-700 mr-4">Password</label>
              <input type="password" id="password" name="password" value={userData.password} onChange={handleInputChange} className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />
            </div>
            <button type="submit" className="text-indigo-600 hover:text-indigo-900 mr-4">Submit</button>
            <button type="button" onClick={() => setEditing(false)} className="text-red-600 hover:text-red-900">Cancel</button>
          </form>
        ) : (
          <div>
            <p><strong>Name:</strong> {userData.username}</p>
            <p><strong>Email:</strong> {userData.email}</p>
            <p><strong>Address:</strong> {userData.address}</p>
            <p><strong>Mobile Number:</strong> {userData.mobileNumber}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
