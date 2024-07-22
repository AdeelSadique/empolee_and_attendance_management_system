import React, { useEffect, useState } from 'react';
import AsideMenu from '../AsideMenu';
import Header from '../Header';
import MainContent from '../MainContent';
import Dashboard from '../Dashboard';
import axios from 'axios';

function Attendee({ attendee }) {
  return (
    <>
      <table className='table-auto w-full'>
        <thead className='bg-slate-300'>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Post</th>
            <th>image</th>
          </tr>
        </thead>
        <tbody className='text-left '>
          {attendee.map((attendee, i) => (
            <tr className='' key={i}>
              <td>{attendee.user.userID}</td>
              <td>{attendee.user.name}</td>
              <td>{attendee.user.department}</td>
              <td className='flex  justify-center '>
                <img className='size-16  lg:hover:scale-[2] rounded-md ' src={attendee.image} alt='' />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default Attendee;
