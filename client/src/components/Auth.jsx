import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
function Auth() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const id = setTimeout(() => {
      axios
        .get(`${import.meta.env.VITE_BACKEND_URL}/api/me`, { withCredentials: true })
        .then((res) => {
          setLoading(false);
          const isAdmin = res.data.message.user;
          isAdmin ? navigate('/admin') : navigate('/login');
        })
        .catch((err) => {
          setLoading(false);
          localStorage.removeItem('token');
          console.log(err);
          navigate('/login');
        });
    }, 2000);
    () => clearTimeout(id);
  }, []);
  return loading ? <div className='w-full h-screen grid place-content-center text-4xl font-bold bg-slate-500'>Authenticating...</div> : '';
}

export default Auth;
