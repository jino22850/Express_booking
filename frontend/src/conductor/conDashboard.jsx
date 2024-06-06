import React from 'react'
import { FaUsers } from "react-icons/fa6";
import { FaTicketAlt } from "react-icons/fa"
import { FaRegCalendarMinus } from "react-icons/fa";

const ConDashboard = () => {
  return (
   
        <div className="flex-1 overflow-y-auto bg-gray-100 justify-between items-center">
        <h1 className='text-[#5a5c69] text-[28px] font-normal cursor-pointer'>Dashboard</h1>
          {/* Add your content here */}
        
        <div className='grid grid-cols-4 gap-[36px] mt-[25px] pb-[15px] ml-16'>
          <div className='h-[100px] w-72 rounded-[8px] bg-white border-l-[4px] border-[#101338] flex items-center justify-between px-[30px] cursor-pointer hover:shadow-lg transform hover:scale-105% transition duration-300 ease-out'>
            <div>
              <h2 className='text-[#221324] text-[16px] leading-[17px] font-bold'>Booking (per one turn)</h2>
              <h1  className='text-[20px] leading-[24px] font-bold text-[gray-100] mt-[5px]'>50</h1>
            </div>
            <FaRegCalendarMinus fontSize={28} color='' />

          </div>

          <div className='h-[100px] w-72 rounded-[8px] bg-white border-l-[4px] border-[#0d0515] flex items-center justify-between px-[30px] cursor-pointer hover:shadow-lg transform hover:scale-105% transition duration-300 ease-out'>
            <div>
              <h2 className='text-[#1e1d19] text-[16px] leading-[17px] font-bold'>Pasengers (Daily)</h2>
              <h1  className='text-[20px] leading-[24px] font-bold text-[gray-100] mt-[5px]'>2</h1>
            </div>
            <FaUsers fontSize={28} color='' />

          </div>

          <div className='h-[100px] w-72 rounded-[8px] bg-white border-l-[4px] border-[#3c3412] flex items-center justify-between px-[30px] cursor-pointer hover:shadow-lg transform hover:scale-105% transition duration-300 ease-out'>
            <div>
              <h2 className='text-[#232b29] text-[16px] leading-[17px] font-bold'>Cancellation 
              (Daily)</h2>
              <h1  className='text-[20px] leading-[24px] font-bold text-[gray-100] mt-[5px]'>0</h1>
            </div>
            <FaTicketAlt fontSize={28} color='' />

          </div>
          </div>
          </div>
      
    
  )
}

export default ConDashboard
