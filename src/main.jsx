import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./assets/index.css";
import "./assets/MainWheel.css";
import App from "./Main-Wheel.jsx";
import PlusWindow from "./Plus-Window.jsx";
import MinusWindow from "./Minus-Window.jsx";

createRoot(document.getElementById("root")).render(
    <StrictMode>
      <p className="title">Daniel&apos;s Money Tracker</p>
      <div className="main">
        <PlusWindow />
        <App />
        <MinusWindow />
      </div>
    </StrictMode>
);
