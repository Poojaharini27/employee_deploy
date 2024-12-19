import React from 'react'
import {useForm} from 'react-hook-form'
import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import './App.css'
function Register() {
    const {register, handleSubmit,reset, formState: {errors}} = useForm();
    const [message,setMessage]=useState('');
    const navigate = useNavigate(); 
    const onSubmit=(data)=>{
        axios.post("https://employee-deploy.onrender.com/register",data)
        .then((response)=>{
            const responsemessage=response.data?.message||response.data;
            setMessage(responsemessage);
            console.log("success",response.data)
        })
        .catch((error)=>{
            if(error.response){
                const responsemessage=error.response.data?.message||error.response.data;
                setMessage(responsemessage);
            }
            else{
                console.log("Error",error);
                setMessage("error occurred");
            }
        })
    }
    const handleReset = () => {
        reset();
        setMessage('');
    }
    const handleView = () => {
        navigate('/view');  // Redirects to the ViewEmployees page
      };
  return (
    <div className='register'>
        <h2>Register</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
            <div>
            <label htmlFor="firstname">FirstName</label>
            <input type="text" placeholder='firstname' {...register('firstname',{required:"firstname required"})}/>
            {errors.firstname && <span>{errors.firstname.message}</span>}
            </div>
            <div>
            <label htmlFor="LastName">LastName</label>
            <input type="text" placeholder="lastname"{...register('lastname',{required:"Lastname is required"})} />
            {errors.lastname && <span>{errors.lastname.message}</span>}
            </div>
            <div>
          <label>Employee ID:</label>
          <input
            type="text"
            placeholder="Employee ID"
            {...register('employeeid', {
              required: 'Employee ID can\'t be empty',
              pattern: {
                value: /^[a-zA-Z0-9]{1,10}$/,
                message: 'Employee ID should be alphanumeric and up to 10 characters'
              }
            })}
          />
          {errors.employeeid && <span>{errors.employeeid.message}</span>}
        </div>
            <div>
                <label htmlFor="email">Email</label>
                <input type="text"placeholder='email' {...register('email',{required:"required email",pattern:{
                    value:/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[a-zA-Z]+$/,
                    message:"invalid email"
                }})} /> 
                {errors.email && <span>{errors.email.message}</span>}
            </div>
            <div>
                <label htmlFor="phonenumber">Phone number</label>
                <input type="text" placeholder='phone number'{...register('phonenumber',{required:"required phone number",pattern:{
                    value:/^[0-9]{10}$/,///^[0-9]{10}$/
                    message:"invalid phone number"
                }})} />
                {errors.phonenumber && <span>{errors.phonenumber.message}</span>}
            </div>
            <div>
                <label htmlFor=""></label>
            </div>
            <div>
                <label htmlFor="department">Department</label>
                <select {...register('department',{required:"department is required"})}>
                <option value="">Select Department</option>
            <option value="HR">HR</option>
            <option value="Engineering">Engineering</option>
            <option value="Marketing">Marketing</option>
                </select>
                {errors.department && <span>{errors.department.message}</span>}
            </div>
            <div>
                <label htmlFor="date">Date of Joining</label>
                <input type="date" {...register('dateofjoin',{required:"required",validate:{
                    notFutureDate:value=>new Date(value)<=new Date()||"No future date"
                }})}/>
                {errors.dateofjoining && <span>{errors.dateofjoining.message}</span>}
            </div>
            <div>
          <label>Role</label>
          <input
            type="text"
            placeholder="Role"
            {...register('role', { required: 'Role is required' })}
          />
          {errors.role && <span>{errors.role.message}</span>}
        </div>
        <button type="submit">Submit</button> <br />
        </form>
        <button type="reset" onClick={handleReset}>Reset</button>
        <button onClick={handleView}>View Employees</button>
        <p>{message}</p>
    </div>
  )
}

export default Register
