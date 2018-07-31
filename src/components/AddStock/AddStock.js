import React, {Component} from 'react';
import {NotificationManager} from 'react-notifications';
import _ from 'lodash';

import firebase from '../../axios/axios-firebase';
import Truncate from '../../helpers/truncate';
import Security from './Security/Security';
import LocalStorage from '../../helpers/LocalStorage';

import './AddStock.css'

class AddStock extends Component {

    constructor(props) {

        super(props);

        this.state = {
            textInput: '',
            filteredSecurities: []
        };
      
        this.loadRelatedTickers = this.loadRelatedTickers.bind(this);
      
        // Debounce
        this.loadRelatedTickers = _.debounce(this.loadRelatedTickers, 300);
    }

    securities = [];
    storedSecurities = [];

    componentDidMount() {
        firebase.get('securities.json')
            .then(response => this.securities = response.data)
            .catch(err => console.log(err));

        this.storedSecurities = LocalStorage.getStocks();
    }

    stockClickedHandler = (ticker, name) => {
        if (_.includes(LocalStorage.getStocks(), ticker)) {
            LocalStorage.removeStock(ticker);
            _.remove(this.storedSecurities, ticker);
            NotificationManager.warning('Removed ' + name, ticker, 2500);
        }
        else {
            LocalStorage.addStock(ticker);
            this.storedSecurities.push(ticker);
            NotificationManager.success('Added ' + name, ticker, 2500);
        }
    };

    stockInputChangedHandler = event => {
        const text = Truncate(event.target.value.toUpperCase(), 10);
        this.setState({textInput: text});
        this.loadRelatedTickers();
    };

    loadRelatedTickers() {

        // Order it in the format:
        // Exact Match
        // Starts With Matches
        // Remaining 'LIKE' Matches
        const ticker = this.state.textInput;

        if (!ticker.length) {
            this.setState({filteredSecurities: []});
            return;
        }
        
        const fsIncludesTicker = _.pickBy(this.securities, (val, key) => {
            return key.toUpperCase().includes(ticker);
        });

        const filteredSecurities = [];

        if (fsIncludesTicker[ticker])
            filteredSecurities.push(fsIncludesTicker[ticker]);

        const filteredSecuritiesStartsWithTicker = _.pickBy(this.securities, (val, key) => {
            return key.toUpperCase().startsWith(ticker) && key.toUpperCase() !== ticker;
        });

        const fsStartsWithTickerArr = _.values(filteredSecuritiesStartsWithTicker);

        filteredSecurities.push(...fsStartsWithTickerArr);

        if (filteredSecurities.length >= 10) {
            this.setState({filteredSecurities: filteredSecurities.slice(0, 10)});
            return;
        }

        const fsRemainingTickers = _.xor(_.values(fsIncludesTicker), fsStartsWithTickerArr);
        _.remove(fsRemainingTickers, filteredSecurities[0]);

        filteredSecurities.push(...fsRemainingTickers);

        this.setState({filteredSecurities: filteredSecurities.slice(0, 10)});
    }

    render () {

        let securities = null;

        if(this.state.filteredSecurities.length) {
            securities = this.state.filteredSecurities.map(sec => {
                return <Security
                    key={sec.ticker}
                    name={sec.securityName}
                    ticker={sec.ticker}
                    stockExchange={sec.stockExchange}
                    stored={_.includes(this.storedSecurities, sec.ticker)}
                    clicked={() => this.stockClickedHandler(sec.ticker, sec.securityName)} />
            });
        }

        return (
            <div className="AddStock">
                <div id="ticker-input" className="modern">
                    <input
                        type="text"
                        placeholder="ticker"
                        value={this.state.textInput}
                        onChange={this.stockInputChangedHandler} />
                </div>

                {securities}
            </div>
        );

    }
};

export default AddStock;