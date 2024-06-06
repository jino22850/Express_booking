import React from 'react';
//import { MdDashboard } from "react-icons/md";
import { FaDashcube } from "react-icons/fa";
import { MdAccountBox } from "react-icons/md";
import { FaBusSimple } from "react-icons/fa6";
import { MdFeedback } from "react-icons/md";
//import { BiSolidReport } from "react-icons/bi";
import { FaUser } from "react-icons/fa";
import { FaChevronLeft } from "react-icons/fa";

const SideBar = ({ openSidebarToggle, OpenSidebar }) => {
  return (
    <div className='fixed top-0 left-0 h-full bg-yellow-200 dark:bg-slate-950/90 mt-16'>
      <div className='flex flex-col gap-3 w-52 text-slate-300 h-full justify-between'>
        <div className='flex flex-col gap-10 px-4 mt-4'>
          <div className='flex items-center justify-center gap-5'>
            {/*<div className='text-black dark:text-white text-xl'>
              <MdDashboard />
            </div>
  <div className='md:flex text-black leading-[24px] font-extrabold cursor-pointer'>XPress Bookings</div>*/}
          </div>
          <div className='flex flex-col gap-5 text-md lg:text-lg'>
            <div className='flex items-center gap-5 text-black'>
              <div>
                <FaDashcube />
              </div>
              <div className='sm:flex hover:text-lg lg:text-black cursor-pointer'>
                <a href='/admin/dashboard' className="hover:underline">Dashboard</a>
              </div>
            </div>
            <div className='flex items-center gap-5 text-black'>
              <div>
                <MdAccountBox />
              </div>
              <div className='sm:flex hover:text-lg lg:text-black cursor-pointer'>
                <a href='/admin/addUser' className="hover:underline">Accounts</a>
              </div>
            </div>
            <div className='flex items-center gap-5 text-black'>
              <div>
                <FaUser />
              </div>
              <div className='sm:flex hover:text-lg lg:text-black cursor-pointer'>
                <a href='/admin/conductor' className="hover:underline">Conductor</a>
              </div>
            </div>
            <div className='flex items-center gap-5 text-black'>
              <div className='mt-1'>
                <FaBusSimple />
                </div>
              
              <div className='sm:flex flex-col gap-1'>
              <span className='text-lg text-black hover:text-yellow-500 cursor-pointer'>Booking</span>
             
                <a href='/admin/adminBooking' className="hover:underline text-sm">Pending Booking</a>
                <a href='/admin/approvedBookings' className="hover:underline text-sm">Approved Booking</a>
                <a href='/admin/CancelBooking' className="hover:underline text-sm">Cancel Booking</a>
              </div>
            </div>
            
            <div className='flex items-center gap-5 text-black'>
              <div>
                <MdFeedback />
              </div>
              <div className='sm:flex hover:text-lg lg:text-black cursor-pointer'>
                <a href='/admin/feedback' className="hover:underline">Feedback</a>
              </div>
            </div>
            <div className='flex items-center gap-5 text-black'>
              <div>
                <FaBusSimple />
              </div>
              <div className='sm:flex hover:text-lg lg:text-black cursor-pointer'>
                <a href='/admin/addBus' className="hover:underline">Bus</a>
              </div>
            </div>
            {/*<div className='flex items-center gap-5 text-black'>
              <div>
                <BiSolidReport />
              </div>
              <div className='sm:flex hover:text-lg lg:text-black cursor-pointer text-black leading-[20px]'>
                <a href='/admin/report' className="hover:underline">Report</a>
              </div>
</div>*/}
          </div>
        </div>
        <div className='flex items-center justify-center pt-4'>
          <div className='h-10 w-10 bg-yellow-50 rounded-full flex items-center justify-center cursor-pointer'>
            <FaChevronLeft color='black' />
          </div>
        </div>
      </div>
    </div>
  );
}

export default SideBar;
