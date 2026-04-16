const InputField = ({ label, name, value, onChange, error, type = "text" }) => {
  return (
    <div className="mb-4">
      <label className="block font-medium">{label}</label>

      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        className={`w-full border p-2 rounded-lg mt-1 focus:outline-none focus:ring-2 ${
          error
            ? "border-red-500 focus:ring-red-300"
            : "focus:ring-blue-300"
        }`}
      />

      {error && (
        <div className="mt-2 bg-red-100 border border-red-400 text-red-700 px-3 py-2 rounded text-sm">
          {error}
        </div>
      )}
    </div>
  );
};

export default InputField;