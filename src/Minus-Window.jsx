import './assets/PromptWindows.css'
import React, {useState, useRef} from 'react';
import { useAmount } from './Main-Wheel';
function MinusWindow(){
    const {amount, setAmount} = useAmount();
    const {spentAmount, setSpentAmount} = useAmount();
    const [showPrompt, changePrompt] = useState(false);
    const [errorMessage, setErrorMessage] = useState(false);
    const inputRef = useRef();
    
    function handleMinusClick(){
        changePrompt(true);
    }
    function handleCancelClick(){
        changePrompt(false);
    }
    function handleConfirmClick(){
        const inputValue = inputRef.current.value;
        const NewAmount = Number(inputValue)
        if(NewAmount < 0){
            setErrorMessage(true);
            inputRef.current.value = '';
        }else{
            setAmount(amount - NewAmount);
            setSpentAmount((prevAmount) => prevAmount - NewAmount);
            inputRef.current.value = '';
            changePrompt(false);
        }
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
                <button>MDL</button>
                <button>USD</button>
                <button>EUR</button>
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