import React, { useEffect, useState } from 'react';
import axios from 'axios';

import Attendee from './aside/Attendee';
import Absent from './aside/Absent';
import Profile from './aside/Profile';
import Employees from './aside/Employees';
import Setting from './aside/Setting';
function MainContent() {
  const [totalAttendance, setTotalAttendance] = useState(0);
  const [currentAttendee, setCurrentAttendee] = useState(0);
  const [absent, setAbsent] = useState(0);
  const [attendee, setAttendee] = useState([]);
  const [absentUser, setAbsentUser] = useState([]);
  const str = 'finance 102';

  useEffect(() => {
    // call api to get all current attendies
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/api/getAttendance`, { withCredentials: true })
      .then((res) => {
        const { data } = res;
        setAbsentUser(data.absent);
        setAttendee(data.attendee);
        setTotalAttendance(data.totalAttendance);
        setCurrentAttendee(data.attendee?.length);
        setAbsent(data.absent?.length);
      })
      .catch((err) => {
        console.log(err);
      });

    const id = setInterval(() => {
      setTotalAttendance((pre) => {
        if (pre < totalAttendance) {
          return pre + 1;
        } else {
          return pre;
        }
      });
      setCurrentAttendee((pre) => {
        if (pre < currentAttendee) {
          return pre + 1;
        } else {
          return pre;
        }
      });
      setAbsent((pre) => {
        if (pre < absent) {
          return pre + 1;
        } else {
          return pre;
        }
      });
    }, 8);

    () => clearInterval(id);
  }, []);

  return (
    <div className='  h-dvh p-4 overflow-auto '>
      {/* attendee details start */}
      <div className=' flex flex-wrap justify-around items-center gap-4'>
        <div className='min-h-28 min-w-48 grid place-items-center bg-yellow-600 text-white rounded-md font-medium '>
          Total Attendee <span>{totalAttendance}</span>
        </div>
        <div className='min-h-28 min-w-48 grid place-items-center bg-green-600 text-white rounded-md font-medium'>
          Current Attendee<span>{currentAttendee}</span>
        </div>
        <div className='min-h-28 min-w-48 grid place-items-center bg-red-600 text-white rounded-md font-medium'>
          Absent Attendee<span>{absent}</span>
        </div>
      </div>
      {/* attendee details end */}

      <div className='m-6 outline outline-slate-400'></div>
      <div className='w-full p-2 lg:p-4 overflow-x-auto'>
        {/* Page switcher logic */}
        {location.pathname.includes('attendee') ? (
          <Attendee attendee={attendee} />
        ) : location.pathname.includes('absent') ? (
          <Absent absentUser={absentUser} />
        ) : location.pathname.includes('profile') ? (
          <Profile />
        ) : location.pathname.includes('employees') ? (
          <Employees />
        ) : location.pathname.includes('setting') ? (
          <Setting />
        ) : (
          <Attendee attendee={attendee} />
        )}
      </div>
    </div>
  );
}

export default MainContent;
