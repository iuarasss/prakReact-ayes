import Sidebar from "../layouts/Sidebar";
import Header from "../layouts/Header";
import PageHeader from "../components/PageHeader";
// Tambahan import ikon untuk mempercantik card
import { FaUsers, FaDollarSign, FaShoppingCart } from "react-icons/fa";

export default function Dashboard() {
  const recentOrders = [
    { id: "#1024", name: "Budi Santoso", menu: "Nasi Goreng Spesial", status: "Completed" },
    { id: "#1025", name: "Siti Aminah", menu: "Mie Goreng Sedap", status: "Pending" },
    { id: "#1026", name: "Andi Wijaya", menu: "Es Teh Manis", status: "Completed" },
  ];

  return (
    <div className="flex bg-[#F4F7FE] min-h-screen">
      
      <Sidebar />

      <div className="flex-1 p-8 flex flex-col min-w-0">
        <Header />

        <div className="mt-8">
          <PageHeader
            title="Dashboard"
            subtitle="Dashboard / Order List"
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
            <div className="bg-white p-6 rounded-xl shadow-sm flex justify-between items-center hover:shadow-md transition-shadow">
              <div>
                <h3 className="text-sm text-gray-500 mb-2">Total Users</h3>
                <p className="text-3xl font-bold text-gray-900">1,245</p>
              </div>
              <div className="p-4 bg-blue-100 text-blue-500 rounded-full">
                <FaUsers className="text-2xl" />
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm flex justify-between items-center hover:shadow-md transition-shadow">
              <div>
                <h3 className="text-sm text-gray-500 mb-2">Revenue</h3>
                <p className="text-3xl font-bold text-gray-900">$8,420</p>
              </div>
              <div className="p-4 bg-green-100 text-[#00B074] rounded-full">
                <FaDollarSign className="text-2xl" />
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm flex justify-between items-center hover:shadow-md transition-shadow">
              <div>
                <h3 className="text-sm text-gray-500 mb-2">Orders</h3>
                <p className="text-3xl font-bold text-gray-900">320</p>
              </div>
              <div className="p-4 bg-orange-100 text-orange-500 rounded-full">
                <FaShoppingCart className="text-2xl" />
              </div>
            </div>
          </div>

          <div className="mt-8 bg-white p-6 rounded-xl shadow-sm border border-gray-50">
            <h3 className="text-lg font-bold text-gray-800 mb-4">Recent Orders</h3>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-gray-100 text-sm text-gray-400">
                    <th className="pb-3 font-medium">Order ID</th>
                    <th className="pb-3 font-medium">Customer Name</th>
                    <th className="pb-3 font-medium">Menu</th>
                    <th className="pb-3 font-medium">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {recentOrders.map((order, index) => (
                    <tr key={index} className="border-b border-gray-50 last:border-none hover:bg-gray-50 transition-colors">
                      <td className="py-4 text-sm font-semibold text-gray-700">{order.id}</td>
                      <td className="py-4 text-sm text-gray-600">{order.name}</td>
                      <td className="py-4 text-sm text-gray-600">{order.menu}</td>
                      <td className="py-4 text-sm">
                        <span className={`px-3 py-1 rounded-full text-[11px] font-bold ${
                          order.status === 'Completed' ? 'bg-green-100 text-green-600' : 'bg-yellow-100 text-yellow-600'
                        }`}>
                          {order.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}