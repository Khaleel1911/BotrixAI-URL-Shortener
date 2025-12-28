import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

const savedTheme = localStorage.getItem("theme");
const finalTheme = savedTheme || "dark";
document.documentElement.setAttribute("data-theme", finalTheme);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
