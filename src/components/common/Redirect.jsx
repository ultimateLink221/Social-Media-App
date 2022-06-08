import React, { useEffect } from 'react';
import { useNavigate } from "react-router-dom";


function Redirect(props) {
  const navigate = useNavigate();

  useEffect(() => {
    navigate('/Login');
  }, []);
  
}

export default Redirect;