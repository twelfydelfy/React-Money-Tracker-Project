// src/Main-Wheel.jsx
import './assets/MainWheel.css';
import React, { useState, createContext, useContext, useEffect } from 'react';

const AmountC = createContext();

export function AmountProvider({children}){
  const [amount, setAmount] = useState(() => {
    const amount = localStorage.getItem('amount');
    return amount !== null ? Number(JSON.parse(amount)) : 0;
  });
  const [earnedAmount, setEarnedAmount] = useState(() => {
    const earnedAmount = localStorage.getItem('earnedAmount');
    return earnedAmount !== null ? Number(JSON.parse(earnedAmount)) : 0;
  });
  const [spentAmount, setSpentAmount] = useState(() => {
    const spentAmount = localStorage.getItem('spentAmount');
    return spentAmount !== null ? Number(JSON.parse(spentAmount)) : 0;
  });
  
  const [currencies, setCurrencies] = useState( {
    mdl: { name: 'MDL', rate: 1 },
    usd: { name: 'USD', rate: 0.053 },
    eur: { name: 'EUR', rate: 0.05 }
  });

  const FetchExchangeRates = async () =>{
    try{
    const response = await fetch('https://v6.exchangerate-api.com/v6/da34c8a25a7c63ed33859e65/latest/MDL');
    const data = await response.json();
    setCurrencies({
      mdl: { name: 'MDL', rate: 1 },
    usd: { name: 'USD', rate: data.conversion_rates.USD },
    eur: { name: 'EUR', rate: data.conversion_rates.EUR }
    })
    console.log(data.conversion_rates);
  }catch (error){
    console.error('Failed to fetch exchange rates API', error);
  }
}
useEffect(() => {
  FetchExchangeRates();
}, []);

  useEffect(() => {
    localStorage.setItem('amount', JSON.stringify(amount));
    localStorage.setItem('earnedAmount', JSON.stringify(earnedAmount));
    localStorage.setItem('spentAmount', JSON.stringify(spentAmount));
  }, [amount, spentAmount, earnedAmount]);
  
  return(
    <AmountC.Provider value={{
      amount, 
      setAmount, 
      earnedAmount, 
      setEarnedAmount,
      spentAmount, 
      setSpentAmount, 
      currencies
    }}>
      {children}
    </AmountC.Provider>
  )
}

function formatAmount(amount, currencyObj) {
  return amount * currencyObj.rate;
}

export function useAmount(){
  return useContext(AmountC);
}

function App() {
  const { 
    amount, 
    setAmount, 
    earnedAmount, 
    setEarnedAmount, 
    spentAmount, 
    setSpentAmount, 
    currencies 
  } = useAmount();
  
  const [currentCurrency, setCurrentCurrency] = useState(currencies.mdl);

  function resetMoney(){
    setAmount(0);
    setEarnedAmount(0);
    setSpentAmount(0);
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