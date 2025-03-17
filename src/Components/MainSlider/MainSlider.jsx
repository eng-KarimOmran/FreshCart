import { useRef } from "react";
import Slider from "react-slick";
export default function MainSlider() {
  let sliderRef = useRef(null);
  const settings = {
    dots: false,
    infinite: true,
    arrows: false,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
  };
  return (
    <>
      <div className="flex flex-wrap justify-center">
        <div className="max-w-[340px] py-1">
          <Slider
            ref={(slider) => {
              sliderRef = slider;
            }}
            {...settings}
          >
            <img
              className="w-full h-[500px] object-cover"
              src="https://routeegy.github.io/Ecommerce/assets/images/41nN4nvKaAL._AC_SY200_.jpg"
              alt=""
            />
            <img
              className="w-full h-[500px] object-cover"
              src="https://routeegy.github.io/Ecommerce/assets/images/61cSNgtEISL._AC_SY200_.jpg"
              alt=""
            />
            <img
              className="w-full h-[500px] object-cover"
              src="https://routeegy.github.io/Ecommerce/assets/images/XCM_Manual_1396328_4379574_Egypt_EG_BAU_GW_DC_SL_Jewelry_379x304_1X._SY304_CB650636675_.jpg"
              alt=""
            />
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
        <div className="flex flex-col max-w-[340px] py-1">
          <img
            className="w-full h-[250px] object-cover"
            src="https://routeegy.github.io/Ecommerce/assets/images/XCM_Manual_1396328_4379575_Egypt_EG_BAU_GW_DC_SL_Bags_Wallets_379x304_1X._SY304_CB650636675_.jpg"
            alt=""
          />
          <img
            className="w-full h-[250px] object-cover"
            src="https://routeegy.github.io/Ecommerce/assets/images/XCM_Manual_1533480_5305769_379x304_1X._SY304_CB616236518_.jpg"
            alt=""
          />
        </div>
      </div>
    </>
  );
}
