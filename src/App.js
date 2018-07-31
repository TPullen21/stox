import React, { Component } from 'react';
import { Route, Switch, NavLink } from 'react-router-dom';
import {NotificationContainer} from 'react-notifications';
import logo from './logo.svg';
import './App.css';
import 'react-notifications/lib/notifications.css';

import Stocks from './components/Stocks/Stocks';
import AddStock from './components/AddStock/AddStock';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Stox</h1>

          <div className="Navlinks">
            <NavLink 
                to={'/'}
                exact={true}
                >Home</NavLink>
            <NavLink 
                to={'/add-stock'}
                exact={true}
                >Add</NavLink>
          </div>
        </header>
        <Switch>
          <Route path="/add-stock" exact component={AddStock} />
          <Route path="/" exact component={Stocks} />
        </Switch>
        <NotificationContainer/>
      </div>
    );
  }
}

export default App;
