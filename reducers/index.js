import { combineReducers } from 'redux';
import GraphReducer from './reducer_graph';
import ScoreReducer from './reducer_score';
import TEIReducer from './reducer_tei';

const rootReducer = combineReducers({
	graph: GraphReducer,
	score: ScoreReducer,
	tei: TEIReducer
});

export default rootReducer;
