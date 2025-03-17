import { MdError } from "react-icons/md";
export default function ErrorMessage({ errorMessage }) {
  return (
    <div className="bg-red-300/30 px-2 py-3 rounded-lg flex gap-1 items-center my-1">
      <MdError className="text-red-700" />
      <span className="text-red-700">{errorMessage}</span>
    </div>
  );
}
