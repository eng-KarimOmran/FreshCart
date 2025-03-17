import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
export default function GoToHome() {
  const navigator = useNavigate();
  useEffect(() => {
    navigator("/home");
  }, []);
  return null;
}
