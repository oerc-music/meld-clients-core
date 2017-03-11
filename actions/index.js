import axios from 'axios';
import n3 from 'n3';
import jsonld from 'jsonld'

export const FETCH_SCORE = 'FETCH_SCORE';
export const FETCH_TEI = 'FETCH_TEI';
export const FETCH_GRAPH = 'FETCH_GRAPH';
export const FETCH_COMPONENT_TARGET = 'FETCH_COMPONENT_TARGET';
export const PROCESS_ANNOTATION = 'PROCESS_ANNOTATION';

export function fetchScore(uri) { 
	console.log("FETCH_SCORE ACTION on URI: ", uri);
	const promise = axios.get(uri);
	return { 
		type: FETCH_SCORE,
		payload: promise 
	}
}

export function fetchTEI(uri) { 
	console.log("FETCH_TEI ACTION on URI: ", uri);
	const promise = new CETEI().getHTML5(uri);
	return {
		type: FETCH_TEI,
		payload: promise
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


            //data["@graph"]["ldp:contains"][0]["oa:hasBody"][0]["oa:hasTarget"].map(function (t) { 
            //    dispatch(fetchComponentTarget(t["@id"]));
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
							dispatch( {
								type: FETCH_COMPONENT_TARGET,
								payload:framed
							});
						}
						
					});
				}
			});
		});
	}
}

