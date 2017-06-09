import axios from 'axios';
import n3 from 'n3';
import jsonld from 'jsonld'

export const FETCH_SCORE = 'FETCH_SCORE';
export const FETCH_RIBBON_CONTENT = 'FETCH_RIBBON_CONTENT';
export const FETCH_TEI = 'FETCH_TEI';
export const FETCH_GRAPH = 'FETCH_GRAPH';
export const FETCH_WORK = 'FETCH_WORK';
export const FETCH_TARGET_EXPRESSION = 'FETCH_TARGET_EXPRESSION';
export const FETCH_COMPONENT_TARGET = 'FETCH_COMPONENT_TARGET';
export const FETCH_STRUCTURE = 'FETCH_STRUCTURE';
export const FETCH_MANIFESTATIONS = 'FETCH_MANIFESTATIONS';
export const PROCESS_ANNOTATION = 'PROCESS_ANNOTATION';
export const REGISTER_PUBLISHED_PERFORMANCE_SCORE= 'REGISTER_PUBLISHED_PERFORMANCE_SCORE';
export const REALIZATION_OF = 'http://purl.org/vocab/frbr/core#realizationOf';
export const EXPRESSION = 'http://purl.org/vocab/frbr/core#Expression';
export const PART_OF = 'http://purl.org/vocab/frbr/core#partOf';
export const PART = 'http://purl.org/vocab/frbr/core#part';
export const HAS_STRUCTURE= 'http://meld.linkedmusic.org/terms/hasStructure';
export const SEQ = 'http://www.w3.org/1999/02/22-rdf-syntax-ns#Seq';
export const SEQPART = 'http://www.w3.org/1999/02/22-rdf-syntax-ns#_';
export const SCORE = 'http://purl.org/ontology/mo/Score';
export const PUBLISHED_AS = 'http://purl.org/ontology/mo/published_as';
export const HAS_PERFORMANCE_MEDIUM = 'http://rdaregistry.info/Elements/e/p20215';

export function fetchScore(uri) { 
	console.log("FETCH_SCORE ACTION on URI: ", uri);
	const promise = axios.get(uri);
	return { 
		type: FETCH_SCORE,
		payload: promise 
	}
}

export function fetchRibbonContent(uri) {
	console.log("FETCH_SCORE ACTION on URI: ", uri);
	const promise = axios.get(uri);
	return {
		type: FETCH_RIBBON_CONTENT,
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
			console.log("~~~",data);
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
			dispatch( { 
				type: FETCH_COMPONENT_TARGET,
				payload: data
			});
			jsonld.fromRDF(data.data, (err, doc) => {
				if(err) { console.log("ERROR TRANSLATING NQUADS TO JSONLD: ", err, data.data) }
				else { 
					jsonld.frame(doc, { "@id":uri }, (err, framed) => {
						if(err) { console.log("FRAMING ERROR in fetchComponentTarget: ", err) }
						else { 
							dispatch(fetchTargetExpression(framed));
						}
						
					});
				}
			});
		});
	}
}


export function fetchTargetExpression(framed) { 
	// traverse from the provided Expression, via a Segment, to Manifestation(s)
	return(dispatch) => { 
		dispatch( { 
			type: FETCH_TARGET_EXPRESSION,
			payload: framed
		});
		let target = framed["@graph"][0];
		if(target["@type"].includes(EXPRESSION)) { 
			// found an expression
			// does it have any parts?
			let parts = [];
			console.log("part check: ", target)
			if(PART in target) { 
				// sometimes we may have multiple parts or part sequences; sometimes only one
				// so ensure we have an array to work with (even if it's length one)
				if(! Array.isArray(target[PART])) { 
					target[PART] = [target[PART]];
				}
				// now process each sequence
				target[PART].map((p) => { 
					if("@type" in p && p["@type"].includes(SEQ)) { 
						// it's an RDF sequence
						Object.keys(p).map( (part) => { 
							if(part.startsWith(SEQPART)) { 
								parts.push(p[part]["@id"]);
							} 
						});
					} else { 
						parts.push(p["@id"]);
					}
				});
				// now fetch the work to continue on to the manifestations associated with these parts
				if(REALIZATION_OF in target) {
					dispatch(fetchWork(framed, parts, target[REALIZATION_OF]["@id"]));
				} else { console.log("Target is an unrealized expression: ", target); }
			} else { console.log("Target expression without parts", target); }
		} else { console.log("fetchTargetExpression attempted on a non-Expression! ", target); }
	}
}


