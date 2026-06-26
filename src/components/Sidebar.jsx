import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import {
  FiGrid,
  FiShoppingBag,
  FiUsers,
  FiAlertTriangle,
  FiLayers,
  FiTool,
  FiFileText,
  FiLogOut,
  FiStar,
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
  const { profile, signOut } = useAuth();
  const navigate = useNavigate();
  const role = profile?.role || "Guest";
  const isAdmin = role === "Admin";
  const isMember = role === "Member";

  const handleLogout = async () => {
    await signOut();
    navigate("/login");
  };

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

          <p className="mt-1 text-sm text-gray-400">
            {isAdmin ? "Admin Dashboard" : "Member Area"}
          </p>
        </div>

        {/* MENU */}
        <ul className="flex flex-col gap-3">
          {/* Member Dashboard — khusus Member */}
          {isMember && (
            <li>
              <NavLink to="/member/dashboard" className={menuClass}>
                <FiStar size={20} />
                Dashboard Member
              </NavLink>
            </li>
          )}

          {/* Dashboard Admin — khusus Admin */}
          {isAdmin && (
            <li>
              <NavLink to="/" className={menuClass}>
                <FiGrid size={20} />
                Dashboard
              </NavLink>
            </li>
          )}

          {/* Products — semua role bisa */}
          <li>
            <NavLink to="/products" className={menuClass}>
              <FiFileText size={20} />
              Products
            </NavLink>
          </li>

          {/* Orders — Admin & Member */}
          {(isAdmin || isMember) && (
            <li>
              <NavLink to="/orders" className={menuClass}>
                <FiShoppingBag size={20} />
                Orders
              </NavLink>
            </li>
          )}

          {/* Customers — khusus Admin */}
          {isAdmin && (
            <li>
              <NavLink to="/customers" className={menuClass}>
                <FiUsers size={20} />
                Customers
              </NavLink>
            </li>
          )}

          <div className="my-5 border-t border-gray-100"></div>

          {/* Components — semua authenticated */}
          {(isAdmin || isMember) && (
            <li>
              <NavLink to="/components" className={menuClass}>
                <FiLayers size={20} />
                Components
              </NavLink>
            </li>
          )}

          <li>
            <NavLink to="/notes" className={menuClass}>
              <FiTool size={20} />
              Note
            </NavLink>
          </li>

          {/* Fitur XYZ — khusus Admin */}
          {isAdmin && (
            <li>
              <NavLink to="/fitur-xyz" className={menuClass}>
                <FiTool size={20} />
                Fitur XYZ
              </NavLink>
            </li>
          )}

          <div className="my-5 border-t border-gray-100"></div>

          {isAdmin && (
            <>
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
            </>
          )}
        </ul>
      </div>

      {/* BOTTOM */}
      <div>
        {/* User Info */}
        <div className="mb-4 flex items-center gap-3 rounded-xl border border-gray-100 bg-gray-50 p-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#00B074] text-sm font-bold text-white">
            {(profile?.full_name || "User").charAt(0).toUpperCase()}
          </div>
          <div className="flex-1 min-w-0">
            <p className="truncate text-sm font-semibold text-gray-700">
              {profile?.full_name || "User"}
            </p>
            <p className="text-xs text-gray-400 capitalize">{role}</p>
          </div>
        </div>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-red-500 transition-all duration-200 hover:bg-red-50"
        >
          <FiLogOut size={18} />
          Logout
        </button>

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
