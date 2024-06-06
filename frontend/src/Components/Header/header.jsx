import React, { useContext, useState, useEffect } from 'react';
import { HiMenuAlt1, HiMenuAlt3 } from 'react-icons/hi';
import { AuthContext } from '../context/AuthContext';
import Logo from '../../Assests/2-removebg-preview.png'
import { FaCircleUser } from "react-icons/fa6";
import { Link } from 'react-router-dom'; 

const Header = () => {
  const { user, role, dispatch } = useContext(AuthContext);
  const [showMenu, setShowMenu] = useState(false);

  useEffect(() => {
    console.log('Logged-in user details:', user);
  }, [user]);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const handleLogout = () => {
    // Show alert with user's name
    alert(`Goodbye!`);

    dispatch({ type: "LOGOUT" });
    localStorage.removeItem("userToken"); // Remove token from localStorage
    window.location.href = "/home"; // Navigate to home page
  };
  
  return (
    <div className='bg-white-200 text-center py-3 shadow-x'>
      <div className='flex justify-between items-center mx-auto max-w-6xl'>
        <div className='flex items-center'>
        <img src={Logo} alt='logo' className='w-14 h-auto' />
          <a href='/' className='text-3xl font-bold flex items-center justify-between gap-2'>
            <span className='text-2xl'>XPress</span>
            <span className='text-yellow-500'>Booking</span>
          </a>
        </div>
        <div className='hidden md:block'>
          <div className='flex items-center gap-2'>
            <a href='/home' className='text-lg font-medium text-black dark:text-white py-2 px-4 rounded-full hover:bg-yellow-500 duration-300'>Home</a>
            <a href='/about' className='text-lg font-medium text-black dark:text-white py-2 px-4 rounded-full hover:bg-yellow-500 duration-300'>About</a>
            <a href='/contact' className='text-lg font-medium text-black dark:text-white py-2 px-4 rounded-full hover:bg-yellow-500 duration-300'>Contact</a>
            <a href='/booking' className='text-lg font-medium text-black dark:text-white py-2 px-4 rounded-full hover:bg-yellow-500 duration-300'>Booking</a>
          </div>
        </div>
        <div className='flex justify-center items-center space-x-4'>
          {user ? (
            <div className='flex items-center space-x-4'>
              <span className='text-[#6f8ebd]'>Welcome, {user.email}</span>
              <button
                onClick={handleLogout}
                className="py-2 px-5 border rounded bg-blue text-black bg-blue-100 hover:bg-blue dark:hover:text-white"
              >
                Logout
              </button>
              <Link to="/userprofile"> {/* Link to the user profile page */}
                <FaCircleUser className='w-10 h-10 text-gray-300 cursor-pointer' />
              </Link>

              <div className='md:hidden flex items-center gap-4'>
                {showMenu ? (
                  <HiMenuAlt1 onClick={toggleMenu} className='cursor-pointer transition-all' size={30} />
                ) : (
                  <HiMenuAlt3 onClick={toggleMenu} className='cursor-pointer transition-all' size={30} />
                )}
              </div>
            </div>
          ) : (
            <a href='/login' className='text-lg font-bold text-black dark:text-white py-2 px-4 rounded-full hover:bg-yellow-500 duration-300'>Login</a>
          )}
        </div>
        

      </div>
    </div>
  );
};

export default Header;



