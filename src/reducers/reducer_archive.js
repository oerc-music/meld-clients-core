import update from 'immutability-helper';

import { ANNOTATION_SKIPPED } from '../actions/meldActions';

export default function(state = {processedAnnotations: {}}, action) {
	switch (action.type) {
	case ANNOTATION_SKIPPED:
//		console.log("Found processed annotation: ", action.payload);
		return update(state, { 
			processedAnnotations: { 
				$merge: { 
					[action.payload["@id"]]: action.payload
				}
			}
		});
	default: 
//		console.log("Unknown action: ", action);
		return state;
	};
};
