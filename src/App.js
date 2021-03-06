import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import {NotificationContainer} from 'react-notifications';
import './App.css';
import 'react-notifications/lib/notifications.css';

import Layout from './hoc/Layout/Layout';
import Stocks from './components/Stocks/Stocks';
import AddStock from './components/AddStock/AddStock';
import StockDetail from './components/StockDetail/StockDetail'
import NotFound from './components/Error/NotFound/NotFound';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Layout>
          <Switch>
            <Route path="/add-stock" exact component={AddStock} />
            <Route path="/stocks/:id" component={StockDetail} />
            <Route path="/" exact component={Stocks} />
            <Route path="/" component={NotFound} />
          </Switch>
        </Layout>
        <NotificationContainer/>
      </div>
    );
  }
}

export default App;
