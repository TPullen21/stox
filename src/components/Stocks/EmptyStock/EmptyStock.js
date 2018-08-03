import React from 'react';

import '../Stock/Stock.css';
import './EmptyStock.css';

const emptyStock = props => <div className="Stock EmptyStock Hoverable" onClick={props.clicked}></div>;

export default emptyStock;