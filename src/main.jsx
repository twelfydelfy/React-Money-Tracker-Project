import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./assets/index.css";
import "./assets/MainWheel.css";
import App from "./Main-Wheel.jsx";
import PlusWindow from "./Plus-Window.jsx";
import MinusWindow from "./Minus-Window.jsx";
import { AmountProvider } from "./Main-Wheel.jsx";
import History from "./History.jsx";

createRoot(document.getElementById("root")).render(
  <AmountProvider>
    <StrictMode>
      <div className="main-box">
      <p className="title">Daniel&apos;s Money Tracker</p>
      <div className="main">
        <PlusWindow />
        <App />
        <MinusWindow />
      </div>
      <History />        
      </div>
    </StrictMode></AmountProvider>
);
