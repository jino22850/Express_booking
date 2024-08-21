
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
        <div className='flex flex-col lg:flex-row w-full'>
          <div className='w-full flex flex-col justify-center items-center lg:w-1/2'>
            <motion.h1
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 1 }}
              className='text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-center text-black italic font-bold mt-4 px-4'
            >
              Welcome to XPress Bookings
            </motion.h1>
            <motion.h4
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 1 }}
              className='text-lg sm:text-xl md:text-2xl lg:text-xl font-medium text-gray-700 mt-4 px-4'
            >
              Bus tickets made easy. Book your next trip today!
            </motion.h4>
            <motion.a
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 1 }}
              href='/booking'
              className=' px-6 py-3 mt-8 text-white text-lg font-bold bg-gray-900 rounded-md hover:bg-yellow-700 transition duration-300'
            >
              Book Your Seat Now
            </motion.a>
          </div>
          <div className='flex justify-center lg:w-1/2 items-center mt-8 lg:mt-0 '>
            <motion.img
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1, duration: 1 }}
              src={Cover}
              alt=''
              className=' w-full h-auto object-cover rounded-lg shadow-lg'
            />
          </div>
        </div>
        </div>
        <div className='flex justify-center items-center py-8'>
          <div className='flex flex-wrap justify-center gap-4'>
            <motion.img
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.2, duration: 1 }}
              src={Image1}
              alt=''
              className='w-32 sm:w-40 md:w-48 lg:w-56 xl:w-64 rounded-lg shadow-md h-auto'
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
        <h2 className='text-xl sm:text-2xl font-bold text-center mb-4'>Secure Payment Methods</h2>
        <div className='flex flex-wrap justify-center gap-8'>
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.2, duration: 1 }}
            className='flex flex-col items-center'
          >
            <img src={Cash} alt='Cash' className='w-24 sm:w-28 md:w-32 h-auto' />
            <h3 className='mt-2 text-sm sm:text-lg'>Cash</h3>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.2, duration: 1 }}
            className='flex flex-col items-center'
          >
            <img src={visa} alt='Visa' className='w-24 sm:w-28 md:w-32 h-auto' />
            <h3 className='mt-2 text-sm sm:text-lg'>Visa</h3>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.4, duration: 1 }}
            className='flex flex-col items-center'
          >
            <img src={master} alt='MasterCard' className='w-36 sm:w-56 md:w-36 h-auto' />
            <h3 className='mt-2 text-sm sm:text-lg'>MasterCard</h3>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.6, duration: 1 }}
            className='flex flex-col items-center'
          >
            <img src={AMEX} alt='American Express' className='w-16 sm:w-24 md:w-18 h-auto' />
            <h3 className='mt-2 text-sm sm:text-lg'>American Express</h3>
          </motion.div>
        </div>
      </div>
      </div>
    
  );
};

export default Home;