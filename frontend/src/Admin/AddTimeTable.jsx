
/*import React, { useState } from 'react';
import axios from 'axios';

const AddTimetable = () => {
    const [busId, setBusId] = useState('');
    const [timetable, setTimetable] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:8070/api/schedule', { busId, timetable });
            alert('Bus timetable added successfully');
            // Clear form data after successful submission
            setBusId('');
            setTimetable([]);
        } catch (error) {
            console.error('Error:', error);
            alert('Failed to add bus timetable');
        }
    };

    return (
        <div>
            <h2>Add Bus Timetable</h2>
            <form onSubmit={handleSubmit}>
            <div className="relative">
                <label>Day :</label>
                <select
                    name='Day'
                    className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                >
                    <option value="Monday">Monday</option>
                    <option value="Tuesday">Tuesday</option>
                    <option value="Wendnesday">Wendnesday</option>
                    <option value="Thursday">hursday</option>
                    <option value="Friday">Friday</option>
                    <option value="Saterday">Saterday</option>
                    <option value="Sunday">Sunday</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <svg
                        className="fill-current h-4 w-4"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                    >
                        <path
                            fillRule="evenodd"
                            d="M10 12l-6-6 1.5-1.5L10 9l4.5-4.5L16 6l-6 6z"
                        />
                    </svg>
                </div>
            </div>
                <div>
                    <label htmlFor="timetable">Time:</label>
                    <input type='text' name='txttime'/>
                   
                </div>
                <button type="submit">Add Timetable</button>
            </form>
        </div>
    );
};

export default AddTimetable;*/