import frameworkData from "./framework.json";

export default function FrameworkList() {
  return (
    // Background Utama: Putih Bersih
    <div className="min-h-screen bg-white p-8 md:p-16">
      <div className="max-w-7xl mx-auto">
        
        {/* Header: Minimalis dengan Aksen Garis */}
        <header className="mb-16 border-b border-slate-100 pb-10">
          <h1 className="text-4xl font-extrabold text-slate-950 tracking-tighter sm:text-5xl">
            Framework <span className="text-purple-600">Explorer</span>
          </h1>
          <p className="mt-4 text-xl text-slate-600 max-w-3xl font-light leading-relaxed">
            Eksplorasi kurasi teknologi modern untuk ekosistem pengembangan aplikasi masa kini.
          </p>
        </header>

        {/* Layout Grid: Gap lebih lebar agar lega */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {frameworkData.map((item) => (
            <div
              key={item.id}
              /* EFEK HOVER UTAMA PADA KARTU:
                - bg-white & border-slate-100: Tampilan awal super bersih.
                - transition-all duration-500: Animasi hover sangat halus.
                - hover:-translate-y-2: Kartu terangkat cukup terasa (8px).
                - hover:shadow-2xl hover:shadow-purple-100: Bayangan besar tapi lembut, dengan rona ungu tipis.
                - hover:border-purple-200: Garis pinggir berubah jadi ungu muda.
              */
              className="group flex flex-col bg-white border border-slate-100 rounded-3xl p-7 shadow-sm transition-all duration-500 ease-in-out hover:-translate-y-2 hover:shadow-2xl hover:shadow-purple-100 hover:border-purple-200"
            >
              <div className="flex-grow">
                {/* Header Card: Nama & Tahun */}
                <div className="flex justify-between items-center mb-5">
                  <h2 className="text-2xl font-bold text-slate-950 tracking-tight group-hover:text-purple-700 transition-colors">
                    {item.name}
                  </h2>
                  {/* Tahun: Badge abu-abu netral, jadi ungu saat hover */}
                  <span className="text-xs font-mono font-bold px-3 py-1 bg-slate-100 text-slate-600 rounded-full group-hover:bg-purple-50 group-hover:text-purple-700 transition-colors">
                    {item.details?.releaseYear || item.detail?.releaseYear || "N/A"}
                  </span>
                </div>

                {/* Deskripsi: Teks abu-abu gelap yang nyaman dibaca */}
                <p className="text-slate-700 text-base leading-relaxed mb-6 line-clamp-3 font-normal">
                  {item.description}
                </p>

                {/* Info Developer: Label kapital kecil yang rapi */}
                <div className="mb-6 pb-6 border-b border-slate-100">
                  <span className="text-[11px] uppercase tracking-widest text-slate-400 font-bold block mb-1.5">
                    Developed By
                  </span>
                  <p className="text-sm font-semibold text-slate-900">
                    {item.detail?.developer || item.details?.developer || "Unknown"}
                  </p>
                </div>
              </div>

              {/* Bagian Bawah: Tags & Link */}
              <div className="mt-auto space-y-6">
                {/* Tags: Netral (border abu-abu), jadi ungu saat hover */}
                <div className="flex flex-wrap gap-2.5">
                  {item.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="text-[11px] font-bold uppercase tracking-wider text-slate-500 px-3 py-1 rounded-full border border-slate-200 group-hover:border-purple-200 group-hover:text-purple-700 group-hover:bg-purple-50/50 transition-all"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Link: Teks ungu, panah bergerak saat hover */}
                <a
                  href={item.detail?.officialWebsite || item.details?.officialWebsite || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-sm font-bold text-purple-600 hover:text-purple-800 transition-colors duration-300"
                >
                  Kunjungi Website
                  <span className="ml-2 transform group-hover:translate-x-2 transition-transform duration-300">
                    &rarr;
                  </span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}