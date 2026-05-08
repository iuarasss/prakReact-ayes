import {
  FiGrid,
  FiShoppingBag,
  FiUsers,
  FiAlertTriangle,
} from "react-icons/fi";

import { NavLink } from "react-router-dom";

const menuClass = ({ isActive }) =>
  `
    flex items-center gap-4 rounded-2xl
    px-5 py-4 text-sm font-medium
    transition-all duration-300
    ${
      isActive
        ? "bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-lg"
        : "text-gray-400 hover:bg-white/10 hover:text-white"
    }
  `;

export default function Sidebar() {
  return (
    <div className="
      flex min-h-screen w-[300px]
      flex-col bg-[#0F172A]
      px-6 py-8
    ">

      {/* LOGO */}
      <div className="mb-14">
        <h1 className="
          text-5xl font-black tracking-tight
          text-white
        ">
          Sedap<span className="text-cyan-400">.</span>
        </h1>

        <p className="
          mt-2 text-sm text-gray-400
        ">
          Futuristic Dashboard UI
        </p>
      </div>

      {/* MENU */}
      <ul className="flex flex-1 flex-col gap-3">

        <li>
          <NavLink to="/" className={menuClass}>
            <FiGrid size={20} />
            Dashboard
          </NavLink>
        </li>

        <li>
          <NavLink to="/orders" className={menuClass}>
            <FiShoppingBag size={20} />
            Orders
          </NavLink>
        </li>

        <li>
          <NavLink to="/customer" className={menuClass}>
            <FiUsers size={20} />
            Customers
          </NavLink>
        </li>

        <div className="my-5 border-t border-white/10"></div>

        <li>
          <NavLink to="/error400" className={menuClass}>
            <FiAlertTriangle size={18} />
            Error 400
          </NavLink>
        </li>

        <li>
          <NavLink to="/error401" className={menuClass}>
            <FiAlertTriangle size={18} />
            Error 401
          </NavLink>
        </li>

        <li>
          <NavLink to="/error403" className={menuClass}>
            <FiAlertTriangle size={18} />
            Error 403
          </NavLink>
        </li>
      </ul>

      {/* CARD */}
      <div className="
        relative overflow-hidden rounded-[30px]
        bg-gradient-to-br
        from-cyan-500 to-blue-600
        p-6 text-white shadow-2xl
      ">

        <div className="relative z-10">
          <p className="
            text-sm leading-relaxed
            text-cyan-50
          ">
            Upgrade your restaurant analytics with AI technology ⚡
          </p>

          <button className="
            mt-5 rounded-2xl bg-white
            px-5 py-3 text-sm font-bold
            text-blue-600 transition-all
            hover:scale-105
          ">
            Launch Now
          </button>
        </div>

        {/* GLOW */}
        <div className="
          absolute -right-10 -top-10
          h-40 w-40 rounded-full
          bg-white/10 blur-2xl
        "></div>
      </div>

      {/* FOOTER */}
      <div className="
        mt-6 border-t border-white/10
        pt-5 text-xs text-gray-500
      ">
        <p>Nova Dashboard System</p>
        <p className="mt-1">
          © 2025 Cyber UI
        </p>
      </div>
    </div>
  );
}