import { useContext, useEffect } from "react";
import { UserStatus } from "../Context/UserStatus";
import { useNavigate } from "react-router-dom";

export default function HandleRouterNotLogin({ children }) {
  const { isLogin } = useContext(UserStatus);
  const navigate = useNavigate();
  useEffect(() => {
    if (!isLogin) {
      navigate("/login");
    }
  }, [isLogin, navigate]);
  return isLogin ? children : null;
}
