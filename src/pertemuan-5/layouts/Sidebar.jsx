import { MdOutlineDashboard } from "react-icons/md";
import { FaListUl, FaHeadset } from "react-icons/fa";

export default function Sidebar() {
  return (
    <div className="flex min-h-screen w-[280px] flex-col justify-between bg-white px-8 py-10 border-r border-gray-100">
      
      {/* Bagian Atas: Logo & Menu */}
      <div>
        {/* Logo */}
        <div className="flex flex-col mb-12">
          <span className="font-poppins text-4xl font-extrabold text-gray-900 tracking-tight">
            Sedap<b className="text-[#00B074]">.</b>
          </span>
          <span className="font-barlow text-sm text-gray-400 mt-1">
            Modern Admin Dashboard
          </span>
        </div>

        {/* List Menu */}
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

      {/* Bagian Bawah: Banner CTA & Footer */}
      <div>
        {/* Banner CTA Hijau */}
        <div className="bg-[#00B074] rounded-2xl p-5 relative mb-8 overflow-hidden">
          
          <div className="relative z-10">
            <p className="text-[13px] font-barlow text-white leading-relaxed w-[75%]">
              Please organize your menus through button below!
            </p>

            <button className="flex items-center gap-2 bg-white text-gray-800 px-4 py-2 mt-4 rounded-lg shadow-sm hover:bg-gray-50 transition-colors font-semibold text-xs">
              <span className="text-lg leading-none">+</span> Add Menus
            </button>
          </div>

          {/* Avatar Illustration - Diposisikan absolut di kanan bawah card */}
          <div className="absolute -right-2 -bottom-2 w-20 h-20 bg-[#a6c1ee]/40 rounded-full flex items-center justify-center pointer-events-none">
             <img
                className="w-14"
                src="img/download.jpg"
                alt="avatar"
                className="w-10 h-10 rounded-full"
              />
          </div>
        </div>

        {/* Footer */}
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
  );
}