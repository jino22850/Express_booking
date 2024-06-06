/*import React, { useState, useEffect} from 'react';
import AdminHeader from '../Components/AdminComponents/Header/Header';
//import CancelBooking from './CancelBooking';
import axios from 'axios';
//import { motion } from 'framer-motion';
//import SideBar from '../Components/AdminComponents/SideBar/SideBar';
import PendingBookings from './adminBooking';
//import { FaCircle } from "react-icons/fa6";
import { FaRegCalendarMinus } from "react-icons/fa";
import { FaUsers } from "react-icons/fa6";
import { FaTicketAlt } from "react-icons/fa"
import { FaCalendar } from "react-icons/fa";
import { FaEllipsisV } from "react-icons/fa";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { CgBackspace } from 'react-icons/cg';

const data = [
  {
    name: '1 st week',
    ab: 4,
    cb: 2,
    
  },
  {
    name: '2 nd week',
    ab: 3,
    cb: 13,
    
  },
  {
    name: '3 rd week',
    ab: 2,
    cb: 9,
  
  },
  {
    name: '4 th week',
    ab: 8,
    cb: 3,
    
  },
  /*{
    name: 'Page E',
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: 'Page F',
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: 'Page G',
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },*/
/*];



const Dashbord = () => {
  /*const [notifications, setNotifications] = useState([]);

  const fetchNotifications = async () => {
    try {
      const response = await axios.get('http://localhost:8070/api/notifications/cancellations');
      setNotifications(response.data);
    } catch (error) {
      console.error('Error fetching notifications:', error);
    }
  }*/

  /*const [notifications, setNotifications] = useState([]);

  const fetchNotifications = async () => {
    try {
      const response = await axios.get('http://localhost:8070/api/bookings/pendingBookings');
      setNotifications(response.data);
    } catch (error) {
      console.error('Error fetching notifications:', error);
    }
  }*/

  /*const [notifications, setNotifications] = useState([]);
  const [bookingCount, setBookingCount] = useState(0);
  const [cancellationCount, setCancellationCount] = useState(0);
  const [passengerCount, setPassengerCount] = useState(0);

  useEffect(() => {
    fetchNotifications();
    fetchCounts();
  }, []);

  const fetchNotifications = async () => {
    try {
      const response = await axios.get('http://localhost:8070/api/bookings/pendingBookings');
      setNotifications(response.data);
    } catch (error) {
      console.error('Error fetching notifications:', error);
    }
  };

  const fetchCounts = async () => {
    try {
      const bookingResponse = await axios.get('http://localhost:8070/api/bookings/approved/count');
      setBookingCount(bookingResponse.data.count);

      const cancellationResponse = await axios.get('http://localhost:8070/api/bookings/cancelled/count');
      setCancellationCount(cancellationResponse.data.count);

      const passengerResponse = await axios.get('http://localhost:8070/api/users/monthly-count');
      setPassengerCount(passengerResponse.data.count);
    } catch (error) {
      console.error('Error fetching counts:', error);
    }
  };
  return (

<div className='pt-[100px] px-[70px] bg-[#F8F9FC]'>
      <AdminHeader notifications={notifications} />

      <div className='flex items-center justify-between'>
        <h1 className='text-[#5a5c69] text-[28px] leading-[34px] font-normal cursor-pointer'>Dashboard</h1>
      </div>
      <div className='grid grid-cols-3 gap-[30px] mt-[25px] pb-[15px]'>
        <div className='h-[100px] w-72 rounded-[8px] bg-white border-l-[4px] border-[#701953] flex items-center justify-between px-[30px] cursor-pointer hover:shadow-lg transform hover:scale-105% transition duration-300 ease-out'>
          <div>
            <h2 className='text-[#7b2687] text-[16px] leading-[17px] font-bold'>Booking (Monthly)</h2>
            <h1 className='text-[20px] leading-[24px] font-bold text-[gray-100] mt-[5px]'>{bookingCount}</h1>
          </div>
          <FaRegCalendarMinus fontSize={28} color='' />
        </div>

        <div className='h-[100px] w-72 rounded-[8px] bg-white border-l-[4px] border-[#ebb955] flex items-center justify-between px-[30px] cursor-pointer hover:shadow-lg transform hover:scale-105% transition duration-300 ease-out'>
          <div>
            <h2 className='text-[#b49547] text-[16px] leading-[17px] font-bold'>Passengers (Monthly)</h2>
            <h1 className='text-[20px] leading-[24px] font-bold text-[gray-100] mt-[5px]'>{passengerCount}</h1>
          </div>
          <FaUsers fontSize={28} color='' />
        </div>

        <div className='h-[100px] w-72 rounded-[8px] bg-white border-l-[4px] border-[#145830] flex items-center justify-between px-[30px] cursor-pointer hover:shadow-lg transform hover:scale-105% transition duration-300 ease-out'>
          <div>
            <h2 className='text-[#3eab8c] text-[16px] leading-[17px] font-bold'>Cancellation (Monthly)</h2>
            <h1 className='text-[20px] leading-[24px] font-bold text-[gray-100] mt-[5px]'>{cancellationCount}</h1>
          </div>
          <FaTicketAlt fontSize={28} color='' />
        </div>
      </div>

      <div className='flex mt-[22px] w-1/2 gap-[30px]'>
        <div className='basis-[50%] border bg-white shadow-md cursor-pointer rounded-[4px]'>
          <div className='bg-gray-100 flex items-center justify-between py-[15px] px-[20px] border-b-[1px] border-[#EDEDED] md-[20px]'>
            <h2>Booking Overview</h2>
          </div>
          <LineChart
            width={600}
            height={400}
            data={data}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="ab" stroke="#8884d8" activeDot={{ r: 8 }} />
            <Line type="monotone" dataKey="cb" stroke="#82ca9d" />
          </LineChart>
        </div>

        <div className='basis-[50%] border bg-gray-100 shadow-md cursor-pointer rounded-[4px]'>
          <div className='bg-[#F8F9FC] flex items-center justify-between py-[15px] px-[20px] border-b-[1px] border-[#EDEDED]'>
            <h2>Conductor Details</h2>
            <FaEllipsisV />
          </div>
          <div></div>
        </div>
      </div>

      <div>
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-indigo-950">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                User
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                User Id
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                Date
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                Ticket Count
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200"></tbody>
        </table>
      </div>

      <PendingBookings refreshNotifications={fetchNotifications} />
    </div>
  );
};

export default Dashbord*/


