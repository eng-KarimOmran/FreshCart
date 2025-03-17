import { useContext, useEffect, useState } from "react";
import { wishlistContext } from "../Context/wishlistFu";
import { MdDelete } from "react-icons/md";
import { cartContext } from "./../Context/CartFu";
import { FaRegCheckCircle } from "react-icons/fa";
import imgloading from "../../assets/lodingImage.png";
export default function WishList() {
  const [productsInWishList, setProductsInWishList] = useState([]);
  const { deleteWishlist, getWishlist } = useContext(wishlistContext);
  const { AddProduct, refetch, isLoading } = useContext(cartContext);
  const [loadingwishlist, setLoadingWishlist] = useState("");
  const [success, setSuccess] = useState("");
  const [loadingAdd, setLoadingAdd] = useState("");
  const [loadingGet, setLoadingGet] = useState("");
  async function HandleGetWishlist() {
    try {
      setLoadingGet(true);
      const response = await getWishlist();
      setProductsInWishList(response.data.data);
    } finally {
      setLoadingGet(false);
    }
  }
  async function HandleDeleteWishlist(id) {
    try {
      setLoadingWishlist(id);
      const response = await deleteWishlist(id);
      if (response.data.status === "success") {
        HandleGetWishlist();
      }
    } finally {
      setLoadingWishlist("");
    }
  }
  async function HandleAddCart(id) {
    try {
      setLoadingAdd(id);
      const response = await AddProduct(id);
      if (response.data.status === "success") {
        refetch();
        setSuccess(id);
      }
    } finally {
      setLoadingAdd("");
    }
  }
  useEffect(() => {
    HandleGetWishlist();
  }, []);
  return (
    <div className="container p-5 bg-slate-50">
      <h2 className="text-3xl font-semibold py-3">My Wish List</h2>
      <div className="flex flex-col gap-3">
        {loadingGet ? (
          <div>
            <div className="border-b-2 pb-3">
              <div className="flex items-center flex-wrap gap-4">
                <img
                  className="max-w-[200px] mx-auto"
                  src={imgloading}
                  alt=""
                />
                <div className="px-3 grow flex justify-between items-center">
                  <div>
                    <div className="text-xl font-semibold flex flex-col gap-3">
                      {"loading..."}
                    </div>
                    <div className="text-green-500 font-semibold text-lg">
                      {".."}
                    </div>
                    <button
                      disabled={loadingGet}
                      onClick={() => {}}
                      className="text-red-500 flex items-center"
                    >
                      <MdDelete className="inline-block me-1" />
                      <div>{"Remove"}</div>
                    </button>
                  </div>
                  <button
                    disabled={loadingGet}
                    onClick={() => {}}
                    className="border-2 border-green-500 py-4 px-6 rounded-lg"
                  >
                    {"Add To Cart"}
                  </button>
                </div>
              </div>
            </div>
            <div className="border-b-2 pb-3">
              <div className="flex items-center flex-wrap gap-4">
                <img
                  className="max-w-[200px] mx-auto"
                  src={imgloading}
                  alt=""
                />
                <div className="px-3 grow flex justify-between items-center">
                  <div>
                    <div className="text-xl font-semibold flex flex-col gap-3">
                      {"loading..."}
                    </div>
                    <div className="text-green-500 font-semibold text-lg">
                      {".."}
                    </div>
                    <button
                      disabled={loadingGet}
                      onClick={() => {}}
                      className="text-red-500 flex items-center"
                    >
                      <MdDelete className="inline-block me-1" />
                      <div>{"Remove"}</div>
                    </button>
                  </div>
                  <button
                    disabled={loadingGet}
                    onClick={() => {}}
                    className="border-2 border-green-500 py-4 px-6 rounded-lg"
                  >
                    {"Add To Cart"}
                  </button>
                </div>
              </div>
            </div>
            <div className="border-b-2 pb-3">
              <div className="flex items-center flex-wrap gap-4">
                <img
                  className="max-w-[200px] mx-auto"
                  src={imgloading}
                  alt=""
                />
                <div className="px-3 grow flex justify-between items-center">
                  <div>
                    <div className="text-xl font-semibold flex flex-col gap-3">
                      {"loading..."}
                    </div>
                    <div className="text-green-500 font-semibold text-lg">
                      {".."}
                    </div>
                    <button
                      disabled={loadingGet}
                      onClick={() => {}}
                      className="text-red-500 flex items-center"
                    >
                      <MdDelete className="inline-block me-1" />
                      <div>{"Remove"}</div>
                    </button>
                  </div>
                  <button
                    disabled={loadingGet}
                    onClick={() => {}}
                    className="border-2 border-green-500 py-4 px-6 rounded-lg"
                  >
                    {"Add To Cart"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          productsInWishList.map((product) => (
            <div key={product.id} className="border-b-2 pb-3">
              <div className="flex items-center flex-wrap gap-4">
                <img
                  className="max-w-[200px] mx-auto"
                  src={product.imageCover}
                  alt=""
                />
                <div className="px-3 grow flex justify-between items-center">
                  <div>
                    <div className="text-xl font-semibold flex flex-col gap-3">
                      {product.title.split(" ", 3).join(" ")}
                    </div>
                    <div className="text-green-500 font-semibold text-lg">
                      {product.price} EGP
                    </div>
                    {success == product.id ? (
                      <div className="flex items-center text-green-700">
                        <div>
                          <FaRegCheckCircle className="me-1" />
                        </div>
                        <div>Added to cart</div>
                      </div>
                    ) : null}
                    <button
                      disabled={loadingwishlist != ""}
                      onClick={() => {
                        HandleDeleteWishlist(product.id);
                      }}
                      className="text-red-500 flex items-center"
                    >
                      <MdDelete className="inline-block me-1" />
                      <div>
                        {loadingwishlist == product.id ? "..." : "Remove"}
                      </div>
                    </button>
                  </div>
                  <button
                    disabled={isLoading}
                    onClick={() => {
                      HandleAddCart(product.id);
                    }}
                    className="border-2 border-green-500 py-4 px-6 rounded-lg"
                  >
                    {loadingAdd == product.id ? "..." : "Add To Cart"}
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}