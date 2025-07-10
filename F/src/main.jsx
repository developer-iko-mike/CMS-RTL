import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "./AllRoute_Components/MyBootsrap.css";
import "react-toastify/dist/ReactToastify.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <App/>
    </BrowserRouter>
  </StrictMode>
);
