// src/Main-Wheel.jsx
import './assets/MainWheel.css';
import React, { useState, createContext, useContext } from 'react';


// Custom hook to use the context

// Main app component (renamed from HelloToMyProject for clarity)
function App() {

  return (
    <div className="main-box">
      <div className="around-wheel">
        <div className="wheel">
          <div className="currency">
            <button>MDL</button>
            <button>USD</button>
            <button>EUR</button>
          </div>
          <p className="amount">{amount} MDL</p>
          <div className="earned">
            <p className="amount-earned">+500</p>
            <p className="amount-spent">-200</p>
          </div>
          <div className="timespace">
            <button>W</button>
            <button>M</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;