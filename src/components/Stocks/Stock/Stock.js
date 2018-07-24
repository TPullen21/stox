import React from 'react';

import classes from './Stock.css'

const stock = (props) => {

    const percGainValue = (((props.currentPrice / props.openPrice) - 1) * 100).toFixed(2);
    const percGain = percGainValue >= 0 ? "Positive" : "Negative";

    return (
        <div className="Stock">
            <div className="StockTicker">{props.tickerSymbol}</div>
            <div className="CurrentPrice">{props.currentPrice}</div>
            <div className="OpenPrice">{props.openPrice}</div>
            <div className={["PercGain", percGain].join(' ')}>{percGainValue}%</div>
        </div>
    );
};

export default stock;