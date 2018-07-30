import React, {Component} from 'react';

import axios from '../../axios/axios-iextrading';
import Stock from './Stock/Stock';
import './Stocks.css'

class Stocks extends Component {

    state = {
        stocks: ["TSLA", "AAPL", "AMZN"],
        stockDetail: []
    }

    myInterval = null;
    isIntervalRunning = false;

    componentDidMount() {

        this.getStockData();

        this.isIntervalRunning = true;
        this.interval = setInterval(async () => {this.getStockData()}, 5000);

        this.setWindowEventHandlers();
    }

    getStockData = () => {   
        axios.get('/batch', {params: {symbols: this.state.stocks.join(',')}})
            .then(response => this.processRealTimeStockData(response.data))
            .catch(err => console.log(err));
    }

    processRealTimeStockData = data => {

        const stockDetail = [];

        if (this.state.stocks.length) {

            this.state.stocks.forEach(ticker => {

                const datum = data[ticker];

                if  (datum && datum.quote) {

                    stockDetail.push({
                        ticker: ticker,
                        openPrice: datum.quote.close,
                        latestPrice: datum.quote.latestPrice
                    });

                }
            });

        }

        this.setState({stockDetail: stockDetail});

    }

    setWindowEventHandlers = () => {

        window.addEventListener("focus", event => {
            console.log('startingInterval');
            this.getStockData();
            if  (!this.isIntervalRunning) {
                this.isIntervalRunning = true;
                this.interval = setInterval(async () => {this.getStockData()}, 5000);
            }
        });
        
        window.addEventListener("blur", event => {
            console.log('clearingInterval');
            clearInterval(this.interval);
            this.isIntervalRunning = false;
        });

    }

    render() {

        let stocks = null;

        if(this.state.stockDetail) {
            stocks = this.state.stockDetail.map(stock => {
                return <Stock key={stock.ticker} tickerSymbol={stock.ticker} openPrice={stock.openPrice} latestPrice={stock.latestPrice}/>
            });
        }

        return (
            <div className="Stocks">
                {stocks}
            </div>
        );
    }
}

export default Stocks;