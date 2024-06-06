import React from 'react'
import { CgProfile } from "react-icons/cg";
import { FaRegBell } from "react-icons/fa";
import { FaEnvelope } from "react-icons/fa";

const header = () => {
  return (
    <div className='bg-gray-900 text-white h-16 flex items-center justify-between px-6 w-screen'>
     
      <h1 className="text-lg font-semibold">Conductor Dashboard</h1>

      <div className='flex items-center gap-[35px] relative'>
      <FaRegBell/>
      <FaEnvelope />

      <a href='/profile'><CgProfile /></a>
      </div>
      
    </div>
  )
}

export default header
