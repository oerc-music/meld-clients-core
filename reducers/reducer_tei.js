import update from 'immutability-helper';
import { FETCH_TEI, FETCH_COMPONENT_TARGET } from '../actions/index'

const EMBODIMENT = 'http://purl.org/vocab/frbr/core#embodiment';
const ASSOCIATED = "http://example.com/must-revisit-these/associatedWith";

export default function(state = {TEI: {}, componentTargets: {}, fragImages:{}}, action) {
	switch(action.type) { 
	case FETCH_TEI:
		return update(state, { TEI: {$merge: { [action.payload.uri]: action.payload.data } } });
	case FETCH_COMPONENT_TARGET:
		// find associated TEI
		const target = action.payload["@graph"][0];
        if(ASSOCIATED in target) { 
			if(!Array.isArray(target[ASSOCIATED])) { 
				target[ASSOCIATED] = [target[ASSOCIATED]];
			}
            // extract target fragments
            // TODO properly ontologize ASSOCIATED, including differentiating TEI and others
            const fragments = target[ASSOCIATED].map( (assoc) => { 
                return assoc["@id"];
            });
            const targetid = target["@id"];
			console.log("Setting tei fragments: ", fragments);
			// are there any associated images?
			const fragImages = {};
		    target[ASSOCIATED].filter( (assoc) => {
				return EMBODIMENT in assoc
			}).map( (assoc) => { 
				fragImages[assoc["@id"]] = assoc[EMBODIMENT]["@id"];
			})
			console.log("TARGET ID IS ", target["@id"]);
            return update(state, {
				componentTargets: { $set: { [target["@id"]]: fragments }},
				fragImages: { $merge: fragImages }
		 	});
        }
        console.log("FETCH_COMPONENT_TARGET: Unassociated target! ", target);
        return state;
	default:
		return state;
	};
};
