import React from 'react';

import './App.css';
import Header from './components/header';
import Footer from './components/footer';
import Product from './components/product';
import Upload from './components/upload';
import SearchResults from './components/search-results';
import { Provider } from 'react-redux'
import { Router, Route, Switch } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import { createBrowserHistory } from 'history'
import Container from './components/container';
import Admin from './components/admin';
import Checkout from './components/checkout';


const App = ({store}) => {
  const Main = ({match}) => {
    return <Container>
          <Route
          exact 
          path="/"
          render={(routeProps) => (
              <SearchResults {...routeProps} {...store} />
          )}/>
          <Route
          exact 
          path="/product/:id"
          render={(routeProps) => (
              <Product {...routeProps} {...store} />
          )}/>
          <Route
          exact 
          path="/upload"
          render={(routeProps) => (
              <Upload {...routeProps} {...store} />
          )}/>
          <Route
          exact 
          path="/admin"
          render={(routeProps) => (
              <Admin {...routeProps} {...store}/>
          )}/>
           <Route
          exact 
          path="/checkout"
          render={(routeProps) => (
              <Checkout {...routeProps} {...store} />
          )}/>
    </Container>
  }
  return <Provider store={store}>
      <div className="App">
            <Route path="/" component={Main}/>
      </div>
    </Provider>
}

export default App;
