import React from 'react'
import { FaFacebook } from "react-icons/fa6";
import { IoLogoWhatsapp } from "react-icons/io";
import { FaTwitter } from "react-icons/fa";
import { FaInstagramSquare } from "react-icons/fa";
import { FaAddressBook } from "react-icons/fa6";
import { PiPhoneCallFill } from "react-icons/pi";
import { MdAttachEmail } from "react-icons/md";
import Logo from '../../Assests/2-removebg-preview.png'
//import { Link } from 'react-router-dom';


const footer = () => {
  return (
    <div>
      {/*<div className='bg-yellow-500 text-black'>
        <div className='container text-black text-center py-10 lg:py-14 text-2xl font-bold space-y-4'>
          <p>We are ready to take your booking at any time</p>
          <h1 className='text-3xl md:text-5xl font-bold'>0754394511122</h1>
          </div>
  </div>*/}
        <div className='container  mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-14 md:gap-20 py-8 bg-white w-screen '>
       {/*} <div className='w-full flex justify-end items-center h-100% '>
              <img src='./bus.jpg' alt=''/>
</div>*/}
          <div className='space-y-6 ml-16 mr-11'>
            <h1 className='text-2xl py-3 font-bold uppercase border-b-8 text-black'>About</h1>
            <p className='text-black justify-center items-center'>XPress Bookings envisions a future where bus travel in Sri Lanka is seamless, convenient, and accessible for everyone. </p>{/*<p>We strive to be the leading online platform for booking bus tickets, offering a user-friendly experience and a comprehensive network of routes.</p>*/}


            
          </div>
          <div className='space-y-6 ml-20 mr-11'>
  <h1 className='text-2xl py-3 font-bold uppercase border-b-8 text-black justify-center '>Company</h1>
  <div className='space-y-2 justify-center items-center ml-16'>
    <a href='/home' className='block text-black hover:text-indigo-500 transition duration-300'>Home</a>
    <a href='/about' className='block text-black hover:text-indigo-500 transition duration-300'>About</a>
    <a href='/contact' className='block text-black hover:text-indigo-500 transition duration-300'>Contact</a>
    <a href='/booking' className='block text-black hover:text-indigo-500 transition duration-300'>Booking</a>
  </div>
</div>

          <div>
          <div className='space-y-6 ml-11 mr-11 '>
          <h1 className='text-2xl py-3 font-bold uppercase border-b-8 text-black'>Contact</h1>
          <div className='flex items-center gap-4 text-center text-black'>
            <FaAddressBook/>XPress booking , Judge's hill road , Badulla
          </div>
          <div className='flex items-center gap-4 text-center text-black'>
            <PiPhoneCallFill/><a href='/phone'>055-2586652</a>
          </div>
          <div className='flex items-center gap-4 text-center text-black'>
            <MdAttachEmail/><a href='/email' className='hover:to-blue-200'>xpressbooking@gmail.com</a>
          </div>

          </div>
          

        </div>
        <div className='space-y-6 ml-16 mr-11'>
          
          <img src={Logo} alt='logo' className='w-auto h-auto' />
  
          
        <div className='flex items-center gap-3 text-2xl'>
            <FaFacebook />
            <IoLogoWhatsapp />
            <FaTwitter />
            <FaInstagramSquare />
            </div>
            </div>
      </div>
    </div>
  
  )
}

export default footer
