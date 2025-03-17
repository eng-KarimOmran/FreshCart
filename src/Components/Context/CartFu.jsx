import { createContext, useContext, useEffect } from "react";
import { UserStatus } from "./UserStatus";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
export const cartContext = createContext();
export default function CartContexeProvider({ children }) {
  const { token, isLogin } = useContext(UserStatus);
  const config = {
    headers: {
      token: token,
    },
  };
  const queryClient = useQueryClient();
  const getUserCart = () =>
    axios.get("https://ecommerce.routemisr.com/api/v1/cart", config);
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["getUserCart"],
    queryFn: getUserCart,
    enabled: isLogin,
  });
  useEffect(() => {
    isLogin ? refetch() : queryClient.removeQueries(["getUserCart"]);
  }, [isLogin]);
  async function AddProduct(id) {
    const body = {
      productId: id,
    };
    const request = await axios.post(
      "https://ecommerce.routemisr.com/api/v1/cart",
      body,
      config
    );
    return request;
  }
  async function DeleteProduct(id) {
    const request = await axios.delete(
      `https://ecommerce.routemisr.com/api/v1/cart/${id}`,
      config
    );
    return request;
  }
  async function UpdateProduct(id, count) {
    const body = {
      count: count,
    };
    const request = await axios.put(
      `https://ecommerce.routemisr.com/api/v1/cart/${id}`,
      body,
      config
    );
    return request;
  }
  async function PaymentProducts(value) {
    if (value.paymentMethod == "cash") {
      const { paymentMethod, ...DeliveryInformation } = value;
      const request = await axios.post(
        `https://ecommerce.routemisr.com/api/v1/orders/${data?.data.cartId}`,
        DeliveryInformation,
        config
      );
      return request;
    } else if (value.paymentMethod == "creditCard") {
      const { paymentMethod, ...DeliveryInformation } = value;
      const request = await axios.post(
        `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${data?.data.cartId}?url=http://localhost:5173`,
        DeliveryInformation,
        config
      );
      return request;
    }
  }
  async function DeleteAll() {
    const request = await axios.delete(
      "https://ecommerce.routemisr.com/api/v1/cart",
      config
    );
    return request;
  }
  async function getOrdersUser() {
    const [header, payload, signature] = token.split(".");
    const idUser = JSON.parse(atob(payload))?.id;
    const request = await axios.get(
      `https://ecommerce.routemisr.com/api/v1/orders/user/${idUser}`
    );
    return request;
  }
  return (
    <cartContext.Provider
      value={{
        data,
        isLoading,
        AddProduct,
        DeleteProduct,
        UpdateProduct,
        refetch,
        DeleteAll,
        PaymentProducts,
        getOrdersUser,
      }}
    >
      {children}
    </cartContext.Provider>
  );
}
