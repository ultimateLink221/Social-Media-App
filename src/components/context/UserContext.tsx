import { createContext } from "react";
import { useState, useEffect } from "react";

interface IUser {
  username: string;
  setUsername: any;
  userImage: string;
  setUserImage: any;
}

const UserContext = createContext<Partial<IUser>>({});

export const UserProvider = ({ children }: any) => {
  const [username, setUsername] = useState<string>('');
  const [userImage, setUserImage] = useState<string>('');

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