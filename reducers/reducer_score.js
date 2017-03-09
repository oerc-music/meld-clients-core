import update from 'immutability-helper';
import { vrvTk }  from '../containers/app';
import { FETCH_SCORE, FETCH_COMPONENT_TARGET, PROCESS_ANNOTATION } from '../actions/index'

const EMBODIMENT = 'http://purl.org/vocab/frbr/core#embodiment';
const MEMBER = 'http://www.w3.org/2000/01/rdf-schema#member';

export default function(state = {MEI: {}, componentTargets: {}}, action) { 
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
		return update(state, {MEI: { $merge: { [action.payload.config.url]: svg } } });

    case FETCH_COMPONENT_TARGET:
		// find the embodibag
		const target = action.payload["@graph"][0];
		if(EMBODIMENT in target && MEMBER in target[EMBODIMENT] ) { 
			// extract set of target fragments
			const fragments = target[EMBODIMENT][MEMBER].map( (member) => {
				return member["@id"];
			});
			return update(state, {componentTargets: { $merge: { [target["@id"]]: fragments } } });
		}
		console.log("FETCH_COMPONENT_TARGET: Unembodied target! ", target);
		return state;
	
	default: 
		return state;
	};
};
