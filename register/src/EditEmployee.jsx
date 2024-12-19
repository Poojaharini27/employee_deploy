import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useForm } from 'react-hook-form';

function EditEmployee() {
  const { state } = useLocation(); // Access the state passed from ViewEmployees
  const { employee } = state || {}; // Destructure employee data
  const { register, handleSubmit, setValue } = useForm();
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (!employee) {
      setMessage('No employee data found.'); // If no state is passed
      return;
    }

    // Populate form fields with employee data
    setValue('firstname', employee.firstname);
    setValue('secondname', employee.secondname);
    setValue('department', employee.department);
    setValue('date_of_join', employee.date_of_join);
    setValue('emp_role', employee.emp_role);
  }, [employee, setValue]);

  const onSubmit = (data) => {
    const filteredData = Object.fromEntries(
      Object.entries(data).filter(([_, value]) => value !== '')
    );

    axios.put(`https://employee-deploy.onrender.com/employees/${employee.emp_id}`, filteredData)
      .then(() => {
        setMessage('Employee updated successfully!');
        navigate('/view'); // Navigate back to the employee list
      })
      .catch((error) => {
        console.error("Error updating employee", error);
        setMessage('Error updating employee details.');
      });
  };

  if (!employee) return <div>{message}</div>; // If no employee data is available

  return (
    <div>
      <h2>Edit Employee</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>First Name:</label>
          <input 
            type="text" 
            {...register('firstname', { required: 'First name is required' })} 
          />
        </div>

        <div>
          <label>Second Name:</label>
          <input 
            type="text" 
            {...register('secondname', { required: 'Second name is required' })} 
          />
        </div>

        <div>
          <label>Department:</label>
          <select {...register('department', { required: 'Department is required' })}>
            <option value="">Select Department</option>
            <option value="HR">HR</option>
            <option value="Engineering">Engineering</option>
            <option value="Marketing">Marketing</option>
          </select>
        </div>

        <div>
          <label>Date of Join:</label>
          <input 
            type="date" 
            {...register('date_of_join', { required: 'Joining date is required' })} 
          />
        </div>

        <div>
          <label>Employee Role:</label>
          <input 
            type="text" 
            {...register('emp_role', { required: 'Employee role is required' })} 
          />
        </div>

        <div>
          <button type="submit">Save Changes</button>
        </div>
      </form>

      <p>{message}</p>
    </div>
  );
}

export default EditEmployee;