export function fetchWork(target, parts, work) { 
	console.log("STARTING FETCHWORK WITH ", work, parts);
	return(dispatch) => {
		dispatch({
			type: FETCH_WORK,
			payload: { 
				target: target,
				parts: parts,
				works: work
			}
		});
		axios.get(work).then((data) => { 
			jsonld.fromRDF(data.data, (err, doc) => {
				if(err) { console.log("ERROR TRANSLATING NQUADS TO JSONLD: ", err, data.data) }
				else { 
					jsonld.frame(doc, { "@id":work}, (err, framed) => {
						if(err) { console.log("FRAMING ERROR in fetchWork:", err) }
						else { 
							work = framed["@graph"][0];
							// Check if there is a segment line, in which case fetch manifestations
							// else, check if this is part of another ("parent") work 
							if(HAS_STRUCTURE in work) { 
									dispatch(fetchStructure(target, parts, work[HAS_STRUCTURE]["@id"]));
							} else if(PART_OF in work) {
								// does our doc attach a Score which realizes the parent work?
								jsonld.frame(doc, { [REALIZATION_OF]: work[PART_OF]["@id"] }, (err, framed) => {
									if(err) { console.log("FRAMING ERROR when fetching parent work", err) }
									else {
										const attachedScore = framed["@graph"][0];
										if(attachedScore && "@type" in attachedScore && attachedScore["@type"] === SCORE) {
											// FIXME breaks with multiple types
											// Found an attached Score!!!
											if(PUBLISHED_AS in attachedScore) { 
												// for now: assume published scores
												// are attached in same file
												// FIXME enable external pub_scores
												attachedScore[PUBLISHED_AS].map( (pubScore) => {
													console.log("FOUND PUB SCORE: ", pubScore);
													if(HAS_PERFORMANCE_MEDIUM in pubScore) { 
														console.log("FOUND PERF MEDIUM: ", pubScore[HAS_PERFORMANCE_MEDIUM]);
														dispatch({
															type: REGISTER_PUBLISHED_PERFORMANCE_SCORE,
															payload: { 
																work: work,
																conceptualScore: attachedScore,
																publishedScore: pubScore,
																performanceMedium: pubScore[HAS_PERFORMANCE_MEDIUM]
															}
														})
														dispatch(fetchScore(pubScore["@id"]));
													} else { 
														console.log("Published score without performance medium: ", pubScore["@id"]);
													}
												})
											} else { 
												console.log("Unpublished score: ", attachedScore);
											}
											if(HAS_STRUCTURE in attachedScore) { 
												dispatch(fetchStructure(target, parts, attachedScore[HAS_STRUCTURE]["@id"]));
											} else { 
												console.log("Score ", attachedScore["@id"], " attached to work ", work["@id"], " has no segment line!!");
											}
										}  else { 
											// no attached Score, so we have to recurse on the parent work
											dispatch(fetchWork(target, parts, work[PART_OF]["@id"]));
										}
									}
								});
							} else { 
								console.log("Found work without segmentLine or partonomy! ", work); 
							}
						}
					});
				}
			});
		});
	}
}

export function fetchStructure(target, parts, segline) {
	return(dispatch) => {
		dispatch({
			type: FETCH_STRUCTURE,
			payload: { 
				target: target,
				parts: parts,
				structure: segline 
			}
		});
		axios.get(segline).then((data) => { 
			jsonld.fromRDF(data.data, (err, doc) => {
				if(err) { console.log("ERROR TRANSLATING NQUADS TO JSONLD: ", err, data.data) }
				else { 
					// frame the doc in terms of each part of the expression targetted by the annotation
					parts.map((part) => {
						jsonld.frame(doc, { "@id": part}, (err, framed) => {
							if(err) { console.log("FRAMING ERROR in fetchStructure: ", err) }
							else { 
								// and hand to reducers to process associated embodibags
								// (manifestations of the expression)
								console.log("fetching manifestations", doc, part, framed);
								dispatch({ 
									type: FETCH_MANIFESTATIONS,
									payload: { 
										target: target,
										part: framed
									}
								});
							}
						});
					});
				}
			});
		});
	}
}
