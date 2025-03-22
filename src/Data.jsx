/* eslint-disable react/prop-types */
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
  const [SpentHistory, setSpentHistory] = useState(()=>{
    const SpentHistory = localStorage.getItem('SpentHistory');
    return SpentHistory !== null ? JSON.parse(SpentHistory) : [];   
});
  const [EarnedHistory, setEarnedHistory] = useState(()=>{
    const EarnedHistory = localStorage.getItem('EarnedHistory');
    return EarnedHistory !== null? JSON.parse(EarnedHistory) : [];
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
    localStorage.setItem('EarnedHistory', JSON.stringify(EarnedHistory));
    localStorage.setItem('SpentHistory', JSON.stringify(SpentHistory));
  }, [amount, spentAmount, earnedAmount, EarnedHistory, SpentHistory]);
  
  return(
    <AmountC.Provider value={{
      amount, 
      setAmount, 
      earnedAmount, 
      setEarnedAmount,
      spentAmount, 
      setSpentAmount, 
      currencies,
      EarnedHistory,
      setEarnedHistory,
      SpentHistory,
      setSpentHistory
    }}>
      {children}
    </AmountC.Provider>
  )
}
export function useAmount(){
  return useContext(AmountC); 
}