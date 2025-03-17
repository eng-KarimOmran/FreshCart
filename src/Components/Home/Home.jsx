import CategoriesSlider from "../CategoriesSlider/CategoriesSlider";
import MainSlider from "../MainSlider/MainSlider";
import Products from "../Products/Products";
export default function Home() {
  return (
    <>
      <div className="flex flex-col gap-5 mt-6">
        <MainSlider />
        <CategoriesSlider />
        <Products />
      </div>
    </>
  );
}
