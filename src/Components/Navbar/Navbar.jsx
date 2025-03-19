import { useContext , useEffect, useState } from 'react'
import { Link, NavLink} from 'react-router-dom'
import logo from '../../assets/freshcart-logo.svg'
import { FaShoppingCart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { PiListBold } from "react-icons/pi";
import { UserStatus } from '../Context/UserStatus';
import { cartContext } from '../Context/CartFu';
import { wishlistContext } from '../Context/wishlistFu';
export default function Navbar() {
    const {data , isLoading} = useContext(cartContext)
    const {isLogin , setToken} = useContext(UserStatus)
    const { numWishList } = useContext(wishlistContext);
    const [ToggleNav, setToggleNav] = useState(false)
    return (
    <>
      <nav className='py-5 sticky top-0 w-full bg-[#F8F9FA] text-black/60 z-10'>
        <div className='container flex items-center flex-wrap'>
          <a href='/'>
            <img src={logo} alt="freshcart-logo" className='block max-w-[250px]' />
          </a>
          <button onClick={()=>{setToggleNav(!ToggleNav)}} className='block text-2xl lg:hidden ms-auto'><PiListBold /></button>
          {
            isLogin === false ? 
            (<ul className={`ms-auto w-full flex flex-col gap-2 transition-[height] duration-300 overflow-hidden ${ToggleNav === false ? 'h-0' : 'h-[72px]'} lg:w-auto lg:flex-row lg:h-auto`}>
              <li className='mt-4 lg:mt-0'><NavLink onClick={()=>{setToggleNav(!ToggleNav)}} to={'/register'}>Register</NavLink></li>
              <li><NavLink onClick={()=>{setToggleNav(!ToggleNav)}} to={'/login'}>Login</NavLink></li>
            </ul>) 
           : 
            (<div className={`w-full flex flex-grow flex-col ${ToggleNav === false ? 'h-0' : 'h-[260px]'} transition-[height] duration-300 overflow-hidden lg:w-auto lg:py-2 lg:flex-row lg:h-auto`}>
              <ul className='flex gap-2 flex-col lg:gap-3 lg:flex-row lg:ms-auto'>
                <li className='mt-4 lg:mt-0'><NavLink onClick={()=>{setToggleNav(!ToggleNav)}} to={'/home'}>Home</NavLink></li>
                <li><NavLink onClick={()=>{setToggleNav(!ToggleNav)}} to={'/cart'}>Cart</NavLink></li>
                <li><NavLink onClick={()=>{setToggleNav(!ToggleNav)}} to={'/wishList'}>Wish list</NavLink></li>
                <li><NavLink onClick={()=>{setToggleNav(!ToggleNav)}} to={'/products'}>Products</NavLink></li>
                <li><NavLink onClick={()=>{setToggleNav(!ToggleNav)}} to={'/catrgories'}>Catrgories</NavLink></li>
                <li><NavLink onClick={()=>{setToggleNav(!ToggleNav)}} to={'/brands'}>Brands</NavLink></li>
              </ul>
              <ul className='flex gap-3 w-full flex-col items-center lg:gap-4 lg:w-auto lg:flex-row lg:items-start lg:ms-auto'>
                <li className='flex gap-3'>
                  <Link onClick={()=>{setToggleNav(!ToggleNav)}} to={'/cart'}>
                    <div className='relative max-h-6 max-w-7'>
                      <div className='max-h-[20px] max-w-[25px] bg-green-500 p-1 rounded-[5px] absolute top-0 right-0 flex justify-center items-center translate-x-1/2 -translate-y-1/4 text-white text-sm'>{isLoading ? '..' : data.data.numOfCartItems}</div>
                      <FaShoppingCart className='text-2xl' />
                    </div>
                  </Link>
                  <Link onClick={()=>{setToggleNav(!ToggleNav)}} to={'/wishList'}>
                      <div className='relative max-h-6 max-w-7'>
                        <div className='max-h-[20px] max-w-[25px] bg-green-500 p-1 rounded-[5px] absolute top-0 right-0 flex justify-center items-center translate-x-1/2 -translate-y-1/4 text-white text-sm'>{numWishList == null ? '..' : numWishList}</div>
                        <FaHeart className='text-2xl text-red-500' />
                      </div>
                    </Link>
                </li>
                <li>
                  <button onClick={()=>{
                    localStorage.removeItem('Token')
                    setToken(null)
                    setToggleNav(!ToggleNav)
                    }}>log out</button>
                </li>
              </ul>
            </div>)
          }
        </div>
      </nav>
    </>
  )
}
