import React from 'react';

import Stock from './Stock/Stock';
import './Stocks.css'

const stocks = () => {

    return (
        <div className="Stocks">
            <Stock tickerSymbol="TSLA" openPrice="300" currentPrice="309"/>
            <Stock tickerSymbol="GOOG" openPrice="1050" currentPrice="1000"/>
            <Stock tickerSymbol="AMZN" openPrice="1780" currentPrice="1830"/>
        </div>
    );
};

export default stocks;