import { useState } from "react";
import InputField from "./components/InputField";
import SelectField from "./components/SelectField";

const UserForm = () => {
  const [form, setForm] = useState({
    nama: "",
    email: "",
    umur: "",
    gender: "",
    jurusan: ""
  });

  const [errors, setErrors] = useState({});
  const [result, setResult] = useState(null);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const validate = () => {
    let err = {};

    if (!form.nama) err.nama = "Nama wajib diisi";
    else if (/\d/.test(form.nama)) err.nama = "Tidak boleh angka";

    if (!form.email) err.email = "Email wajib diisi";
    else if (!form.email.includes("@")) err.email = "Email tidak valid";

    if (!form.umur) err.umur = "Umur wajib diisi";
    else if (isNaN(form.umur)) err.umur = "Harus angka";

    if (!form.gender) err.gender = "Pilih gender";
    if (!form.jurusan) err.jurusan = "Pilih jurusan";

    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      setResult(form);
    }
  };

  const isValid =
    form.nama &&
    form.email &&
    form.umur &&
    form.gender &&
    form.jurusan &&
    Object.keys(errors).length === 0;

  return (
    <div className="max-w-md mx-auto mt-10 p-5 shadow rounded">
      <form onSubmit={handleSubmit}>
        <InputField label="Nama" name="nama" value={form.nama} onChange={handleChange} error={errors.nama} />
        <InputField label="Email" name="email" value={form.email} onChange={handleChange} error={errors.email} />
        <InputField label="Umur" name="umur" value={form.umur} onChange={handleChange} error={errors.umur} />

        <SelectField label="Gender" name="gender" value={form.gender} onChange={handleChange} options={["Laki-laki", "Perempuan"]} error={errors.gender} />
        <SelectField label="Jurusan" name="jurusan" value={form.jurusan} onChange={handleChange} options={["Informatika", "Sistem Informasi", "Teknik Elektro"]} error={errors.jurusan} />

        {isValid && (
          <button className="bg-blue-500 text-white px-4 py-2 rounded">
            Submit
          </button>
        )}
      </form>

      {result && (
        <div className="mt-5 p-3 bg-blue-200 rounded">
          <h3 className="font-bold">Hasil:</h3>
          <p>Nama: {result.nama}</p>
          <p>Email: {result.email}</p>
          <p>Umur: {result.umur}</p>
          <p>Gender: {result.gender}</p>
          <p>Jurusan: {result.jurusan}</p>
        </div>
      )}
    </div>
  );
};

export default UserForm;