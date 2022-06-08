import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import jwtDecode from 'jwt-decode';

function Dashboard(props) {
 const navigate = useNavigate();

 useEffect(() => {
   const token = localStorage.getItem('token')
   if (token) {
     const user = jwtDecode(token)
     if (!user) {
       localStorage.removeItem('token')
       navigate('/login');
      }
      window.location = '/';
   }
 }, []);

  return (
    <div>
      <h1>Loading...</h1>
    </div>
  );
}

export default Dashboard;