
import React, { useState } from 'react';
import axios from 'axios';


const AdminSignUp = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    gender: '',
    password: '',
    mobileNumber: ''
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Form validation
      const newErrors = {};
      if (!formData.username.trim()) {
        newErrors.username = 'Username is required';
      }
      if (!formData.email.trim()) {
        newErrors.email = 'Email is required';
      } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        newErrors.email = 'Email is invalid';
      }
      if (!formData.address.trim()) {
        newErrors.address = 'Address is required';
      }
      if (!formData.gender.trim()) {
        newErrors.gender = 'Gender is required';
      }
      if (!formData.mobileNumber.trim()) {
        newErrors.mobileNumber = 'Mobile Number is required';
      }
      if (!formData.password.trim()) {
        newErrors.password = 'Password is required';
      }
      setErrors(newErrors);

      // If no errors, submit the form
      if (Object.keys(newErrors).length === 0) {
        await axios.post('http://localhost:8070/api/admin', formData);
        alert('User registered successfully');
      } else {
        alert('Failed to register user');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to register user');
    }
  };

  return (
    <div className="flex justify-center items-center h-full bg-gray-200">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">Registration Form</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              placeholder="Username"
              className={`border rounded-md px-4 py-2 w-full ${errors.username ? 'border-red-500' : 'border-gray-300'}`}
              value={formData.username}
              onChange={handleChange}
            />
            {errors.username && <p className="text-red-500 text-xs mt-1">{errors.username}</p>}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Email"
              className={`border rounded-md px-4 py-2 w-full ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
              value={formData.email}
              onChange={handleChange}
            />
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
          </div>
          
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="gender">
              Gender
            </label>
            <input
              type="text"
              id="gender"
              name="gender"
              placeholder="Gender"
              className={`border rounded-md px-4 py-2 w-full ${errors.gender ? 'border-red-500' : 'border-gray-300'}`}
              value={formData.gender}
              onChange={handleChange}
            />
            {errors.gender && <p className="text-red-500 text-xs mt-1">{errors.gender}</p>}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="mobileNumber">
              Mobile Number
            </label>
            <input
              type="text"
              id="mobileNumber"
              name="mobileNumber"
              placeholder="Mobile Number"
              className={`border rounded-md px-4 py-2 w-full ${errors.mobileNumber ? 'border-red-500' : 'border-gray-300'}`}
              value={formData.mobileNumber}
              onChange={handleChange}
            />
            {errors.mobileNumber && <p className="text-red-500 text-xs mt-1">{errors.mobileNumber}</p>}
          </div>

          
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Password"
              className={`border rounded-md px-4 py-2 w-full ${errors.password ? 'border-red-500' : 'border-gray-300'}`}
              value={formData.password}
              onChange={handleChange}
            />
            {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
          </div>
          <div className="flex justify-end">
            <button type="submit" className="bg-blue-500 text-white rounded-md px-4 py-2 hover:bg-blue-600 transition duration-300">
              Register
            </button>
          </div>
        </form>
        <p>Already have an account? <a href="/admin/adminLogin" className="text-undeline transition duration-300">Login</a></p>
      </div>
    </div>
  );
};

export default AdminSignUp;