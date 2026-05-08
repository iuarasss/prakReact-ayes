import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

export default function MainLayout() {
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
            
        <Outlet />
        </main>
      </div>
    </div>
  );
}
