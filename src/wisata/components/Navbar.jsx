import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const location = useLocation();
  const isAdmin = location.pathname === "/admin";

  return (
    <header className="sticky top-0 w-full bg-white/70 backdrop-blur-xl border-b border-emerald-50/50 z-50">
      <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
        
        {/* Logo - Gradasi Hijau Soft ke Pink Soft */}
        <Link to="/" className="flex items-center">
          <h1 className="font-extrabold text-2xl tracking-tighter bg-gradient-to-r from-emerald-400 to-rose-400 bg-clip-text text-transparent hover:opacity-80 transition-opacity">
            WisataApp.
          </h1>
        </Link>
        
        {/* Sliding Tab */}
        <div className="relative flex items-center bg-slate-50 p-1.5 rounded-full border border-slate-100 shadow-inner">
          <div 
            className={`absolute top-1.5 bottom-1.5 w-[100px] bg-white rounded-full shadow-[0_2px_10px_-2px_rgba(16,185,129,0.15)] transition-transform duration-500 cubic-bezier(0.4, 0, 0.2, 1) ${
              isAdmin ? "translate-x-[100px]" : "translate-x-0"
            }`}
          ></div>

          <Link 
            to="/" 
            className={`relative z-10 w-[100px] text-center py-2 text-sm font-bold transition-colors duration-300 ${
              !isAdmin ? "text-emerald-600" : "text-slate-400 hover:text-rose-400"
            }`}
          >
            Explore
          </Link>
          
          <Link 
            to="/admin" 
            className={`relative z-10 w-[100px] text-center py-2 text-sm font-bold transition-colors duration-300 ${
              isAdmin ? "text-emerald-600" : "text-slate-400 hover:text-rose-400"
            }`}
          >
            Admin
          </Link>
        </div>

      </div>
    </header>
  );
}