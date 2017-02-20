import { combineReducers } from 'redux';
import ScoreReducer from './reducer_score';
import TEIReducer from './reducer_tei';

const rootReducer = combineReducers({
	score: ScoreReducer,
	tei: TEIReducer
});

export default rootReducer;
