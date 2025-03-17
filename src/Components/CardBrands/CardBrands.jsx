import { MdOutlineClose } from "react-icons/md";
export default function CardBrands({ setCardBrandsVisible, dataCardBrands }) {
  return (
    <>
      <section
        onClick={(e) => {
          if (e.target.tagName == "SECTION") {
            setCardBrandsVisible(false);
          }
        }}
        className="fixed inset-0 bg-black/30 z-50 flex justify-center items-center"
      >
        <div className="bg-white p-5 w-[90%] md:w-[60%] lg:w-[40%]">
          <div className="text-end border-b-2 pb-4">
            <MdOutlineClose
              onClick={() => {
                setCardBrandsVisible(false);
              }}
              className="inline-block text-2xl hover:cursor-pointer"
            />
          </div>
          <div className="flex py-3 justify-between items-center border-b-2 flex-wrap">
            <div>
              <div className="font-semibold text-green-500 text-4xl py-3">
                {dataCardBrands.name}
              </div>
              <div className="text-black/70">{dataCardBrands.name}</div>
            </div>
            <div>
              <img
                src={dataCardBrands.image}
                className="max-w-[250px] object-cover"
                alt={dataCardBrands.name}
              />
            </div>
          </div>
          <div className="text-end">
            <button
              onClick={() => {
                setCardBrandsVisible(false);
              }}
              className="inline-block bg-slate-500 text-white py-3 px-5 rounded-lg mt-3"
            >
              Close
            </button>
          </div>
        </div>
      </section>
    </>
  );
}
