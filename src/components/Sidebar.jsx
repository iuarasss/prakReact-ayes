import {
  FiGrid,
  FiShoppingBag,
  FiUsers,
  FiAlertTriangle,
<<<<<<< HEAD
  FiLayers,
=======
  FiBox, // icon product
>>>>>>> 7fa8fd13bf71bc24604aad8bf0430f7f60c7c48f
} from "react-icons/fi";

import { NavLink } from "react-router-dom";

const menuClass = ({ isActive }) =>
  `
    flex items-center gap-4
    rounded-xl px-4 py-3
    text-sm font-medium
    transition-all duration-200
    ${
      isActive
        ? "bg-[#00B074] text-white shadow-sm"
        : "text-gray-500 hover:text-[#00B074]"
    }
  `;

export default function Sidebar() {
  return (
    <div
      className="
        flex min-h-screen w-[280px]
        flex-col justify-between
        border-r border-gray-100
        bg-white px-8 py-10
      "
    >
      {/* TOP */}
      <div>
        {/* LOGO */}
        <div className="mb-12">
          <h1
            className="
              text-4xl font-extrabold
              tracking-tight text-gray-900
            "
          >
            Sedap
            <span className="text-[#00B074]">.</span>
          </h1>

          <p className="mt-1 text-sm text-gray-400">Modern Admin Dashboard</p>
        </div>

        {/* MENU */}
        <ul className="flex flex-col gap-3">
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

          {/* PRODUCT MENU */}
          <li>
            <NavLink to="/product" className={menuClass}>
              <FiBox size={20} />
              Product
            </NavLink>
          </li>

          <li>
            <NavLink to="/customer" className={menuClass}>
              <FiUsers size={20} />
              Customers
            </NavLink>
          </li>

          <li>
            <NavLink to="/components" className={menuClass}>
              <FiLayers size={20} />
              Components
            </NavLink>
          </li>

          <div className="my-5 border-t border-gray-100"></div>

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
      </div>

      {/* BOTTOM */}
      <div>
        {/* CARD */}
        <div
          className="
            relative overflow-hidden
            rounded-2xl bg-[#00B074]
            p-5 text-white
          "
        >
          <div className="relative z-10">
            <p
              className="
                text-[13px] leading-relaxed
                text-white w-[75%]
              "
            >
              Please organize your menus through button below!
            </p>

            <button
              className="
                mt-4 flex items-center gap-2
                rounded-lg bg-white
                px-4 py-2 text-xs
                font-semibold text-gray-800
                shadow-sm transition-colors
                hover:bg-gray-50
              "
            >
              <span className="text-lg leading-none">+</span>
              Add Menus
            </button>
          </div>

          {/* CIRCLE */}
          <div
            className="
              absolute -bottom-2 -right-2
              flex h-20 w-20 items-center
              justify-center rounded-full
              bg-white/20
            "
          >
            <img
              src="https://i.pravatar.cc/100"
              alt="avatar"
              className="
                h-10 w-10 rounded-full
                object-cover
              "
            />
          </div>
        </div>

        {/* FOOTER */}
        <div className="mt-8">
          <p className="text-sm font-bold text-gray-500">
            Sedap Restaurant Admin Dashboard
          </p>

          <p className="mt-1 text-xs text-gray-400">
            © 2025 All Right Reserved
          </p>
        </div>
      </div>
    </div>
  );
}
