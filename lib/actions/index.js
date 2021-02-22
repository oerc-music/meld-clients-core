"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fetchScore = fetchScore;
exports.fetchRibbonContent = fetchRibbonContent;
exports.fetchTEI = fetchTEI;
exports.registerTraversal = registerTraversal;
exports.traverse = traverse;
exports.checkTraversalObjectives = checkTraversalObjectives;
exports.setTraversalObjectives = setTraversalObjectives;
exports.fetchSessionGraph = fetchSessionGraph;
exports.fetchGraph = fetchGraph;
exports.fetchComponentTarget = fetchComponentTarget;
exports.fetchTargetExpression = fetchTargetExpression;
exports.fetchWork = fetchWork;
exports.fetchStructure = fetchStructure;
exports.fetchConceptualScore = fetchConceptualScore;
exports.scorePageToComponentTarget = scorePageToComponentTarget;
exports.scoreNextPageStatic = scoreNextPageStatic;
exports.scoreNextPage = scoreNextPage;
exports.scorePrevPageStatic = scorePrevPageStatic;
exports.scorePrevPage = scorePrevPage;
exports.transitionToSession = transitionToSession;
exports.resetNextSessionTrigger = resetNextSessionTrigger;
exports.postNextPageAnnotation = postNextPageAnnotation;
exports.postPrevPageAnnotation = postPrevPageAnnotation;
exports.postAnnotation = postAnnotation;
exports.markAnnotationProcessed = markAnnotationProcessed;
exports.patchAndProcessAnnotation = patchAndProcessAnnotation;
exports.updateMuzicodes = updateMuzicodes;
exports.ensureArray = ensureArray;
exports.configureTraversalObjectives = configureTraversalObjectives;
exports.createSession = createSession;
exports.tickTimedResource = tickTimedResource;
exports.registerClock = registerClock;
exports.updateLatestRenderedPageNum = updateLatestRenderedPageNum;
exports.RETRY_DELAY = exports.MAX_TRAVERSAL_HOPS = exports.MAX_RETRIES = exports.muzicodesUri = exports.UPDATE_LATEST_RENDERED_PAGENUM = exports.REGISTER_TRAVERSAL = exports.RUN_TRAVERSAL = exports.TRAVERSAL_CONSTRAINED = exports.TRAVERSAL_UNNECCESSARY = exports.TRAVERSAL_FAILED = exports.TRAVERSAL_HOP = exports.TRAVERSAL_PREHOP = exports.TICK = exports.SESSION_NOT_CREATED = exports.CREATE_SESSION = exports.HAS_PIANO = exports.HAS_PERFORMANCE_MEDIUM = exports.PUBLISHED_AS = exports.MUZICODE = exports.SEGMENT = exports.MOTIVATED_BY = exports.CONTAINS = exports.SCORE = exports.SEQPART = exports.SEQ = exports.HAS_STRUCTURE = exports.CHORD_TYPE = exports.DEGREE = exports.CADENCE = exports.HARMONY = exports.KEY = exports.PART = exports.PART_OF = exports.EXPRESSION = exports.REALIZATION_OF = exports.MUZICODES_UPDATED = exports.REGISTER_PUBLISHED_PERFORMANCE_SCORE = exports.TRANSITION_TO_NEXT_SESSION = exports.RESET_NEXT_SESSION_TRIGGER = exports.SESSION_GRAPH_ETAG = exports.PROCESS_ANNOTATION = exports.SCORE_PAGE_TO_TARGET = exports.SCORE_NEXT_PAGE = exports.SCORE_PREV_PAGE = exports.FETCH_MANIFESTATIONS = exports.FETCH_STRUCTURE = exports.PROCESS_COMPONENT_TARGET = exports.FETCH_COMPONENT_TARGET = exports.FETCH_TARGET_EXPRESSION = exports.FETCH_WORK = exports.FETCH_GRAPH_DOCUMENT = exports.FETCH_GRAPH = exports.FETCH_TEI = exports.FETCH_CONCEPTUAL_SCORE = exports.FETCH_RIBBON_CONTENT = exports.FETCH_SCORE = exports.HAS_BODY = exports.APPLY_TRAVERSAL_OBJECTIVE = exports.SET_TRAVERSAL_OBJECTIVES = void 0;

var _axios = _interopRequireDefault(require("axios"));

var _solidAuthClient = _interopRequireDefault(require("solid-auth-client"));

var _jsonld = _interopRequireDefault(require("jsonld"));

var _querystring = _interopRequireDefault(require("querystring"));

var _prefixes = require("../library/prefixes.js");

