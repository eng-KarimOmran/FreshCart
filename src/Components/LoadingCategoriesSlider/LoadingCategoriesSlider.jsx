import lodingImage from "../../assets/lodingImage.png";
export default function LoadingCategoriesSlider() {
  return (
    <div>
      <div className="h-[300px]">
        <img
          src={lodingImage}
          className="w-full h-full block object-cover"
          alt=""
        />
      </div>
      <div className="text-center py-1 font-bold text-lg">Loading...</div>
    </div>
  );
}
