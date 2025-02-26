// src/Main-Wheel.jsx
import './assets/MainWheel.css';
import React, { useState, createContext, useContext, useEffect } from 'react';

const AmountC = createContext();
// Custom hook to use the context
export function AmountProvider({children}){
  const [amount, setAmount] = useState(() =>{
    const amount = localStorage.getItem('amount');
    return amount !== null? Number(JSON.parse(amount)): 0;
  });
  const [earnedAmount, setEarnedAmount] = useState(() =>{
    const earnedAmount = localStorage.getItem('earnedAmount');
    return earnedAmount !== null? Number(JSON.parse(earnedAmount)): 0;
  });
  const [spentAmount, setSpentAmount] = useState(()=>{
    const spentAmount = localStorage.getItem('spentAmount');
    return spentAmount !== null? Number(JSON.parse(spentAmount)): 0;
  });

  useEffect(()=>{
    localStorage.setItem('amount', JSON.stringify(amount));
    localStorage.setItem('earnedAmount', JSON.stringify(earnedAmount));
    localStorage.setItem('spentAmount', JSON.stringify(spentAmount));
  }, [amount, spentAmount, earnedAmount]);
  
  return(
    <AmountC.Provider value={{amount, setAmount, earnedAmount, setEarnedAmount,spentAmount, setSpentAmount }}>
      {children}
    </AmountC.Provider>
  )
}

function formatAmount(amount, currency) {
  if (currency === 'mdl') {
    return amount;
  } else if (currency === 'usd') {
    return amount / 20;
  } else if (currency === 'eur') {
    return amount / 22;
  } else {
    return amount; // Default to MDL if currency is unrecognized
  }
}
export function useAmount(){
  return(useContext(AmountC));
}
function App() {
  const {amount, setAmount,  earnedAmount, setEarnedAmount, spentAmount, setSpentAmount} = useAmount();
  const [currency, setCurrency] = useState('mdl');
  function resetMoney(){
    setAmount(0);
    setEarnedAmount(0);
    setSpentAmount(0);
  }
  function handleCurrencyFormat(currency){
    setCurrency(currency) 
   }
  
  const formattedAmount = formatAmount(amount, currency);

  return (
    <div className="main-box">
      <div className="around-wheel">
        <div className="wheel">
          <div className="currency">
            <button style={{backgroundColor:  currency === 'mdl'? 'green' : '#D9D9D9'}} onClick={() =>handleCurrencyFormat('mdl')}>MDL</button>
            <button style={{backgroundColor:  currency === 'usd'? 'green' : '#D9D9D9'}} onClick={() =>handleCurrencyFormat('usd')}>USD</button>
            <button style={{backgroundColor:  currency === 'eur'? 'green' : '#D9D9D9'}} onClick={() =>handleCurrencyFormat('eur')}>EUR</button>
          </div>
          <p className="amount" style={{color: amount < 0? 'red': 'black'}}>{formattedAmount.toFixed(2)} {currency.toUpperCase()}</p>
          <div className="earned">
            <p className="amount-earned">+{earnedAmount}</p>
            <p className="amount-spent">-{spentAmount * -1}</p>
          </div>
          <div className="timespace">
            <button>W</button>
            <button>M</button>
          </div>
          <button onClick={resetMoney}>Reset</button>
        </div>
      </div>
    </div>
  );
}

export default App;