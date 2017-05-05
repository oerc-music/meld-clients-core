import update from 'immutability-helper';
import { FETCH_SCORE, FETCH_COMPONENT_TARGET, PROCESS_ANNOTATION } from '../actions/index'

const EMBODIMENT = 'http://purl.org/vocab/frbr/core#embodiment';
const MEITYPE = 'http://meld.linkedmusic.org/companion/vocab/MEIEmbodiment';
const AUDIOTYPE ='http://meld.linkedmusic.org/companion/vocab/AudioEmbodiment';
const MEMBER = 'http://www.w3.org/2000/01/rdf-schema#member';

const vrvTk = new verovio.toolkit();


export default function(state = {MEI: {}, componentTargets: {}}, action) { 
	switch(action.type) {
	case FETCH_SCORE:
        const svg = vrvTk.renderData(action.payload.data, {
                pageHeight: 1400,
                pageWidth: 2000,
				spacingLinear: 0.05,
				spacingNonLinear: 0.05,
				spacingStaff: 0.05,
				spacingSystem: 0.05,
				ignoreLayout: true,
                adjustPageHeight: true,
                scale: 36 
            });
		return update(state, {MEI: { $merge: { [action.payload.config.url]: svg } } });

    case FETCH_COMPONENT_TARGET:
		// find the embodibag
		let fragments={};
        let fragtype;
		const target = action.payload["@graph"][0];
        if(EMBODIMENT in target) { 
            if(!Array.isArray(target[EMBODIMENT])) { 
                target[EMBODIMENT] = [target[EMBODIMENT]];
            }
            target[EMBODIMENT].map( (embodiment) => { 
                if(MEMBER in embodiment) {
                // extract set of target fragments
                    // we want to separate out different types of media fragments
                    if(!Array.isArray(embodiment["@type"])) { 
                        embodiment["@type"] = [embodiment["@type"]];
                    }
                    if (embodiment["@type"].includes(MEITYPE)) {
                        fragtype="MEI";
                    } else if (embodiment["@type"].includes(AUDIOTYPE)) { 
                        fragtype="Audio";
                    } else { console.log("Embodiment with unknown type", embodiment); }
                    if(!Array.isArray(embodiment[MEMBER])) { 
                        embodiment[MEMBER] = [embodiment[MEMBER]];
                    }
                    fragments[fragtype] = embodiment[MEMBER].map( (member) => {
                        return member["@id"];
                    });
                } else { console.log("Embodiment without members: ", target, embodiment); }
            });
			return update(state, {componentTargets: { $merge: { [target["@id"]]: fragments } } });
		}
		console.log("FETCH_COMPONENT_TARGET: Unembodied target! ", target);
		return state;
	
	default: 
		return state;
	};
};
