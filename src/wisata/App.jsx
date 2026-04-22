// Di file App.jsx atau Home.jsx kamu
export default function Home() {
  return (
    // 1. Background Bergradasi & Elemen Dekoratif
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-pink-50/50 text-slate-800 font-sans relative overflow-hidden">
      
      {/* 2. Ornamen Background (Biar Gak Kosong) */}
      <div className="absolute -top-20 -left-20 w-64 h-64 bg-rose-100 rounded-full blur-[120px] opacity-60"></div>
      <div className="absolute top-1/3 -right-20 w-80 h-80 bg-pink-100 rounded-full blur-[130px] opacity-70"></div>
      
      <Navbar />

      {/* 3. Layout Konten dengan Padding yang Pas */}
      <main className="max-w-7xl mx-auto px-6 pt-28 pb-16 relative z-10">
        
        {/* Header Section (Solusi biar Gak Kosong) */}
        <header className="mb-10 text-center md:text-left">
          <p className="text-sm font-semibold text-rose-400 mb-1">Halo Kak! Mau Healing ke Mana?</p>
          <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tighter leading-tight">
            Jelajahi <span className="text-rose-500">Surga Dunia</span> Bersama Kami.
          </h2>
        </header>

        <SearchFilter />

        {/* Section List (Contoh memanggil Card) */}
        <section className="mt-12">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-2xl font-bold text-slate-800 tracking-tight">Destinasi Terpopuler✨</h3>
            <button className="text-sm font-semibold text-rose-500 hover:text-rose-700">Lihat Semua →</button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-7">
            {/* Panggil DestinationCard di sini */}
          </div>
        </section>

      </main>
    </div>
  );
}