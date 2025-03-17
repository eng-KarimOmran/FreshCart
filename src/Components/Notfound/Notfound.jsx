import { useState } from "react";
import notFond from '../../assets/notFond.jpg'
import { Link } from "react-router-dom";
export default function Notfound() {
  const [count, setCount] = useState(0);
  return (
    <>
      <div className="flex flex-col justify-center items-center h-[80vh] py-16 items-centerrounded-lg">
        <img className="rounded-lg h-[50vh]" src={notFond} alt="not fond" />
        <Link className='text-center py-5 text-green-600' to={'/home'}>Go To Home</Link>
      </div>
    </>
  );
}
