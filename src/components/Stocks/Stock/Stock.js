import React from 'react';

import './Stock.css'

const stock = (props) => {

    const percGainValue = (((props.latestPrice / props.openPrice) - 1) * 100).toFixed(2);
    const percGain = percGainValue >= 0 ? "Positive" : "Negative";

    const stockClassNames = ['Stock'];

    if (props.hoverable) {
        stockClassNames.push('Hoverable');
    }

    return (
        <div className={stockClassNames.join(' ')} onClick={props.clicked}>
            <div className="StockTicker">{props.tickerSymbol}</div>
            <div className="CurrentPrice">{props.latestPrice.toFixed(2)}</div>
            <div className="OpenPrice">{props.openPrice.toFixed(2)}</div>
            <div className={["PercGain", percGain].join(' ')}>{percGainValue}%</div>
        </div>
    );
};

export default stock;