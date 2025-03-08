import './assets/PromptWindows.css'
import React, {useState, useRef} from 'react';
import { useAmount } from './Main-Wheel';
function MinusWindow(){
    const {spentAmount, setSpentAmount, currencies, amount, setAmount} = useAmount();
    const [showPrompt, changePrompt] = useState(false);
    const [errorMessage, setErrorMessage] = useState(false);
    const inputRef = useRef();
    const [currentCurrency, setCurrentCurrency] = useState(currencies.mdl)
    
    function handleMinusClick(){
        changePrompt(true);
    }
    function handleCancelClick(){
        changePrompt(false);
    }
    function handleConfirmClick(){
        const inputValue = inputRef.current.value;
        let NewAmount = Number(inputValue)
        if(NewAmount < 0){
            setErrorMessage(true);
            inputRef.current.value = '';
        }else{
            if(currentCurrency.name === 'USD'){
             NewAmount = NewAmount / currentCurrency.rate;   
            }else if(currentCurrency.name === 'EUR'){
                NewAmount = NewAmount / currentCurrency.rate;
            }
            setAmount(amount - NewAmount);
            setSpentAmount((prevAmount) => prevAmount - NewAmount);
            inputRef.current.value = '';
            changePrompt(false);
        }
    }
    function handleCurrencyFormat(currencyKey){
        setCurrentCurrency(currencies[currencyKey]);
    }

    return(
        <div>
        <button className="minus" onClick={handleMinusClick}>
            -
        </button>

        <div className="prompt-box" style={{display: showPrompt? 'flex' : 'none'}}>
            <p>Substract an Ammount</p>
            <input type="number" placeholder="Ammount" ref={inputRef}/>
            <p style={{display: errorMessage? 'inline-block':'none'}}>You need to input a corect number</p>
            <div className="currency-selector">
                <button style={{backgroundColor: currentCurrency.name === 'MDL' ? 'green': '#D9D9D9', color: currentCurrency.name === 'MDL'?'white':'black'}} onClick={() => handleCurrencyFormat('mdl')}>MDL</button>
                <button style={{backgroundColor: currentCurrency.name === 'USD' ? 'green': '#D9D9D9', color: currentCurrency.name === 'USD'?'white':'black'}} onClick={() => handleCurrencyFormat('usd')}>USD</button>
                <button style={{backgroundColor: currentCurrency.name === 'EUR' ? 'green': '#D9D9D9', color: currentCurrency.name === 'EUR'?'white':'black'}} onClick={() => handleCurrencyFormat('eur')}>EUR</button>
            </div>
            <div className="confirming-buttons">
                <button className='confirm-button' onClick={handleConfirmClick}>Confirm</button>
                <button className='cancel-button' onClick={handleCancelClick}>Cancel</button>
            </div>
        </div>
        </div>
    )
}
export default MinusWindow;