import React from "react";
import './assets/History.css'
import { useAmount } from "./Main-Wheel";
export default function History(){
    
    const {EarnedHistory, setEarnedHistory, SpentHistory, setSpentHistory} = useAmount();
    return(
        <div className="history-box">
            <div className="income-box">
                <h1>Income</h1>
                <hr />
                <div className="income-content">
                    {EarnedHistory.map((item, index) => (
                        <div key={index} className="content-box">
                            <p className="content-name">{item.name}</p>
                            <p className="content-ammount">{item.amount}</p>
                        </div>
                    ))}
                </div>
            </div>
            <div className="spendings-box">
                <h1>Spending</h1>
                <hr />
                <div className="spendings-content">
                {SpentHistory.map((item, index) => (
                        <div key={index} className="content-box">
                            <p className="content-name">{item.name}</p>
                            <p className="content-ammount">{item.amount}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}