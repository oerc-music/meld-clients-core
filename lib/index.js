"use strict";

var _react = _interopRequireDefault(require("react"));

var _reactDom = _interopRequireDefault(require("react-dom"));

var _reactRedux = require("react-redux");

var _redux = require("redux");

var _reduxThunk = _interopRequireDefault(require("redux-thunk"));

var _reduxPromise = _interopRequireDefault(require("redux-promise"));

var _reactRouterDom = require("react-router-dom");

var _test = _interopRequireDefault(require("./containers/test"));

var _reducers = require("./reducers");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var createStoreWithMiddleware = (0, _redux.applyMiddleware)(_reduxThunk["default"], _reduxPromise["default"])(_redux.createStore);

_reactDom["default"].render( /*#__PURE__*/_react["default"].createElement(_reactRedux.Provider, {
  store: createStoreWithMiddleware(_reducers.reducers)
}, /*#__PURE__*/_react["default"].createElement(_reactRouterDom.BrowserRouter, null, /*#__PURE__*/_react["default"].createElement(_reactRouterDom.Switch, null, /*#__PURE__*/_react["default"].createElement(_reactRouterDom.Route, {
  exact: true,
  path: "/",
  component: _test["default"]
})))), document.querySelector('.container'));