var _meldActions = require("./meldActions");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var SET_TRAVERSAL_OBJECTIVES = "SET_TRAVERSAL_OBJECTIVES";
exports.SET_TRAVERSAL_OBJECTIVES = SET_TRAVERSAL_OBJECTIVES;
var APPLY_TRAVERSAL_OBJECTIVE = "APPLY_OBJECTIVE";
exports.APPLY_TRAVERSAL_OBJECTIVE = APPLY_TRAVERSAL_OBJECTIVE;
var HAS_BODY = "oa:hasBody";
exports.HAS_BODY = HAS_BODY;
var FETCH_SCORE = 'FETCH_SCORE';
exports.FETCH_SCORE = FETCH_SCORE;
var FETCH_RIBBON_CONTENT = 'FETCH_RIBBON_CONTENT';
exports.FETCH_RIBBON_CONTENT = FETCH_RIBBON_CONTENT;
var FETCH_CONCEPTUAL_SCORE = 'FETCH_CONCEPTUAL_SCORE';
exports.FETCH_CONCEPTUAL_SCORE = FETCH_CONCEPTUAL_SCORE;
var FETCH_TEI = 'FETCH_TEI';
exports.FETCH_TEI = FETCH_TEI;
var FETCH_GRAPH = 'FETCH_GRAPH';
exports.FETCH_GRAPH = FETCH_GRAPH;
var FETCH_GRAPH_DOCUMENT = 'FETCH_GRAPH_DOCUMENT';
exports.FETCH_GRAPH_DOCUMENT = FETCH_GRAPH_DOCUMENT;
var FETCH_WORK = 'FETCH_WORK';
exports.FETCH_WORK = FETCH_WORK;
var FETCH_TARGET_EXPRESSION = 'FETCH_TARGET_EXPRESSION';
exports.FETCH_TARGET_EXPRESSION = FETCH_TARGET_EXPRESSION;
var FETCH_COMPONENT_TARGET = 'FETCH_COMPONENT_TARGET';
exports.FETCH_COMPONENT_TARGET = FETCH_COMPONENT_TARGET;
var PROCESS_COMPONENT_TARGET = 'PROCESS_COMPONENT_TARGET';
exports.PROCESS_COMPONENT_TARGET = PROCESS_COMPONENT_TARGET;
var FETCH_STRUCTURE = 'FETCH_STRUCTURE';
exports.FETCH_STRUCTURE = FETCH_STRUCTURE;
var FETCH_MANIFESTATIONS = 'FETCH_MANIFESTATIONS';
exports.FETCH_MANIFESTATIONS = FETCH_MANIFESTATIONS;
var SCORE_PREV_PAGE = 'SCORE_PREV_PAGE';
exports.SCORE_PREV_PAGE = SCORE_PREV_PAGE;
var SCORE_NEXT_PAGE = 'SCORE_NEXT_PAGE';
exports.SCORE_NEXT_PAGE = SCORE_NEXT_PAGE;
var SCORE_PAGE_TO_TARGET = 'SCORE_PAGE_TO_TARGET';
exports.SCORE_PAGE_TO_TARGET = SCORE_PAGE_TO_TARGET;
var PROCESS_ANNOTATION = 'PROCESS_ANNOTATION';
exports.PROCESS_ANNOTATION = PROCESS_ANNOTATION;
var SESSION_GRAPH_ETAG = 'SESSION_GRAPH_ETAG';
exports.SESSION_GRAPH_ETAG = SESSION_GRAPH_ETAG;
var RESET_NEXT_SESSION_TRIGGER = 'RESET_NEXT_SESSION_TRIGGER';
exports.RESET_NEXT_SESSION_TRIGGER = RESET_NEXT_SESSION_TRIGGER;
var TRANSITION_TO_NEXT_SESSION = 'TRANSITION_TO_NEXT_SESSION';
exports.TRANSITION_TO_NEXT_SESSION = TRANSITION_TO_NEXT_SESSION;
var REGISTER_PUBLISHED_PERFORMANCE_SCORE = 'REGISTER_PUBLISHED_PERFORMANCE_SCORE';
exports.REGISTER_PUBLISHED_PERFORMANCE_SCORE = REGISTER_PUBLISHED_PERFORMANCE_SCORE;
var MUZICODES_UPDATED = 'MUZICODES_UPDATED';
exports.MUZICODES_UPDATED = MUZICODES_UPDATED;
var REALIZATION_OF = 'frbr:realizationOf';
exports.REALIZATION_OF = REALIZATION_OF;
var EXPRESSION = 'frbr:Expression';
exports.EXPRESSION = EXPRESSION;
var PART_OF = 'frbr:partOf';
exports.PART_OF = PART_OF;
var PART = 'frbr:part';
exports.PART = PART;
var KEY = 'mo:key';
exports.KEY = KEY;
var HARMONY = 'https://meld.linkedmusic.org/companion/vocab/harmony';
exports.HARMONY = HARMONY;
var CADENCE = 'https://meld.linkedmusic.org/companion/vocab/cadentialGoal';
exports.CADENCE = CADENCE;
var DEGREE = 'https://meld.linkedmusic.org/companion/vocab/hasDegree';
exports.DEGREE = DEGREE;
var CHORD_TYPE = 'https://meld.linkedmusic.org/companion/vocab/chordType';
exports.CHORD_TYPE = CHORD_TYPE;
var HAS_STRUCTURE = 'https://meld.linkedmusic.org/terms/hasStructure';
exports.HAS_STRUCTURE = HAS_STRUCTURE;
var SEQ = 'http://www.w3.org/1999/02/22-rdf-syntax-ns#Seq';
exports.SEQ = SEQ;
var SEQPART = 'http://www.w3.org/1999/02/22-rdf-syntax-ns#_';
exports.SEQPART = SEQPART;
var SCORE = 'http://purl.org/ontology/mo/Score';
exports.SCORE = SCORE;
var CONTAINS = 'http://www.w3.org/ns/ldp#contains';
exports.CONTAINS = CONTAINS;
var MOTIVATED_BY = 'http://www.w3.org/ns/oa#motivatedBy';
exports.MOTIVATED_BY = MOTIVATED_BY;
var SEGMENT = 'so:Segment';
exports.SEGMENT = SEGMENT;
var MUZICODE = 'meld:Muzicode';
exports.MUZICODE = MUZICODE;
var PUBLISHED_AS = 'http://purl.org/ontology/mo/published_as';
exports.PUBLISHED_AS = PUBLISHED_AS;
var HAS_PERFORMANCE_MEDIUM = 'http://rdaregistry.info/Elements/e/p20215';
exports.HAS_PERFORMANCE_MEDIUM = HAS_PERFORMANCE_MEDIUM;
var HAS_PIANO = "http://id.loc.gov/authorities/performanceMediums/2013015550";
exports.HAS_PIANO = HAS_PIANO;
var CREATE_SESSION = "CREATE_SESSION";
exports.CREATE_SESSION = CREATE_SESSION;
var SESSION_NOT_CREATED = "SESSION_NOT_CREATED";
exports.SESSION_NOT_CREATED = SESSION_NOT_CREATED;
var TICK = "TICK";
exports.TICK = TICK;
var TRAVERSAL_PREHOP = "TRAVERSAL_PREHOP";
exports.TRAVERSAL_PREHOP = TRAVERSAL_PREHOP;
var TRAVERSAL_HOP = "TRAVERSAL_HOP";
exports.TRAVERSAL_HOP = TRAVERSAL_HOP;
var TRAVERSAL_FAILED = "TRAVERSAL_FAILED";
exports.TRAVERSAL_FAILED = TRAVERSAL_FAILED;
var TRAVERSAL_UNNECCESSARY = "TRAVERSAL_UNNECCESSARY";
exports.TRAVERSAL_UNNECCESSARY = TRAVERSAL_UNNECCESSARY;
var TRAVERSAL_CONSTRAINED = "TRAVERSAL_CONSTRAINED";
exports.TRAVERSAL_CONSTRAINED = TRAVERSAL_CONSTRAINED;
var RUN_TRAVERSAL = "RUN_TRAVERSAL";
exports.RUN_TRAVERSAL = RUN_TRAVERSAL;
var REGISTER_TRAVERSAL = "REGISTER_TRAVERSAL";
exports.REGISTER_TRAVERSAL = REGISTER_TRAVERSAL;
var UPDATE_LATEST_RENDERED_PAGENUM = "UPDATE_LATEST_RENDERED_PAGENUM";
exports.UPDATE_LATEST_RENDERED_PAGENUM = UPDATE_LATEST_RENDERED_PAGENUM;
var muzicodesUri = "http://127.0.0.1:5000/MUZICODES";
exports.muzicodesUri = muzicodesUri;
var MAX_RETRIES = 3;
exports.MAX_RETRIES = MAX_RETRIES;
var MAX_TRAVERSAL_HOPS = 10;
exports.MAX_TRAVERSAL_HOPS = MAX_TRAVERSAL_HOPS;
var RETRY_DELAY = 10; // TODO move context somewhere global -- most framing happens server side
// anyway, but in cases where the framed URI contains a fragment ("#"), 
// we have to do it client-side		

