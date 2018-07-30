import React, {Component} from 'react';

import Truncate from '../../helpers/truncate';

import './AddStock.css'

class AddStock extends Component {

    state = {
        textInput: ''
    };

    componentDidMount() {
        console.log(localStorage.getItem("stocks"));
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
        this.setState({textInput: Truncate(event.target.value.toUpperCase(), 10)});
    };

    render () {

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
            </div>
        );

    }
};

export default AddStock;