import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { UserStatus } from "./UserStatus";
export const wishlistContext = createContext();
export default function WishlistContexeProvider({ children }) {
  const { token , isLogin } = useContext(UserStatus);
  const [ numWishList , setNumWishList ] = useState(null)
  useEffect(()=>{getWishlist()},[isLogin])
  const config = {
    headers: {
      token: token,
    },
  };
  async function Addwishlist(id) {
    const body = {
      productId: id,
    };
    const request = await axios.post(
      "https://ecommerce.routemisr.com/api/v1/wishlist",
      body,
      config
    );
    getWishlist()
    return request;
  }
  async function getWishlist() {
    if(isLogin){
      try{
        const request = await axios.get(
          "https://ecommerce.routemisr.com/api/v1/wishlist",
          config
        );
        setNumWishList(request.data.count)
        return request;
      }
      catch (e){
        console.log(e)
      }
    }else{
      setNumWishList(null)
    }
  }
  async function deleteWishlist(id) {
    const request = await axios.delete(
      `https://ecommerce.routemisr.com/api/v1/wishlist/${id}`,
      config
    );
    getWishlist()
    return request;
  }
  return (
    <wishlistContext.Provider
      value={{ Addwishlist, getWishlist, deleteWishlist , numWishList }}
    >
      {children}
    </wishlistContext.Provider>
  );
}