exports.RETRY_DELAY = RETRY_DELAY;
var context = {
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

function fetchScore(url) {
  console.log("FETCH_SCORE ACTION on URI: ", url);
  return function (dispatch) {
    _solidAuthClient["default"].fetch(url, {
      mode: 'cors'
    }).then(function (response) {
      return response.text();
    }).then(function (data) {
      dispatch({
        type: FETCH_SCORE,
        payload: {
          data: data,
          config: {
            url: url
          }
        }
      });
    });
  };
}

function fetchRibbonContent(url) {
  // console.log("FETCH_RIBBON_CONTENT ACTION on URI: ", uri);
  var promise = _solidAuthClient["default"].fetch(url);

  return function (dispatch) {
    _solidAuthClient["default"].fetch(url, {
      mode: 'cors'
    }).then(function (response) {
      return response.text();
    }).then(function (data) {
      dispatch({
        type: FETCH_RIBBON_CONTENT,
        payload: {
          data: data,
          config: {
            url: url
          }
        }
      });
    });
  };
  /*
  return {
   type: FETCH_RIBBON_CONTENT,
   payload: promise
  }*/
}

function fetchTEI(uri) {
  var promise = new CETEI().getHTML5(uri);
  return function (dispatch) {
    promise.then(function (data) {
      dispatch({
        type: FETCH_TEI,
        payload: {
          data: data,
          uri: uri
        }
      });
    });
  };
}

function registerTraversal(docUri) {
  var suppliedParams = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
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
  var defaultParams = {
    extendObjectPrefix: [],
    extendObjectUri: [],
    extendObjectType: [],
    ignoreObjectPrefix: [],
    ignoreObjectUri: [],
    ignoreObjectType: [],
    followPropertyPrefix: [],
    followPropertyUri: [],
    ignorePpropertyPrefix: [],
    ignorePropertyUri: [],
    objectives: {},
    numHops: MAX_TRAVERSAL_HOPS,
    useEtag: false,
    etag: ""
  };

  var params = _objectSpread({}, defaultParams); // Check for unknown parameter/option names, and issue warnings


  var key;

  for (key in suppliedParams) {
    if (!(key in params)) {
      console.log("registerTraversal: unrecognized option: ", key);
    }
  } // For older app compatibility, map old parameter names to new


  var oldParamsMap = (("objectPrefixWhitelist", "extendObjectPrefix"), ("objectUriWhitelist", "extendObjectUri"), ("objectTypeWhitelist", "extendObjectType"), ("objectPrefixBlacklist", "ignoreObjectPrefix"), ("objectUriBlacklist", "ignoreObjectUri"), ("objectTypeBlacklist", "ignoreObjectType"), ("propertyPrefixWhitelist", "followPropertyPrefix"), ("propertyUriWhitelist", "followPropertyUri"), ("propertyPrefixBlacklist", "ignorePpropertyPrefix"), ("propertyUriBlacklist", "ignorePropertyUri"));

  for (var i in oldParamsMap) {
    var oldkey = oldParamsMap[i][0];
    var newkey = oldParamsMap[i][1];

    if (oldkey in suppliedParams && !(newkey in suppliedParams)) {
      params[newkey] = suppliedParams[oldkey];
    }
  }

  var unimplementedParams = ("extendObjectType", "ignoreObjectType", "followPropertyPrefix", "followPropertyUri", "ignorePpropertyPrefix", "ignorePropertyUri");

  for (key in unimplementedParams) {
    if (key in params) {
      console.log("registerTraversal: unimplemented option: ", key);
    }
  }

  console.log("registerTraversal: FETCHING: ", docUri, params);

  if (passesTraversalConstraints({
    "@id": docUri
  }, params)) {
    console.log("passes Traversal Constraints: REGISTER_TRAVERSAL");
    return {
      type: REGISTER_TRAVERSAL,
      payload: {
        docUri: docUri,
        params: params
      }
    };
  } else {
    console.log("fails Traversal Constraints: TRAVERSAL_CONSTRAINED");
    return {
      type: TRAVERSAL_CONSTRAINED
    };
  }
}

function traverse(docUri, params) {
  // set up HTTP request
  var headers = {
    'Accept': 'application/ld+json'
  };

  if (params["useEtag"]) {
    headers['If-None-Match'] = params["etag"];
  }

  console.log("traverse: FETCHING: ", docUri, params);

  var promise = _solidAuthClient["default"].fetch(docUri, {
    headers: headers,
    mode: 'cors'
  });

  return function (dispatch) {
    dispatch({
      type: RUN_TRAVERSAL,
      payload: {
        docUri: docUri
      }
    });
    promise.then(function (response) {
      if (response.status == 304) {
        console.log("traverse: TRAVERSAL_UNNECCESSARY");
        dispatch({
          type: TRAVERSAL_UNNECCESSARY
        });
        return; // file not modified, i.e. etag matched, no updates required
      }

      console.log(response.headers.get("Content-Type")); // attempt to decide content type (either explicitly provided or by file suffix)
      // and proceed with traversal accordingly

      if (docUri.endsWith(".json") || docUri.endsWith(".jsonld") || docUri.endsWith(".json-ld") || response.headers.get("Content-Type").startsWith("application/ld+json") || response.headers.get("Content-Type").startsWith("application/json")) {
        // treat as JSON-LD document
        dispatch(traverseJSONLD(dispatch, docUri, params, response.json()));
      } else if (docUri.endsWith(".ttl") || docUri.endsWith(".n3") || docUri.endsWith(".rdf") || docUri.endsWith(".nq") || docUri.endsWith(".nt") || response.headers.get("Content-Type").startsWith("application/rdf+xml") || response.headers.get("Content-Type").startsWith("application/nquads") || response.headers.get("Content-Type").startsWith("application/x-turtle") || response.headers.get("Content-Type").startsWith("text/turtle")) {
        // treat as RDF document
        // TODO: Translate RDF to JSON-LD, then proceed with traverseJSONLD as above
        console.log("traverse: RDF-to-JSON conversion not implemented: ", docUri);
      } else {
        console.log("traverse: TRAVERSAL_FAILED");
        console.log("Don't know how to treat this document: ", docUri, response);
        dispatch({
          type: TRAVERSAL_FAILED
        });
      } // appropriately handle content types
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

    })["catch"](function (err) {
      dispatch({
        type: TRAVERSAL_FAILED
      });
      console.log("Could not retrieve ", docUri, err);
    });
    return {
      type: TRAVERSAL_PREHOP
    };
  };
} //helper function: 
// skolemize blank nodes to prevent identifier clashes between documents
// by detecting "_:<blank-node-identifier>"
// and replacing with document uri appended with  /genid/<blank-node-identifier> 
// by virtue of traversal mechanism, we only ever visit each document once, 
// so clashes with the same document should not occur.


function skolemize(obj, docUri) {
  if (Array.isArray(obj)) {
    // if fed an array, recur on each constitutent
    obj = obj.map(function (o) {
      return skolemize(o, docUri);
    });
  } else if (obj === Object(obj)) {
    // if fed an object, iterate over each key
    Object.keys(obj).map(function (k) {
      if (k === "@id") {
        // found an @id, check for blank node and skolemize if necesssary
        obj["@id"] = obj["@id"].replace("_:", docUri + "#genid-");
      } else {
        // recur on value
        obj[k] = skolemize(obj[k], docUri);
      }
    });
  }

  return obj;
}

function traverseJSONLD(dispatch, docUri, params, dataPromise) {
  console.log("in traverseJSONLD or doc ", docUri, "with exclude list ", params["ignoreObjectUri"]); // expand the JSON-LD object so that we are working with full URIs, not compacted into prefixes

  dataPromise.then(function (data) {
    console.log("attempting to expand: ", data);

    _jsonld["default"].expand(data, function (err, expanded) {
      console.log("traverseJSONLD jsonld.expand callback", err, expanded);

      if (err) {
        console.log("EXPANSION ERROR: ", docUri, err);
      }

      console.log("Got expanded json: ", expanded); // flatten the expanded JSON-LD object so that each described entity has an ID at the top-level of the tree

      _jsonld["default"].flatten(expanded, function (err, flattened) {
        var skolemized = skolemize(flattened, docUri);
        dispatch({
          type: FETCH_GRAPH_DOCUMENT,
          payload: {
            data: skolemized,
            uri: docUri
          }
        }); // convert the flattened array of JSON-LD structures into a lookup table using each entity's URI ("@id")

        var idLookup = {};
        Object.entries(skolemized).forEach(function (_ref) {
          var _ref2 = _slicedToArray(_ref, 2),
              key = _ref2[0],
              value = _ref2[1];

          idLookup[value["@id"]] = value;
        });
        Object.entries(idLookup).forEach(function (_ref3) {
          var _ref4 = _slicedToArray(_ref3, 2),
              subjectUri = _ref4[0],
              subjectDescription = _ref4[1];

          // iterating through each entity within the document as the subject,
          // look at its description (set of predicate-object tuples).
          Object.entries(subjectDescription).forEach(function (_ref5) {
            var _ref6 = _slicedToArray(_ref5, 2),
                pred = _ref6[0],
                objs = _ref6[1];

            // because JSON-LD, objs could be a single object or an array of objects
            // therefore, ensure consistency:
            objs = Array.isArray(objs) ? objs : [objs];
            objs.map(function (obj) {
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
                  dispatch(registerTraversal(obj["@id"], _objectSpread(_objectSpread({}, params), {}, {
                    // Remember that we've already visited the current document to avoid loops
                    "ignoreObjectUri": params["ignoreObjectUri"].concat(docUri.split("#")[0]),
                    "numHops": params["numHops"] - 1
                  })));
                }
              } else {// our *RDF* object is a literal
                // n.b. exceptions where pred is @type, @id, etc. There, the obj is still a URI, not a literal
                // Could test for those explicitly here.
                // CHECK FOR OBJECTIVES HERE
                //	console.log("||", subjectUri, pred, obj, docUri)
              }
            });
          });
        });
      });
    });
  });
  return {
    type: TRAVERSAL_HOP
  };
}

