import React, { Component }  from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import ReduxPromise from 'redux-promise';
import { Router, Route, browserHistory } from 'react-router'

import App from './containers/app';
import Jam from './containers/jam';
import reducers from './reducers';

const createStoreWithMiddleware = applyMiddleware(thunk, ReduxPromise)(createStore);

ReactDOM.render(
	<Provider store={createStoreWithMiddleware(reducers)}>
		<Router history={browserHistory}> 
			<Route path="/" component={App} />
			<Route path="/jam" component={Jam} />
		</Router>
	</Provider>
	, document.querySelector('.container'));
