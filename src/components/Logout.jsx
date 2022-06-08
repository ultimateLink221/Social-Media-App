import React, { useEffect } from 'react';

function Logout(props) {

  useEffect(() => {
    localStorage.removeItem('token');
    localStorage.removeItem('USERNAME');
    window.location = '/';
  }, []);

  return (
    <div>
      
    </div>
  );
}

export default Logout;