import axios from 'axios';
import auth from 'solid-auth-client';
import jsonld from 'jsonld';
import querystring from 'querystring';
import { v4 as uuidv4 } from 'uuid';
import {prefix} from '../library/prefixes.js'; 
import {
  ANNOTATION_HANDLED,
  ANNOTATION_NOT_HANDLED,
  ANNOTATION_PATCHED,
  ANNOTATION_POSTED,
  ANNOTATION_SKIPPED
} from './meldActions';

export const SET_TRAVERSAL_OBJECTIVES = "SET_TRAVERSAL_OBJECTIVES";
export const APPLY_TRAVERSAL_OBJECTIVE = "APPLY_OBJECTIVE";
export const HAS_BODY = "oa:hasBody";
export const FETCH_SCORE = 'FETCH_SCORE';
export const FETCH_RIBBON_CONTENT = 'FETCH_RIBBON_CONTENT';
export const FETCH_CONCEPTUAL_SCORE = 'FETCH_CONCEPTUAL_SCORE';
export const FETCH_TEI = 'FETCH_TEI';
export const FETCH_GRAPH = 'FETCH_GRAPH';
export const FETCH_GRAPH_DOCUMENT = 'FETCH_GRAPH_DOCUMENT';
export const FETCH_WORK = 'FETCH_WORK';
export const FETCH_TARGET_EXPRESSION = 'FETCH_TARGET_EXPRESSION';
export const FETCH_COMPONENT_TARGET = 'FETCH_COMPONENT_TARGET';
export const PROCESS_COMPONENT_TARGET = 'PROCESS_COMPONENT_TARGET';
export const FETCH_STRUCTURE = 'FETCH_STRUCTURE';
export const FETCH_MANIFESTATIONS = 'FETCH_MANIFESTATIONS';
export const SCORE_PREV_PAGE = 'SCORE_PREV_PAGE';
export const SCORE_NEXT_PAGE = 'SCORE_NEXT_PAGE';
export const SCORE_SET_OPTIONS = 'SCORE_SET_OPTIONS';
export const SCORE_PAGE_TO_TARGET = 'SCORE_PAGE_TO_TARGET';
export const PROCESS_ANNOTATION = 'PROCESS_ANNOTATION';
export const SESSION_GRAPH_ETAG = 'SESSION_GRAPH_ETAG';
export const RESET_NEXT_SESSION_TRIGGER = 'RESET_NEXT_SESSION_TRIGGER';
export const TRANSITION_TO_NEXT_SESSION = 'TRANSITION_TO_NEXT_SESSION';
export const REGISTER_PUBLISHED_PERFORMANCE_SCORE = 'REGISTER_PUBLISHED_PERFORMANCE_SCORE';
export const MUZICODES_UPDATED = 'MUZICODES_UPDATED';
export const REALIZATION_OF = 'frbr:realizationOf';
export const EXPRESSION = 'frbr:Expression';
export const PART_OF = 'frbr:partOf';
export const PART = 'frbr:part';
export const KEY = 'mo:key';
export const HARMONY = 'https://meld.linkedmusic.org/companion/vocab/harmony';
export const CADENCE = 'https://meld.linkedmusic.org/companion/vocab/cadentialGoal';
export const DEGREE = 'https://meld.linkedmusic.org/companion/vocab/hasDegree';
export const CHORD_TYPE = 'https://meld.linkedmusic.org/companion/vocab/chordType';
export const HAS_STRUCTURE = 'https://meld.linkedmusic.org/terms/hasStructure';
export const SEQ = 'http://www.w3.org/1999/02/22-rdf-syntax-ns#Seq';
export const SEQPART = 'http://www.w3.org/1999/02/22-rdf-syntax-ns#_';
export const SCORE = 'http://purl.org/ontology/mo/Score';
export const CONTAINS = 'http://www.w3.org/ns/ldp#contains';
export const MOTIVATED_BY = 'http://www.w3.org/ns/oa#motivatedBy';
export const SEGMENT = 'so:Segment';
export const MUZICODE = 'meld:Muzicode';
export const PUBLISHED_AS = 'http://purl.org/ontology/mo/published_as';
export const HAS_PERFORMANCE_MEDIUM = 'http://rdaregistry.info/Elements/e/p20215';
export const HAS_PIANO = "http://id.loc.gov/authorities/performanceMediums/2013015550";
export const CREATE_SESSION = "CREATE_SESSION";
export const SESSION_NOT_CREATED = "SESSION_NOT_CREATED";
export const TICK = "TICK";
export const TRAVERSAL_PREHOP = "TRAVERSAL_PREHOP";
export const TRAVERSAL_HOP = "TRAVERSAL_HOP";
export const TRAVERSAL_FAILED = "TRAVERSAL_FAILED";
export const TRAVERSAL_UNNECCESSARY = "TRAVERSAL_UNNECCESSARY";
export const TRAVERSAL_CONSTRAINED = "TRAVERSAL_CONSTRAINED";
export const IGNORE_TRAVERSAL_OBJECTIVE_CHECK_ON_EMPTY_GRAPH ="IGNORE_TRAVERSAL_OBJECTIVE_CHECK_ON_EMPTY_GRAPH";
export const RUN_TRAVERSAL = "RUN_TRAVERSAL";
export const REGISTER_TRAVERSAL = "REGISTER_TRAVERSAL";
export const UPDATE_LATEST_RENDERED_PAGENUM = "UPDATE_LATEST_RENDERED_PAGENUM";

export const muzicodesUri = "http://127.0.0.1:5000/MUZICODES";

export const MAX_RETRIES = 3;
export const MAX_TRAVERSAL_HOPS = 10;
export const RETRY_DELAY = 10;

// TODO move context somewhere global -- most framing happens server side
// anyway, but in cases where the framed URI contains a fragment ("#"), 
// we have to do it client-side		
const context = {
  "popRoles": "http://pop.linkedmusic.org/roles/",
  "mo": "http://purl.org/ontology/mo/",
  "ldp": "http://www.w3.org/ns/ldp#",
  "mp": "http://id.loc.gov/authorities/performanceMediums/",
  "oa": "http://www.w3.org/ns/oa#",
  "frbr": "http://purl.org/vocab/frbr/core#",
  "rdfs": "http://www.w3.org/2000/01/rdf-schema#",
  "meld": "https://meld.linkedmusic.org/terms/",
  "motivation": "https://meld.linkedmusic.org/motivation/",
  "so": "http://www.linkedmusic.org/ontologies/segment/",
  "dct": "http://purl.org/dc/terms/",
  "climb": "http://meld.linkedmusic.org/climb/terms/",
  "mc": "http://meld.linkedmusic.org/climb/muzicodeTypes/"
};

