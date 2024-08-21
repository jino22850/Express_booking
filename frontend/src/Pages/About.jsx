import React from 'react';
import { motion } from 'framer-motion';
import image from '../Assests/bus5.jpeg';

const About = () => {
  return (
    <div className='bg-gray-100'>
      <div className='relative bg-[#f6f7da] w-screen'>
        <div className="absolute inset-0 "></div>
        <div className="container mx-auto px-4 py-8 relative z-10 text-center h-42">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-6xl font-bold text-indigo-950 mx-auto transform-translate-y-20-group-hover:scale-110 group-hover:text-indigo-600 duration-300 mt-10"
          >
            Who We Are
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className='text-lg italic text-black justify-center items-center mt-10'
          >
            XPress Bookings envisions a future where bus travel in Sri Lanka is seamless, convenient, and accessible for everyone. We strive to be the leading online platform for booking bus tickets, offering a user-friendly experience and a comprehensive network of routes.
          </motion.p>
        </div>
      </div>

      <div className='md:grid md:grid-cols-2 sm:py-16 '>
        <div className='mt-4 md:mt-0 text-left flex flex-col h-full justify-start py-6 md:py-0'>
          <div className='my-auto mx-6'>
            <motion.p
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
              className='text-base lg:text-sm'
            >
              Welcome to XPress Bookings, your one-stop platform for easy and convenient bus ticket booking. Enjoy a hassle-free travel experience with our wide network of routes, secure payments, and 24/7 customer support.
            </motion.p>
          </div>
        </div>

        <motion.img
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.8 }}
          className='mx-auto rounded-3xl py-8 md:py-0'
          src={image}
          alt='/'
          width={400}
          height={400}
        />
      </div>

      <div className='mt-10 mx-auto max-w-4xl ml-15px grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-14 place-items-center mb-14'>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0 }}
          className='group rounded-2xl bg-[#d9d7d7] hover:bg-gray-300 shadow-lg duration-200 max-w-[400] relative shadow-slate-900'
          style={{ height: '200px' }}
        >
          <div className='p-4 text-center space-y-4'>
            <h2 className='text-xl font-bold '>Our Mission</h2>
            <p className='text-gray-500 group-hover:text-black duration-300 text-sm line-clamp-2'>
              XPress Bus Booking System aims to revolutionize travel along the Badulla-Colombo highway by offering seamless, comfortable, and dependable transportation with semi-luxury buses. Prioritizing passenger safety, convenience, and satisfaction, we strive to establish new industry benchmarks by providing exceptional service, ensuring every traveler's journey is enjoyable and memorable.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className='bg-black text-white px-4 py-2 rounded-lg'
            >
              Read more
            </motion.button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
          className='group rounded-2xl bg-[#d9d7d7] hover:bg-gray-300 shadow-lg duration-200 max-w-[400] relative shadow-slate-900'
          style={{ height: '200px' }}
        >
          <div className='p-4 text-center space-y-4'>
            <h2 className='text-xl font-bold '>Our Vision</h2>
            <p className='text-gray-500 group-hover:text-black duration-300 text-sm line-clamp-2'>
              XPress Bus Booking System aims to be the top choice for travelers on the Badulla-Colombo highway, renowned for outstanding service and reliability. We constantly innovate to enhance the travel experience, setting new industry standards. With a focus on excellence and customer satisfaction, we aim to create memorable journeys, building strong connections with our passengers.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className='bg-black text-white px-4 py-2 rounded-lg'
            >
              Read more
            </motion.button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default About;
