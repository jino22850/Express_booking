
import React from 'react';
import { motion } from 'framer-motion';
import Cover from '../Assests/booking1.1.png';
import Image1 from '../Assests/Image1.jpg'; // Replace with your actual image paths
import Image2 from '../Assests/Image2.jpg'; // Replace with your actual image paths
import SLbus from '../Assests/SLbus.jpg';
import SLbus1 from '../Assests/slbus2.jpg';
import SLbus2 from '../Assests/slbus3.jpg';
import visa from '../Assests/visa.jpg';
import master from '../Assests/master.png';
import AMEX from '../Assests/AMEX.png';
import Cash from '../Assests/srilankan-rupee.png'



const Home = () => {
  

  return (
    <div>
    <div className='bg-orange-50 flex flex-col min-h-screen'>

      <div className='flex flex-col justify-between flex-grow'>
        <div className='flex flex-row w-full'>
          <div className='w-full flex flex-col justify-center items-center'>
            <motion.h1
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 1 }}
              className='text-7xl text-center text-black italic font-bold ml-12'
            >
              Welcome to XPress Bookings
            </motion.h1>
            <motion.h4
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 1 }}
              className='text-xl font-medium text-gray-700 ml-12 mt-8'
            >
              Bus tickets made easy. Book your next trip today!
            </motion.h4>
            <motion.a
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 1 }}
              href='/booking'
              className='px-4 py-2 ml-4 mt-16 text-white text-lg font-bold bg-gray-900 rounded-md hover:bg-yellow-700 transition duration-300'
            >
              Book Your Seat Now
            </motion.a>
          </div>
          <div className='w-full flex justify-end items-center'>
            <motion.img
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1, duration: 1 }}
              src={Cover}
              alt=''
              className='w-3/4 mb-8'
            />
          </div>
        </div>
        </div>
        <div className='flex justify-center items-center py-8'>
          <div className='flex justify-center space-x-4'>
            <motion.img
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.2, duration: 1 }}
              src={Image1}
              alt=''
              className='w-1/4 rounded-lg shadow-md h-44'
            />
            <motion.img
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.4, duration: 1 }}
              src={Image2}
              alt=''
              className='w-1/4 rounded-lg shadow-md h-44'
            />
            <motion.img
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.6, duration: 1 }}
              src={SLbus}
              alt=''
              className='w-1/4 rounded-lg shadow-md h-44'
            />
            <motion.img
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.6, duration: 1 }}
              src={SLbus1}
              alt=''
              className='w-1/4 rounded-lg shadow-md h-44'
            />
            <motion.img
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.6, duration: 1 }}
              src={SLbus2}
              alt=''
              className='w-1/4 rounded-lg shadow-md h-44'
            />
          </div>
        </div>
      </div>
      
      <div className='bg-white py-8'>
        <h2 className='text-2xl font-bold text-center mb-4 -ml-8'>Secure Payment Methods</h2>
        <div className='flex justify-center space-x-8'>
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.2, duration: 1 }}
            className='flex flex-col items-center'
          >
            <img src={Cash} alt='Cash' className='w-36 h-28 ml-8 mt-5' />
            <h3 className='mt-2 text-lg'>Cash</h3>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.2, duration: 1 }}
            className='flex flex-col items-center'
          >
            <img src={visa} alt='Visa' className='w-36 h-32 ml-8' />
            <h3 className='mt-2 text-lg'>Visa</h3>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.4, duration: 1 }}
            className='flex flex-col items-center'
          >
            <img src={master} alt='MasterCard' className='w-32 h-32 ml-8' />
            <h3 className='mt-2 text-lg'>MasterCard</h3>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.6, duration: 1 }}
            className='flex flex-col items-center'
          >
            <img src={AMEX} alt='American Express' className='w-36 h-32' />
            <h3 className='mt-2 text-lg'>American Express</h3>
          </motion.div>
        </div>
      </div>
      </div>
    
  );
};

export default Home;