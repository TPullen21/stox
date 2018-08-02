import React from 'react';

import './Footer.css';

const footer = (props) => {
    return (
        <div className="Footer-Root">
            <div className="Footer-Name">{props.companyName}</div>
            <div className="Footer-ButtonContainer"></div>
        </div>
    );
}

export default footer;