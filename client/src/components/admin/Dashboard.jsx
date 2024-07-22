import React, { useEffect } from 'react';
import AsideMenu from './AsideMenu';
import MainContent from './MainContent';
import Header from './Header';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Dashboard() {
  const navigate = useNavigate();
  useEffect(() => {
    // check that user is logged or not
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/api/me`, { withCredentials: true })
      .then((res) => {})
      .catch((err) => {
        navigate('/login');
      });
  }, []);

  return (
    <>
      <Header />
      <div className='w-full flex flex-col lg:flex-row'>
        <div className='w-full lg:w-[20%]'>
          <AsideMenu />
        </div>
        <div className='w-full lg:w-[80%]'>
          <MainContent />
        </div>
      </div>
    </>
  );
}

export default Dashboard;
