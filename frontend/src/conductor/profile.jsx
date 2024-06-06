import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Profile = () => {
  const [newConductor, setNewConductor] = useState({
    conductorname: '',
    email: '',
    password: '',
    address: '',
    gender: '',
    mobileNumber: '',
    role: 'Conductor'
  });
  const [editingConductorId, setEditingConductorId] = useState(null);
  const [conductors, setConductors] = useState([]);

  useEffect(() => {
    fetchConductors();
  }, []);

  const fetchConductors = async () => {
    try {
      const response = await axios.get('http://localhost:8070/api/conductors');
      setConductors(response.data);
    } catch (error) {
      console.error('Error fetching conductors:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewConductor(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingConductorId) {
        await axios.put(`http://localhost:8070/api/conductor/${editingConductorId}`, newConductor);
        alert('Conductor updated successfully');
      } else {
        await axios.post('http://localhost:8070/api/conductoradd', newConductor);
        alert('Conductor registered successfully');
      }
      fetchConductors();
      setNewConductor({
        conductorname: '',
        email: '',
        password: '',
        address: '',
        gender: '',
        mobileNumber: '',
        role: 'Conductor'
      });
      setEditingConductorId(null);
    } catch (error) {
      console.error('Error adding conductor:', error);
      alert('Failed to register conductor');
    }
  };

  const handleEdit = async (id) => {
    try {
      const response = await axios.get(`http://localhost:8070/api/conductor/id/${id}`);
      const userToEdit = response.data;
      setNewConductor(userToEdit);
      setEditingConductorId(id);
    } catch (error) {
      console.error('Error fetching user for edit:', error);
    }
  };

  return (
    <div className="pt-8 px-4 sm:px-6 lg:px-8 bg-[#F8F9FC] min-h-screen flex flex-col">
      <div className="flex-grow">
        <div className="bg-white mx-auto px-8 py-6 rounded-lg shadow-md w-full max-w-6xl mt-10">
          <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Conductor Details</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="col-span-1">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="conductorname">
                  Conductor Name
                </label>
                <input
                  type="text"
                  name="conductorname"
                  className="border rounded-md px-4 py-2 w-full border-gray-300"
                  value={newConductor.conductorname}
                  onChange={handleInputChange}
                  placeholder="Conductor Name"
                  required
                />
              </div>
              <div className="col-span-1">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                  Conductor Email
                </label>
                <input
                  type="email"
                  name="email"
                  className="border rounded-md px-4 py-2 w-full border-gray-300"
                  value={newConductor.email}
                  onChange={handleInputChange}
                  placeholder="Email"
                  required
                />
              </div>
              <div className="col-span-1">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  className="border rounded-md px-4 py-2 w-full border-gray-300"
                  value={newConductor.password}
                  onChange={handleInputChange}
                  placeholder="Password"
                  required
                />
              </div>
              <div className="col-span-1">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="address">
                  Address
                </label>
                <input
                  type="text"
                  name="address"
                  className="border rounded-md px-4 py-2 w-full border-gray-300"
                  value={newConductor.address}
                  onChange={handleInputChange}
                  placeholder="Address"
                  required
                />
              </div>
              <div className="col-span-1">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="gender">
                  Gender
                </label>
                <input
                  type="text"
                  name="gender"
                  className="border rounded-md px-4 py-2 w-full border-gray-300"
                  value={newConductor.gender}
                  onChange={handleInputChange}
                  placeholder="Gender"
                  required
                />
              </div>
              <div className="col-span-1">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="mobileNumber">
                  Mobile Number
                </label>
                <input
                  type="text"
                  name="mobileNumber"
                  className="border rounded-md px-4 py-2 w-full border-gray-300"
                  value={newConductor.mobileNumber}
                  onChange={handleInputChange}
                  placeholder="Mobile Number"
                  required
                />
              </div>
              <div className="col-span-1">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="role">
                  Role
                </label>
                <input
                  type="text"
                  id="role"
                  name="role"
                  className="border rounded-md px-4 py-2 w-full border-gray-300 bg-gray-100"
                  value={newConductor.role} // Set fixed role value
                  readOnly // Make the input read-only
                />
              </div>
            </div>
            <div className="flex justify-center">
              <button type="submit" className="bg-blue-500 text-white rounded-md px-6 py-2 hover:bg-blue-600 transition duration-300">
                {editingConductorId ? 'Update Conductor' : 'Add Conductor'}
              </button>
            </div>
          </form>
        </div>
        <div className="bg-gray-100 mx-auto px-8 rounded-lg shadow-md w-full h-1/2 mt-10">
          <h3 className="text-2xl font-semibold mb-4 text-center text-gray-800">Conductor List</h3>
          <table className="min-w-full bg-white">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b">#</th>
                <th className="py-2 px-4 border-b">Name</th>
                <th className="py-2 px-4 border-b">Email</th>
                <th className="py-2 px-4 border-b">Address</th>
                <th className="py-2 px-4 border-b">Gender</th>
                <th className="py-2 px-4 border-b">Mobile Number</th>
                <th className="py-2 px-4 border-b">Actions</th>
              </tr>
            </thead>
            <tbody>
              {conductors.map((conductor, index) => (
                <tr key={conductor._id} className="border-t">
                  <td className="py-2 px-4">{index + 1}</td>
                  <td className="py-2 px-4">{conductor.conductorname}</td>
                  <td className="py-2 px-4">{conductor.email}</td>
                  <td className="py-2 px-4">{conductor.address}</td>
                  <td className="py-2 px-4">{conductor.gender}</td>
                  <td className="py-2 px-4">{conductor.mobileNumber}</td>
                  <td className="py-2 px-4">
                    <button onClick={() => handleEdit(conductor._id)} className="text-blue-500 hover:text-blue-700">Edit</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Profile;
