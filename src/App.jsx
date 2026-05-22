import React, { Suspense } from "react";
import "./assets/tailwind.css";

import { Routes, Route, useLocation } from "react-router-dom";

import Error400 from "./pages/Error400";
import Error401 from "./pages/Error401";
import Error403 from "./pages/Error403";
import Loading from "./components/Loading";

const Dashboard = React.lazy(() => import("./pages/Dashboard"));
const Orders = React.lazy(() => import("./pages/Orders"));
const Customers = React.lazy(() => import("./pages/Customers"));
const Product = React.lazy(() => import("./pages/Product"));
const ProductDetail = React.lazy(() => import("./pages/ProductDetail"))

const NotFound = React.lazy(() => import("./pages/NotFound"));

const Login = React.lazy(() => import("./pages/auth/Login"));
const Forgot = React.lazy(() => import("./pages/auth/Forgot"));
const Register = React.lazy(() => import("./pages/auth/Register"));

const MainLayout = React.lazy(() => import("./layouts/MainLayout"));
const AuthLayout = React.lazy(() => import("./layouts/AuthLayout"));


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

  // Route tanpa sidebar/header
  const hideLayoutRoutes = ["/error400", "/error401", "/error403"];

  const hideLayout = hideLayoutRoutes.includes(location.pathname);

  // Halaman error tanpa layout
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

        {/* MAIN LAYOUT */}
        <Route element={<MainLayout />}>

          <Route path="/" element={<Dashboard />} />

          <Route path="/explore" element={<Explore />} />

          <Route path="/profile" element={<Profile />} />

          <Route path="/orders" element={<Orders />} />

          <Route path="/detail" element={<OrderDetail />} />

          {/* CUSTOMER ROUTE */}
          <Route path="/customer" element={<Customers />} />
          <Route path="/products/:id" element={<ProductDetail />} /> 

          {/* PRODUCT ROUTE */}
          <Route path="/product" element={<Product />} />

          {/* NOT FOUND */}
          <Route path="*" element={<NotFound />} />

        </Route>

        {/* AUTH LAYOUT */}
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