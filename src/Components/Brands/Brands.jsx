import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import CardBrands from "../CardBrands/CardBrands";
export default function Brands() {
  const getAllBrands = () =>
    axios.get("https://ecommerce.routemisr.com/api/v1/brands");
  const [cardBrandsVisible, setCardBrandsVisible] = useState(false);
  const [dataCardBrands, setDataCardBrands] = useState(true);
  const { data, isLoading } = useQuery({
    queryKey: ["getBrands"],
    queryFn: getAllBrands,
    staleTime: 30 * 60 * 1000,
  });
  return (
    <>
      <h2 className="py-5 text-3xl text-green-500 font-semibold text-center">
        All Brands
      </h2>
      <div className="container flex justify-center items-center flex-wrap gap-4">
        {isLoading
          ? "lodaing"
          : data?.data.data.map((brand) => (
              <div
                key={brand._id}
                onClick={() => {
                  setDataCardBrands(brand);
                  setCardBrandsVisible(true);
                }}
                className="border-2 p-6 hover:shadow-lg  hover:shadow-green-400/30 transition-all duration-500"
              >
                <img
                  className="max-w-[250px]"
                  src={brand.image}
                  alt={brand.name}
                />
                <div className="text-center">{brand.name}</div>
              </div>
            ))}
      </div>
      {cardBrandsVisible ? (
        <CardBrands
          dataCardBrands={dataCardBrands}
          setCardBrandsVisible={setCardBrandsVisible}
        />
      ) : null}
    </>
  );
}