export function fetchScore(url, options) {
  console.log("FETCH_SCORE ACTION on URI: ", url);
  return(dispatch) => { 
    auth.fetch(url, {mode: 'cors'})
      .then(response => {
        return response.text()
      })
      .then(data => {
        dispatch({
          type: FETCH_SCORE,
          payload: { 
            data, 
            config: { url, options }
          }
        });
      });
  };
}

export function fetchRibbonContent(url) {
  // console.log("FETCH_RIBBON_CONTENT ACTION on URI: ", uri);
  const promise = auth.fetch(url);
  return dispatch => { 
    auth.fetch(url, {mode: 'cors'})
      .then(response => {
        return response.text()
      })
      .then(data => {
        dispatch({
          type: FETCH_RIBBON_CONTENT,
          payload: { 
            data, 
            config: { url }
          }
        })
      })
  }/*
  return {
    type: FETCH_RIBBON_CONTENT,
    payload: promise
  }*/
}

export function fetchTEI(uri) {
  const promise = new CETEI().getHTML5(uri);
  return dispatch => {
    promise.then(data => {
      dispatch({
        type: FETCH_TEI,
        payload: {
          data: data,
          uri: uri
        }
      });
    });
  }
}

export function registerTraversal(docUri, suppliedParams = {}) {
  // PURPOSE:
  // *************************************************************************
  // Traverse through a graph, looking for entities of interest
  //   (keys of 'objectives') and undertaking actions in response
  //   (values of 'objectives').
  // For each subject, traverse along its predicates to its attached objects,
  //   then recurse (each object becomes subject in next round).
  // When recursing, check for instances of object-as-subject in the current
  //   file (traverseInternal), AND do an HTTP GET to resolve the object URI
  //   and recurse there (external traversal).
  // If useEtag is specified, then worry about etags for external traversals
  // 	 (and re-request if the file has changed)
  // 	 n.b. this is only an issue for dynamic MELD deployments
  // With each hop, decrement numHops.
  // Stop when numHops reaches zero, or when there are no more objects
  //   to traverse to.
  // If an extendObjectPrefix is specified, only traverse to objects with
  //  URIs that start with a prefix in the list.
  // If an extendObjectUri is specified, only traverse to objects with
  //  URIs in the list.
  // If an extendObjectType is specified, only traverse to objects with
  //  a type that's in the list.
  // If an ignoreObjectPrefix is specified, only traverse to objects with
  //  URIs that do NOT start with a prefix in the list.
  // If an ignoreObjectUri is specified, only traverse to objects with
  //  URIs that are NOT in the list.
  // If an ignoreObjectType is specified, do NOT traverse to  objects with
  //  types in the list.
  // If a followPropertyPrefix is specified, only traverse to objects along
  //  properties whose URIs start with a prefix in the list.
  // If a followPropertyUri is specified, only traverse to objects along
  //  properties with URIs in the list.
  // If a ignorePpropertyPrefix is specified, only traverse to objects along
  //  properties whose URIs do NOT start with a prefix in the list.
  // If a followPropertyUri is specified, only traverse to objects along
  //  properties with URIs that are NOT in the list.
  // *************************************************************************

  // create new params object to pass on in recursive calls
  // n.b. must update here if function signature changes - the
  // params object is also used to check supplied parameter names.
  const defaultParams = {
    extendObjectPrefix: [], extendObjectUri: [], extendObjectType: [],
    ignoreObjectPrefix: [], ignoreObjectUri: [], ignoreObjectType: [],
    followPropertyPrefix: [], followPropertyUri: [],
    ignorePpropertyPrefix: [], ignorePropertyUri: [],
    objectives: {}, numHops: MAX_TRAVERSAL_HOPS,
    useEtag: false, etag: ""
  };
  let params = {...defaultParams} ;

  // Check for unknown parameter/option names, and issue warnings
  var key;
  for (key in suppliedParams) {
    if ( !(key in params) ) {
      console.log("registerTraversal: unrecognized option: ", key);
    } else {
			params[key] = suppliedParams[key];
		}
  }

  // For older app compatibility, map old parameter names to new
  const oldParamsMap = [
    [ "objectPrefixWhitelist",    "extendObjectPrefix"    ],
    [ "objectUriWhitelist",       "extendObjectUri"       ],
    [ "objectTypeWhitelist",      "extendObjectType"      ],
    [ "objectPrefixBlacklist",    "ignoreObjectPrefix"    ],
    [ "objectUriBlacklist",       "ignoreObjectUri"       ],
    [ "objectTypeBlacklist",      "ignoreObjectType"      ],
    [ "propertyPrefixWhitelist",  "followPropertyPrefix"  ],
    [ "propertyUriWhitelist",     "followPropertyUri"     ],
    [ "propertyPrefixBlacklist",  "ignorePropertyPrefix" ],
    [ "propertyUriBlacklist",     "ignorePropertyUri"     ]
  ] ;
  for ( var i in oldParamsMap ) {
    var oldkey = oldParamsMap[i][0];
    var newkey = oldParamsMap[i][1];
    if ( (oldkey in suppliedParams) && !(newkey in suppliedParams) ) {
      params[newkey] = suppliedParams[oldkey]
    }
  }

  const unimplementedParams = (
    "extendObjectType",
    "ignoreObjectType",    
    "followPropertyPrefix", 
    "followPropertyUri",
    "ignorePropertyPrefix",
    "ignorePropertyUri"
    );
  for (key in unimplementedParams) {
    if ( (key in params) ) {
      console.log("registerTraversal: unimplemented option: ", key);
    }
  }

	docUri = new URL(docUri, document.URL).toString();
  if(passesTraversalConstraints({"@id":docUri}, params)) { 
    return ({
      type: REGISTER_TRAVERSAL,
      payload: {docUri, params}
    })
  } else { 
    return ({
      type: TRAVERSAL_CONSTRAINED
    })
  }
}

