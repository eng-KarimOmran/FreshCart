import { useContext, useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";
import { cartContext } from "../Context/CartFu";
export default function CardCart({ data }) {
  const [loading, setLoading] = useState(false);
  const [loadingUpdate, setLoadingUpdate] = useState(false);
  const { UpdateProduct, DeleteProduct, refetch } = useContext(cartContext);
  const [count, setCount] = useState("..");
  useEffect(() => {
    setCount(data.count);
    setLoadingUpdate(false);
  }, [data.count]);
  async function HandleDeleteProduct(id) {
    try {
      setLoading(true);
      const response = await DeleteProduct(id);
      if (response.data.status === "success") {
        refetch();
      }
    } finally {
      setLoading(false);
    }
  }
  async function HandleUpdateProduct(id, count) {
    try {
      setLoadingUpdate(true);
      const response = await UpdateProduct(id, count);
      if (response.data.status === "success") {
        refetch();
      }
    } catch (e) {
      console.log(e);
    }
  }
  return (
    <>
      <div className="px-2 my-6">
        <div className="border-b-2 flex flex-wrap py-5 w-full">
          <img
            className="w-[200px] h-[250px] mx-auto object-cover"
            src={data.product.imageCover}
            alt=""
          />
          <div className="p-4 flex-grow flex flex-wrap gap-2 justify-between items-center">
            <div className="w-full lg:w-auto">
              <div className="text-xl capitalize font-bold max-w-[260px]">
                {data.product.title}
              </div>
              <div>{data.price} EGP</div>
              <button
                disabled={loading}
                onClick={() => {
                  HandleDeleteProduct(data.product.id);
                }}
                className="flex items-center text-red-600"
              >
                <MdDelete />
                <div className="ms-1">{loading ? "loading..." : "Remove"}</div>
              </button>
            </div>
            <div className="flex gap-2 items-center">
              <button
                disabled={loadingUpdate}
                onClick={() => {
                  HandleUpdateProduct(data.product.id, data.count + 1);
                }}
                className={`border-2 py-1 px-3 rounded-md mx-1 ${
                  loadingUpdate
                    ? "border-gray-400 text-gray-400/80 cursor-not-allowed"
                    : "border-green-700"
                }`}
              >
                +
              </button>
              <span>{loadingUpdate ? ".." : count}</span>
              <button
                disabled={loadingUpdate}
                onClick={() => {
                  HandleUpdateProduct(data.product.id, data.count - 1);
                }}
                className={`border-2 py-1 px-3 rounded-md mx-1 ${
                  loadingUpdate
                    ? "border-gray-400 text-gray-400/80 cursor-not-allowed"
                    : "border-green-700"
                }`}
              >
                -
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
