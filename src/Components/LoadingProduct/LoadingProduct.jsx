import lodingImage from "../../assets/lodingImage.png";
import { FaStar } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
export default function LoadingProduct() {
  return (
    <>
      <div className="w-[300px] p-2 flex gap-1 flex-col group">
        <img
          className="w-[300px] h-[330px] block object-cover"
          src={lodingImage}
          alt={""}
        />
        <div className="my-1 text-green-500">{"Loading..."}</div>
        <div className="font-bold">{"Loading..."}</div>
        <div className="flex justify-between items-center w-full">
          <div>{".."} EGp</div>
          <div className="flex items-center">
            <FaStar className="text-orange-300 inline me-1" />
            {".."}
          </div>
        </div>
        <div className="flex items-center justify-between mt-2 overflow-hidden mix-h-[35px]">
          <button className="h-[35px] w-[250px] rounded-md bottom-0 start-0 end-0 bg-green-500 translate-y-14 group-hover:translate-y-0 transition-all duration-300">
            Loading...
          </button>
          <button className="text-end py-1">
            <FaHeart className="inline text-3xl" />
          </button>
        </div>
      </div>
    </>
  );
}
