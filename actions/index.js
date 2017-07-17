import axios from 'axios';
import jsonld from 'jsonld'

export const FETCH_SCORE = 'FETCH_SCORE';
export const FETCH_CONCEPTUAL_SCORE = 'FETCH_CONCEPTUAL_SCORE';
export const FETCH_TEI = 'FETCH_TEI';
export const FETCH_GRAPH = 'FETCH_GRAPH';
export const FETCH_WORK = 'FETCH_WORK';
export const FETCH_TARGET_EXPRESSION = 'FETCH_TARGET_EXPRESSION';
export const FETCH_COMPONENT_TARGET = 'FETCH_COMPONENT_TARGET';
export const FETCH_STRUCTURE = 'FETCH_STRUCTURE';
export const FETCH_MANIFESTATIONS = 'FETCH_MANIFESTATIONS';
export const SCORE_PREV_PAGE = 'SCORE_PREV_PAGE';
export const SCORE_NEXT_PAGE = 'SCORE_NEXT_PAGE';
export const PROCESS_ANNOTATION = 'PROCESS_ANNOTATION';
export const SESSION_GRAPH_ETAG= 'SESSION_GRAPH_ETAG';
export const REALIZATION_OF = 'http://purl.org/vocab/frbr/core#realizationOf';
export const EXPRESSION = 'http://purl.org/vocab/frbr/core#Expression';
export const PART_OF = 'http://purl.org/vocab/frbr/core#partOf';
export const PART = 'http://purl.org/vocab/frbr/core#part';
export const HAS_STRUCTURE= 'http://meld.linkedmusic.org/terms/hasStructure';
export const SEQ = 'http://www.w3.org/1999/02/22-rdf-syntax-ns#Seq';
export const SEQPART = 'http://www.w3.org/1999/02/22-rdf-syntax-ns#_';
export const SCORE = 'http://purl.org/ontology/mo/Score';
export const CONTAINS = 'http://www.w3.org/ns/ldp#contains';
export const HAS_TARGET= 'http://www.w3.org/ns/oa#hasTarget'
export const MOTIVATED_BY= 'http://www.w3.org/ns/oa#motivatedBy'
export const SEGMENT = 'http://www.linkedmusic.org/ontologies/segment/Segment'


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

