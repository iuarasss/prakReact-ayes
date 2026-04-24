import { useState } from "react";
import { FaBell, FaSearch, FaTimes } from "react-icons/fa";
import { FcAreaChart } from "react-icons/fc";
import { SlSettings } from "react-icons/sl";

export default function Header() {
  // State untuk mengontrol Modal Pencarian
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <>
      <div className="flex justify-between items-center p-4">
        {/* Search Bar (Sekarang berfungsi sebagai tombol pemicu) */}
        <div 
          className="relative w-full max-w-lg cursor-pointer"
          onClick={() => setIsSearchOpen(true)}
        >
          <div className="border border-gray-100 p-2 pr-10 bg-white w-full max-w-lg rounded-md text-gray-400">
            Search Here...
          </div>
          <FaSearch className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-300" />
        </div>

        {/* Icon & Profile Section */}
        <div className="flex items-center space-x-4">
          {/* Notification Icon */}
          <div className="relative p-3 bg-blue-100 rounded-2xl text-blue-500 cursor-pointer hover:bg-blue-200 transition">
            <FaBell />
            <span className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 bg-blue-200 text-blue-700 rounded-full px-2 py-1 text-[10px] font-bold">
              50
            </span>
          </div>

          {/* Chart Icon */}
          <div className="p-3 bg-blue-100 rounded-2xl cursor-pointer hover:bg-blue-200 transition">
            <FcAreaChart />
          </div>

          {/* Settings Icon */}
          <div className="p-3 bg-red-100 rounded-2xl text-red-500 cursor-pointer hover:bg-red-200 transition">
            <SlSettings />
          </div>

          {/* Profile Section */}
          <div className="flex items-center space-x-4 border-l pl-4 border-gray-300 cursor-pointer">
            <span className="text-sm">
              Hello, <b>Ayu Sara</b>
            </span>
            <img
              src="img/download.jpg"
              alt="profile"
              className="w-10 h-10 rounded-full object-cover"
            />
          </div>
        </div>
      </div>

      {/* --- MODAL PENCARIAN (Muncul saat isSearchOpen = true) --- */}
      {isSearchOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-start justify-center pt-20 bg-black bg-opacity-50 backdrop-blur-sm"
          onClick={() => setIsSearchOpen(false)} // Tutup modal jika area luar diklik
        >
          {/* Konten Modal */}
          <div 
            className="bg-white w-full max-w-2xl rounded-2xl p-6 shadow-2xl relative animate-fade-in-down"
            onClick={(e) => e.stopPropagation()} // Mencegah modal tertutup jika bagian dalam diklik
          >
            <div className="flex items-center border-b-2 border-[#00B074] pb-2">
              <FaSearch className="text-gray-400 text-xl mr-3" />
              <input
                type="text"
                autoFocus
                placeholder="Type to search menus, orders, or customers..."
                className="w-full outline-none text-lg text-gray-700"
              />
              <button 
                onClick={() => setIsSearchOpen(false)}
                className="text-gray-400 hover:text-red-500 transition-colors"
              >
                <FaTimes className="text-xl" />
              </button>
            </div>

            {/* Dummy Data Pencarian Terakhir */}
            <div className="mt-4">
              <p className="text-xs font-bold text-gray-400 uppercase mb-3">Recent Searches</p>
              <div className="flex flex-wrap gap-2">
                <span className="bg-gray-100 px-3 py-1 rounded-full text-sm text-gray-600 cursor-pointer hover:bg-gray-200">Chicken Katsu</span>
                <span className="bg-gray-100 px-3 py-1 rounded-full text-sm text-gray-600 cursor-pointer hover:bg-gray-200">Order #1024</span>
                <span className="bg-gray-100 px-3 py-1 rounded-full text-sm text-gray-600 cursor-pointer hover:bg-gray-200">Ayu Sara</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}