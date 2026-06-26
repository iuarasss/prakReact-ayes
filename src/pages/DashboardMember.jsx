import { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { supabase } from "../lib/supabaseClient";
import PageHeader from "../components/PageHeader";
import Loading from "../components/Loading";

const tierColors = {
  Bronze: {
    bg: "bg-gradient-to-br from-amber-700 to-amber-900",
    badge: "bg-amber-600",
    text: "text-amber-600",
    shadow: "shadow-amber-900/20",
    icon: "\uD83E\uDD47",
  },
  Silver: {
    bg: "bg-gradient-to-br from-slate-400 to-slate-600",
    badge: "bg-slate-500",
    text: "text-slate-600",
    shadow: "shadow-slate-600/20",
    icon: "\uD83E\uDD48",
  },
  Gold: {
    bg: "bg-gradient-to-br from-yellow-500 to-amber-600",
    badge: "bg-yellow-500",
    text: "text-yellow-600",
    shadow: "shadow-yellow-600/20",
    icon: "\uD83E\uDD47",
  },
};

export default function DashboardMember() {
  const { profile, refreshProfile } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (profile?.id) {
      loadOrders();
    }
  }, [profile?.id]);

  const loadOrders = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("orders")
        .select("*")
        .eq("profile_id", profile.id)
        .order("created_at", { ascending: false });

      if (error) throw error;
      setOrders(data || []);
    } catch (err) {
      console.error("Error loading orders:", err.message);
    } finally {
      setLoading(false);
    }
  };

  const tier = profile?.tier || "Bronze";
  const tierStyle = tierColors[tier] || tierColors.Bronze;
  const points = profile?.points || 0;

  // Hitung poin untuk tier selanjutnya
  const nextTier =
    tier === "Bronze"
      ? { name: "Silver", pointsNeeded: 100 - points }
      : tier === "Silver"
        ? { name: "Gold", pointsNeeded: 500 - points }
        : null;

  return (
    <div>
      <PageHeader
        title="Member Dashboard"
        breadcrumb="Dashboard / Member"
      />

      {/* Profile & Points Card */}
      <div className="mb-6">
        <div
          className={`relative overflow-hidden rounded-2xl ${tierStyle.bg} p-8 text-white shadow-xl ${tierStyle.shadow}`}
        >
          {/* Decorative circles */}
          <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/10" />
          <div className="pointer-events-none absolute -bottom-10 -left-10 h-32 w-32 rounded-full bg-white/5" />

          <div className="relative z-10">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-white/70">Welcome back</p>
                <h2 className="mt-1 text-2xl font-bold">
                  {profile?.full_name || "Member"}
                </h2>
              </div>
              <span className="inline-flex items-center gap-2 rounded-full bg-white/20 px-4 py-1.5 text-sm font-semibold backdrop-blur-sm">
                <span className="text-lg">{tierStyle.icon}</span>
                {tier}
              </span>
            </div>

            <div className="mt-8 grid grid-cols-2 gap-6">
              <div className="rounded-xl bg-white/10 p-4 backdrop-blur-sm">
                <p className="text-sm text-white/70">Total Points</p>
                <p className="mt-1 text-3xl font-bold">{points.toLocaleString()}</p>
                <p className="mt-1 text-xs text-white/50">points earned</p>
              </div>

              <div className="rounded-xl bg-white/10 p-4 backdrop-blur-sm">
                <p className="text-sm text-white/70">Total Orders</p>
                <p className="mt-1 text-3xl font-bold">{orders.length}</p>
                <p className="mt-1 text-xs text-white/50">transactions</p>
              </div>
            </div>

            {/* Progress to next tier */}
            {nextTier && nextTier.pointsNeeded > 0 && (
              <div className="mt-6 rounded-xl bg-white/10 p-4 backdrop-blur-sm">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm text-white/70">
                    Progress to {nextTier.name}
                  </p>
                  <p className="text-xs text-white/50">
                    {nextTier.pointsNeeded} points needed
                  </p>
                </div>
                <div className="h-2 rounded-full bg-white/20">
                  <div
                    className="h-2 rounded-full bg-white transition-all duration-500"
                    style={{
                      width: `${
                        tier === "Bronze"
                          ? Math.min((points / 100) * 100, 100)
                          : Math.min((points / 500) * 100, 100)
                      }%`,
                    }}
                  />
                </div>
              </div>
            )}

            {nextTier && nextTier.pointsNeeded <= 0 && (
              <div className="mt-6 rounded-xl bg-yellow-300/20 p-4 backdrop-blur-sm text-center">
                <p className="text-sm font-semibold text-yellow-200">
                  Congratulations! You've reached the highest tier! {tierStyle.icon}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Order History */}
      <div className="rounded-xl bg-white p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          Order History
        </h3>

        {loading ? (
          <Loading />
        ) : orders.length === 0 ? (
          <div className="py-12 text-center">
            <p className="text-4xl mb-3">🛒</p>
            <p className="text-gray-500">Belum ada pesanan.</p>
            <p className="text-sm text-gray-400 mt-1">
              Mulai pesan produk favorit Anda!
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b text-left">
                  <th className="pb-3 text-xs font-semibold uppercase tracking-wider text-gray-400">
                    Order ID
                  </th>
                  <th className="pb-3 text-xs font-semibold uppercase tracking-wider text-gray-400">
                    Total
                  </th>
                  <th className="pb-3 text-xs font-semibold uppercase tracking-wider text-gray-400">
                    Status
                  </th>
                  <th className="pb-3 text-xs font-semibold uppercase tracking-wider text-gray-400">
                    Date
                  </th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr
                    key={order.id}
                    className="border-b last:border-0 hover:bg-gray-50 transition-colors"
                  >
                    <td className="py-4 text-sm font-medium text-gray-700">
                      {order.id?.slice(0, 8)}...
                    </td>
                    <td className="py-4 text-sm font-semibold text-emerald-600">
                      Rp {Number(order.total_amount).toLocaleString("id-ID")}
                    </td>
                    <td className="py-4">
                      <span
                        className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                          order.status === "Completed"
                            ? "bg-emerald-100 text-emerald-700"
                            : order.status === "Cancelled"
                              ? "bg-red-100 text-red-700"
                              : "bg-amber-100 text-amber-700"
                        }`}
                      >
                        {order.status}
                      </span>
                    </td>
                    <td className="py-4 text-sm text-gray-500">
                      {new Date(order.created_at).toLocaleDateString("id-ID", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
