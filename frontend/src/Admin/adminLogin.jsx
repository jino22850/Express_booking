/*import React, { useState } from 'react';
import axios from 'axios';

const AdminLogin = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {};
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    }
    if (!formData.password.trim()) {
      newErrors.password = 'Password is required';
    }
    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      try {
        const response = await axios.post('http://localhost:8070/api/admin/login', formData);
        const token = response.data.token;
        localStorage.setItem('adminToken', token);
        window.location.href = '/admin/dashboard'; // Redirect to admin dashboard
      } catch (error) {
        console.error('Error:', error.response.data.message);
        alert('Failed to login');
      }
    }
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-semibold mb-4 text-center text-gray-800">Admin Login</h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-600">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="block w-full mt-1 px-4 py-2 rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
              required
            />
            {errors.email && <span className="text-red-500">{errors.email}</span>}
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-600">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="block w-full mt-1 px-4 py-2 rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
              required
            />
            {errors.password && <span className="text-red-500">{errors.password}</span>}
          </div>

          <button type="submit" className="block w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;*/