import React from 'react';
import adminAvatar from '../../assets/react.svg';

function Header() {
  const currentDateTime = new Date();

  return (
    <div className='p-6 bg-slate-500  flex justify-between sticky top-0 text-white'>
      <h1 className='font-bold'>Welcome Admin</h1>
      <h1 className='font-bold'>{`${new Date(Date.now()).toLocaleString()}`}</h1>
      <img src={adminAvatar} alt='' />
    </div>
  );
}

export default Header;
