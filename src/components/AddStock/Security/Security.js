import React, {Component} from 'react';

import './Security.css'

class Security extends Component {

    state = {
        stored: false
    }

    componentDidMount() {
        if(this.props.stored) {
            this.setState({stored: true});
        }
    }

    securityClicked = () => {

        this.setState({stored: !this.state.stored});
        this.props.clicked();
    }


    render () {

        const securityClassName = ['Security'];
    
        if(this.state.stored) {
            securityClassName.push('Stored');
        }

        return (
            <div className={securityClassName.join(' ')} onClick={this.securityClicked}>
                <div className="Ticker">{this.props.ticker}</div>
                <div className="Name">{this.props.name}</div>
                <div className="StockExchange">{this.props.stockExchange}</div>
            </div>
        );

    }
}

export default Security;