/* eslint-disable no-unused-vars */
// src/Main-Wheel.jsx
import './assets/MainWheel.css';
import React, { useState} from 'react';
import { useAmount } from './Data';
//Now we actually move on to the Main Wheel


function formatAmount(amount, currencyObj) {
  return amount * currencyObj.rate;
}

function App() {
  const { 
    amount, 
    setAmount, 
    earnedAmount, 
    setEarnedAmount, 
    spentAmount, 
    setSpentAmount, 
    currencies,
    setEarnedHistory,
    setSpentHistory
  } = useAmount();
  
  const [currentCurrency, setCurrentCurrency] = useState(currencies.mdl);

  function resetMoney(){
    setAmount(0);
    setEarnedAmount(0);
    setSpentAmount(0);
    setEarnedHistory([]);
    setSpentHistory([]);
  }

  function handleCurrencyFormat(currencyKey){
    setCurrentCurrency(currencies[currencyKey]);
  }
  
  const formattedAmount = formatAmount(amount, currentCurrency);

  return (
    <div className="main-box">
      <div className="around-wheel">
        <div className="wheel">
          <div className="currency">
            <button 
              style={{backgroundColor: currentCurrency.name === 'MDL' ? 'green' : '#D9D9D9', color: currentCurrency.name === 'MDL'?'white':'black'}} 
              onClick={() => handleCurrencyFormat('mdl')}
            >
              MDL
            </button>
            <button 
              style={{backgroundColor: currentCurrency.name === 'USD' ? 'green' : '#D9D9D9', color: currentCurrency.name === 'USD'?'white':'black'}} 
              onClick={() => handleCurrencyFormat('usd')}
            >
              USD
            </button>
            <button 
              style={{backgroundColor: currentCurrency.name === 'EUR' ? 'green' : '#D9D9D9', color: currentCurrency.name === 'EUR' ? 'white':'black'}} 
              onClick={() => handleCurrencyFormat('eur')}
            >
              EUR
            </button>
          </div>
          <p 
            className="amount" 
            style={{color: amount < 0 ? 'red' : 'black'}}
          >
            {formattedAmount.toFixed(2)} {currentCurrency.name}
          </p>
          <div className="earned">
            <p className="amount-earned">+{formatAmount(earnedAmount, currentCurrency).toFixed(2)}</p>
            <p className="amount-spent">-{formatAmount(spentAmount * -1, currentCurrency).toFixed(2)}</p>
          </div>
          <div className="timespace">
            <button>W</button>
            <button>M</button>
          </div>
          <button onClick={resetMoney}>Reset</button>
          <p>USD: {(1/ currencies.usd.rate).toFixed(2)}     EUR: {(1/currencies.eur.rate).toFixed(2)}</p>
        </div>
      </div>
    </div>
  );
}

export default App;