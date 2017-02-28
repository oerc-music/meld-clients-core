import update from 'immutability-helper';
import { vrvTk }  from '../containers/app';
import { FETCH_SCORE } from '../actions/index'

export default function(state = {}, action) { 
	switch(action.type) {
	case FETCH_SCORE:
        const svg = vrvTk.renderData(action.payload.data, {
                pageHeight: 1200,
                pageWidth: 2000,
				spacingLinear: 0.1,
				spacingNonLinear: 0.3,
                adjustPageHeight: true,
                scale: 30 
            });
		return update(state, { $merge: { [action.payload.config.url]: svg } });
	default: 
		return state;
	};
};
