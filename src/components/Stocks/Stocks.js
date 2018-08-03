import React, { Component } from 'react';

import axios from '../../axios/axios-iextrading';
import LocalStorage from '../../helpers/LocalStorage';
import Stock from './Stock/Stock';
import EmptyStock from './EmptyStock/EmptyStock';

import './Stocks.css'

class Stocks extends Component {

    state = {
        stocks: [],
        stockDetail: [],
        noStocks: false
    }

    myInterval = null;
    isIntervalRunning = false;

    componentDidMount() {

        const stocks = LocalStorage.getStocks();

        this.setState({stocks: stocks});

        if(stocks.length) {

            this.getStockData(stocks);
    
            this.isIntervalRunning = true;
            //this.interval = setInterval(async () => {this.getStockData()}, 5000);
    
            //this.setWindowEventHandlers();

        }
        else {
            this.setState({ noStocks: true });
        }
    }

    getStockData = stocks => {   
        
        console.log(this.state.stocks);
        console.log(stocks);
        
        axios.get('/market/batch', {params: {symbols: (stocks || this.state.stocks).join(',')}})
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

    stockClickedHandler = ticker => {
        this.props.history.push( '/stocks/' + ticker );
    }

    addStockClickedHandler = () => {
        this.props.history.push( '/add-stock' );
    }

    render() {

        let stocks = null;
        let noStocksMessage = null;

        if(this.state.stockDetail && this.state.stockDetail.length) {
            stocks = this.state.stockDetail.map(stock => {
                return (
                    <Stock
                        key={stock.ticker}
                        tickerSymbol={stock.ticker}
                        openPrice={stock.openPrice}
                        latestPrice={stock.latestPrice}
                        clicked={() => this.stockClickedHandler(stock.ticker)}
                        hoverable
                    />
                );
            });
        } else if (this.state.noStocks) {
            stocks = <EmptyStock clicked={this.addStockClickedHandler}/>;

            noStocksMessage = (
                <div className="NoStocksMessage">Welcome to Stox, a stock tracker and viewing tool. To get started add a stock below!</div>
            );
        }

        return (
            <React.Fragment>
                <div className="Stocks">
                    {noStocksMessage}
                    <div className="Stocks-Container">
                        {stocks}
                    </div>
                </div>
                <footer className="Footer">API by iextrading.com</footer>
            </React.Fragment>
        );
    }
}

export default Stocks;