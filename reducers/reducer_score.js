import update from 'immutability-helper';
import { FETCH_SCORE, FETCH_MANIFESTATIONS, PROCESS_ANNOTATION } from '../actions/index'

const EMBODIMENT = 'http://purl.org/vocab/frbr/core#embodiment';
const MEITYPE = 'http://meld.linkedmusic.org/terms/MEIEmbodiment';
const AUDIOTYPE = 'http://meld.linkedmusic.org/terms/AudioEmbodiment';
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

    case FETCH_MANIFESTATIONS:
		const target = action.payload.target["@graph"][0];
		const part = action.payload.part["@graph"][0];
		console.log("In FETCH_MANIFESTATIONS SCORE, target is: ", target, " part is: ", part);
		let fragments={};
		// go through each part, finding embodibags
		if(EMBODIMENT in part) { 
			if(!Array.isArray(part[EMBODIMENT])) { 
				part[EMBODIMENT] = [part[EMBODIMENT]];
			}
			part[EMBODIMENT].map( (embodiment) => { 
				// go through each embodiment
				if(MEMBER in embodiment) {
					let fragtype;
					// extract set of fragments
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
				} else { console.log("Embodiment without members: ", part, embodiment); }
			});
			console.log("Updating state: ");
			console.log( update(state, {componentTargets: { $merge: { [target["@id"]]: fragments } } }));
			return update(state, {componentTargets: { $merge: { [target["@id"]]: fragments } } });
		};
		console.log("FETCH_COMPONENT_TARGET: Unembodied target! ", target);
		return state;
	
	default: 
		return state;
	};
};
