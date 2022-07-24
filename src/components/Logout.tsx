import React, { useEffect } from 'react';

function Logout() {

  useEffect(() => {
    localStorage.removeItem('token');
    localStorage.removeItem('USERNAME');
    window.location.href = '/';
  }, []);

  return (
    <div>
      
    </div>
  );
}

export default Logout;