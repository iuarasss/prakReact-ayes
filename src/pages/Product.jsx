import { useState, useEffect } from "react";
import PageHeader from "../components/PageHeader";
import { supabase } from "../lib/supabaseClient";
import { useAuth } from "../contexts/AuthContext";
import {
  FiPlus,
  FiEdit2,
  FiTrash2,
  FiX,
  FiCheck,
  FiAlertCircle,
  FiShoppingCart,
  FiMinus,
} from "react-icons/fi";

export default function Product() {
  const { profile, refreshProfile } = useAuth();
  const isAdmin = profile?.role === "Admin";
  const isMember = profile?.role === "Member";
  const userId = profile?.id;

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [form, setForm] = useState({ name: "", description: "", price: "", stock: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Checkout state
  const [checkoutProduct, setCheckoutProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [ordering, setOrdering] = useState(false);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      setProducts(data || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const openAddForm = () => {
    setEditingProduct(null);
    setForm({ name: "", description: "", price: "", stock: "" });
    setShowForm(true);
    setError("");
  };

  const openEditForm = (product) => {
    setEditingProduct(product);
    setForm({
      name: product.name,
      description: product.description || "",
      price: product.price.toString(),
      stock: product.stock.toString(),
    });
    setShowForm(true);
    setError("");
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!form.name || !form.price) {
      setError("Nama dan harga harus diisi.");
      return;
    }

    try {
      const productData = {
        name: form.name,
        description: form.description,
        price: parseFloat(form.price),
        stock: parseInt(form.stock) || 0,
      };

      if (editingProduct) {
        const { error } = await supabase
          .from("products")
          .update(productData)
          .eq("id", editingProduct.id);
        if (error) throw error;
        setSuccess("Produk berhasil diperbarui!");
      } else {
        const { error } = await supabase.from("products").insert([productData]);
        if (error) throw error;
        setSuccess("Produk berhasil ditambahkan!");
      }

      setShowForm(false);
      loadProducts();
      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Yakin ingin menghapus produk ini?")) return;
    try {
      const { error } = await supabase.from("products").delete().eq("id", id);
      if (error) throw error;
      setSuccess("Produk berhasil dihapus!");
      loadProducts();
      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      setError(err.message);
    }
  };

  // Checkout functions
  const openCheckout = (product) => {
    setCheckoutProduct(product);
    setQuantity(1);
    setError("");
  };

  const closeCheckout = () => {
    setCheckoutProduct(null);
    setQuantity(1);
  };

  const handleOrder = async () => {
    if (!checkoutProduct || quantity < 1) return;
    setOrdering(true);
    setError("");

    try {
      const totalAmount = checkoutProduct.price * quantity;

      // Create order
      const { data: order, error: orderError } = await supabase
        .from("orders")
        .insert([
          {
            profile_id: userId,
            total_amount: totalAmount,
            status: "Pending",
          },
        ])
        .select()
        .single();

      if (orderError) throw orderError;

      // Create order item
      const { error: itemError } = await supabase
        .from("order_items")
        .insert([
          {
            order_id: order.id,
            product_id: checkoutProduct.id,
            quantity: quantity,
            price: checkoutProduct.price,
          },
        ]);

      if (itemError) throw itemError;

      setSuccess(
        `Pesanan berhasil dibuat! Total: Rp ${totalAmount.toLocaleString("id-ID")}`
      );
      closeCheckout();

      // Refresh profile to update points
      if (refreshProfile) refreshProfile();

      setTimeout(() => setSuccess(""), 5000);
    } catch (err) {
      setError(err.message);
    } finally {
      setOrdering(false);
    }
  };

  return (
    <div>
      <PageHeader title="Products" breadcrumb="Dashboard / Products">
        {isAdmin && (
          <button
            onClick={openAddForm}
            className="flex items-center gap-2 rounded-lg bg-emerald-600 px-4 py-2 text-white transition-all hover:bg-emerald-700"
          >
            <FiPlus size={18} />
            Add Product
          </button>
        )}
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

      {/* FORM — Add/Edit (Admin only) */}
      {showForm && isAdmin && (
        <div className="mb-6 animate-fade rounded-xl bg-white p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-gray-800">
              {editingProduct ? "Edit Product" : "Add Product"}
            </h2>
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
                <label className="block text-sm font-medium text-gray-600 mb-1">Product Name *</label>
                <input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all"
                  placeholder="Product name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">Price *</label>
                <input
                  name="price"
                  type="number"
                  value={form.price}
                  onChange={handleChange}
                  required
                  className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all"
                  placeholder="0"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">Description</label>
              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                rows="2"
                className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all resize-none"
                placeholder="Product description"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">Stock</label>
                <input
                  name="stock"
                  type="number"
                  value={form.stock}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all"
                  placeholder="0"
                />
              </div>
            </div>

            <div className="flex gap-3 pt-2">
              <button
                type="submit"
                className="rounded-xl bg-emerald-600 px-6 py-2.5 text-sm font-semibold text-white transition-all hover:bg-emerald-700"
              >
                {editingProduct ? "Update Product" : "Save Product"}
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
            All Products ({products.length})
          </h3>
        </div>

        {loading ? (
          <div className="py-12 text-center text-gray-400">Loading products...</div>
        ) : products.length === 0 ? (
          <div className="py-12 text-center">
            <p className="text-4xl mb-3">📦</p>
            <p className="text-gray-500">Belum ada produk.</p>
            {isAdmin && (
              <button
                onClick={openAddForm}
                className="mt-4 text-emerald-600 font-semibold hover:text-emerald-700"
              >
                + Tambah produk pertama
              </button>
            )}
          </div>
        ) : (
          <table className="w-full">
            <thead>
              <tr className="border-b text-left">
                <th className="pb-3 text-xs font-semibold uppercase tracking-wider text-gray-400">Name</th>
                <th className="pb-3 text-xs font-semibold uppercase tracking-wider text-gray-400">Description</th>
                <th className="pb-3 text-xs font-semibold uppercase tracking-wider text-gray-400">Price</th>
                <th className="pb-3 text-xs font-semibold uppercase tracking-wider text-gray-400">Stock</th>
                {(isAdmin || isMember) && <th className="pb-3 text-xs font-semibold uppercase tracking-wider text-gray-400">Actions</th>}
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id} className="border-b last:border-0 hover:bg-gray-50 transition-colors">
                  <td className="py-4 text-sm font-medium text-gray-700">{product.name}</td>
                  <td className="py-4 text-sm text-gray-500 max-w-[200px] truncate">
                    {product.description || "-"}
                  </td>
                  <td className="py-4 text-sm font-semibold text-emerald-600">
                    Rp {Number(product.price).toLocaleString("id-ID")}
                  </td>
                  <td className="py-4">
                    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                      product.stock > 10
                        ? "bg-emerald-100 text-emerald-700"
                        : product.stock > 0
                        ? "bg-amber-100 text-amber-700"
                        : "bg-red-100 text-red-700"
                    }`}>
                      {product.stock > 0 ? `${product.stock} available` : "out of stock"}
                    </span>
                  </td>
                  {(isAdmin || isMember) && (
                    <td className="py-4">
                      <div className="flex items-center gap-2">
                        {isAdmin && (
                          <>
                            <button
                              onClick={() => openEditForm(product)}
                              className="rounded-lg p-2 text-blue-500 hover:bg-blue-50 transition-colors"
                              title="Edit"
                            >
                              <FiEdit2 size={16} />
                            </button>
                            <button
                              onClick={() => handleDelete(product.id)}
                              className="rounded-lg p-2 text-red-500 hover:bg-red-50 transition-colors"
                              title="Delete"
                            >
                              <FiTrash2 size={16} />
                            </button>
                          </>
                        )}
                        {isMember && product.stock > 0 && (
                          <button
                            onClick={() => openCheckout(product)}
                            className="flex items-center gap-1.5 rounded-lg bg-emerald-600 px-3 py-1.5 text-xs font-medium text-white transition-all hover:bg-emerald-700"
                          >
                            <FiShoppingCart size={14} />
                            Beli
                          </button>
                        )}
                        {isMember && product.stock <= 0 && (
                          <span className="text-xs text-red-400 font-medium">Habis</span>
                        )}
                      </div>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* CHECKOUT MODAL */}
      {checkoutProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm animate-fade">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl mx-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-gray-800">Beli Produk</h3>
              <button
                onClick={closeCheckout}
                className="rounded-lg p-2 text-gray-400 hover:bg-gray-100 transition-colors"
              >
                <FiX size={20} />
              </button>
            </div>

            <div className="mb-4 rounded-xl bg-gray-50 p-4">
              <p className="font-semibold text-gray-800">{checkoutProduct.name}</p>
              <p className="text-2xl font-bold text-emerald-600 mt-1">
                Rp {Number(checkoutProduct.price).toLocaleString("id-ID")}
              </p>
              {checkoutProduct.description && (
                <p className="text-sm text-gray-500 mt-1">{checkoutProduct.description}</p>
              )}
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-600 mb-2">Jumlah</label>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="flex h-10 w-10 items-center justify-center rounded-xl border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors"
                  disabled={quantity <= 1}
                >
                  <FiMinus size={16} />
                </button>
                <input
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                  min="1"
                  max={checkoutProduct.stock}
                  className="w-20 rounded-xl border border-gray-200 bg-gray-50 px-4 py-2 text-center text-lg font-semibold focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all"
                />
                <button
                  onClick={() => setQuantity(Math.min(checkoutProduct.stock, quantity + 1))}
                  className="flex h-10 w-10 items-center justify-center rounded-xl border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors"
                  disabled={quantity >= checkoutProduct.stock}
                >
                  <FiPlus size={16} />
                </button>
              </div>
              <p className="text-xs text-gray-400 mt-2">Stok tersedia: {checkoutProduct.stock}</p>
            </div>

            <div className="mb-6 flex items-center justify-between rounded-xl bg-emerald-50 p-4">
              <span className="text-sm font-medium text-gray-600">Total</span>
              <span className="text-xl font-bold text-emerald-700">
                Rp {(checkoutProduct.price * quantity).toLocaleString("id-ID")}
              </span>
            </div>

            <div className="flex gap-3">
              <button
                onClick={handleOrder}
                disabled={ordering}
                className="flex-1 rounded-xl bg-emerald-600 py-3 text-sm font-semibold text-white transition-all hover:bg-emerald-700 disabled:opacity-50"
              >
                {ordering ? "Memproses..." : "Pesan Sekarang"}
              </button>
              <button
                onClick={closeCheckout}
                className="rounded-xl border border-gray-200 px-6 py-3 text-sm font-medium text-gray-600 transition-all hover:bg-gray-50"
              >
                Batal
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
