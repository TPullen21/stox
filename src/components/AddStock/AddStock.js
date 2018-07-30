import React, {Component} from 'react';
import _ from 'lodash';

import firebase from '../../axios/axios-firebase';
import Truncate from '../../helpers/truncate';
import Security from './Security/Security';

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
        this.loadRelatedTickers = _.debounce(this.loadRelatedTickers, 1500);
      }
      
    // state = {
    //     textInput: ''
    // };

    

    securities = [];;

    componentDidMount() {
        firebase.get('securities.json')
            .then(response => this.securities = response.data)
            .catch(err => console.log(err));
    }

    addStockHandler = event => {
        event.preventDefault();

        const stocksFromStorage = localStorage.getItem("stocks");

        let stocksToAdd = [];

        if (stocksFromStorage) {
            stocksToAdd = stocksFromStorage.split(',');
        }

        stocksToAdd.push(this.state.textInput);
        localStorage.setItem("stocks", stocksToAdd);
    };

    stockInputChangedHandler = event => {
        const text = Truncate(event.target.value.toUpperCase(), 10);
        this.setState({textInput: text});
        this.loadRelatedTickers();
    };

    loadRelatedTickers() {
        
        const filteredSecuritiesObject = _.pickBy(this.securities, (val, key) => {
            return key.toUpperCase().includes(this.state.textInput.toUpperCase());
        });

        this.setState({filteredSecurities: _.values(filteredSecuritiesObject).slice(0, 10)});

        console.log(this.state.filteredSecurities);
    }

    render () {

        let securities = null;

        if(this.state.filteredSecurities.length) {
            securities = this.state.filteredSecurities.map(sec => {
                return <Security key={sec.ticker} name={sec.securityName} ticker={sec.ticker} stockExchange={sec.stockExchange} />
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
                <div className="ticker-button active">
                    <div onClick={this.addStockHandler}><span>Add</span></div>
                </div>

                {securities}
            </div>
        );

    }
};

export default AddStock;