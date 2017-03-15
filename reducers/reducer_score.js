import update from 'immutability-helper';
import { vrvTk }  from '../containers/app';
import { FETCH_SCORE, FETCH_COMPONENT_TARGET, PROCESS_ANNOTATION } from '../actions/index'

const EMBODIMENT = 'http://purl.org/vocab/frbr/core#embodiment';
const MEMBER = 'http://www.w3.org/2000/01/rdf-schema#member';

export default function(state = {MEI: {}, componentTargets: {}}, action) { 
	switch(action.type) {
	case FETCH_SCORE:
        const svg = vrvTk.renderData(action.payload.data, {
                pageHeight: 1500,
                pageWidth: 2000,
				spacingLinear: 0.1,
				spacingNonLinear: 0.3,
				spacingStaff: 0.1,
				spacingSystem: 0.1,
				noLayout: true,
                adjustPageHeight: true,
                scale: 30 
            });
		return update(state, {MEI: { $merge: { [action.payload.config.url]: svg } } });

    case FETCH_COMPONENT_TARGET:
		// find the embodibag
		let fragments;
		const target = action.payload["@graph"][0];
		if(EMBODIMENT in target && MEMBER in target[EMBODIMENT] ) { 
			// extract set of target fragments
			console.log("LOOKING AT TARGET: ", target[EMBODIMENT]);
			if(Array.isArray(target[EMBODIMENT][MEMBER])) { 
				fragments = target[EMBODIMENT][MEMBER].map( (member) => {
					return member["@id"];
				});
			} else { 
				fragments = [ target[EMBODIMENT][MEMBER]["@id"] ]; // only one fragment
			}
			return update(state, {componentTargets: { $merge: { [target["@id"]]: fragments } } });
		}
		console.log("FETCH_COMPONENT_TARGET: Unembodied target! ", target);
		return state;
	
	default: 
		return state;
	};
};