import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import AdminHeader from '../Components/AdminComponents/Header/Header';
import PendingBookings from './adminBooking';
import { FaRegCalendarMinus, FaUsers, FaTicketAlt } from "react-icons/fa";
import Logo from '../Assests/2-removebg-preview.png'

const Dashboard = () => {
    const [data, setData] = useState([]);
    const [approvedCount, setApprovedCount] = useState(0);
    const [canceledCount, setCanceledCount] = useState(0);
    const [passengerCount, setPassengerCount] = useState(0);
    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        fetchApprovedBookings();
        fetchCanceledBookings();
        fetchPassenger();
        fetchNotifications();
    }, []);

    const fetchApprovedBookings = async () => {
        try {
            const response = await axios.get('http://localhost:8070/api/bookings/approved/count');
            setApprovedCount(response.data.count);
        } catch (error) {
            console.error('Error fetching approved bookings:', error);
        }
    };

    const fetchCanceledBookings = async () => {
        try {
            const response = await axios.get('http://localhost:8070/api/bookings/cancelled/count');
            setCanceledCount(response.data.count);
        } catch (error) {
            console.error('Error fetching canceled bookings:', error);
        }
    };

    const fetchPassenger = async () => {
      try {
          const response = await axios.get('http://localhost:8070/api/users/monthly-count');
          setPassengerCount(response.data.count);
      } catch (error) {
          console.error('Error fetching passenger:', error);
      }
  };

    const fetchNotifications = async () => {
        try {
            const response = await axios.get('http://localhost:8070/api/bookings/pendingBookings');
            setNotifications(response.data);
        } catch (error) {
            console.error('Error fetching notifications:', error);
        }
    };

    useEffect(() => {
        setData([
            {
                name: 'Current Month',
                ApproveBookings: approvedCount,
                CancelBookings: canceledCount
            }
        ]);
    }, [approvedCount, canceledCount]);

    return (
        <div className='pt-[100px] px-[70px] bg-[#F8F9FC]'>
            <AdminHeader notifications={notifications} />
            <div className='flex items-center justify-between'>
                <h1 className='text-[#5a5c69] text-[28px] leading-[34px] font-normal cursor-pointer'>Dashboard</h1>
            </div>
            <div className='grid grid-cols-3 gap-[30px] mt-[25px] pb-[15px]'>
                <div className='h-[100px] w-72 rounded-[8px] bg-white border-l-[4px] border-[#701953] flex items-center justify-between px-[30px] cursor-pointer hover:shadow-lg transform hover:scale-105% transition duration-300 ease-out'>
                    <div>
                        <h2 className='text-[#7b2687] text-[16px] leading-[17px] font-bold'>Booking (Monthly)</h2>
                        <h1 className='text-[20px] leading-[24px] font-bold text-[gray-100] mt-[5px]'>{approvedCount}</h1>
                    </div>
                    <FaRegCalendarMinus fontSize={28} color='' />
                </div>

                <div className='h-[100px] w-72 rounded-[8px] bg-white border-l-[4px] border-[#ebb955] flex items-center justify-between px-[30px] cursor-pointer hover:shadow-lg transform hover:scale-105% transition duration-300 ease-out'>
                    <div>
                        <h2 className='text-[#b49547] text-[16px] leading-[17px] font-bold'>Passengers (Monthly)</h2>
                        <h1 className='text-[20px] leading-[24px] font-bold text-[gray-100] mt-[5px]'>{passengerCount}</h1>
                    </div>
                    <FaUsers fontSize={28} color='' />
                </div>

                <div className='h-[100px] w-72 rounded-[8px] bg-white border-l-[4px] border-[#145830] flex items-center justify-between px-[30px] cursor-pointer hover:shadow-lg transform hover:scale-105% transition duration-300 ease-out'>
                    <div>
                        <h2 className='text-[#3eab8c] text-[16px] leading-[17px] font-bold'>Cancellation (Monthly)</h2>
                        <h1 className='text-[20px] leading-[24px] font-bold text-[gray-100] mt-[5px]'>{canceledCount}</h1>
                    </div>
                    <FaTicketAlt fontSize={28} color='' />
                </div>
            </div>

            <div className='flex mt-[22px] w-1/2 gap-[30px]'>
                <div className='basis-[50%] border bg-white shadow-md cursor-pointer rounded-[4px]'>
                    <div className='bg-gray-100 flex items-center justify-between py-[15px] px-[20px] border-b-[1px] border-[#EDEDED] md-[20px]'>
                        <h2>Booking Overview</h2>
                    </div>
                    <LineChart
                        width={600}
                        height={400}
                        data={data}
                        margin={{
                            top: 5,
                            right: 30,
                            left: 20,
                            bottom: 5,
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="ApproveBookings" stroke="#8884d8" activeDot={{ r: 8 }} />
                        <Line type="monotone" dataKey="Cancel Bookings" stroke="#82ca9d" />
                    </LineChart>
                </div>

                
  <div className='bg-[#F8F9FC] flex items-center justify-between py-[0px] px-[0px] border-b-[1px] border-[#EDEDED]'>
    
   
                      </div>
  
    
    <img src={Logo} alt='logo' className='w-full h-full' />
  


            </div>

            <PendingBookings refreshNotifications={fetchNotifications} />
        </div>
    );
};

export default Dashboard;
