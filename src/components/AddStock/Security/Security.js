import React from 'react';

import './Security.css'

const security = (props) => {

    return (
        <div className="Security">
            <div className="Ticker">{props.ticker}</div>
            <div className="Name">{props.name}</div>
            <div className="StockExchange">{props.stockExchange}</div>
        </div>
    );
};

export default security;