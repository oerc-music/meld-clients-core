import axios from 'axios';
import n3 from 'n3';
import jsonld from 'jsonld'

export const FETCH_SCORE = 'FETCH_SCORE';
export const FETCH_TEI = 'FETCH_TEI';
export const FETCH_GRAPH = 'FETCH_GRAPH';
export const FETCH_COMPONENT_TARGET = 'FETCH_COMPONENT_TARGET';
export const PROCESS_ANNOTATION = 'PROCESS_ANNOTATION';
export const REALIZATION_OF = 'http://purl.org/vocab/frbr/core#realizationOf';
export const EXPRESSION = 'http://purl.org/vocab/frbr/core#Expression';
export const PART_OF = 'http://purl.org/vocab/frbr/core#partOf';
export const PART = 'http://purl.org/vocab/frbr/core#part';
export const HAS_STRUCTURE= 'http://meld.linkedmusic.org/terms/hasStructure';
export const SEQ = 'http://www.w3.org/1999/02/22-rdf-syntax-ns#Seq';
export const SEQPART = 'http://www.w3.org/1999/02/22-rdf-syntax-ns#_';

export function fetchScore(uri) { 
	console.log("FETCH_SCORE ACTION on URI: ", uri);
	const promise = axios.get(uri);
	return { 
		type: FETCH_SCORE,
		payload: promise 
	}
}

export function fetchTEI(uri) { 
	const promise = new CETEI().getHTML5(uri);
    return (dispatch) =>  {
        promise.then( (data)  => { 
            dispatch( {
                type: FETCH_TEI,
                payload: {
                    data: data,
                    uri: uri
                }
            });
        });
    }
}

export function fetchSessionGraph(uri) { 
	console.log("FETCH_SESSION_GRAPH ACTION ON URI: ", uri);
	const promise = axios.get(uri);

    return (dispatch) => { 
        promise.then( ({data}) => { 
			console.log("Dispatching: ", data);
            // dispatch the graph data
            dispatch( { 
                type: FETCH_SESSION_GRAPH,
                payload: data
            });
	/*
            // walk through component annotations
            data["@graph"]["ldp:contains"].map( (topLevel) => { 
                topLevel["oa:hasBody"].map( (annotation) => { 
                    dispatch(processComponentAnnotation(annotation)); 
                });

            });
	*/
        });
    }
}

export function fetchGraph(uri) {
	console.log("FETCH_GRAPH ACTION ON URI: ", uri);
	const promise = axios.get(uri);

    return (dispatch) => { 
        promise.then( ({data}) => { 
            // dispatch the graph data
            dispatch( { 
                type: FETCH_GRAPH,
                payload: data
            });
            // walk through component annotations
            data["@graph"]["ldp:contains"].map( (topLevel) => { 
                topLevel["oa:hasBody"].map( (annotation) => { 
                    dispatch(processComponentAnnotation(annotation)); 
                });

            });
        });
    }
}

function processComponentAnnotation(annotation) { 
    const targets = annotation["oa:hasTarget"].map( (target) => {
			return { 
				"@id": target["@id"],
				"@type": target["@type"], 
			}
	});
    return (dispatch) => { 
		targets.map( (target) => {
			dispatch(fetchComponentTarget(target["@id"]))
		});
		dispatch( { 
			type: PROCESS_ANNOTATION,
			payload: { 
				id: annotation["@id"],
				bodies: annotation["oa:hasBody"],
				targets: targets
			}
		});
    }
}


export function fetchComponentTarget(uri) { 
    console.log("FETCH_COMPONENT_TARGET ACTION ON URI: ", uri);
	return (dispatch) => {
		axios.get(uri).then((data) => { 
			jsonld.fromRDF(data.data, (err, doc) => {
				if(err) { console.log("ERROR TRANSLATING NQUADS TO JSONLD: ", err, data.data) }
				else { 
					jsonld.frame(doc, { "@id":uri }, (err, framed) => {
						if(err) { console.log("FRAMING ERROR: ", err) }
						else { 
							dispatch(fetchTargetManifestations(framed));
						}
						
					});
				}
			});
		});
	}
}


export function fetchTargetManifestations(framed) { 
	// traverse from the provided Expression, via a Segment, to Manifestation(s)
	let target = framed["@graph"][0];
	if(target["@type"].includes(EXPRESSION)) { 
		// found an expression
		// does it have any parts?
		let parts = [];
		if(PART in target) { 
			if("@type" in target[PART] && target[PART]["@type"].includes(SEQ)) { 
				// it's an RDF sequence
				Object.keys(target[PART]).map( (part) => { 
					if(part.startsWith(SEQPART)) { 
						console.log("Found part of target sequence: ", target[PART][part]["@id"]);
						parts.push(target[PART][part]["@id"]);
					} 
				});
			} else { 
				console.log("Found part of target: ", target[PART]);
				parts.push(target[PART]["@id"]);
			}
		} else { console.log("Target expression without parts", target); }
		// now fetch the work to continue on to the manifestations associated with these parts
		if(REALIZATION_OF in target) {
			return(dispatch) => { 
				dispatch(fetchWork(parts, target[REALIZATION_OF]["@id"]));
			}
		} else { console.log("Target is an unrealized expression: ", target); }
	} else { console.log("fetchTargetManifestations attempted on a non-Expression! ", target); }
}


export function fetchWork(parts, work) { 
	console.log("STARTING FETCHWORK WITH ", work);
	axios.get(work).then((data) => { 
		console.log("GOT FETCHWORK DATA ", data);
		jsonld.fromRDF(data.data, (err, doc) => {
			if(err) { console.log("ERROR TRANSLATING NQUADS TO JSONLD: ", err, data.data) }
			else { 
				jsonld.frame(doc, { "@id":work}, (err, framed) => {
					if(err) { console.log("FRAMING ERROR: ", err) }
					else { 
						work = framed["@graph"][0];
						console.log("in fetchWork looking at ", work);
						// Check if there is a segment line, in which case fetch manifestations
						// else, check if this is part of another work and recurse
						if(HAS_STRUCTURE in work) { 
							return(dispatch) => { 
								dispatch(fetchManifestations(parts, work[HAS_STRUCTURE]["@id"]));
							}
						} else if(PART_OF in work) { 
							// recurse on that work
							return(dispatch) => {
								dispatch(fetchWork(parts, work[PART_OF]["@id"]));
							}
						} else { 
							console.log("Found work without segmentLine or partonomy! ", work); 
						}
					}
				});
			}
		});
	});
	console.log("NO RETURN: fetchWork");
}

export function fetchManifestations(parts, segline) {
	console.log("Found the segment line!", parts, segline);
	return { 
		type: "TODO"
	}
/*	dispatch( {
		type: FETCH_COMPONENT_TARGET,
		payload:framed
	});
*/
}
