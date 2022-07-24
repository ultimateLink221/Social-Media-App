import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function NavBar({ user }: {user: string}) {
  const navigate = useNavigate();

  const [classes, setClasses] = useState('nav');
  const [isActive, setIsActive] = useState(true);

  const handlePost = () => {
    navigate('/make-media');
  }

  const handleNav = () => {
    setIsActive(!isActive);
    if (isActive) setClasses('nav-active');
    else setClasses('nav');
  }

  const handleCloseNav = () => {
    setIsActive(!isActive);
    if (isActive) setClasses('nav-active');
    else setClasses('nav');
  }

  return (
    <div>
      <div className='nav-container'>
        
        <ul className='navbar'>
          <div onClick={handleCloseNav} id={classes}>
            <NavLink style={{textDecoration: 'none'}} className='nav-item' to="/">
              Home
            </NavLink>
            {!user && (<React.Fragment>
            <NavLink style={{textDecoration: 'none'}} className='nav-item' to="/Register">
              Register
            </NavLink>
            <NavLink style={{textDecoration: 'none'}} className='nav-item' to="/Login">
              Login
            </NavLink>
            </React.Fragment>)}
            {user && (<React.Fragment>
            <NavLink style={{textDecoration: 'none'}} className='nav-item' to="/Profile">
              Profile
            </NavLink>
            <NavLink style={{textDecoration: 'none'}} className='nav-item' to="/Logout">
              Logout
            </NavLink>
            </React.Fragment>)}
          </div>
          <div>
            <label htmlFor="check" className='checkbtn' onClick={handleNav}>
              <i className="fa-solid fa-bars"></i>
            </label>
          </div>
          <button onClick={handlePost} className='btn-post'>POST</button>
        </ul>
      </div>
      <div>
      </div>
    </div>
  );
}

export default NavBar;