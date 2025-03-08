import React from "react";
import './assets/History.css'

export default function History(){
    const Income = [{
        name: 'Weekly Allowance',
        ammount: 500
    }];
    const Spendings = [{
        name: 'Water',
        ammount: 6.5
    },
    {
        name: 'Gym Membership',
        ammount: 500
    }
];


    return(
        <div className="history-box">
            <div className="income-box">
                <h1>Income</h1>
                <hr />
                <div className="income-content">
                    {Income.map((item, index) => (
                        <div key={index} className="content-box">
                            <p className="content-name">{item.name}</p>
                            <p className="content-ammount">{item.ammount}</p>
                        </div>
                    ))}
                </div>
            </div>
            <div className="spendings-box">
                <h1>Spending</h1>
                <hr />
                <div className="spendings-content">
                {Spendings.map((item, index) => (
                        <div key={index} className="content-box">
                            <p className="content-name">{item.name}</p>
                            <p className="content-ammount">{item.ammount}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}