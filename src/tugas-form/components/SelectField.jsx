const SelectField = ({ label, name, value, onChange, options, error }) => {
  return (
    <div className="mb-4">
      <label className="block">{label}</label>
      <select
        name={name}
        value={value}
        onChange={onChange}
        className={`w-full border p-2 rounded-lg mt-1 focus:outline-none focus:ring-2 ${
          error ? "border-red-500 focus:ring-red-300" : "focus:ring-blue-300"
        }`}
      >
        <option value="">-- Pilih --</option>
        {options.map((opt, i) => (
          <option key={i} value={opt}>
            {opt}
          </option>
        ))}
      </select>

      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
};

export default SelectField;
