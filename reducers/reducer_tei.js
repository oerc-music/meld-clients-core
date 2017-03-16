import update from 'immutability-helper';
import { FETCH_TEI, FETCH_COMPONENT_TARGET } from '../actions/index'

const ASSOCIATED = "http://example.com/must-revisit-these/associatedWith";

export default function(state = {TEI: {}, componentTargets: {}}, action) {
	switch(action.type) { 
	case FETCH_TEI:
		return update(state, { TEI: {$merge: { [action.payload.uri]: action.payload.data } } });
	case FETCH_COMPONENT_TARGET:
		// find associated TEI
		const target = action.payload["@graph"][0];
        if(ASSOCIATED in target) { 
            // extract target fragments
            // TODO properly ontologize ASSOCIATED, including differentiating TEI and others
            const fragments = target[ASSOCIATED].map( (assoc) => { 
                return assoc["@id"];
            });
            const targetid = target["@id"];
            return update(state, {componentTargets: { $set: { [target["@id"]]: fragments } } });
        }
        console.log("FETCH_COMPONENT_TARGET: Unassociated target! ", target);
        return state;
	default:
		return state;
	};
};
