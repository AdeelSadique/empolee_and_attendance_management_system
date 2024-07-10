import React, { useCallback, useEffect, useRef, useState } from 'react';
import Webcam from 'react-webcam';
import fingerPrint from '../assets/fingerPrint.jpg';
function Home() {
  const camRef = useRef(null);
  const [image, setImage] = useState(null);
  const [retake, setRetake] = useState(false);

  const capturedImage = useCallback(() => {
    const img = camRef.current.getScreenshot();
    setImage(img);
    setRetake(true);
  }, [camRef]);

  const retakePhoto = () => {
    setImage(null);
  };

  useEffect(() => {}, [image, retake]);

  return (
    <>
      {/* header */}
      <div className='header bg-slate-400 p-6 font-bold text-2xl text-center'>Employee Attendance Management System</div>
      {/* main */}
      <div className='container flex ' style={{ minHeight: 'calc(100vh - 144px)' }}>
        <div className='finger w-screen bg-slate-100 grid place-items-center'>
          <img src={fingerPrint} alt='' className='w-9/12 rounded-md' />
          <div className='flex gap-4'>
            <input placeholder='OR Use Your ID' className='p-4 w-80 ring-2 ring-slate-600 focus:ring-slate-600 rounded-md' />
            <button className=' bg-slate-400 w-20 p-4 hover:bg-slate-600 hover:text-white rounded-md'>Verify</button>
          </div>
        </div>
        <div className='cam w-screen bg-slate-900  grid place-items-center'>
          {/* <div className='flex'> */}
          {image ? (
            <img src={image} alt='Your Photo' />
          ) : (
            <Webcam height={400} width={420} mirrored ref={camRef} screenshotFormat='image/jpeg' className='rounded-md' />
          )}
          {/* </div> */}
          <button
            className='bg-white m-2 p-6 hover:bg-slate-600 hover:text-white font-bold rounded-md'
            style={{ width: '392px' }}
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
