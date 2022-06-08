import { createContext } from "react";
import { useState, useEffect } from "react";

const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  const [username, setUsername] = useState('');
  const [userImage, setUserImage] = useState('');

  useEffect(() => {
    const storedData = window.localStorage.getItem('USERNAME');
    if (storedData !== null) setUsername(JSON.parse(storedData));

  }, []);
  
  useEffect(() => {
    window.localStorage.setItem('USERNAME', JSON.stringify(username));
  }, [username]);

  return (
    <UserContext.Provider value={{username, setUsername, userImage, setUserImage}}>
      {children}
    </UserContext.Provider>
  )
}

export default UserContext;