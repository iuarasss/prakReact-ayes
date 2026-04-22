export default function SearchFilter({ search, setSearch, category, setCategory, location, setLocation }) {
  return (
    <div className="flex flex-col md:flex-row gap-4 my-6 bg-white/60 p-3 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.03)] border border-rose-50 backdrop-blur-md w-full max-w-6xl mx-auto">
      
      {/* Search Input */}
      <div className="relative flex-1">
        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-emerald-400 text-lg"></span>
        <input
          type="text"
          placeholder="Cari destinasi impianmu..."
          className="w-full bg-rose-50/30 pl-12 pr-4 py-3.5 rounded-2xl border border-transparent shadow-sm focus:border-rose-200 focus:ring-4 focus:ring-rose-100 outline-none transition-all text-sm font-medium text-slate-700 placeholder-slate-400"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Category Select */}
      <div className="relative w-full md:w-52">
        <select
          className="w-full appearance-none bg-emerald-50/40 px-5 py-3.5 rounded-2xl border border-transparent shadow-sm focus:border-emerald-200 focus:ring-4 focus:ring-emerald-100 outline-none transition-all text-sm font-semibold text-emerald-700 cursor-pointer"
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="">Semua Kategori</option>
          <option value="Pantai"> Pantai</option>
          <option value="Gunung"> Gunung</option>
        </select>
      </div>

      {/* Location Select */}
      <div className="relative w-full md:w-52">
        <select
          className="w-full appearance-none bg-rose-50/40 px-5 py-3.5 rounded-2xl border border-transparent shadow-sm focus:border-rose-200 focus:ring-4 focus:ring-rose-100 outline-none transition-all text-sm font-semibold text-rose-600 cursor-pointer"
          onChange={(e) => setLocation(e.target.value)}
        >
          <option value="">Semua Lokasi</option>
          <option value="Bali"> Bali</option>
          <option value="Jawa Timur"> Jawa Timur</option>
        </select>
      </div>

    </div>
  );
}