function passesTraversalConstraints(obj, params) {
  // filter function that returns TRUE if uri should be traversed to
  // (with a given set of constraints in the params)
  //
  // test: ensure we haven't run out of hops
  if (params["numHops"] === 0) {
    //console.log("Test 1: Out of hops", obj, params)
    return false;
  } // test: ensure obj is not a literal


  if (!("@id" in obj)) {
    // ////console.log("Test 2: Found a literal", obj, params)
    return false;
  }

  var resourceUri = obj["@id"].split("#")[0]; // don't traverse fragments of an excluded resource...
  // test: object URI doesn't violate constraints

  if (params["extendObjectUri"].length) {
    // URI inclusion list specified:
    // only pass if included in URI inclusion list AND not in URI exclusion list
    if (!params["extendObjectUri"].includes(resourceUri) || params["ignoreObjectUri"].includes(resourceUri)) {
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
  } // test: object URI doesn't violate PREFIX constraints


  var prefixExcluded = params["ignoreObjectPrefix"].filter(function (pre) {
    return resourceUri.startsWith(pre.split("#")[0]);
  }); // only pass if prefix not excluded

  if (prefixExcluded.length) {
    //console.log("Test 5: prefix excluded", obj, params)
    return false;
  }

  if (params["extendObjectPrefix"].length) {
    // Prefix inclusion list specified:
    var prefixIncluded = params["extendObjectPrefix"].filter(function (pre) {
      return resourceUri.startsWith(pre);
    }); // only pass if included in prefix inclusion list

    if (prefixIncluded.length === 0) {
      //console.log("Test 6: prefix not in specified inclusion list", obj, params)
      return false;
    }
  } //console.log("Object passes all traversal constraint tests", obj, params, params["extendObjectPrefix"], params["ignoreObjectPrefix"], params["ignoreObjectUri"]);


  return true;
}

function checkTraversalObjectives(graph, objectives) {
  // check a given json-ld structure against a set of objectives (json-ld frames)
  return function (dispatch) {
    objectives.map(function (obj, ix) {
      _jsonld["default"].frame(graph, obj, function (err, framed) {
        if (err) {
          console.log("FRAMING ERROR: ", objectives[ix], err);
        } else {
          dispatch({
            type: APPLY_TRAVERSAL_OBJECTIVE,
            payload: {
              ix: ix,
              framed: framed
            }
          });
        }
      });
    });
  };
}

function setTraversalObjectives(objectives) {
  return {
    type: SET_TRAVERSAL_OBJECTIVES,
    payload: objectives
  };
}

function fetchSessionGraph(uri) {
  var etag = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "";

  // console.log("FETCH_SESSION_GRAPH ACTION ON URI: ", uri, " with etag: ", etag);
  // TODO add etag to header as If-None-Match and enable corresponding support on server
  // so that it can respond with 304 instead of 200 (i.e. so it can ommit file body)
  var promise = _solidAuthClient["default"].fetch(uri, {
    headers: {
      'Accept': 'application/ld+json',
      'If-None-Match': etag
    },
    mode: 'cors'
  });

  return function (dispatch) {
    promise.then(function (response) {
      if (response.status == 304) {
        return; // don't need to do any new work
      }

      var framed = response.data;
      var session = framed["@graph"][0];

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
        }); // take note of the new etag

        dispatch({
          type: SESSION_GRAPH_ETAG,
          payload: {
            uri: uri,
            etag: response.headers.etag
          }
        });

        if ("ldp:contains" in framed["@graph"][0]) {
          // there are one or more annotations to process
          framed["@graph"][0] = ensureArray(framed["@graph"][0], "ldp:contains"); // process each annotation

          framed["@graph"][0]["ldp:contains"].map(function (annotation) {
            dispatch(processComponentAnnotation(annotation, session["mo:performance_of"]["@id"]));
          });
        }
      }
    });
  };
}

