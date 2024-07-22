import React from 'react';

function Absent({ absentUser }) {
  return (
    <>
      <table className='table-auto w-full'>
        <thead className='bg-slate-300'>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Post</th>
          </tr>
        </thead>
        <tbody className='text-left'>
          {absentUser &&
            absentUser.map((absent, i) => (
              <tr className='' key={i}>
                <td>{absent.userID}</td>
                <td>{absent.name}</td>
                <td>{absent.department}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </>
  );
}

export default Absent;
