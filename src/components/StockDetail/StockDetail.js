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

        const ticker = this.props.match.params.id;

        axios.get(ticker + '/batch', {params: {types: 'quote,chart,news', last:'5'}})
            .then(res => this.setState({stockDetail: res.data}))
            .catch(err => console.log(err));

    }

    render () {

        const { stockDetail } = this.state;

        let news = null;

        if (stockDetail.news) {
            news = stockDetail.news.map((newsItem, index) => {
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
        
        if (stockDetail.quote) {
            stock = <Stock 
                        tickerSymbol={stockDetail.quote.symbol}
                        latestPrice={stockDetail.quote.latestPrice}
                        openPrice={stockDetail.quote.close}
                    />

            footer = <Footer
                        companyName={stockDetail.quote.companyName}
                        ticker={stockDetail.quote.symbol} />
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