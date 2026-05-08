import { useState } from "react";
import { MdOutlineDashboard } from "react-icons/md";
import { FaListUl, FaHeadset } from "react-icons/fa";
import { Link } from "react-router-dom"

export default function Sidebar() {
  // State untuk mengontrol buka/tutup modal
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div className="flex min-h-screen w-[280px] flex-col justify-between bg-white px-8 py-10 border-r border-gray-100">
        
        {/* --- Bagian Atas: Logo & Menu --- */}
        <div>
          <div className="flex flex-col mb-12">
            <span className="font-poppins text-4xl font-extrabold text-gray-900 tracking-tight">
              Sedap<b className="text-[#00B074]">.</b>
            </span>
            <span className="font-barlow text-sm text-gray-400 mt-1">
              Modern Admin Dashboard
            </span>
          </div>

          <ul className="space-y-6 font-barlow">
            <li className="flex items-center gap-4 text-gray-500 hover:text-[#00B074] cursor-pointer font-medium transition-colors">
              <MdOutlineDashboard className="text-xl" />
              <span>Dashboard</span>
            </li>

            <li className="flex items-center gap-4 text-gray-500 hover:text-[#00B074] cursor-pointer font-medium transition-colors">
              <FaListUl className="text-[1.1rem]" />
              <span>Orders</span>
            </li>

            <li className="flex items-center gap-4 text-gray-500 hover:text-[#00B074] cursor-pointer font-medium transition-colors">
              <FaHeadset className="text-xl" />
              <span>Customers</span>
            </li>
          </ul>
        </div>

        {/* --- Bagian Bawah: Banner CTA & Footer --- */}
        <div>
          <div className="bg-[#00B074] rounded-2xl p-5 relative mb-8 overflow-hidden">
            <div className="relative z-10">
              <p className="text-[13px] font-barlow text-white leading-relaxed w-[75%]">
                Please organize your menus through button below!
              </p>

              {/* Tombol yang memicu state isModalOpen menjadi true */}
              <button 
                onClick={() => setIsModalOpen(true)}
                className="flex items-center gap-2 bg-white text-gray-800 px-4 py-2 mt-4 rounded-lg shadow-sm hover:bg-gray-50 transition-colors font-semibold text-xs"
              >
                <span className="text-lg leading-none">+</span> Add Menus
              </button>
            </div>

            <div className="absolute -right-2 -bottom-2 w-20 h-20 bg-[#a6c1ee]/40 rounded-full flex items-center justify-center pointer-events-none">
               {/* Memperbaiki className yang double sebelumnya */}
               <img
                  src="img/download.jpg"
                  alt="avatar"
                  className="w-10 h-10 rounded-full object-cover"
                />
            </div>
          </div>

          <div className="text-left font-barlow">
            <p className="text-sm font-bold text-gray-500">
              Sedap Restaurant Admin Dashboard
            </p>
            <p className="text-xs font-medium text-gray-400 mt-1">
              © 2025 All Right Reserved
            </p>
          </div>
        </div>
      </div>

      {/* --- MODAL ADD MENUS (Sederhana tapi Menarik) --- */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white rounded-xl shadow-lg w-[400px] p-6">
            
            <h2 className="text-xl font-bold text-gray-800 mb-4">Add New Menu</h2>
            
            {/* Form Sederhana */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-gray-600 mb-1">Menu Name</label>
                <input 
                  type="text" 
                  placeholder="e.g., Nasi Goreng Spesial" 
                  className="w-full border border-gray-300 rounded-lg p-2 text-sm outline-none focus:border-[#00B074]"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-600 mb-1">Price (Rp)</label>
                <input 
                  type="number" 
                  placeholder="25000" 
                  className="w-full border border-gray-300 rounded-lg p-2 text-sm outline-none focus:border-[#00B074]"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-600 mb-1">Category</label>
                <select className="w-full border border-gray-300 rounded-lg p-2 text-sm outline-none focus:border-[#00B074]">
                  <option>Food</option>
                  <option>Drink</option>
                  <option>Dessert</option>
                </select>
              </div>
            </div>

            {/* Tombol Action */}
            <div className="flex justify-end gap-3 mt-6">
              <button 
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 text-sm font-medium text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200"
              >
                Cancel
              </button>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 text-sm font-medium text-white bg-[#00B074] rounded-lg hover:bg-green-600"
              >
                Save Menu
              </button>
            </div>

          </div>
        </div>
      )}
    </>
  );
}