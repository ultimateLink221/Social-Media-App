import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

function RegisterForm() {
  const navigate = useNavigate();
  
  const [registerData, setRegisterData] = useState({
    username: '',
    password: '',
    profileImage: ''
  });

  async function registerUser() {
    const response = await fetch('https://social-media-app-001.herokuapp.com/api/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(
        registerData
      ) 
    });

    // const data = await response.json();

    if(registerData) {
      setTimeout(() => {
        navigate('/login');
      }, 100);
    }
    else {
      alert('Something went wrong.');
    }
  }

  const onSubmit = (data: { username: string, password: string }) => {
    console.log(data);

    setRegisterData({
      username: data.username,
      password: data.password,
      profileImage: 'https://www.business2community.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640.png'
    });

    registerUser();
  }

  interface FormValues {
    username: string;
    password: string;
  }
  
  const {register, handleSubmit, formState: { errors }} = useForm<FormValues>();
  
  return (
    <div className='card-holder'>
      <form className='form card card--form' onSubmit={handleSubmit(onSubmit)}>
        <div>
          <h1 className='input-heading'>Register</h1>
          <div className='input-padding'>
            <label className='input-label' htmlFor='username'><h2>Username</h2></label>
            <input 
              className='input'
              autoComplete="off"
              {...register('username', {required: true})}
            />
            {errors.username && <p className='error' >Username is required.</p>}
          </div>
          <div className='input-padding'>
            <label className='input-label' htmlFor='password'><h2>Password</h2></label>
            <input 
              className='input'
              type="password"
              autoComplete="off"
              {...register('password', {required: true})}
            />
            {errors.password && <p className='error' >Password is required.</p>}
          </div>
          <div className='btn-container'>
            <button className='btn-submit' type='submit'>SUBMIT</button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default RegisterForm;