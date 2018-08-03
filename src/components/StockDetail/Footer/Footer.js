import React, { Component } from 'react';
import { NotificationManager } from 'react-notifications';
import _ from 'lodash';

import LocalStorage from '../../../helpers/LocalStorage';

import './Footer.css';

class Footer extends Component {

    state = {
        stored: false,
        ticker: null
    }

    componentDidMount() {
        const { ticker } = this.props;
        
        if ( ticker ) {
            this.setState({ stored: _.includes(LocalStorage.getStocks(), ticker), ticker: ticker });

        }
    }

    addRemoveStockClickedHandler = () => {

        const { ticker } = this.state;
        const { companyName } = this.props;

        if (_.includes(LocalStorage.getStocks(), ticker)) {
            LocalStorage.removeStock(ticker);
            this.setState({ stored: false });
            NotificationManager.warning('Removed ' + companyName, ticker, 2500);
        }
        else {
            LocalStorage.addStock(ticker);
            this.setState({ stored: true });
            NotificationManager.success('Added ' + companyName, ticker, 2500);
        }
    };

    render () {
            return (
            <div className="Footer-Root">
                <div className="Footer-Name">{this.props.companyName}</div>
                <div className="Footer-Button">		
                    <div onClick={this.addRemoveStockClickedHandler}><span>{this.state.stored ? 'Remove' : 'Add'}</span></div>		
                </div>
                <div className="Footer-ButtonContainer"></div>
            </div>
        );
    }

}

export default Footer;