export function traverse(docUri, params) {
  // set up HTTP request
  const headers = {'Accept': 'application/ld+json'};
  if (params["useEtag"]) {
    headers['If-None-Match'] = params["etag"];
  }

  console.log("FETCHING: ", docUri, params);
  const promise = auth.fetch(docUri, {
    headers: headers,
    mode: 'cors'
  });
  return (dispatch) => {
    dispatch({
      type: RUN_TRAVERSAL,
      payload: {docUri}
    });
    promise.then(response => {
      if (response.status == 304) {
        dispatch({type: TRAVERSAL_UNNECCESSARY});
        return; // file not modified, i.e. etag matched, no updates required
      }
      console.log(response.headers.get("Content-Type"));
      // attempt to decide content type (either explicitly provided or by file suffix)
      // and proceed with traversal accordingly
      if (docUri.endsWith(".json") || docUri.endsWith(".jsonld") || docUri.endsWith(".json-ld") ||
          response.headers.get("Content-Type").startsWith("application/ld+json") ||
          response.headers.get("Content-Type").startsWith("application/json")) {
        // treat as JSON-LD document
        dispatch(traverseJSONLD(dispatch, docUri, params, response.json()));
      } else if (docUri.endsWith(".ttl") || docUri.endsWith(".n3") || docUri.endsWith(".rdf") ||
          docUri.endsWith(".nt") ||
          response.headers.get("Content-Type").startsWith("application/rdf+xml") ||
          response.headers.get("Content-Type").startsWith("application/x-turtle") ||
          response.headers.get("Content-Type").startsWith("text/turtle")) {
        // treat as RDF document
        // TODO: Translate RDF to JSON-LD, then proceed with traverseJSONLD as above
        dispatch({type: TRAVERSAL_FAILED});
        console.log("Can't handle this document: (We currently only support nq and JSON-LD)", docUri, response)
				// dispatch(traverseRDF(dispatch, docUri, params, response.text()));
			} else if (docUri.endsWith(".nq") || 
								 response.headers.get("Content-Type").startsWith("application/nquads")) {
				dispatch(traverseRDF(dispatch, docUri, params, response.text()));
      } else {
        dispatch({type: TRAVERSAL_FAILED});
        console.log("Don't know how to treat this document: ", docUri, response)
      }
      // appropriately handle content types
      //			if(isRDF(response.headers.get("Content-Type"))) {
      //				toNQuads(
      //					
      //			}
      //			switch(response.headers.get("Content-Type")) {
      //				// If we are working with RDF, we need to convert it to JSON-LD.
      //				// Unfortunately jsonld.js only reads nquads.
      //				// Thus, convert non-nquad RDF formats to nquad first
      //				case "text/turtle":
      //				case "application/trig":
      //				case "application/n-triples":
      //				case "text/n3":
      //
    }).catch(err => {
      dispatch({type: TRAVERSAL_FAILED});
      console.log("Could not retrieve ", docUri, err);
    });
    return {type: TRAVERSAL_PREHOP};
  }
}


//helper function: 
// skolemize blank nodes to prevent identifier clashes between documents
// by detecting "_:<blank-node-identifier>"
// and replacing with document uri appended with  /genid/<blank-node-identifier> 
// by virtue of traversal mechanism, we only ever visit each document once, 
// so clashes with the same document should not occur.
function skolemize(obj, docUri) {
  if (Array.isArray(obj)) {
    // if fed an array, recur on each constitutent
    obj = obj.map(o => skolemize(o, docUri));
  } else if (obj === Object(obj)) {
    // if fed an object, iterate over each key
    Object.keys(obj).map(k => {
      if (k === "@id") {
        // found an @id, check for blank node and skolemize if necesssary
        obj["@id"] = obj["@id"].replace("_:", docUri + "#genid-");
      } else {
        // recur on value
        obj[k] = skolemize(obj[k], docUri);
      }
    })
  }
  return obj;
}


function traverseRDF(dispatch, docUri, params, dataPromise){
  console.log("in traverseRDF for doc ", docUri, "with exclude list ", params["ignoreObjectUri"]);
	// expand the JSON-LD object so that we are working with full URIs, not compacted into prefixes
  dataPromise.then(data => {
		dispatch(traverseJSONLD(dispatch, docUri, params, jsonld.fromRDF(data)));
	}).catch(err => console.error(err));
	return {type: TRAVERSAL_HOP}
}

function traverseJSONLD(dispatch, docUri, params, dataPromise) {
	console.log("in traverseJSONLD for doc ", docUri, "with exclude list ", params["ignoreObjectUri"]);
  // expand the JSON-LD object so that we are working with full URIs, not compacted into prefixes
  dataPromise.then(data => {
    console.log("attempting to expand: ", data);
		jsonld.expand(data).then(expanded => {
      console.log("Got expanded json: ", expanded);
      // flatten the expanded JSON-LD object so that each described entity has an ID at the top-level of the tree
      jsonld.flatten(expanded).then(flattened => {
        const skolemized = skolemize(flattened, docUri);
        dispatch({
          type: FETCH_GRAPH_DOCUMENT,
          payload:  { 
            data: skolemized,
            uri: docUri
          }
        });
        // convert the flattened array of JSON-LD structures into a lookup table using each entity's URI ("@id")
        let idLookup = {};
        Object.entries(skolemized).forEach(([key, value]) => {
          idLookup[value["@id"]] = value;
        });
        Object.entries(idLookup).forEach(([subjectUri, subjectDescription]) => {
          // iterating through each entity within the document as the subject,
          // look at its description (set of predicate-object tuples).
          Object.entries(subjectDescription).forEach(([pred, objs]) => {
            // because JSON-LD, objs could be a single object or an array of objects
            // therefore, ensure consistency:
            objs = Array.isArray(objs) ? objs : [objs];
            objs.map((obj) => {
              if (obj === Object(obj)) {
                // our *RDF* object is a *JAVASCRIPT* object
                // but because we've flattened our document, we know that it will contain only an @id
                // and that all of its other descriptors will be associated with that @id at the top-level
                // (which we will handle in another iteration)
                // CHECK FOR OBJECTIVES HERE
                //console.log("<>", subjectUri, pred, obj["@id"], docUri);
                // Now recurse (if exclusion/inclusion conditions and hop counter allow)
                if (passesTraversalConstraints(obj, params)) {
//                  console.log("registering next traversal!", obj["@id"])
                  dispatch(registerTraversal(obj["@id"], {
                    ...params,
                    // Remember that we've already visited the current document to avoid loops
                    "ignoreObjectUri": params["ignoreObjectUri"].concat(docUri.split("#")[0]),
                    "numHops": params["numHops"] - 1
                  }));
                }
              } else {
                // our *RDF* object is a literal
                // n.b. exceptions where pred is @type, @id, etc. There, the obj is still a URI, not a literal
                // Could test for those explicitly here.
								// CHECK FOR OBJECTIVES HERE
								//	console.log("||", subjectUri, pred, obj, docUri)
								
							}
						});
					})
				});
      });
    }).catch(error=>console.log("EXPANSION ERROR: ", docUri, err));
  });
  return {type: TRAVERSAL_HOP}
}

