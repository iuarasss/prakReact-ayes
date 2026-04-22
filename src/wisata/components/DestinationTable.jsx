export default function DestinationTable({ data }) {
  // Paduan warna hijau soft dan pink untuk tiap kategori
  const getCategoryBadge = (category) => {
    const cat = category?.toLowerCase();
    if (cat === "pantai") return "bg-teal-50 text-teal-600 border-teal-100/50";
    if (cat === "gunung") return "bg-emerald-50 text-emerald-600 border-emerald-100/50";
    if (cat === "sejarah") return "bg-stone-100 text-stone-600 border-stone-200/50";
    if (cat === "taman") return "bg-rose-50 text-rose-600 border-rose-100/50";
    return "bg-pink-50 text-pink-600 border-pink-100/50";
  };

  return (
    <div className="w-full bg-white/90 backdrop-blur-md rounded-[1.5rem] shadow-[0_8px_30px_rgb(0,0,0,0.03)] border border-emerald-50 overflow-hidden mt-6 max-w-6xl mx-auto">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-emerald-50/50 border-b border-emerald-100/50 text-emerald-600 text-xs uppercase tracking-widest">
              <th className="p-5 font-bold pl-6">Destinasi</th>
              <th className="p-5 font-bold">Lokasi</th>
              <th className="p-5 font-bold">Kategori</th>
              <th className="p-5 font-bold text-center">Rating</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-emerald-50/50">
            {data.map((item) => (
              <tr 
                key={item.id} 
                className="hover:bg-rose-50/30 transition-colors duration-300 group"
              >
                <td className="p-5 pl-6 font-bold text-slate-700 group-hover:text-rose-500 transition-colors">
                  {item.name}
                </td>
                <td className="p-5 text-slate-500 text-sm font-medium">
                  {item.location}
                </td>
                <td className="p-5">
                  <span className={`px-3 py-1.5 rounded-lg text-xs font-bold border ${getCategoryBadge(item.category)}`}>
                    {item.category}
                  </span>
                </td>
                <td className="p-5 text-center">
                  <div className="inline-flex items-center gap-1.5 bg-white px-2.5 py-1 rounded-lg border border-emerald-100 shadow-sm">
                    <span className="text-rose-400 text-xs">⭐</span>
                    <span className="text-sm font-bold text-slate-700">{item.rating}</span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}