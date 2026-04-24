import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Guest from "./pages/Guest";
import Admin from "./pages/Admin";

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-pink-50/50 relative">
        
        {/* menampilkan navbar */}
        <Navbar />

        {/* menampilkan halaman */}
        <main className="pt-24 px-4">
          <Routes>
            <Route path="/" element={<Guest />} />
            <Route path="/admin" element={<Admin/>} />

          </Routes>
        </main>

      </div>
    </BrowserRouter>
  );
}