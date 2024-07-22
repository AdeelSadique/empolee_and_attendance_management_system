import axios from 'axios';
import React, { useEffect, useState } from 'react';

function Employees() {
  const [employees, setEmployees] = useState([]);
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/api/employees`, { withCredentials: true })
      .then((res) => {
        const { data } = res;
        setEmployees(data.employees);
        console.log(data.employees);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      <table className='table-auto   w-full overflow-auto'>
        <thead className='bg-slate-300'>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Gender</th>
            <th>Job</th>
            <th>Dep.</th>
            <th>Salary</th>
            <th>J-Date</th>
            <th>Avatar</th>
          </tr>
        </thead>
        <tbody className='text-center '>
          {employees &&
            employees.map((employee, i) => (
              <tr className='lg:hover:bg-slate-500 lg:hover:text-white text-left' key={i} onClick={() => alert(employee._id)}>
                <td>{employee.userID}</td>
                <td>{employee.name}</td>
                <td>{employee.email}</td>
                <td>{employee.gender}</td>
                <td>{employee.job}</td>
                <td>{employee.department}</td>
                <td>{employee.salary}</td>
                <td>{Date(employee.joiningDate).toString().slice(3, 16)}</td>
                <td className='flex  justify-center '>
                  <img className='size-16 rounded-md ' src={employee.avatar?.url} alt='avatar' />
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </>
  );
}

export default Employees;
