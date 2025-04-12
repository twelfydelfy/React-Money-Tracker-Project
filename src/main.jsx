import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./assets/index.css";
import App from "./Main-Wheel.jsx";
import { AmountProvider } from "./Data.jsx";
import History from "./History.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AmountProvider>
      <p className="title">Daniel&apos;s Money Tracker</p>
      <div className="mainBoxMain">
        <div className="left-box">
          <App />
        </div>
        <div className="right-box">
            <History />
          </div>
      </div>
    </AmountProvider>
  </StrictMode>
);