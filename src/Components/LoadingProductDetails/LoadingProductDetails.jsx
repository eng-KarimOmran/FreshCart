import { FaStar } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import lodingImage from "../../assets/lodingImage.png";
export default function LoadingProductDetails() {
  return (
    <>
      <div className="flex container justify-center py-6 items-center flex-wrap">
        <div className="w-[30%] min-w-[300px] p-2">
          <img className="w-full" src={lodingImage} alt="" />
        </div>
        <div className="w-[70%] min-w-[300px] flex flex-col gap-5 p-2">
          <div className="text-3xl">Loading...</div>
          <p>Loading...</p>
          <div className="w-full flex justify-between items-center">
            <div> ...EGP</div>
            <div className="flex items-center gap-1">
              <span className="text-2xl">...</span>
              <FaStar className="text-2xl text-orange-300" />
            </div>
          </div>
          <div className="flex">
            <div className="w-[75%]">
              <button className="h-[35px] w-full rounded-md bottom-0 start-0 end-0 bg-green-500 text-white">
                Loading...
              </button>
            </div>
            <div className="w-[25%] flex justify-end">
              <button className="py-1">
                <FaHeart className="text-3xl" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
