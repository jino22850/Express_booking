import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { MdModeEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { FaBusAlt } from "react-icons/fa";

const AddBus = () => {
    const [formData, setFormData] = useState({
        departureLocation: '',
        arrivalLocation: '',
        departureTime: '',
        arrivalTime: '',
        turnTime: '',
        duration: '',
        price: '',
        availableSeats: '',
        conductor: ''
    });
    const [searchResults, setSearchResults] = useState([]);
    const [conductors, setConductors] = useState([]);
    const [editFormData, setEditFormData] = useState(null);
    const [showEditForm, setShowEditForm] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:8070/api/buses');
                setSearchResults(response.data);
            } catch (error) {
                console.error('Error fetching initial data:', error);
            }
        };

        const fetchConductors = async () => {
            try {
                const response = await axios.get('http://localhost:8070/api/conductor/conductor/search');
                setConductors(response.data);
            } catch (error) {
                console.error('Error fetching conductors:', error);
            }
        };

        fetchData();
        fetchConductors();
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editFormData) {
                await axios.put(`http://localhost:8070/api/buses/${editFormData._id}`, formData);
                alert('Bus updated successfully');
            } else {
                await axios.post('http://localhost:8070/api/buses', formData);
                alert('Bus added successfully');
            }
            setFormData({
                departureLocation: '',
                arrivalLocation: '',
                departureTime: '',
                arrivalTime: '',
                turnTime: '',
                duration: '',
                price: '',
                availableSeats: '',
                conductor: ''
            });
            setShowEditForm(false);
            setEditFormData(null);
            fetchBuses(); // Refresh bus list
        } catch (error) {
            console.error('Error:', error);
            alert('Failed to add/update bus');
        }
    };

    const fetchBuses = async () => {
        try {
            const response = await axios.get('http://localhost:8070/api/buses');
            setSearchResults(response.data);
        } catch (error) {
            console.error('Error fetching buses:', error);
        }
    };
//delete bus
    const handleDelete = async (busId) => {
        if (window.confirm('Are you sure you want to delete this bus?')) {
            try {
                await axios.delete(`http://localhost:8070/api/buses/${busId}`);
                setSearchResults(prevBuses => prevBuses.filter(bus => bus._id !== busId));
                alert('Bus deleted successfully');
            } catch (error) {
                console.error('Error deleting bus:', error);
                alert('An error occurred while deleting the bus. Please try again.');
            }
        }
    };
