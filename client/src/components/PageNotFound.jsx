import React from 'react';
import { Link } from 'react-router-dom';

function PageNotFound() {
  return (
    <div className=' h-screen bg-slate-600 grid place-content-center'>
      <h1 className='text-4xl text-white'>
        Page not found
        <Link to={'/'}>
          <span className='text-base   underline hover:text-red-600'> Home</span>
        </Link>
      </h1>
    </div>
  );
}

export default PageNotFound;