export function fetchSessionGraph(uri, etag = "") { 
	console.log("FETCH_SESSION_GRAPH ACTION ON URI: ", uri);
	// TODO add etag to header as If-None-Match and enable corresponding support on server
	// so that it can respond with 304 instead of 200 (i.e. so it can ommit file body)
	const promise = axios.get(uri, {headers: {'Accept': 'application/ld+json'}});

    return (dispatch) => { 
        promise.then( (response)  => { 
			const framed = response.data;
			const session = framed["@graph"][0];
			if(!etag) { 
				// first time through: follow your nose along the conceptual score
				// to retrieve the published score (MEI file)
				if ("mo:performance_of" in session) { 
					dispatch(fetchConceptualScore(session["mo:performance_of"]["@id"]));
				} else { console.log("SESSION IS NOT A PERFORMANCE OF A SCORE: ", session); }
			} 
			if(response.headers.etag !== etag) { 
				// we need to grab the graph data, either because this is the first time,
				// or because session etag has changed (i.e. annotation has been posted/patched)
				dispatch( { 
					type: FETCH_GRAPH,
					payload: framed 
				});
				// take note of the new etag
				dispatch( { 
					type: SESSION_GRAPH_ETAG,
					payload: {
						uri: uri,
						etag: response.headers.etag
					}
				});
				if(CONTAINS in framed["@graph"][0]) { 
					// there are one or more annotations to process
					framed["@graph"][0] = ensureArray(framed["@graph"][0], CONTAINS);
					// process each annotation
					framed["@graph"][0][CONTAINS].map( (annotation) => { 
						dispatch(processComponentAnnotation(annotation, session["mo:performance_of"]["@id"])); 
					});
				}
			}
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

function processComponentAnnotation(annotation, conceptualScore = "") { 
	annotation = ensureArray(annotation, HAS_TARGET);
    const targets = annotation[HAS_TARGET].map( (target) => {
			return { 
				"@id": target["@id"],
				//"@type": target["@type"], 
			}
	});
    return (dispatch) => { 
		targets.map( (target) => {
			dispatch(fetchComponentTarget(target["@id"], conceptualScore))
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


export function fetchComponentTarget(uri, conceptualScore = "") { 
    console.log("FETCH_COMPONENT_TARGET ACTION ON URI: ", uri);
	return (dispatch) => {
		axios.get(uri).then((data) => { 
			dispatch( { 
				type: FETCH_COMPONENT_TARGET,
				payload: {
					conceptualScore: conceptualScore,
					structureTarget: uri
				}
			});
			jsonld.fromRDF(data.data, (err, doc) => {
				if(err) { console.log("ERROR TRANSLATING NQUADS TO JSONLD: ", err, data.data) }
				else { 
					jsonld.frame(doc, { "@id":uri }, (err, framed) => {
						if(err) { console.log("FRAMING ERROR in fetchComponentTarget: ", err) }
						else { 
							let typecheck = framed["@graph"][0];
							typecheck = ensureArray(typecheck, "@type");
							// have we found a segment?
							if(typecheck["@type"].includes(SEGMENT)) { 
								// found a segment!
								// hand it off to the reducer to process the embodibag
								// nb this is a different route to larrymeld (via expression)
								// i.e. there is no partonomy here. So send the segment itself as the part.
								dispatch({ 
									type: FETCH_MANIFESTATIONS,
									payload: { 
										target: framed,
										part: framed
									}
								});
							} else { 
								// if not, continue following links via the target's expression
								dispatch(fetchTargetExpression(framed));
							}
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
			if(PART in target) { 
				// sometimes we may have multiple parts or part sequences; sometimes only one
				// so ensure we have an array to work with (even if it's length one)
				// TODO refactor to use ensureArray helper function
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

export function fetchConceptualScore(uri) { 
	console.log("FETCH_CONCEPTUAL_SCORE ON URI: ", uri);
	const promise = axios.get(uri, {headers: {'Accept': 'application/ld+json'}});

    return (dispatch) => { 
        promise.then( (response) => { 
			const framed = response.data;
			const conceptualScore = framed["@graph"][0];
			if("mo:published_as" in conceptualScore) { 
				// dispatch the conceptual score (containing the mei URI) so that we can initialise a <Score> component
				dispatch( { 
					type: FETCH_CONCEPTUAL_SCORE,
					payload: conceptualScore 
				});
				dispatch(fetchScore(conceptualScore["mo:published_as"]["@id"]));
			} else { console.log("Unpublished conceptual score: ", conceptualScore) }
		})
	}
}

export function scorePrevPage(pubScoreUri, pageNum, MEI) { 
	return (dispatch) => {
		dispatch({
			type: SCORE_PREV_PAGE,
			payload: { 
				pageNum: pageNum,
				data: MEI,
				uri: pubScoreUri
			}
		});
	}
}
export function scoreNextPage(pubScoreUri, pageNum, MEI) { 
	return (dispatch) => {
		dispatch({
			type: SCORE_NEXT_PAGE,
			payload: { 
				pageNum: pageNum,
				data: MEI,
				uri: pubScoreUri
			}
		});
	}
}

// helper function to ensure that a given key of a JSON obj
// is an array, rather than a single value
// this is so that we can use the same approach for one and for
// many values
export function ensureArray(theObj, theKey) { 
	if(theObj !== null && typeof theObj === 'object') { 
		if(!theKey in theObj) { 
			console.log("ensureArray: KEY NOT IN OBJECT!", theKey, theObj);
		}
		else if(!Array.isArray(theObj[theKey])) { 
			theObj[theKey] = [theObj[theKey]];
		}
		return theObj;
	} else { 
		console.log("ensureArray: Provided structure is NOT AN OBJECT!") 
	}
}
