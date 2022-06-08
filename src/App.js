import React, { useEffect, useState } from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import Cards from './components/Cards';
import NavBar from './components/NavBar';
import NotFound from './components/NotFound';
import RegisterForm from './components/RegisterForm';
import LoginForm from './components/LoginForm';
import PostForm from './components/PostForm';
import Dashboard from './components/Dashboard';
import ProtectedRoutes from './components/common/ProtectedRoutes';
import Logout from './components/Logout';
import Profile from './components/Profile';

function App() {
  const [user, setUser] = useState('');

  useEffect(() => {
    try {
      const jwt = localStorage.getItem('token');
      const user = jwtDecode(jwt);
      setUser(user);
    } catch (ex) {
      console.log(ex);
    }
  }, []);

  return (
    <React.Fragment> 
      <NavBar user={user} />
      <main className='container'>
        <Routes>
          <Route path="/" element={<Cards isUser={user} />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/profile" element={<Profile />} />
          <Route element={<ProtectedRoutes user={user} />}>
            <Route path="/make-media" element={<PostForm />} />
          </Route>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/not-found" element={<NotFound />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </React.Fragment>
  );
}

export default App;
