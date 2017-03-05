import update from 'immutability-helper';
import { FETCH_GRAPH, FETCH_COMPONENT_TARGET } from '../actions/index'

const INIT_STATE = {
    graph: { 
        annoGraph: {}, 
        targetsById: {}, 
        targetsByType: {} 
    }
}

export default function(state = INIT_STATE, action) { 
	switch (action.type) { 
	case FETCH_GRAPH:
        let byId = {};
        let byType = {};
        action.payload["@graph"]["ldp:contains"].map( (a) => {
            a["oa:hasTarget"].map( (targetResource) => { 
                byId[targetResource["@id"]] = targetResource["@type"];
                if(targetResource["@type"] in byType) { 
                    byType[targetResource["@type"]].push({ [targetResource["@id"]]: true });
                } else { 
                    byType[targetResource["@type"]] = [{ [targetResource["@id"]]: true }];
                }
            });
        });
		return update(state, {
            annoGraph: { $set: action.payload },
            targetsById: { $set: byId },
            targetsByType: { $set: byType }
        });
    case FETCH_COMPONENT_TARGET:
        console.log(action.payload);
	default:
		return state;
	}
}
