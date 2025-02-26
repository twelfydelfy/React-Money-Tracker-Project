// src/Plus-Window.jsx
import './assets/PromptWindows.css';
import React, { useState, useRef } from 'react';
import { useAmount } from './Main-Wheel';

function PlusWindow() {
  const {amount, setAmount} = useAmount();
  const {earnedAmount, setEarnedAmount} = useAmount();
  const [showPrompt, changePrompt] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);
  const inputRef = useRef();

  function handlePlusClick() {
    changePrompt(true);
  }

  function handleCancelClick() {
    changePrompt(false);
    inputRef.current.value = ''; // Clear input on cancel
  }

  function handleConfirm() {
    const inputValue = inputRef.current.value;
    const newAmount = Number(inputValue); // Convert input to number

    if (isNaN(newAmount) || newAmount < 0) {
      setErrorMessage(true);
    } else {
      setErrorMessage(false);
      setAmount(amount + newAmount);
      setEarnedAmount ((prevEarned) => prevEarned + newAmount);
      changePrompt(false); // Close prompt
      inputRef.current.value = '';
    }
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
        <div className="currency-selector">
          <button>MDL</button>
          <button>USD</button>
          <button>EUR</button>
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