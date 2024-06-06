
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Conductor = ({ onAdd }) => {
    const [conductors, setConductors] = useState([]);
    const [newConductor, setNewConductor] = useState({
        conductorname: '',
        email: '',
        password: '',
        address: '',
        gender: '',
        mobileNumber: '',
        role: 'Conductor' // Default role
    });
    const [editingConductorId, setEditingConductorId] = useState(null);

    useEffect(() => {
        fetchConductors();
    }, []);

    const fetchConductors = async () => {
        try {
            const response = await axios.get('http://localhost:8070/api/conductor/conductor/search');
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
       /* e.preventDefault();
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
    };*/
    e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8070/api/conductor/conductoradd', newConductor);
            if (response.status === 201) {
                alert('Conductor added successfully');
                // Clear form fields
                setNewConductor({
                    conductorname: '',
                    email: '',
                    password: '',
                    address: '',
                    gender: '',
                    mobileNumber: '',
                    role: 'Conductor'
                });
                // Notify parent component about the new conductor
                if (onAdd) {
                    onAdd(response.data); // Pass the newly added conductor data to the parent
                }
            }
        } catch (error) {
            console.error('Error adding conductor:', error);
            alert('Failed to add conductor');
        }
    };




    const handleEdit = async (email) => {
        try {
            const response = await axios.get(`http://localhost:8070/api/conductor/conductor/${email}`);
            const userToEdit = response.data;
            setNewConductor(userToEdit);
            setEditingConductorId(email);
        } catch (error) {
            console.error('Error fetching user for edit:', error);
        }
    };

    const handleDelete = async (email) => {
        try {
            await axios.delete(`http://localhost:8070/api/conductor/delete/${email}`);
            alert('Conductor deleted successfully');
            fetchConductors();
        } catch (error) {
            console.error('Error deleting conductor:', error);
            alert('Failed to delete conductor');
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
                <div className='mb-6'>
                    <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Conductors List</h2>
                    <table className="min-w-full divide-y divide-gray-200w-full  ">
                        <thead>
                            <tr className="bg-gray-100">
                                <th className="px-4 py-2 text-left text-sm font-medium text-gray-700 border border-gray-300">Username</th>
                                <th className="px-4 py-2 text-left text-sm font-medium text-gray-700 border border-gray-300">Email</th>
                                <th className="px-4 py-2 text-left text-sm font-medium text-gray-700 border border-gray-300">Address</th>
                                <th className="px-4 py-2 text-left text-sm font-medium text-gray-700 border border-gray-300">Gender</th>
                                <th className="px-4 py-2 text-left text-sm font-medium text-gray-700 border border-gray-300">Mobile Number</th>
                                <th className="px-4 py-2 text-left text-sm font-medium text-gray-700 border border-gray-300">Role</th>
                                <th className="px-4 py-2 text-left text-sm font-medium text-gray-700 border border-gray-300">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {conductors.map(conductor => (
                                <tr key={conductor._id} className="hover:bg-gray-100">
                                    <td className="px-4 py-2 border border-gray-300">{conductor.conductorname}</td>
                                    <td className="px-4 py-2 border border-gray-300">{conductor.email}</td>
                                    <td className="px-4 py-2 border border-gray-300">{conductor.address}</td>
                                    <td className="px-4 py-2 border border-gray-300">{conductor.gender}</td>
                                    <td className="px-4 py-2 border border-gray-300">{conductor.mobileNumber}</td>
                                    <td className="px-4 py-2 border border-gray-300">{conductor.role}</td>
                                    <td className="px-4 py-2 border border-gray-300">
                                        <button
                                            className="text-indigo-600 hover:text-indigo-900 mr-4"
                                            onClick={() => handleEdit(conductor._id)}
                                        >
                                            Edit
                                        </button>
                                        <button
                                            className="text-red-600 hover:text-red-900"
                                            onClick={() => handleDelete(conductor.email)}
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                </div>
            </div>
        </div>
    );
};

export default Conductor;