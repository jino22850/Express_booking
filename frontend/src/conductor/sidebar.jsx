import React from 'react'
import { MdDashboard } from "react-icons/md"
import { FaDashcube } from "react-icons/fa";
import { MdAccountBox } from "react-icons/md";
import { FaBusSimple } from "react-icons/fa6";

const sidebar = () => {
  return (
    <div>
      <div className="h-screen bg-yellow-200 dark:bg-slate-950/90">
      <div className='flex flex-col gap-3 w-full text-slate-300 h-full justify-between'>
        <div className='flex flex-col gap-10 px-4 mt-4'>
          <div className='flex items-center justify-center gap-5'>
            <div className='text-black dark:text-white text-xl md:textxl-'>
              <MdDashboard />
        

            </div>
            <div className=' md:flex text-black lead-[24px] font-extrabold cursor-pointer'>XPress Bookings</div>

          </div>
          <div className='flex flex-col gap-5 text-md lg:text-lg'>
            <div className='flex items-center gap-5 text-black'>
            <div>
            <FaDashcube />
            </div>
          
            <div className='sm:flex hover:text-lg lg:text-black cursor:pointer'>
            <a href='/conductor/conDashboard'>
            Dashboard
            </a>
          </div>
          </div>
          <div className='flex items-center gap-5 text-black'>
          <div>
          <MdAccountBox />
            </div>
          
            <div className='sm:flex hover:text-lg lg:text-black cursor:pointer'>
            <a href='/conductor/profile'>
            My profile
            </a>
          </div>
          </div>
          
          <div className='flex items-center gap-5 text-black'>

          <div>
          <FaBusSimple />
            </div>
          
            <div className='sm:flex hover:text-lg lg:text-black cursor:pointer'>
            <a href='/conductor/ConBookings'>
            Booking
            </a>
          </div>
          </div>

          
        
      </div>
      </div>
      
      </div>
  </div>
    </div>
  )
}

export default sidebar