function fetchGraph(uri) {
  // console.log("FETCH_GRAPH ACTION ON URI: ", uri);
  var promise = _solidAuthClient["default"].fetch(uri);

  return function (dispatch) {
    promise.then(function (_ref7) {
      var data = _ref7.data;
      // dispatch the graph data
      dispatch({
        type: FETCH_GRAPH,
        payload: data
      }); // walk through component annotations

      data["@graph"][0]["ldp:contains"].map(function (topLevel) {
        topLevel["oa:hasBody"].map(function (annotation) {
          dispatch(processComponentAnnotation(annotation));
        });
      });
    });
  };
}

function processComponentAnnotation(annotation) {
  var conceptualScore = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "";

  if ("meld:state" in annotation && annotation["meld:state"]["@id"] === "meld:processed") {
    // We can skip this processed annotation
    return {
      type: _meldActions.ANNOTATION_SKIPPED,
      payload: annotation
    };
  }

  annotation = ensureArray(annotation, "oa:hasTarget"); // console.log("Processing component annotation: ", annotation, conceptualScore)

  var targets = annotation["oa:hasTarget"].map(function (target) {
    return {
      "@id": target["@id"],
      // DW TODO 20170830 may need to validate whether @type exists
      "@type": target["@type"]
    };
  });
  return function (dispatch) {
    targets.map(function (target) {
      dispatch(fetchComponentTarget(target["@id"], conceptualScore));
    });
    dispatch({
      type: PROCESS_ANNOTATION,
      payload: {
        id: annotation["@id"],
        bodies: annotation["oa:hasBody"],
        targets: targets
      }
    });
  };
}

function fetchComponentTarget(uri) {
  var conceptualScore = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "";

  // console.log("FETCH_COMPONENT_TARGET ACTION ON URI: ", uri);
  var promise = _solidAuthClient["default"].fetch(uri, {
    headers: {
      'Accept': 'application/ld+json'
    },
    mode: 'cors'
  });

  return function (dispatch) {
    promise.then(function (data) {
      // console.log("Attemping to frame data", data);
      if (!"content-type" in data.headers || data.headers.get("Content-Type") !== "application/json" && data.headers.get("Content-Type") !== "application/ld+json") {
        // console.log("Converting to JSON...");
        // need to convert triples to json
        // TODO handle arbitrary RDF format here (currently requires ntriples)
        _jsonld["default"].fromRDF(data.data, function (err, doc) {
          if (err) {
            console.log("ERROR CONVERTING NQUADS TO JSON-LD: ", err);
          } else {
            dispatch(processComponentTarget(doc, uri, conceptualScore));
          }
        });
      } else {
        // already in json format
        dispatch(processComponentTarget(data.data, uri, conceptualScore));
      }
    });
  };
}

function processComponentTarget(data, uri, conceptualScore) {
  // console.log("PROCESS_COMPONENT_TARGET ACTION ON URI: ", uri);
  return function (dispatch) {
    _jsonld["default"].frame(data, {
      "@id": uri
    }, function (err, framed) {
      if (err) {
        // console.log("FRAMING ERROR in processComponentTarget:", err)
        return {
          type: _meldActions.ANNOTATION_NOT_HANDLED
        };
      } else {
        _jsonld["default"].compact(framed, context, function (err, compacted) {
          if (err) {
            console.log("COMPACTING ERROR in processComponentTarget:", err);
          } else {
            dispatch({
              type: FETCH_COMPONENT_TARGET,
              payload: {
                conceptualScore: conceptualScore,
                structureTarget: uri
              }
            }); // console.log("COMPACTED: ", compacted);

            var typecheck = compacted;
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
          }
        });
      }
    });
  };
}

