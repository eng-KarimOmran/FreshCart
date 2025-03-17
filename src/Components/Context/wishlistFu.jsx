import axios from "axios";
import { createContext, useContext } from "react";
import { UserStatus } from "./UserStatus";
export const wishlistContext = createContext();
export default function WishlistContexeProvider({ children }) {
  const { token } = useContext(UserStatus);
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
    return request;
  }
  async function getWishlist() {
    const request = await axios.get(
      "https://ecommerce.routemisr.com/api/v1/wishlist",
      config
    );
    return request;
  }
  async function deleteWishlist(id) {
    const request = await axios.delete(
      `https://ecommerce.routemisr.com/api/v1/wishlist/${id}`,
      config
    );
    return request;
  }
  return (
    <wishlistContext.Provider
      value={{ Addwishlist, getWishlist, deleteWishlist }}
    >
      {children}
    </wishlistContext.Provider>
  );
}
