import { useContext, useEffect, useState } from "react";
import { cartContext } from "../Context/CartFu";
import CardCart from "./../CardCart/CardCart";
import emptyCart from "../../assets/cart.png";
import { NavLink } from "react-router-dom";
export default function Cart() {
  const [loading, setLoading] = useState(false);
  const { data, refetch, isLoading, DeleteAll } = useContext(cartContext);
  async function HandleDeleteAll() {
    try {
      setLoading(true);
      const response = await DeleteAll();
      refetch();
    } finally {
      setLoading(false);
    }
  }
  return (
    <>
      <div className="container my-10">
        <div className="bg-[#F8F9FA] p-3 rounded-md">
          <div className="flex justify-between flex-wrap items-center w-full">
            <div className="text-4xl py-3 my-3 font-bold">Cart Shop</div>
            <NavLink
              to={"/checkOut"}
              className={
                data?.data.numOfCartItems == 0
                  ? "hidden"
                  : "py-3 my-3 px-6 bg-[#0B5ED7] rounded-xl text-xl text-white"
              }
            >
              Check out
            </NavLink>
          </div>
          <div className="flex justify-between items-center pt-5 flex-wrap">
            <div className="flex items-center gap-2">
              <span className="text-lg font-bold capitalize">Total Price:</span>
              <span className="text-green-500 text-lg py-3">
                {isLoading ? "0" : data.data.data.totalCartPrice}
              </span>
            </div>
            <div className="text-lg font-bold capitalize">
              total number of items:{" "}
              <span className="text-green-500 text-lg font-normal">
                {isLoading ? "0" : data.data.numOfCartItems}
              </span>
            </div>
          </div>
          <div className="flex flex-col py-5">
            {isLoading
              ? "loading..."
              : data.data.data.products.map((item) => (
                  <CardCart key={item.product.id} data={item} />
                ))}
          </div>
          <div
            className={
              data?.data.numOfCartItems == 0 ? "hidden" : "text-center p-2"
            }
          >
            <button
              disabled={loading}
              onClick={HandleDeleteAll}
              className={`inline-block px-10 py-2 rounded-lg text-2xl border-2 ${
                loading
                  ? "border-gray-400 text-gray-400/80 cursor-not-allowed"
                  : "border-green-500"
              }`}
            >
              {loading ? "loading..." : "Clear Your Cart"}
            </button>
          </div>
          <div
            className={
              data?.data.numOfCartItems == 0
                ? "flex flex-col py-4 items-center"
                : "hidden"
            }
          >
            <img className="w-[50%] mb-3" src={emptyCart} alt="emptyCart" />
          </div>
        </div>
      </div>
    </>
  );
}
