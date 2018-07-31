import React from 'react';

import './Security.css'

const security = (props) => {

    return (
        <div className="Security" onClick={props.clicked}>
            <div className="Ticker">{props.ticker}</div>
            <div className="Name">{props.name}</div>
            <div className="StockExchange">{props.stockExchange}</div>
        </div>
    );
};

export default security;