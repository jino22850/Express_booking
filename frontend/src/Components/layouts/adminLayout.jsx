import React from 'react';
import AdminHeader from '../AdminComponents/Header/Header';
import SideBar from '../AdminComponents/SideBar/SideBar';
import { Outlet } from 'react-router-dom';

const AdminLayout = () => {
  return (
    <div className="h-screen overflow-hidden">
      <AdminHeader />
      <div className="flex h-full">
        <div className="w-64 fixed top-16 left-0 h-full">
          <SideBar />
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

export default AdminLayout;