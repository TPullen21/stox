import React, {Component} from 'react';
import {NotificationContainer, NotificationManager} from 'react-notifications';
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

    securities = [];;

    componentDidMount() {
        firebase.get('securities.json')
            .then(response => this.securities = response.data)
            .catch(err => console.log(err));
    }

    addStockHandler = (ticker, name) => {
        LocalStorage.addStock(ticker);
        NotificationManager.success('Added ' + name, ticker, 1500);
    };

    stockInputChangedHandler = event => {
        const text = Truncate(event.target.value.toUpperCase(), 10);
        this.setState({textInput: text});
        this.loadRelatedTickers();
    };

    loadRelatedTickers() {

        if (!this.state.textInput.length) {
            this.setState({filteredSecurities: []});
            return;
        }
        
        const filteredSecuritiesObject = _.pickBy(this.securities, (val, key) => {
            return key.toUpperCase().includes(this.state.textInput.toUpperCase());
        });

        this.setState({filteredSecurities: _.values(filteredSecuritiesObject).slice(0, 10)});
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
                    clicked={() => this.addStockHandler(sec.ticker, sec.securityName)} />
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