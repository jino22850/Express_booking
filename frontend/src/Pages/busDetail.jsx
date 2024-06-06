
import React, { useState } from 'react';
import axios from 'axios';

const BusDetail = ({ onSearch }) => {
    const [searchParams, setSearchParams] = useState({
        departureLocation: '',
        arrivalLocation: '',
        turnTime: ''
    });

    const handleChange = (e) => {
        setSearchParams({ ...searchParams, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.get('http://localhost:8070/api/buses/search', { params: searchParams });
            onSearch(response.data);
        } catch (error) {
            console.error('Error searching buses:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" name="departureLocation" value={searchParams.departureLocation} onChange={handleChange} placeholder="Departure Location" />
            <input type="text" name="arrivalLocation" value={searchParams.arrivalLocation} onChange={handleChange} placeholder="Arrival Location" />
            <input type="text" name="turnTime" value={searchParams.turnTime} onChange={handleChange} placeholder="Turn Time" />
            <button type="submit">Search Buses</button>
        </form>
    );
};


export default BusDetail;