/* eslint-disable no-unused-vars */
import React from "react";
import './assets/History.css'
import { useAmount } from "./Data";
export default function History(){
    
    const {EarnedHistory, setEarnedHistory, SpentHistory, setSpentHistory} = useAmount();
    return(
        <div className="history-box">
            <div className="income-box">
                <h1>Income</h1>
                <div className="income-content">
                    {EarnedHistory.map((item, index) => (
                        <div key={index} className="content-box">
                            <p className="content-name">{item.name}</p>
                            <p className="content-amount">{item.amount}</p>
                        </div>
                    ))}
                </div>
            </div>
            <div className="line"></div>
            <div className="spendings-box">
                <h1>Spendings</h1>
                <div className="spendings-content">
                {SpentHistory.map((item, index) => (
                        <div key={index} className="content-box">
                            <p className="content-name">{item.name}</p>
                            <p className="content-amount">{item.amount}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}