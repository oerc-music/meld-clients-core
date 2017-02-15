import { combineReducers } from 'redux';
import ScoresReducer from './reducer_scores';

const rootReducer = combineReducers({
	scores: ScoresReducer 
});

export default rootReducer;
