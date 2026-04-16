import React from "react";
import { createRoot } from "react-dom/client";
import "./tailwind.css";
import TailwindCSS from "./TailwindCSS";

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <TailwindCSS />
  </React.StrictMode>
);