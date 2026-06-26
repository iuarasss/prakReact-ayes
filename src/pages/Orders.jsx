import { useState, useEffect } from "react";
import PageHeader from "../components/PageHeader";
import { supabase } from "../lib/supabaseClient";
import { useAuth } from "../contexts/AuthContext";
import { FiCheck, FiAlertCircle, FiRefreshCw } from "react-icons/fi";

const statusColors = {
  Pending: "bg-amber-100 text-amber-700",
  Completed: "bg-emerald-100 text-emerald-700",
  Cancelled: "bg-red-100 text-red-700",
};

export default function Orders() {
  const { profile } = useAuth();
  const isAdmin = profile?.role === "Admin";
  const isMember = profile?.role === "Member";
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [updating, setUpdating] = useState(null);

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    try {
      setLoading(true);
      let query = supabase
        .from("orders")
        .select("*, profiles(full_name), customers(name)")
        .order("created_at", { ascending: false });

      // Member only sees their own orders
      if (isMember) {
        query = query.eq("profile_id", profile.id);
      }

      const { data, error } = await query;
      if (error) throw error;
      setOrders(data || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (orderId, newStatus) => {
    setUpdating(orderId);
    setError("");
    setSuccess("");

    try {
      const { error } = await supabase
        .from("orders")
        .update({ status: newStatus })
        .eq("id", orderId);

      if (error) throw error;

      setSuccess(`Status pesanan berhasil diubah menjadi ${newStatus}!`);
      loadOrders();
      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      setError(err.message);
    } finally {
      setUpdating(null);
    }
  };

  // Guest view
  if (!isAdmin && !isMember) {
    return (
      <div>
        <PageHeader title="Orders" breadcrumb="Dashboard / Orders" />
        <div className="rounded-xl bg-white p-12 text-center shadow-sm border border-gray-100">
          <p className="text-5xl mb-4">🔒</p>
          <h3 className="text-lg font-semibold text-gray-700 mb-2">Akses Terbatas</h3>
          <p className="text-sm text-gray-500">
            Silakan login untuk melihat pesanan.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <PageHeader
        title="Orders"
        breadcrumb="Dashboard / Orders"
      >
        <button
          onClick={loadOrders}
          className="flex items-center gap-2 rounded-lg border border-gray-200 px-4 py-2 text-sm text-gray-600 transition-all hover:bg-gray-50"
        >
          <FiRefreshCw size={16} />
          Refresh
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

      {/* TABLE */}
      <div className="rounded-xl bg-white p-6 shadow-sm border border-gray-100 overflow-x-auto">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-800">
            {isAdmin ? "All Orders" : "My Orders"} ({orders.length})
          </h3>
        </div>

        {loading ? (
          <div className="py-12 text-center text-gray-400">Loading orders...</div>
        ) : orders.length === 0 ? (
          <div className="py-12 text-center">
            <p className="text-4xl mb-3">📋</p>
            <p className="text-gray-500">Belum ada pesanan.</p>
          </div>
        ) : (
          <table className="w-full">
            <thead>
              <tr className="border-b text-left">
                <th className="pb-3 text-xs font-semibold uppercase tracking-wider text-gray-400">Order ID</th>
                <th className="pb-3 text-xs font-semibold uppercase tracking-wider text-gray-400">Customer</th>
                <th className="pb-3 text-xs font-semibold uppercase tracking-wider text-gray-400">Total</th>
                <th className="pb-3 text-xs font-semibold uppercase tracking-wider text-gray-400">Status</th>
                {isAdmin && <th className="pb-3 text-xs font-semibold uppercase tracking-wider text-gray-400">Actions</th>}
                <th className="pb-3 text-xs font-semibold uppercase tracking-wider text-gray-400">Date</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id} className="border-b last:border-0 hover:bg-gray-50 transition-colors">
                  <td className="py-4 text-sm font-mono text-gray-500">
                    #{order.id?.slice(0, 8)}
                  </td>
                  <td className="py-4 text-sm font-medium text-gray-700">
                    {order.profiles?.full_name || order.customers?.name || "Guest"}
                  </td>
                  <td className="py-4 text-sm font-semibold text-emerald-600">
                    Rp {Number(order.total_amount).toLocaleString("id-ID")}
                  </td>
                  <td className="py-4">
                    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${statusColors[order.status] || "bg-gray-100 text-gray-700"}`}>
                      {order.status}
                    </span>
                  </td>
                  {isAdmin && (
                    <td className="py-4">
                      <div className="flex items-center gap-1">
                        {order.status !== "Completed" && order.status !== "Cancelled" && (
                          <>
                            <button
                              onClick={() => updateStatus(order.id, "Completed")}
                              disabled={updating === order.id}
                              className="rounded-lg px-3 py-1.5 text-xs font-medium bg-emerald-100 text-emerald-700 hover:bg-emerald-200 transition-colors disabled:opacity-50"
                            >
                              {updating === order.id ? "..." : "Complete"}
                            </button>
                            <button
                              onClick={() => updateStatus(order.id, "Cancelled")}
                              disabled={updating === order.id}
                              className="rounded-lg px-3 py-1.5 text-xs font-medium bg-red-100 text-red-700 hover:bg-red-200 transition-colors disabled:opacity-50"
                            >
                              Cancel
                            </button>
                          </>
                        )}
                        {order.status === "Completed" && (
                          <span className="text-xs text-emerald-500 font-medium">✓ Done</span>
                        )}
                        {order.status === "Cancelled" && (
                          <span className="text-xs text-red-400 font-medium">✕ Cancelled</span>
                        )}
                      </div>
                    </td>
                  )}
                  <td className="py-4 text-sm text-gray-400">
                    {new Date(order.created_at).toLocaleDateString("id-ID", {
                      year: "numeric", month: "short", day: "numeric",
                    })}
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
