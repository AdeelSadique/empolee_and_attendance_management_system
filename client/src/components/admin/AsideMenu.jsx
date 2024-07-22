import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { IoMdClose } from 'react-icons/io';
import { MdOutlineMenu } from 'react-icons/md';
function AsideMenu() {
  const [drawerOpen, setDrawerOpen] = useState(false);

  // useEffect(() => {}, [drawerOpen]);

  return (
    <div>
      <div className='grid place-items-end'>
        {!drawerOpen ? (
          <MdOutlineMenu
            size={'30'}
            className=' hover:cursor-pointer hover:bg-slate-500 hover:text-white rounded-sm m-1 block lg:hidden '
            onClick={() => setDrawerOpen(!drawerOpen)}
          />
        ) : (
          <IoMdClose
            size={'30'}
            className=' hover:cursor-pointer hover:bg-slate-500 hover:text-white rounded-sm m-1 block lg:hidden '
            onClick={() => setDrawerOpen(!drawerOpen)}
          />
        )}
      </div>
      <div
        className='h-screen bg-slate-300  shadow-lg  flex  flex-col items-start gap-2  font-bold  absolute lg:static -left-full'
        style={{ left: drawerOpen ? '0px' : '', transition: 'all 0.5s ease-out', width: drawerOpen ? '100%' : '' }}
      >
        <Link to={'/admin'} onClick={() => setDrawerOpen(!drawerOpen)} className='mt-4 p-4 w-full hover:bg-slate-500 hover:text-white'>
          Home
        </Link>
        <Link to={'/admin/profile'} onClick={() => setDrawerOpen(!drawerOpen)} className=' p-4 w-full hover:bg-slate-500 hover:text-white'>
          Profile
        </Link>
        <Link to={'/admin/employees'} onClick={() => setDrawerOpen(!drawerOpen)} className=' p-4 w-full hover:bg-slate-500 hover:text-white'>
          Employees
        </Link>
        <Link to={'/admin/attendee'} onClick={() => setDrawerOpen(!drawerOpen)} className=' p-4 w-full hover:bg-slate-500 hover:text-white'>
          Attendee
        </Link>
        <Link to={'/admin/absent'} onClick={() => setDrawerOpen(!drawerOpen)} className=' p-4 w-full hover:bg-slate-500 hover:text-white'>
          Absent
        </Link>
        <Link to={'/admin/settings'} onClick={() => setDrawerOpen(!drawerOpen)} className=' p-4 w-full hover:bg-slate-500 hover:text-white'>
          Settings
        </Link>

        <Link to={'/logout'} className=' p-4 w-full hover:bg-slate-500 hover:text-white'>
          Logout
        </Link>
      </div>
    </div>
  );
}

export default AsideMenu;
