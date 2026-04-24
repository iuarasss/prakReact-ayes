import Sidebar from "../layouts/Sidebar";
import Header from "../layouts/Header";
import PageHeader from "../components/PageHeader";

export default function Dashboard() {
  return (
    // Pastikan parent ini tetap flex
    <div className="flex bg-[#F4F7FE] min-h-screen">
      
      {/* Sidebar akan otomatis mengambil ruang di kiri */}
      <Sidebar />

      {/* HAPUS ml-64. Cukup gunakan flex-1 agar mengisi sisa layar */}
      <div className="flex-1 p-8 flex flex-col min-w-0">
        <Header />

        <div className="mt-8">
          {/* Saya sesuaikan title dan subtitle agar pas dengan gambar terakhirmu */}
          <PageHeader
            title="Dashboard"
            subtitle="Dashboard / Order List"
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h3 className="text-sm text-gray-500 mb-2">Total Users</h3>
              <p className="text-3xl font-bold text-gray-900">1,245</p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h3 className="text-sm text-gray-500 mb-2">Revenue</h3>
              <p className="text-3xl font-bold text-gray-900">$8,420</p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h3 className="text-sm text-gray-500 mb-2">Orders</h3>
              <p className="text-3xl font-bold text-gray-900">320</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}