import React from 'react';
import { NavLink } from 'react-router-dom';

import './NavigationItem.css';

const navigationItem = ( props ) => (
        <NavLink className="NavigationItem" to={props.link} exact={props.exact}>
            {props.children}
        </NavLink>
);

export default navigationItem;