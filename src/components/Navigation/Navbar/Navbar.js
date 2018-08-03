import React from 'react';

import NavigationItem from './NavigationItem/NavigationItem';

import './Navbar.css';

const navbar = () => {
    return (
        <div className="Navbar">
            <div className="GridContainer">
                <div></div>
                <div className="Title"><NavigationItem link="/" exact>Stox</NavigationItem></div>
                <div className="Add"><NavigationItem link="/add-stock" exact>+</NavigationItem></div>
            </div>
        </div>
    );
}

export default navbar;