import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function ViewEmployees() {
  const [employees, setEmployees] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:3022/employees")
      .then((response) => {
        setEmployees(response.data);
      })
      .catch((error) => {
        console.error("Error fetching employees", error);
      });
  }, []);

  const handleEdit = (employee) => {
    // Pass employee data through state
    navigate('/edit', { state: { employee } });
  };

  return (
    <div>
      <h2>Employee List</h2>
      <table border="1">
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Employee ID</th>
            <th>Email</th>
            <th>Phone Number</th>
            <th>Department</th>
            <th>Date of Joining</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => (
            <tr key={employee.emp_id}>
              <td>{employee.firstname}</td>
              <td>{employee.secondname}</td>
              <td>{employee.emp_id}</td>
              <td>{employee.email}</td>
              <td>{employee.phone_number}</td>
              <td>{employee.department}</td>
              <td>{employee.date_of_join}</td>
              <td>{employee.emp_role}</td>
              <td>
                <button onClick={() => handleEdit(employee)}>Edit</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ViewEmployees;
