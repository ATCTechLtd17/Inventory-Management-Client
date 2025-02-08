import {useState, createContext } from "react";
 
export const LoginContext = createContext(null);


 export const LoginContextProvider = ({ children }) => {
  
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });
 

  const authInfo = {  user, setUser }

  return (
    <LoginContext.Provider value={authInfo}>
      {children}
    </LoginContext.Provider>
  );
}