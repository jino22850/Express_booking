import React, { useState } from 'react';
import { FaDashcube, FaUser, FaChevronLeft } from "react-icons/fa";
import { MdAccountBox, MdFeedback } from "react-icons/md";
import { FaBusSimple } from "react-icons/fa6";

const SideBar = ({ openSidebarToggle, OpenSidebar }) => {
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  const toggleBookingDropdown = () => {
    setIsBookingOpen(!isBookingOpen);
  };

  return (
    <div className='fixed top-0 left-0 h-full bg-gray-200 dark:bg-slate-950/90 mt-16'>
      <div className='flex flex-col gap-3 w-52 text-slate-300 h-full justify-between'>
        <div className='flex flex-col gap-10 px-4 mt-4'>
          <div className='flex items-center justify-center gap-5'>
            {/* Placeholder for potential logo or branding */}
          </div>
          <div className='flex flex-col gap-5 text-md lg:text-md'>
            <div className='flex items-center gap-5 text-black'>
              <FaDashcube />
              <div className='sm:flex hover:text-bold lg:text-black cursor-pointer'>
                <a href='/admin/dashboard' className="hover:underline text-sm">Dashboard</a>
              </div>
            </div>
            <div className='flex items-center gap-5 text-black'>
              <MdAccountBox />
              <div className='sm:flex hover:text-bold lg:text-black cursor-pointer'>
                <a href='/admin/addUser' className="hover:underline text-sm">Accounts</a>
              </div>
            </div>
            <div className='flex items-center gap-5 text-black'>
              <FaUser />
              <div className='sm:flex hover:text-bold lg:text-black cursor-pointer'>
                <a href='/admin/conductor' className="hover:underline text-sm">Conductor</a>
              </div>
            </div>
            <div className='flex flex-col gap-1'>
              <div className='flex items-center gap-5 text-black cursor-pointer' onClick={toggleBookingDropdown}>
                <FaBusSimple className='mt-1' />
                <span className='hover:text-underline text-sm'>Booking</span>
              </div>
              {isBookingOpen && (
                <div className='pl-10 flex flex-col'>
                  <a href='/admin/adminBooking' className=" text-black hover:underline text-sm">Pending Booking</a>
                  <a href='/admin/approvedBookings' className=" text-black hover:underline text-sm">Approved Booking</a>
                  <a href='/admin/CancelBooking' className=" text-black hover:underline text-sm">Cancel Booking</a>
                </div>
              )}
            </div>
            <div className='flex items-center gap-5 text-black'>
              <MdFeedback />
              <div className='sm:flex hover:text-bold lg:text-black cursor-pointer'>
                <a href='/admin/feedback' className="hover:underline text-sm">Feedback</a>
              </div>
            </div>
            <div className='flex items-center gap-5 text-black'>
              <FaBusSimple />
              <div className='sm:flex hover:text-bold lg:text-black cursor-pointer'>
                <a href='/admin/addBus' className="hover:underline text-sm">Bus</a>
              </div>
            </div>
            {/* Uncomment this section if needed
            <div className='flex items-center gap-5 text-black'>
              <BiSolidReport />
              <div className='sm:flex hover:text-lg lg:text-black cursor-pointer'>
                <a href='/admin/report' className="hover:underline">Report</a>
              </div>
            </div>
            */}
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
