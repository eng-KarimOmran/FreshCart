export default function InputForm({ data, handleChange, handleBlur, value }) {
  const { id, type, name, label, placeholder } = data;
  return (
    <div className="w-full flex flex-col py-1">
      <label className="mb-1 capitalize" htmlFor={id}>
        {label}
      </label>
      <input
        onChange={handleChange}
        value={value}
        onBlur={handleBlur}
        className="outline-none mb-2 border-black/20 border-2 w-full p-2 rounded-lg  focus:ring-2"
        placeholder={placeholder}
        type={type}
        name={name}
        id={id}
      />
    </div>
  );
}
