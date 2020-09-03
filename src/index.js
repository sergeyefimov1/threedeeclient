import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import store from './redux/store'
import { CartProvider } from "react-use-cart";
import { Router, Route, Switch } from 'react-router'
import { createBrowserHistory } from 'history'
import { syncHistoryWithStore } from 'react-router-redux'

let history = syncHistoryWithStore(createBrowserHistory(), store)

ReactDOM.render(
  <Router history={history}>
    <CartProvider>
      <App store={store}/>
    </CartProvider>
  </Router>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
 