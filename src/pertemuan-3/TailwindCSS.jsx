import React from 'react';

export default function TailwindCSS() {
  return (
    // Menambahkan background abu-abu sangat muda agar elemen putih terlihat menonjol
    <div className="min-h-screen bg-slate-50 pb-20 font-sans">
      <FlexboxGrid />
      
      {/* Container utama untuk menjaga lebar konten agar tidak terlalu melebar */}
      <main className="max-w-4xl mx-auto px-4 mt-10">
        <header className="mb-10 text-center">
          <h1 className="text-4xl font-black text-slate-800 tracking-tight">
            Belajar Tailwind <span className="text-blue-600">CSS 4</span>
          </h1>
          <p className="text-slate-500 mt-2">Eksplorasi komponen UI modern dan responsif</p>
        </header>

        <div className="space-y-8">
          <section className="flex flex-wrap gap-4 items-center justify-center bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
             <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-xl shadow-md shadow-blue-200 transition-all active:scale-95 font-medium">
              Click Me
            </button>
            <BorderRadius />
          </section>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Spacing />
            <BackgroundColors />
          </div>

          <Typography />
          <ShadowEffects />
        </div>
      </main>
    </div>
  );
}

function FlexboxGrid() {
  return (
    // Navbar dibuat sticky dengan efek blur (Glassmorphism)
    <nav className="sticky top-0 z-50 backdrop-blur-md bg-slate-900/95 text-white py-4 px-8 flex justify-between items-center shadow-xl">
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 bg-blue-500 rounded-lg rotate-12"></div>
        <h1 className="text-xl font-bold tracking-tighter text-blue-400">MyWebsite</h1>
      </div>
      <ul className="hidden md:flex space-x-8 text-sm font-medium text-slate-300">
        <li><a href="#" className="hover:text-blue-400 transition">Home</a></li>
        <li><a href="#" className="hover:text-blue-400 transition">About</a></li>
        <li><a href="#" className="hover:text-blue-400 transition">Contact</a></li>
      </ul>
      <button className="text-sm font-semibold bg-red-500/10 text-red-400 px-4 py-2 rounded-lg hover:bg-red-500 hover:text-white transition-all">
        Logout
      </button>
    </nav>
  );
}

function Spacing() {
  return (
    <div className="bg-slate-900 shadow-xl p-8 rounded-2xl border border-slate-800 transform hover:-translate-y-1 transition-transform">
      <h2 className="text-blue-400 font-bold text-xl mb-3">Card Spacing</h2>
      <p className="text-slate-400 leading-relaxed">
        Penggunaan <span className="text-white">padding (p-8)</span> dan <span className="text-white">margin</span> yang tepat memberikan nafas pada desain.
      </p>
    </div>
  );
}

function Typography() {
  return (
    <div className="py-10 border-y border-slate-200 my-8">
      <h1 className="text-5xl font-extrabold text-slate-900 tracking-tighter">
        Tailwind Typography
      </h1>
      <p className="text-slate-500 text-xl mt-4 max-w-2xl leading-relaxed">
        Belajar Tailwind sangat menyenangkan dan cepat! Dokumentasinya sangat lengkap dan komunitasnya sangat besar.
      </p>
    </div>
  );
}

function BorderRadius() {
  return (
    <div className="inline-flex shadow-sm rounded-xl overflow-hidden border border-slate-200">
      <button className="px-6 py-2.5 bg-white text-slate-700 hover:bg-slate-50 border-r border-slate-200 transition-colors font-medium">
        Left Action
      </button>
      <button className="px-6 py-2.5 bg-white text-slate-700 hover:bg-slate-50 transition-colors font-medium">
        Right Action
      </button>
    </div>
  );
}

function BackgroundColors() {
  return (
    <div className="bg-gradient-to-br from-blue-900 to-indigo-950 text-white p-8 rounded-2xl shadow-xl flex flex-col justify-center border border-white/10">
      <h3 className="text-2xl font-bold mb-2">Tailwind Colors</h3>
      <p className="text-blue-100/80">
        Gunakan gradient untuk memberikan kesan kedalaman yang mewah.
      </p>
    </div>
  );
}

function ShadowEffects() {
  return (
    <div className="group cursor-pointer bg-white border border-slate-100 shadow-sm p-10 rounded-3xl hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-500 text-center">
      <h3 className="text-2xl font-bold text-slate-800 group-hover:text-blue-600 transition-colors">Hover Interaction</h3>
      <p className="text-slate-500 mt-3">
        Sentuhan shadow halus dan transisi durasi lama menciptakan kesan premium.
      </p>
    </div>
  );
}