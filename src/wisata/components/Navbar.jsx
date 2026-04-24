import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const location = useLocation();
  const isAdmin = location.pathname === "/admin";

  return (
    <div className="fixed top-6 left-0 right-0 z-50 px-4">
      {" "}
      {/* Container luar untuk memberi jarak dari tepi layar */}
      <header className="max-w-6xl mx-auto px-6 py-3 bg-white/70 backdrop-blur-xl border border-white/20 shadow-[0_8px_32px_0_rgba(244,63,94,0.1)] rounded-[2rem] flex justify-between items-center">
        {/* KIRI: Logo - Gradasi Pink Unyu */}
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 bg-gradient-to-br from-rose-400 to-pink-300 rounded-full flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
            <span className="text-white text-xs"></span>
          </div>
          <h1 className="font-extrabold text-xl tracking-tighter bg-gradient-to-r from-rose-500 to-pink-400 bg-clip-text text-transparent">
            WisataApp.
          </h1>
        </Link>

        {/* KANAN: Sliding Tab Control */}
        <div className="relative flex items-center bg-slate-100/50 p-1 rounded-full border border-white/50 shadow-inner">
          {/* Pill yang meluncur */}
          <div
            className={`absolute top-1 bottom-1 w-[90px] bg-white rounded-full shadow-sm transition-transform duration-500 cubic-bezier(0.4, 0, 0.2, 1) ${
              isAdmin ? "translate-x-[90px]" : "translate-x-0"
            }`}
          ></div>

          <Link
            to="/"
            className={`relative z-10 w-[90px] text-center py-2 text-xs font-bold transition-colors duration-300 ${
              !isAdmin ? "text-rose-500" : "text-slate-400 hover:text-rose-400"
            }`}
          >
            Guest
          </Link>

          <Link
            to="/admin"
            className={`relative z-10 w-[90px] text-center py-2 text-xs font-bold transition-colors duration-300 ${
              isAdmin ? "text-rose-500" : "text-slate-400 hover:text-rose-400"
            }`}
          >
            Admin
          </Link>
        </div>
      </header>
    </div>
  );
}
