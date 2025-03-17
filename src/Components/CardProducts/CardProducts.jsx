import { FaStar } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { FaRegCheckCircle } from "react-icons/fa";
import { useContext , useEffect, useState } from "react";
import { cartContext } from "../Context/CartFu";
import { wishlistContext } from "../Context/wishlistFu";
export default function CardProducts({ data , IsWishlist }) {
  const [isWishlist , setIsWishlist] = useState(false)
  useEffect(()=>{setIsWishlist(IsWishlist)},[IsWishlist])
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [loadingwishlist, setLoadingwishlist] = useState(false);
  const [success, setSuccess] = useState(false);
  const { AddProduct, refetch } = useContext(cartContext);
  const {Addwishlist , deleteWishlist} = useContext(wishlistContext)
  async function HandleAddProduct(id) {
    try {
      setLoading(true);
      const response = await AddProduct(id);
      if (response.data.status === "success") {
        setSuccess(true);
        refetch();
      }
    } finally {
      setLoading(false);
    }
  }
  async function HandleAddWishlist(id) {
    try {
      setLoadingwishlist(true);
      const response = await Addwishlist(id);
      if (response.data.status === "success") {
        setIsWishlist(true)
      }
    }
    finally{
      setLoadingwishlist(false);
    }
  }
  async function HandleDeleteWishlist(id) {
    try {
      setLoadingwishlist(true);
      const response = await deleteWishlist(id);
      if (response.data.status === "success") {
        setIsWishlist(false)
      }
    }
    finally{
      setLoadingwishlist(false);
    }
  }
  return (
    <>
      <div
        onClick={(e) => {
          if (e.target.tagName == "BUTTON" || e.target.tagName == "path") {
            return null;
          } else {
            navigate(`/productDetails/${data.id}`);
          }
        }}
        className="w-[300px] p-2 flex gap-1 flex-col group"
      >
        <img
          className="w-[300px] h-[330px] block object-cover"
          src={data.imageCover}
          alt={data.title}
        />
        <div className="my-1 text-green-500">{data.category.name}</div>
        <div className="font-bold">{data.title.split(" ", 2).join(" ")}</div>
        <div className="flex justify-between items-center w-full">
          <div>{data.price} EGp</div>
          <div className="flex items-center">
            <FaStar className="text-orange-300 inline me-1" />
            {data.ratingsAverage}
          </div>
        </div>
        <div
          className={success ? "flex items-center text-green-700" : "hidden"}
        >
          <div>
            <FaRegCheckCircle className="me-1" />
          </div>
          <div>Added to cart</div>
        </div>
        <div className="flex items-center justify-between mt-2 overflow-hidden mix-h-[35px]">
          <button
            disabled={loading}
            onClick={() => {
              HandleAddProduct(data.id);
            }}
            className={`h-[35px] w-[250px] rounded-md bottom-0 start-0 end-0 md:translate-y-14  md:group-hover:translate-y-0 md:transition-all md:duration-300 ${
              loading
                ? "bg-slate-300 text-gray-500 cursor-not-allowed"
                : "bg-green-500 text-white cursor-pointer"
            }`}
          >
            {"+Add"}
          </button>
          <button onClick={() => {if(isWishlist){
            HandleDeleteWishlist(data.id)
          }else{
            HandleAddWishlist(data.id)
          }
          }} className="text-end py-1">
            <FaHeart className={`inline text-3xl ${loadingwishlist ? "text-gray-500" : (isWishlist ? 'text-red-500' : 'text-black') }`} />
          </button>
        </div>
      </div>
    </>
  );
}
