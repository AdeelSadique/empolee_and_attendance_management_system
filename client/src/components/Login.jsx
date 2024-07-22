import React, { useState } from 'react';
import avatar from '../assets/react.svg';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/ReactToastify.css';
import { Toast } from './Toast';
function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const loginHandler = () => {
    //    call login api
    axios
      .post(`${import.meta.env.VITE_BACKEND_URL}/api/login`, { email, password }, { withCredentials: true })
      .then((res) => {
        navigate('/auth');
      })
      .catch((err) => {
        Toast(err?.response?.data?.message || 'Invalid Email or Password', 'error');
        console.log(err);
      });
  };

  return (
    <>
      <ToastContainer />
      <div className='bg-slate-500 w-full grid place-items-center'>
        <h1 className='text-white text-2xl font-bold p-10'>Welcome Admin</h1>
        <div className='flex flex-col items-center  bg-slate-200 w-full h-screen gap-6 p-2 md:p-10'>
          <img className='size-24' src={avatar} alt='' />
          <input
            className='p-4 w-full md:w-[50%] lg:w-[40%] rounded-sm ring-red-600 text-xl outline outline-1 outline-gray-400 focus:outline-2 '
            placeholder='abc@gmail.com'
            type='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className='p-4 w-full md:w-[50%] lg:w-[40%] rounded-sm ring-red-600 text-xl outline outline-1 outline-gray-400 focus:outline-2 '
            placeholder='Password'
            type='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            className='p-4 w-full md:w-[50%] lg:w-[40%] bg-slate-500 rounded-sm text-white text-xl font-bold hover:bg-slate-400 hover:text-black'
            onClick={loginHandler}
          >
            Login
          </button>
        </div>
      </div>
    </>
  );
}

export default Login;
