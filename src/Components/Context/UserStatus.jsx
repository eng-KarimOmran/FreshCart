import { createContext, useEffect, useState } from "react";
export const UserStatus = createContext();
export default function UserStatusProvider({ children }) {
  const [isLogin, setIsLogin] = useState(false);
  const [token, setToken] = useState(localStorage.getItem("Token"));
  useEffect(() => {
    token === null ? setIsLogin(false) : setIsLogin(true);
  }, [token]);
  return (
    <UserStatus.Provider value={{ isLogin, setToken, token }}>
      {children}
    </UserStatus.Provider>
  );
}
