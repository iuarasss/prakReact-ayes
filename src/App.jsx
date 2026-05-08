import React from "react";
import "./App.css";

import { Routes, Route, useLocation } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import Orders from "./pages/Orders";
import Customers from "./pages/Customers";

import Error400 from "./pages/Error400";
import Error401 from "./pages/Error401";
import Error403 from "./pages/Error403";
import NotFound from "./pages/NotFound";

import Sidebar from "./layouts/Sidebar";
import Header from "./layouts/Header";

function Explore() {
  return <h1 className="text-3xl font-bold">Halaman Explore 🔍</h1>;
}

function Profile() {
  return <h1 className="text-3xl font-bold">Halaman Profile 👤</h1>;
}

function OrderDetail() {
  return <h1 className="text-3xl font-bold">Halaman Detail 📄</h1>;
}

function App() {
  const location = useLocation();

  // Route yang tidak memakai sidebar & header
  const hideLayoutRoutes = [
    "/error400",
    "/error401",
    "/error403",
  ];

  const hideLayout = hideLayoutRoutes.includes(location.pathname);

  // Jika halaman error → tanpa sidebar/header
  if (hideLayout) {
    return (
      <Routes>
        <Route path="/error400" element={<Error400 />} />
        <Route path="/error401" element={<Error401 />} />
        <Route path="/error403" element={<Error403 />} />
      </Routes>
    );
  }

  // Layout normal
  return (
    <div className="flex min-h-screen bg-[#F4F7FE]">

      {/* Sidebar */}
      <Sidebar />

      {/* Content */}
      <div className="flex-1 flex flex-col">

        {/* Header */}
        <Header />

        {/* Pages */}
        <main className="flex-1 p-8 overflow-y-auto">

          <Routes>
            <Route path="/" element={<Dashboard />} />

            <Route path="/explore" element={<Explore />} />

            <Route path="/profile" element={<Profile />} />

            <Route path="/orders" element={<Orders />} />

            <Route path="/detail" element={<OrderDetail />} />

            <Route path="/customers" element={<Customers />} />

            <Route path="*" element={<NotFound />} />
          </Routes>

        </main>
      </div>
    </div>
  );
}

export default App;