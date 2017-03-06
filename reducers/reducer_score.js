import update from 'immutability-helper';
import { vrvTk }  from '../containers/app';
import { FETCH_SCORE, FETCH_COMPONENT_TARGET, PROCESS_ANNOTATION } from '../actions/index'

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
    case PROCESS_ANNOTATION:
        action.payload.targets[0].data.then(({data}) => {
            console.log("GOT PROCESS_ANNOTATION: ", data);
        })
        return state;
	default: 
		return state;
	};
};
