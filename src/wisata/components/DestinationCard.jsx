export default function DestinationCard({ data }) {
  return (
    <div className="group bg-white/90 backdrop-blur-sm p-3.5 rounded-[1.5rem] shadow-[0_8px_25px_-5px_rgba(16,185,129,0.05)] hover:shadow-[0_15px_35px_-5px_rgba(244,63,94,0.1)] transition-all duration-500 border border-emerald-50 hover:-translate-y-1.5">
      
      {/* Image Section */}
      <div className="relative overflow-hidden rounded-[1.2rem] aspect-[4/3] bg-slate-50">
        <img 
          src={data.image} 
          alt={data.name} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
        />
        {/* Rating Badge */}
        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-sm border border-rose-100">
          <span className="text-rose-400 text-xs">⭐</span>
          <span className="text-xs font-bold text-slate-700">{data.rating}</span>
        </div>
      </div>

      {/* Content Section */}
      <div className="pt-4 pb-2 px-2">
        <h2 className="text-lg font-bold text-slate-800 tracking-tight line-clamp-1 mb-1 group-hover:text-rose-500 transition-colors">
          {data.name}
        </h2>
        <div className="flex items-center gap-1.5 mb-2.5">
          <span className="text-emerald-600 text-xs font-bold bg-emerald-50 px-2.5 py-1 rounded-md">{data.location}</span>
        </div>
        <p className="text-sm text-slate-500 line-clamp-2 leading-relaxed">
          {data.details?.description || "Deskripsi tidak tersedia."}
        </p>
      </div>
      
    </div>
  );
}