import { useState, useEffect } from "react";
import PageHeader from "../components/PageHeader";
import { supabase } from "../lib/supabaseClient";
import { useAuth } from "../contexts/AuthContext";
import {
  FiPlus,
  FiTrash2,
  FiX,
  FiCheck,
  FiAlertCircle,
} from "react-icons/fi";

export default function Customer() {
  const { profile } = useAuth();
  const isAdmin = profile?.role === "Admin";
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", phone: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    if (isAdmin) loadCustomers();
    else setLoading(false);
  }, [isAdmin]);

  const loadCustomers = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("customers")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      setCustomers(data || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!form.name || !form.email) {
      setError("Nama dan email harus diisi.");
      return;
    }

    try {
      const { error } = await supabase.from("customers").insert([
        {
          name: form.name,
          email: form.email,
          phone: form.phone,
        },
      ]);
      if (error) throw error;

      setSuccess("Customer berhasil ditambahkan!");
      setForm({ name: "", email: "", phone: "" });
      setShowForm(false);
      loadCustomers();
      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Yakin ingin menghapus customer ini?")) return;
    try {
      const { error } = await supabase.from("customers").delete().eq("id", id);
      if (error) throw error;
      setSuccess("Customer berhasil dihapus!");
      loadCustomers();
      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      setError(err.message);
    }
  };

  // Non-admin view
  if (!isAdmin) {
    return (
      <div>
        <PageHeader title="Customers" breadcrumb="Dashboard / Customers" />
        <div className="rounded-xl bg-white p-12 text-center shadow-sm border border-gray-100">
          <p className="text-5xl mb-4">🔒</p>
          <h3 className="text-lg font-semibold text-gray-700 mb-2">Akses Terbatas</h3>
          <p className="text-sm text-gray-500">
            Halaman ini hanya dapat diakses oleh Admin.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <PageHeader title="Customers" breadcrumb="Dashboard / Customers">
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center gap-2 rounded-lg bg-emerald-600 px-4 py-2 text-white transition-all hover:bg-emerald-700"
        >
          <FiPlus size={18} />
          Add Customer
        </button>
      </PageHeader>

      {/* Notifications */}
      {error && (
        <div className="mb-4 flex items-center gap-2 rounded-xl bg-red-50 p-4 text-sm text-red-700 border border-red-200">
          <FiAlertCircle className="shrink-0" />
          {error}
        </div>
      )}
      {success && (
        <div className="mb-4 flex items-center gap-2 rounded-xl bg-emerald-50 p-4 text-sm text-emerald-700 border border-emerald-200">
          <FiCheck className="shrink-0" />
          {success}
        </div>
      )}

      {/* FORM */}
      {showForm && (
        <div className="mb-6 animate-fade rounded-xl bg-white p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-gray-800">Add Customer</h2>
            <button
              onClick={() => setShowForm(false)}
              className="rounded-lg p-2 text-gray-400 hover:bg-gray-100 transition-colors"
            >
              <FiX size={20} />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="grid gap-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">Name *</label>
                <input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all"
                  placeholder="Customer name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">Email *</label>
                <input
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all"
                  placeholder="customer@example.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">Phone</label>
              <input
                name="phone"
                value={form.phone}
                onChange={handleChange}
                className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all"
                placeholder="08xxxxxxxxxx"
              />
            </div>

            <div className="flex gap-3 pt-2">
              <button
                type="submit"
                className="rounded-xl bg-emerald-600 px-6 py-2.5 text-sm font-semibold text-white transition-all hover:bg-emerald-700"
              >
                Save Customer
              </button>
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="rounded-xl border border-gray-200 px-6 py-2.5 text-sm font-medium text-gray-600 transition-all hover:bg-gray-50"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* TABLE */}
      <div className="rounded-xl bg-white p-6 shadow-sm border border-gray-100 overflow-x-auto">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-800">
            All Customers ({customers.length})
          </h3>
        </div>

        {loading ? (
          <div className="py-12 text-center text-gray-400">Loading customers...</div>
        ) : customers.length === 0 ? (
          <div className="py-12 text-center">
            <p className="text-4xl mb-3">👥</p>
            <p className="text-gray-500">Belum ada customer.</p>
          </div>
        ) : (
          <table className="w-full">
            <thead>
              <tr className="border-b text-left">
                <th className="pb-3 text-xs font-semibold uppercase tracking-wider text-gray-400">Name</th>
                <th className="pb-3 text-xs font-semibold uppercase tracking-wider text-gray-400">Email</th>
                <th className="pb-3 text-xs font-semibold uppercase tracking-wider text-gray-400">Phone</th>
                <th className="pb-3 text-xs font-semibold uppercase tracking-wider text-gray-400">Created</th>
                <th className="pb-3 text-xs font-semibold uppercase tracking-wider text-gray-400">Actions</th>
              </tr>
            </thead>
            <tbody>
              {customers.map((customer) => (
                <tr key={customer.id} className="border-b last:border-0 hover:bg-gray-50 transition-colors">
                  <td className="py-4 text-sm font-medium text-gray-700">{customer.name}</td>
                  <td className="py-4 text-sm text-gray-500">{customer.email}</td>
                  <td className="py-4 text-sm text-gray-500">{customer.phone || "-"}</td>
                  <td className="py-4 text-sm text-gray-400">
                    {new Date(customer.created_at).toLocaleDateString("id-ID", {
                      year: "numeric", month: "short", day: "numeric",
                    })}
                  </td>
                  <td className="py-4">
                    <button
                      onClick={() => handleDelete(customer.id)}
                      className="rounded-lg p-2 text-red-500 hover:bg-red-50 transition-colors"
                      title="Delete"
                    >
                      <FiTrash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