//edit bus
    const handleEdit = (bus) => {
        setFormData({
            departureLocation: bus.departureLocation,
            arrivalLocation: bus.arrivalLocation,
            departureTime: bus.departureTime,
            arrivalTime: bus.arrivalTime,
            turnTime: bus.turnTime,
            duration: bus.duration,
            price: bus.price,
            availableSeats: bus.availableSeats,
            conductor: bus.conductor ? bus.conductor._id : ''
        });
        setEditFormData(bus);
        setShowEditForm(true);
    };

    const handleCloseEditForm = () => {
        setShowEditForm(false);
        setEditFormData(null);
    };

    return (
        <div className='pt-[50px] bg-[#F8F9FC]'>
        <div className='ml-0 mr-2 w-full'>
        <div className="flex items-center space-x-4 mb-6">
        <FaBusAlt  className="text-4xl text-blue-900 ml-12 mt-16" />
        <h2 className="text-3xl font-semibold text-blue-900 mt-16">Bus</h2>
      </div>
                    <div className="border-b-8 border-blue-900 mb-6"></div>
                    
            <div className="bg-gray-100 mx-auto px-8 rounded-lg shadow-md w-100% h-1/2 mt-10">
                <div className='ml-8'> 
                    <h2 className="text-2xl font-bold mb-4">{editFormData ? 'Edit Bus' : 'Add New Bus'}</h2>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="flex space-x-4">
                            <div className="flex-1">
                                <label className="block font-medium">Departure Location</label>
                                <input
                                    type="text"
                                    name="departureLocation"
                                    value={formData.departureLocation}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-500"
                                />
                            </div>
                            <div className="flex-1">
                                <label className="block font-medium">Arrival Location</label>
                                <input
                                    type="text"
                                    name="arrivalLocation"
                                    value={formData.arrivalLocation}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-500"
                                />
                            </div>
                        </div>
                        <div className="flex space-x-4">
                            <div className="flex-1">
                                <label className="block font-medium">Departure Time</label>
                                <input
                                    type="text"
                                    name="departureTime"
                                    value={formData.departureTime}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-500"
                                />
                            </div>
                            <div className="flex-1">
                                <label className="block font-medium">Arrival Time</label>
                                <input
                                    type="text"
                                    name="arrivalTime"
                                    value={formData.arrivalTime}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-500"
                                />
                            </div>
                        </div>
                        <div className="flex space-x-4">
                            <div className="flex-1">
                                <label className="block font-medium">Turn Time</label>
                                <select
                                    name="turnTime"
                                    value={formData.turnTime}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-500"
                                >
                                    <option value="">Select Turn Time</option>
                                    <option value="Morning">Morning</option>
                                    <option value="Afternoon">Afternoon</option>
                                    <option value="Evening">Evening</option>
                                    <option value="Night">Night</option>
                                </select>
                            </div>
                            <div className="flex-1">
                                <label className="block font-medium">Duration</label>
                                <input
                                    type="number"
                                    name="duration"
                                    value={formData.duration}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-500"
                                />
                            </div>
                        </div>
                        <div className="flex space-x-4">
                            <div className="flex-1">
                                <label className="block font-medium">Price</label>
                                <input
                                    type="number"
                                    name="price"
                                    value={formData.price}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-500"
                                />
                            </div>
                            <div className="flex-1">
                                <label className="block font-medium">Available Seats</label>
                                <input
                                    type="number"
                                    name="availableSeats"
                                    value={formData.availableSeats}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-500"
                                />
                            </div>
                        </div>
                        <div>
                            <label className="block font-medium">Conductor</label>
                            <select
                                name="conductor"
                                value={formData.conductor}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-500"
                            >
                                <option value="">Select Conductor</option>
                                {conductors.map((conductor) => (
                                    <option key={conductor._id} value={conductor._id}>
                                        {conductor.conductorname}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <button
                                type="submit"
                                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none"
                            >
                                {editFormData ? 'Update Bus' : 'Add Bus'}
                            </button>
                            {showEditForm && (
                                <button
                                    type="button"
                                    className="px-4 py-2 ml-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 focus:outline-none"
                                    onClick={handleCloseEditForm}
                                >
                                    Cancel
                                </button>
                            )}
                        </div>
                    </form>
                </div>
            </div>
            <div className='bg-gray-100 mx-auto px-8 rounded-lg shadow-md w-full h-1/2 mt-10'>
                <div className='mb-6'>
                    <h2 className="text-2xl font-bold mb-4">Bus Details</h2>
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead>
                                <tr>
                                    <th className="px-4 py-4 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Departure Location
                                    </th>
                                    <th className="px-4 py-4 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Arrival Location
                                    </th>
                                    <th className="px-4 py-4 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Departure Time
                                    </th>
                                    <th className="px-4 py-4 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Arrival Time
                                    </th>
                                    <th className="px-4 py-4 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Turn Time
                                    </th>
                                    <th className="px-4 py-4 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Duration
                                    </th>
                                    <th className="px-4 py-4 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Price
                                    </th>
                                    <th className="px-4 py-4 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Available Seats
                                    </th>
                                    <th className="px-4 py-4 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Conductor
                                    </th>
                                    <th className="px-6 py-4 bg-gray-50"></th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {searchResults.map((bus) => (
                                    <tr key={bus._id}>
                                        <td className="px-4 py-3 whitespace-nowrap text-sm">{bus.departureLocation}</td>
                                        <td className="px-4 py-3 whitespace-nowrap text-sm">{bus.arrivalLocation}</td>
                                        <td className="px-4 py-3 whitespace-nowrap text-sm">{bus.departureTime}</td>
                                        <td className="px-4 py-3 whitespace-nowrap text-sm">{bus.arrivalTime}</td>
                                        <td className="px-4 py-3 whitespace-nowrap text-sm">{bus.turnTime}</td>
                                        <td className="px-4 py-3 whitespace-nowrap text-sm">{bus.duration}</td>
                                        <td className="px-4 py-3 whitespace-nowrap text-sm">{bus.price}</td>
                                        <td className="px-4 py-3 whitespace-nowrap text-sm">{bus.availableSeats}</td>
                                        <td className="px-4 py-3 whitespace-nowrap text-sm">
                                            {bus.conductor ? bus.conductor.conductorname : 'N/A'}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <button
                                                className="px-1 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none mr-2"
                                                onClick={() => handleEdit(bus)}
                                            >
                                                <MdModeEdit />
                                            </button>
                                            <button
                                                className="px-1 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none"
                                                onClick={() => handleDelete(bus._id)}
                                            >
                                                <MdDelete/>
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
        </div>
    );
};

export default AddBus;