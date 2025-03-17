import { useContext, useEffect } from "react";
import { UserStatus } from "../Context/UserStatus";
import { useNavigate } from "react-router-dom";

export default function HandelRouterLogin({ children }) {
  const { isLogin } = useContext(UserStatus);
  const navigate = useNavigate();
  useEffect(() => {
    if (isLogin) {
      navigate("/home");
    }
  }, [navigate, isLogin]);
  return isLogin ? null : children;
}
