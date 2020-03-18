import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import ReduxPromise from 'redux-promise';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Test from './containers/test';
import { reducers } from './reducers';
const createStoreWithMiddleware = applyMiddleware(thunk, ReduxPromise)(createStore);
ReactDOM.render(React.createElement(Provider, {
  store: createStoreWithMiddleware(reducers)
}, React.createElement(BrowserRouter, null, React.createElement(Switch, null, React.createElement(Route, {
  exact: true,
  path: "/",
  component: Test
})))), document.querySelector('.container'));