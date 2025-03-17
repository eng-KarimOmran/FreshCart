import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useContext, useEffect, useRef, useState } from "react";
import { FaStar } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { useParams } from "react-router-dom";
import { FaRegCheckCircle } from "react-icons/fa";
import Slider from "react-slick";
import LoadingProductDetails from "../LoadingProductDetails/LoadingProductDetails";
import { cartContext } from "../Context/CartFu";
import { wishlistContext } from './../Context/wishlistFu';
export default function ProductDetails() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const { AddProduct, refetch } = useContext(cartContext);
  const [isWishlist,setIsWishlist] = useState(false)
  const [loadingWishlist, setLoadingWishlist] = useState(false);
  const {Addwishlist , deleteWishlist , getWishlist} = useContext(wishlistContext)
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
  const { id } = useParams();
  let sliderRef = useRef(null);
  const settings = {
    dots: false,
    infinite: true,
    arrows: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  const getProductDetails = () =>
    axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`);
  const { data, isLoading } = useQuery({
    queryKey: [id],
    queryFn: getProductDetails,
    staleTime: 15 * 60 * 1000,
  });
  async function HandleAddWishlist(id){
    try{
      setLoadingWishlist(true)
      const request = await Addwishlist(id)
      if(request.data.status == "success"){
        setIsWishlist(true)
      }
    }finally{
      setLoadingWishlist(false)
    }
  }
  async function HandleDeleteWishlist(id){
    try{
      setLoadingWishlist(true)
      const request = await deleteWishlist(id)
      if(request.data.status == "success"){
        setIsWishlist(false)
      }
      
    }finally{
      setLoadingWishlist(false)
    }
  }
  async function HandleGetWishlist(id){
    try{
      setLoadingWishlist(true)
      const request = await getWishlist()
      const ids = request.data.data.map((item)=>(item._id))
      ids.includes(id) ? setIsWishlist(true) : setIsWishlist(false)
    }
    finally{
      setLoadingWishlist(false)
    }
  }
  useEffect(()=>{
    HandleGetWishlist(id)
  },[])
  return (
    <>
      {isLoading == true ? (
        <LoadingProductDetails />
      ) : (
        <div className="flex container py-6 justify-center items-center flex-wrap">
          <div className="w-[30%] min-w-[300px] p-2">
            <Slider
              ref={(slider) => {
                sliderRef = slider;
              }}
              {...settings}
            >
              {data.data.data.images.map((img) => (
                <img
                  key={data.data.data.id}
                  className="w-full"
                  src={img}
                  alt={data.data.data.title}
                />
              ))}
            </Slider>
            <div className="flex justify-center gap-1 mt-2">
              <button
                onClick={() => {
                  sliderRef.slickNext();
                }}
                className="w-[15px] h-[10px] rounded-md bg-slate-300"
              ></button>
              <button
                onClick={() => {
                  sliderRef.slickPrev();
                }}
                className="w-[15px] h-[10px] rounded-md bg-slate-300"
              ></button>
            </div>
          </div>
          <div className="w-[70%] min-w-[300px] flex flex-col gap-5 p-2">
            <div className="text-3xl">{data.data.data.title}</div>
            <p>{data.data.data.description}</p>
            <div className="w-full flex justify-between items-center">
              <div>{data.data.data.price} EGP</div>
              <div className="flex items-center gap-1">
                <span className="text-2xl">
                  {data.data.data.ratingsAverage}
                </span>
                <FaStar className="text-2xl text-orange-300" />
              </div>
            </div>
            <div
              className={
                success ? "flex items-center text-green-700" : "hidden"
              }
            >
              <div>
                <FaRegCheckCircle className="me-1" />
              </div>
              <div>Added to cart</div>
            </div>
            <div className="flex">
              <div className="w-[75%]">
                <button
                  disabled={loading}
                  onClick={() => {
                    HandleAddProduct(id);
                  }}
                  className={`h-[35px] w-full rounded-md bottom-0 start-0 end-0 ${
                    loading
                      ? "bg-slate-300 text-gray-500 cursor-not-allowed"
                      : "bg-green-500 text-white cursor-pointer"
                  }`}
                >
                  {"+Add"}
                </button>
              </div>
              <div className="w-[25%] flex justify-end">
                <button className="py-1">
                  <FaHeart onClick={()=>{
                    if(isWishlist){
                      HandleDeleteWishlist(id)
                    }else{
                      HandleAddWishlist(id)
                    }
                  }} className={`text-3xl ${loadingWishlist ? 'text-black/50' : isWishlist ? 'text-red-500':'text-black'}`} />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
