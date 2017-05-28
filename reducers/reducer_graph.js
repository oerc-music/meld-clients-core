import update from 'immutability-helper';
import { FETCH_GRAPH, FETCH_COMPONENT_TARGET, CONTAINS } from '../actions/index'

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
		let payload = action.payload;
		if(typeof payload === "string") { 
			payload = JSON.parse(payload);
		}
		if(CONTAINS in payload["@graph"]) { 
			payload["@graph"]["ldp:contains"].map( (a) => {
				a["oa:hasTarget"].map( (targetResource) => { 
					// lookup target IDs to get types and component annotations
					if(targetResource["@id"] in byId) { 
						byId[targetResource["@id"]]["annotations"].push(a["oa:hasBody"]);
					} else { 
						byId[targetResource["@id"]] = {
							"type": targetResource["@type"],
							"annotations": a["oa:hasBody"]
						}
					}
					// lookup target type to get target ID
					if(targetResource["@type"] in byType) { 
						byType[targetResource["@type"]].push({ [targetResource["@id"]]: true });
					} else { 
						byType[targetResource["@type"]] = [{ [targetResource["@id"]]: true }];
					}
				});
			});
		} else { console.log("Graph contains no annotations: ", payload)};
		return update(state, {
            annoGraph: { $set: payload },
            targetsById: { $set: byId },
            targetsByType: { $set: byType }
        });
	default:
		return state;
	}
}
