import InputForm from "./../InputForm/InputForm";
import CardProducts from "../CardProducts/CardProducts";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import LoadingProduct from "../LoadingProduct/LoadingProduct";
import { useContext, useEffect, useState } from "react";
import { wishlistContext } from "../Context/wishlistFu";
export default function Products() {
  const {getWishlist} = useContext(wishlistContext)
  const [productWishlist ,setProductWishlist] = useState([])
  const dataInput = {
    id: "search",
    type: "text",
    name: "search",
    placeholder: "search...",
  };
  const arrayOfLoading = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];
  const [search, setSearch] = useState("");
  const getProducts = () =>
    axios.get("https://ecommerce.routemisr.com/api/v1/products");
  const { isLoading, data } = useQuery({
    queryKey: ["getProducts"],
    queryFn: getProducts,
    staleTime: 30 * 60 * 1000,
  });
  const Search = (text) => {
    setSearch(text.toLowerCase());
  };
  async function HandleGetWishlist() {
    const response = await getWishlist()
    const WishlistId = response.data.data.map((product)=>(product.id))
    setProductWishlist(WishlistId)
  }
  useEffect(()=>{HandleGetWishlist()},[])
  return (
    <>
      <div className="container">
        <InputForm
          handleChange={(e) => {
            Search(e.target.value);
          }}
          data={dataInput}
        />
        <div className="flex flex-wrap items-center justify-center gap-2">
          {isLoading == true
            ? arrayOfLoading.map((num) => <LoadingProduct key={num} />)
            : search.length == 0
            ? data.data.data.map((product) => (
                <CardProducts data={product} IsWishlist={productWishlist.includes(product._id)} key={product._id} />
              ))
            : data.data.data
                .filter((pr) => pr.title.toLowerCase().includes(search))
                .map((product) => (
                  <CardProducts data={product} IsWishlist={productWishlist.includes(product._id)}  key={product._id} />
                ))}
        </div>
      </div>
    </>
  );

}