function fetchTargetExpression(compacted) {
  // traverse from the provided Expression, via a Segment, to Manifestation(s)
  // console.log("In fetchTargetExpression: ", compacted);
  return function (dispatch) {
    dispatch({
      type: FETCH_TARGET_EXPRESSION,
      payload: compacted
    });
    var target = compacted;

    if (target["@type"].includes(EXPRESSION)) {
      // found an expression
      // Do we have a harmony declaration?
      var chords = [];
      var expressionObj = {};
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
      } // does it have any parts?


      var parts = []; // console.log("part check: ", target)

      if (PART in target) {
        // sometimes we may have multiple parts or part sequences; sometimes only one
        // so ensure we have an array to work with (even if it's length one)
        // TODO refactor to use ensureArray helper function
        if (!Array.isArray(target[PART])) {
          target[PART] = [target[PART]];
        } // now process each sequence


        target[PART].map(function (p) {
          if ("@type" in p && p["@type"].includes(SEQ)) {
            // it's an RDF sequence
            Object.keys(p).map(function (part) {
              if (part.startsWith(SEQPART)) {
                parts.push(p[part]["@id"]);
              }
            });
          } else {
            parts.push(p["@id"]);
          }
        }); // now fetch the work to continue on to the manifestations associated with these parts

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
  };
}

function fetchWork(target, parts, work, expressionObj) {
  // console.log("STARTING FETCHWORK WITH ", work, parts, expressionObj);
  return function (dispatch) {
    dispatch({
      type: FETCH_WORK,
      payload: {
        target: target,
        parts: parts,
        works: work,
        chords: expressionObj
      }
    });

    _solidAuthClient["default"].fetch(work).then(function (data) {
      _jsonld["default"].fromRDF(data.data, function (err, doc) {
        if (err) {
          console.log("ERROR TRANSLATING NQUADS TO JSONLD: ", err, data.data);
        } else {
          _jsonld["default"].frame(doc, {
            "@id": work
          }, function (err, framed) {
            if (err) {
              console.log("FRAMING ERROR in fetchWork:", err);
            } else {
              _jsonld["default"].compact(framed, context, function (err, compacted) {
                if (err) {
                  console.log("COMPACTING ERROR in fetchWork:", err);
                } else {
                  work = compacted; // Check if there is a segment line, in which case fetch manifestations
                  // else, check if this is part of another ("parent") work

                  if (HAS_STRUCTURE in work) {
                    dispatch(fetchStructure(target, parts, work[HAS_STRUCTURE]["@id"]));
                  } else if (PART_OF in work) {
                    // does our doc attach a Score which realizes the parent work?
                    // FIXME HACKHACK:
                    // framing expands the nice compacted URIs
                    // so here we need to use full URIs instead of REALIZATION_OF as defined above
                    _jsonld["default"].frame({
                      "@context": context,
                      "@graph": doc
                    }, {
                      "http://purl.org/vocab/frbr/core#realizationOf": work[PART_OF]["@id"]
                    }, function (err, framed) {
                      if (err) {
                        console.log("FRAMING ERROR when fetching parent work", err);
                      } else {
                        // console.log("Attached score:", framed);
                        var attachedScore = framed["@graph"][0];

                        if (attachedScore && "@type" in attachedScore && attachedScore["@type"] === SCORE) {
                          // FIXME breaks with multiple types
                          // Found an attached Score!!!
                          if (PUBLISHED_AS in attachedScore) {
                            // for now: assume published scores
                            // are attached in same file
                            // FIXME enable external pub_scores
                            attachedScore[PUBLISHED_AS].map(function (pubScore) {
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
                              } else {// console.log("Published score without performance medium: ", pubScore["@id"]);
                              }
                            });
                          } else {// console.log("Unpublished score: ", attachedScore);
                          }

                          if (HAS_STRUCTURE in attachedScore) {
                            dispatch(fetchStructure(target, parts, attachedScore[HAS_STRUCTURE]["@id"]));
                          } else {// console.log("Score ", attachedScore["@id"], " attached to work ", work["@id"], " has no segment line!!");
                          }
                        } else {
                          // no attached Score, so we have to recurse on the parent work
                          dispatch(fetchWork(target, parts, work[PART_OF]["@id"]));
                        }
                      }
                    });
                  } else {// console.log("Found work without segmentLine or partonomy! ", work);
                  }
                }
              });
            }
          });
        }
      });
    });
  };
}

