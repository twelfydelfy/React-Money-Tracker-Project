/* eslint-disable no-unused-vars */
// src/Plus-Window.jsx
import './assets/PromptWindows.css';
import React, { useState, useRef } from 'react';
import { useAmount } from './Data';

function PlusWindow() {
  const {earnedAmount, setEarnedAmount, amount, setAmount, currencies, EarnedHistory, setEarnedHistory} = useAmount();
  const [showPrompt, changePrompt] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);
  const inputRef = useRef();
  const [currentCurrency, setCurrentCurrency] = useState(currencies.mdl);
  const categoryRef = useRef();
  const [category, changeCategory] = useState(
    {
      name: 'Error',
      price: 0
    }
  )

  function handlePlusClick() {
    changePrompt(true);
  }

  function handleCancelClick() {
    changePrompt(false);
    inputRef.current.value = '';
  }

  function handleConfirm() {
    const inputValue = inputRef.current.value;
    const categoryValue = categoryRef.current.value;
    let newAmount = Number(inputValue);

    if (isNaN(newAmount) || newAmount < 0) {
      setErrorMessage(true);
    } else {
      if(currentCurrency.name === 'USD'){
        newAmount = newAmount / currentCurrency.rate
      }else if(
        currentCurrency.name === 'EUR'){
          newAmount = newAmount / currentCurrency.rate
        }
      setErrorMessage(false);
      setAmount(amount + newAmount);
      setEarnedAmount ((prevEarned) => prevEarned + newAmount);
      changePrompt(false);
      inputRef.current.value = '';
      setEarnedHistory( e =>{
        const newHistory = [...e, { name: categoryValue, amount: inputValue }];
      localStorage.setItem('EarnedHistory', JSON.stringify(newHistory));
      return newHistory;
    });
      
    }
  }
  function handleCurrencyFormat(currencyKey){
    setCurrentCurrency(currencies[currencyKey])
  }
  return (
    <div>
      <button className="plus" onClick={handlePlusClick}>
        +
      </button>

      <div className="prompt-box" style={{ display: showPrompt ? 'flex' : 'none' }}>
        <p>Add an Amount</p>
        <input type="number" placeholder="Amount" ref={inputRef} />
        <p
          className="error-msg"
          style={{ display: errorMessage ? 'inline-block' : 'none' }}
        >
          You need to input a valid number
        </p>
        <input type='text' placeholder=" "ref={categoryRef} />
        <div className="currency-selector">
          <button style={{backgroundColor: currentCurrency.name === 'MDL' ? 'green' : '#D9D9D9', color: currentCurrency.name === 'MDL'?'white':'black'}} 
           onClick={() => handleCurrencyFormat('mdl')}>MDL</button>
          <button style={{backgroundColor: currentCurrency.name === 'USD' ? 'green' : '#D9D9D9', color: currentCurrency.name === 'USD'?'white':'black'}} 
              onClick={() => handleCurrencyFormat('usd')}>USD</button>
          <button style={{backgroundColor: currentCurrency.name === 'EUR' ? 'green' : '#D9D9D9', color: currentCurrency.name === 'EUR' ? 'white':'black'}} 
              onClick={() => handleCurrencyFormat('eur')}>EUR</button>
        </div>
        <div className="confirming-buttons">
          <button className="confirm-button" onClick={handleConfirm}>
            Confirm
          </button>
          <button className="cancel-button" onClick={handleCancelClick}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default PlusWindow;