import {
  FiSearch,
  FiBell,
  FiGift,
  FiSettings,
  FiLogOut,
} from "react-icons/fi";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const { user, profile, signOut } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut();
    navigate("/login");
  };

  return (
    <div className="sticky top-0 z-40 flex items-center justify-between border-b border-gray-100 bg-white/80 px-8 py-5 backdrop-blur-xl">

      {/* SEARCH */}
      <div className="relative w-[380px]">
        <input
          type="text"
          placeholder="Search menu, customer, order..."
          className="
            w-full rounded-2xl border border-gray-100
            bg-gray-50 py-3 pl-12 pr-4
            text-sm text-gray-700
            outline-none transition-all
            focus:border-green-400
            focus:bg-white
            focus:shadow-lg
          "
        />

        <FiSearch
          className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
          size={18}
        />
      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-5">

        {/* ICONS */}
        <div className="flex items-center gap-3">
          {[
            {
              icon: <FiBell size={18} />,
              total: 2,
              bg: "bg-blue-50",
              text: "text-blue-500",
            },
            {
              icon: <FiGift size={18} />,
              total: 1,
              bg: "bg-orange-50",
              text: "text-orange-500",
            },
            {
              icon: <FiSettings size={18} />,
              total: 9,
              bg: "bg-red-50",
              text: "text-red-500",
            },
          ].map((item, index) => (
            <div
              key={index}
              className={`
                relative flex h-11 w-11 cursor-pointer
                items-center justify-center rounded-2xl
                ${item.bg} ${item.text}
                transition-all duration-300
                hover:-translate-y-1 hover:shadow-md
              `}
            >
              {item.icon}
              <span className="
                absolute -right-1 -top-1
                flex h-5 w-5 items-center justify-center
                rounded-full bg-white text-[10px]
                font-bold text-gray-700 shadow
              ">
                {item.total}
              </span>
            </div>
          ))}
        </div>

        {/* USER */}
        <div className="
          flex items-center gap-3 rounded-2xl
          border border-gray-100 bg-white
          px-4 py-2 shadow-sm
        ">
          <div className="text-right">
            <p className="text-xs text-gray-400">
              Halo👋
            </p>
            <p className="text-sm font-semibold text-gray-700">
              {profile?.full_name || user?.email || "User"}
            </p>
            {profile?.tier && profile?.role === "Member" && (
              <p className="text-xs font-medium text-emerald-600">
                {profile.tier} • {profile.points} pts
              </p>
            )}
            {profile?.role === "Admin" && (
              <p className="text-xs font-medium text-blue-600 capitalize">
                {profile.role}
              </p>
            )}
          </div>

          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#00B074] text-sm font-bold text-white">
            {(profile?.full_name || "U").charAt(0).toUpperCase()}
          </div>
        </div>

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="flex h-11 w-11 items-center justify-center rounded-2xl bg-red-50 text-red-500 transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
          title="Logout"
        >
          <FiLogOut size={18} />
        </button>
      </div>
    </div>
  );
}
