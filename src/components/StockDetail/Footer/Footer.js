import React from 'react';

import './Footer.css';

const footer = (props) => {
    return (
        <div className="Footer">
            <div className="Name">{props.companyName}</div>
            <div className="ButtonContainer"></div>
        </div>
    );
}

export default footer;