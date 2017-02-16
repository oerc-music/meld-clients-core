import { combineReducers } from 'redux';
import ScoreReducer from './reducer_score';

const rootReducer = combineReducers({
	score: ScoreReducer 
});

export default rootReducer;
