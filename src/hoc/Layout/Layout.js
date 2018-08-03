import React from 'react';

import Navbar from '../../components/Navigation/Navbar/Navbar';

import './Layout.css';

const Layout = (props) => {
    
    return (
            <React.Fragment>
                <Navbar />
                <main className="Content">
                    {props.children}
                </main>
                <div></div>
            </React.Fragment>
        );
}

export default Layout;