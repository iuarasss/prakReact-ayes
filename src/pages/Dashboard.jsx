import { useState, useEffect } from "react";
import PageHeader from "../components/PageHeader";
import { supabase } from "../lib/supabaseClient";
import { useAuth } from "../contexts/AuthContext";
import {
  FiFileText,
  FiBox,
  FiX,
  FiShoppingBag,
  FiTrendingUp,
} from "react-icons/fi";
import {
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  XAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const COLORS = ["#FF6B6B", "#1ABC9C", "#4DA3FF"];

export default function Dashboard() {
  const { profile } = useAuth();
  const [stats, setStats] = useState({
    totalOrders: 0,
    totalDelivered: 0,
    totalCancelled: 0,
    totalRevenue: 0,
  });
  const [recentOrders, setRecentOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      setLoading(true);

      // Fetch all orders
      const { data: orders, error } = await supabase
        .from("orders")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;

      const ordersList = orders || [];
      const completed = ordersList.filter((o) => o.status === "Completed");
      const cancelled = ordersList.filter((o) => o.status === "Cancelled");

      const totalRevenue = completed.reduce(
        (sum, o) => sum + Number(o.total_amount),
        0
      );

      setStats({
        totalOrders: ordersList.length,
        totalDelivered: completed.length,
        totalCancelled: cancelled.length,
        totalRevenue,
      });

      setRecentOrders(ordersList.slice(0, 5));
    } catch (err) {
      console.error("Error loading dashboard:", err.message);
    } finally {
      setLoading(false);
    }
  };

  // Charts data
  const pieData = [
    { name: "Completed", value: stats.totalDelivered || 1 },
    { name: "Pending", value: stats.totalOrders - stats.totalDelivered - stats.totalCancelled || 1 },
    { name: "Cancelled", value: stats.totalCancelled || 1 },
  ];

  const chartData = [
    { day: "Mon", value: 0 },
    { day: "Tue", value: 0 },
    { day: "Wed", value: 0 },
    { day: "Thu", value: 0 },
    { day: "Fri", value: 0 },
    { day: "Sat", value: 0 },
    { day: "Sun", value: 0 },
  ];

  return (
    <div className="flex min-h-screen bg-gray-100">
      <div className="flex flex-col flex-1">
        <main className="p-6">
          <PageHeader
            title="Dashboard"
            breadcrumb={`Hi, ${profile?.full_name || "Admin"}. Welcome back to Sedap Admin!`}
          >
            <button
              onClick={loadDashboardData}
              className="flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-600 transition-all hover:bg-gray-50"
            >
              <FiTrendingUp size={16} />
              Refresh
            </button>
          </PageHeader>

          {/* STAT CARDS */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            {/* CARD 1 */}
            <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4">
              <div className="relative w-14 h-14 flex items-center justify-center bg-[#E6F7F2] rounded-full">
                <FiFileText className="text-[#1ABC9C]" size={22} />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-800">
                  {loading ? "-" : stats.totalOrders}
                </h2>
                <p className="text-sm text-gray-500">Total Orders</p>
              </div>
            </div>

            {/* CARD 2 */}
            <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4">
              <div className="relative w-14 h-14 flex items-center justify-center bg-[#E6F7F2] rounded-full">
                <FiBox className="text-[#1ABC9C]" size={22} />
                <div className="absolute -top-1 -right-1 w-5 h-5 flex items-center justify-center bg-emerald-500 rounded-full">
                  <FiFileText className="text-white" size={10} />
                </div>
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-800">
                  {loading ? "-" : stats.totalDelivered}
                </h2>
                <p className="text-sm text-gray-500">Completed</p>
              </div>
            </div>

            {/* CARD 3 */}
            <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4">
              <div className="relative w-14 h-14 flex items-center justify-center bg-red-50 rounded-full">
                <FiX className="text-red-500" size={22} />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-800">
                  {loading ? "-" : stats.totalCancelled}
                </h2>
                <p className="text-sm text-gray-500">Cancelled</p>
              </div>
            </div>

            {/* CARD 4 */}
            <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4">
              <div className="relative w-14 h-14 flex items-center justify-center bg-[#E6F7F2] rounded-full">
                <FiShoppingBag className="text-[#1ABC9C]" size={22} />
                <div className="absolute -top-1 -right-1 w-5 h-5 flex items-center justify-center bg-emerald-500 rounded-full">
                  <FiFileText className="text-white" size={10} />
                </div>
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-800">
                  {loading ? "-" : `Rp ${stats.totalRevenue.toLocaleString("id-ID")}`}
                </h2>
                <p className="text-sm text-gray-500">Total Revenue</p>
              </div>
            </div>
          </div>

          {/* CHARTS + RECENT ORDERS */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* PIE CHART */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <h3 className="font-semibold text-gray-800 mb-4">Order Status</h3>
              {loading ? (
                <div className="h-48 flex items-center justify-center text-gray-400">Loading...</div>
              ) : (
                <div className="h-48 flex items-center justify-center">
                  <PieChart width={240} height={180}>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      innerRadius={50}
                      outerRadius={75}
                      dataKey="value"
                    >
                      {pieData.map((entry, index) => (
                        <Cell key={index} fill={COLORS[index]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                  <div className="ml-4 space-y-2">
                    <div className="flex items-center gap-2 text-xs text-gray-600">
                      <span className="h-3 w-3 rounded-full bg-[#FF6B6B]" /> Completed
                    </div>
                    <div className="flex items-center gap-2 text-xs text-gray-600">
                      <span className="h-3 w-3 rounded-full bg-[#1ABC9C]" /> Pending
                    </div>
                    <div className="flex items-center gap-2 text-xs text-gray-600">
                      <span className="h-3 w-3 rounded-full bg-[#4DA3FF]" /> Cancelled
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* RECENT ORDERS */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <h3 className="font-semibold text-gray-800 mb-4">Recent Orders</h3>
              {loading ? (
                <div className="h-48 flex items-center justify-center text-gray-400">Loading...</div>
              ) : recentOrders.length === 0 ? (
                <div className="h-48 flex items-center justify-center text-gray-400">No orders yet</div>
              ) : (
                <div className="space-y-3">
                  {recentOrders.map((order, i) => (
                    <div
                      key={order.id}
                      className="flex items-center justify-between border-b border-gray-50 pb-3 last:border-0 last:pb-0"
                    >
                      <div className="flex items-center gap-3">
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gray-100 text-xs font-bold text-gray-500">
                          #{String(i + 1).padStart(2, "0")}
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-700">
                            Order #{order.id?.slice(0, 8)}
                          </p>
                          <p className="text-xs text-gray-400">
                            Rp {Number(order.total_amount).toLocaleString("id-ID")}
                          </p>
                        </div>
                      </div>
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
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
