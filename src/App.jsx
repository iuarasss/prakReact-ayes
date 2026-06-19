import React, { lazy, Suspense } from "react";
import "./assets/tailwind.css";

import { Routes, Route, useLocation } from "react-router-dom";

// import Dashboard from "./pages/Dashboard";
// import Orders from "./pages/Orders";
// import Customers from "./pages/Customers";

import Error400 from "./pages/Error400";
import Error401 from "./pages/Error401";
import Error403 from "./pages/Error403";
import Loading from "./components/Loading";
import Note from "./pages/Note";
// import NotFound from "./pages/NotFound";
// import MainLayout from "./layouts/MainLayout";
// import AuthLayout from "./layouts/AuthLayout";
// import Login from "./pages/auth/Login";
// import Register from "./pages/auth/Register";
// import Forgot from "./pages/auth/Forgot";

const Dashboard = React.lazy(() => import("./pages/Dashboard"));
const Orders = React.lazy(() => import("./pages/Orders"));
const Customers = React.lazy(() => import("./pages/Customers"));
const NotFound = React.lazy(() => import("./pages/NotFound"));
const Login = React.lazy(() => import("./pages/auth/Login"));
const Forgot = React.lazy(() => import("./pages/auth/Forgot"));
const Register = React.lazy(() => import("./pages/auth/Register"));
const MainLayout = React.lazy(() => import("./layouts/MainLayout"));
const AuthLayout = React.lazy(() => import("./layouts/AuthLayout"));
const Components = React.lazy(() => import("./pages/Components"));
const FiturXyz = lazy(() => import("./pages/FiturXyz"));

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
  const hideLayoutRoutes = ["/error400", "/error401", "/error403"];

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

  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Dashboard />} />

          <Route path="/explore" element={<Explore />} />

          <Route path="/profile" element={<Profile />} />

          <Route path="/orders" element={<Orders />} />

          <Route path="/detail" element={<OrderDetail />} />

          <Route path="/customers" element={<Customers />} />

          <Route path="/components" element={<Components />} />

          <Route path="/fitur-xyz" element={<FiturXyz />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/notes" element={<Note />} />
        </Route>

        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot" element={<Forgot />} />
        </Route>
      </Routes>
    </Suspense>
  );
}

export default App;
