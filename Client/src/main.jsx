import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { ToastContainer, Slide } from "react-toastify";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
    <ToastContainer
      position="top-center"
      autoClose={2000}
      theme="dark"
      transition={Slide}
      toastStyle={{
        background: "#1e294b",
        color: "#f8fafc",
        fontSize: "0.95rem",
        boxShadow: "0 4px 14px rgba(0, 0, 0, 0.2)",
      }}
      bodyClassName="custom-toast-body"
    />
  </StrictMode>
);
