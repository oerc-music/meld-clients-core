import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import ReduxPromise from 'redux-promise';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Test from './containers/test';
import { reducers } from './reducers';
const createStoreWithMiddleware = applyMiddleware(thunk, ReduxPromise)(createStore);
ReactDOM.render( /*#__PURE__*/React.createElement(Provider, {
  store: createStoreWithMiddleware(reducers)
}, /*#__PURE__*/React.createElement(BrowserRouter, null, /*#__PURE__*/React.createElement(Switch, null, /*#__PURE__*/React.createElement(Route, {
  exact: true,
  path: "/",
  component: Test
})))), document.querySelector('.container'));