import React, {Component} from 'react';

import axios from '../../axios/axios-iextrading';

import Stock from '../Stocks/Stock/Stock';
import News from './News/News';
import Footer from './Footer/Footer';

import './StockDetail.css';

class StockDetail extends Component {

    state = {
        stockDetail: {}
    };

    componentDidMount() {

        axios.get('TSLA/batch', {params: {symbols: 'TSLA', types: 'quote,chart,news', last:'5'}})
            .then(res => this.setState({stockDetail: res.data}))
            .catch(err => console.log(err));

    }

    render () {

        let news = null;

        if (this.state.stockDetail.news) {
            news = this.state.stockDetail.news.map((newsItem, index) => {
                return <News
                    key={index}
                    datetime={newsItem.datetime}
                    source={newsItem.source}
                    headline={newsItem.headline}
                    summary={newsItem.summary}
                    imageURL={newsItem.image}
                    url={newsItem.url}
                    />
            });
        }

        let stock = null;
        let footer = null;

        if (this.state.stockDetail.quote) {
            stock = <Stock 
                        tickerSymbol={this.state.stockDetail.quote.symbol}
                        latestPrice={this.state.stockDetail.quote.latestPrice}
                        openPrice={this.state.stockDetail.quote.close}
                    />

            footer = <Footer
                        companyName={this.state.stockDetail.quote.companyName} />
        }

        return (
            <div className="StockDetail-Root">
                <div className="StockDetail-StockContainer">{stock}</div>
                <div className="StockDetail-Chart"></div>
                <div className="StockDetail-News">
                    {news}
                </div>
                {footer}
            </div>
        );
    }
};

export default StockDetail;