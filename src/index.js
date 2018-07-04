import React, { Component }  from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import ReduxPromise from 'redux-promise';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import App from './containers/app';
import Jam from './containers/jam';
import Climb from './containers/climb';
import StartTheClimb from './containers/startTheClimb';
import StartTheJam from './containers/startTheJam';
import ClimbArchive from './containers/climbArchive';
import ForbiddenQuestion from './containers/musicology/forbiddenQuestion';
import Rheingold from './containers/musicology/rheingold';
import Carousel from './containers/musicology/demo/carousel';
import ModalTest from './containers/modalTest';
import { reducers } from './reducers';

const createStoreWithMiddleware = applyMiddleware(thunk, ReduxPromise)(createStore);

ReactDOM.render(
	<Provider store={createStoreWithMiddleware(reducers)}>
		<BrowserRouter> 
			<Switch>
				<Route exact path="/" component={App} />
				<Route exact path="/jam" component={Jam} />
				<Route exact path="/test" component={ModalTest} />
				<Route exact path="/Climb" component={Climb} />
				<Route exact path="/StartTheClimb" component={StartTheClimb} />
				<Route exact path="/StartTheJam" component={StartTheJam} />
				<Route exact path="/ClimbArchive" component={ClimbArchive} />
				<Route exact path="/Demo/Rheingold" component={Rheingold}/>
				<Route exact path="/TimeMachine" component={Carousel}/>
				<Route exact path="/ForbiddenQuestion" component={ForbiddenQuestion}/>
			</Switch>
		</BrowserRouter>
	</Provider>
	, document.querySelector('.container'));