function fetchStructure(target, parts, segline) {
  return function (dispatch) {
    dispatch({
      type: FETCH_STRUCTURE,
      payload: {
        target: target,
        parts: parts,
        structure: segline
      }
    });

    _solidAuthClient["default"].fetch(segline).then(function (data) {
      _jsonld["default"].fromRDF(data.data, function (err, doc) {
        if (err) {
          console.log("ERROR TRANSLATING NQUADS TO JSONLD: ", err, data.data);
        } else {
          // frame the doc in terms of each part of the expression targetted by the annotation
          parts.map(function (part) {
            _jsonld["default"].frame(doc, {
              "@id": part
            }, function (err, framed) {
              if (err) {
                console.log("FRAMING ERROR in fetchStructure: ", err);
              } else {
                _jsonld["default"].compact(framed, context, function (err, compacted) {
                  if (err) {
                    console.log("COMPACTING ERROR in fetchStructure:", err);
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
  };
}

function fetchConceptualScore(session, uri) {
  // console.log("FETCH_CONCEPTUAL_SCORE ON URI: ", uri);
  var promise = _solidAuthClient["default"].fetch(uri, {
    headers: {
      'Accept': 'application/ld+json'
    }
  });

  return function (dispatch) {
    promise.then(function (response) {
      var framed = response.data;
      var conceptualScore = framed["@graph"][0];

      if ("mo:published_as" in conceptualScore) {
        // dispatch the conceptual score (containing the mei URI) so that we can initialise a <Score> component
        dispatch({
          type: FETCH_CONCEPTUAL_SCORE,
          payload: conceptualScore
        });
        dispatch(fetchScore(conceptualScore["mo:published_as"]["@id"]));
      } else {
        console.log("Unpublished conceptual score: ", conceptualScore);
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

    });
  };
}

function scorePageToComponentTarget(target, pubScoreUri, MEI) {
  return {
    type: SCORE_PAGE_TO_TARGET,
    payload: {
      data: MEI,
      uri: pubScoreUri,
      target: target
    }
  };
}

function scoreNextPageStatic(pubScoreUri, pageNum, MEI) {
  return function (dispatch) {
    dispatch({
      type: SCORE_NEXT_PAGE,
      payload: {
        pageNum: pageNum,
        data: MEI,
        uri: pubScoreUri
      }
    });
  };
}

function scoreNextPage(session, nextSession, etag, annotation, pubScoreUri, pageNum, MEI) {
  return function (dispatch) {
    if (MEI) {
      // console.log("Attempting to action SCORE_NEXT_PAGE");
      var action = {
        type: SCORE_NEXT_PAGE,
        payload: {
          pageNum: pageNum,
          data: MEI,
          uri: pubScoreUri,
          nextSession: nextSession
        }
      };
      dispatch(patchAndProcessAnnotation(action, session, etag, annotation));
    } else {
      dispatch({
        type: _meldActions.ANNOTATION_NOT_HANDLED,
        payload: "Page flip attempted on non-existing MEI. Has it loaded yet?"
      });
    }
  };
}

function scorePrevPageStatic(pubScoreUri, pageNum, MEI) {
  return function (dispatch) {
    dispatch({
      type: SCORE_PREV_PAGE,
      payload: {
        pageNum: pageNum,
        data: MEI,
        uri: pubScoreUri
      }
    });
  };
}

function scorePrevPage(session, nextSession, etag, annotation, pubScoreUri, pageNum, MEI) {
  return function (dispatch) {
    if (MEI) {
      var action = {
        type: SCORE_PREV_PAGE,
        payload: {
          pageNum: pageNum,
          data: MEI,
          uri: pubScoreUri,
          nextSession: nextSession
        }
      };
      dispatch(patchAndProcessAnnotation(action, session, etag, annotation));
    } else {
      dispatch({
        type: _meldActions.ANNOTATION_NOT_HANDLED,
        payload: "Page flip attempted on non-existing MEI. Has it loaded yet?"
      });
    }
  };
}

function transitionToSession(thisSession, nextSession) {
  // TODO do this properly using react.router to avoid full reload
  window.location.assign('?session=' + nextSession);
  return {
    type: _meldActions.ANNOTATION_HANDLED
  };
}

function resetNextSessionTrigger() {
  return {
    type: RESET_NEXT_SESSION_TRIGGER
  };
}

function postNextPageAnnotation(session, etag) {
  return function (dispatch) {
    dispatch(postAnnotation(session, etag, JSON.stringify({
      "oa:hasTarget": {
        "@id": session
      },
      "oa:motivatedBy": {
        "@id": "motivation:nextPageOrPiece"
      }
    })));
  };
}

function postPrevPageAnnotation(session, etag) {
  return function (dispatch) {
    dispatch(postAnnotation(session, etag, JSON.stringify({
      "oa:hasTarget": {
        "@id": session
      },
      "oa:motivatedBy": {
        "@id": "motivation:prevPageOrPiece"
      }
    })));
  };
}

function postAnnotation(session, etag, json) {
  var retries = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : MAX_RETRIES;
  var callback = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : {};

  if (retries === "") {
    retries = MAX_RETRIES;
  }

  return function (dispatch) {
    if (retries) {
      console.log("Posting annotation: ", session, etag, json);

      _solidAuthClient["default"].fetch(session, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/ld+json',
          'If-None-Match': etag
        },
        body: JSON.stringify(json)
      }).then(function (response) {
        typeof callback === "function" && callback(response);
      })["catch"](function (error) {
        if (!error.response) {
          console.log(error, "Annotation post failed. Giving up.");
          return {
            type: _meldActions.ANNOTATION_NOT_HANDLED
          };
        }

        if (error.response.status == 412) {
          console.log("Mid-air collision while attempting to POST annotation. Retrying.", session, etag, json); // GET the session resource to figure out new etag

          _solidAuthClient["default"].fetch(session).then(function (response) {
            return function (dispatch) {
              // and try again
              setTimeout(function () {
                dispatch(postAnnotation(session, response.headers.get('etag'), json, retries - 1));
              }, RETRY_DELAY);
            };
          });
        } else {
          console.log("Retrying.");
          setTimeout(function () {
            dispatch(postAnnotation(session, response.headers.get(etag), json, retries - 1));
          }, RETRY_DELAY);
        }
      });

      return {
        type: _meldActions.ANNOTATION_POSTED
      };
    } else {
      console.log("FAILED TO POST ANNOTATION (MAX RETRIES EXCEEDED): ", session, etag, json);
      return {
        type: _meldActions.ANNOTATION_NOT_HANDLED
      };
    }
  };
}

function markAnnotationProcessed(session, etag, annotation) {
  var retries = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : MAX_RETRIES;

  if (retries) {
    // console.log("PATCHING: ", session, etag, annotation);
    var patchJson = JSON.stringify({
      "@id": annotation["@id"],
      "meld:state": {
        "@id": "meld:processed"
      }
    });

    _axios["default"].patch(session, patchJson, {
      headers: {
        'Content-Type': 'application/ld+json',
        'If-None-Match': etag
      }
    })["catch"](function (error) {
      if (error.response.status == 412) {
        console.log("Mid-air collision while attempting to MARK annotation processed. Retrying.", session, etag, annotation); // GET the session resource to figure out new etag

        _solidAuthClient["default"].fetch(session).then(function (response) {
          // and try again
          return function (dispatch) {
            setTimeout(function () {
              dispatch(markAnnotationProcessed(session, response.headers.etag, annotation, retries - 1));
            }, RETRY_DELAY);
          };
        });
      } else {
        console.log("Error while patching annotation: ", error);
        console.log("Retrying.");
        return function (dispatch) {
          setTimeout(function () {
            dispatch(markAnnotationProcessed(session, response.headers.etag, annotation, retries - 1));
          }, RETRY_DELAY);
        };
      }
    }).then("Done?");

    return {
      type: _meldActions.ANNOTATION_PATCHED
    };
  } else {
    console.log("FAILED TO PATCH ANNOTATION (MAX RETRIES EXCEEDED): ", session, etag, annotation);
    return {
      type: _meldActions.ANNOTATION_NOT_HANDLED
    };
  }
}

function patchAndProcessAnnotation(action, session, etag, annotation) {
  var success = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : {
    type: _meldActions.ANNOTATION_PATCHED
  };
  var retries = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : MAX_RETRIES;

  if (retries) {
    // console.log("PATCHING: ", session, etag, annotation);
    var patchJson = JSON.stringify({
      "@id": annotation["@id"],
      "meld:state": {
        "@id": "meld:processed"
      }
    });
    return function (dispatch) {
      _axios["default"].patch(session, patchJson, {
        headers: {
          'Content-Type': 'application/ld+json',
          'If-None-Match': etag
        }
      }).then(function (response) {
        // console.log("Dispatching action: ", action);
        dispatch(action); // console.log("Dispatching success callback: ", success)

        dispatch(success);
      })["catch"](function (error) {
        if (error.response.status == 412) {
          console.log("Mid-air collision while attempting to PATCH annotation. Retrying.", session, etag, annotation); // GET the session resource to figure out new etag

          _solidAuthClient["default"].fetch(session).then(function (response) {
            // and try again
            return function (dispatch) {
              setTimeout(function () {
                dispatch(patchAndProcessAnnotation(action, session, response.headers.etag, annotation, success, retries - 1));
              }, RETRY_DELAY);
            };
          });
        } else {
          console.log("Error while patching annotation: ", error);
          console.log("Retrying.");
          return function (dispatch) {
            setTimeout(function () {
              dispatch(patchAndProcessAnnotation(action, session, response.headers.etag, annotation, success, retries - 1));
            }, RETRY_DELAY);
          };
        }
      });
    };
  } else {
    console.log("FAILED TO PATCH ANNOTATION (MAX RETRIES EXCEEDED): ", session, etag, annotation);
    return {
      type: _meldActions.ANNOTATION_NOT_HANDLED
    };
  }
}

function updateMuzicodes(muzicodesUri, session) {
  var mei = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "";

  // inform the muzicodes service that our session has loaded
  // console.log("Updating muzicodes:", muzicodesUri, session);
  var params = _querystring["default"].stringify({
    "name": "meld.load",
    "meldcollection": session,
    "meldmei": mei
  });

  _solidAuthClient["default"].fetch(muzicodesUri, params);

  return {
    type: MUZICODES_UPDATED
  };
} // helper function to ensure that a given key of a JSON obj
// is an array, rather than a single value
// this is so that we can use the same approach for one and for
// many values


function ensureArray(theObj, theKey) {
  if (theObj !== null && _typeof(theObj) === 'object') {
    if (!theKey in theObj) {
      console.log("ensureArray: KEY NOT IN OBJECT!", theKey, theObj);
    } else if (!Array.isArray(theObj[theKey])) {
      theObj[theKey] = [theObj[theKey]];
    }

    return theObj;
  } else {
    console.log("ensureArray: Provided structure is NOT AN OBJECT!");
  }
} // Function to set up the objectives (objects containing JSON-LD frames)
// matched against the graph being built during a traversal.
// Typically called once, on componentWillMount


function configureTraversalObjectives(objectives) {
  return {
    type: SET_TRAVERSAL_OBJECTIVES,
    payload: objectives
  };
}

function createSession(sessionsUri, scoreUri) {
  var _ref8 = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {},
      _ref8$session = _ref8.session,
      session = _ref8$session === void 0 ? "" : _ref8$session,
      _ref8$etag = _ref8.etag,
      etag = _ref8$etag === void 0 ? "" : _ref8$etag,
      _ref8$retries = _ref8.retries,
      retries = _ref8$retries === void 0 ? MAX_RETRIES : _ref8$retries,
      _ref8$performerUri = _ref8.performerUri,
      performerUri = _ref8$performerUri === void 0 ? "" : _ref8$performerUri,
      _ref8$slug = _ref8.slug,
      slug = _ref8$slug === void 0 ? "" : _ref8$slug;

  return function (dispatch) {
    if (retries) {
      // console.log("Trying to create session: ", sessionsUri, scoreUri, etag, retries, performerUri);
      _solidAuthClient["default"].fetch(sessionsUri).then(function (getResponse) {
        _axios["default"].post(sessionsUri, JSON.stringify({
          "@type": ["mo:Performance", "ldp:BasicContainer"],
          "mo:performance_of": {
            "@id": scoreUri
          }
        }), {
          headers: {
            "Content-Type": "application/ld+json",
            "If-None-Match": getResponse.headers.etag,
            "Slug": slug
          }
        }).then(function (postResponse) {
          // 1.Note that we've created the session
          // (for real-time client-side queueing)
          dispatch({
            type: CREATE_SESSION,
            payload: postResponse
          }); // 2.If we've been called inside a session context,
          // post a corresponding queue annotation
          // (for later static revisits, e.g. in archive)

          if (session) {
            dispatch(postAnnotation(session, etag, {
              "oa:hasTarget": {
                "@id": session
              },
              "oa:motivatedBy": {
                "@id": "motivation:queueNextSession"
              },
              "oa:hasBody": {
                "@id": postResponse.headers.location
              }
            }));
          }
        })["catch"](function (error) {
          if (error.response.status == 412) {
            console.log("Mid-air collision while attempting to POST annotation. Retrying.");
            dispatch(function () {
              setTimeout(function () {
                dispatch(createSession(sessionsUri, scoreUri, {
                  etag: getResponse.headers.etag,
                  retries: retries - 1,
                  performerUri: performerUri,
                  slug: slug
                }));
              }, RETRY_DELAY);
            });
          } else {
            console.log("Error while creating session: ", error);
            console.log("Retrying.");
            dispatch(function () {
              setTimeout(function () {
                dispatch(createSession(sessionsUri, scoreUri, {
                  etag: getResponse.headers.etag,
                  retries: retries - 1,
                  performerUri: performerUri,
                  slug: slug
                }));
              }, RETRY_DELAY);
            });
          }
        });
      });
    } else {
      console.log("FAILED TO CREATE SESSION (MAX RETRIES EXCEEDED): ", sessionsUri, scoreUri, response.headers.etag, retries - 1, performerUri);
      return {
        type: SESSION_NOT_CREATED
      };
    }
  };
}

function tickTimedResource(resourceUri, time) {
  return {
    type: TICK,
    payload: {
      uri: resourceUri,
      time: time
    }
  };
}

function registerClock(clockUri) {
  return {
    type: "REGISTER_CLOCK",
    payload: clockUri
  };
}

function updateLatestRenderedPageNum(pageNum) {
  return {
    type: "UPDATE_LATEST_RENDERED_PAGENUM",
    payload: pageNum
  };
}