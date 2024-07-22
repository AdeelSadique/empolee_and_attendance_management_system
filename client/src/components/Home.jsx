import React, { useCallback, useEffect, useRef, useState } from 'react';
import Webcam from 'react-webcam';
import fingerPrint from '../assets/fingerPrint.jpg';
import axios from 'axios';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/ReactToastify.css';

import { Toast } from './Toast';

function Home() {
  const camRef = useRef(null);
  const [image, setImage] = useState(null);
  const [retake, setRetake] = useState(false);
  const [userID, setUserID] = useState('');
  const [authLoader, setAuthLoader] = useState(false);

  const capturedImage = useCallback(() => {
    const img = camRef.current.getScreenshot();
    setImage(img);
    setRetake(true);
  }, [camRef]);

  const retakePhoto = () => {
    setImage(null);
    setAuthLoader(false);
  };
  const authHandler = () => {
    if (!userID || !image) {
      Toast('ID and Image required', 'error');
    } else {
      // logic to check

      // call axios api to authenticate the credentials
      setAuthLoader(true);
      // logic to convert webcam image to blob
      const byteString = atob(image.split(',')[1]);
      const mimeString = image.split(',')[0].split(':')[1].split(';')[0];
      const ab = new ArrayBuffer(byteString.length);
      const ia = new Uint8Array(ab);
      for (let i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
      }
      const blob = new Blob([ab], { type: mimeString });

      const form = new FormData();
      form.append('userID', userID);
      form.append('image', blob, 'webcam.jpeg');
      axios
        .post(`${import.meta.env.VITE_BACKEND_URL}/api/attendance`, form)
        .then((res) => {
          setAuthLoader(false);
          setUserID('');
          setImage(null);
          Toast(res?.data?.message, 'success');
        })
        .catch((err) => {
          setAuthLoader(false);
          Toast(err?.response?.data?.message || 'Internal Server Error', 'error');
          console.log(err);
        });
    }
  };

  useEffect(() => {}, [image, retake, authHandler]);

  return (
    <>
      {/* container for toast */}
      <ToastContainer />
      {/* header */}
      <div className='header bg-slate-400 p-6 font-bold text-2xl text-center'>Employee and Attendance Management System</div>
      {/* main */}
      <div className='container w-full flex flex-col md:flex-row ' style={{ minHeight: 'calc(100vh - 144px)' }}>
        <div className='finger w-full bg-slate-100 grid place-items-center'>
          <img src={fingerPrint} alt='' className=' w-3/4 rounded-md' />
          <div className='flex justify-center w-full flex-col m-4 sm:flex-row gap-4'>
            <input
              placeholder='OR Use Your ID'
              className='p-4 w-full sm:w-80  ring-2 ring-slate-600 focus:ring-slate-600 rounded-md '
              onChange={(e) => setUserID(e.target.value)}
              value={userID}
            />
            <button className=' bg-slate-400 w-full sm:w-20 p-4 hover:bg-slate-600 hover:text-white rounded-md ' onClick={authHandler}>
              {authLoader ? 'Verifying' : 'Verify'}
            </button>
          </div>
        </div>
        <div className='cam w-full bg-slate-100   grid place-items-center'>
          {image ? (
            <img src={image} alt='Your Photo' className=' rounded-md' />
          ) : (
            <Webcam width={440} mirrored ref={camRef} screenshotFormat='image/jpeg' className='rounded-md' />
          )}
          <button
            className='bg-slate-400 m-2 p-6 hover:bg-slate-600 hover:text-white font-bold rounded-md w-full sm:w-96'
            // style={{ width: '392px' }}
            onClick={image ? retakePhoto : capturedImage}
          >
            {image ? 'Retake Photo' : 'Take Photo'}
          </button>
        </div>
      </div>
      {/* footer */}
      <div className='footer bg-slate-400 p-6 font-bold text-xl text-center'>Managing XYZ Company. IT Department</div>
    </>
  );
}

export default Home;
