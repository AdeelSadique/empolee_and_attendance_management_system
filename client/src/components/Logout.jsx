import axios from 'axios';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/ReactToastify.css';
import { Toast } from './Toast';

function Logout() {
  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/api/logout`, { withCredentials: true })
      .then((res) => {
        localStorage.removeItem('userLogged');
        Toast(res?.data?.message || 'Logged Out', 'success');
        navigate('/login');
      })
      .catch((err) => {
        localStorage.removeItem('userLogged');
        Toast(err?.response?.data?.message || 'Logged Out', 'error');
        navigate('/login');
        console.log(err);
      });
  }, []);
  return <ToastContainer></ToastContainer>;
}

export default Logout;
