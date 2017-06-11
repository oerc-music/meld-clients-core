import update from 'immutability-helper';
import { FETCH_SCORE, FETCH_RIBBON_CONTENT, FETCH_MANIFESTATIONS, PROCESS_ANNOTATION, REGISTER_PUBLISHED_PERFORMANCE_SCORE } from '../actions/index'

const EMBODIMENT = 'http://purl.org/vocab/frbr/core#embodiment';
const MEITYPE = 'http://meld.linkedmusic.org/terms/MEIEmbodiment';
const AUDIOTYPE = 'http://meld.linkedmusic.org/terms/AudioEmbodiment';
const MEMBER = 'http://www.w3.org/2000/01/rdf-schema#member';

const vrvTk = new verovio.toolkit();


export default function(state = {MEI: {}, componentTargets: {}, scoreMapping:{} }, action) {
	switch(action.type) {
	case FETCH_SCORE:
        const svg = vrvTk.renderData(action.payload.data, {
                pageHeight: 2000,//1400
                pageWidth: 1700,//2000,
				spacingLinear: 0.05,
				spacingNonLinear: 0.05,
				spacingStaff: 0.05,
				spacingSystem: 0.05,
				ignoreLayout: true,
                adjustPageHeight: true,
                scale: 35 //33 <==36
            });
		return update(state, {MEI: { $merge: { [action.payload.config.url]: svg } } });

	case FETCH_RIBBON_CONTENT:
		var orch =  new Orchestration(action.payload.data);
		var svgRibbon = orch.drawOrchestration(false, 600, 700, 400, 800);
		return update(state, {MEI: { $merge: {[action.payload.config.url]: svgRibbon.innerHTML}}});

    case FETCH_MANIFESTATIONS:
		const target = action.payload.target["@graph"][0];
		const part = action.payload.part["@graph"][0];
		if(typeof part === "undefined") {
			// part wasn't on segment line
			return state;
		}

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
					fragments[fragtype] = fragments[fragtype] || [];
					fragments[fragtype] = fragments[fragtype].concat(embodiment[MEMBER].map( (member) => {
						return member["@id"];
					}));
				} else { console.log("Embodiment without members: ", part, embodiment); }
			});
			console.log("Updating state: ");
			console.log( update(state, {componentTargets: { $merge: { [target["@id"]]: fragments } } }));
			return update(state, {componentTargets: { $merge: { [target["@id"]]: fragments } } });
		};
		console.log("FETCH_COMPONENT_TARGET: Unembodied target! ", target);
		return state;

	case REGISTER_PUBLISHED_PERFORMANCE_SCORE:
		console.log("Register published performance score: ", action.payload, "on state: ", state);
		let conceptualScore;
		if(action.payload.conceptualScore["@id"] in state.scoreMapping) { 
			// we already know this conceptual score
			// do we already know about the published score for this performance medium?
			if(action.payload.performanceMedium["@id"] in state.scoreMapping[action.payload.publishedScore["@id"]]) {
				// yes; so nothing to do. FIXME: should we cater for multiple published scores for same performance medium?
				return state; 
			} else { 
				// no; so register the published score for this new performance medium
				return update(state, {
					scoreMapping: {
						[action.payload.publishedScore["@id"]]: {
							$merge: {
								[action.payload.performanceMedium["@id"]]: action.payload.conceptualScore["@id"]
							}
						}
					}
				})
			}
		} else { 
			// first time we see this conceptual score
			// so attach the published score according to performance medium
			return update(state, {
				scoreMapping: { 
					$merge: {
						[action.payload.publishedScore["@id"]]: {
							[action.payload.performanceMedium["@id"]]: action.payload.conceptualScore["@id"]
						}
					}
				}
			});
		} 	

	default: 
		return state;
	};
};