function passesTraversalConstraints(obj, params) {
  // filter function that returns TRUE if uri should be traversed to
  // (with a given set of constraints in the params)
  //
  // test: ensure we haven't run out of hops
  if (params["numHops"] === 0) {
    //console.log("Test 1: Out of hops", obj, params)
    return false;
  }

  // test: ensure obj is not a literal
  if (!("@id" in obj)) {
   // ////console.log("Test 2: Found a literal", obj, params)
    return false;
  }

  const resourceUri = obj["@id"].split("#")[0]; // don't traverse fragments of an excluded resource...

  // test: object URI doesn't violate constraints
  if (params["extendObjectUri"].length) {
    // URI inclusion list specified:
    // only pass if included in URI inclusion list AND not in URI exclusion list
    if (!params["extendObjectUri"].includes(resourceUri) ||
        params["ignoreObjectUri"].includes(resourceUri)) {
      //console.log("Test 3: object excluded (and not in inclusion list)", obj, params)
      return false;
    }
  } else {
    // no URI inclusion list
    // only pass if not in URI exclusion list
    if (params["ignoreObjectUri"].includes(resourceUri)) {
      //console.log("Test 4: object excluded (without inclusion list)", obj, params)
      return false;
    }
  }

  // test: object URI doesn't violate PREFIX constraints
  const prefixExcluded = params["ignoreObjectPrefix"].filter(pre => {
    return resourceUri.startsWith(pre.split("#")[0]);
  });
  // only pass if prefix not excluded
  if (prefixExcluded.length) {
    //console.log("Test 5: prefix excluded", obj, params)
    return false;
  }
  if (params["extendObjectPrefix"].length) {
    // Prefix inclusion list specified:
    const prefixIncluded = params["extendObjectPrefix"].filter(pre => {
      return resourceUri.startsWith(pre);
    });
    // only pass if included in prefix inclusion list
    if (prefixIncluded.length === 0) {
      //console.log("Test 6: prefix not in specified inclusion list", obj, params)
      return false
    }
  }
  //console.log("Object passes all traversal constraint tests", obj, params, params["extendObjectPrefix"], params["ignoreObjectPrefix"], params["ignoreObjectUri"]);
  return true;
}

export function checkTraversalObjectives(graph, objectives) {
  // check a given json-ld structure against a set of objectives (json-ld frames)
  if (graph.length) {
    return dispatch => {
      let framingPromises = [];
      objectives.forEach( (obj) => {
        framingPromises.push(jsonld.frame(graph, obj))
      })
      Promise.allSettled(framingPromises).then( (framedResolved) =>  {
        framedResolved.forEach( (resolvedFrame, ix) => {
          const framed = resolvedFrame["value"];
          dispatch({
            type: APPLY_TRAVERSAL_OBJECTIVE,
            payload: {
              ix,
              framed
            }
          })
        })
      })
    }
  } else {
    return {
      type: IGNORE_TRAVERSAL_OBJECTIVE_CHECK_ON_EMPTY_GRAPH
    };
  }
}

export function setTraversalObjectives(objectives) {
  return {
    type: SET_TRAVERSAL_OBJECTIVES,
    payload: objectives
  }
}


export function fetchSessionGraph(uri, etag = "") {
  console.warn("DEPRECATION WARNING: The function fetchSessionGraph is considered deprecated as of meld-clients-core v2.0.0 and will be subject to removal in future versions. Please upgrade your application to use the registerTraversal and traverse functions instead.");
  // console.log("FETCH_SESSION_GRAPH ACTION ON URI: ", uri, " with etag: ", etag);
  // TODO add etag to header as If-None-Match and enable corresponding support on server
  // so that it can respond with 304 instead of 200 (i.e. so it can ommit file body)
  const promise = auth.fetch(uri, {
    headers: {'Accept': 'application/ld+json', 'If-None-Match': etag},
    mode: 'cors'
  });

  return (dispatch) => {
    promise.then((response) => {
      if (response.status == 304) {
        return; // don't need to do any new work
      }
      const framed = response.data;
      const session = framed["@graph"][0];
      if (!etag) {
        // first time through: follow your nose along the conceptual score
        // to retrieve the published score (MEI file)
        if ("mo:performance_of" in session) {
          dispatch(fetchConceptualScore(session["@id"], session["mo:performance_of"]["@id"]));
        } else {
          console.log("SESSION IS NOT A PERFORMANCE OF A SCORE: ", session);
        }
      }
      if (response.headers.etag !== etag) {
        // we need to grab the graph data, either because this is the first time,
        // or because session etag has changed (i.e. annotation has been posted/patched)
        dispatch({
          type: FETCH_GRAPH,
          payload: framed
        });
        // take note of the new etag
        dispatch({
          type: SESSION_GRAPH_ETAG,
          payload: {
            uri: uri,
            etag: response.headers.etag
          }
        });
        if ("ldp:contains" in framed["@graph"][0]) {
          // there are one or more annotations to process
          framed["@graph"][0] = ensureArray(framed["@graph"][0], "ldp:contains");
          // process each annotation
          framed["@graph"][0]["ldp:contains"].map((annotation) => {
            dispatch(processComponentAnnotation(annotation, session["mo:performance_of"]["@id"]));
          });
        }
      }
    });
  }
}

export function fetchGraph(uri) {
  // console.log("FETCH_GRAPH ACTION ON URI: ", uri);
  const promise = auth.fetch(uri);

  return (dispatch) => {
    promise.then(({data}) => {
      // dispatch the graph data
      dispatch({
        type: FETCH_GRAPH,
        payload: data
      });
      // walk through component annotations
      data["@graph"][0]["ldp:contains"].map((topLevel) => {
        topLevel["oa:hasBody"].map((annotation) => {
          dispatch(processComponentAnnotation(annotation));
        });

      });
    });
  }
}

