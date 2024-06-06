import React from 'react';
import Conheader from '../../conductor/header';
import ConSideBar from '../../conductor/sidebar';
import { Outlet } from 'react-router-dom';


const Conductorlayout = () => {
  return (
    <div className="h-screen overflow-hidden">
      <Conheader />
      <div className="flex h-full">
        <div className="w-56 fixed top-16 left-0 h-full">
          <ConSideBar />
        </div>
        <div className="flex-1 ml-44 p-4 overflow-auto">
          <div className="h-full overflow-auto w-full">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Conductorlayout
