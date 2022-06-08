import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import useUser from './hooks/useUser';

function LoginForm(props) {
  const navigate = useNavigate();
  
  const { setUsername } = useUser();

  async function loginUser(userData) {
    const response = await fetch('https://social-media-app-001.herokuapp.com/api/auth', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData) 
    });

    const data = await response.json()

    if (data.user) {
      localStorage.setItem('token', data.user);
      navigate('/dashboard');
    }
    else 
      alert('Please Check Your Username or Password.');
  }

  const onSubmit = (data) => {
    setUsername(data.username);
    loginUser(data);
  }
  
  const {register, handleSubmit, formState: { errors }} = useForm();
  
  return (
    <div className='card-holder'>
      <form className='form card card--form' onSubmit={handleSubmit(onSubmit)}>
        <div>
          <h1 className='input-heading'>Login</h1>
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
            {/* {notRegistered && <p className='error' >- User does not exist</p>} */}
          </div>
          <div className='btn-container'>
            <button id='login' className='btn-submit' type='submit'>SUBMIT</button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default LoginForm;