function processComponentAnnotation(annotation, conceptualScore = "") {
  console.warn("DEPRECATION WARNING: The function processComponentAnnotation is considered deprecated as of meld-clients-core v2.0.0 and will be subject to removal in future versions. Please upgrade your application to use the registerTraversal and traverse functions instead.");
  if ("meld:state" in annotation && annotation["meld:state"]["@id"] === "meld:processed") {
    // We can skip this processed annotation
    return {
      type: ANNOTATION_SKIPPED,
      payload: annotation
    }
  }
  annotation = ensureArray(annotation, "oa:hasTarget");
  // console.log("Processing component annotation: ", annotation, conceptualScore)
  const targets = annotation["oa:hasTarget"].map(target => {
    return {
      "@id": target["@id"],
      // DW TODO 20170830 may need to validate whether @type exists
      "@type": target["@type"],
    }
  });
  return (dispatch) => {
    targets.map(target => {
      dispatch(fetchComponentTarget(target["@id"], conceptualScore))
    });
    dispatch({
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
  console.warn("DEPRECATION WARNING: The function fetchComponentTarget is considered deprecated as of meld-clients-core v2.0.0 and will be subject to removal in future versions. Please upgrade your application to use the registerTraversal and traverse functions instead.");
  // console.log("FETCH_COMPONENT_TARGET ACTION ON URI: ", uri);
  const promise = auth.fetch(uri, {headers: {'Accept': 'application/ld+json'}, mode: 'cors'});
  return dispatch => {
    promise.then(data => {
      // console.log("Attemping to frame data", data);
      if (!"content-type" in data.headers || data.headers.get("Content-Type") !== "application/json" && data.headers.get("Content-Type") !== "application/ld+json") {
        // console.log("Converting to JSON...");
        // need to convert triples to json
        // TODO handle arbitrary RDF format here (currently requires ntriples)
        jsonld.fromRDF(data.data, {format: 'application/n-quads'}).then(doc => {
          dispatch(processComponentTarget(doc, uri, conceptualScore));
        }).catch(err => console.log("ERROR CONVERTING NQUADS TO JSON-LD: ", err));
      } else {
        // already in json format
        dispatch(processComponentTarget(data.data, uri, conceptualScore));
      }
    });
	};
}

function processComponentTarget(data, uri, conceptualScore) {
  console.warn("DEPRECATION WARNING: The function processComponentTarget is considered deprecated as of meld-clients-core v2.0.0 and will be subject to removal in future versions. Please upgrade your application to use the checkTraversalObjectives function instead.");
  // console.log("PROCESS_COMPONENT_TARGET ACTION ON URI: ", uri);
  return (dispatch) => {
    jsonld.frame(data, { "@id": uri }).then(framed => {
      jsonld.compact(framed, context).then(compacted => {
        dispatch({
          type: FETCH_COMPONENT_TARGET,
          payload: {
            conceptualScore: conceptualScore,
            structureTarget: uri
          }
        }); // console.log("COMPACTED: ", compacted);
				
        let typecheck = compacted;
        typecheck = ensureArray(typecheck, "@type"); // have we found a segment?
        // console.log("TYPECHECK: ", typecheck)
				
        if (typecheck["@type"].includes(SEGMENT) || typecheck["@type"].includes(MUZICODE)) {
          // TODO jsonldify context
          // TODO refine muzicode semantics for this
          // found a segment or muzicode!
          // hand it off to the reducer to process the embodibag
          // nb this is a different route to larrymeld (via expression)
          // i.e. there is no partonomy here. So send the segment itself as the part.
          dispatch({
            type: FETCH_MANIFESTATIONS,
            payload: {
              target: compacted,
              part: compacted
            }
          });
        } else {
          // if not, continue following links via the target's expression
          dispatch(fetchTargetExpression(compacted));
        }
      }).catch(err => console.log("COMPACTING ERROR in processComponentTarget:", err));
    }).catch(err => {
      type: ANNOTATION_NOT_HANDLED
    });
  };
}


export function fetchTargetExpression(compacted) {
  console.warn("DEPRECATION WARNING: The function fetchTargetExpression is considered deprecated as of meld-clients-core v2.0.0 and will be subject to removal in future versions. Please upgrade your application to use the registerTraversal and traverse functions instead.");
  // traverse from the provided Expression, via a Segment, to Manifestation(s)
  // console.log("In fetchTargetExpression: ", compacted);
  return dispatch => {
    dispatch({
      type: FETCH_TARGET_EXPRESSION,
      payload: compacted
    });
    let target = compacted;
    if (target["@type"].includes(EXPRESSION)) {
      // found an expression
      // Do we have a harmony declaration?
      let chords = [];
      let expressionObj = {};
      expressionObj['@id'] = target['@id'];
      if (PART_OF in target) {
        expressionObj.motif = target[PART_OF]['@id'];
        expressionObj.n = parseInt(/\d*$/.exec(target['@id'])[0]); // FIXME: bad hack for not having seq available
      }
      if (REALIZATION_OF in target) {
        expressionObj.segment = target[REALIZATION_OF]['@id'];
      }
      if (KEY in target) expressionObj.key = target[KEY]['@id'];
      if (HARMONY in target) {
        if (PART_OF in target) {
          expressionObj.motif = target[PART_OF]['@id'];
          expressionObj.chords = chords;
        }
        var counter = 1;
        var urlBegins = "http://www.w3.org/1999/02/22-rdf-syntax-ns#_";
        while (urlBegins + counter in target[HARMONY]) {
          chords.push(target[HARMONY][urlBegins + counter]);
          counter++;
        }
      }
      if (CADENCE in target) {
        var cadenceData = target[CADENCE];
        expressionObj.cadence = {};
        if (DEGREE in cadenceData) expressionObj.cadence.degree = cadenceData[DEGREE]['@id'];
        if (CHORD_TYPE in cadenceData) expressionObj.cadence.chordType = cadenceData[CHORD_TYPE]['@id'];
      }
      // does it have any parts?
      let parts = [];
      // console.log("part check: ", target)
      if (PART in target) {
        // sometimes we may have multiple parts or part sequences; sometimes only one
        // so ensure we have an array to work with (even if it's length one)
        // TODO refactor to use ensureArray helper function
        if (!Array.isArray(target[PART])) {
          target[PART] = [target[PART]];
        }
        // now process each sequence
        target[PART].map((p) => {
          if ("@type" in p && p["@type"].includes(SEQ)) {
            // it's an RDF sequence
            Object.keys(p).map((part) => {
              if (part.startsWith(SEQPART)) {
                parts.push(p[part]["@id"]);
              }
            });
          } else {
            parts.push(p["@id"]);
          }
        });
        // now fetch the work to continue on to the manifestations associated with these parts
        if (REALIZATION_OF in target) {
          dispatch(fetchWork(compacted, parts, target[REALIZATION_OF]["@id"], expressionObj));
        } else {
          console.log("Target is an unrealized expression: ", target);
        }
      } else {
        console.log("Target expression without parts", target);
      }
    } else {
      console.log("fetchTargetExpression attempted on a non-Expression! ", target);
    }
  }
}


export function fetchWork(target, parts, work, expressionObj) {
  console.warn("DEPRECATION WARNING: The function fetchWork is considered deprecated as of meld-clients-core v2.0.0 and will be subject to removal in future versions. Please upgrade your application to use the registerTraversal and traverse functions instead.");
  // console.log("STARTING FETCHWORK WITH ", work, parts, expressionObj);
  return (dispatch) => {
    dispatch({
      type: FETCH_WORK,
      payload: {
        target: target,
        parts: parts,
        works: work,
        chords: expressionObj
      }
    });
    auth.fetch(work).then((data) => {
      jsonld.fromRDF(data.data, (err, doc) => {
        if (err) {
          console.log("ERROR TRANSLATING NQUADS TO JSONLD: ", err, data.data)
        } else {
          jsonld.frame(doc, {"@id": work}, (err, framed) => {
            if (err) {
              console.log("FRAMING ERROR in fetchWork:", err)
            } else {
              jsonld.compact(framed, context, (err, compacted) => {
                if (err) {
                  console.log("COMPACTING ERROR in fetchWork:", err)
                } else {
                  work = compacted;
                  // Check if there is a segment line, in which case fetch manifestations
                  // else, check if this is part of another ("parent") work
                  if (HAS_STRUCTURE in work) {
                    dispatch(fetchStructure(target, parts, work[HAS_STRUCTURE]["@id"]));
                  } else if (PART_OF in work) {
                    // does our doc attach a Score which realizes the parent work?
                    // FIXME HACKHACK:
                    // framing expands the nice compacted URIs
                    // so here we need to use full URIs instead of REALIZATION_OF as defined above
                    jsonld.frame({"@context": context, "@graph": doc}, {
                      "http://purl.org/vocab/frbr/core#realizationOf": work[PART_OF]["@id"]
                    }, (err, framed) => {
                      if (err) {
                        console.log("FRAMING ERROR when fetching parent work", err)
                      } else {
                        // console.log("Attached score:", framed);
                        const attachedScore = framed["@graph"][0];
                        if (attachedScore && "@type" in attachedScore && attachedScore["@type"] === SCORE) {
                          // FIXME breaks with multiple types
                          // Found an attached Score!!!
                          if (PUBLISHED_AS in attachedScore) {
                            // for now: assume published scores
                            // are attached in same file
                            // FIXME enable external pub_scores
                            attachedScore[PUBLISHED_AS].map((pubScore) => {
                              // console.log("FOUND PUB SCORE: ", pubScore);
                              if (HAS_PERFORMANCE_MEDIUM in pubScore) {
                                // console.log("FOUND PERF MEDIUM: ", pubScore[HAS_PERFORMANCE_MEDIUM]);
                                dispatch({
                                  type: REGISTER_PUBLISHED_PERFORMANCE_SCORE,
                                  payload: {
                                    work: work,
                                    conceptualScore: attachedScore,
                                    publishedScore: pubScore,
                                    performanceMedium: pubScore[HAS_PERFORMANCE_MEDIUM]
                                  }
                                });
                                if (pubScore[HAS_PERFORMANCE_MEDIUM]['@id'] == HAS_PIANO) {
                                  dispatch(fetchScore(pubScore["@id"]));
                                } else {
                                  dispatch(fetchRibbonContent(pubScore["@id"]));
                                }
                              } else {
                                // console.log("Published score without performance medium: ", pubScore["@id"]);
                              }
                            })
                          } else {
                            // console.log("Unpublished score: ", attachedScore);
                          }
                          if (HAS_STRUCTURE in attachedScore) {
                            dispatch(fetchStructure(target, parts, attachedScore[HAS_STRUCTURE]["@id"]));
                          } else {
                            // console.log("Score ", attachedScore["@id"], " attached to work ", work["@id"], " has no segment line!!");
                          }
                        } else {
                          // no attached Score, so we have to recurse on the parent work
                          dispatch(fetchWork(target, parts, work[PART_OF]["@id"]));
                        }
                      }
                    });
                  } else {
                    // console.log("Found work without segmentLine or partonomy! ", work);
                  }
                }
              });
            }
          });
        }
      });
    });
  }
}

export function fetchStructure(target, parts, segline) {
  console.warn("DEPRECATION WARNING: The function fetchStructure is considered deprecated as of meld-clients-core v2.0.0 and will be subject to removal in future versions. Please upgrade your application to use the registerTraversal and traverse functions instead.");
  return (dispatch) => {
    dispatch({
      type: FETCH_STRUCTURE,
      payload: {
        target: target,
        parts: parts,
        structure: segline
      }
    });
    auth.fetch(segline).then((data) => {
      jsonld.fromRDF(data.data, (err, doc) => {
        if (err) {
          console.log("ERROR TRANSLATING NQUADS TO JSONLD: ", err, data.data)
        } else {
          // frame the doc in terms of each part of the expression targetted by the annotation
          parts.map((part) => {
            jsonld.frame(doc, {"@id": part}, (err, framed) => {
              if (err) {
                console.log("FRAMING ERROR in fetchStructure: ", err)
              } else {
                jsonld.compact(framed, context, (err, compacted) => {
                  if (err) {
                    console.log("COMPACTING ERROR in fetchStructure:", err)
                  } else {
                    // and hand to reducers to process associated embodibags
                    // (manifestations of the expression)
                    // console.log("fetching manifestations", doc, target, part, compacted);
                    dispatch({
                      type: FETCH_MANIFESTATIONS,
                      payload: {
                        target: target,
                        part: compacted
                      }
                    });
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

export function fetchConceptualScore(session, uri) {
  console.warn("DEPRECATION WARNING: The function fetchConceptualScore is considered deprecated as of meld-clients-core v2.0.0 and will be subject to removal in future versions. Please upgrade your application to use the registerTraversal and traverse functions instead.");
  return (dispatch) => {
  // console.log("FETCH_CONCEPTUAL_SCORE ON URI: ", uri);
  const promise = auth.fetch(uri, {headers: {'Accept': 'application/ld+json'}});

  return (dispatch) => {
    promise.then((response) => {
      const framed = response.data;
      const conceptualScore = framed["@graph"][0];
      if ("mo:published_as" in conceptualScore) {
        // dispatch the conceptual score (containing the mei URI) so that we can initialise a <Score> component
        dispatch({
          type: FETCH_CONCEPTUAL_SCORE,
          payload: conceptualScore
        });
        dispatch(fetchScore(conceptualScore["mo:published_as"]["@id"]));
      } else {
        console.log("Unpublished conceptual score: ", conceptualScore)
      }
      /*if("climb:next" in conceptualScore) {
          //TODO REVISIT FOR JAM -- NO LONGER RELEVANT FOR CLIMB, AS MUZICODES NEEDS TO MAKE A DECISION
          // BEFORE THE 'DEFAULT' NEXT SCORE CAN BE DETERMINED
        // for dynamic meld applications:
        // create a new session for the default next score
        // (which sessionControl will then queue up)
        console.log("About to create next session for conceptual score: ", conceptualScore);
        dispatch(
          createSession(
            session.substr(0,session.lastIndexOf("/")),
            conceptualScore["climb:next"]["@id"]
          )
        )
      }*/
      })
    }
  }
}

export function scoreSetOptions(pubScoreUri, options) { 
  return { 
    type: SCORE_SET_OPTIONS,
    payload: { 
      options: options,
      uri: pubScoreUri 
    }
  }
}

export function scorePageToComponentTarget(target, pubScoreUri, MEI) {
  return {
    type: SCORE_PAGE_TO_TARGET,
    payload: {
      data: MEI,
      uri: pubScoreUri,
      target: target
    }
  }
}


export function scoreNextPageStatic(pubScoreUri, pageNum, MEI) {
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

export function scoreNextPage(session, nextSession, etag, annotation, pubScoreUri, pageNum, MEI) {
  return (dispatch) => {
    if (MEI) {
      // console.log("Attempting to action SCORE_NEXT_PAGE");
      const action = {
        type: SCORE_NEXT_PAGE,
        payload: {
          pageNum: pageNum,
          data: MEI,
          uri: pubScoreUri,
          nextSession: nextSession
        }
      };
      dispatch(
          patchAndProcessAnnotation(action, session, etag, annotation)
      );
    } else {
      dispatch({
        type: ANNOTATION_NOT_HANDLED,
        payload: "Page flip attempted on non-existing MEI. Has it loaded yet?"
      })
    }
  }
}


export function scorePrevPageStatic(pubScoreUri, pageNum, MEI) {
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

export function scorePrevPage(session, nextSession, etag, annotation, pubScoreUri, pageNum, MEI) {
  return (dispatch) => {
    if (MEI) {
      const action = {
        type: SCORE_PREV_PAGE,
        payload: {
          pageNum: pageNum,
          data: MEI,
          uri: pubScoreUri,
          nextSession: nextSession
        }
      };
      dispatch(
          patchAndProcessAnnotation(action, session, etag, annotation)
      );
    } else {
      dispatch({
        type: ANNOTATION_NOT_HANDLED,
        payload: "Page flip attempted on non-existing MEI. Has it loaded yet?"
      })
    }
  }
}

export function transitionToSession(thisSession, nextSession) {
  // TODO do this properly using react.router to avoid full reload
  window.location.assign('?session=' + nextSession);
  return {
    type: ANNOTATION_HANDLED
  }
}

export function resetNextSessionTrigger() {
  return {
    type: RESET_NEXT_SESSION_TRIGGER
  }
}

export function postNextPageAnnotation(session, etag) {
  return (dispatch) => {
    dispatch(
        postAnnotation(session, etag, JSON.stringify({
          "oa:hasTarget": {"@id": session},
          "oa:motivatedBy": {"@id": "motivation:nextPageOrPiece"}
        }))
    )
  }
}

export function postPrevPageAnnotation(session, etag) {
  return (dispatch) => {
    dispatch(
        postAnnotation(session, etag, JSON.stringify({
          "oa:hasTarget": {"@id": session},
          "oa:motivatedBy": {"@id": "motivation:prevPageOrPiece"}
        }))
    )
  }
}

export function postAnnotation(session, etag, json, retries = MAX_RETRIES, callback = {}) {
  let uuid = uuidv4();
  if(retries === "") { 
    retries = MAX_RETRIES;
  }
  if(!("id" in json) && !("@id" in json)) { 
    // bootstrap a UUID for this annotation
    json["@id"] = session + uuid + ".jsonld";
  }

  return (dispatch) => {
    if (retries) {
      console.log("Posting annotation: ", session, etag, json)
      auth.fetch(session, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/ld+json', 
          'If-None-Match': etag,
          'Slug': uuid + ".jsonld"
        },
        body: JSON.stringify(json)
      }).then( (response) => { 
          typeof callback === "function" && callback(response)
      }).catch(function (error) {
        if(!error.response){
          console.log(error, "Annotation post failed. Giving up.");
          return {
            type: ANNOTATION_NOT_HANDLED
          }
        }
        if (error.response.status == 412) {
          console.log("Mid-air collision while attempting to POST annotation. Retrying.", session, etag, json);
          // GET the session resource to figure out new etag
          auth.fetch(session).then((response) => {
            return (dispatch) => {
              // and try again
              setTimeout(() => {
                dispatch(postAnnotation(session, response.headers.get('etag'), json, retries - 1))
              }, RETRY_DELAY);
            }
          });
        } else {
          console.log("Retrying.");
          setTimeout(() => {
            dispatch(postAnnotation(session, response.headers.get(etag), json, retries - 1))
          }, RETRY_DELAY);
        }
      });

      return {
        type: ANNOTATION_POSTED
      }
    } else {
      console.log("FAILED TO POST ANNOTATION (MAX RETRIES EXCEEDED): ", session, etag, json);
      return {
        type: ANNOTATION_NOT_HANDLED
      }
    }
  }
}

export function markAnnotationProcessed(session, etag, annotation, retries = MAX_RETRIES) {
  if (retries) {
    // console.log("PATCHING: ", session, etag, annotation);
    const patchJson = JSON.stringify({
      "@id": annotation["@id"],
      "meld:state": {"@id": "meld:processed"}
    });
    axios.patch(
        session,
        patchJson,
        {headers: {'Content-Type': 'application/ld+json', 'If-None-Match': etag}}
    ).catch(function (error) {
      if (error.response.status == 412) {
        console.log("Mid-air collision while attempting to MARK annotation processed. Retrying.", session, etag, annotation);
        // GET the session resource to figure out new etag
        auth.fetch(session).then((response) => {
          // and try again
          return (dispatch) => {
            setTimeout(() => {
              dispatch(markAnnotationProcessed(session, response.headers.etag, annotation, retries - 1))
            }, RETRY_DELAY);
          }
        });
      } else {
        console.log("Error while patching annotation: ", error);
        console.log("Retrying.");
        return (dispatch) => {
          setTimeout(() => {
            dispatch(markAnnotationProcessed(session, response.headers.etag, annotation, retries - 1))
          }, RETRY_DELAY);
        }
      }
    }).then("Done?");

    return {
      type: ANNOTATION_PATCHED
    }
  } else {
    console.log("FAILED TO PATCH ANNOTATION (MAX RETRIES EXCEEDED): ", session, etag, annotation);
    return {
      type: ANNOTATION_NOT_HANDLED
    }
  }
}

export function patchAndProcessAnnotation(action, session, etag, annotation, success = {type: ANNOTATION_PATCHED}, retries = MAX_RETRIES) {
  if (retries) {
    // console.log("PATCHING: ", session, etag, annotation);
    const patchJson = JSON.stringify({
      "@id": annotation["@id"],
      "meld:state": {"@id": "meld:processed"}
    });
    return (dispatch) => {
      axios.patch(
          session,
          patchJson,
          {headers: {'Content-Type': 'application/ld+json', 'If-None-Match': etag}}
      ).then(function (response) {
        // console.log("Dispatching action: ", action);
        dispatch(action);
        // console.log("Dispatching success callback: ", success)
        dispatch(success);
      }).catch(function (error) {
        if (error.response.status == 412) {
          console.log("Mid-air collision while attempting to PATCH annotation. Retrying.", session, etag, annotation);
          // GET the session resource to figure out new etag
          auth.fetch(session).then((response) => {
            // and try again
            return (dispatch) => {
              setTimeout(() => {
                dispatch(patchAndProcessAnnotation(action, session, response.headers.etag, annotation, success, retries - 1))
              }, RETRY_DELAY);
            }
          });
        } else {
          console.log("Error while patching annotation: ", error);
          console.log("Retrying.");
          return (dispatch) => {
            setTimeout(() => {
              dispatch(patchAndProcessAnnotation(action, session, response.headers.etag, annotation, success, retries - 1))
            }, RETRY_DELAY);
          }
        }
      });
    }
  } else {
    console.log("FAILED TO PATCH ANNOTATION (MAX RETRIES EXCEEDED): ", session, etag, annotation);
    return {
      type: ANNOTATION_NOT_HANDLED
    }
  }
}


export function updateMuzicodes(muzicodesUri, session, mei = "") {
  // inform the muzicodes service that our session has loaded
  // console.log("Updating muzicodes:", muzicodesUri, session);
  const params = querystring.stringify({
    "name": "meld.load",
    "meldcollection": session,
    "meldmei": mei
  });

  auth.fetch(muzicodesUri, params);
  return ({
    type: MUZICODES_UPDATED
  })
}

// helper function to ensure that a given key of a JSON obj
// is an array, rather than a single value
// this is so that we can use the same approach for one and for
// many values
export function ensureArray(theObj, theKey) {
  if (theObj !== null && typeof theObj === 'object') {
    if (!theKey in theObj) {
      console.log("ensureArray: KEY NOT IN OBJECT!", theKey, theObj);
    } else if (!Array.isArray(theObj[theKey])) {
      theObj[theKey] = [theObj[theKey]];
    }
    return theObj;
  } else {
    console.log("ensureArray: Provided structure is NOT AN OBJECT!")
  }
}


// Function to set up the objectives (objects containing JSON-LD frames)
// matched against the graph being built during a traversal.
// Typically called once, on componentWillMount
export function configureTraversalObjectives(objectives) {
  return {
    type: SET_TRAVERSAL_OBJECTIVES,
    payload: objectives
  }
}

export function createSession(sessionsUri, scoreUri, {session = "", etag = "", retries = MAX_RETRIES, performerUri = "", slug = ""} = {}) {
  return (dispatch) => {
    if (retries) {
      // console.log("Trying to create session: ", sessionsUri, scoreUri, etag, retries, performerUri);
      auth.fetch(sessionsUri).then((getResponse) => {
        axios.post(
            sessionsUri,
            JSON.stringify({
              "@type": ["mo:Performance", "ldp:BasicContainer"],
              "mo:performance_of": {"@id": scoreUri}
            }),
            {
              headers: {
                "Content-Type": "application/ld+json",
                "If-None-Match": getResponse.headers.etag,
                "Slug": slug
              }
            }
        ).then((postResponse) => {
          // 1.Note that we've created the session
          // (for real-time client-side queueing)
          dispatch({
            type: CREATE_SESSION,
            payload: postResponse
          });
          // 2.If we've been called inside a session context,
          // post a corresponding queue annotation
          // (for later static revisits, e.g. in archive)
          if (session) {
            dispatch(
                postAnnotation(
                    session,
                    etag,
                    {
                      "oa:hasTarget": {"@id": session},
                      "oa:motivatedBy": {"@id": "motivation:queueNextSession"},
                      "oa:hasBody": {"@id": postResponse.headers.location}
                    }
                )
            )
          }
        }).catch(function (error) {
          if (error.response.status == 412) {
            console.log("Mid-air collision while attempting to POST annotation. Retrying.");
            dispatch(() => {
              setTimeout(() => {
                dispatch(createSession(sessionsUri, scoreUri, {
                  etag: getResponse.headers.etag,
                  retries: retries - 1,
                  performerUri: performerUri,
                  slug: slug
                }))
              }, RETRY_DELAY);
            })
          } else {
            console.log("Error while creating session: ", error);
            console.log("Retrying.");
            dispatch(() => {
              setTimeout(() => {
                dispatch(createSession(sessionsUri, scoreUri, {
                  etag: getResponse.headers.etag,
                  retries: retries - 1,
                  performerUri: performerUri,
                  slug: slug
                }))
              }, RETRY_DELAY);
            })
          }
        })
      })
    } else {
      console.log("FAILED TO CREATE SESSION (MAX RETRIES EXCEEDED): ", sessionsUri, scoreUri, response.headers.etag, retries - 1, performerUri);
      return {
        type: SESSION_NOT_CREATED
      }
    }
  }
}

export function tickTimedResource(resourceUri, time) {
  return {
    type: TICK,
    payload: {
      uri: resourceUri,
      time: time
    }
  }
}

export function registerClock(clockUri) {
  return {
    type: "REGISTER_CLOCK",
    payload: clockUri
  }
}

export function updateLatestRenderedPageNum(pageNum) {
  return {
    type: "UPDATE_LATEST_RENDERED_PAGENUM",
    payload: pageNum
  }
}
