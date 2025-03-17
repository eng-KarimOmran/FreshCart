import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useRef } from "react";
import Slider from "react-slick";
import LoadingCategoriesSlider from "../LoadingCategoriesSlider/LoadingCategoriesSlider";
export default function CategoriesSlider() {
  let sliderRef = useRef(null);
  const arrayOfLoading = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];
  const settings = {
    dots: false,
    arrows: false,
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 576,
        settings: {
          arrows: false,
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 768,
        settings: {
          arrows: false,
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 992,
        settings: {
          arrows: false,
          slidesToShow: 4,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 1200,
        settings: {
          arrows: false,
          slidesToShow: 5,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
        },
      },
    ],
  };
  const getCategories = () =>
    axios.get("https://ecommerce.routemisr.com/api/v1/categories");
  const { data, isLoading } = useQuery({
    queryKey: ["getCategories"],
    queryFn: getCategories,
    staleTime: 30 * 60 * 1000,
  });
  console.log();
  return (
    <>
      <div className="py-5">
        <Slider
          ref={(slider) => {
            sliderRef = slider;
          }}
          {...settings}
        >
          {isLoading == true
            ? arrayOfLoading.map((num) => <LoadingCategoriesSlider key={num} />)
            : data.data.data.map((Categorie) => (
                <div key={Categorie._id}>
                  <div className="h-[300px]">
                    <img
                      src={Categorie.image}
                      className="w-full h-full block object-cover"
                      alt="categories"
                    />
                  </div>
                  <div className="text-center py-1 font-bold text-lg">
                    {Categorie.name}
                  </div>
                </div>
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
    </>
  );
}
