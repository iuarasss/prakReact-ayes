import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { ImSpinner2 } from "react-icons/im";
import { BsFillExclamationDiamondFill } from "react-icons/bs";

export default function Login() {
  const navigate = useNavigate();
  const { signIn } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [dataForm, setDataForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setDataForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await signIn(dataForm.email, dataForm.password);
      navigate("/");
    } catch (err) {
      setError(err.message || "Login gagal. Periksa email dan password Anda.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold text-gray-700 mb-6 text-center">
        Welcome Back 👋
      </h2>

      {error && (
        <div className="bg-red-50 border border-red-200 mb-5 p-4 text-sm text-red-700 rounded-xl flex items-center gap-2">
          <BsFillExclamationDiamondFill className="text-red-500 text-lg shrink-0" />
          {error}
        </div>
      )}

      {loading && (
        <div className="bg-blue-50 border border-blue-200 mb-5 p-4 text-sm text-blue-700 rounded-xl flex items-center gap-2">
          <ImSpinner2 className="animate-spin text-lg shrink-0" />
          Mohon tunggu...
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="mb-5">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email Address
          </label>
          <input
            name="email"
            type="email"
            value={dataForm.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl
                       text-gray-700 placeholder-gray-400
                       focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent
                       transition-all duration-200"
            placeholder="you@example.com"
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Password
          </label>
          <input
            name="password"
            type="password"
            value={dataForm.password}
            onChange={handleChange}
            required
            className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl
                       text-gray-700 placeholder-gray-400
                       focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent
                       transition-all duration-200"
            placeholder="********"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-2.5 px-4
                     rounded-xl transition-all duration-200
                     disabled:opacity-50 disabled:cursor-not-allowed
                     focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2
                     shadow-lg shadow-emerald-500/20"
        >
          {loading ? "Loading..." : "Login"}
        </button>
      </form>

      <div className="mt-6 text-center">
        <p className="text-sm text-gray-500">
          Belum punya akun?{" "}
          <Link
            to="/register"
            className="font-semibold text-emerald-600 hover:text-emerald-700 transition-colors"
          >
            Register
          </Link>
        </p>
        <Link
          to="/forgot"
          className="inline-block mt-2 text-sm text-gray-400 hover:text-emerald-600 transition-colors"
        >
          Lupa password?
        </Link>
      </div>
    </div>
  );
}
