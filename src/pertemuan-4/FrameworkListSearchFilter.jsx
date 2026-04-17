import { useState } from "react";
import frameworkData from "./framework.json";

export default function FrameworkList() {
  const [dataForm, setDataForm] = useState({
    searchTerm: "",
    selectedTag: "",
    searchDev: "",
  });

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setDataForm({ ...dataForm, [name]: value });
  };

  const _searchTerm = dataForm.searchTerm.toLowerCase();
  const _searchDev = dataForm.searchDev.toLowerCase();

  const filteredFrameworks = frameworkData.filter((framework) => {
    const developer = (framework.detail?.developer || framework.details?.developer || "").toLowerCase();
    
    const matchesSearch =
      framework.name.toLowerCase().includes(_searchTerm) ||
      framework.description.toLowerCase().includes(_searchTerm);

    const matchesDev = developer.includes(_searchDev);

    const matchesTag = dataForm.selectedTag
      ? framework.tags.includes(dataForm.selectedTag)
      : true;

    return matchesSearch && matchesDev && matchesTag;
  });

  const allTags = [...new Set(frameworkData.flatMap((f) => f.tags))];

  return (
    <div className="min-h-screen bg-[#fafafa] text-slate-900 font-sans selection:bg-purple-100 selection:text-purple-900">
      {/* Dekorasi Background Gen-Z */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-100/50 blur-[120px] rounded-full"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[30%] h-[30%] bg-blue-100/40 blur-[100px] rounded-full"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-12 md:py-20">
        {/* Header Section */}
        <header className="mb-16 space-y-4">
          <div className="inline-block px-4 py-1.5 bg-purple-50 border border-purple-100 rounded-full text-purple-600 text-xs font-bold uppercase tracking-widest mb-4">
            ✨ Curated Tech Stack
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-slate-950 tracking-tight leading-[0.9]">
            Build <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-500">Faster.</span><br />
            Explore Smarter.
          </h1>
          <p className="text-lg text-slate-500 max-w-xl font-medium pt-4">
            Eksplorasi ekosistem teknologi modern dengan standar desain masa kini.
          </p>
        </header>

        {/* Filter Glassmorphism Area */}
        <section className="sticky top-6 z-50 mb-16 px-6 py-4 bg-white/70 backdrop-blur-xl border border-white/20 shadow-[0_8px_32px_0_rgba(31,38,135,0.07)] rounded-[2rem] flex flex-col md:flex-row gap-4 items-center">
          <div className="relative w-full md:w-1/3">
            <input
              type="text"
              name="searchDev"
              placeholder="Cari Developer..."
              className="w-full bg-slate-100/50 border-transparent focus:bg-white focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 rounded-2xl py-3 px-5 transition-all outline-none font-medium"
              onChange={handleChange}
            />
          </div>

          <div className="w-full md:w-1/3">
            <select
              name="selectedTag"
              className="w-full bg-slate-100/50 border-transparent focus:bg-white focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 rounded-2xl py-3 px-5 transition-all outline-none font-medium appearance-none cursor-pointer"
              onChange={handleChange}
            >
              <option value="">Semua Kategori</option>
              {allTags.map((tag) => <option key={tag} value={tag}>{tag}</option>)}
            </select>
          </div>
        </section>

        {/* Grid System */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredFrameworks.map((item) => (
            <div
              key={item.id}
              className="group relative bg-white border border-slate-100 rounded-[2.5rem] p-8 transition-all duration-500 hover:shadow-[0_30px_60px_-15px_rgba(100,100,111,0.1)] hover:-translate-y-3"
            >
              {/* Floating Badge */}
              <div className="absolute -top-3 -right-3 bg-slate-900 text-white text-[10px] font-black px-4 py-2 rounded-2xl shadow-xl transform rotate-12 group-hover:rotate-0 transition-transform duration-300">
                {item.details?.releaseYear || item.detail?.releaseYear}
              </div>

              <div className="mb-6">
                <h2 className="text-3xl font-black text-slate-900 mb-3 group-hover:text-purple-600 transition-colors">
                  {item.name}
                </h2>
                <p className="text-slate-500 leading-relaxed font-medium line-clamp-3">
                  {item.description}
                </p>
              </div>

              {/* Developer Info Box */}
              <div className="bg-slate-50 rounded-2xl p-4 mb-6 group-hover:bg-purple-50 transition-colors duration-300">
                <span className="text-[10px] uppercase font-black text-slate-400 tracking-widest mb-1 block">
                  Original Dev
                </span>
                <p className="text-sm font-bold text-slate-800">
                   {item.detail?.developer || item.details?.developer || "Community"}
                </p>
              </div>

              {/* Tags & Action Link */}
              <div className="mt-auto space-y-6">
                <div className="flex flex-wrap gap-2">
                  {item.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="text-[10px] font-black uppercase px-3 py-1 bg-white border border-slate-200 rounded-lg text-slate-400 group-hover:border-purple-200 group-hover:text-purple-600 transition-all shadow-sm"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>

                <a
                  href={item.detail?.officialWebsite || item.details?.officialWebsite || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between w-full p-4 bg-slate-900 text-white rounded-2xl font-bold group-hover:bg-purple-600 transition-all duration-300 shadow-lg shadow-slate-200"
                >
                  Explore Site
                  <span className="bg-white/20 p-1 rounded-lg">&rarr;</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}