import update from 'immutability-helper';
import { vrvTk }  from '../containers/app';
import { FETCH_SCORE, FETCH_COMPONENT_TARGET, PROCESS_ANNOTATION } from '../actions/index'

const EMBODIMENT = 'http://purl.org/vocab/frbr/core#embodiment';
const MEITYPE = 'http://meld.linkedmusic.org/companion/vocab/MEIEmbodiment';
const AUDIOTYPE ='http://meld.linkedmusic.org/companion/vocab/AudioEmbodiment';
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
		let fragments={};
        let fragtype;
		const target = action.payload["@graph"][0];
        console.log("I'm looking at the target: ", target);
        if(EMBODIMENT in target) { 
            if(!Array.isArray(target[EMBODIMENT])) { 
                target[EMBODIMENT] = [target[EMBODIMENT]];
            }
            target[EMBODIMENT].map( (embodiment) => { 
                if(MEMBER in embodiment) {
                // extract set of target fragments
                    console.log("LOOKING AT embodiment: ", embodiment); 
                    // we want to separate out different types of media fragments
                    if(!Array.isArray(embodiment["@type"])) { 
                        embodiment["@type"] = [embodiment["@type"]];
                    }
                    console.log("TYPES ARRAY: ", embodiment["@type"]);
                    if (embodiment["@type"].includes(MEITYPE)) {
                        console.log("FOUND MEI TYPE", embodiment)
                        fragtype="MEI";
                    } else if (embodiment["@type"].includes(AUDIOTYPE)) { 
                        console.log("FOUND AUDIO TYPE", embodiment)
                        fragtype="Audio";
                    } else { console.log("Embodiment with unknown type", embodiment); }
                    if(!Array.isArray(embodiment[MEMBER])) { 
                        embodiment[MEMBER] = [embodiment[MEMBER]];
                    }
                    fragments[fragtype] = embodiment[MEMBER].map( (member) => {
                        return member["@id"];
                    });
                } else { console.log("Embodiment without members: ", embodiment); }
            });
            console.log("Updating with ", target["@id"], fragments);
			return update(state, {componentTargets: { $merge: { [target["@id"]]: fragments } } });
		}
		console.log("FETCH_COMPONENT_TARGET: Unembodied target! ", target);
		return state;
	
	default: 
		return state;
	};
};
