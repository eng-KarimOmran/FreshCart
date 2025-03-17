import { useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./../Navbar/Navbar";
export default function Layout() {
  const [count, setCount] = useState(0);
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}
