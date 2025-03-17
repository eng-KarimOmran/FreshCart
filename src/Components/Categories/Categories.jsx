import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
export default function Categories() {
  const [specificCategory, setSpecificCategory] = useState([]);
  const [nameSpecificCategory, setNameSpecificCategory] = useState("");
  const [loading, Loading] = useState(false);
  const getCategories = () =>
    axios.get("https://ecommerce.routemisr.com/api/v1/categories");
  const { data, isLoading } = useQuery({
    queryKey: ["getCategories"],
    queryFn: getCategories,
    staleTime: 30 * 60 * 1000,
  });
  async function getSpecificCategory(id, name) {
    try {
      Loading(true);
      const request = await axios.get(
        `https://ecommerce.routemisr.com/api/v1/categories/${id}/subcategories`
      );
      setSpecificCategory(request.data.data);
      console.log(request.data.data);
      setNameSpecificCategory(`${name} subcategories`);
    } finally {
      Loading(false);
    }
  }
  return (
    <>
      <div className="flex items-center justify-between flex-wrap gap-4 py-10 container">
        {isLoading ? (
          <div>loading...</div>
        ) : (
          data.data.data.map((categorie) => (
            <div
              onClick={() => {
                getSpecificCategory(categorie._id, categorie.name);
              }}
              key={categorie._id}
              className="w-full md:w-[400px] h-[300px] border-2 rounded-lg mx-auto overflow-hidden hover:cursor-pointer hover:shadow-lg  hover:shadow-green-400/30 transition-all duration-500"
            >
              <img
                src={categorie.image}
                className="w-full object-cover h-[80%]"
                alt={categorie.name}
              />
              <div className="h-[20%] flex items-center justify-center">
                <span className="text-2xl text-green-700 font-bold">
                  {categorie.name}
                </span>
              </div>
            </div>
          ))
        )}
      </div>
      <div className="text-green-500 text-center text-3xl">
        {nameSpecificCategory}
      </div>
      <div className="flex items-center flex-wrap container gap-4 py-10">
        {loading
          ? "loading"
          : specificCategory.map((subcategorie) => (
              <div
                key={subcategorie._id}
                className="text-black text-center w-full mx-auto md:w-4/12 lg:w-3/12 font-semibold text-2xl p-4 border-2 rounded-lg hover:shadow-lg  hover:shadow-green-400/30 transition-all duration-500"
              >
                {subcategorie.name}
              </div>
            ))}
      </div>
    </>
  );
}
