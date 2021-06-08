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
exports.scoreSetOptions = scoreSetOptions;
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
exports.RETRY_DELAY = exports.MAX_TRAVERSAL_HOPS = exports.MAX_RETRIES = exports.muzicodesUri = exports.UPDATE_LATEST_RENDERED_PAGENUM = exports.REGISTER_TRAVERSAL = exports.RUN_TRAVERSAL = exports.IGNORE_TRAVERSAL_OBJECTIVE_CHECK_ON_EMPTY_GRAPH = exports.TRAVERSAL_CONSTRAINED = exports.TRAVERSAL_UNNECCESSARY = exports.TRAVERSAL_FAILED = exports.TRAVERSAL_HOP = exports.TRAVERSAL_PREHOP = exports.TICK = exports.SESSION_NOT_CREATED = exports.CREATE_SESSION = exports.HAS_PIANO = exports.HAS_PERFORMANCE_MEDIUM = exports.PUBLISHED_AS = exports.MUZICODE = exports.SEGMENT = exports.MOTIVATED_BY = exports.CONTAINS = exports.SCORE = exports.SEQPART = exports.SEQ = exports.HAS_STRUCTURE = exports.CHORD_TYPE = exports.DEGREE = exports.CADENCE = exports.HARMONY = exports.KEY = exports.PART = exports.PART_OF = exports.EXPRESSION = exports.REALIZATION_OF = exports.MUZICODES_UPDATED = exports.REGISTER_PUBLISHED_PERFORMANCE_SCORE = exports.TRANSITION_TO_NEXT_SESSION = exports.RESET_NEXT_SESSION_TRIGGER = exports.SESSION_GRAPH_ETAG = exports.PROCESS_ANNOTATION = exports.SCORE_PAGE_TO_TARGET = exports.SCORE_SET_OPTIONS = exports.SCORE_NEXT_PAGE = exports.SCORE_PREV_PAGE = exports.FETCH_MANIFESTATIONS = exports.FETCH_STRUCTURE = exports.PROCESS_COMPONENT_TARGET = exports.FETCH_COMPONENT_TARGET = exports.FETCH_TARGET_EXPRESSION = exports.FETCH_WORK = exports.FETCH_GRAPH_DOCUMENT = exports.FETCH_GRAPH = exports.FETCH_TEI = exports.FETCH_CONCEPTUAL_SCORE = exports.FETCH_RIBBON_CONTENT = exports.FETCH_SCORE = exports.HAS_BODY = exports.APPLY_TRAVERSAL_OBJECTIVE = exports.SET_TRAVERSAL_OBJECTIVES = void 0;

var _axios = _interopRequireDefault(require("axios"));

var _solidAuthClient = _interopRequireDefault(require("solid-auth-client"));

var _jsonld = _interopRequireDefault(require("jsonld"));

var _querystring = _interopRequireDefault(require("querystring"));

var _uuid = require("uuid");

var _prefixes = require("../library/prefixes.js");

var _meldActions = require("./meldActions");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr && (typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]); if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

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
var SCORE_SET_OPTIONS = 'SCORE_SET_OPTIONS';
exports.SCORE_SET_OPTIONS = SCORE_SET_OPTIONS;
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
var IGNORE_TRAVERSAL_OBJECTIVE_CHECK_ON_EMPTY_GRAPH = "IGNORE_TRAVERSAL_OBJECTIVE_CHECK_ON_EMPTY_GRAPH";
exports.IGNORE_TRAVERSAL_OBJECTIVE_CHECK_ON_EMPTY_GRAPH = IGNORE_TRAVERSAL_OBJECTIVE_CHECK_ON_EMPTY_GRAPH;
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

function fetchScore(url, options) {
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
            url: url,
            options: options
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
    } else {
      params[key] = suppliedParams[key];
    }
  } // For older app compatibility, map old parameter names to new


  var oldParamsMap = [["objectPrefixWhitelist", "extendObjectPrefix"], ["objectUriWhitelist", "extendObjectUri"], ["objectTypeWhitelist", "extendObjectType"], ["objectPrefixBlacklist", "ignoreObjectPrefix"], ["objectUriBlacklist", "ignoreObjectUri"], ["objectTypeBlacklist", "ignoreObjectType"], ["propertyPrefixWhitelist", "followPropertyPrefix"], ["propertyUriWhitelist", "followPropertyUri"], ["propertyPrefixBlacklist", "ignorePropertyPrefix"], ["propertyUriBlacklist", "ignorePropertyUri"]];

  for (var i in oldParamsMap) {
    var oldkey = oldParamsMap[i][0];
    var newkey = oldParamsMap[i][1];

    if (oldkey in suppliedParams && !(newkey in suppliedParams)) {
      params[newkey] = suppliedParams[oldkey];
    }
  }

  var unimplementedParams = ("extendObjectType", "ignoreObjectType", "followPropertyPrefix", "followPropertyUri", "ignorePropertyPrefix", "ignorePropertyUri");

  for (key in unimplementedParams) {
    if (key in params) {
      console.log("registerTraversal: unimplemented option: ", key);
    }
  }

  docUri = new URL(docUri, document.URL).toString();

  if (passesTraversalConstraints({
    "@id": docUri
  }, params)) {
    return {
      type: REGISTER_TRAVERSAL,
      payload: {
        docUri: docUri,
        params: params
      }
    };
  } else {
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

  console.log("FETCHING: ", docUri, params);

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
      } else if (docUri.endsWith(".ttl") || docUri.endsWith(".n3") || docUri.endsWith(".rdf") || docUri.endsWith(".nt") || response.headers.get("Content-Type").startsWith("application/rdf+xml") || response.headers.get("Content-Type").startsWith("application/x-turtle") || response.headers.get("Content-Type").startsWith("text/turtle")) {
        // treat as RDF document
        // TODO: Translate RDF to JSON-LD, then proceed with traverseJSONLD as above
        dispatch({
          type: TRAVERSAL_FAILED
        });
        console.log("Can't handle this document: (We currently only support nq and JSON-LD)", docUri, response); // dispatch(traverseRDF(dispatch, docUri, params, response.text()));
      } else if (docUri.endsWith(".nq") || response.headers.get("Content-Type").startsWith("application/nquads")) {
        dispatch(traverseRDF(dispatch, docUri, params, response.text()));
      } else {
        dispatch({
          type: TRAVERSAL_FAILED
        });
        console.log("Don't know how to treat this document: ", docUri, response);
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

function traverseRDF(dispatch, docUri, params, dataPromise) {
  console.log("in traverseRDF for doc ", docUri, "with exclude list ", params["ignoreObjectUri"]); // expand the JSON-LD object so that we are working with full URIs, not compacted into prefixes

  dataPromise.then(function (data) {
    dispatch(traverseJSONLD(dispatch, docUri, params, _jsonld["default"].fromRDF(data)));
  })["catch"](function (err) {
    return console.error(err);
  });
  return {
    type: TRAVERSAL_HOP
  };
}

function traverseJSONLD(dispatch, docUri, params, dataPromise) {
  console.log("in traverseJSONLD for doc ", docUri, "with exclude list ", params["ignoreObjectUri"]); // expand the JSON-LD object so that we are working with full URIs, not compacted into prefixes

  dataPromise.then(function (data) {
    console.log("attempting to expand: ", data);

    _jsonld["default"].expand(data).then(function (expanded) {
      console.log("Got expanded json: ", expanded); // flatten the expanded JSON-LD object so that each described entity has an ID at the top-level of the tree

      _jsonld["default"].flatten(expanded).then(function (flattened) {
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
    })["catch"](function (error) {
      return console.log("EXPANSION ERROR: ", docUri, err);
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
  if (graph.length) {
    return function (dispatch) {
      var framingPromises = [];
      objectives.forEach(function (obj) {
        framingPromises.push(_jsonld["default"].frame(graph, obj));
      });
      Promise.allSettled(framingPromises).then(function (framedResolved) {
        framedResolved.forEach(function (resolvedFrame, ix) {
          var framed = resolvedFrame["value"];
          dispatch({
            type: APPLY_TRAVERSAL_OBJECTIVE,
            payload: {
              ix: ix,
              framed: framed
            }
          });
        });
      });
    };
  } else {
    return {
      type: IGNORE_TRAVERSAL_OBJECTIVE_CHECK_ON_EMPTY_GRAPH
    };
  }
}

function setTraversalObjectives(objectives) {
  return {
    type: SET_TRAVERSAL_OBJECTIVES,
    payload: objectives
  };
}

function fetchSessionGraph(uri) {
  var etag = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "";
  console.warn("DEPRECATION WARNING: The function fetchSessionGraph is considered deprecated as of meld-clients-core v2.0.0 and will be subject to removal in future versions. Please upgrade your application to use the registerTraversal and traverse functions instead."); // console.log("FETCH_SESSION_GRAPH ACTION ON URI: ", uri, " with etag: ", etag);
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
  console.warn("DEPRECATION WARNING: The function processComponentAnnotation is considered deprecated as of meld-clients-core v2.0.0 and will be subject to removal in future versions. Please upgrade your application to use the registerTraversal and traverse functions instead.");

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
  console.warn("DEPRECATION WARNING: The function fetchComponentTarget is considered deprecated as of meld-clients-core v2.0.0 and will be subject to removal in future versions. Please upgrade your application to use the registerTraversal and traverse functions instead."); // console.log("FETCH_COMPONENT_TARGET ACTION ON URI: ", uri);

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
        _jsonld["default"].fromRDF(data.data, {
          format: 'application/n-quads'
        }).then(function (doc) {
          dispatch(processComponentTarget(doc, uri, conceptualScore));
        })["catch"](function (err) {
          return console.log("ERROR CONVERTING NQUADS TO JSON-LD: ", err);
        });
      } else {
        // already in json format
        dispatch(processComponentTarget(data.data, uri, conceptualScore));
      }
    });
  };
}

function processComponentTarget(data, uri, conceptualScore) {
  console.warn("DEPRECATION WARNING: The function processComponentTarget is considered deprecated as of meld-clients-core v2.0.0 and will be subject to removal in future versions. Please upgrade your application to use the checkTraversalObjectives function instead."); // console.log("PROCESS_COMPONENT_TARGET ACTION ON URI: ", uri);

  return function (dispatch) {
    _jsonld["default"].frame(data, {
      "@id": uri
    }).then(function (framed) {
      _jsonld["default"].compact(framed, context).then(function (compacted) {
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
      })["catch"](function (err) {
        return console.log("COMPACTING ERROR in processComponentTarget:", err);
      });
    })["catch"](function (err) {
      type: _meldActions.ANNOTATION_NOT_HANDLED;
    });
  };
}

function fetchTargetExpression(compacted) {
  console.warn("DEPRECATION WARNING: The function fetchTargetExpression is considered deprecated as of meld-clients-core v2.0.0 and will be subject to removal in future versions. Please upgrade your application to use the registerTraversal and traverse functions instead."); // traverse from the provided Expression, via a Segment, to Manifestation(s)
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
  console.warn("DEPRECATION WARNING: The function fetchWork is considered deprecated as of meld-clients-core v2.0.0 and will be subject to removal in future versions. Please upgrade your application to use the registerTraversal and traverse functions instead."); // console.log("STARTING FETCHWORK WITH ", work, parts, expressionObj);

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
  console.warn("DEPRECATION WARNING: The function fetchStructure is considered deprecated as of meld-clients-core v2.0.0 and will be subject to removal in future versions. Please upgrade your application to use the registerTraversal and traverse functions instead.");
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
  console.warn("DEPRECATION WARNING: The function fetchConceptualScore is considered deprecated as of meld-clients-core v2.0.0 and will be subject to removal in future versions. Please upgrade your application to use the registerTraversal and traverse functions instead.");
  return function (dispatch) {
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
  };
}

function scoreSetOptions(pubScoreUri, options) {
  return {
    type: SCORE_SET_OPTIONS,
    payload: {
      options: options,
      uri: pubScoreUri
    }
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
  var uuid = (0, _uuid.v4)();

  if (retries === "") {
    retries = MAX_RETRIES;
  }

  if (!("id" in json) && !("@id" in json)) {
    // bootstrap a UUID for this annotation
    json["@id"] = session + uuid + ".jsonld";
  }

  return function (dispatch) {
    if (retries) {
      console.log("Posting annotation: ", session, etag, json);

      _solidAuthClient["default"].fetch(session, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/ld+json',
          'If-None-Match': etag,
          'Slug': uuid + ".jsonld"
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9hY3Rpb25zL2luZGV4LmpzIl0sIm5hbWVzIjpbIlNFVF9UUkFWRVJTQUxfT0JKRUNUSVZFUyIsIkFQUExZX1RSQVZFUlNBTF9PQkpFQ1RJVkUiLCJIQVNfQk9EWSIsIkZFVENIX1NDT1JFIiwiRkVUQ0hfUklCQk9OX0NPTlRFTlQiLCJGRVRDSF9DT05DRVBUVUFMX1NDT1JFIiwiRkVUQ0hfVEVJIiwiRkVUQ0hfR1JBUEgiLCJGRVRDSF9HUkFQSF9ET0NVTUVOVCIsIkZFVENIX1dPUksiLCJGRVRDSF9UQVJHRVRfRVhQUkVTU0lPTiIsIkZFVENIX0NPTVBPTkVOVF9UQVJHRVQiLCJQUk9DRVNTX0NPTVBPTkVOVF9UQVJHRVQiLCJGRVRDSF9TVFJVQ1RVUkUiLCJGRVRDSF9NQU5JRkVTVEFUSU9OUyIsIlNDT1JFX1BSRVZfUEFHRSIsIlNDT1JFX05FWFRfUEFHRSIsIlNDT1JFX1NFVF9PUFRJT05TIiwiU0NPUkVfUEFHRV9UT19UQVJHRVQiLCJQUk9DRVNTX0FOTk9UQVRJT04iLCJTRVNTSU9OX0dSQVBIX0VUQUciLCJSRVNFVF9ORVhUX1NFU1NJT05fVFJJR0dFUiIsIlRSQU5TSVRJT05fVE9fTkVYVF9TRVNTSU9OIiwiUkVHSVNURVJfUFVCTElTSEVEX1BFUkZPUk1BTkNFX1NDT1JFIiwiTVVaSUNPREVTX1VQREFURUQiLCJSRUFMSVpBVElPTl9PRiIsIkVYUFJFU1NJT04iLCJQQVJUX09GIiwiUEFSVCIsIktFWSIsIkhBUk1PTlkiLCJDQURFTkNFIiwiREVHUkVFIiwiQ0hPUkRfVFlQRSIsIkhBU19TVFJVQ1RVUkUiLCJTRVEiLCJTRVFQQVJUIiwiU0NPUkUiLCJDT05UQUlOUyIsIk1PVElWQVRFRF9CWSIsIlNFR01FTlQiLCJNVVpJQ09ERSIsIlBVQkxJU0hFRF9BUyIsIkhBU19QRVJGT1JNQU5DRV9NRURJVU0iLCJIQVNfUElBTk8iLCJDUkVBVEVfU0VTU0lPTiIsIlNFU1NJT05fTk9UX0NSRUFURUQiLCJUSUNLIiwiVFJBVkVSU0FMX1BSRUhPUCIsIlRSQVZFUlNBTF9IT1AiLCJUUkFWRVJTQUxfRkFJTEVEIiwiVFJBVkVSU0FMX1VOTkVDQ0VTU0FSWSIsIlRSQVZFUlNBTF9DT05TVFJBSU5FRCIsIklHTk9SRV9UUkFWRVJTQUxfT0JKRUNUSVZFX0NIRUNLX09OX0VNUFRZX0dSQVBIIiwiUlVOX1RSQVZFUlNBTCIsIlJFR0lTVEVSX1RSQVZFUlNBTCIsIlVQREFURV9MQVRFU1RfUkVOREVSRURfUEFHRU5VTSIsIm11emljb2Rlc1VyaSIsIk1BWF9SRVRSSUVTIiwiTUFYX1RSQVZFUlNBTF9IT1BTIiwiUkVUUllfREVMQVkiLCJjb250ZXh0IiwiZmV0Y2hTY29yZSIsInVybCIsIm9wdGlvbnMiLCJjb25zb2xlIiwibG9nIiwiZGlzcGF0Y2giLCJhdXRoIiwiZmV0Y2giLCJtb2RlIiwidGhlbiIsInJlc3BvbnNlIiwidGV4dCIsImRhdGEiLCJ0eXBlIiwicGF5bG9hZCIsImNvbmZpZyIsImZldGNoUmliYm9uQ29udGVudCIsInByb21pc2UiLCJmZXRjaFRFSSIsInVyaSIsIkNFVEVJIiwiZ2V0SFRNTDUiLCJyZWdpc3RlclRyYXZlcnNhbCIsImRvY1VyaSIsInN1cHBsaWVkUGFyYW1zIiwiZGVmYXVsdFBhcmFtcyIsImV4dGVuZE9iamVjdFByZWZpeCIsImV4dGVuZE9iamVjdFVyaSIsImV4dGVuZE9iamVjdFR5cGUiLCJpZ25vcmVPYmplY3RQcmVmaXgiLCJpZ25vcmVPYmplY3RVcmkiLCJpZ25vcmVPYmplY3RUeXBlIiwiZm9sbG93UHJvcGVydHlQcmVmaXgiLCJmb2xsb3dQcm9wZXJ0eVVyaSIsImlnbm9yZVBwcm9wZXJ0eVByZWZpeCIsImlnbm9yZVByb3BlcnR5VXJpIiwib2JqZWN0aXZlcyIsIm51bUhvcHMiLCJ1c2VFdGFnIiwiZXRhZyIsInBhcmFtcyIsImtleSIsIm9sZFBhcmFtc01hcCIsImkiLCJvbGRrZXkiLCJuZXdrZXkiLCJ1bmltcGxlbWVudGVkUGFyYW1zIiwiVVJMIiwiZG9jdW1lbnQiLCJ0b1N0cmluZyIsInBhc3Nlc1RyYXZlcnNhbENvbnN0cmFpbnRzIiwidHJhdmVyc2UiLCJoZWFkZXJzIiwic3RhdHVzIiwiZ2V0IiwiZW5kc1dpdGgiLCJzdGFydHNXaXRoIiwidHJhdmVyc2VKU09OTEQiLCJqc29uIiwidHJhdmVyc2VSREYiLCJlcnIiLCJza29sZW1pemUiLCJvYmoiLCJBcnJheSIsImlzQXJyYXkiLCJtYXAiLCJvIiwiT2JqZWN0Iiwia2V5cyIsImsiLCJyZXBsYWNlIiwiZGF0YVByb21pc2UiLCJqc29ubGQiLCJmcm9tUkRGIiwiZXJyb3IiLCJleHBhbmQiLCJleHBhbmRlZCIsImZsYXR0ZW4iLCJmbGF0dGVuZWQiLCJza29sZW1pemVkIiwiaWRMb29rdXAiLCJlbnRyaWVzIiwiZm9yRWFjaCIsInZhbHVlIiwic3ViamVjdFVyaSIsInN1YmplY3REZXNjcmlwdGlvbiIsInByZWQiLCJvYmpzIiwiY29uY2F0Iiwic3BsaXQiLCJyZXNvdXJjZVVyaSIsImxlbmd0aCIsImluY2x1ZGVzIiwicHJlZml4RXhjbHVkZWQiLCJmaWx0ZXIiLCJwcmUiLCJwcmVmaXhJbmNsdWRlZCIsImNoZWNrVHJhdmVyc2FsT2JqZWN0aXZlcyIsImdyYXBoIiwiZnJhbWluZ1Byb21pc2VzIiwicHVzaCIsImZyYW1lIiwiUHJvbWlzZSIsImFsbFNldHRsZWQiLCJmcmFtZWRSZXNvbHZlZCIsInJlc29sdmVkRnJhbWUiLCJpeCIsImZyYW1lZCIsInNldFRyYXZlcnNhbE9iamVjdGl2ZXMiLCJmZXRjaFNlc3Npb25HcmFwaCIsIndhcm4iLCJzZXNzaW9uIiwiZmV0Y2hDb25jZXB0dWFsU2NvcmUiLCJlbnN1cmVBcnJheSIsImFubm90YXRpb24iLCJwcm9jZXNzQ29tcG9uZW50QW5ub3RhdGlvbiIsImZldGNoR3JhcGgiLCJ0b3BMZXZlbCIsImNvbmNlcHR1YWxTY29yZSIsIkFOTk9UQVRJT05fU0tJUFBFRCIsInRhcmdldHMiLCJ0YXJnZXQiLCJmZXRjaENvbXBvbmVudFRhcmdldCIsImlkIiwiYm9kaWVzIiwiZm9ybWF0IiwiZG9jIiwicHJvY2Vzc0NvbXBvbmVudFRhcmdldCIsImNvbXBhY3QiLCJjb21wYWN0ZWQiLCJzdHJ1Y3R1cmVUYXJnZXQiLCJ0eXBlY2hlY2siLCJwYXJ0IiwiZmV0Y2hUYXJnZXRFeHByZXNzaW9uIiwiQU5OT1RBVElPTl9OT1RfSEFORExFRCIsImNob3JkcyIsImV4cHJlc3Npb25PYmoiLCJtb3RpZiIsIm4iLCJwYXJzZUludCIsImV4ZWMiLCJzZWdtZW50IiwiY291bnRlciIsInVybEJlZ2lucyIsImNhZGVuY2VEYXRhIiwiY2FkZW5jZSIsImRlZ3JlZSIsImNob3JkVHlwZSIsInBhcnRzIiwicCIsImZldGNoV29yayIsIndvcmsiLCJ3b3JrcyIsImZldGNoU3RydWN0dXJlIiwiYXR0YWNoZWRTY29yZSIsInB1YlNjb3JlIiwicHVibGlzaGVkU2NvcmUiLCJwZXJmb3JtYW5jZU1lZGl1bSIsInNlZ2xpbmUiLCJzdHJ1Y3R1cmUiLCJzY29yZVNldE9wdGlvbnMiLCJwdWJTY29yZVVyaSIsInNjb3JlUGFnZVRvQ29tcG9uZW50VGFyZ2V0IiwiTUVJIiwic2NvcmVOZXh0UGFnZVN0YXRpYyIsInBhZ2VOdW0iLCJzY29yZU5leHRQYWdlIiwibmV4dFNlc3Npb24iLCJhY3Rpb24iLCJwYXRjaEFuZFByb2Nlc3NBbm5vdGF0aW9uIiwic2NvcmVQcmV2UGFnZVN0YXRpYyIsInNjb3JlUHJldlBhZ2UiLCJ0cmFuc2l0aW9uVG9TZXNzaW9uIiwidGhpc1Nlc3Npb24iLCJ3aW5kb3ciLCJsb2NhdGlvbiIsImFzc2lnbiIsIkFOTk9UQVRJT05fSEFORExFRCIsInJlc2V0TmV4dFNlc3Npb25UcmlnZ2VyIiwicG9zdE5leHRQYWdlQW5ub3RhdGlvbiIsInBvc3RBbm5vdGF0aW9uIiwiSlNPTiIsInN0cmluZ2lmeSIsInBvc3RQcmV2UGFnZUFubm90YXRpb24iLCJyZXRyaWVzIiwiY2FsbGJhY2siLCJ1dWlkIiwibWV0aG9kIiwiYm9keSIsInNldFRpbWVvdXQiLCJBTk5PVEFUSU9OX1BPU1RFRCIsIm1hcmtBbm5vdGF0aW9uUHJvY2Vzc2VkIiwicGF0Y2hKc29uIiwiYXhpb3MiLCJwYXRjaCIsIkFOTk9UQVRJT05fUEFUQ0hFRCIsInN1Y2Nlc3MiLCJ1cGRhdGVNdXppY29kZXMiLCJtZWkiLCJxdWVyeXN0cmluZyIsInRoZU9iaiIsInRoZUtleSIsImNvbmZpZ3VyZVRyYXZlcnNhbE9iamVjdGl2ZXMiLCJjcmVhdGVTZXNzaW9uIiwic2Vzc2lvbnNVcmkiLCJzY29yZVVyaSIsInBlcmZvcm1lclVyaSIsInNsdWciLCJnZXRSZXNwb25zZSIsInBvc3QiLCJwb3N0UmVzcG9uc2UiLCJ0aWNrVGltZWRSZXNvdXJjZSIsInRpbWUiLCJyZWdpc3RlckNsb2NrIiwiY2xvY2tVcmkiLCJ1cGRhdGVMYXRlc3RSZW5kZXJlZFBhZ2VOdW0iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQVFPLElBQU1BLHdCQUF3QixHQUFHLDBCQUFqQzs7QUFDQSxJQUFNQyx5QkFBeUIsR0FBRyxpQkFBbEM7O0FBQ0EsSUFBTUMsUUFBUSxHQUFHLFlBQWpCOztBQUNBLElBQU1DLFdBQVcsR0FBRyxhQUFwQjs7QUFDQSxJQUFNQyxvQkFBb0IsR0FBRyxzQkFBN0I7O0FBQ0EsSUFBTUMsc0JBQXNCLEdBQUcsd0JBQS9COztBQUNBLElBQU1DLFNBQVMsR0FBRyxXQUFsQjs7QUFDQSxJQUFNQyxXQUFXLEdBQUcsYUFBcEI7O0FBQ0EsSUFBTUMsb0JBQW9CLEdBQUcsc0JBQTdCOztBQUNBLElBQU1DLFVBQVUsR0FBRyxZQUFuQjs7QUFDQSxJQUFNQyx1QkFBdUIsR0FBRyx5QkFBaEM7O0FBQ0EsSUFBTUMsc0JBQXNCLEdBQUcsd0JBQS9COztBQUNBLElBQU1DLHdCQUF3QixHQUFHLDBCQUFqQzs7QUFDQSxJQUFNQyxlQUFlLEdBQUcsaUJBQXhCOztBQUNBLElBQU1DLG9CQUFvQixHQUFHLHNCQUE3Qjs7QUFDQSxJQUFNQyxlQUFlLEdBQUcsaUJBQXhCOztBQUNBLElBQU1DLGVBQWUsR0FBRyxpQkFBeEI7O0FBQ0EsSUFBTUMsaUJBQWlCLEdBQUcsbUJBQTFCOztBQUNBLElBQU1DLG9CQUFvQixHQUFHLHNCQUE3Qjs7QUFDQSxJQUFNQyxrQkFBa0IsR0FBRyxvQkFBM0I7O0FBQ0EsSUFBTUMsa0JBQWtCLEdBQUcsb0JBQTNCOztBQUNBLElBQU1DLDBCQUEwQixHQUFHLDRCQUFuQzs7QUFDQSxJQUFNQywwQkFBMEIsR0FBRyw0QkFBbkM7O0FBQ0EsSUFBTUMsb0NBQW9DLEdBQUcsc0NBQTdDOztBQUNBLElBQU1DLGlCQUFpQixHQUFHLG1CQUExQjs7QUFDQSxJQUFNQyxjQUFjLEdBQUcsb0JBQXZCOztBQUNBLElBQU1DLFVBQVUsR0FBRyxpQkFBbkI7O0FBQ0EsSUFBTUMsT0FBTyxHQUFHLGFBQWhCOztBQUNBLElBQU1DLElBQUksR0FBRyxXQUFiOztBQUNBLElBQU1DLEdBQUcsR0FBRyxRQUFaOztBQUNBLElBQU1DLE9BQU8sR0FBRyxzREFBaEI7O0FBQ0EsSUFBTUMsT0FBTyxHQUFHLDREQUFoQjs7QUFDQSxJQUFNQyxNQUFNLEdBQUcsd0RBQWY7O0FBQ0EsSUFBTUMsVUFBVSxHQUFHLHdEQUFuQjs7QUFDQSxJQUFNQyxhQUFhLEdBQUcsaURBQXRCOztBQUNBLElBQU1DLEdBQUcsR0FBRyxnREFBWjs7QUFDQSxJQUFNQyxPQUFPLEdBQUcsOENBQWhCOztBQUNBLElBQU1DLEtBQUssR0FBRyxtQ0FBZDs7QUFDQSxJQUFNQyxRQUFRLEdBQUcsbUNBQWpCOztBQUNBLElBQU1DLFlBQVksR0FBRyxxQ0FBckI7O0FBQ0EsSUFBTUMsT0FBTyxHQUFHLFlBQWhCOztBQUNBLElBQU1DLFFBQVEsR0FBRyxlQUFqQjs7QUFDQSxJQUFNQyxZQUFZLEdBQUcsMENBQXJCOztBQUNBLElBQU1DLHNCQUFzQixHQUFHLDJDQUEvQjs7QUFDQSxJQUFNQyxTQUFTLEdBQUcsNkRBQWxCOztBQUNBLElBQU1DLGNBQWMsR0FBRyxnQkFBdkI7O0FBQ0EsSUFBTUMsbUJBQW1CLEdBQUcscUJBQTVCOztBQUNBLElBQU1DLElBQUksR0FBRyxNQUFiOztBQUNBLElBQU1DLGdCQUFnQixHQUFHLGtCQUF6Qjs7QUFDQSxJQUFNQyxhQUFhLEdBQUcsZUFBdEI7O0FBQ0EsSUFBTUMsZ0JBQWdCLEdBQUcsa0JBQXpCOztBQUNBLElBQU1DLHNCQUFzQixHQUFHLHdCQUEvQjs7QUFDQSxJQUFNQyxxQkFBcUIsR0FBRyx1QkFBOUI7O0FBQ0EsSUFBTUMsK0NBQStDLEdBQUUsaURBQXZEOztBQUNBLElBQU1DLGFBQWEsR0FBRyxlQUF0Qjs7QUFDQSxJQUFNQyxrQkFBa0IsR0FBRyxvQkFBM0I7O0FBQ0EsSUFBTUMsOEJBQThCLEdBQUcsZ0NBQXZDOztBQUVBLElBQU1DLFlBQVksR0FBRyxpQ0FBckI7O0FBRUEsSUFBTUMsV0FBVyxHQUFHLENBQXBCOztBQUNBLElBQU1DLGtCQUFrQixHQUFHLEVBQTNCOztBQUNBLElBQU1DLFdBQVcsR0FBRyxFQUFwQixDLENBRVA7QUFDQTtBQUNBOzs7QUFDQSxJQUFNQyxPQUFPLEdBQUc7QUFDZCxjQUFZLG1DQURFO0FBRWQsUUFBTSw4QkFGUTtBQUdkLFNBQU8sMkJBSE87QUFJZCxRQUFNLG1EQUpRO0FBS2QsUUFBTSwwQkFMUTtBQU1kLFVBQVEsa0NBTk07QUFPZCxVQUFRLHVDQVBNO0FBUWQsVUFBUSxxQ0FSTTtBQVNkLGdCQUFjLDBDQVRBO0FBVWQsUUFBTSxnREFWUTtBQVdkLFNBQU8sMkJBWE87QUFZZCxXQUFTLDBDQVpLO0FBYWQsUUFBTTtBQWJRLENBQWhCOztBQWdCTyxTQUFTQyxVQUFULENBQW9CQyxHQUFwQixFQUF5QkMsT0FBekIsRUFBa0M7QUFDdkNDLEVBQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUFZLDZCQUFaLEVBQTJDSCxHQUEzQztBQUNBLFNBQU0sVUFBQ0ksUUFBRCxFQUFjO0FBQ2xCQyxnQ0FBS0MsS0FBTCxDQUFXTixHQUFYLEVBQWdCO0FBQUNPLE1BQUFBLElBQUksRUFBRTtBQUFQLEtBQWhCLEVBQ0dDLElBREgsQ0FDUSxVQUFBQyxRQUFRLEVBQUk7QUFDaEIsYUFBT0EsUUFBUSxDQUFDQyxJQUFULEVBQVA7QUFDRCxLQUhILEVBSUdGLElBSkgsQ0FJUSxVQUFBRyxJQUFJLEVBQUk7QUFDWlAsTUFBQUEsUUFBUSxDQUFDO0FBQ1BRLFFBQUFBLElBQUksRUFBRXhFLFdBREM7QUFFUHlFLFFBQUFBLE9BQU8sRUFBRTtBQUNQRixVQUFBQSxJQUFJLEVBQUpBLElBRE87QUFFUEcsVUFBQUEsTUFBTSxFQUFFO0FBQUVkLFlBQUFBLEdBQUcsRUFBSEEsR0FBRjtBQUFPQyxZQUFBQSxPQUFPLEVBQVBBO0FBQVA7QUFGRDtBQUZGLE9BQUQsQ0FBUjtBQU9ELEtBWkg7QUFhRCxHQWREO0FBZUQ7O0FBRU0sU0FBU2Msa0JBQVQsQ0FBNEJmLEdBQTVCLEVBQWlDO0FBQ3RDO0FBQ0EsTUFBTWdCLE9BQU8sR0FBR1gsNEJBQUtDLEtBQUwsQ0FBV04sR0FBWCxDQUFoQjs7QUFDQSxTQUFPLFVBQUFJLFFBQVEsRUFBSTtBQUNqQkMsZ0NBQUtDLEtBQUwsQ0FBV04sR0FBWCxFQUFnQjtBQUFDTyxNQUFBQSxJQUFJLEVBQUU7QUFBUCxLQUFoQixFQUNHQyxJQURILENBQ1EsVUFBQUMsUUFBUSxFQUFJO0FBQ2hCLGFBQU9BLFFBQVEsQ0FBQ0MsSUFBVCxFQUFQO0FBQ0QsS0FISCxFQUlHRixJQUpILENBSVEsVUFBQUcsSUFBSSxFQUFJO0FBQ1pQLE1BQUFBLFFBQVEsQ0FBQztBQUNQUSxRQUFBQSxJQUFJLEVBQUV2RSxvQkFEQztBQUVQd0UsUUFBQUEsT0FBTyxFQUFFO0FBQ1BGLFVBQUFBLElBQUksRUFBSkEsSUFETztBQUVQRyxVQUFBQSxNQUFNLEVBQUU7QUFBRWQsWUFBQUEsR0FBRyxFQUFIQTtBQUFGO0FBRkQ7QUFGRixPQUFELENBQVI7QUFPRCxLQVpIO0FBYUQsR0FkRDtBQWNDO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQzs7QUFFTSxTQUFTaUIsUUFBVCxDQUFrQkMsR0FBbEIsRUFBdUI7QUFDNUIsTUFBTUYsT0FBTyxHQUFHLElBQUlHLEtBQUosR0FBWUMsUUFBWixDQUFxQkYsR0FBckIsQ0FBaEI7QUFDQSxTQUFPLFVBQUFkLFFBQVEsRUFBSTtBQUNqQlksSUFBQUEsT0FBTyxDQUFDUixJQUFSLENBQWEsVUFBQUcsSUFBSSxFQUFJO0FBQ25CUCxNQUFBQSxRQUFRLENBQUM7QUFDUFEsUUFBQUEsSUFBSSxFQUFFckUsU0FEQztBQUVQc0UsUUFBQUEsT0FBTyxFQUFFO0FBQ1BGLFVBQUFBLElBQUksRUFBRUEsSUFEQztBQUVQTyxVQUFBQSxHQUFHLEVBQUVBO0FBRkU7QUFGRixPQUFELENBQVI7QUFPRCxLQVJEO0FBU0QsR0FWRDtBQVdEOztBQUVNLFNBQVNHLGlCQUFULENBQTJCQyxNQUEzQixFQUF3RDtBQUFBLE1BQXJCQyxjQUFxQix1RUFBSixFQUFJO0FBQzdEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0EsTUFBTUMsYUFBYSxHQUFHO0FBQ3BCQyxJQUFBQSxrQkFBa0IsRUFBRSxFQURBO0FBQ0lDLElBQUFBLGVBQWUsRUFBRSxFQURyQjtBQUN5QkMsSUFBQUEsZ0JBQWdCLEVBQUUsRUFEM0M7QUFFcEJDLElBQUFBLGtCQUFrQixFQUFFLEVBRkE7QUFFSUMsSUFBQUEsZUFBZSxFQUFFLEVBRnJCO0FBRXlCQyxJQUFBQSxnQkFBZ0IsRUFBRSxFQUYzQztBQUdwQkMsSUFBQUEsb0JBQW9CLEVBQUUsRUFIRjtBQUdNQyxJQUFBQSxpQkFBaUIsRUFBRSxFQUh6QjtBQUlwQkMsSUFBQUEscUJBQXFCLEVBQUUsRUFKSDtBQUlPQyxJQUFBQSxpQkFBaUIsRUFBRSxFQUoxQjtBQUtwQkMsSUFBQUEsVUFBVSxFQUFFLEVBTFE7QUFLSkMsSUFBQUEsT0FBTyxFQUFFeEMsa0JBTEw7QUFNcEJ5QyxJQUFBQSxPQUFPLEVBQUUsS0FOVztBQU1KQyxJQUFBQSxJQUFJLEVBQUU7QUFORixHQUF0Qjs7QUFRQSxNQUFJQyxNQUFNLHFCQUFPZixhQUFQLENBQVYsQ0FsRDZELENBb0Q3RDs7O0FBQ0EsTUFBSWdCLEdBQUo7O0FBQ0EsT0FBS0EsR0FBTCxJQUFZakIsY0FBWixFQUE0QjtBQUMxQixRQUFLLEVBQUVpQixHQUFHLElBQUlELE1BQVQsQ0FBTCxFQUF3QjtBQUN0QnJDLE1BQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUFZLDBDQUFaLEVBQXdEcUMsR0FBeEQ7QUFDRCxLQUZELE1BRU87QUFDUkQsTUFBQUEsTUFBTSxDQUFDQyxHQUFELENBQU4sR0FBY2pCLGNBQWMsQ0FBQ2lCLEdBQUQsQ0FBNUI7QUFDQTtBQUNBLEdBNUQ0RCxDQThEN0Q7OztBQUNBLE1BQU1DLFlBQVksR0FBRyxDQUNuQixDQUFFLHVCQUFGLEVBQThCLG9CQUE5QixDQURtQixFQUVuQixDQUFFLG9CQUFGLEVBQThCLGlCQUE5QixDQUZtQixFQUduQixDQUFFLHFCQUFGLEVBQThCLGtCQUE5QixDQUhtQixFQUluQixDQUFFLHVCQUFGLEVBQThCLG9CQUE5QixDQUptQixFQUtuQixDQUFFLG9CQUFGLEVBQThCLGlCQUE5QixDQUxtQixFQU1uQixDQUFFLHFCQUFGLEVBQThCLGtCQUE5QixDQU5tQixFQU9uQixDQUFFLHlCQUFGLEVBQThCLHNCQUE5QixDQVBtQixFQVFuQixDQUFFLHNCQUFGLEVBQThCLG1CQUE5QixDQVJtQixFQVNuQixDQUFFLHlCQUFGLEVBQThCLHNCQUE5QixDQVRtQixFQVVuQixDQUFFLHNCQUFGLEVBQThCLG1CQUE5QixDQVZtQixDQUFyQjs7QUFZQSxPQUFNLElBQUlDLENBQVYsSUFBZUQsWUFBZixFQUE4QjtBQUM1QixRQUFJRSxNQUFNLEdBQUdGLFlBQVksQ0FBQ0MsQ0FBRCxDQUFaLENBQWdCLENBQWhCLENBQWI7QUFDQSxRQUFJRSxNQUFNLEdBQUdILFlBQVksQ0FBQ0MsQ0FBRCxDQUFaLENBQWdCLENBQWhCLENBQWI7O0FBQ0EsUUFBTUMsTUFBTSxJQUFJcEIsY0FBWCxJQUE4QixFQUFFcUIsTUFBTSxJQUFJckIsY0FBWixDQUFuQyxFQUFpRTtBQUMvRGdCLE1BQUFBLE1BQU0sQ0FBQ0ssTUFBRCxDQUFOLEdBQWlCckIsY0FBYyxDQUFDb0IsTUFBRCxDQUEvQjtBQUNEO0FBQ0Y7O0FBRUQsTUFBTUUsbUJBQW1CLElBQ3ZCLG9CQUNBLGtCQURBLEVBRUEsc0JBRkEsRUFHQSxtQkFIQSxFQUlBLHNCQUpBLEVBS0EsbUJBTnVCLENBQXpCOztBQVFBLE9BQUtMLEdBQUwsSUFBWUssbUJBQVosRUFBaUM7QUFDL0IsUUFBTUwsR0FBRyxJQUFJRCxNQUFiLEVBQXVCO0FBQ3JCckMsTUFBQUEsT0FBTyxDQUFDQyxHQUFSLENBQVksMkNBQVosRUFBeURxQyxHQUF6RDtBQUNEO0FBQ0Y7O0FBRUZsQixFQUFBQSxNQUFNLEdBQUcsSUFBSXdCLEdBQUosQ0FBUXhCLE1BQVIsRUFBZ0J5QixRQUFRLENBQUNELEdBQXpCLEVBQThCRSxRQUE5QixFQUFUOztBQUNDLE1BQUdDLDBCQUEwQixDQUFDO0FBQUMsV0FBTTNCO0FBQVAsR0FBRCxFQUFpQmlCLE1BQWpCLENBQTdCLEVBQXVEO0FBQ3JELFdBQVE7QUFDTjNCLE1BQUFBLElBQUksRUFBRXBCLGtCQURBO0FBRU5xQixNQUFBQSxPQUFPLEVBQUU7QUFBQ1MsUUFBQUEsTUFBTSxFQUFOQSxNQUFEO0FBQVNpQixRQUFBQSxNQUFNLEVBQU5BO0FBQVQ7QUFGSCxLQUFSO0FBSUQsR0FMRCxNQUtPO0FBQ0wsV0FBUTtBQUNOM0IsTUFBQUEsSUFBSSxFQUFFdkI7QUFEQSxLQUFSO0FBR0Q7QUFDRjs7QUFFTSxTQUFTNkQsUUFBVCxDQUFrQjVCLE1BQWxCLEVBQTBCaUIsTUFBMUIsRUFBa0M7QUFDdkM7QUFDQSxNQUFNWSxPQUFPLEdBQUc7QUFBQyxjQUFVO0FBQVgsR0FBaEI7O0FBQ0EsTUFBSVosTUFBTSxDQUFDLFNBQUQsQ0FBVixFQUF1QjtBQUNyQlksSUFBQUEsT0FBTyxDQUFDLGVBQUQsQ0FBUCxHQUEyQlosTUFBTSxDQUFDLE1BQUQsQ0FBakM7QUFDRDs7QUFFRHJDLEVBQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUFZLFlBQVosRUFBMEJtQixNQUExQixFQUFrQ2lCLE1BQWxDOztBQUNBLE1BQU12QixPQUFPLEdBQUdYLDRCQUFLQyxLQUFMLENBQVdnQixNQUFYLEVBQW1CO0FBQ2pDNkIsSUFBQUEsT0FBTyxFQUFFQSxPQUR3QjtBQUVqQzVDLElBQUFBLElBQUksRUFBRTtBQUYyQixHQUFuQixDQUFoQjs7QUFJQSxTQUFPLFVBQUNILFFBQUQsRUFBYztBQUNuQkEsSUFBQUEsUUFBUSxDQUFDO0FBQ1BRLE1BQUFBLElBQUksRUFBRXJCLGFBREM7QUFFUHNCLE1BQUFBLE9BQU8sRUFBRTtBQUFDUyxRQUFBQSxNQUFNLEVBQU5BO0FBQUQ7QUFGRixLQUFELENBQVI7QUFJQU4sSUFBQUEsT0FBTyxDQUFDUixJQUFSLENBQWEsVUFBQUMsUUFBUSxFQUFJO0FBQ3ZCLFVBQUlBLFFBQVEsQ0FBQzJDLE1BQVQsSUFBbUIsR0FBdkIsRUFBNEI7QUFDMUJoRCxRQUFBQSxRQUFRLENBQUM7QUFBQ1EsVUFBQUEsSUFBSSxFQUFFeEI7QUFBUCxTQUFELENBQVI7QUFDQSxlQUYwQixDQUVsQjtBQUNUOztBQUNEYyxNQUFBQSxPQUFPLENBQUNDLEdBQVIsQ0FBWU0sUUFBUSxDQUFDMEMsT0FBVCxDQUFpQkUsR0FBakIsQ0FBcUIsY0FBckIsQ0FBWixFQUx1QixDQU12QjtBQUNBOztBQUNBLFVBQUkvQixNQUFNLENBQUNnQyxRQUFQLENBQWdCLE9BQWhCLEtBQTRCaEMsTUFBTSxDQUFDZ0MsUUFBUCxDQUFnQixTQUFoQixDQUE1QixJQUEwRGhDLE1BQU0sQ0FBQ2dDLFFBQVAsQ0FBZ0IsVUFBaEIsQ0FBMUQsSUFDQTdDLFFBQVEsQ0FBQzBDLE9BQVQsQ0FBaUJFLEdBQWpCLENBQXFCLGNBQXJCLEVBQXFDRSxVQUFyQyxDQUFnRCxxQkFBaEQsQ0FEQSxJQUVBOUMsUUFBUSxDQUFDMEMsT0FBVCxDQUFpQkUsR0FBakIsQ0FBcUIsY0FBckIsRUFBcUNFLFVBQXJDLENBQWdELGtCQUFoRCxDQUZKLEVBRXlFO0FBQ3ZFO0FBQ0FuRCxRQUFBQSxRQUFRLENBQUNvRCxjQUFjLENBQUNwRCxRQUFELEVBQVdrQixNQUFYLEVBQW1CaUIsTUFBbkIsRUFBMkI5QixRQUFRLENBQUNnRCxJQUFULEVBQTNCLENBQWYsQ0FBUjtBQUNELE9BTEQsTUFLTyxJQUFJbkMsTUFBTSxDQUFDZ0MsUUFBUCxDQUFnQixNQUFoQixLQUEyQmhDLE1BQU0sQ0FBQ2dDLFFBQVAsQ0FBZ0IsS0FBaEIsQ0FBM0IsSUFBcURoQyxNQUFNLENBQUNnQyxRQUFQLENBQWdCLE1BQWhCLENBQXJELElBQ1BoQyxNQUFNLENBQUNnQyxRQUFQLENBQWdCLEtBQWhCLENBRE8sSUFFUDdDLFFBQVEsQ0FBQzBDLE9BQVQsQ0FBaUJFLEdBQWpCLENBQXFCLGNBQXJCLEVBQXFDRSxVQUFyQyxDQUFnRCxxQkFBaEQsQ0FGTyxJQUdQOUMsUUFBUSxDQUFDMEMsT0FBVCxDQUFpQkUsR0FBakIsQ0FBcUIsY0FBckIsRUFBcUNFLFVBQXJDLENBQWdELHNCQUFoRCxDQUhPLElBSVA5QyxRQUFRLENBQUMwQyxPQUFULENBQWlCRSxHQUFqQixDQUFxQixjQUFyQixFQUFxQ0UsVUFBckMsQ0FBZ0QsYUFBaEQsQ0FKRyxFQUk2RDtBQUNsRTtBQUNBO0FBQ0FuRCxRQUFBQSxRQUFRLENBQUM7QUFBQ1EsVUFBQUEsSUFBSSxFQUFFekI7QUFBUCxTQUFELENBQVI7QUFDQWUsUUFBQUEsT0FBTyxDQUFDQyxHQUFSLENBQVksd0VBQVosRUFBc0ZtQixNQUF0RixFQUE4RmIsUUFBOUYsRUFKa0UsQ0FLdEU7QUFDQSxPQVZTLE1BVUgsSUFBSWEsTUFBTSxDQUFDZ0MsUUFBUCxDQUFnQixLQUFoQixLQUNMN0MsUUFBUSxDQUFDMEMsT0FBVCxDQUFpQkUsR0FBakIsQ0FBcUIsY0FBckIsRUFBcUNFLFVBQXJDLENBQWdELG9CQUFoRCxDQURDLEVBQ3NFO0FBQzVFbkQsUUFBQUEsUUFBUSxDQUFDc0QsV0FBVyxDQUFDdEQsUUFBRCxFQUFXa0IsTUFBWCxFQUFtQmlCLE1BQW5CLEVBQTJCOUIsUUFBUSxDQUFDQyxJQUFULEVBQTNCLENBQVosQ0FBUjtBQUNHLE9BSEcsTUFHRztBQUNMTixRQUFBQSxRQUFRLENBQUM7QUFBQ1EsVUFBQUEsSUFBSSxFQUFFekI7QUFBUCxTQUFELENBQVI7QUFDQWUsUUFBQUEsT0FBTyxDQUFDQyxHQUFSLENBQVkseUNBQVosRUFBdURtQixNQUF2RCxFQUErRGIsUUFBL0Q7QUFDRCxPQTdCc0IsQ0E4QnZCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBQ0QsS0E1Q0QsV0E0Q1MsVUFBQWtELEdBQUcsRUFBSTtBQUNkdkQsTUFBQUEsUUFBUSxDQUFDO0FBQUNRLFFBQUFBLElBQUksRUFBRXpCO0FBQVAsT0FBRCxDQUFSO0FBQ0FlLE1BQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUFZLHFCQUFaLEVBQW1DbUIsTUFBbkMsRUFBMkNxQyxHQUEzQztBQUNELEtBL0NEO0FBZ0RBLFdBQU87QUFBQy9DLE1BQUFBLElBQUksRUFBRTNCO0FBQVAsS0FBUDtBQUNELEdBdEREO0FBdURELEMsQ0FHRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUNBLFNBQVMyRSxTQUFULENBQW1CQyxHQUFuQixFQUF3QnZDLE1BQXhCLEVBQWdDO0FBQzlCLE1BQUl3QyxLQUFLLENBQUNDLE9BQU4sQ0FBY0YsR0FBZCxDQUFKLEVBQXdCO0FBQ3RCO0FBQ0FBLElBQUFBLEdBQUcsR0FBR0EsR0FBRyxDQUFDRyxHQUFKLENBQVEsVUFBQUMsQ0FBQztBQUFBLGFBQUlMLFNBQVMsQ0FBQ0ssQ0FBRCxFQUFJM0MsTUFBSixDQUFiO0FBQUEsS0FBVCxDQUFOO0FBQ0QsR0FIRCxNQUdPLElBQUl1QyxHQUFHLEtBQUtLLE1BQU0sQ0FBQ0wsR0FBRCxDQUFsQixFQUF5QjtBQUM5QjtBQUNBSyxJQUFBQSxNQUFNLENBQUNDLElBQVAsQ0FBWU4sR0FBWixFQUFpQkcsR0FBakIsQ0FBcUIsVUFBQUksQ0FBQyxFQUFJO0FBQ3hCLFVBQUlBLENBQUMsS0FBSyxLQUFWLEVBQWlCO0FBQ2Y7QUFDQVAsUUFBQUEsR0FBRyxDQUFDLEtBQUQsQ0FBSCxHQUFhQSxHQUFHLENBQUMsS0FBRCxDQUFILENBQVdRLE9BQVgsQ0FBbUIsSUFBbkIsRUFBeUIvQyxNQUFNLEdBQUcsU0FBbEMsQ0FBYjtBQUNELE9BSEQsTUFHTztBQUNMO0FBQ0F1QyxRQUFBQSxHQUFHLENBQUNPLENBQUQsQ0FBSCxHQUFTUixTQUFTLENBQUNDLEdBQUcsQ0FBQ08sQ0FBRCxDQUFKLEVBQVM5QyxNQUFULENBQWxCO0FBQ0Q7QUFDRixLQVJEO0FBU0Q7O0FBQ0QsU0FBT3VDLEdBQVA7QUFDRDs7QUFHRCxTQUFTSCxXQUFULENBQXFCdEQsUUFBckIsRUFBK0JrQixNQUEvQixFQUF1Q2lCLE1BQXZDLEVBQStDK0IsV0FBL0MsRUFBMkQ7QUFDekRwRSxFQUFBQSxPQUFPLENBQUNDLEdBQVIsQ0FBWSx5QkFBWixFQUF1Q21CLE1BQXZDLEVBQStDLG9CQUEvQyxFQUFxRWlCLE1BQU0sQ0FBQyxpQkFBRCxDQUEzRSxFQUR5RCxDQUUxRDs7QUFDQytCLEVBQUFBLFdBQVcsQ0FBQzlELElBQVosQ0FBaUIsVUFBQUcsSUFBSSxFQUFJO0FBQ3pCUCxJQUFBQSxRQUFRLENBQUNvRCxjQUFjLENBQUNwRCxRQUFELEVBQVdrQixNQUFYLEVBQW1CaUIsTUFBbkIsRUFBMkJnQyxtQkFBT0MsT0FBUCxDQUFlN0QsSUFBZixDQUEzQixDQUFmLENBQVI7QUFDQSxHQUZBLFdBRVEsVUFBQWdELEdBQUc7QUFBQSxXQUFJekQsT0FBTyxDQUFDdUUsS0FBUixDQUFjZCxHQUFkLENBQUo7QUFBQSxHQUZYO0FBR0QsU0FBTztBQUFDL0MsSUFBQUEsSUFBSSxFQUFFMUI7QUFBUCxHQUFQO0FBQ0E7O0FBRUQsU0FBU3NFLGNBQVQsQ0FBd0JwRCxRQUF4QixFQUFrQ2tCLE1BQWxDLEVBQTBDaUIsTUFBMUMsRUFBa0QrQixXQUFsRCxFQUErRDtBQUM5RHBFLEVBQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUFZLDRCQUFaLEVBQTBDbUIsTUFBMUMsRUFBa0Qsb0JBQWxELEVBQXdFaUIsTUFBTSxDQUFDLGlCQUFELENBQTlFLEVBRDhELENBRTdEOztBQUNBK0IsRUFBQUEsV0FBVyxDQUFDOUQsSUFBWixDQUFpQixVQUFBRyxJQUFJLEVBQUk7QUFDdkJULElBQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUFZLHdCQUFaLEVBQXNDUSxJQUF0Qzs7QUFDRjRELHVCQUFPRyxNQUFQLENBQWMvRCxJQUFkLEVBQW9CSCxJQUFwQixDQUF5QixVQUFBbUUsUUFBUSxFQUFJO0FBQ2pDekUsTUFBQUEsT0FBTyxDQUFDQyxHQUFSLENBQVkscUJBQVosRUFBbUN3RSxRQUFuQyxFQURpQyxDQUVqQzs7QUFDQUoseUJBQU9LLE9BQVAsQ0FBZUQsUUFBZixFQUF5Qm5FLElBQXpCLENBQThCLFVBQUFxRSxTQUFTLEVBQUk7QUFDekMsWUFBTUMsVUFBVSxHQUFHbEIsU0FBUyxDQUFDaUIsU0FBRCxFQUFZdkQsTUFBWixDQUE1QjtBQUNBbEIsUUFBQUEsUUFBUSxDQUFDO0FBQ1BRLFVBQUFBLElBQUksRUFBRW5FLG9CQURDO0FBRVBvRSxVQUFBQSxPQUFPLEVBQUc7QUFDUkYsWUFBQUEsSUFBSSxFQUFFbUUsVUFERTtBQUVSNUQsWUFBQUEsR0FBRyxFQUFFSTtBQUZHO0FBRkgsU0FBRCxDQUFSLENBRnlDLENBU3pDOztBQUNBLFlBQUl5RCxRQUFRLEdBQUcsRUFBZjtBQUNBYixRQUFBQSxNQUFNLENBQUNjLE9BQVAsQ0FBZUYsVUFBZixFQUEyQkcsT0FBM0IsQ0FBbUMsZ0JBQWtCO0FBQUE7QUFBQSxjQUFoQnpDLEdBQWdCO0FBQUEsY0FBWDBDLEtBQVc7O0FBQ25ESCxVQUFBQSxRQUFRLENBQUNHLEtBQUssQ0FBQyxLQUFELENBQU4sQ0FBUixHQUF5QkEsS0FBekI7QUFDRCxTQUZEO0FBR0FoQixRQUFBQSxNQUFNLENBQUNjLE9BQVAsQ0FBZUQsUUFBZixFQUF5QkUsT0FBekIsQ0FBaUMsaUJBQXNDO0FBQUE7QUFBQSxjQUFwQ0UsVUFBb0M7QUFBQSxjQUF4QkMsa0JBQXdCOztBQUNyRTtBQUNBO0FBQ0FsQixVQUFBQSxNQUFNLENBQUNjLE9BQVAsQ0FBZUksa0JBQWYsRUFBbUNILE9BQW5DLENBQTJDLGlCQUFrQjtBQUFBO0FBQUEsZ0JBQWhCSSxJQUFnQjtBQUFBLGdCQUFWQyxJQUFVOztBQUMzRDtBQUNBO0FBQ0FBLFlBQUFBLElBQUksR0FBR3hCLEtBQUssQ0FBQ0MsT0FBTixDQUFjdUIsSUFBZCxJQUFzQkEsSUFBdEIsR0FBNkIsQ0FBQ0EsSUFBRCxDQUFwQztBQUNBQSxZQUFBQSxJQUFJLENBQUN0QixHQUFMLENBQVMsVUFBQ0gsR0FBRCxFQUFTO0FBQ2hCLGtCQUFJQSxHQUFHLEtBQUtLLE1BQU0sQ0FBQ0wsR0FBRCxDQUFsQixFQUF5QjtBQUN2QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9CQUFJWiwwQkFBMEIsQ0FBQ1ksR0FBRCxFQUFNdEIsTUFBTixDQUE5QixFQUE2QztBQUM3RDtBQUNrQm5DLGtCQUFBQSxRQUFRLENBQUNpQixpQkFBaUIsQ0FBQ3dDLEdBQUcsQ0FBQyxLQUFELENBQUosa0NBQ3JCdEIsTUFEcUI7QUFFeEI7QUFDQSx1Q0FBbUJBLE1BQU0sQ0FBQyxpQkFBRCxDQUFOLENBQTBCZ0QsTUFBMUIsQ0FBaUNqRSxNQUFNLENBQUNrRSxLQUFQLENBQWEsR0FBYixFQUFrQixDQUFsQixDQUFqQyxDQUhLO0FBSXhCLCtCQUFXakQsTUFBTSxDQUFDLFNBQUQsQ0FBTixHQUFvQjtBQUpQLHFCQUFsQixDQUFSO0FBTUQ7QUFDRixlQWpCRCxNQWlCTyxDQUNMO0FBQ0E7QUFDQTtBQUNSO0FBQ0E7QUFFQTtBQUNELGFBMUJLO0FBMkJOLFdBL0JJO0FBZ0NMLFNBbkNHO0FBb0NELE9BbEREO0FBbURELEtBdERILFdBc0RXLFVBQUFrQyxLQUFLO0FBQUEsYUFBRXZFLE9BQU8sQ0FBQ0MsR0FBUixDQUFZLG1CQUFaLEVBQWlDbUIsTUFBakMsRUFBeUNxQyxHQUF6QyxDQUFGO0FBQUEsS0F0RGhCO0FBdURDLEdBekREO0FBMERBLFNBQU87QUFBQy9DLElBQUFBLElBQUksRUFBRTFCO0FBQVAsR0FBUDtBQUNEOztBQUVELFNBQVMrRCwwQkFBVCxDQUFvQ1ksR0FBcEMsRUFBeUN0QixNQUF6QyxFQUFpRDtBQUMvQztBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQUlBLE1BQU0sQ0FBQyxTQUFELENBQU4sS0FBc0IsQ0FBMUIsRUFBNkI7QUFDM0I7QUFDQSxXQUFPLEtBQVA7QUFDRCxHQVI4QyxDQVUvQzs7O0FBQ0EsTUFBSSxFQUFFLFNBQVNzQixHQUFYLENBQUosRUFBcUI7QUFDcEI7QUFDQyxXQUFPLEtBQVA7QUFDRDs7QUFFRCxNQUFNNEIsV0FBVyxHQUFHNUIsR0FBRyxDQUFDLEtBQUQsQ0FBSCxDQUFXMkIsS0FBWCxDQUFpQixHQUFqQixFQUFzQixDQUF0QixDQUFwQixDQWhCK0MsQ0FnQkQ7QUFFOUM7O0FBQ0EsTUFBSWpELE1BQU0sQ0FBQyxpQkFBRCxDQUFOLENBQTBCbUQsTUFBOUIsRUFBc0M7QUFDcEM7QUFDQTtBQUNBLFFBQUksQ0FBQ25ELE1BQU0sQ0FBQyxpQkFBRCxDQUFOLENBQTBCb0QsUUFBMUIsQ0FBbUNGLFdBQW5DLENBQUQsSUFDQWxELE1BQU0sQ0FBQyxpQkFBRCxDQUFOLENBQTBCb0QsUUFBMUIsQ0FBbUNGLFdBQW5DLENBREosRUFDcUQ7QUFDbkQ7QUFDQSxhQUFPLEtBQVA7QUFDRDtBQUNGLEdBUkQsTUFRTztBQUNMO0FBQ0E7QUFDQSxRQUFJbEQsTUFBTSxDQUFDLGlCQUFELENBQU4sQ0FBMEJvRCxRQUExQixDQUFtQ0YsV0FBbkMsQ0FBSixFQUFxRDtBQUNuRDtBQUNBLGFBQU8sS0FBUDtBQUNEO0FBQ0YsR0FsQzhDLENBb0MvQzs7O0FBQ0EsTUFBTUcsY0FBYyxHQUFHckQsTUFBTSxDQUFDLG9CQUFELENBQU4sQ0FBNkJzRCxNQUE3QixDQUFvQyxVQUFBQyxHQUFHLEVBQUk7QUFDaEUsV0FBT0wsV0FBVyxDQUFDbEMsVUFBWixDQUF1QnVDLEdBQUcsQ0FBQ04sS0FBSixDQUFVLEdBQVYsRUFBZSxDQUFmLENBQXZCLENBQVA7QUFDRCxHQUZzQixDQUF2QixDQXJDK0MsQ0F3Qy9DOztBQUNBLE1BQUlJLGNBQWMsQ0FBQ0YsTUFBbkIsRUFBMkI7QUFDekI7QUFDQSxXQUFPLEtBQVA7QUFDRDs7QUFDRCxNQUFJbkQsTUFBTSxDQUFDLG9CQUFELENBQU4sQ0FBNkJtRCxNQUFqQyxFQUF5QztBQUN2QztBQUNBLFFBQU1LLGNBQWMsR0FBR3hELE1BQU0sQ0FBQyxvQkFBRCxDQUFOLENBQTZCc0QsTUFBN0IsQ0FBb0MsVUFBQUMsR0FBRyxFQUFJO0FBQ2hFLGFBQU9MLFdBQVcsQ0FBQ2xDLFVBQVosQ0FBdUJ1QyxHQUF2QixDQUFQO0FBQ0QsS0FGc0IsQ0FBdkIsQ0FGdUMsQ0FLdkM7O0FBQ0EsUUFBSUMsY0FBYyxDQUFDTCxNQUFmLEtBQTBCLENBQTlCLEVBQWlDO0FBQy9CO0FBQ0EsYUFBTyxLQUFQO0FBQ0Q7QUFDRixHQXZEOEMsQ0F3RC9DOzs7QUFDQSxTQUFPLElBQVA7QUFDRDs7QUFFTSxTQUFTTSx3QkFBVCxDQUFrQ0MsS0FBbEMsRUFBeUM5RCxVQUF6QyxFQUFxRDtBQUMxRDtBQUNBLE1BQUk4RCxLQUFLLENBQUNQLE1BQVYsRUFBa0I7QUFDaEIsV0FBTyxVQUFBdEYsUUFBUSxFQUFJO0FBQ2pCLFVBQUk4RixlQUFlLEdBQUcsRUFBdEI7QUFDQS9ELE1BQUFBLFVBQVUsQ0FBQzhDLE9BQVgsQ0FBb0IsVUFBQ3BCLEdBQUQsRUFBUztBQUMzQnFDLFFBQUFBLGVBQWUsQ0FBQ0MsSUFBaEIsQ0FBcUI1QixtQkFBTzZCLEtBQVAsQ0FBYUgsS0FBYixFQUFvQnBDLEdBQXBCLENBQXJCO0FBQ0QsT0FGRDtBQUdBd0MsTUFBQUEsT0FBTyxDQUFDQyxVQUFSLENBQW1CSixlQUFuQixFQUFvQzFGLElBQXBDLENBQTBDLFVBQUMrRixjQUFELEVBQXFCO0FBQzdEQSxRQUFBQSxjQUFjLENBQUN0QixPQUFmLENBQXdCLFVBQUN1QixhQUFELEVBQWdCQyxFQUFoQixFQUF1QjtBQUM3QyxjQUFNQyxNQUFNLEdBQUdGLGFBQWEsQ0FBQyxPQUFELENBQTVCO0FBQ0FwRyxVQUFBQSxRQUFRLENBQUM7QUFDUFEsWUFBQUEsSUFBSSxFQUFFMUUseUJBREM7QUFFUDJFLFlBQUFBLE9BQU8sRUFBRTtBQUNQNEYsY0FBQUEsRUFBRSxFQUFGQSxFQURPO0FBRVBDLGNBQUFBLE1BQU0sRUFBTkE7QUFGTztBQUZGLFdBQUQsQ0FBUjtBQU9ELFNBVEQ7QUFVRCxPQVhEO0FBWUQsS0FqQkQ7QUFrQkQsR0FuQkQsTUFtQk87QUFDTCxXQUFPO0FBQ0w5RixNQUFBQSxJQUFJLEVBQUV0QjtBQURELEtBQVA7QUFHRDtBQUNGOztBQUVNLFNBQVNxSCxzQkFBVCxDQUFnQ3hFLFVBQWhDLEVBQTRDO0FBQ2pELFNBQU87QUFDTHZCLElBQUFBLElBQUksRUFBRTNFLHdCQUREO0FBRUw0RSxJQUFBQSxPQUFPLEVBQUVzQjtBQUZKLEdBQVA7QUFJRDs7QUFHTSxTQUFTeUUsaUJBQVQsQ0FBMkIxRixHQUEzQixFQUEyQztBQUFBLE1BQVhvQixJQUFXLHVFQUFKLEVBQUk7QUFDaERwQyxFQUFBQSxPQUFPLENBQUMyRyxJQUFSLENBQWEsNlBBQWIsRUFEZ0QsQ0FFaEQ7QUFDQTtBQUNBOztBQUNBLE1BQU03RixPQUFPLEdBQUdYLDRCQUFLQyxLQUFMLENBQVdZLEdBQVgsRUFBZ0I7QUFDOUJpQyxJQUFBQSxPQUFPLEVBQUU7QUFBQyxnQkFBVSxxQkFBWDtBQUFrQyx1QkFBaUJiO0FBQW5ELEtBRHFCO0FBRTlCL0IsSUFBQUEsSUFBSSxFQUFFO0FBRndCLEdBQWhCLENBQWhCOztBQUtBLFNBQU8sVUFBQ0gsUUFBRCxFQUFjO0FBQ25CWSxJQUFBQSxPQUFPLENBQUNSLElBQVIsQ0FBYSxVQUFDQyxRQUFELEVBQWM7QUFDekIsVUFBSUEsUUFBUSxDQUFDMkMsTUFBVCxJQUFtQixHQUF2QixFQUE0QjtBQUMxQixlQUQwQixDQUNsQjtBQUNUOztBQUNELFVBQU1zRCxNQUFNLEdBQUdqRyxRQUFRLENBQUNFLElBQXhCO0FBQ0EsVUFBTW1HLE9BQU8sR0FBR0osTUFBTSxDQUFDLFFBQUQsQ0FBTixDQUFpQixDQUFqQixDQUFoQjs7QUFDQSxVQUFJLENBQUNwRSxJQUFMLEVBQVc7QUFDVDtBQUNBO0FBQ0EsWUFBSSx1QkFBdUJ3RSxPQUEzQixFQUFvQztBQUNsQzFHLFVBQUFBLFFBQVEsQ0FBQzJHLG9CQUFvQixDQUFDRCxPQUFPLENBQUMsS0FBRCxDQUFSLEVBQWlCQSxPQUFPLENBQUMsbUJBQUQsQ0FBUCxDQUE2QixLQUE3QixDQUFqQixDQUFyQixDQUFSO0FBQ0QsU0FGRCxNQUVPO0FBQ0w1RyxVQUFBQSxPQUFPLENBQUNDLEdBQVIsQ0FBWSwyQ0FBWixFQUF5RDJHLE9BQXpEO0FBQ0Q7QUFDRjs7QUFDRCxVQUFJckcsUUFBUSxDQUFDMEMsT0FBVCxDQUFpQmIsSUFBakIsS0FBMEJBLElBQTlCLEVBQW9DO0FBQ2xDO0FBQ0E7QUFDQWxDLFFBQUFBLFFBQVEsQ0FBQztBQUNQUSxVQUFBQSxJQUFJLEVBQUVwRSxXQURDO0FBRVBxRSxVQUFBQSxPQUFPLEVBQUU2RjtBQUZGLFNBQUQsQ0FBUixDQUhrQyxDQU9sQzs7QUFDQXRHLFFBQUFBLFFBQVEsQ0FBQztBQUNQUSxVQUFBQSxJQUFJLEVBQUV2RCxrQkFEQztBQUVQd0QsVUFBQUEsT0FBTyxFQUFFO0FBQ1BLLFlBQUFBLEdBQUcsRUFBRUEsR0FERTtBQUVQb0IsWUFBQUEsSUFBSSxFQUFFN0IsUUFBUSxDQUFDMEMsT0FBVCxDQUFpQmI7QUFGaEI7QUFGRixTQUFELENBQVI7O0FBT0EsWUFBSSxrQkFBa0JvRSxNQUFNLENBQUMsUUFBRCxDQUFOLENBQWlCLENBQWpCLENBQXRCLEVBQTJDO0FBQ3pDO0FBQ0FBLFVBQUFBLE1BQU0sQ0FBQyxRQUFELENBQU4sQ0FBaUIsQ0FBakIsSUFBc0JNLFdBQVcsQ0FBQ04sTUFBTSxDQUFDLFFBQUQsQ0FBTixDQUFpQixDQUFqQixDQUFELEVBQXNCLGNBQXRCLENBQWpDLENBRnlDLENBR3pDOztBQUNBQSxVQUFBQSxNQUFNLENBQUMsUUFBRCxDQUFOLENBQWlCLENBQWpCLEVBQW9CLGNBQXBCLEVBQW9DMUMsR0FBcEMsQ0FBd0MsVUFBQ2lELFVBQUQsRUFBZ0I7QUFDdEQ3RyxZQUFBQSxRQUFRLENBQUM4RywwQkFBMEIsQ0FBQ0QsVUFBRCxFQUFhSCxPQUFPLENBQUMsbUJBQUQsQ0FBUCxDQUE2QixLQUE3QixDQUFiLENBQTNCLENBQVI7QUFDRCxXQUZEO0FBR0Q7QUFDRjtBQUNGLEtBdkNEO0FBd0NELEdBekNEO0FBMENEOztBQUVNLFNBQVNLLFVBQVQsQ0FBb0JqRyxHQUFwQixFQUF5QjtBQUM5QjtBQUNBLE1BQU1GLE9BQU8sR0FBR1gsNEJBQUtDLEtBQUwsQ0FBV1ksR0FBWCxDQUFoQjs7QUFFQSxTQUFPLFVBQUNkLFFBQUQsRUFBYztBQUNuQlksSUFBQUEsT0FBTyxDQUFDUixJQUFSLENBQWEsaUJBQVk7QUFBQSxVQUFWRyxJQUFVLFNBQVZBLElBQVU7QUFDdkI7QUFDQVAsTUFBQUEsUUFBUSxDQUFDO0FBQ1BRLFFBQUFBLElBQUksRUFBRXBFLFdBREM7QUFFUHFFLFFBQUFBLE9BQU8sRUFBRUY7QUFGRixPQUFELENBQVIsQ0FGdUIsQ0FNdkI7O0FBQ0FBLE1BQUFBLElBQUksQ0FBQyxRQUFELENBQUosQ0FBZSxDQUFmLEVBQWtCLGNBQWxCLEVBQWtDcUQsR0FBbEMsQ0FBc0MsVUFBQ29ELFFBQUQsRUFBYztBQUNsREEsUUFBQUEsUUFBUSxDQUFDLFlBQUQsQ0FBUixDQUF1QnBELEdBQXZCLENBQTJCLFVBQUNpRCxVQUFELEVBQWdCO0FBQ3pDN0csVUFBQUEsUUFBUSxDQUFDOEcsMEJBQTBCLENBQUNELFVBQUQsQ0FBM0IsQ0FBUjtBQUNELFNBRkQ7QUFJRCxPQUxEO0FBTUQsS0FiRDtBQWNELEdBZkQ7QUFnQkQ7O0FBRUQsU0FBU0MsMEJBQVQsQ0FBb0NELFVBQXBDLEVBQXNFO0FBQUEsTUFBdEJJLGVBQXNCLHVFQUFKLEVBQUk7QUFDcEVuSCxFQUFBQSxPQUFPLENBQUMyRyxJQUFSLENBQWEsc1FBQWI7O0FBQ0EsTUFBSSxnQkFBZ0JJLFVBQWhCLElBQThCQSxVQUFVLENBQUMsWUFBRCxDQUFWLENBQXlCLEtBQXpCLE1BQW9DLGdCQUF0RSxFQUF3RjtBQUN0RjtBQUNBLFdBQU87QUFDTHJHLE1BQUFBLElBQUksRUFBRTBHLCtCQUREO0FBRUx6RyxNQUFBQSxPQUFPLEVBQUVvRztBQUZKLEtBQVA7QUFJRDs7QUFDREEsRUFBQUEsVUFBVSxHQUFHRCxXQUFXLENBQUNDLFVBQUQsRUFBYSxjQUFiLENBQXhCLENBVG9FLENBVXBFOztBQUNBLE1BQU1NLE9BQU8sR0FBR04sVUFBVSxDQUFDLGNBQUQsQ0FBVixDQUEyQmpELEdBQTNCLENBQStCLFVBQUF3RCxNQUFNLEVBQUk7QUFDdkQsV0FBTztBQUNMLGFBQU9BLE1BQU0sQ0FBQyxLQUFELENBRFI7QUFFTDtBQUNBLGVBQVNBLE1BQU0sQ0FBQyxPQUFEO0FBSFYsS0FBUDtBQUtELEdBTmUsQ0FBaEI7QUFPQSxTQUFPLFVBQUNwSCxRQUFELEVBQWM7QUFDbkJtSCxJQUFBQSxPQUFPLENBQUN2RCxHQUFSLENBQVksVUFBQXdELE1BQU0sRUFBSTtBQUNwQnBILE1BQUFBLFFBQVEsQ0FBQ3FILG9CQUFvQixDQUFDRCxNQUFNLENBQUMsS0FBRCxDQUFQLEVBQWdCSCxlQUFoQixDQUFyQixDQUFSO0FBQ0QsS0FGRDtBQUdBakgsSUFBQUEsUUFBUSxDQUFDO0FBQ1BRLE1BQUFBLElBQUksRUFBRXhELGtCQURDO0FBRVB5RCxNQUFBQSxPQUFPLEVBQUU7QUFDUDZHLFFBQUFBLEVBQUUsRUFBRVQsVUFBVSxDQUFDLEtBQUQsQ0FEUDtBQUVQVSxRQUFBQSxNQUFNLEVBQUVWLFVBQVUsQ0FBQyxZQUFELENBRlg7QUFHUE0sUUFBQUEsT0FBTyxFQUFFQTtBQUhGO0FBRkYsS0FBRCxDQUFSO0FBUUQsR0FaRDtBQWFEOztBQUdNLFNBQVNFLG9CQUFULENBQThCdkcsR0FBOUIsRUFBeUQ7QUFBQSxNQUF0Qm1HLGVBQXNCLHVFQUFKLEVBQUk7QUFDOURuSCxFQUFBQSxPQUFPLENBQUMyRyxJQUFSLENBQWEsZ1FBQWIsRUFEOEQsQ0FFOUQ7O0FBQ0EsTUFBTTdGLE9BQU8sR0FBR1gsNEJBQUtDLEtBQUwsQ0FBV1ksR0FBWCxFQUFnQjtBQUFDaUMsSUFBQUEsT0FBTyxFQUFFO0FBQUMsZ0JBQVU7QUFBWCxLQUFWO0FBQTZDNUMsSUFBQUEsSUFBSSxFQUFFO0FBQW5ELEdBQWhCLENBQWhCOztBQUNBLFNBQU8sVUFBQUgsUUFBUSxFQUFJO0FBQ2pCWSxJQUFBQSxPQUFPLENBQUNSLElBQVIsQ0FBYSxVQUFBRyxJQUFJLEVBQUk7QUFDbkI7QUFDQSxVQUFJLENBQUMsY0FBRCxJQUFtQkEsSUFBSSxDQUFDd0MsT0FBeEIsSUFBbUN4QyxJQUFJLENBQUN3QyxPQUFMLENBQWFFLEdBQWIsQ0FBaUIsY0FBakIsTUFBcUMsa0JBQXJDLElBQTJEMUMsSUFBSSxDQUFDd0MsT0FBTCxDQUFhRSxHQUFiLENBQWlCLGNBQWpCLE1BQXFDLHFCQUF2SSxFQUE4SjtBQUM1SjtBQUNBO0FBQ0E7QUFDQWtCLDJCQUFPQyxPQUFQLENBQWU3RCxJQUFJLENBQUNBLElBQXBCLEVBQTBCO0FBQUNpSCxVQUFBQSxNQUFNLEVBQUU7QUFBVCxTQUExQixFQUEyRHBILElBQTNELENBQWdFLFVBQUFxSCxHQUFHLEVBQUk7QUFDckV6SCxVQUFBQSxRQUFRLENBQUMwSCxzQkFBc0IsQ0FBQ0QsR0FBRCxFQUFNM0csR0FBTixFQUFXbUcsZUFBWCxDQUF2QixDQUFSO0FBQ0QsU0FGRCxXQUVTLFVBQUExRCxHQUFHO0FBQUEsaUJBQUl6RCxPQUFPLENBQUNDLEdBQVIsQ0FBWSxzQ0FBWixFQUFvRHdELEdBQXBELENBQUo7QUFBQSxTQUZaO0FBR0QsT0FQRCxNQU9PO0FBQ0w7QUFDQXZELFFBQUFBLFFBQVEsQ0FBQzBILHNCQUFzQixDQUFDbkgsSUFBSSxDQUFDQSxJQUFOLEVBQVlPLEdBQVosRUFBaUJtRyxlQUFqQixDQUF2QixDQUFSO0FBQ0Q7QUFDRixLQWJEO0FBY0YsR0FmQTtBQWdCRDs7QUFFRCxTQUFTUyxzQkFBVCxDQUFnQ25ILElBQWhDLEVBQXNDTyxHQUF0QyxFQUEyQ21HLGVBQTNDLEVBQTREO0FBQzFEbkgsRUFBQUEsT0FBTyxDQUFDMkcsSUFBUixDQUFhLDJQQUFiLEVBRDBELENBRTFEOztBQUNBLFNBQU8sVUFBQ3pHLFFBQUQsRUFBYztBQUNuQm1FLHVCQUFPNkIsS0FBUCxDQUFhekYsSUFBYixFQUFtQjtBQUFFLGFBQU9PO0FBQVQsS0FBbkIsRUFBbUNWLElBQW5DLENBQXdDLFVBQUFrRyxNQUFNLEVBQUk7QUFDaERuQyx5QkFBT3dELE9BQVAsQ0FBZXJCLE1BQWYsRUFBdUI1RyxPQUF2QixFQUFnQ1UsSUFBaEMsQ0FBcUMsVUFBQXdILFNBQVMsRUFBSTtBQUNoRDVILFFBQUFBLFFBQVEsQ0FBQztBQUNQUSxVQUFBQSxJQUFJLEVBQUVoRSxzQkFEQztBQUVQaUUsVUFBQUEsT0FBTyxFQUFFO0FBQ1B3RyxZQUFBQSxlQUFlLEVBQUVBLGVBRFY7QUFFUFksWUFBQUEsZUFBZSxFQUFFL0c7QUFGVjtBQUZGLFNBQUQsQ0FBUixDQURnRCxDQU81Qzs7QUFFSixZQUFJZ0gsU0FBUyxHQUFHRixTQUFoQjtBQUNBRSxRQUFBQSxTQUFTLEdBQUdsQixXQUFXLENBQUNrQixTQUFELEVBQVksT0FBWixDQUF2QixDQVZnRCxDQVVIO0FBQzdDOztBQUVBLFlBQUlBLFNBQVMsQ0FBQyxPQUFELENBQVQsQ0FBbUJ2QyxRQUFuQixDQUE0QmxILE9BQTVCLEtBQXdDeUosU0FBUyxDQUFDLE9BQUQsQ0FBVCxDQUFtQnZDLFFBQW5CLENBQTRCakgsUUFBNUIsQ0FBNUMsRUFBbUY7QUFDakY7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EwQixVQUFBQSxRQUFRLENBQUM7QUFDUFEsWUFBQUEsSUFBSSxFQUFFN0Qsb0JBREM7QUFFUDhELFlBQUFBLE9BQU8sRUFBRTtBQUNQMkcsY0FBQUEsTUFBTSxFQUFFUSxTQUREO0FBRVBHLGNBQUFBLElBQUksRUFBRUg7QUFGQztBQUZGLFdBQUQsQ0FBUjtBQU9ELFNBZEQsTUFjTztBQUNMO0FBQ0E1SCxVQUFBQSxRQUFRLENBQUNnSSxxQkFBcUIsQ0FBQ0osU0FBRCxDQUF0QixDQUFSO0FBQ0Q7QUFDRixPQS9CRCxXQStCUyxVQUFBckUsR0FBRztBQUFBLGVBQUl6RCxPQUFPLENBQUNDLEdBQVIsQ0FBWSw2Q0FBWixFQUEyRHdELEdBQTNELENBQUo7QUFBQSxPQS9CWjtBQWdDRCxLQWpDRCxXQWlDUyxVQUFBQSxHQUFHLEVBQUk7QUFDZC9DLE1BQUFBLElBQUksRUFBRXlIO0FBQ1AsS0FuQ0Q7QUFvQ0QsR0FyQ0Q7QUFzQ0Q7O0FBR00sU0FBU0QscUJBQVQsQ0FBK0JKLFNBQS9CLEVBQTBDO0FBQy9DOUgsRUFBQUEsT0FBTyxDQUFDMkcsSUFBUixDQUFhLGlRQUFiLEVBRCtDLENBRS9DO0FBQ0E7O0FBQ0EsU0FBTyxVQUFBekcsUUFBUSxFQUFJO0FBQ2pCQSxJQUFBQSxRQUFRLENBQUM7QUFDUFEsTUFBQUEsSUFBSSxFQUFFakUsdUJBREM7QUFFUGtFLE1BQUFBLE9BQU8sRUFBRW1IO0FBRkYsS0FBRCxDQUFSO0FBSUEsUUFBSVIsTUFBTSxHQUFHUSxTQUFiOztBQUNBLFFBQUlSLE1BQU0sQ0FBQyxPQUFELENBQU4sQ0FBZ0I3QixRQUFoQixDQUF5QmhJLFVBQXpCLENBQUosRUFBMEM7QUFDeEM7QUFDQTtBQUNBLFVBQUkySyxNQUFNLEdBQUcsRUFBYjtBQUNBLFVBQUlDLGFBQWEsR0FBRyxFQUFwQjtBQUNBQSxNQUFBQSxhQUFhLENBQUMsS0FBRCxDQUFiLEdBQXVCZixNQUFNLENBQUMsS0FBRCxDQUE3Qjs7QUFDQSxVQUFJNUosT0FBTyxJQUFJNEosTUFBZixFQUF1QjtBQUNyQmUsUUFBQUEsYUFBYSxDQUFDQyxLQUFkLEdBQXNCaEIsTUFBTSxDQUFDNUosT0FBRCxDQUFOLENBQWdCLEtBQWhCLENBQXRCO0FBQ0EySyxRQUFBQSxhQUFhLENBQUNFLENBQWQsR0FBa0JDLFFBQVEsQ0FBQyxPQUFPQyxJQUFQLENBQVluQixNQUFNLENBQUMsS0FBRCxDQUFsQixFQUEyQixDQUEzQixDQUFELENBQTFCLENBRnFCLENBRXNDO0FBQzVEOztBQUNELFVBQUk5SixjQUFjLElBQUk4SixNQUF0QixFQUE4QjtBQUM1QmUsUUFBQUEsYUFBYSxDQUFDSyxPQUFkLEdBQXdCcEIsTUFBTSxDQUFDOUosY0FBRCxDQUFOLENBQXVCLEtBQXZCLENBQXhCO0FBQ0Q7O0FBQ0QsVUFBSUksR0FBRyxJQUFJMEosTUFBWCxFQUFtQmUsYUFBYSxDQUFDL0YsR0FBZCxHQUFvQmdGLE1BQU0sQ0FBQzFKLEdBQUQsQ0FBTixDQUFZLEtBQVosQ0FBcEI7O0FBQ25CLFVBQUlDLE9BQU8sSUFBSXlKLE1BQWYsRUFBdUI7QUFDckIsWUFBSTVKLE9BQU8sSUFBSTRKLE1BQWYsRUFBdUI7QUFDckJlLFVBQUFBLGFBQWEsQ0FBQ0MsS0FBZCxHQUFzQmhCLE1BQU0sQ0FBQzVKLE9BQUQsQ0FBTixDQUFnQixLQUFoQixDQUF0QjtBQUNBMkssVUFBQUEsYUFBYSxDQUFDRCxNQUFkLEdBQXVCQSxNQUF2QjtBQUNEOztBQUNELFlBQUlPLE9BQU8sR0FBRyxDQUFkO0FBQ0EsWUFBSUMsU0FBUyxHQUFHLDhDQUFoQjs7QUFDQSxlQUFPQSxTQUFTLEdBQUdELE9BQVosSUFBdUJyQixNQUFNLENBQUN6SixPQUFELENBQXBDLEVBQStDO0FBQzdDdUssVUFBQUEsTUFBTSxDQUFDbkMsSUFBUCxDQUFZcUIsTUFBTSxDQUFDekosT0FBRCxDQUFOLENBQWdCK0ssU0FBUyxHQUFHRCxPQUE1QixDQUFaO0FBQ0FBLFVBQUFBLE9BQU87QUFDUjtBQUNGOztBQUNELFVBQUk3SyxPQUFPLElBQUl3SixNQUFmLEVBQXVCO0FBQ3JCLFlBQUl1QixXQUFXLEdBQUd2QixNQUFNLENBQUN4SixPQUFELENBQXhCO0FBQ0F1SyxRQUFBQSxhQUFhLENBQUNTLE9BQWQsR0FBd0IsRUFBeEI7QUFDQSxZQUFJL0ssTUFBTSxJQUFJOEssV0FBZCxFQUEyQlIsYUFBYSxDQUFDUyxPQUFkLENBQXNCQyxNQUF0QixHQUErQkYsV0FBVyxDQUFDOUssTUFBRCxDQUFYLENBQW9CLEtBQXBCLENBQS9CO0FBQzNCLFlBQUlDLFVBQVUsSUFBSTZLLFdBQWxCLEVBQStCUixhQUFhLENBQUNTLE9BQWQsQ0FBc0JFLFNBQXRCLEdBQWtDSCxXQUFXLENBQUM3SyxVQUFELENBQVgsQ0FBd0IsS0FBeEIsQ0FBbEM7QUFDaEMsT0EvQnVDLENBZ0N4Qzs7O0FBQ0EsVUFBSWlMLEtBQUssR0FBRyxFQUFaLENBakN3QyxDQWtDeEM7O0FBQ0EsVUFBSXRMLElBQUksSUFBSTJKLE1BQVosRUFBb0I7QUFDbEI7QUFDQTtBQUNBO0FBQ0EsWUFBSSxDQUFDMUQsS0FBSyxDQUFDQyxPQUFOLENBQWN5RCxNQUFNLENBQUMzSixJQUFELENBQXBCLENBQUwsRUFBa0M7QUFDaEMySixVQUFBQSxNQUFNLENBQUMzSixJQUFELENBQU4sR0FBZSxDQUFDMkosTUFBTSxDQUFDM0osSUFBRCxDQUFQLENBQWY7QUFDRCxTQU5pQixDQU9sQjs7O0FBQ0EySixRQUFBQSxNQUFNLENBQUMzSixJQUFELENBQU4sQ0FBYW1HLEdBQWIsQ0FBaUIsVUFBQ29GLENBQUQsRUFBTztBQUN0QixjQUFJLFdBQVdBLENBQVgsSUFBZ0JBLENBQUMsQ0FBQyxPQUFELENBQUQsQ0FBV3pELFFBQVgsQ0FBb0J2SCxHQUFwQixDQUFwQixFQUE4QztBQUM1QztBQUNBOEYsWUFBQUEsTUFBTSxDQUFDQyxJQUFQLENBQVlpRixDQUFaLEVBQWVwRixHQUFmLENBQW1CLFVBQUNtRSxJQUFELEVBQVU7QUFDM0Isa0JBQUlBLElBQUksQ0FBQzVFLFVBQUwsQ0FBZ0JsRixPQUFoQixDQUFKLEVBQThCO0FBQzVCOEssZ0JBQUFBLEtBQUssQ0FBQ2hELElBQU4sQ0FBV2lELENBQUMsQ0FBQ2pCLElBQUQsQ0FBRCxDQUFRLEtBQVIsQ0FBWDtBQUNEO0FBQ0YsYUFKRDtBQUtELFdBUEQsTUFPTztBQUNMZ0IsWUFBQUEsS0FBSyxDQUFDaEQsSUFBTixDQUFXaUQsQ0FBQyxDQUFDLEtBQUQsQ0FBWjtBQUNEO0FBQ0YsU0FYRCxFQVJrQixDQW9CbEI7O0FBQ0EsWUFBSTFMLGNBQWMsSUFBSThKLE1BQXRCLEVBQThCO0FBQzVCcEgsVUFBQUEsUUFBUSxDQUFDaUosU0FBUyxDQUFDckIsU0FBRCxFQUFZbUIsS0FBWixFQUFtQjNCLE1BQU0sQ0FBQzlKLGNBQUQsQ0FBTixDQUF1QixLQUF2QixDQUFuQixFQUFrRDZLLGFBQWxELENBQVYsQ0FBUjtBQUNELFNBRkQsTUFFTztBQUNMckksVUFBQUEsT0FBTyxDQUFDQyxHQUFSLENBQVksc0NBQVosRUFBb0RxSCxNQUFwRDtBQUNEO0FBQ0YsT0ExQkQsTUEwQk87QUFDTHRILFFBQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUFZLGlDQUFaLEVBQStDcUgsTUFBL0M7QUFDRDtBQUNGLEtBaEVELE1BZ0VPO0FBQ0x0SCxNQUFBQSxPQUFPLENBQUNDLEdBQVIsQ0FBWSx1REFBWixFQUFxRXFILE1BQXJFO0FBQ0Q7QUFDRixHQXpFRDtBQTBFRDs7QUFHTSxTQUFTNkIsU0FBVCxDQUFtQjdCLE1BQW5CLEVBQTJCMkIsS0FBM0IsRUFBa0NHLElBQWxDLEVBQXdDZixhQUF4QyxFQUF1RDtBQUM1RHJJLEVBQUFBLE9BQU8sQ0FBQzJHLElBQVIsQ0FBYSxxUEFBYixFQUQ0RCxDQUU1RDs7QUFDQSxTQUFPLFVBQUN6RyxRQUFELEVBQWM7QUFDbkJBLElBQUFBLFFBQVEsQ0FBQztBQUNQUSxNQUFBQSxJQUFJLEVBQUVsRSxVQURDO0FBRVBtRSxNQUFBQSxPQUFPLEVBQUU7QUFDUDJHLFFBQUFBLE1BQU0sRUFBRUEsTUFERDtBQUVQMkIsUUFBQUEsS0FBSyxFQUFFQSxLQUZBO0FBR1BJLFFBQUFBLEtBQUssRUFBRUQsSUFIQTtBQUlQaEIsUUFBQUEsTUFBTSxFQUFFQztBQUpEO0FBRkYsS0FBRCxDQUFSOztBQVNBbEksZ0NBQUtDLEtBQUwsQ0FBV2dKLElBQVgsRUFBaUI5SSxJQUFqQixDQUFzQixVQUFDRyxJQUFELEVBQVU7QUFDOUI0RCx5QkFBT0MsT0FBUCxDQUFlN0QsSUFBSSxDQUFDQSxJQUFwQixFQUEwQixVQUFDZ0QsR0FBRCxFQUFNa0UsR0FBTixFQUFjO0FBQ3RDLFlBQUlsRSxHQUFKLEVBQVM7QUFDUHpELFVBQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUFZLHNDQUFaLEVBQW9Ed0QsR0FBcEQsRUFBeURoRCxJQUFJLENBQUNBLElBQTlEO0FBQ0QsU0FGRCxNQUVPO0FBQ0w0RCw2QkFBTzZCLEtBQVAsQ0FBYXlCLEdBQWIsRUFBa0I7QUFBQyxtQkFBT3lCO0FBQVIsV0FBbEIsRUFBaUMsVUFBQzNGLEdBQUQsRUFBTStDLE1BQU4sRUFBaUI7QUFDaEQsZ0JBQUkvQyxHQUFKLEVBQVM7QUFDUHpELGNBQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUFZLDZCQUFaLEVBQTJDd0QsR0FBM0M7QUFDRCxhQUZELE1BRU87QUFDTFksaUNBQU93RCxPQUFQLENBQWVyQixNQUFmLEVBQXVCNUcsT0FBdkIsRUFBZ0MsVUFBQzZELEdBQUQsRUFBTXFFLFNBQU4sRUFBb0I7QUFDbEQsb0JBQUlyRSxHQUFKLEVBQVM7QUFDUHpELGtCQUFBQSxPQUFPLENBQUNDLEdBQVIsQ0FBWSxnQ0FBWixFQUE4Q3dELEdBQTlDO0FBQ0QsaUJBRkQsTUFFTztBQUNMMkYsa0JBQUFBLElBQUksR0FBR3RCLFNBQVAsQ0FESyxDQUVMO0FBQ0E7O0FBQ0Esc0JBQUk3SixhQUFhLElBQUltTCxJQUFyQixFQUEyQjtBQUN6QmxKLG9CQUFBQSxRQUFRLENBQUNvSixjQUFjLENBQUNoQyxNQUFELEVBQVMyQixLQUFULEVBQWdCRyxJQUFJLENBQUNuTCxhQUFELENBQUosQ0FBb0IsS0FBcEIsQ0FBaEIsQ0FBZixDQUFSO0FBQ0QsbUJBRkQsTUFFTyxJQUFJUCxPQUFPLElBQUkwTCxJQUFmLEVBQXFCO0FBQzFCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EvRSx1Q0FBTzZCLEtBQVAsQ0FBYTtBQUFDLGtDQUFZdEcsT0FBYjtBQUFzQixnQ0FBVStIO0FBQWhDLHFCQUFiLEVBQW1EO0FBQ2pELHVFQUFpRHlCLElBQUksQ0FBQzFMLE9BQUQsQ0FBSixDQUFjLEtBQWQ7QUFEQSxxQkFBbkQsRUFFRyxVQUFDK0YsR0FBRCxFQUFNK0MsTUFBTixFQUFpQjtBQUNsQiwwQkFBSS9DLEdBQUosRUFBUztBQUNQekQsd0JBQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUFZLHlDQUFaLEVBQXVEd0QsR0FBdkQ7QUFDRCx1QkFGRCxNQUVPO0FBQ0w7QUFDQSw0QkFBTThGLGFBQWEsR0FBRy9DLE1BQU0sQ0FBQyxRQUFELENBQU4sQ0FBaUIsQ0FBakIsQ0FBdEI7O0FBQ0EsNEJBQUkrQyxhQUFhLElBQUksV0FBV0EsYUFBNUIsSUFBNkNBLGFBQWEsQ0FBQyxPQUFELENBQWIsS0FBMkJuTCxLQUE1RSxFQUFtRjtBQUNqRjtBQUNBO0FBQ0EsOEJBQUlLLFlBQVksSUFBSThLLGFBQXBCLEVBQW1DO0FBQ2pDO0FBQ0E7QUFDQTtBQUNBQSw0QkFBQUEsYUFBYSxDQUFDOUssWUFBRCxDQUFiLENBQTRCcUYsR0FBNUIsQ0FBZ0MsVUFBQzBGLFFBQUQsRUFBYztBQUM1QztBQUNBLGtDQUFJOUssc0JBQXNCLElBQUk4SyxRQUE5QixFQUF3QztBQUN0QztBQUNBdEosZ0NBQUFBLFFBQVEsQ0FBQztBQUNQUSxrQ0FBQUEsSUFBSSxFQUFFcEQsb0NBREM7QUFFUHFELGtDQUFBQSxPQUFPLEVBQUU7QUFDUHlJLG9DQUFBQSxJQUFJLEVBQUVBLElBREM7QUFFUGpDLG9DQUFBQSxlQUFlLEVBQUVvQyxhQUZWO0FBR1BFLG9DQUFBQSxjQUFjLEVBQUVELFFBSFQ7QUFJUEUsb0NBQUFBLGlCQUFpQixFQUFFRixRQUFRLENBQUM5SyxzQkFBRDtBQUpwQjtBQUZGLGlDQUFELENBQVI7O0FBU0Esb0NBQUk4SyxRQUFRLENBQUM5SyxzQkFBRCxDQUFSLENBQWlDLEtBQWpDLEtBQTJDQyxTQUEvQyxFQUEwRDtBQUN4RHVCLGtDQUFBQSxRQUFRLENBQUNMLFVBQVUsQ0FBQzJKLFFBQVEsQ0FBQyxLQUFELENBQVQsQ0FBWCxDQUFSO0FBQ0QsaUNBRkQsTUFFTztBQUNMdEosa0NBQUFBLFFBQVEsQ0FBQ1csa0JBQWtCLENBQUMySSxRQUFRLENBQUMsS0FBRCxDQUFULENBQW5CLENBQVI7QUFDRDtBQUNGLCtCQWhCRCxNQWdCTyxDQUNMO0FBQ0Q7QUFDRiw2QkFyQkQ7QUFzQkQsMkJBMUJELE1BMEJPLENBQ0w7QUFDRDs7QUFDRCw4QkFBSXZMLGFBQWEsSUFBSXNMLGFBQXJCLEVBQW9DO0FBQ2xDckosNEJBQUFBLFFBQVEsQ0FBQ29KLGNBQWMsQ0FBQ2hDLE1BQUQsRUFBUzJCLEtBQVQsRUFBZ0JNLGFBQWEsQ0FBQ3RMLGFBQUQsQ0FBYixDQUE2QixLQUE3QixDQUFoQixDQUFmLENBQVI7QUFDRCwyQkFGRCxNQUVPLENBQ0w7QUFDRDtBQUNGLHlCQXJDRCxNQXFDTztBQUNMO0FBQ0FpQywwQkFBQUEsUUFBUSxDQUFDaUosU0FBUyxDQUFDN0IsTUFBRCxFQUFTMkIsS0FBVCxFQUFnQkcsSUFBSSxDQUFDMUwsT0FBRCxDQUFKLENBQWMsS0FBZCxDQUFoQixDQUFWLENBQVI7QUFDRDtBQUNGO0FBQ0YscUJBbEREO0FBbURELG1CQXhETSxNQXdEQSxDQUNMO0FBQ0Q7QUFDRjtBQUNGLGVBckVEO0FBc0VEO0FBQ0YsV0EzRUQ7QUE0RUQ7QUFDRixPQWpGRDtBQWtGRCxLQW5GRDtBQW9GRCxHQTlGRDtBQStGRDs7QUFFTSxTQUFTNEwsY0FBVCxDQUF3QmhDLE1BQXhCLEVBQWdDMkIsS0FBaEMsRUFBdUNVLE9BQXZDLEVBQWdEO0FBQ3JEM0osRUFBQUEsT0FBTyxDQUFDMkcsSUFBUixDQUFhLDBQQUFiO0FBQ0EsU0FBTyxVQUFDekcsUUFBRCxFQUFjO0FBQ25CQSxJQUFBQSxRQUFRLENBQUM7QUFDUFEsTUFBQUEsSUFBSSxFQUFFOUQsZUFEQztBQUVQK0QsTUFBQUEsT0FBTyxFQUFFO0FBQ1AyRyxRQUFBQSxNQUFNLEVBQUVBLE1BREQ7QUFFUDJCLFFBQUFBLEtBQUssRUFBRUEsS0FGQTtBQUdQVyxRQUFBQSxTQUFTLEVBQUVEO0FBSEo7QUFGRixLQUFELENBQVI7O0FBUUF4SixnQ0FBS0MsS0FBTCxDQUFXdUosT0FBWCxFQUFvQnJKLElBQXBCLENBQXlCLFVBQUNHLElBQUQsRUFBVTtBQUNqQzRELHlCQUFPQyxPQUFQLENBQWU3RCxJQUFJLENBQUNBLElBQXBCLEVBQTBCLFVBQUNnRCxHQUFELEVBQU1rRSxHQUFOLEVBQWM7QUFDdEMsWUFBSWxFLEdBQUosRUFBUztBQUNQekQsVUFBQUEsT0FBTyxDQUFDQyxHQUFSLENBQVksc0NBQVosRUFBb0R3RCxHQUFwRCxFQUF5RGhELElBQUksQ0FBQ0EsSUFBOUQ7QUFDRCxTQUZELE1BRU87QUFDTDtBQUNBd0ksVUFBQUEsS0FBSyxDQUFDbkYsR0FBTixDQUFVLFVBQUNtRSxJQUFELEVBQVU7QUFDbEI1RCwrQkFBTzZCLEtBQVAsQ0FBYXlCLEdBQWIsRUFBa0I7QUFBQyxxQkFBT007QUFBUixhQUFsQixFQUFpQyxVQUFDeEUsR0FBRCxFQUFNK0MsTUFBTixFQUFpQjtBQUNoRCxrQkFBSS9DLEdBQUosRUFBUztBQUNQekQsZ0JBQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUFZLG1DQUFaLEVBQWlEd0QsR0FBakQ7QUFDRCxlQUZELE1BRU87QUFDTFksbUNBQU93RCxPQUFQLENBQWVyQixNQUFmLEVBQXVCNUcsT0FBdkIsRUFBZ0MsVUFBQzZELEdBQUQsRUFBTXFFLFNBQU4sRUFBb0I7QUFDbEQsc0JBQUlyRSxHQUFKLEVBQVM7QUFDUHpELG9CQUFBQSxPQUFPLENBQUNDLEdBQVIsQ0FBWSxxQ0FBWixFQUFtRHdELEdBQW5EO0FBQ0QsbUJBRkQsTUFFTztBQUNMO0FBQ0E7QUFDQTtBQUNBdkQsb0JBQUFBLFFBQVEsQ0FBQztBQUNQUSxzQkFBQUEsSUFBSSxFQUFFN0Qsb0JBREM7QUFFUDhELHNCQUFBQSxPQUFPLEVBQUU7QUFDUDJHLHdCQUFBQSxNQUFNLEVBQUVBLE1BREQ7QUFFUFcsd0JBQUFBLElBQUksRUFBRUg7QUFGQztBQUZGLHFCQUFELENBQVI7QUFPRDtBQUNGLGlCQWZEO0FBZ0JEO0FBQ0YsYUFyQkQ7QUFzQkQsV0F2QkQ7QUF3QkQ7QUFDRixPQTlCRDtBQStCRCxLQWhDRDtBQWlDRCxHQTFDRDtBQTJDRDs7QUFFTSxTQUFTakIsb0JBQVQsQ0FBOEJELE9BQTlCLEVBQXVDNUYsR0FBdkMsRUFBNEM7QUFDakRoQixFQUFBQSxPQUFPLENBQUMyRyxJQUFSLENBQWEsZ1FBQWI7QUFDQSxTQUFPLFVBQUN6RyxRQUFELEVBQWM7QUFDckI7QUFDQSxRQUFNWSxPQUFPLEdBQUdYLDRCQUFLQyxLQUFMLENBQVdZLEdBQVgsRUFBZ0I7QUFBQ2lDLE1BQUFBLE9BQU8sRUFBRTtBQUFDLGtCQUFVO0FBQVg7QUFBVixLQUFoQixDQUFoQjs7QUFFQSxXQUFPLFVBQUMvQyxRQUFELEVBQWM7QUFDbkJZLE1BQUFBLE9BQU8sQ0FBQ1IsSUFBUixDQUFhLFVBQUNDLFFBQUQsRUFBYztBQUN6QixZQUFNaUcsTUFBTSxHQUFHakcsUUFBUSxDQUFDRSxJQUF4QjtBQUNBLFlBQU0wRyxlQUFlLEdBQUdYLE1BQU0sQ0FBQyxRQUFELENBQU4sQ0FBaUIsQ0FBakIsQ0FBeEI7O0FBQ0EsWUFBSSxxQkFBcUJXLGVBQXpCLEVBQTBDO0FBQ3hDO0FBQ0FqSCxVQUFBQSxRQUFRLENBQUM7QUFDUFEsWUFBQUEsSUFBSSxFQUFFdEUsc0JBREM7QUFFUHVFLFlBQUFBLE9BQU8sRUFBRXdHO0FBRkYsV0FBRCxDQUFSO0FBSUFqSCxVQUFBQSxRQUFRLENBQUNMLFVBQVUsQ0FBQ3NILGVBQWUsQ0FBQyxpQkFBRCxDQUFmLENBQW1DLEtBQW5DLENBQUQsQ0FBWCxDQUFSO0FBQ0QsU0FQRCxNQU9PO0FBQ0xuSCxVQUFBQSxPQUFPLENBQUNDLEdBQVIsQ0FBWSxnQ0FBWixFQUE4Q2tILGVBQTlDO0FBQ0Q7QUFDRDtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUNPLE9BM0JIO0FBNEJDLEtBN0JIO0FBOEJDLEdBbENEO0FBbUNEOztBQUVNLFNBQVMwQyxlQUFULENBQXlCQyxXQUF6QixFQUFzQy9KLE9BQXRDLEVBQStDO0FBQ3BELFNBQU87QUFDTFcsSUFBQUEsSUFBSSxFQUFFMUQsaUJBREQ7QUFFTDJELElBQUFBLE9BQU8sRUFBRTtBQUNQWixNQUFBQSxPQUFPLEVBQUVBLE9BREY7QUFFUGlCLE1BQUFBLEdBQUcsRUFBRThJO0FBRkU7QUFGSixHQUFQO0FBT0Q7O0FBRU0sU0FBU0MsMEJBQVQsQ0FBb0N6QyxNQUFwQyxFQUE0Q3dDLFdBQTVDLEVBQXlERSxHQUF6RCxFQUE4RDtBQUNuRSxTQUFPO0FBQ0x0SixJQUFBQSxJQUFJLEVBQUV6RCxvQkFERDtBQUVMMEQsSUFBQUEsT0FBTyxFQUFFO0FBQ1BGLE1BQUFBLElBQUksRUFBRXVKLEdBREM7QUFFUGhKLE1BQUFBLEdBQUcsRUFBRThJLFdBRkU7QUFHUHhDLE1BQUFBLE1BQU0sRUFBRUE7QUFIRDtBQUZKLEdBQVA7QUFRRDs7QUFHTSxTQUFTMkMsbUJBQVQsQ0FBNkJILFdBQTdCLEVBQTBDSSxPQUExQyxFQUFtREYsR0FBbkQsRUFBd0Q7QUFDN0QsU0FBTyxVQUFDOUosUUFBRCxFQUFjO0FBQ25CQSxJQUFBQSxRQUFRLENBQUM7QUFDUFEsTUFBQUEsSUFBSSxFQUFFM0QsZUFEQztBQUVQNEQsTUFBQUEsT0FBTyxFQUFFO0FBQ1B1SixRQUFBQSxPQUFPLEVBQUVBLE9BREY7QUFFUHpKLFFBQUFBLElBQUksRUFBRXVKLEdBRkM7QUFHUGhKLFFBQUFBLEdBQUcsRUFBRThJO0FBSEU7QUFGRixLQUFELENBQVI7QUFRRCxHQVREO0FBVUQ7O0FBRU0sU0FBU0ssYUFBVCxDQUF1QnZELE9BQXZCLEVBQWdDd0QsV0FBaEMsRUFBNkNoSSxJQUE3QyxFQUFtRDJFLFVBQW5ELEVBQStEK0MsV0FBL0QsRUFBNEVJLE9BQTVFLEVBQXFGRixHQUFyRixFQUEwRjtBQUMvRixTQUFPLFVBQUM5SixRQUFELEVBQWM7QUFDbkIsUUFBSThKLEdBQUosRUFBUztBQUNQO0FBQ0EsVUFBTUssTUFBTSxHQUFHO0FBQ2IzSixRQUFBQSxJQUFJLEVBQUUzRCxlQURPO0FBRWI0RCxRQUFBQSxPQUFPLEVBQUU7QUFDUHVKLFVBQUFBLE9BQU8sRUFBRUEsT0FERjtBQUVQekosVUFBQUEsSUFBSSxFQUFFdUosR0FGQztBQUdQaEosVUFBQUEsR0FBRyxFQUFFOEksV0FIRTtBQUlQTSxVQUFBQSxXQUFXLEVBQUVBO0FBSk47QUFGSSxPQUFmO0FBU0FsSyxNQUFBQSxRQUFRLENBQ0pvSyx5QkFBeUIsQ0FBQ0QsTUFBRCxFQUFTekQsT0FBVCxFQUFrQnhFLElBQWxCLEVBQXdCMkUsVUFBeEIsQ0FEckIsQ0FBUjtBQUdELEtBZEQsTUFjTztBQUNMN0csTUFBQUEsUUFBUSxDQUFDO0FBQ1BRLFFBQUFBLElBQUksRUFBRXlILG1DQURDO0FBRVB4SCxRQUFBQSxPQUFPLEVBQUU7QUFGRixPQUFELENBQVI7QUFJRDtBQUNGLEdBckJEO0FBc0JEOztBQUdNLFNBQVM0SixtQkFBVCxDQUE2QlQsV0FBN0IsRUFBMENJLE9BQTFDLEVBQW1ERixHQUFuRCxFQUF3RDtBQUM3RCxTQUFPLFVBQUM5SixRQUFELEVBQWM7QUFDbkJBLElBQUFBLFFBQVEsQ0FBQztBQUNQUSxNQUFBQSxJQUFJLEVBQUU1RCxlQURDO0FBRVA2RCxNQUFBQSxPQUFPLEVBQUU7QUFDUHVKLFFBQUFBLE9BQU8sRUFBRUEsT0FERjtBQUVQekosUUFBQUEsSUFBSSxFQUFFdUosR0FGQztBQUdQaEosUUFBQUEsR0FBRyxFQUFFOEk7QUFIRTtBQUZGLEtBQUQsQ0FBUjtBQVFELEdBVEQ7QUFVRDs7QUFFTSxTQUFTVSxhQUFULENBQXVCNUQsT0FBdkIsRUFBZ0N3RCxXQUFoQyxFQUE2Q2hJLElBQTdDLEVBQW1EMkUsVUFBbkQsRUFBK0QrQyxXQUEvRCxFQUE0RUksT0FBNUUsRUFBcUZGLEdBQXJGLEVBQTBGO0FBQy9GLFNBQU8sVUFBQzlKLFFBQUQsRUFBYztBQUNuQixRQUFJOEosR0FBSixFQUFTO0FBQ1AsVUFBTUssTUFBTSxHQUFHO0FBQ2IzSixRQUFBQSxJQUFJLEVBQUU1RCxlQURPO0FBRWI2RCxRQUFBQSxPQUFPLEVBQUU7QUFDUHVKLFVBQUFBLE9BQU8sRUFBRUEsT0FERjtBQUVQekosVUFBQUEsSUFBSSxFQUFFdUosR0FGQztBQUdQaEosVUFBQUEsR0FBRyxFQUFFOEksV0FIRTtBQUlQTSxVQUFBQSxXQUFXLEVBQUVBO0FBSk47QUFGSSxPQUFmO0FBU0FsSyxNQUFBQSxRQUFRLENBQ0pvSyx5QkFBeUIsQ0FBQ0QsTUFBRCxFQUFTekQsT0FBVCxFQUFrQnhFLElBQWxCLEVBQXdCMkUsVUFBeEIsQ0FEckIsQ0FBUjtBQUdELEtBYkQsTUFhTztBQUNMN0csTUFBQUEsUUFBUSxDQUFDO0FBQ1BRLFFBQUFBLElBQUksRUFBRXlILG1DQURDO0FBRVB4SCxRQUFBQSxPQUFPLEVBQUU7QUFGRixPQUFELENBQVI7QUFJRDtBQUNGLEdBcEJEO0FBcUJEOztBQUVNLFNBQVM4SixtQkFBVCxDQUE2QkMsV0FBN0IsRUFBMENOLFdBQTFDLEVBQXVEO0FBQzVEO0FBQ0FPLEVBQUFBLE1BQU0sQ0FBQ0MsUUFBUCxDQUFnQkMsTUFBaEIsQ0FBdUIsY0FBY1QsV0FBckM7QUFDQSxTQUFPO0FBQ0wxSixJQUFBQSxJQUFJLEVBQUVvSztBQURELEdBQVA7QUFHRDs7QUFFTSxTQUFTQyx1QkFBVCxHQUFtQztBQUN4QyxTQUFPO0FBQ0xySyxJQUFBQSxJQUFJLEVBQUV0RDtBQURELEdBQVA7QUFHRDs7QUFFTSxTQUFTNE4sc0JBQVQsQ0FBZ0NwRSxPQUFoQyxFQUF5Q3hFLElBQXpDLEVBQStDO0FBQ3BELFNBQU8sVUFBQ2xDLFFBQUQsRUFBYztBQUNuQkEsSUFBQUEsUUFBUSxDQUNKK0ssY0FBYyxDQUFDckUsT0FBRCxFQUFVeEUsSUFBVixFQUFnQjhJLElBQUksQ0FBQ0MsU0FBTCxDQUFlO0FBQzNDLHNCQUFnQjtBQUFDLGVBQU92RTtBQUFSLE9BRDJCO0FBRTNDLHdCQUFrQjtBQUFDLGVBQU87QUFBUjtBQUZ5QixLQUFmLENBQWhCLENBRFYsQ0FBUjtBQU1ELEdBUEQ7QUFRRDs7QUFFTSxTQUFTd0Usc0JBQVQsQ0FBZ0N4RSxPQUFoQyxFQUF5Q3hFLElBQXpDLEVBQStDO0FBQ3BELFNBQU8sVUFBQ2xDLFFBQUQsRUFBYztBQUNuQkEsSUFBQUEsUUFBUSxDQUNKK0ssY0FBYyxDQUFDckUsT0FBRCxFQUFVeEUsSUFBVixFQUFnQjhJLElBQUksQ0FBQ0MsU0FBTCxDQUFlO0FBQzNDLHNCQUFnQjtBQUFDLGVBQU92RTtBQUFSLE9BRDJCO0FBRTNDLHdCQUFrQjtBQUFDLGVBQU87QUFBUjtBQUZ5QixLQUFmLENBQWhCLENBRFYsQ0FBUjtBQU1ELEdBUEQ7QUFRRDs7QUFFTSxTQUFTcUUsY0FBVCxDQUF3QnJFLE9BQXhCLEVBQWlDeEUsSUFBakMsRUFBdUNtQixJQUF2QyxFQUFtRjtBQUFBLE1BQXRDOEgsT0FBc0MsdUVBQTVCNUwsV0FBNEI7QUFBQSxNQUFmNkwsUUFBZSx1RUFBSixFQUFJO0FBQ3hGLE1BQUlDLElBQUksR0FBRyxlQUFYOztBQUNBLE1BQUdGLE9BQU8sS0FBSyxFQUFmLEVBQW1CO0FBQ2pCQSxJQUFBQSxPQUFPLEdBQUc1TCxXQUFWO0FBQ0Q7O0FBQ0QsTUFBRyxFQUFFLFFBQVE4RCxJQUFWLEtBQW1CLEVBQUUsU0FBU0EsSUFBWCxDQUF0QixFQUF3QztBQUN0QztBQUNBQSxJQUFBQSxJQUFJLENBQUMsS0FBRCxDQUFKLEdBQWNxRCxPQUFPLEdBQUcyRSxJQUFWLEdBQWlCLFNBQS9CO0FBQ0Q7O0FBRUQsU0FBTyxVQUFDckwsUUFBRCxFQUFjO0FBQ25CLFFBQUltTCxPQUFKLEVBQWE7QUFDWHJMLE1BQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUFZLHNCQUFaLEVBQW9DMkcsT0FBcEMsRUFBNkN4RSxJQUE3QyxFQUFtRG1CLElBQW5EOztBQUNBcEQsa0NBQUtDLEtBQUwsQ0FBV3dHLE9BQVgsRUFBb0I7QUFDbEI0RSxRQUFBQSxNQUFNLEVBQUUsTUFEVTtBQUVsQnZJLFFBQUFBLE9BQU8sRUFBRTtBQUNQLDBCQUFnQixxQkFEVDtBQUVQLDJCQUFpQmIsSUFGVjtBQUdQLGtCQUFRbUosSUFBSSxHQUFHO0FBSFIsU0FGUztBQU9sQkUsUUFBQUEsSUFBSSxFQUFFUCxJQUFJLENBQUNDLFNBQUwsQ0FBZTVILElBQWY7QUFQWSxPQUFwQixFQVFHakQsSUFSSCxDQVFTLFVBQUNDLFFBQUQsRUFBYztBQUNuQixlQUFPK0ssUUFBUCxLQUFvQixVQUFwQixJQUFrQ0EsUUFBUSxDQUFDL0ssUUFBRCxDQUExQztBQUNILE9BVkQsV0FVUyxVQUFVZ0UsS0FBVixFQUFpQjtBQUN4QixZQUFHLENBQUNBLEtBQUssQ0FBQ2hFLFFBQVYsRUFBbUI7QUFDakJQLFVBQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUFZc0UsS0FBWixFQUFtQixvQ0FBbkI7QUFDQSxpQkFBTztBQUNMN0QsWUFBQUEsSUFBSSxFQUFFeUg7QUFERCxXQUFQO0FBR0Q7O0FBQ0QsWUFBSTVELEtBQUssQ0FBQ2hFLFFBQU4sQ0FBZTJDLE1BQWYsSUFBeUIsR0FBN0IsRUFBa0M7QUFDaENsRCxVQUFBQSxPQUFPLENBQUNDLEdBQVIsQ0FBWSxrRUFBWixFQUFnRjJHLE9BQWhGLEVBQXlGeEUsSUFBekYsRUFBK0ZtQixJQUEvRixFQURnQyxDQUVoQzs7QUFDQXBELHNDQUFLQyxLQUFMLENBQVd3RyxPQUFYLEVBQW9CdEcsSUFBcEIsQ0FBeUIsVUFBQ0MsUUFBRCxFQUFjO0FBQ3JDLG1CQUFPLFVBQUNMLFFBQUQsRUFBYztBQUNuQjtBQUNBd0wsY0FBQUEsVUFBVSxDQUFDLFlBQU07QUFDZnhMLGdCQUFBQSxRQUFRLENBQUMrSyxjQUFjLENBQUNyRSxPQUFELEVBQVVyRyxRQUFRLENBQUMwQyxPQUFULENBQWlCRSxHQUFqQixDQUFxQixNQUFyQixDQUFWLEVBQXdDSSxJQUF4QyxFQUE4QzhILE9BQU8sR0FBRyxDQUF4RCxDQUFmLENBQVI7QUFDRCxlQUZTLEVBRVAxTCxXQUZPLENBQVY7QUFHRCxhQUxEO0FBTUQsV0FQRDtBQVFELFNBWEQsTUFXTztBQUNMSyxVQUFBQSxPQUFPLENBQUNDLEdBQVIsQ0FBWSxXQUFaO0FBQ0F5TCxVQUFBQSxVQUFVLENBQUMsWUFBTTtBQUNmeEwsWUFBQUEsUUFBUSxDQUFDK0ssY0FBYyxDQUFDckUsT0FBRCxFQUFVckcsUUFBUSxDQUFDMEMsT0FBVCxDQUFpQkUsR0FBakIsQ0FBcUJmLElBQXJCLENBQVYsRUFBc0NtQixJQUF0QyxFQUE0QzhILE9BQU8sR0FBRyxDQUF0RCxDQUFmLENBQVI7QUFDRCxXQUZTLEVBRVAxTCxXQUZPLENBQVY7QUFHRDtBQUNGLE9BbENEOztBQW9DQSxhQUFPO0FBQ0xlLFFBQUFBLElBQUksRUFBRWlMO0FBREQsT0FBUDtBQUdELEtBekNELE1BeUNPO0FBQ0wzTCxNQUFBQSxPQUFPLENBQUNDLEdBQVIsQ0FBWSxvREFBWixFQUFrRTJHLE9BQWxFLEVBQTJFeEUsSUFBM0UsRUFBaUZtQixJQUFqRjtBQUNBLGFBQU87QUFDTDdDLFFBQUFBLElBQUksRUFBRXlIO0FBREQsT0FBUDtBQUdEO0FBQ0YsR0FoREQ7QUFpREQ7O0FBRU0sU0FBU3lELHVCQUFULENBQWlDaEYsT0FBakMsRUFBMEN4RSxJQUExQyxFQUFnRDJFLFVBQWhELEVBQW1GO0FBQUEsTUFBdkJzRSxPQUF1Qix1RUFBYjVMLFdBQWE7O0FBQ3hGLE1BQUk0TCxPQUFKLEVBQWE7QUFDWDtBQUNBLFFBQU1RLFNBQVMsR0FBR1gsSUFBSSxDQUFDQyxTQUFMLENBQWU7QUFDL0IsYUFBT3BFLFVBQVUsQ0FBQyxLQUFELENBRGM7QUFFL0Isb0JBQWM7QUFBQyxlQUFPO0FBQVI7QUFGaUIsS0FBZixDQUFsQjs7QUFJQStFLHNCQUFNQyxLQUFOLENBQ0luRixPQURKLEVBRUlpRixTQUZKLEVBR0k7QUFBQzVJLE1BQUFBLE9BQU8sRUFBRTtBQUFDLHdCQUFnQixxQkFBakI7QUFBd0MseUJBQWlCYjtBQUF6RDtBQUFWLEtBSEosV0FJUSxVQUFVbUMsS0FBVixFQUFpQjtBQUN2QixVQUFJQSxLQUFLLENBQUNoRSxRQUFOLENBQWUyQyxNQUFmLElBQXlCLEdBQTdCLEVBQWtDO0FBQ2hDbEQsUUFBQUEsT0FBTyxDQUFDQyxHQUFSLENBQVksNEVBQVosRUFBMEYyRyxPQUExRixFQUFtR3hFLElBQW5HLEVBQXlHMkUsVUFBekcsRUFEZ0MsQ0FFaEM7O0FBQ0E1RyxvQ0FBS0MsS0FBTCxDQUFXd0csT0FBWCxFQUFvQnRHLElBQXBCLENBQXlCLFVBQUNDLFFBQUQsRUFBYztBQUNyQztBQUNBLGlCQUFPLFVBQUNMLFFBQUQsRUFBYztBQUNuQndMLFlBQUFBLFVBQVUsQ0FBQyxZQUFNO0FBQ2Z4TCxjQUFBQSxRQUFRLENBQUMwTCx1QkFBdUIsQ0FBQ2hGLE9BQUQsRUFBVXJHLFFBQVEsQ0FBQzBDLE9BQVQsQ0FBaUJiLElBQTNCLEVBQWlDMkUsVUFBakMsRUFBNkNzRSxPQUFPLEdBQUcsQ0FBdkQsQ0FBeEIsQ0FBUjtBQUNELGFBRlMsRUFFUDFMLFdBRk8sQ0FBVjtBQUdELFdBSkQ7QUFLRCxTQVBEO0FBUUQsT0FYRCxNQVdPO0FBQ0xLLFFBQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUFZLG1DQUFaLEVBQWlEc0UsS0FBakQ7QUFDQXZFLFFBQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUFZLFdBQVo7QUFDQSxlQUFPLFVBQUNDLFFBQUQsRUFBYztBQUNuQndMLFVBQUFBLFVBQVUsQ0FBQyxZQUFNO0FBQ2Z4TCxZQUFBQSxRQUFRLENBQUMwTCx1QkFBdUIsQ0FBQ2hGLE9BQUQsRUFBVXJHLFFBQVEsQ0FBQzBDLE9BQVQsQ0FBaUJiLElBQTNCLEVBQWlDMkUsVUFBakMsRUFBNkNzRSxPQUFPLEdBQUcsQ0FBdkQsQ0FBeEIsQ0FBUjtBQUNELFdBRlMsRUFFUDFMLFdBRk8sQ0FBVjtBQUdELFNBSkQ7QUFLRDtBQUNGLEtBekJELEVBeUJHVyxJQXpCSCxDQXlCUSxPQXpCUjs7QUEyQkEsV0FBTztBQUNMSSxNQUFBQSxJQUFJLEVBQUVzTDtBQURELEtBQVA7QUFHRCxHQXBDRCxNQW9DTztBQUNMaE0sSUFBQUEsT0FBTyxDQUFDQyxHQUFSLENBQVkscURBQVosRUFBbUUyRyxPQUFuRSxFQUE0RXhFLElBQTVFLEVBQWtGMkUsVUFBbEY7QUFDQSxXQUFPO0FBQ0xyRyxNQUFBQSxJQUFJLEVBQUV5SDtBQURELEtBQVA7QUFHRDtBQUNGOztBQUVNLFNBQVNtQyx5QkFBVCxDQUFtQ0QsTUFBbkMsRUFBMkN6RCxPQUEzQyxFQUFvRHhFLElBQXBELEVBQTBEMkUsVUFBMUQsRUFBbUk7QUFBQSxNQUE3RGtGLE9BQTZELHVFQUFuRDtBQUFDdkwsSUFBQUEsSUFBSSxFQUFFc0w7QUFBUCxHQUFtRDtBQUFBLE1BQXZCWCxPQUF1Qix1RUFBYjVMLFdBQWE7O0FBQ3hJLE1BQUk0TCxPQUFKLEVBQWE7QUFDWDtBQUNBLFFBQU1RLFNBQVMsR0FBR1gsSUFBSSxDQUFDQyxTQUFMLENBQWU7QUFDL0IsYUFBT3BFLFVBQVUsQ0FBQyxLQUFELENBRGM7QUFFL0Isb0JBQWM7QUFBQyxlQUFPO0FBQVI7QUFGaUIsS0FBZixDQUFsQjtBQUlBLFdBQU8sVUFBQzdHLFFBQUQsRUFBYztBQUNuQjRMLHdCQUFNQyxLQUFOLENBQ0luRixPQURKLEVBRUlpRixTQUZKLEVBR0k7QUFBQzVJLFFBQUFBLE9BQU8sRUFBRTtBQUFDLDBCQUFnQixxQkFBakI7QUFBd0MsMkJBQWlCYjtBQUF6RDtBQUFWLE9BSEosRUFJRTlCLElBSkYsQ0FJTyxVQUFVQyxRQUFWLEVBQW9CO0FBQ3pCO0FBQ0FMLFFBQUFBLFFBQVEsQ0FBQ21LLE1BQUQsQ0FBUixDQUZ5QixDQUd6Qjs7QUFDQW5LLFFBQUFBLFFBQVEsQ0FBQytMLE9BQUQsQ0FBUjtBQUNELE9BVEQsV0FTUyxVQUFVMUgsS0FBVixFQUFpQjtBQUN4QixZQUFJQSxLQUFLLENBQUNoRSxRQUFOLENBQWUyQyxNQUFmLElBQXlCLEdBQTdCLEVBQWtDO0FBQ2hDbEQsVUFBQUEsT0FBTyxDQUFDQyxHQUFSLENBQVksbUVBQVosRUFBaUYyRyxPQUFqRixFQUEwRnhFLElBQTFGLEVBQWdHMkUsVUFBaEcsRUFEZ0MsQ0FFaEM7O0FBQ0E1RyxzQ0FBS0MsS0FBTCxDQUFXd0csT0FBWCxFQUFvQnRHLElBQXBCLENBQXlCLFVBQUNDLFFBQUQsRUFBYztBQUNyQztBQUNBLG1CQUFPLFVBQUNMLFFBQUQsRUFBYztBQUNuQndMLGNBQUFBLFVBQVUsQ0FBQyxZQUFNO0FBQ2Z4TCxnQkFBQUEsUUFBUSxDQUFDb0sseUJBQXlCLENBQUNELE1BQUQsRUFBU3pELE9BQVQsRUFBa0JyRyxRQUFRLENBQUMwQyxPQUFULENBQWlCYixJQUFuQyxFQUF5QzJFLFVBQXpDLEVBQXFEa0YsT0FBckQsRUFBOERaLE9BQU8sR0FBRyxDQUF4RSxDQUExQixDQUFSO0FBQ0QsZUFGUyxFQUVQMUwsV0FGTyxDQUFWO0FBR0QsYUFKRDtBQUtELFdBUEQ7QUFRRCxTQVhELE1BV087QUFDTEssVUFBQUEsT0FBTyxDQUFDQyxHQUFSLENBQVksbUNBQVosRUFBaURzRSxLQUFqRDtBQUNBdkUsVUFBQUEsT0FBTyxDQUFDQyxHQUFSLENBQVksV0FBWjtBQUNBLGlCQUFPLFVBQUNDLFFBQUQsRUFBYztBQUNuQndMLFlBQUFBLFVBQVUsQ0FBQyxZQUFNO0FBQ2Z4TCxjQUFBQSxRQUFRLENBQUNvSyx5QkFBeUIsQ0FBQ0QsTUFBRCxFQUFTekQsT0FBVCxFQUFrQnJHLFFBQVEsQ0FBQzBDLE9BQVQsQ0FBaUJiLElBQW5DLEVBQXlDMkUsVUFBekMsRUFBcURrRixPQUFyRCxFQUE4RFosT0FBTyxHQUFHLENBQXhFLENBQTFCLENBQVI7QUFDRCxhQUZTLEVBRVAxTCxXQUZPLENBQVY7QUFHRCxXQUpEO0FBS0Q7QUFDRixPQTlCRDtBQStCRCxLQWhDRDtBQWlDRCxHQXZDRCxNQXVDTztBQUNMSyxJQUFBQSxPQUFPLENBQUNDLEdBQVIsQ0FBWSxxREFBWixFQUFtRTJHLE9BQW5FLEVBQTRFeEUsSUFBNUUsRUFBa0YyRSxVQUFsRjtBQUNBLFdBQU87QUFDTHJHLE1BQUFBLElBQUksRUFBRXlIO0FBREQsS0FBUDtBQUdEO0FBQ0Y7O0FBR00sU0FBUytELGVBQVQsQ0FBeUIxTSxZQUF6QixFQUF1Q29ILE9BQXZDLEVBQTBEO0FBQUEsTUFBVnVGLEdBQVUsdUVBQUosRUFBSTs7QUFDL0Q7QUFDQTtBQUNBLE1BQU05SixNQUFNLEdBQUcrSix3QkFBWWpCLFNBQVosQ0FBc0I7QUFDbkMsWUFBUSxXQUQyQjtBQUVuQyxzQkFBa0J2RSxPQUZpQjtBQUduQyxlQUFXdUY7QUFId0IsR0FBdEIsQ0FBZjs7QUFNQWhNLDhCQUFLQyxLQUFMLENBQVdaLFlBQVgsRUFBeUI2QyxNQUF6Qjs7QUFDQSxTQUFRO0FBQ04zQixJQUFBQSxJQUFJLEVBQUVuRDtBQURBLEdBQVI7QUFHRCxDLENBRUQ7QUFDQTtBQUNBO0FBQ0E7OztBQUNPLFNBQVN1SixXQUFULENBQXFCdUYsTUFBckIsRUFBNkJDLE1BQTdCLEVBQXFDO0FBQzFDLE1BQUlELE1BQU0sS0FBSyxJQUFYLElBQW1CLFFBQU9BLE1BQVAsTUFBa0IsUUFBekMsRUFBbUQ7QUFDakQsUUFBSSxDQUFDQyxNQUFELElBQVdELE1BQWYsRUFBdUI7QUFDckJyTSxNQUFBQSxPQUFPLENBQUNDLEdBQVIsQ0FBWSxpQ0FBWixFQUErQ3FNLE1BQS9DLEVBQXVERCxNQUF2RDtBQUNELEtBRkQsTUFFTyxJQUFJLENBQUN6SSxLQUFLLENBQUNDLE9BQU4sQ0FBY3dJLE1BQU0sQ0FBQ0MsTUFBRCxDQUFwQixDQUFMLEVBQW9DO0FBQ3pDRCxNQUFBQSxNQUFNLENBQUNDLE1BQUQsQ0FBTixHQUFpQixDQUFDRCxNQUFNLENBQUNDLE1BQUQsQ0FBUCxDQUFqQjtBQUNEOztBQUNELFdBQU9ELE1BQVA7QUFDRCxHQVBELE1BT087QUFDTHJNLElBQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUFZLG1EQUFaO0FBQ0Q7QUFDRixDLENBR0Q7QUFDQTtBQUNBOzs7QUFDTyxTQUFTc00sNEJBQVQsQ0FBc0N0SyxVQUF0QyxFQUFrRDtBQUN2RCxTQUFPO0FBQ0x2QixJQUFBQSxJQUFJLEVBQUUzRSx3QkFERDtBQUVMNEUsSUFBQUEsT0FBTyxFQUFFc0I7QUFGSixHQUFQO0FBSUQ7O0FBRU0sU0FBU3VLLGFBQVQsQ0FBdUJDLFdBQXZCLEVBQW9DQyxRQUFwQyxFQUFtSTtBQUFBLGtGQUFKLEVBQUk7QUFBQSw0QkFBcEY5RixPQUFvRjtBQUFBLE1BQXBGQSxPQUFvRiw4QkFBMUUsRUFBMEU7QUFBQSx5QkFBdEV4RSxJQUFzRTtBQUFBLE1BQXRFQSxJQUFzRSwyQkFBL0QsRUFBK0Q7QUFBQSw0QkFBM0RpSixPQUEyRDtBQUFBLE1BQTNEQSxPQUEyRCw4QkFBakQ1TCxXQUFpRDtBQUFBLGlDQUFwQ2tOLFlBQW9DO0FBQUEsTUFBcENBLFlBQW9DLG1DQUFyQixFQUFxQjtBQUFBLHlCQUFqQkMsSUFBaUI7QUFBQSxNQUFqQkEsSUFBaUIsMkJBQVYsRUFBVTs7QUFDeEksU0FBTyxVQUFDMU0sUUFBRCxFQUFjO0FBQ25CLFFBQUltTCxPQUFKLEVBQWE7QUFDWDtBQUNBbEwsa0NBQUtDLEtBQUwsQ0FBV3FNLFdBQVgsRUFBd0JuTSxJQUF4QixDQUE2QixVQUFDdU0sV0FBRCxFQUFpQjtBQUM1Q2YsMEJBQU1nQixJQUFOLENBQ0lMLFdBREosRUFFSXZCLElBQUksQ0FBQ0MsU0FBTCxDQUFlO0FBQ2IsbUJBQVMsQ0FBQyxnQkFBRCxFQUFtQixvQkFBbkIsQ0FESTtBQUViLCtCQUFxQjtBQUFDLG1CQUFPdUI7QUFBUjtBQUZSLFNBQWYsQ0FGSixFQU1JO0FBQ0V6SixVQUFBQSxPQUFPLEVBQUU7QUFDUCw0QkFBZ0IscUJBRFQ7QUFFUCw2QkFBaUI0SixXQUFXLENBQUM1SixPQUFaLENBQW9CYixJQUY5QjtBQUdQLG9CQUFRd0s7QUFIRDtBQURYLFNBTkosRUFhRXRNLElBYkYsQ0FhTyxVQUFDeU0sWUFBRCxFQUFrQjtBQUN2QjtBQUNBO0FBQ0E3TSxVQUFBQSxRQUFRLENBQUM7QUFDUFEsWUFBQUEsSUFBSSxFQUFFOUIsY0FEQztBQUVQK0IsWUFBQUEsT0FBTyxFQUFFb007QUFGRixXQUFELENBQVIsQ0FIdUIsQ0FPdkI7QUFDQTtBQUNBOztBQUNBLGNBQUluRyxPQUFKLEVBQWE7QUFDWDFHLFlBQUFBLFFBQVEsQ0FDSitLLGNBQWMsQ0FDVnJFLE9BRFUsRUFFVnhFLElBRlUsRUFHVjtBQUNFLDhCQUFnQjtBQUFDLHVCQUFPd0U7QUFBUixlQURsQjtBQUVFLGdDQUFrQjtBQUFDLHVCQUFPO0FBQVIsZUFGcEI7QUFHRSw0QkFBYztBQUFDLHVCQUFPbUcsWUFBWSxDQUFDOUosT0FBYixDQUFxQjJIO0FBQTdCO0FBSGhCLGFBSFUsQ0FEVixDQUFSO0FBV0Q7QUFDRixTQXBDRCxXQW9DUyxVQUFVckcsS0FBVixFQUFpQjtBQUN4QixjQUFJQSxLQUFLLENBQUNoRSxRQUFOLENBQWUyQyxNQUFmLElBQXlCLEdBQTdCLEVBQWtDO0FBQ2hDbEQsWUFBQUEsT0FBTyxDQUFDQyxHQUFSLENBQVksa0VBQVo7QUFDQUMsWUFBQUEsUUFBUSxDQUFDLFlBQU07QUFDYndMLGNBQUFBLFVBQVUsQ0FBQyxZQUFNO0FBQ2Z4TCxnQkFBQUEsUUFBUSxDQUFDc00sYUFBYSxDQUFDQyxXQUFELEVBQWNDLFFBQWQsRUFBd0I7QUFDNUN0SyxrQkFBQUEsSUFBSSxFQUFFeUssV0FBVyxDQUFDNUosT0FBWixDQUFvQmIsSUFEa0I7QUFFNUNpSixrQkFBQUEsT0FBTyxFQUFFQSxPQUFPLEdBQUcsQ0FGeUI7QUFHNUNzQixrQkFBQUEsWUFBWSxFQUFFQSxZQUg4QjtBQUk1Q0Msa0JBQUFBLElBQUksRUFBRUE7QUFKc0MsaUJBQXhCLENBQWQsQ0FBUjtBQU1ELGVBUFMsRUFPUGpOLFdBUE8sQ0FBVjtBQVFELGFBVE8sQ0FBUjtBQVVELFdBWkQsTUFZTztBQUNMSyxZQUFBQSxPQUFPLENBQUNDLEdBQVIsQ0FBWSxnQ0FBWixFQUE4Q3NFLEtBQTlDO0FBQ0F2RSxZQUFBQSxPQUFPLENBQUNDLEdBQVIsQ0FBWSxXQUFaO0FBQ0FDLFlBQUFBLFFBQVEsQ0FBQyxZQUFNO0FBQ2J3TCxjQUFBQSxVQUFVLENBQUMsWUFBTTtBQUNmeEwsZ0JBQUFBLFFBQVEsQ0FBQ3NNLGFBQWEsQ0FBQ0MsV0FBRCxFQUFjQyxRQUFkLEVBQXdCO0FBQzVDdEssa0JBQUFBLElBQUksRUFBRXlLLFdBQVcsQ0FBQzVKLE9BQVosQ0FBb0JiLElBRGtCO0FBRTVDaUosa0JBQUFBLE9BQU8sRUFBRUEsT0FBTyxHQUFHLENBRnlCO0FBRzVDc0Isa0JBQUFBLFlBQVksRUFBRUEsWUFIOEI7QUFJNUNDLGtCQUFBQSxJQUFJLEVBQUVBO0FBSnNDLGlCQUF4QixDQUFkLENBQVI7QUFNRCxlQVBTLEVBT1BqTixXQVBPLENBQVY7QUFRRCxhQVRPLENBQVI7QUFVRDtBQUNGLFNBL0REO0FBZ0VELE9BakVEO0FBa0VELEtBcEVELE1Bb0VPO0FBQ0xLLE1BQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUFZLG1EQUFaLEVBQWlFd00sV0FBakUsRUFBOEVDLFFBQTlFLEVBQXdGbk0sUUFBUSxDQUFDMEMsT0FBVCxDQUFpQmIsSUFBekcsRUFBK0dpSixPQUFPLEdBQUcsQ0FBekgsRUFBNEhzQixZQUE1SDtBQUNBLGFBQU87QUFDTGpNLFFBQUFBLElBQUksRUFBRTdCO0FBREQsT0FBUDtBQUdEO0FBQ0YsR0EzRUQ7QUE0RUQ7O0FBRU0sU0FBU21PLGlCQUFULENBQTJCekgsV0FBM0IsRUFBd0MwSCxJQUF4QyxFQUE4QztBQUNuRCxTQUFPO0FBQ0x2TSxJQUFBQSxJQUFJLEVBQUU1QixJQUREO0FBRUw2QixJQUFBQSxPQUFPLEVBQUU7QUFDUEssTUFBQUEsR0FBRyxFQUFFdUUsV0FERTtBQUVQMEgsTUFBQUEsSUFBSSxFQUFFQTtBQUZDO0FBRkosR0FBUDtBQU9EOztBQUVNLFNBQVNDLGFBQVQsQ0FBdUJDLFFBQXZCLEVBQWlDO0FBQ3RDLFNBQU87QUFDTHpNLElBQUFBLElBQUksRUFBRSxnQkFERDtBQUVMQyxJQUFBQSxPQUFPLEVBQUV3TTtBQUZKLEdBQVA7QUFJRDs7QUFFTSxTQUFTQywyQkFBVCxDQUFxQ2xELE9BQXJDLEVBQThDO0FBQ25ELFNBQU87QUFDTHhKLElBQUFBLElBQUksRUFBRSxnQ0FERDtBQUVMQyxJQUFBQSxPQUFPLEVBQUV1SjtBQUZKLEdBQVA7QUFJRCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBheGlvcyBmcm9tICdheGlvcyc7XG5pbXBvcnQgYXV0aCBmcm9tICdzb2xpZC1hdXRoLWNsaWVudCc7XG5pbXBvcnQganNvbmxkIGZyb20gJ2pzb25sZCc7XG5pbXBvcnQgcXVlcnlzdHJpbmcgZnJvbSAncXVlcnlzdHJpbmcnO1xuaW1wb3J0IHsgdjQgYXMgdXVpZHY0IH0gZnJvbSAndXVpZCc7XG5pbXBvcnQge3ByZWZpeH0gZnJvbSAnLi4vbGlicmFyeS9wcmVmaXhlcy5qcyc7IFxuaW1wb3J0IHtcbiAgQU5OT1RBVElPTl9IQU5ETEVELFxuICBBTk5PVEFUSU9OX05PVF9IQU5ETEVELFxuICBBTk5PVEFUSU9OX1BBVENIRUQsXG4gIEFOTk9UQVRJT05fUE9TVEVELFxuICBBTk5PVEFUSU9OX1NLSVBQRURcbn0gZnJvbSAnLi9tZWxkQWN0aW9ucyc7XG5cbmV4cG9ydCBjb25zdCBTRVRfVFJBVkVSU0FMX09CSkVDVElWRVMgPSBcIlNFVF9UUkFWRVJTQUxfT0JKRUNUSVZFU1wiO1xuZXhwb3J0IGNvbnN0IEFQUExZX1RSQVZFUlNBTF9PQkpFQ1RJVkUgPSBcIkFQUExZX09CSkVDVElWRVwiO1xuZXhwb3J0IGNvbnN0IEhBU19CT0RZID0gXCJvYTpoYXNCb2R5XCI7XG5leHBvcnQgY29uc3QgRkVUQ0hfU0NPUkUgPSAnRkVUQ0hfU0NPUkUnO1xuZXhwb3J0IGNvbnN0IEZFVENIX1JJQkJPTl9DT05URU5UID0gJ0ZFVENIX1JJQkJPTl9DT05URU5UJztcbmV4cG9ydCBjb25zdCBGRVRDSF9DT05DRVBUVUFMX1NDT1JFID0gJ0ZFVENIX0NPTkNFUFRVQUxfU0NPUkUnO1xuZXhwb3J0IGNvbnN0IEZFVENIX1RFSSA9ICdGRVRDSF9URUknO1xuZXhwb3J0IGNvbnN0IEZFVENIX0dSQVBIID0gJ0ZFVENIX0dSQVBIJztcbmV4cG9ydCBjb25zdCBGRVRDSF9HUkFQSF9ET0NVTUVOVCA9ICdGRVRDSF9HUkFQSF9ET0NVTUVOVCc7XG5leHBvcnQgY29uc3QgRkVUQ0hfV09SSyA9ICdGRVRDSF9XT1JLJztcbmV4cG9ydCBjb25zdCBGRVRDSF9UQVJHRVRfRVhQUkVTU0lPTiA9ICdGRVRDSF9UQVJHRVRfRVhQUkVTU0lPTic7XG5leHBvcnQgY29uc3QgRkVUQ0hfQ09NUE9ORU5UX1RBUkdFVCA9ICdGRVRDSF9DT01QT05FTlRfVEFSR0VUJztcbmV4cG9ydCBjb25zdCBQUk9DRVNTX0NPTVBPTkVOVF9UQVJHRVQgPSAnUFJPQ0VTU19DT01QT05FTlRfVEFSR0VUJztcbmV4cG9ydCBjb25zdCBGRVRDSF9TVFJVQ1RVUkUgPSAnRkVUQ0hfU1RSVUNUVVJFJztcbmV4cG9ydCBjb25zdCBGRVRDSF9NQU5JRkVTVEFUSU9OUyA9ICdGRVRDSF9NQU5JRkVTVEFUSU9OUyc7XG5leHBvcnQgY29uc3QgU0NPUkVfUFJFVl9QQUdFID0gJ1NDT1JFX1BSRVZfUEFHRSc7XG5leHBvcnQgY29uc3QgU0NPUkVfTkVYVF9QQUdFID0gJ1NDT1JFX05FWFRfUEFHRSc7XG5leHBvcnQgY29uc3QgU0NPUkVfU0VUX09QVElPTlMgPSAnU0NPUkVfU0VUX09QVElPTlMnO1xuZXhwb3J0IGNvbnN0IFNDT1JFX1BBR0VfVE9fVEFSR0VUID0gJ1NDT1JFX1BBR0VfVE9fVEFSR0VUJztcbmV4cG9ydCBjb25zdCBQUk9DRVNTX0FOTk9UQVRJT04gPSAnUFJPQ0VTU19BTk5PVEFUSU9OJztcbmV4cG9ydCBjb25zdCBTRVNTSU9OX0dSQVBIX0VUQUcgPSAnU0VTU0lPTl9HUkFQSF9FVEFHJztcbmV4cG9ydCBjb25zdCBSRVNFVF9ORVhUX1NFU1NJT05fVFJJR0dFUiA9ICdSRVNFVF9ORVhUX1NFU1NJT05fVFJJR0dFUic7XG5leHBvcnQgY29uc3QgVFJBTlNJVElPTl9UT19ORVhUX1NFU1NJT04gPSAnVFJBTlNJVElPTl9UT19ORVhUX1NFU1NJT04nO1xuZXhwb3J0IGNvbnN0IFJFR0lTVEVSX1BVQkxJU0hFRF9QRVJGT1JNQU5DRV9TQ09SRSA9ICdSRUdJU1RFUl9QVUJMSVNIRURfUEVSRk9STUFOQ0VfU0NPUkUnO1xuZXhwb3J0IGNvbnN0IE1VWklDT0RFU19VUERBVEVEID0gJ01VWklDT0RFU19VUERBVEVEJztcbmV4cG9ydCBjb25zdCBSRUFMSVpBVElPTl9PRiA9ICdmcmJyOnJlYWxpemF0aW9uT2YnO1xuZXhwb3J0IGNvbnN0IEVYUFJFU1NJT04gPSAnZnJicjpFeHByZXNzaW9uJztcbmV4cG9ydCBjb25zdCBQQVJUX09GID0gJ2ZyYnI6cGFydE9mJztcbmV4cG9ydCBjb25zdCBQQVJUID0gJ2ZyYnI6cGFydCc7XG5leHBvcnQgY29uc3QgS0VZID0gJ21vOmtleSc7XG5leHBvcnQgY29uc3QgSEFSTU9OWSA9ICdodHRwczovL21lbGQubGlua2VkbXVzaWMub3JnL2NvbXBhbmlvbi92b2NhYi9oYXJtb255JztcbmV4cG9ydCBjb25zdCBDQURFTkNFID0gJ2h0dHBzOi8vbWVsZC5saW5rZWRtdXNpYy5vcmcvY29tcGFuaW9uL3ZvY2FiL2NhZGVudGlhbEdvYWwnO1xuZXhwb3J0IGNvbnN0IERFR1JFRSA9ICdodHRwczovL21lbGQubGlua2VkbXVzaWMub3JnL2NvbXBhbmlvbi92b2NhYi9oYXNEZWdyZWUnO1xuZXhwb3J0IGNvbnN0IENIT1JEX1RZUEUgPSAnaHR0cHM6Ly9tZWxkLmxpbmtlZG11c2ljLm9yZy9jb21wYW5pb24vdm9jYWIvY2hvcmRUeXBlJztcbmV4cG9ydCBjb25zdCBIQVNfU1RSVUNUVVJFID0gJ2h0dHBzOi8vbWVsZC5saW5rZWRtdXNpYy5vcmcvdGVybXMvaGFzU3RydWN0dXJlJztcbmV4cG9ydCBjb25zdCBTRVEgPSAnaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zI1NlcSc7XG5leHBvcnQgY29uc3QgU0VRUEFSVCA9ICdodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjXyc7XG5leHBvcnQgY29uc3QgU0NPUkUgPSAnaHR0cDovL3B1cmwub3JnL29udG9sb2d5L21vL1Njb3JlJztcbmV4cG9ydCBjb25zdCBDT05UQUlOUyA9ICdodHRwOi8vd3d3LnczLm9yZy9ucy9sZHAjY29udGFpbnMnO1xuZXhwb3J0IGNvbnN0IE1PVElWQVRFRF9CWSA9ICdodHRwOi8vd3d3LnczLm9yZy9ucy9vYSNtb3RpdmF0ZWRCeSc7XG5leHBvcnQgY29uc3QgU0VHTUVOVCA9ICdzbzpTZWdtZW50JztcbmV4cG9ydCBjb25zdCBNVVpJQ09ERSA9ICdtZWxkOk11emljb2RlJztcbmV4cG9ydCBjb25zdCBQVUJMSVNIRURfQVMgPSAnaHR0cDovL3B1cmwub3JnL29udG9sb2d5L21vL3B1Ymxpc2hlZF9hcyc7XG5leHBvcnQgY29uc3QgSEFTX1BFUkZPUk1BTkNFX01FRElVTSA9ICdodHRwOi8vcmRhcmVnaXN0cnkuaW5mby9FbGVtZW50cy9lL3AyMDIxNSc7XG5leHBvcnQgY29uc3QgSEFTX1BJQU5PID0gXCJodHRwOi8vaWQubG9jLmdvdi9hdXRob3JpdGllcy9wZXJmb3JtYW5jZU1lZGl1bXMvMjAxMzAxNTU1MFwiO1xuZXhwb3J0IGNvbnN0IENSRUFURV9TRVNTSU9OID0gXCJDUkVBVEVfU0VTU0lPTlwiO1xuZXhwb3J0IGNvbnN0IFNFU1NJT05fTk9UX0NSRUFURUQgPSBcIlNFU1NJT05fTk9UX0NSRUFURURcIjtcbmV4cG9ydCBjb25zdCBUSUNLID0gXCJUSUNLXCI7XG5leHBvcnQgY29uc3QgVFJBVkVSU0FMX1BSRUhPUCA9IFwiVFJBVkVSU0FMX1BSRUhPUFwiO1xuZXhwb3J0IGNvbnN0IFRSQVZFUlNBTF9IT1AgPSBcIlRSQVZFUlNBTF9IT1BcIjtcbmV4cG9ydCBjb25zdCBUUkFWRVJTQUxfRkFJTEVEID0gXCJUUkFWRVJTQUxfRkFJTEVEXCI7XG5leHBvcnQgY29uc3QgVFJBVkVSU0FMX1VOTkVDQ0VTU0FSWSA9IFwiVFJBVkVSU0FMX1VOTkVDQ0VTU0FSWVwiO1xuZXhwb3J0IGNvbnN0IFRSQVZFUlNBTF9DT05TVFJBSU5FRCA9IFwiVFJBVkVSU0FMX0NPTlNUUkFJTkVEXCI7XG5leHBvcnQgY29uc3QgSUdOT1JFX1RSQVZFUlNBTF9PQkpFQ1RJVkVfQ0hFQ0tfT05fRU1QVFlfR1JBUEggPVwiSUdOT1JFX1RSQVZFUlNBTF9PQkpFQ1RJVkVfQ0hFQ0tfT05fRU1QVFlfR1JBUEhcIjtcbmV4cG9ydCBjb25zdCBSVU5fVFJBVkVSU0FMID0gXCJSVU5fVFJBVkVSU0FMXCI7XG5leHBvcnQgY29uc3QgUkVHSVNURVJfVFJBVkVSU0FMID0gXCJSRUdJU1RFUl9UUkFWRVJTQUxcIjtcbmV4cG9ydCBjb25zdCBVUERBVEVfTEFURVNUX1JFTkRFUkVEX1BBR0VOVU0gPSBcIlVQREFURV9MQVRFU1RfUkVOREVSRURfUEFHRU5VTVwiO1xuXG5leHBvcnQgY29uc3QgbXV6aWNvZGVzVXJpID0gXCJodHRwOi8vMTI3LjAuMC4xOjUwMDAvTVVaSUNPREVTXCI7XG5cbmV4cG9ydCBjb25zdCBNQVhfUkVUUklFUyA9IDM7XG5leHBvcnQgY29uc3QgTUFYX1RSQVZFUlNBTF9IT1BTID0gMTA7XG5leHBvcnQgY29uc3QgUkVUUllfREVMQVkgPSAxMDtcblxuLy8gVE9ETyBtb3ZlIGNvbnRleHQgc29tZXdoZXJlIGdsb2JhbCAtLSBtb3N0IGZyYW1pbmcgaGFwcGVucyBzZXJ2ZXIgc2lkZVxuLy8gYW55d2F5LCBidXQgaW4gY2FzZXMgd2hlcmUgdGhlIGZyYW1lZCBVUkkgY29udGFpbnMgYSBmcmFnbWVudCAoXCIjXCIpLCBcbi8vIHdlIGhhdmUgdG8gZG8gaXQgY2xpZW50LXNpZGVcdFx0XG5jb25zdCBjb250ZXh0ID0ge1xuICBcInBvcFJvbGVzXCI6IFwiaHR0cDovL3BvcC5saW5rZWRtdXNpYy5vcmcvcm9sZXMvXCIsXG4gIFwibW9cIjogXCJodHRwOi8vcHVybC5vcmcvb250b2xvZ3kvbW8vXCIsXG4gIFwibGRwXCI6IFwiaHR0cDovL3d3dy53My5vcmcvbnMvbGRwI1wiLFxuICBcIm1wXCI6IFwiaHR0cDovL2lkLmxvYy5nb3YvYXV0aG9yaXRpZXMvcGVyZm9ybWFuY2VNZWRpdW1zL1wiLFxuICBcIm9hXCI6IFwiaHR0cDovL3d3dy53My5vcmcvbnMvb2EjXCIsXG4gIFwiZnJiclwiOiBcImh0dHA6Ly9wdXJsLm9yZy92b2NhYi9mcmJyL2NvcmUjXCIsXG4gIFwicmRmc1wiOiBcImh0dHA6Ly93d3cudzMub3JnLzIwMDAvMDEvcmRmLXNjaGVtYSNcIixcbiAgXCJtZWxkXCI6IFwiaHR0cHM6Ly9tZWxkLmxpbmtlZG11c2ljLm9yZy90ZXJtcy9cIixcbiAgXCJtb3RpdmF0aW9uXCI6IFwiaHR0cHM6Ly9tZWxkLmxpbmtlZG11c2ljLm9yZy9tb3RpdmF0aW9uL1wiLFxuICBcInNvXCI6IFwiaHR0cDovL3d3dy5saW5rZWRtdXNpYy5vcmcvb250b2xvZ2llcy9zZWdtZW50L1wiLFxuICBcImRjdFwiOiBcImh0dHA6Ly9wdXJsLm9yZy9kYy90ZXJtcy9cIixcbiAgXCJjbGltYlwiOiBcImh0dHA6Ly9tZWxkLmxpbmtlZG11c2ljLm9yZy9jbGltYi90ZXJtcy9cIixcbiAgXCJtY1wiOiBcImh0dHA6Ly9tZWxkLmxpbmtlZG11c2ljLm9yZy9jbGltYi9tdXppY29kZVR5cGVzL1wiXG59O1xuXG5leHBvcnQgZnVuY3Rpb24gZmV0Y2hTY29yZSh1cmwsIG9wdGlvbnMpIHtcbiAgY29uc29sZS5sb2coXCJGRVRDSF9TQ09SRSBBQ1RJT04gb24gVVJJOiBcIiwgdXJsKTtcbiAgcmV0dXJuKGRpc3BhdGNoKSA9PiB7IFxuICAgIGF1dGguZmV0Y2godXJsLCB7bW9kZTogJ2NvcnMnfSlcbiAgICAgIC50aGVuKHJlc3BvbnNlID0+IHtcbiAgICAgICAgcmV0dXJuIHJlc3BvbnNlLnRleHQoKVxuICAgICAgfSlcbiAgICAgIC50aGVuKGRhdGEgPT4ge1xuICAgICAgICBkaXNwYXRjaCh7XG4gICAgICAgICAgdHlwZTogRkVUQ0hfU0NPUkUsXG4gICAgICAgICAgcGF5bG9hZDogeyBcbiAgICAgICAgICAgIGRhdGEsIFxuICAgICAgICAgICAgY29uZmlnOiB7IHVybCwgb3B0aW9ucyB9XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICB9O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZmV0Y2hSaWJib25Db250ZW50KHVybCkge1xuICAvLyBjb25zb2xlLmxvZyhcIkZFVENIX1JJQkJPTl9DT05URU5UIEFDVElPTiBvbiBVUkk6IFwiLCB1cmkpO1xuICBjb25zdCBwcm9taXNlID0gYXV0aC5mZXRjaCh1cmwpO1xuICByZXR1cm4gZGlzcGF0Y2ggPT4geyBcbiAgICBhdXRoLmZldGNoKHVybCwge21vZGU6ICdjb3JzJ30pXG4gICAgICAudGhlbihyZXNwb25zZSA9PiB7XG4gICAgICAgIHJldHVybiByZXNwb25zZS50ZXh0KClcbiAgICAgIH0pXG4gICAgICAudGhlbihkYXRhID0+IHtcbiAgICAgICAgZGlzcGF0Y2goe1xuICAgICAgICAgIHR5cGU6IEZFVENIX1JJQkJPTl9DT05URU5ULFxuICAgICAgICAgIHBheWxvYWQ6IHsgXG4gICAgICAgICAgICBkYXRhLCBcbiAgICAgICAgICAgIGNvbmZpZzogeyB1cmwgfVxuICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgIH0pXG4gIH0vKlxuICByZXR1cm4ge1xuICAgIHR5cGU6IEZFVENIX1JJQkJPTl9DT05URU5ULFxuICAgIHBheWxvYWQ6IHByb21pc2VcbiAgfSovXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBmZXRjaFRFSSh1cmkpIHtcbiAgY29uc3QgcHJvbWlzZSA9IG5ldyBDRVRFSSgpLmdldEhUTUw1KHVyaSk7XG4gIHJldHVybiBkaXNwYXRjaCA9PiB7XG4gICAgcHJvbWlzZS50aGVuKGRhdGEgPT4ge1xuICAgICAgZGlzcGF0Y2goe1xuICAgICAgICB0eXBlOiBGRVRDSF9URUksXG4gICAgICAgIHBheWxvYWQ6IHtcbiAgICAgICAgICBkYXRhOiBkYXRhLFxuICAgICAgICAgIHVyaTogdXJpXG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiByZWdpc3RlclRyYXZlcnNhbChkb2NVcmksIHN1cHBsaWVkUGFyYW1zID0ge30pIHtcbiAgLy8gUFVSUE9TRTpcbiAgLy8gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuICAvLyBUcmF2ZXJzZSB0aHJvdWdoIGEgZ3JhcGgsIGxvb2tpbmcgZm9yIGVudGl0aWVzIG9mIGludGVyZXN0XG4gIC8vICAgKGtleXMgb2YgJ29iamVjdGl2ZXMnKSBhbmQgdW5kZXJ0YWtpbmcgYWN0aW9ucyBpbiByZXNwb25zZVxuICAvLyAgICh2YWx1ZXMgb2YgJ29iamVjdGl2ZXMnKS5cbiAgLy8gRm9yIGVhY2ggc3ViamVjdCwgdHJhdmVyc2UgYWxvbmcgaXRzIHByZWRpY2F0ZXMgdG8gaXRzIGF0dGFjaGVkIG9iamVjdHMsXG4gIC8vICAgdGhlbiByZWN1cnNlIChlYWNoIG9iamVjdCBiZWNvbWVzIHN1YmplY3QgaW4gbmV4dCByb3VuZCkuXG4gIC8vIFdoZW4gcmVjdXJzaW5nLCBjaGVjayBmb3IgaW5zdGFuY2VzIG9mIG9iamVjdC1hcy1zdWJqZWN0IGluIHRoZSBjdXJyZW50XG4gIC8vICAgZmlsZSAodHJhdmVyc2VJbnRlcm5hbCksIEFORCBkbyBhbiBIVFRQIEdFVCB0byByZXNvbHZlIHRoZSBvYmplY3QgVVJJXG4gIC8vICAgYW5kIHJlY3Vyc2UgdGhlcmUgKGV4dGVybmFsIHRyYXZlcnNhbCkuXG4gIC8vIElmIHVzZUV0YWcgaXMgc3BlY2lmaWVkLCB0aGVuIHdvcnJ5IGFib3V0IGV0YWdzIGZvciBleHRlcm5hbCB0cmF2ZXJzYWxzXG4gIC8vIFx0IChhbmQgcmUtcmVxdWVzdCBpZiB0aGUgZmlsZSBoYXMgY2hhbmdlZClcbiAgLy8gXHQgbi5iLiB0aGlzIGlzIG9ubHkgYW4gaXNzdWUgZm9yIGR5bmFtaWMgTUVMRCBkZXBsb3ltZW50c1xuICAvLyBXaXRoIGVhY2ggaG9wLCBkZWNyZW1lbnQgbnVtSG9wcy5cbiAgLy8gU3RvcCB3aGVuIG51bUhvcHMgcmVhY2hlcyB6ZXJvLCBvciB3aGVuIHRoZXJlIGFyZSBubyBtb3JlIG9iamVjdHNcbiAgLy8gICB0byB0cmF2ZXJzZSB0by5cbiAgLy8gSWYgYW4gZXh0ZW5kT2JqZWN0UHJlZml4IGlzIHNwZWNpZmllZCwgb25seSB0cmF2ZXJzZSB0byBvYmplY3RzIHdpdGhcbiAgLy8gIFVSSXMgdGhhdCBzdGFydCB3aXRoIGEgcHJlZml4IGluIHRoZSBsaXN0LlxuICAvLyBJZiBhbiBleHRlbmRPYmplY3RVcmkgaXMgc3BlY2lmaWVkLCBvbmx5IHRyYXZlcnNlIHRvIG9iamVjdHMgd2l0aFxuICAvLyAgVVJJcyBpbiB0aGUgbGlzdC5cbiAgLy8gSWYgYW4gZXh0ZW5kT2JqZWN0VHlwZSBpcyBzcGVjaWZpZWQsIG9ubHkgdHJhdmVyc2UgdG8gb2JqZWN0cyB3aXRoXG4gIC8vICBhIHR5cGUgdGhhdCdzIGluIHRoZSBsaXN0LlxuICAvLyBJZiBhbiBpZ25vcmVPYmplY3RQcmVmaXggaXMgc3BlY2lmaWVkLCBvbmx5IHRyYXZlcnNlIHRvIG9iamVjdHMgd2l0aFxuICAvLyAgVVJJcyB0aGF0IGRvIE5PVCBzdGFydCB3aXRoIGEgcHJlZml4IGluIHRoZSBsaXN0LlxuICAvLyBJZiBhbiBpZ25vcmVPYmplY3RVcmkgaXMgc3BlY2lmaWVkLCBvbmx5IHRyYXZlcnNlIHRvIG9iamVjdHMgd2l0aFxuICAvLyAgVVJJcyB0aGF0IGFyZSBOT1QgaW4gdGhlIGxpc3QuXG4gIC8vIElmIGFuIGlnbm9yZU9iamVjdFR5cGUgaXMgc3BlY2lmaWVkLCBkbyBOT1QgdHJhdmVyc2UgdG8gIG9iamVjdHMgd2l0aFxuICAvLyAgdHlwZXMgaW4gdGhlIGxpc3QuXG4gIC8vIElmIGEgZm9sbG93UHJvcGVydHlQcmVmaXggaXMgc3BlY2lmaWVkLCBvbmx5IHRyYXZlcnNlIHRvIG9iamVjdHMgYWxvbmdcbiAgLy8gIHByb3BlcnRpZXMgd2hvc2UgVVJJcyBzdGFydCB3aXRoIGEgcHJlZml4IGluIHRoZSBsaXN0LlxuICAvLyBJZiBhIGZvbGxvd1Byb3BlcnR5VXJpIGlzIHNwZWNpZmllZCwgb25seSB0cmF2ZXJzZSB0byBvYmplY3RzIGFsb25nXG4gIC8vICBwcm9wZXJ0aWVzIHdpdGggVVJJcyBpbiB0aGUgbGlzdC5cbiAgLy8gSWYgYSBpZ25vcmVQcHJvcGVydHlQcmVmaXggaXMgc3BlY2lmaWVkLCBvbmx5IHRyYXZlcnNlIHRvIG9iamVjdHMgYWxvbmdcbiAgLy8gIHByb3BlcnRpZXMgd2hvc2UgVVJJcyBkbyBOT1Qgc3RhcnQgd2l0aCBhIHByZWZpeCBpbiB0aGUgbGlzdC5cbiAgLy8gSWYgYSBmb2xsb3dQcm9wZXJ0eVVyaSBpcyBzcGVjaWZpZWQsIG9ubHkgdHJhdmVyc2UgdG8gb2JqZWN0cyBhbG9uZ1xuICAvLyAgcHJvcGVydGllcyB3aXRoIFVSSXMgdGhhdCBhcmUgTk9UIGluIHRoZSBsaXN0LlxuICAvLyAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG5cbiAgLy8gY3JlYXRlIG5ldyBwYXJhbXMgb2JqZWN0IHRvIHBhc3Mgb24gaW4gcmVjdXJzaXZlIGNhbGxzXG4gIC8vIG4uYi4gbXVzdCB1cGRhdGUgaGVyZSBpZiBmdW5jdGlvbiBzaWduYXR1cmUgY2hhbmdlcyAtIHRoZVxuICAvLyBwYXJhbXMgb2JqZWN0IGlzIGFsc28gdXNlZCB0byBjaGVjayBzdXBwbGllZCBwYXJhbWV0ZXIgbmFtZXMuXG4gIGNvbnN0IGRlZmF1bHRQYXJhbXMgPSB7XG4gICAgZXh0ZW5kT2JqZWN0UHJlZml4OiBbXSwgZXh0ZW5kT2JqZWN0VXJpOiBbXSwgZXh0ZW5kT2JqZWN0VHlwZTogW10sXG4gICAgaWdub3JlT2JqZWN0UHJlZml4OiBbXSwgaWdub3JlT2JqZWN0VXJpOiBbXSwgaWdub3JlT2JqZWN0VHlwZTogW10sXG4gICAgZm9sbG93UHJvcGVydHlQcmVmaXg6IFtdLCBmb2xsb3dQcm9wZXJ0eVVyaTogW10sXG4gICAgaWdub3JlUHByb3BlcnR5UHJlZml4OiBbXSwgaWdub3JlUHJvcGVydHlVcmk6IFtdLFxuICAgIG9iamVjdGl2ZXM6IHt9LCBudW1Ib3BzOiBNQVhfVFJBVkVSU0FMX0hPUFMsXG4gICAgdXNlRXRhZzogZmFsc2UsIGV0YWc6IFwiXCJcbiAgfTtcbiAgbGV0IHBhcmFtcyA9IHsuLi5kZWZhdWx0UGFyYW1zfSA7XG5cbiAgLy8gQ2hlY2sgZm9yIHVua25vd24gcGFyYW1ldGVyL29wdGlvbiBuYW1lcywgYW5kIGlzc3VlIHdhcm5pbmdzXG4gIHZhciBrZXk7XG4gIGZvciAoa2V5IGluIHN1cHBsaWVkUGFyYW1zKSB7XG4gICAgaWYgKCAhKGtleSBpbiBwYXJhbXMpICkge1xuICAgICAgY29uc29sZS5sb2coXCJyZWdpc3RlclRyYXZlcnNhbDogdW5yZWNvZ25pemVkIG9wdGlvbjogXCIsIGtleSk7XG4gICAgfSBlbHNlIHtcblx0XHRcdHBhcmFtc1trZXldID0gc3VwcGxpZWRQYXJhbXNba2V5XTtcblx0XHR9XG4gIH1cblxuICAvLyBGb3Igb2xkZXIgYXBwIGNvbXBhdGliaWxpdHksIG1hcCBvbGQgcGFyYW1ldGVyIG5hbWVzIHRvIG5ld1xuICBjb25zdCBvbGRQYXJhbXNNYXAgPSBbXG4gICAgWyBcIm9iamVjdFByZWZpeFdoaXRlbGlzdFwiLCAgICBcImV4dGVuZE9iamVjdFByZWZpeFwiICAgIF0sXG4gICAgWyBcIm9iamVjdFVyaVdoaXRlbGlzdFwiLCAgICAgICBcImV4dGVuZE9iamVjdFVyaVwiICAgICAgIF0sXG4gICAgWyBcIm9iamVjdFR5cGVXaGl0ZWxpc3RcIiwgICAgICBcImV4dGVuZE9iamVjdFR5cGVcIiAgICAgIF0sXG4gICAgWyBcIm9iamVjdFByZWZpeEJsYWNrbGlzdFwiLCAgICBcImlnbm9yZU9iamVjdFByZWZpeFwiICAgIF0sXG4gICAgWyBcIm9iamVjdFVyaUJsYWNrbGlzdFwiLCAgICAgICBcImlnbm9yZU9iamVjdFVyaVwiICAgICAgIF0sXG4gICAgWyBcIm9iamVjdFR5cGVCbGFja2xpc3RcIiwgICAgICBcImlnbm9yZU9iamVjdFR5cGVcIiAgICAgIF0sXG4gICAgWyBcInByb3BlcnR5UHJlZml4V2hpdGVsaXN0XCIsICBcImZvbGxvd1Byb3BlcnR5UHJlZml4XCIgIF0sXG4gICAgWyBcInByb3BlcnR5VXJpV2hpdGVsaXN0XCIsICAgICBcImZvbGxvd1Byb3BlcnR5VXJpXCIgICAgIF0sXG4gICAgWyBcInByb3BlcnR5UHJlZml4QmxhY2tsaXN0XCIsICBcImlnbm9yZVByb3BlcnR5UHJlZml4XCIgXSxcbiAgICBbIFwicHJvcGVydHlVcmlCbGFja2xpc3RcIiwgICAgIFwiaWdub3JlUHJvcGVydHlVcmlcIiAgICAgXVxuICBdIDtcbiAgZm9yICggdmFyIGkgaW4gb2xkUGFyYW1zTWFwICkge1xuICAgIHZhciBvbGRrZXkgPSBvbGRQYXJhbXNNYXBbaV1bMF07XG4gICAgdmFyIG5ld2tleSA9IG9sZFBhcmFtc01hcFtpXVsxXTtcbiAgICBpZiAoIChvbGRrZXkgaW4gc3VwcGxpZWRQYXJhbXMpICYmICEobmV3a2V5IGluIHN1cHBsaWVkUGFyYW1zKSApIHtcbiAgICAgIHBhcmFtc1tuZXdrZXldID0gc3VwcGxpZWRQYXJhbXNbb2xka2V5XVxuICAgIH1cbiAgfVxuXG4gIGNvbnN0IHVuaW1wbGVtZW50ZWRQYXJhbXMgPSAoXG4gICAgXCJleHRlbmRPYmplY3RUeXBlXCIsXG4gICAgXCJpZ25vcmVPYmplY3RUeXBlXCIsICAgIFxuICAgIFwiZm9sbG93UHJvcGVydHlQcmVmaXhcIiwgXG4gICAgXCJmb2xsb3dQcm9wZXJ0eVVyaVwiLFxuICAgIFwiaWdub3JlUHJvcGVydHlQcmVmaXhcIixcbiAgICBcImlnbm9yZVByb3BlcnR5VXJpXCJcbiAgICApO1xuICBmb3IgKGtleSBpbiB1bmltcGxlbWVudGVkUGFyYW1zKSB7XG4gICAgaWYgKCAoa2V5IGluIHBhcmFtcykgKSB7XG4gICAgICBjb25zb2xlLmxvZyhcInJlZ2lzdGVyVHJhdmVyc2FsOiB1bmltcGxlbWVudGVkIG9wdGlvbjogXCIsIGtleSk7XG4gICAgfVxuICB9XG5cblx0ZG9jVXJpID0gbmV3IFVSTChkb2NVcmksIGRvY3VtZW50LlVSTCkudG9TdHJpbmcoKTtcbiAgaWYocGFzc2VzVHJhdmVyc2FsQ29uc3RyYWludHMoe1wiQGlkXCI6ZG9jVXJpfSwgcGFyYW1zKSkgeyBcbiAgICByZXR1cm4gKHtcbiAgICAgIHR5cGU6IFJFR0lTVEVSX1RSQVZFUlNBTCxcbiAgICAgIHBheWxvYWQ6IHtkb2NVcmksIHBhcmFtc31cbiAgICB9KVxuICB9IGVsc2UgeyBcbiAgICByZXR1cm4gKHtcbiAgICAgIHR5cGU6IFRSQVZFUlNBTF9DT05TVFJBSU5FRFxuICAgIH0pXG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHRyYXZlcnNlKGRvY1VyaSwgcGFyYW1zKSB7XG4gIC8vIHNldCB1cCBIVFRQIHJlcXVlc3RcbiAgY29uc3QgaGVhZGVycyA9IHsnQWNjZXB0JzogJ2FwcGxpY2F0aW9uL2xkK2pzb24nfTtcbiAgaWYgKHBhcmFtc1tcInVzZUV0YWdcIl0pIHtcbiAgICBoZWFkZXJzWydJZi1Ob25lLU1hdGNoJ10gPSBwYXJhbXNbXCJldGFnXCJdO1xuICB9XG5cbiAgY29uc29sZS5sb2coXCJGRVRDSElORzogXCIsIGRvY1VyaSwgcGFyYW1zKTtcbiAgY29uc3QgcHJvbWlzZSA9IGF1dGguZmV0Y2goZG9jVXJpLCB7XG4gICAgaGVhZGVyczogaGVhZGVycyxcbiAgICBtb2RlOiAnY29ycydcbiAgfSk7XG4gIHJldHVybiAoZGlzcGF0Y2gpID0+IHtcbiAgICBkaXNwYXRjaCh7XG4gICAgICB0eXBlOiBSVU5fVFJBVkVSU0FMLFxuICAgICAgcGF5bG9hZDoge2RvY1VyaX1cbiAgICB9KTtcbiAgICBwcm9taXNlLnRoZW4ocmVzcG9uc2UgPT4ge1xuICAgICAgaWYgKHJlc3BvbnNlLnN0YXR1cyA9PSAzMDQpIHtcbiAgICAgICAgZGlzcGF0Y2goe3R5cGU6IFRSQVZFUlNBTF9VTk5FQ0NFU1NBUll9KTtcbiAgICAgICAgcmV0dXJuOyAvLyBmaWxlIG5vdCBtb2RpZmllZCwgaS5lLiBldGFnIG1hdGNoZWQsIG5vIHVwZGF0ZXMgcmVxdWlyZWRcbiAgICAgIH1cbiAgICAgIGNvbnNvbGUubG9nKHJlc3BvbnNlLmhlYWRlcnMuZ2V0KFwiQ29udGVudC1UeXBlXCIpKTtcbiAgICAgIC8vIGF0dGVtcHQgdG8gZGVjaWRlIGNvbnRlbnQgdHlwZSAoZWl0aGVyIGV4cGxpY2l0bHkgcHJvdmlkZWQgb3IgYnkgZmlsZSBzdWZmaXgpXG4gICAgICAvLyBhbmQgcHJvY2VlZCB3aXRoIHRyYXZlcnNhbCBhY2NvcmRpbmdseVxuICAgICAgaWYgKGRvY1VyaS5lbmRzV2l0aChcIi5qc29uXCIpIHx8IGRvY1VyaS5lbmRzV2l0aChcIi5qc29ubGRcIikgfHwgZG9jVXJpLmVuZHNXaXRoKFwiLmpzb24tbGRcIikgfHxcbiAgICAgICAgICByZXNwb25zZS5oZWFkZXJzLmdldChcIkNvbnRlbnQtVHlwZVwiKS5zdGFydHNXaXRoKFwiYXBwbGljYXRpb24vbGQranNvblwiKSB8fFxuICAgICAgICAgIHJlc3BvbnNlLmhlYWRlcnMuZ2V0KFwiQ29udGVudC1UeXBlXCIpLnN0YXJ0c1dpdGgoXCJhcHBsaWNhdGlvbi9qc29uXCIpKSB7XG4gICAgICAgIC8vIHRyZWF0IGFzIEpTT04tTEQgZG9jdW1lbnRcbiAgICAgICAgZGlzcGF0Y2godHJhdmVyc2VKU09OTEQoZGlzcGF0Y2gsIGRvY1VyaSwgcGFyYW1zLCByZXNwb25zZS5qc29uKCkpKTtcbiAgICAgIH0gZWxzZSBpZiAoZG9jVXJpLmVuZHNXaXRoKFwiLnR0bFwiKSB8fCBkb2NVcmkuZW5kc1dpdGgoXCIubjNcIikgfHwgZG9jVXJpLmVuZHNXaXRoKFwiLnJkZlwiKSB8fFxuICAgICAgICAgIGRvY1VyaS5lbmRzV2l0aChcIi5udFwiKSB8fFxuICAgICAgICAgIHJlc3BvbnNlLmhlYWRlcnMuZ2V0KFwiQ29udGVudC1UeXBlXCIpLnN0YXJ0c1dpdGgoXCJhcHBsaWNhdGlvbi9yZGYreG1sXCIpIHx8XG4gICAgICAgICAgcmVzcG9uc2UuaGVhZGVycy5nZXQoXCJDb250ZW50LVR5cGVcIikuc3RhcnRzV2l0aChcImFwcGxpY2F0aW9uL3gtdHVydGxlXCIpIHx8XG4gICAgICAgICAgcmVzcG9uc2UuaGVhZGVycy5nZXQoXCJDb250ZW50LVR5cGVcIikuc3RhcnRzV2l0aChcInRleHQvdHVydGxlXCIpKSB7XG4gICAgICAgIC8vIHRyZWF0IGFzIFJERiBkb2N1bWVudFxuICAgICAgICAvLyBUT0RPOiBUcmFuc2xhdGUgUkRGIHRvIEpTT04tTEQsIHRoZW4gcHJvY2VlZCB3aXRoIHRyYXZlcnNlSlNPTkxEIGFzIGFib3ZlXG4gICAgICAgIGRpc3BhdGNoKHt0eXBlOiBUUkFWRVJTQUxfRkFJTEVEfSk7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiQ2FuJ3QgaGFuZGxlIHRoaXMgZG9jdW1lbnQ6IChXZSBjdXJyZW50bHkgb25seSBzdXBwb3J0IG5xIGFuZCBKU09OLUxEKVwiLCBkb2NVcmksIHJlc3BvbnNlKVxuXHRcdFx0XHQvLyBkaXNwYXRjaCh0cmF2ZXJzZVJERihkaXNwYXRjaCwgZG9jVXJpLCBwYXJhbXMsIHJlc3BvbnNlLnRleHQoKSkpO1xuXHRcdFx0fSBlbHNlIGlmIChkb2NVcmkuZW5kc1dpdGgoXCIubnFcIikgfHwgXG5cdFx0XHRcdFx0XHRcdFx0IHJlc3BvbnNlLmhlYWRlcnMuZ2V0KFwiQ29udGVudC1UeXBlXCIpLnN0YXJ0c1dpdGgoXCJhcHBsaWNhdGlvbi9ucXVhZHNcIikpIHtcblx0XHRcdFx0ZGlzcGF0Y2godHJhdmVyc2VSREYoZGlzcGF0Y2gsIGRvY1VyaSwgcGFyYW1zLCByZXNwb25zZS50ZXh0KCkpKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGRpc3BhdGNoKHt0eXBlOiBUUkFWRVJTQUxfRkFJTEVEfSk7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiRG9uJ3Qga25vdyBob3cgdG8gdHJlYXQgdGhpcyBkb2N1bWVudDogXCIsIGRvY1VyaSwgcmVzcG9uc2UpXG4gICAgICB9XG4gICAgICAvLyBhcHByb3ByaWF0ZWx5IGhhbmRsZSBjb250ZW50IHR5cGVzXG4gICAgICAvL1x0XHRcdGlmKGlzUkRGKHJlc3BvbnNlLmhlYWRlcnMuZ2V0KFwiQ29udGVudC1UeXBlXCIpKSkge1xuICAgICAgLy9cdFx0XHRcdHRvTlF1YWRzKFxuICAgICAgLy9cdFx0XHRcdFx0XG4gICAgICAvL1x0XHRcdH1cbiAgICAgIC8vXHRcdFx0c3dpdGNoKHJlc3BvbnNlLmhlYWRlcnMuZ2V0KFwiQ29udGVudC1UeXBlXCIpKSB7XG4gICAgICAvL1x0XHRcdFx0Ly8gSWYgd2UgYXJlIHdvcmtpbmcgd2l0aCBSREYsIHdlIG5lZWQgdG8gY29udmVydCBpdCB0byBKU09OLUxELlxuICAgICAgLy9cdFx0XHRcdC8vIFVuZm9ydHVuYXRlbHkganNvbmxkLmpzIG9ubHkgcmVhZHMgbnF1YWRzLlxuICAgICAgLy9cdFx0XHRcdC8vIFRodXMsIGNvbnZlcnQgbm9uLW5xdWFkIFJERiBmb3JtYXRzIHRvIG5xdWFkIGZpcnN0XG4gICAgICAvL1x0XHRcdFx0Y2FzZSBcInRleHQvdHVydGxlXCI6XG4gICAgICAvL1x0XHRcdFx0Y2FzZSBcImFwcGxpY2F0aW9uL3RyaWdcIjpcbiAgICAgIC8vXHRcdFx0XHRjYXNlIFwiYXBwbGljYXRpb24vbi10cmlwbGVzXCI6XG4gICAgICAvL1x0XHRcdFx0Y2FzZSBcInRleHQvbjNcIjpcbiAgICAgIC8vXG4gICAgfSkuY2F0Y2goZXJyID0+IHtcbiAgICAgIGRpc3BhdGNoKHt0eXBlOiBUUkFWRVJTQUxfRkFJTEVEfSk7XG4gICAgICBjb25zb2xlLmxvZyhcIkNvdWxkIG5vdCByZXRyaWV2ZSBcIiwgZG9jVXJpLCBlcnIpO1xuICAgIH0pO1xuICAgIHJldHVybiB7dHlwZTogVFJBVkVSU0FMX1BSRUhPUH07XG4gIH1cbn1cblxuXG4vL2hlbHBlciBmdW5jdGlvbjogXG4vLyBza29sZW1pemUgYmxhbmsgbm9kZXMgdG8gcHJldmVudCBpZGVudGlmaWVyIGNsYXNoZXMgYmV0d2VlbiBkb2N1bWVudHNcbi8vIGJ5IGRldGVjdGluZyBcIl86PGJsYW5rLW5vZGUtaWRlbnRpZmllcj5cIlxuLy8gYW5kIHJlcGxhY2luZyB3aXRoIGRvY3VtZW50IHVyaSBhcHBlbmRlZCB3aXRoICAvZ2VuaWQvPGJsYW5rLW5vZGUtaWRlbnRpZmllcj4gXG4vLyBieSB2aXJ0dWUgb2YgdHJhdmVyc2FsIG1lY2hhbmlzbSwgd2Ugb25seSBldmVyIHZpc2l0IGVhY2ggZG9jdW1lbnQgb25jZSwgXG4vLyBzbyBjbGFzaGVzIHdpdGggdGhlIHNhbWUgZG9jdW1lbnQgc2hvdWxkIG5vdCBvY2N1ci5cbmZ1bmN0aW9uIHNrb2xlbWl6ZShvYmosIGRvY1VyaSkge1xuICBpZiAoQXJyYXkuaXNBcnJheShvYmopKSB7XG4gICAgLy8gaWYgZmVkIGFuIGFycmF5LCByZWN1ciBvbiBlYWNoIGNvbnN0aXR1dGVudFxuICAgIG9iaiA9IG9iai5tYXAobyA9PiBza29sZW1pemUobywgZG9jVXJpKSk7XG4gIH0gZWxzZSBpZiAob2JqID09PSBPYmplY3Qob2JqKSkge1xuICAgIC8vIGlmIGZlZCBhbiBvYmplY3QsIGl0ZXJhdGUgb3ZlciBlYWNoIGtleVxuICAgIE9iamVjdC5rZXlzKG9iaikubWFwKGsgPT4ge1xuICAgICAgaWYgKGsgPT09IFwiQGlkXCIpIHtcbiAgICAgICAgLy8gZm91bmQgYW4gQGlkLCBjaGVjayBmb3IgYmxhbmsgbm9kZSBhbmQgc2tvbGVtaXplIGlmIG5lY2Vzc3NhcnlcbiAgICAgICAgb2JqW1wiQGlkXCJdID0gb2JqW1wiQGlkXCJdLnJlcGxhY2UoXCJfOlwiLCBkb2NVcmkgKyBcIiNnZW5pZC1cIik7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyByZWN1ciBvbiB2YWx1ZVxuICAgICAgICBvYmpba10gPSBza29sZW1pemUob2JqW2tdLCBkb2NVcmkpO1xuICAgICAgfVxuICAgIH0pXG4gIH1cbiAgcmV0dXJuIG9iajtcbn1cblxuXG5mdW5jdGlvbiB0cmF2ZXJzZVJERihkaXNwYXRjaCwgZG9jVXJpLCBwYXJhbXMsIGRhdGFQcm9taXNlKXtcbiAgY29uc29sZS5sb2coXCJpbiB0cmF2ZXJzZVJERiBmb3IgZG9jIFwiLCBkb2NVcmksIFwid2l0aCBleGNsdWRlIGxpc3QgXCIsIHBhcmFtc1tcImlnbm9yZU9iamVjdFVyaVwiXSk7XG5cdC8vIGV4cGFuZCB0aGUgSlNPTi1MRCBvYmplY3Qgc28gdGhhdCB3ZSBhcmUgd29ya2luZyB3aXRoIGZ1bGwgVVJJcywgbm90IGNvbXBhY3RlZCBpbnRvIHByZWZpeGVzXG4gIGRhdGFQcm9taXNlLnRoZW4oZGF0YSA9PiB7XG5cdFx0ZGlzcGF0Y2godHJhdmVyc2VKU09OTEQoZGlzcGF0Y2gsIGRvY1VyaSwgcGFyYW1zLCBqc29ubGQuZnJvbVJERihkYXRhKSkpO1xuXHR9KS5jYXRjaChlcnIgPT4gY29uc29sZS5lcnJvcihlcnIpKTtcblx0cmV0dXJuIHt0eXBlOiBUUkFWRVJTQUxfSE9QfVxufVxuXG5mdW5jdGlvbiB0cmF2ZXJzZUpTT05MRChkaXNwYXRjaCwgZG9jVXJpLCBwYXJhbXMsIGRhdGFQcm9taXNlKSB7XG5cdGNvbnNvbGUubG9nKFwiaW4gdHJhdmVyc2VKU09OTEQgZm9yIGRvYyBcIiwgZG9jVXJpLCBcIndpdGggZXhjbHVkZSBsaXN0IFwiLCBwYXJhbXNbXCJpZ25vcmVPYmplY3RVcmlcIl0pO1xuICAvLyBleHBhbmQgdGhlIEpTT04tTEQgb2JqZWN0IHNvIHRoYXQgd2UgYXJlIHdvcmtpbmcgd2l0aCBmdWxsIFVSSXMsIG5vdCBjb21wYWN0ZWQgaW50byBwcmVmaXhlc1xuICBkYXRhUHJvbWlzZS50aGVuKGRhdGEgPT4ge1xuICAgIGNvbnNvbGUubG9nKFwiYXR0ZW1wdGluZyB0byBleHBhbmQ6IFwiLCBkYXRhKTtcblx0XHRqc29ubGQuZXhwYW5kKGRhdGEpLnRoZW4oZXhwYW5kZWQgPT4ge1xuICAgICAgY29uc29sZS5sb2coXCJHb3QgZXhwYW5kZWQganNvbjogXCIsIGV4cGFuZGVkKTtcbiAgICAgIC8vIGZsYXR0ZW4gdGhlIGV4cGFuZGVkIEpTT04tTEQgb2JqZWN0IHNvIHRoYXQgZWFjaCBkZXNjcmliZWQgZW50aXR5IGhhcyBhbiBJRCBhdCB0aGUgdG9wLWxldmVsIG9mIHRoZSB0cmVlXG4gICAgICBqc29ubGQuZmxhdHRlbihleHBhbmRlZCkudGhlbihmbGF0dGVuZWQgPT4ge1xuICAgICAgICBjb25zdCBza29sZW1pemVkID0gc2tvbGVtaXplKGZsYXR0ZW5lZCwgZG9jVXJpKTtcbiAgICAgICAgZGlzcGF0Y2goe1xuICAgICAgICAgIHR5cGU6IEZFVENIX0dSQVBIX0RPQ1VNRU5ULFxuICAgICAgICAgIHBheWxvYWQ6ICB7IFxuICAgICAgICAgICAgZGF0YTogc2tvbGVtaXplZCxcbiAgICAgICAgICAgIHVyaTogZG9jVXJpXG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgLy8gY29udmVydCB0aGUgZmxhdHRlbmVkIGFycmF5IG9mIEpTT04tTEQgc3RydWN0dXJlcyBpbnRvIGEgbG9va3VwIHRhYmxlIHVzaW5nIGVhY2ggZW50aXR5J3MgVVJJIChcIkBpZFwiKVxuICAgICAgICBsZXQgaWRMb29rdXAgPSB7fTtcbiAgICAgICAgT2JqZWN0LmVudHJpZXMoc2tvbGVtaXplZCkuZm9yRWFjaCgoW2tleSwgdmFsdWVdKSA9PiB7XG4gICAgICAgICAgaWRMb29rdXBbdmFsdWVbXCJAaWRcIl1dID0gdmFsdWU7XG4gICAgICAgIH0pO1xuICAgICAgICBPYmplY3QuZW50cmllcyhpZExvb2t1cCkuZm9yRWFjaCgoW3N1YmplY3RVcmksIHN1YmplY3REZXNjcmlwdGlvbl0pID0+IHtcbiAgICAgICAgICAvLyBpdGVyYXRpbmcgdGhyb3VnaCBlYWNoIGVudGl0eSB3aXRoaW4gdGhlIGRvY3VtZW50IGFzIHRoZSBzdWJqZWN0LFxuICAgICAgICAgIC8vIGxvb2sgYXQgaXRzIGRlc2NyaXB0aW9uIChzZXQgb2YgcHJlZGljYXRlLW9iamVjdCB0dXBsZXMpLlxuICAgICAgICAgIE9iamVjdC5lbnRyaWVzKHN1YmplY3REZXNjcmlwdGlvbikuZm9yRWFjaCgoW3ByZWQsIG9ianNdKSA9PiB7XG4gICAgICAgICAgICAvLyBiZWNhdXNlIEpTT04tTEQsIG9ianMgY291bGQgYmUgYSBzaW5nbGUgb2JqZWN0IG9yIGFuIGFycmF5IG9mIG9iamVjdHNcbiAgICAgICAgICAgIC8vIHRoZXJlZm9yZSwgZW5zdXJlIGNvbnNpc3RlbmN5OlxuICAgICAgICAgICAgb2JqcyA9IEFycmF5LmlzQXJyYXkob2JqcykgPyBvYmpzIDogW29ianNdO1xuICAgICAgICAgICAgb2Jqcy5tYXAoKG9iaikgPT4ge1xuICAgICAgICAgICAgICBpZiAob2JqID09PSBPYmplY3Qob2JqKSkge1xuICAgICAgICAgICAgICAgIC8vIG91ciAqUkRGKiBvYmplY3QgaXMgYSAqSkFWQVNDUklQVCogb2JqZWN0XG4gICAgICAgICAgICAgICAgLy8gYnV0IGJlY2F1c2Ugd2UndmUgZmxhdHRlbmVkIG91ciBkb2N1bWVudCwgd2Uga25vdyB0aGF0IGl0IHdpbGwgY29udGFpbiBvbmx5IGFuIEBpZFxuICAgICAgICAgICAgICAgIC8vIGFuZCB0aGF0IGFsbCBvZiBpdHMgb3RoZXIgZGVzY3JpcHRvcnMgd2lsbCBiZSBhc3NvY2lhdGVkIHdpdGggdGhhdCBAaWQgYXQgdGhlIHRvcC1sZXZlbFxuICAgICAgICAgICAgICAgIC8vICh3aGljaCB3ZSB3aWxsIGhhbmRsZSBpbiBhbm90aGVyIGl0ZXJhdGlvbilcbiAgICAgICAgICAgICAgICAvLyBDSEVDSyBGT1IgT0JKRUNUSVZFUyBIRVJFXG4gICAgICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhcIjw+XCIsIHN1YmplY3RVcmksIHByZWQsIG9ialtcIkBpZFwiXSwgZG9jVXJpKTtcbiAgICAgICAgICAgICAgICAvLyBOb3cgcmVjdXJzZSAoaWYgZXhjbHVzaW9uL2luY2x1c2lvbiBjb25kaXRpb25zIGFuZCBob3AgY291bnRlciBhbGxvdylcbiAgICAgICAgICAgICAgICBpZiAocGFzc2VzVHJhdmVyc2FsQ29uc3RyYWludHMob2JqLCBwYXJhbXMpKSB7XG4vLyAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwicmVnaXN0ZXJpbmcgbmV4dCB0cmF2ZXJzYWwhXCIsIG9ialtcIkBpZFwiXSlcbiAgICAgICAgICAgICAgICAgIGRpc3BhdGNoKHJlZ2lzdGVyVHJhdmVyc2FsKG9ialtcIkBpZFwiXSwge1xuICAgICAgICAgICAgICAgICAgICAuLi5wYXJhbXMsXG4gICAgICAgICAgICAgICAgICAgIC8vIFJlbWVtYmVyIHRoYXQgd2UndmUgYWxyZWFkeSB2aXNpdGVkIHRoZSBjdXJyZW50IGRvY3VtZW50IHRvIGF2b2lkIGxvb3BzXG4gICAgICAgICAgICAgICAgICAgIFwiaWdub3JlT2JqZWN0VXJpXCI6IHBhcmFtc1tcImlnbm9yZU9iamVjdFVyaVwiXS5jb25jYXQoZG9jVXJpLnNwbGl0KFwiI1wiKVswXSksXG4gICAgICAgICAgICAgICAgICAgIFwibnVtSG9wc1wiOiBwYXJhbXNbXCJudW1Ib3BzXCJdIC0gMVxuICAgICAgICAgICAgICAgICAgfSkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAvLyBvdXIgKlJERiogb2JqZWN0IGlzIGEgbGl0ZXJhbFxuICAgICAgICAgICAgICAgIC8vIG4uYi4gZXhjZXB0aW9ucyB3aGVyZSBwcmVkIGlzIEB0eXBlLCBAaWQsIGV0Yy4gVGhlcmUsIHRoZSBvYmogaXMgc3RpbGwgYSBVUkksIG5vdCBhIGxpdGVyYWxcbiAgICAgICAgICAgICAgICAvLyBDb3VsZCB0ZXN0IGZvciB0aG9zZSBleHBsaWNpdGx5IGhlcmUuXG5cdFx0XHRcdFx0XHRcdFx0Ly8gQ0hFQ0sgRk9SIE9CSkVDVElWRVMgSEVSRVxuXHRcdFx0XHRcdFx0XHRcdC8vXHRjb25zb2xlLmxvZyhcInx8XCIsIHN1YmplY3RVcmksIHByZWQsIG9iaiwgZG9jVXJpKVxuXHRcdFx0XHRcdFx0XHRcdFxuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHR9KTtcblx0XHRcdFx0XHR9KVxuXHRcdFx0XHR9KTtcbiAgICAgIH0pO1xuICAgIH0pLmNhdGNoKGVycm9yPT5jb25zb2xlLmxvZyhcIkVYUEFOU0lPTiBFUlJPUjogXCIsIGRvY1VyaSwgZXJyKSk7XG4gIH0pO1xuICByZXR1cm4ge3R5cGU6IFRSQVZFUlNBTF9IT1B9XG59XG5cbmZ1bmN0aW9uIHBhc3Nlc1RyYXZlcnNhbENvbnN0cmFpbnRzKG9iaiwgcGFyYW1zKSB7XG4gIC8vIGZpbHRlciBmdW5jdGlvbiB0aGF0IHJldHVybnMgVFJVRSBpZiB1cmkgc2hvdWxkIGJlIHRyYXZlcnNlZCB0b1xuICAvLyAod2l0aCBhIGdpdmVuIHNldCBvZiBjb25zdHJhaW50cyBpbiB0aGUgcGFyYW1zKVxuICAvL1xuICAvLyB0ZXN0OiBlbnN1cmUgd2UgaGF2ZW4ndCBydW4gb3V0IG9mIGhvcHNcbiAgaWYgKHBhcmFtc1tcIm51bUhvcHNcIl0gPT09IDApIHtcbiAgICAvL2NvbnNvbGUubG9nKFwiVGVzdCAxOiBPdXQgb2YgaG9wc1wiLCBvYmosIHBhcmFtcylcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICAvLyB0ZXN0OiBlbnN1cmUgb2JqIGlzIG5vdCBhIGxpdGVyYWxcbiAgaWYgKCEoXCJAaWRcIiBpbiBvYmopKSB7XG4gICAvLyAvLy8vY29uc29sZS5sb2coXCJUZXN0IDI6IEZvdW5kIGEgbGl0ZXJhbFwiLCBvYmosIHBhcmFtcylcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBjb25zdCByZXNvdXJjZVVyaSA9IG9ialtcIkBpZFwiXS5zcGxpdChcIiNcIilbMF07IC8vIGRvbid0IHRyYXZlcnNlIGZyYWdtZW50cyBvZiBhbiBleGNsdWRlZCByZXNvdXJjZS4uLlxuXG4gIC8vIHRlc3Q6IG9iamVjdCBVUkkgZG9lc24ndCB2aW9sYXRlIGNvbnN0cmFpbnRzXG4gIGlmIChwYXJhbXNbXCJleHRlbmRPYmplY3RVcmlcIl0ubGVuZ3RoKSB7XG4gICAgLy8gVVJJIGluY2x1c2lvbiBsaXN0IHNwZWNpZmllZDpcbiAgICAvLyBvbmx5IHBhc3MgaWYgaW5jbHVkZWQgaW4gVVJJIGluY2x1c2lvbiBsaXN0IEFORCBub3QgaW4gVVJJIGV4Y2x1c2lvbiBsaXN0XG4gICAgaWYgKCFwYXJhbXNbXCJleHRlbmRPYmplY3RVcmlcIl0uaW5jbHVkZXMocmVzb3VyY2VVcmkpIHx8XG4gICAgICAgIHBhcmFtc1tcImlnbm9yZU9iamVjdFVyaVwiXS5pbmNsdWRlcyhyZXNvdXJjZVVyaSkpIHtcbiAgICAgIC8vY29uc29sZS5sb2coXCJUZXN0IDM6IG9iamVjdCBleGNsdWRlZCAoYW5kIG5vdCBpbiBpbmNsdXNpb24gbGlzdClcIiwgb2JqLCBwYXJhbXMpXG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIC8vIG5vIFVSSSBpbmNsdXNpb24gbGlzdFxuICAgIC8vIG9ubHkgcGFzcyBpZiBub3QgaW4gVVJJIGV4Y2x1c2lvbiBsaXN0XG4gICAgaWYgKHBhcmFtc1tcImlnbm9yZU9iamVjdFVyaVwiXS5pbmNsdWRlcyhyZXNvdXJjZVVyaSkpIHtcbiAgICAgIC8vY29uc29sZS5sb2coXCJUZXN0IDQ6IG9iamVjdCBleGNsdWRlZCAod2l0aG91dCBpbmNsdXNpb24gbGlzdClcIiwgb2JqLCBwYXJhbXMpXG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICB9XG5cbiAgLy8gdGVzdDogb2JqZWN0IFVSSSBkb2Vzbid0IHZpb2xhdGUgUFJFRklYIGNvbnN0cmFpbnRzXG4gIGNvbnN0IHByZWZpeEV4Y2x1ZGVkID0gcGFyYW1zW1wiaWdub3JlT2JqZWN0UHJlZml4XCJdLmZpbHRlcihwcmUgPT4ge1xuICAgIHJldHVybiByZXNvdXJjZVVyaS5zdGFydHNXaXRoKHByZS5zcGxpdChcIiNcIilbMF0pO1xuICB9KTtcbiAgLy8gb25seSBwYXNzIGlmIHByZWZpeCBub3QgZXhjbHVkZWRcbiAgaWYgKHByZWZpeEV4Y2x1ZGVkLmxlbmd0aCkge1xuICAgIC8vY29uc29sZS5sb2coXCJUZXN0IDU6IHByZWZpeCBleGNsdWRlZFwiLCBvYmosIHBhcmFtcylcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgaWYgKHBhcmFtc1tcImV4dGVuZE9iamVjdFByZWZpeFwiXS5sZW5ndGgpIHtcbiAgICAvLyBQcmVmaXggaW5jbHVzaW9uIGxpc3Qgc3BlY2lmaWVkOlxuICAgIGNvbnN0IHByZWZpeEluY2x1ZGVkID0gcGFyYW1zW1wiZXh0ZW5kT2JqZWN0UHJlZml4XCJdLmZpbHRlcihwcmUgPT4ge1xuICAgICAgcmV0dXJuIHJlc291cmNlVXJpLnN0YXJ0c1dpdGgocHJlKTtcbiAgICB9KTtcbiAgICAvLyBvbmx5IHBhc3MgaWYgaW5jbHVkZWQgaW4gcHJlZml4IGluY2x1c2lvbiBsaXN0XG4gICAgaWYgKHByZWZpeEluY2x1ZGVkLmxlbmd0aCA9PT0gMCkge1xuICAgICAgLy9jb25zb2xlLmxvZyhcIlRlc3QgNjogcHJlZml4IG5vdCBpbiBzcGVjaWZpZWQgaW5jbHVzaW9uIGxpc3RcIiwgb2JqLCBwYXJhbXMpXG4gICAgICByZXR1cm4gZmFsc2VcbiAgICB9XG4gIH1cbiAgLy9jb25zb2xlLmxvZyhcIk9iamVjdCBwYXNzZXMgYWxsIHRyYXZlcnNhbCBjb25zdHJhaW50IHRlc3RzXCIsIG9iaiwgcGFyYW1zLCBwYXJhbXNbXCJleHRlbmRPYmplY3RQcmVmaXhcIl0sIHBhcmFtc1tcImlnbm9yZU9iamVjdFByZWZpeFwiXSwgcGFyYW1zW1wiaWdub3JlT2JqZWN0VXJpXCJdKTtcbiAgcmV0dXJuIHRydWU7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjaGVja1RyYXZlcnNhbE9iamVjdGl2ZXMoZ3JhcGgsIG9iamVjdGl2ZXMpIHtcbiAgLy8gY2hlY2sgYSBnaXZlbiBqc29uLWxkIHN0cnVjdHVyZSBhZ2FpbnN0IGEgc2V0IG9mIG9iamVjdGl2ZXMgKGpzb24tbGQgZnJhbWVzKVxuICBpZiAoZ3JhcGgubGVuZ3RoKSB7XG4gICAgcmV0dXJuIGRpc3BhdGNoID0+IHtcbiAgICAgIGxldCBmcmFtaW5nUHJvbWlzZXMgPSBbXTtcbiAgICAgIG9iamVjdGl2ZXMuZm9yRWFjaCggKG9iaikgPT4ge1xuICAgICAgICBmcmFtaW5nUHJvbWlzZXMucHVzaChqc29ubGQuZnJhbWUoZ3JhcGgsIG9iaikpXG4gICAgICB9KVxuICAgICAgUHJvbWlzZS5hbGxTZXR0bGVkKGZyYW1pbmdQcm9taXNlcykudGhlbiggKGZyYW1lZFJlc29sdmVkKSA9PiAge1xuICAgICAgICBmcmFtZWRSZXNvbHZlZC5mb3JFYWNoKCAocmVzb2x2ZWRGcmFtZSwgaXgpID0+IHtcbiAgICAgICAgICBjb25zdCBmcmFtZWQgPSByZXNvbHZlZEZyYW1lW1widmFsdWVcIl07XG4gICAgICAgICAgZGlzcGF0Y2goe1xuICAgICAgICAgICAgdHlwZTogQVBQTFlfVFJBVkVSU0FMX09CSkVDVElWRSxcbiAgICAgICAgICAgIHBheWxvYWQ6IHtcbiAgICAgICAgICAgICAgaXgsXG4gICAgICAgICAgICAgIGZyYW1lZFxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pXG4gICAgICAgIH0pXG4gICAgICB9KVxuICAgIH1cbiAgfSBlbHNlIHtcbiAgICByZXR1cm4ge1xuICAgICAgdHlwZTogSUdOT1JFX1RSQVZFUlNBTF9PQkpFQ1RJVkVfQ0hFQ0tfT05fRU1QVFlfR1JBUEhcbiAgICB9O1xuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzZXRUcmF2ZXJzYWxPYmplY3RpdmVzKG9iamVjdGl2ZXMpIHtcbiAgcmV0dXJuIHtcbiAgICB0eXBlOiBTRVRfVFJBVkVSU0FMX09CSkVDVElWRVMsXG4gICAgcGF5bG9hZDogb2JqZWN0aXZlc1xuICB9XG59XG5cblxuZXhwb3J0IGZ1bmN0aW9uIGZldGNoU2Vzc2lvbkdyYXBoKHVyaSwgZXRhZyA9IFwiXCIpIHtcbiAgY29uc29sZS53YXJuKFwiREVQUkVDQVRJT04gV0FSTklORzogVGhlIGZ1bmN0aW9uIGZldGNoU2Vzc2lvbkdyYXBoIGlzIGNvbnNpZGVyZWQgZGVwcmVjYXRlZCBhcyBvZiBtZWxkLWNsaWVudHMtY29yZSB2Mi4wLjAgYW5kIHdpbGwgYmUgc3ViamVjdCB0byByZW1vdmFsIGluIGZ1dHVyZSB2ZXJzaW9ucy4gUGxlYXNlIHVwZ3JhZGUgeW91ciBhcHBsaWNhdGlvbiB0byB1c2UgdGhlIHJlZ2lzdGVyVHJhdmVyc2FsIGFuZCB0cmF2ZXJzZSBmdW5jdGlvbnMgaW5zdGVhZC5cIik7XG4gIC8vIGNvbnNvbGUubG9nKFwiRkVUQ0hfU0VTU0lPTl9HUkFQSCBBQ1RJT04gT04gVVJJOiBcIiwgdXJpLCBcIiB3aXRoIGV0YWc6IFwiLCBldGFnKTtcbiAgLy8gVE9ETyBhZGQgZXRhZyB0byBoZWFkZXIgYXMgSWYtTm9uZS1NYXRjaCBhbmQgZW5hYmxlIGNvcnJlc3BvbmRpbmcgc3VwcG9ydCBvbiBzZXJ2ZXJcbiAgLy8gc28gdGhhdCBpdCBjYW4gcmVzcG9uZCB3aXRoIDMwNCBpbnN0ZWFkIG9mIDIwMCAoaS5lLiBzbyBpdCBjYW4gb21taXQgZmlsZSBib2R5KVxuICBjb25zdCBwcm9taXNlID0gYXV0aC5mZXRjaCh1cmksIHtcbiAgICBoZWFkZXJzOiB7J0FjY2VwdCc6ICdhcHBsaWNhdGlvbi9sZCtqc29uJywgJ0lmLU5vbmUtTWF0Y2gnOiBldGFnfSxcbiAgICBtb2RlOiAnY29ycydcbiAgfSk7XG5cbiAgcmV0dXJuIChkaXNwYXRjaCkgPT4ge1xuICAgIHByb21pc2UudGhlbigocmVzcG9uc2UpID0+IHtcbiAgICAgIGlmIChyZXNwb25zZS5zdGF0dXMgPT0gMzA0KSB7XG4gICAgICAgIHJldHVybjsgLy8gZG9uJ3QgbmVlZCB0byBkbyBhbnkgbmV3IHdvcmtcbiAgICAgIH1cbiAgICAgIGNvbnN0IGZyYW1lZCA9IHJlc3BvbnNlLmRhdGE7XG4gICAgICBjb25zdCBzZXNzaW9uID0gZnJhbWVkW1wiQGdyYXBoXCJdWzBdO1xuICAgICAgaWYgKCFldGFnKSB7XG4gICAgICAgIC8vIGZpcnN0IHRpbWUgdGhyb3VnaDogZm9sbG93IHlvdXIgbm9zZSBhbG9uZyB0aGUgY29uY2VwdHVhbCBzY29yZVxuICAgICAgICAvLyB0byByZXRyaWV2ZSB0aGUgcHVibGlzaGVkIHNjb3JlIChNRUkgZmlsZSlcbiAgICAgICAgaWYgKFwibW86cGVyZm9ybWFuY2Vfb2ZcIiBpbiBzZXNzaW9uKSB7XG4gICAgICAgICAgZGlzcGF0Y2goZmV0Y2hDb25jZXB0dWFsU2NvcmUoc2Vzc2lvbltcIkBpZFwiXSwgc2Vzc2lvbltcIm1vOnBlcmZvcm1hbmNlX29mXCJdW1wiQGlkXCJdKSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgY29uc29sZS5sb2coXCJTRVNTSU9OIElTIE5PVCBBIFBFUkZPUk1BTkNFIE9GIEEgU0NPUkU6IFwiLCBzZXNzaW9uKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKHJlc3BvbnNlLmhlYWRlcnMuZXRhZyAhPT0gZXRhZykge1xuICAgICAgICAvLyB3ZSBuZWVkIHRvIGdyYWIgdGhlIGdyYXBoIGRhdGEsIGVpdGhlciBiZWNhdXNlIHRoaXMgaXMgdGhlIGZpcnN0IHRpbWUsXG4gICAgICAgIC8vIG9yIGJlY2F1c2Ugc2Vzc2lvbiBldGFnIGhhcyBjaGFuZ2VkIChpLmUuIGFubm90YXRpb24gaGFzIGJlZW4gcG9zdGVkL3BhdGNoZWQpXG4gICAgICAgIGRpc3BhdGNoKHtcbiAgICAgICAgICB0eXBlOiBGRVRDSF9HUkFQSCxcbiAgICAgICAgICBwYXlsb2FkOiBmcmFtZWRcbiAgICAgICAgfSk7XG4gICAgICAgIC8vIHRha2Ugbm90ZSBvZiB0aGUgbmV3IGV0YWdcbiAgICAgICAgZGlzcGF0Y2goe1xuICAgICAgICAgIHR5cGU6IFNFU1NJT05fR1JBUEhfRVRBRyxcbiAgICAgICAgICBwYXlsb2FkOiB7XG4gICAgICAgICAgICB1cmk6IHVyaSxcbiAgICAgICAgICAgIGV0YWc6IHJlc3BvbnNlLmhlYWRlcnMuZXRhZ1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIGlmIChcImxkcDpjb250YWluc1wiIGluIGZyYW1lZFtcIkBncmFwaFwiXVswXSkge1xuICAgICAgICAgIC8vIHRoZXJlIGFyZSBvbmUgb3IgbW9yZSBhbm5vdGF0aW9ucyB0byBwcm9jZXNzXG4gICAgICAgICAgZnJhbWVkW1wiQGdyYXBoXCJdWzBdID0gZW5zdXJlQXJyYXkoZnJhbWVkW1wiQGdyYXBoXCJdWzBdLCBcImxkcDpjb250YWluc1wiKTtcbiAgICAgICAgICAvLyBwcm9jZXNzIGVhY2ggYW5ub3RhdGlvblxuICAgICAgICAgIGZyYW1lZFtcIkBncmFwaFwiXVswXVtcImxkcDpjb250YWluc1wiXS5tYXAoKGFubm90YXRpb24pID0+IHtcbiAgICAgICAgICAgIGRpc3BhdGNoKHByb2Nlc3NDb21wb25lbnRBbm5vdGF0aW9uKGFubm90YXRpb24sIHNlc3Npb25bXCJtbzpwZXJmb3JtYW5jZV9vZlwiXVtcIkBpZFwiXSkpO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSk7XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGZldGNoR3JhcGgodXJpKSB7XG4gIC8vIGNvbnNvbGUubG9nKFwiRkVUQ0hfR1JBUEggQUNUSU9OIE9OIFVSSTogXCIsIHVyaSk7XG4gIGNvbnN0IHByb21pc2UgPSBhdXRoLmZldGNoKHVyaSk7XG5cbiAgcmV0dXJuIChkaXNwYXRjaCkgPT4ge1xuICAgIHByb21pc2UudGhlbigoe2RhdGF9KSA9PiB7XG4gICAgICAvLyBkaXNwYXRjaCB0aGUgZ3JhcGggZGF0YVxuICAgICAgZGlzcGF0Y2goe1xuICAgICAgICB0eXBlOiBGRVRDSF9HUkFQSCxcbiAgICAgICAgcGF5bG9hZDogZGF0YVxuICAgICAgfSk7XG4gICAgICAvLyB3YWxrIHRocm91Z2ggY29tcG9uZW50IGFubm90YXRpb25zXG4gICAgICBkYXRhW1wiQGdyYXBoXCJdWzBdW1wibGRwOmNvbnRhaW5zXCJdLm1hcCgodG9wTGV2ZWwpID0+IHtcbiAgICAgICAgdG9wTGV2ZWxbXCJvYTpoYXNCb2R5XCJdLm1hcCgoYW5ub3RhdGlvbikgPT4ge1xuICAgICAgICAgIGRpc3BhdGNoKHByb2Nlc3NDb21wb25lbnRBbm5vdGF0aW9uKGFubm90YXRpb24pKTtcbiAgICAgICAgfSk7XG5cbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG59XG5cbmZ1bmN0aW9uIHByb2Nlc3NDb21wb25lbnRBbm5vdGF0aW9uKGFubm90YXRpb24sIGNvbmNlcHR1YWxTY29yZSA9IFwiXCIpIHtcbiAgY29uc29sZS53YXJuKFwiREVQUkVDQVRJT04gV0FSTklORzogVGhlIGZ1bmN0aW9uIHByb2Nlc3NDb21wb25lbnRBbm5vdGF0aW9uIGlzIGNvbnNpZGVyZWQgZGVwcmVjYXRlZCBhcyBvZiBtZWxkLWNsaWVudHMtY29yZSB2Mi4wLjAgYW5kIHdpbGwgYmUgc3ViamVjdCB0byByZW1vdmFsIGluIGZ1dHVyZSB2ZXJzaW9ucy4gUGxlYXNlIHVwZ3JhZGUgeW91ciBhcHBsaWNhdGlvbiB0byB1c2UgdGhlIHJlZ2lzdGVyVHJhdmVyc2FsIGFuZCB0cmF2ZXJzZSBmdW5jdGlvbnMgaW5zdGVhZC5cIik7XG4gIGlmIChcIm1lbGQ6c3RhdGVcIiBpbiBhbm5vdGF0aW9uICYmIGFubm90YXRpb25bXCJtZWxkOnN0YXRlXCJdW1wiQGlkXCJdID09PSBcIm1lbGQ6cHJvY2Vzc2VkXCIpIHtcbiAgICAvLyBXZSBjYW4gc2tpcCB0aGlzIHByb2Nlc3NlZCBhbm5vdGF0aW9uXG4gICAgcmV0dXJuIHtcbiAgICAgIHR5cGU6IEFOTk9UQVRJT05fU0tJUFBFRCxcbiAgICAgIHBheWxvYWQ6IGFubm90YXRpb25cbiAgICB9XG4gIH1cbiAgYW5ub3RhdGlvbiA9IGVuc3VyZUFycmF5KGFubm90YXRpb24sIFwib2E6aGFzVGFyZ2V0XCIpO1xuICAvLyBjb25zb2xlLmxvZyhcIlByb2Nlc3NpbmcgY29tcG9uZW50IGFubm90YXRpb246IFwiLCBhbm5vdGF0aW9uLCBjb25jZXB0dWFsU2NvcmUpXG4gIGNvbnN0IHRhcmdldHMgPSBhbm5vdGF0aW9uW1wib2E6aGFzVGFyZ2V0XCJdLm1hcCh0YXJnZXQgPT4ge1xuICAgIHJldHVybiB7XG4gICAgICBcIkBpZFwiOiB0YXJnZXRbXCJAaWRcIl0sXG4gICAgICAvLyBEVyBUT0RPIDIwMTcwODMwIG1heSBuZWVkIHRvIHZhbGlkYXRlIHdoZXRoZXIgQHR5cGUgZXhpc3RzXG4gICAgICBcIkB0eXBlXCI6IHRhcmdldFtcIkB0eXBlXCJdLFxuICAgIH1cbiAgfSk7XG4gIHJldHVybiAoZGlzcGF0Y2gpID0+IHtcbiAgICB0YXJnZXRzLm1hcCh0YXJnZXQgPT4ge1xuICAgICAgZGlzcGF0Y2goZmV0Y2hDb21wb25lbnRUYXJnZXQodGFyZ2V0W1wiQGlkXCJdLCBjb25jZXB0dWFsU2NvcmUpKVxuICAgIH0pO1xuICAgIGRpc3BhdGNoKHtcbiAgICAgIHR5cGU6IFBST0NFU1NfQU5OT1RBVElPTixcbiAgICAgIHBheWxvYWQ6IHtcbiAgICAgICAgaWQ6IGFubm90YXRpb25bXCJAaWRcIl0sXG4gICAgICAgIGJvZGllczogYW5ub3RhdGlvbltcIm9hOmhhc0JvZHlcIl0sXG4gICAgICAgIHRhcmdldHM6IHRhcmdldHNcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxufVxuXG5cbmV4cG9ydCBmdW5jdGlvbiBmZXRjaENvbXBvbmVudFRhcmdldCh1cmksIGNvbmNlcHR1YWxTY29yZSA9IFwiXCIpIHtcbiAgY29uc29sZS53YXJuKFwiREVQUkVDQVRJT04gV0FSTklORzogVGhlIGZ1bmN0aW9uIGZldGNoQ29tcG9uZW50VGFyZ2V0IGlzIGNvbnNpZGVyZWQgZGVwcmVjYXRlZCBhcyBvZiBtZWxkLWNsaWVudHMtY29yZSB2Mi4wLjAgYW5kIHdpbGwgYmUgc3ViamVjdCB0byByZW1vdmFsIGluIGZ1dHVyZSB2ZXJzaW9ucy4gUGxlYXNlIHVwZ3JhZGUgeW91ciBhcHBsaWNhdGlvbiB0byB1c2UgdGhlIHJlZ2lzdGVyVHJhdmVyc2FsIGFuZCB0cmF2ZXJzZSBmdW5jdGlvbnMgaW5zdGVhZC5cIik7XG4gIC8vIGNvbnNvbGUubG9nKFwiRkVUQ0hfQ09NUE9ORU5UX1RBUkdFVCBBQ1RJT04gT04gVVJJOiBcIiwgdXJpKTtcbiAgY29uc3QgcHJvbWlzZSA9IGF1dGguZmV0Y2godXJpLCB7aGVhZGVyczogeydBY2NlcHQnOiAnYXBwbGljYXRpb24vbGQranNvbid9LCBtb2RlOiAnY29ycyd9KTtcbiAgcmV0dXJuIGRpc3BhdGNoID0+IHtcbiAgICBwcm9taXNlLnRoZW4oZGF0YSA9PiB7XG4gICAgICAvLyBjb25zb2xlLmxvZyhcIkF0dGVtcGluZyB0byBmcmFtZSBkYXRhXCIsIGRhdGEpO1xuICAgICAgaWYgKCFcImNvbnRlbnQtdHlwZVwiIGluIGRhdGEuaGVhZGVycyB8fCBkYXRhLmhlYWRlcnMuZ2V0KFwiQ29udGVudC1UeXBlXCIpICE9PSBcImFwcGxpY2F0aW9uL2pzb25cIiAmJiBkYXRhLmhlYWRlcnMuZ2V0KFwiQ29udGVudC1UeXBlXCIpICE9PSBcImFwcGxpY2F0aW9uL2xkK2pzb25cIikge1xuICAgICAgICAvLyBjb25zb2xlLmxvZyhcIkNvbnZlcnRpbmcgdG8gSlNPTi4uLlwiKTtcbiAgICAgICAgLy8gbmVlZCB0byBjb252ZXJ0IHRyaXBsZXMgdG8ganNvblxuICAgICAgICAvLyBUT0RPIGhhbmRsZSBhcmJpdHJhcnkgUkRGIGZvcm1hdCBoZXJlIChjdXJyZW50bHkgcmVxdWlyZXMgbnRyaXBsZXMpXG4gICAgICAgIGpzb25sZC5mcm9tUkRGKGRhdGEuZGF0YSwge2Zvcm1hdDogJ2FwcGxpY2F0aW9uL24tcXVhZHMnfSkudGhlbihkb2MgPT4ge1xuICAgICAgICAgIGRpc3BhdGNoKHByb2Nlc3NDb21wb25lbnRUYXJnZXQoZG9jLCB1cmksIGNvbmNlcHR1YWxTY29yZSkpO1xuICAgICAgICB9KS5jYXRjaChlcnIgPT4gY29uc29sZS5sb2coXCJFUlJPUiBDT05WRVJUSU5HIE5RVUFEUyBUTyBKU09OLUxEOiBcIiwgZXJyKSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyBhbHJlYWR5IGluIGpzb24gZm9ybWF0XG4gICAgICAgIGRpc3BhdGNoKHByb2Nlc3NDb21wb25lbnRUYXJnZXQoZGF0YS5kYXRhLCB1cmksIGNvbmNlcHR1YWxTY29yZSkpO1xuICAgICAgfVxuICAgIH0pO1xuXHR9O1xufVxuXG5mdW5jdGlvbiBwcm9jZXNzQ29tcG9uZW50VGFyZ2V0KGRhdGEsIHVyaSwgY29uY2VwdHVhbFNjb3JlKSB7XG4gIGNvbnNvbGUud2FybihcIkRFUFJFQ0FUSU9OIFdBUk5JTkc6IFRoZSBmdW5jdGlvbiBwcm9jZXNzQ29tcG9uZW50VGFyZ2V0IGlzIGNvbnNpZGVyZWQgZGVwcmVjYXRlZCBhcyBvZiBtZWxkLWNsaWVudHMtY29yZSB2Mi4wLjAgYW5kIHdpbGwgYmUgc3ViamVjdCB0byByZW1vdmFsIGluIGZ1dHVyZSB2ZXJzaW9ucy4gUGxlYXNlIHVwZ3JhZGUgeW91ciBhcHBsaWNhdGlvbiB0byB1c2UgdGhlIGNoZWNrVHJhdmVyc2FsT2JqZWN0aXZlcyBmdW5jdGlvbiBpbnN0ZWFkLlwiKTtcbiAgLy8gY29uc29sZS5sb2coXCJQUk9DRVNTX0NPTVBPTkVOVF9UQVJHRVQgQUNUSU9OIE9OIFVSSTogXCIsIHVyaSk7XG4gIHJldHVybiAoZGlzcGF0Y2gpID0+IHtcbiAgICBqc29ubGQuZnJhbWUoZGF0YSwgeyBcIkBpZFwiOiB1cmkgfSkudGhlbihmcmFtZWQgPT4ge1xuICAgICAganNvbmxkLmNvbXBhY3QoZnJhbWVkLCBjb250ZXh0KS50aGVuKGNvbXBhY3RlZCA9PiB7XG4gICAgICAgIGRpc3BhdGNoKHtcbiAgICAgICAgICB0eXBlOiBGRVRDSF9DT01QT05FTlRfVEFSR0VULFxuICAgICAgICAgIHBheWxvYWQ6IHtcbiAgICAgICAgICAgIGNvbmNlcHR1YWxTY29yZTogY29uY2VwdHVhbFNjb3JlLFxuICAgICAgICAgICAgc3RydWN0dXJlVGFyZ2V0OiB1cmlcbiAgICAgICAgICB9XG4gICAgICAgIH0pOyAvLyBjb25zb2xlLmxvZyhcIkNPTVBBQ1RFRDogXCIsIGNvbXBhY3RlZCk7XG5cdFx0XHRcdFxuICAgICAgICBsZXQgdHlwZWNoZWNrID0gY29tcGFjdGVkO1xuICAgICAgICB0eXBlY2hlY2sgPSBlbnN1cmVBcnJheSh0eXBlY2hlY2ssIFwiQHR5cGVcIik7IC8vIGhhdmUgd2UgZm91bmQgYSBzZWdtZW50P1xuICAgICAgICAvLyBjb25zb2xlLmxvZyhcIlRZUEVDSEVDSzogXCIsIHR5cGVjaGVjaylcblx0XHRcdFx0XG4gICAgICAgIGlmICh0eXBlY2hlY2tbXCJAdHlwZVwiXS5pbmNsdWRlcyhTRUdNRU5UKSB8fCB0eXBlY2hlY2tbXCJAdHlwZVwiXS5pbmNsdWRlcyhNVVpJQ09ERSkpIHtcbiAgICAgICAgICAvLyBUT0RPIGpzb25sZGlmeSBjb250ZXh0XG4gICAgICAgICAgLy8gVE9ETyByZWZpbmUgbXV6aWNvZGUgc2VtYW50aWNzIGZvciB0aGlzXG4gICAgICAgICAgLy8gZm91bmQgYSBzZWdtZW50IG9yIG11emljb2RlIVxuICAgICAgICAgIC8vIGhhbmQgaXQgb2ZmIHRvIHRoZSByZWR1Y2VyIHRvIHByb2Nlc3MgdGhlIGVtYm9kaWJhZ1xuICAgICAgICAgIC8vIG5iIHRoaXMgaXMgYSBkaWZmZXJlbnQgcm91dGUgdG8gbGFycnltZWxkICh2aWEgZXhwcmVzc2lvbilcbiAgICAgICAgICAvLyBpLmUuIHRoZXJlIGlzIG5vIHBhcnRvbm9teSBoZXJlLiBTbyBzZW5kIHRoZSBzZWdtZW50IGl0c2VsZiBhcyB0aGUgcGFydC5cbiAgICAgICAgICBkaXNwYXRjaCh7XG4gICAgICAgICAgICB0eXBlOiBGRVRDSF9NQU5JRkVTVEFUSU9OUyxcbiAgICAgICAgICAgIHBheWxvYWQ6IHtcbiAgICAgICAgICAgICAgdGFyZ2V0OiBjb21wYWN0ZWQsXG4gICAgICAgICAgICAgIHBhcnQ6IGNvbXBhY3RlZFxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIC8vIGlmIG5vdCwgY29udGludWUgZm9sbG93aW5nIGxpbmtzIHZpYSB0aGUgdGFyZ2V0J3MgZXhwcmVzc2lvblxuICAgICAgICAgIGRpc3BhdGNoKGZldGNoVGFyZ2V0RXhwcmVzc2lvbihjb21wYWN0ZWQpKTtcbiAgICAgICAgfVxuICAgICAgfSkuY2F0Y2goZXJyID0+IGNvbnNvbGUubG9nKFwiQ09NUEFDVElORyBFUlJPUiBpbiBwcm9jZXNzQ29tcG9uZW50VGFyZ2V0OlwiLCBlcnIpKTtcbiAgICB9KS5jYXRjaChlcnIgPT4ge1xuICAgICAgdHlwZTogQU5OT1RBVElPTl9OT1RfSEFORExFRFxuICAgIH0pO1xuICB9O1xufVxuXG5cbmV4cG9ydCBmdW5jdGlvbiBmZXRjaFRhcmdldEV4cHJlc3Npb24oY29tcGFjdGVkKSB7XG4gIGNvbnNvbGUud2FybihcIkRFUFJFQ0FUSU9OIFdBUk5JTkc6IFRoZSBmdW5jdGlvbiBmZXRjaFRhcmdldEV4cHJlc3Npb24gaXMgY29uc2lkZXJlZCBkZXByZWNhdGVkIGFzIG9mIG1lbGQtY2xpZW50cy1jb3JlIHYyLjAuMCBhbmQgd2lsbCBiZSBzdWJqZWN0IHRvIHJlbW92YWwgaW4gZnV0dXJlIHZlcnNpb25zLiBQbGVhc2UgdXBncmFkZSB5b3VyIGFwcGxpY2F0aW9uIHRvIHVzZSB0aGUgcmVnaXN0ZXJUcmF2ZXJzYWwgYW5kIHRyYXZlcnNlIGZ1bmN0aW9ucyBpbnN0ZWFkLlwiKTtcbiAgLy8gdHJhdmVyc2UgZnJvbSB0aGUgcHJvdmlkZWQgRXhwcmVzc2lvbiwgdmlhIGEgU2VnbWVudCwgdG8gTWFuaWZlc3RhdGlvbihzKVxuICAvLyBjb25zb2xlLmxvZyhcIkluIGZldGNoVGFyZ2V0RXhwcmVzc2lvbjogXCIsIGNvbXBhY3RlZCk7XG4gIHJldHVybiBkaXNwYXRjaCA9PiB7XG4gICAgZGlzcGF0Y2goe1xuICAgICAgdHlwZTogRkVUQ0hfVEFSR0VUX0VYUFJFU1NJT04sXG4gICAgICBwYXlsb2FkOiBjb21wYWN0ZWRcbiAgICB9KTtcbiAgICBsZXQgdGFyZ2V0ID0gY29tcGFjdGVkO1xuICAgIGlmICh0YXJnZXRbXCJAdHlwZVwiXS5pbmNsdWRlcyhFWFBSRVNTSU9OKSkge1xuICAgICAgLy8gZm91bmQgYW4gZXhwcmVzc2lvblxuICAgICAgLy8gRG8gd2UgaGF2ZSBhIGhhcm1vbnkgZGVjbGFyYXRpb24/XG4gICAgICBsZXQgY2hvcmRzID0gW107XG4gICAgICBsZXQgZXhwcmVzc2lvbk9iaiA9IHt9O1xuICAgICAgZXhwcmVzc2lvbk9ialsnQGlkJ10gPSB0YXJnZXRbJ0BpZCddO1xuICAgICAgaWYgKFBBUlRfT0YgaW4gdGFyZ2V0KSB7XG4gICAgICAgIGV4cHJlc3Npb25PYmoubW90aWYgPSB0YXJnZXRbUEFSVF9PRl1bJ0BpZCddO1xuICAgICAgICBleHByZXNzaW9uT2JqLm4gPSBwYXJzZUludCgvXFxkKiQvLmV4ZWModGFyZ2V0WydAaWQnXSlbMF0pOyAvLyBGSVhNRTogYmFkIGhhY2sgZm9yIG5vdCBoYXZpbmcgc2VxIGF2YWlsYWJsZVxuICAgICAgfVxuICAgICAgaWYgKFJFQUxJWkFUSU9OX09GIGluIHRhcmdldCkge1xuICAgICAgICBleHByZXNzaW9uT2JqLnNlZ21lbnQgPSB0YXJnZXRbUkVBTElaQVRJT05fT0ZdWydAaWQnXTtcbiAgICAgIH1cbiAgICAgIGlmIChLRVkgaW4gdGFyZ2V0KSBleHByZXNzaW9uT2JqLmtleSA9IHRhcmdldFtLRVldWydAaWQnXTtcbiAgICAgIGlmIChIQVJNT05ZIGluIHRhcmdldCkge1xuICAgICAgICBpZiAoUEFSVF9PRiBpbiB0YXJnZXQpIHtcbiAgICAgICAgICBleHByZXNzaW9uT2JqLm1vdGlmID0gdGFyZ2V0W1BBUlRfT0ZdWydAaWQnXTtcbiAgICAgICAgICBleHByZXNzaW9uT2JqLmNob3JkcyA9IGNob3JkcztcbiAgICAgICAgfVxuICAgICAgICB2YXIgY291bnRlciA9IDE7XG4gICAgICAgIHZhciB1cmxCZWdpbnMgPSBcImh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyNfXCI7XG4gICAgICAgIHdoaWxlICh1cmxCZWdpbnMgKyBjb3VudGVyIGluIHRhcmdldFtIQVJNT05ZXSkge1xuICAgICAgICAgIGNob3Jkcy5wdXNoKHRhcmdldFtIQVJNT05ZXVt1cmxCZWdpbnMgKyBjb3VudGVyXSk7XG4gICAgICAgICAgY291bnRlcisrO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAoQ0FERU5DRSBpbiB0YXJnZXQpIHtcbiAgICAgICAgdmFyIGNhZGVuY2VEYXRhID0gdGFyZ2V0W0NBREVOQ0VdO1xuICAgICAgICBleHByZXNzaW9uT2JqLmNhZGVuY2UgPSB7fTtcbiAgICAgICAgaWYgKERFR1JFRSBpbiBjYWRlbmNlRGF0YSkgZXhwcmVzc2lvbk9iai5jYWRlbmNlLmRlZ3JlZSA9IGNhZGVuY2VEYXRhW0RFR1JFRV1bJ0BpZCddO1xuICAgICAgICBpZiAoQ0hPUkRfVFlQRSBpbiBjYWRlbmNlRGF0YSkgZXhwcmVzc2lvbk9iai5jYWRlbmNlLmNob3JkVHlwZSA9IGNhZGVuY2VEYXRhW0NIT1JEX1RZUEVdWydAaWQnXTtcbiAgICAgIH1cbiAgICAgIC8vIGRvZXMgaXQgaGF2ZSBhbnkgcGFydHM/XG4gICAgICBsZXQgcGFydHMgPSBbXTtcbiAgICAgIC8vIGNvbnNvbGUubG9nKFwicGFydCBjaGVjazogXCIsIHRhcmdldClcbiAgICAgIGlmIChQQVJUIGluIHRhcmdldCkge1xuICAgICAgICAvLyBzb21ldGltZXMgd2UgbWF5IGhhdmUgbXVsdGlwbGUgcGFydHMgb3IgcGFydCBzZXF1ZW5jZXM7IHNvbWV0aW1lcyBvbmx5IG9uZVxuICAgICAgICAvLyBzbyBlbnN1cmUgd2UgaGF2ZSBhbiBhcnJheSB0byB3b3JrIHdpdGggKGV2ZW4gaWYgaXQncyBsZW5ndGggb25lKVxuICAgICAgICAvLyBUT0RPIHJlZmFjdG9yIHRvIHVzZSBlbnN1cmVBcnJheSBoZWxwZXIgZnVuY3Rpb25cbiAgICAgICAgaWYgKCFBcnJheS5pc0FycmF5KHRhcmdldFtQQVJUXSkpIHtcbiAgICAgICAgICB0YXJnZXRbUEFSVF0gPSBbdGFyZ2V0W1BBUlRdXTtcbiAgICAgICAgfVxuICAgICAgICAvLyBub3cgcHJvY2VzcyBlYWNoIHNlcXVlbmNlXG4gICAgICAgIHRhcmdldFtQQVJUXS5tYXAoKHApID0+IHtcbiAgICAgICAgICBpZiAoXCJAdHlwZVwiIGluIHAgJiYgcFtcIkB0eXBlXCJdLmluY2x1ZGVzKFNFUSkpIHtcbiAgICAgICAgICAgIC8vIGl0J3MgYW4gUkRGIHNlcXVlbmNlXG4gICAgICAgICAgICBPYmplY3Qua2V5cyhwKS5tYXAoKHBhcnQpID0+IHtcbiAgICAgICAgICAgICAgaWYgKHBhcnQuc3RhcnRzV2l0aChTRVFQQVJUKSkge1xuICAgICAgICAgICAgICAgIHBhcnRzLnB1c2gocFtwYXJ0XVtcIkBpZFwiXSk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBwYXJ0cy5wdXNoKHBbXCJAaWRcIl0pO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIC8vIG5vdyBmZXRjaCB0aGUgd29yayB0byBjb250aW51ZSBvbiB0byB0aGUgbWFuaWZlc3RhdGlvbnMgYXNzb2NpYXRlZCB3aXRoIHRoZXNlIHBhcnRzXG4gICAgICAgIGlmIChSRUFMSVpBVElPTl9PRiBpbiB0YXJnZXQpIHtcbiAgICAgICAgICBkaXNwYXRjaChmZXRjaFdvcmsoY29tcGFjdGVkLCBwYXJ0cywgdGFyZ2V0W1JFQUxJWkFUSU9OX09GXVtcIkBpZFwiXSwgZXhwcmVzc2lvbk9iaikpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGNvbnNvbGUubG9nKFwiVGFyZ2V0IGlzIGFuIHVucmVhbGl6ZWQgZXhwcmVzc2lvbjogXCIsIHRhcmdldCk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiVGFyZ2V0IGV4cHJlc3Npb24gd2l0aG91dCBwYXJ0c1wiLCB0YXJnZXQpO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBjb25zb2xlLmxvZyhcImZldGNoVGFyZ2V0RXhwcmVzc2lvbiBhdHRlbXB0ZWQgb24gYSBub24tRXhwcmVzc2lvbiEgXCIsIHRhcmdldCk7XG4gICAgfVxuICB9XG59XG5cblxuZXhwb3J0IGZ1bmN0aW9uIGZldGNoV29yayh0YXJnZXQsIHBhcnRzLCB3b3JrLCBleHByZXNzaW9uT2JqKSB7XG4gIGNvbnNvbGUud2FybihcIkRFUFJFQ0FUSU9OIFdBUk5JTkc6IFRoZSBmdW5jdGlvbiBmZXRjaFdvcmsgaXMgY29uc2lkZXJlZCBkZXByZWNhdGVkIGFzIG9mIG1lbGQtY2xpZW50cy1jb3JlIHYyLjAuMCBhbmQgd2lsbCBiZSBzdWJqZWN0IHRvIHJlbW92YWwgaW4gZnV0dXJlIHZlcnNpb25zLiBQbGVhc2UgdXBncmFkZSB5b3VyIGFwcGxpY2F0aW9uIHRvIHVzZSB0aGUgcmVnaXN0ZXJUcmF2ZXJzYWwgYW5kIHRyYXZlcnNlIGZ1bmN0aW9ucyBpbnN0ZWFkLlwiKTtcbiAgLy8gY29uc29sZS5sb2coXCJTVEFSVElORyBGRVRDSFdPUksgV0lUSCBcIiwgd29yaywgcGFydHMsIGV4cHJlc3Npb25PYmopO1xuICByZXR1cm4gKGRpc3BhdGNoKSA9PiB7XG4gICAgZGlzcGF0Y2goe1xuICAgICAgdHlwZTogRkVUQ0hfV09SSyxcbiAgICAgIHBheWxvYWQ6IHtcbiAgICAgICAgdGFyZ2V0OiB0YXJnZXQsXG4gICAgICAgIHBhcnRzOiBwYXJ0cyxcbiAgICAgICAgd29ya3M6IHdvcmssXG4gICAgICAgIGNob3JkczogZXhwcmVzc2lvbk9ialxuICAgICAgfVxuICAgIH0pO1xuICAgIGF1dGguZmV0Y2god29yaykudGhlbigoZGF0YSkgPT4ge1xuICAgICAganNvbmxkLmZyb21SREYoZGF0YS5kYXRhLCAoZXJyLCBkb2MpID0+IHtcbiAgICAgICAgaWYgKGVycikge1xuICAgICAgICAgIGNvbnNvbGUubG9nKFwiRVJST1IgVFJBTlNMQVRJTkcgTlFVQURTIFRPIEpTT05MRDogXCIsIGVyciwgZGF0YS5kYXRhKVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGpzb25sZC5mcmFtZShkb2MsIHtcIkBpZFwiOiB3b3JrfSwgKGVyciwgZnJhbWVkKSA9PiB7XG4gICAgICAgICAgICBpZiAoZXJyKSB7XG4gICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiRlJBTUlORyBFUlJPUiBpbiBmZXRjaFdvcms6XCIsIGVycilcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIGpzb25sZC5jb21wYWN0KGZyYW1lZCwgY29udGV4dCwgKGVyciwgY29tcGFjdGVkKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKGVycikge1xuICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJDT01QQUNUSU5HIEVSUk9SIGluIGZldGNoV29yazpcIiwgZXJyKVxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICB3b3JrID0gY29tcGFjdGVkO1xuICAgICAgICAgICAgICAgICAgLy8gQ2hlY2sgaWYgdGhlcmUgaXMgYSBzZWdtZW50IGxpbmUsIGluIHdoaWNoIGNhc2UgZmV0Y2ggbWFuaWZlc3RhdGlvbnNcbiAgICAgICAgICAgICAgICAgIC8vIGVsc2UsIGNoZWNrIGlmIHRoaXMgaXMgcGFydCBvZiBhbm90aGVyIChcInBhcmVudFwiKSB3b3JrXG4gICAgICAgICAgICAgICAgICBpZiAoSEFTX1NUUlVDVFVSRSBpbiB3b3JrKSB7XG4gICAgICAgICAgICAgICAgICAgIGRpc3BhdGNoKGZldGNoU3RydWN0dXJlKHRhcmdldCwgcGFydHMsIHdvcmtbSEFTX1NUUlVDVFVSRV1bXCJAaWRcIl0pKTtcbiAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoUEFSVF9PRiBpbiB3b3JrKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIGRvZXMgb3VyIGRvYyBhdHRhY2ggYSBTY29yZSB3aGljaCByZWFsaXplcyB0aGUgcGFyZW50IHdvcms/XG4gICAgICAgICAgICAgICAgICAgIC8vIEZJWE1FIEhBQ0tIQUNLOlxuICAgICAgICAgICAgICAgICAgICAvLyBmcmFtaW5nIGV4cGFuZHMgdGhlIG5pY2UgY29tcGFjdGVkIFVSSXNcbiAgICAgICAgICAgICAgICAgICAgLy8gc28gaGVyZSB3ZSBuZWVkIHRvIHVzZSBmdWxsIFVSSXMgaW5zdGVhZCBvZiBSRUFMSVpBVElPTl9PRiBhcyBkZWZpbmVkIGFib3ZlXG4gICAgICAgICAgICAgICAgICAgIGpzb25sZC5mcmFtZSh7XCJAY29udGV4dFwiOiBjb250ZXh0LCBcIkBncmFwaFwiOiBkb2N9LCB7XG4gICAgICAgICAgICAgICAgICAgICAgXCJodHRwOi8vcHVybC5vcmcvdm9jYWIvZnJici9jb3JlI3JlYWxpemF0aW9uT2ZcIjogd29ya1tQQVJUX09GXVtcIkBpZFwiXVxuICAgICAgICAgICAgICAgICAgICB9LCAoZXJyLCBmcmFtZWQpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICBpZiAoZXJyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIkZSQU1JTkcgRVJST1Igd2hlbiBmZXRjaGluZyBwYXJlbnQgd29ya1wiLCBlcnIpXG4gICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKFwiQXR0YWNoZWQgc2NvcmU6XCIsIGZyYW1lZCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBhdHRhY2hlZFNjb3JlID0gZnJhbWVkW1wiQGdyYXBoXCJdWzBdO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGF0dGFjaGVkU2NvcmUgJiYgXCJAdHlwZVwiIGluIGF0dGFjaGVkU2NvcmUgJiYgYXR0YWNoZWRTY29yZVtcIkB0eXBlXCJdID09PSBTQ09SRSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBGSVhNRSBicmVha3Mgd2l0aCBtdWx0aXBsZSB0eXBlc1xuICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBGb3VuZCBhbiBhdHRhY2hlZCBTY29yZSEhIVxuICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoUFVCTElTSEVEX0FTIGluIGF0dGFjaGVkU2NvcmUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBmb3Igbm93OiBhc3N1bWUgcHVibGlzaGVkIHNjb3Jlc1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGFyZSBhdHRhY2hlZCBpbiBzYW1lIGZpbGVcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBGSVhNRSBlbmFibGUgZXh0ZXJuYWwgcHViX3Njb3Jlc1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF0dGFjaGVkU2NvcmVbUFVCTElTSEVEX0FTXS5tYXAoKHB1YlNjb3JlKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhcIkZPVU5EIFBVQiBTQ09SRTogXCIsIHB1YlNjb3JlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChIQVNfUEVSRk9STUFOQ0VfTUVESVVNIGluIHB1YlNjb3JlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKFwiRk9VTkQgUEVSRiBNRURJVU06IFwiLCBwdWJTY29yZVtIQVNfUEVSRk9STUFOQ0VfTUVESVVNXSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRpc3BhdGNoKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiBSRUdJU1RFUl9QVUJMSVNIRURfUEVSRk9STUFOQ0VfU0NPUkUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGF5bG9hZDoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgd29yazogd29yayxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbmNlcHR1YWxTY29yZTogYXR0YWNoZWRTY29yZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHB1Ymxpc2hlZFNjb3JlOiBwdWJTY29yZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBlcmZvcm1hbmNlTWVkaXVtOiBwdWJTY29yZVtIQVNfUEVSRk9STUFOQ0VfTUVESVVNXVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChwdWJTY29yZVtIQVNfUEVSRk9STUFOQ0VfTUVESVVNXVsnQGlkJ10gPT0gSEFTX1BJQU5PKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGlzcGF0Y2goZmV0Y2hTY29yZShwdWJTY29yZVtcIkBpZFwiXSkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRpc3BhdGNoKGZldGNoUmliYm9uQ29udGVudChwdWJTY29yZVtcIkBpZFwiXSkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhcIlB1Ymxpc2hlZCBzY29yZSB3aXRob3V0IHBlcmZvcm1hbmNlIG1lZGl1bTogXCIsIHB1YlNjb3JlW1wiQGlkXCJdKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKFwiVW5wdWJsaXNoZWQgc2NvcmU6IFwiLCBhdHRhY2hlZFNjb3JlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoSEFTX1NUUlVDVFVSRSBpbiBhdHRhY2hlZFNjb3JlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGlzcGF0Y2goZmV0Y2hTdHJ1Y3R1cmUodGFyZ2V0LCBwYXJ0cywgYXR0YWNoZWRTY29yZVtIQVNfU1RSVUNUVVJFXVtcIkBpZFwiXSkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKFwiU2NvcmUgXCIsIGF0dGFjaGVkU2NvcmVbXCJAaWRcIl0sIFwiIGF0dGFjaGVkIHRvIHdvcmsgXCIsIHdvcmtbXCJAaWRcIl0sIFwiIGhhcyBubyBzZWdtZW50IGxpbmUhIVwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gbm8gYXR0YWNoZWQgU2NvcmUsIHNvIHdlIGhhdmUgdG8gcmVjdXJzZSBvbiB0aGUgcGFyZW50IHdvcmtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgZGlzcGF0Y2goZmV0Y2hXb3JrKHRhcmdldCwgcGFydHMsIHdvcmtbUEFSVF9PRl1bXCJAaWRcIl0pKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coXCJGb3VuZCB3b3JrIHdpdGhvdXQgc2VnbWVudExpbmUgb3IgcGFydG9ub215ISBcIiwgd29yayk7XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGZldGNoU3RydWN0dXJlKHRhcmdldCwgcGFydHMsIHNlZ2xpbmUpIHtcbiAgY29uc29sZS53YXJuKFwiREVQUkVDQVRJT04gV0FSTklORzogVGhlIGZ1bmN0aW9uIGZldGNoU3RydWN0dXJlIGlzIGNvbnNpZGVyZWQgZGVwcmVjYXRlZCBhcyBvZiBtZWxkLWNsaWVudHMtY29yZSB2Mi4wLjAgYW5kIHdpbGwgYmUgc3ViamVjdCB0byByZW1vdmFsIGluIGZ1dHVyZSB2ZXJzaW9ucy4gUGxlYXNlIHVwZ3JhZGUgeW91ciBhcHBsaWNhdGlvbiB0byB1c2UgdGhlIHJlZ2lzdGVyVHJhdmVyc2FsIGFuZCB0cmF2ZXJzZSBmdW5jdGlvbnMgaW5zdGVhZC5cIik7XG4gIHJldHVybiAoZGlzcGF0Y2gpID0+IHtcbiAgICBkaXNwYXRjaCh7XG4gICAgICB0eXBlOiBGRVRDSF9TVFJVQ1RVUkUsXG4gICAgICBwYXlsb2FkOiB7XG4gICAgICAgIHRhcmdldDogdGFyZ2V0LFxuICAgICAgICBwYXJ0czogcGFydHMsXG4gICAgICAgIHN0cnVjdHVyZTogc2VnbGluZVxuICAgICAgfVxuICAgIH0pO1xuICAgIGF1dGguZmV0Y2goc2VnbGluZSkudGhlbigoZGF0YSkgPT4ge1xuICAgICAganNvbmxkLmZyb21SREYoZGF0YS5kYXRhLCAoZXJyLCBkb2MpID0+IHtcbiAgICAgICAgaWYgKGVycikge1xuICAgICAgICAgIGNvbnNvbGUubG9nKFwiRVJST1IgVFJBTlNMQVRJTkcgTlFVQURTIFRPIEpTT05MRDogXCIsIGVyciwgZGF0YS5kYXRhKVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIC8vIGZyYW1lIHRoZSBkb2MgaW4gdGVybXMgb2YgZWFjaCBwYXJ0IG9mIHRoZSBleHByZXNzaW9uIHRhcmdldHRlZCBieSB0aGUgYW5ub3RhdGlvblxuICAgICAgICAgIHBhcnRzLm1hcCgocGFydCkgPT4ge1xuICAgICAgICAgICAganNvbmxkLmZyYW1lKGRvYywge1wiQGlkXCI6IHBhcnR9LCAoZXJyLCBmcmFtZWQpID0+IHtcbiAgICAgICAgICAgICAgaWYgKGVycikge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiRlJBTUlORyBFUlJPUiBpbiBmZXRjaFN0cnVjdHVyZTogXCIsIGVycilcbiAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBqc29ubGQuY29tcGFjdChmcmFtZWQsIGNvbnRleHQsIChlcnIsIGNvbXBhY3RlZCkgPT4ge1xuICAgICAgICAgICAgICAgICAgaWYgKGVycikge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIkNPTVBBQ1RJTkcgRVJST1IgaW4gZmV0Y2hTdHJ1Y3R1cmU6XCIsIGVycilcbiAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIGFuZCBoYW5kIHRvIHJlZHVjZXJzIHRvIHByb2Nlc3MgYXNzb2NpYXRlZCBlbWJvZGliYWdzXG4gICAgICAgICAgICAgICAgICAgIC8vIChtYW5pZmVzdGF0aW9ucyBvZiB0aGUgZXhwcmVzc2lvbilcbiAgICAgICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coXCJmZXRjaGluZyBtYW5pZmVzdGF0aW9uc1wiLCBkb2MsIHRhcmdldCwgcGFydCwgY29tcGFjdGVkKTtcbiAgICAgICAgICAgICAgICAgICAgZGlzcGF0Y2goe1xuICAgICAgICAgICAgICAgICAgICAgIHR5cGU6IEZFVENIX01BTklGRVNUQVRJT05TLFxuICAgICAgICAgICAgICAgICAgICAgIHBheWxvYWQ6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRhcmdldDogdGFyZ2V0LFxuICAgICAgICAgICAgICAgICAgICAgICAgcGFydDogY29tcGFjdGVkXG4gICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBmZXRjaENvbmNlcHR1YWxTY29yZShzZXNzaW9uLCB1cmkpIHtcbiAgY29uc29sZS53YXJuKFwiREVQUkVDQVRJT04gV0FSTklORzogVGhlIGZ1bmN0aW9uIGZldGNoQ29uY2VwdHVhbFNjb3JlIGlzIGNvbnNpZGVyZWQgZGVwcmVjYXRlZCBhcyBvZiBtZWxkLWNsaWVudHMtY29yZSB2Mi4wLjAgYW5kIHdpbGwgYmUgc3ViamVjdCB0byByZW1vdmFsIGluIGZ1dHVyZSB2ZXJzaW9ucy4gUGxlYXNlIHVwZ3JhZGUgeW91ciBhcHBsaWNhdGlvbiB0byB1c2UgdGhlIHJlZ2lzdGVyVHJhdmVyc2FsIGFuZCB0cmF2ZXJzZSBmdW5jdGlvbnMgaW5zdGVhZC5cIik7XG4gIHJldHVybiAoZGlzcGF0Y2gpID0+IHtcbiAgLy8gY29uc29sZS5sb2coXCJGRVRDSF9DT05DRVBUVUFMX1NDT1JFIE9OIFVSSTogXCIsIHVyaSk7XG4gIGNvbnN0IHByb21pc2UgPSBhdXRoLmZldGNoKHVyaSwge2hlYWRlcnM6IHsnQWNjZXB0JzogJ2FwcGxpY2F0aW9uL2xkK2pzb24nfX0pO1xuXG4gIHJldHVybiAoZGlzcGF0Y2gpID0+IHtcbiAgICBwcm9taXNlLnRoZW4oKHJlc3BvbnNlKSA9PiB7XG4gICAgICBjb25zdCBmcmFtZWQgPSByZXNwb25zZS5kYXRhO1xuICAgICAgY29uc3QgY29uY2VwdHVhbFNjb3JlID0gZnJhbWVkW1wiQGdyYXBoXCJdWzBdO1xuICAgICAgaWYgKFwibW86cHVibGlzaGVkX2FzXCIgaW4gY29uY2VwdHVhbFNjb3JlKSB7XG4gICAgICAgIC8vIGRpc3BhdGNoIHRoZSBjb25jZXB0dWFsIHNjb3JlIChjb250YWluaW5nIHRoZSBtZWkgVVJJKSBzbyB0aGF0IHdlIGNhbiBpbml0aWFsaXNlIGEgPFNjb3JlPiBjb21wb25lbnRcbiAgICAgICAgZGlzcGF0Y2goe1xuICAgICAgICAgIHR5cGU6IEZFVENIX0NPTkNFUFRVQUxfU0NPUkUsXG4gICAgICAgICAgcGF5bG9hZDogY29uY2VwdHVhbFNjb3JlXG4gICAgICAgIH0pO1xuICAgICAgICBkaXNwYXRjaChmZXRjaFNjb3JlKGNvbmNlcHR1YWxTY29yZVtcIm1vOnB1Ymxpc2hlZF9hc1wiXVtcIkBpZFwiXSkpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY29uc29sZS5sb2coXCJVbnB1Ymxpc2hlZCBjb25jZXB0dWFsIHNjb3JlOiBcIiwgY29uY2VwdHVhbFNjb3JlKVxuICAgICAgfVxuICAgICAgLyppZihcImNsaW1iOm5leHRcIiBpbiBjb25jZXB0dWFsU2NvcmUpIHtcbiAgICAgICAgICAvL1RPRE8gUkVWSVNJVCBGT1IgSkFNIC0tIE5PIExPTkdFUiBSRUxFVkFOVCBGT1IgQ0xJTUIsIEFTIE1VWklDT0RFUyBORUVEUyBUTyBNQUtFIEEgREVDSVNJT05cbiAgICAgICAgICAvLyBCRUZPUkUgVEhFICdERUZBVUxUJyBORVhUIFNDT1JFIENBTiBCRSBERVRFUk1JTkVEXG4gICAgICAgIC8vIGZvciBkeW5hbWljIG1lbGQgYXBwbGljYXRpb25zOlxuICAgICAgICAvLyBjcmVhdGUgYSBuZXcgc2Vzc2lvbiBmb3IgdGhlIGRlZmF1bHQgbmV4dCBzY29yZVxuICAgICAgICAvLyAod2hpY2ggc2Vzc2lvbkNvbnRyb2wgd2lsbCB0aGVuIHF1ZXVlIHVwKVxuICAgICAgICBjb25zb2xlLmxvZyhcIkFib3V0IHRvIGNyZWF0ZSBuZXh0IHNlc3Npb24gZm9yIGNvbmNlcHR1YWwgc2NvcmU6IFwiLCBjb25jZXB0dWFsU2NvcmUpO1xuICAgICAgICBkaXNwYXRjaChcbiAgICAgICAgICBjcmVhdGVTZXNzaW9uKFxuICAgICAgICAgICAgc2Vzc2lvbi5zdWJzdHIoMCxzZXNzaW9uLmxhc3RJbmRleE9mKFwiL1wiKSksXG4gICAgICAgICAgICBjb25jZXB0dWFsU2NvcmVbXCJjbGltYjpuZXh0XCJdW1wiQGlkXCJdXG4gICAgICAgICAgKVxuICAgICAgICApXG4gICAgICB9Ki9cbiAgICAgIH0pXG4gICAgfVxuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzY29yZVNldE9wdGlvbnMocHViU2NvcmVVcmksIG9wdGlvbnMpIHsgXG4gIHJldHVybiB7IFxuICAgIHR5cGU6IFNDT1JFX1NFVF9PUFRJT05TLFxuICAgIHBheWxvYWQ6IHsgXG4gICAgICBvcHRpb25zOiBvcHRpb25zLFxuICAgICAgdXJpOiBwdWJTY29yZVVyaSBcbiAgICB9XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHNjb3JlUGFnZVRvQ29tcG9uZW50VGFyZ2V0KHRhcmdldCwgcHViU2NvcmVVcmksIE1FSSkge1xuICByZXR1cm4ge1xuICAgIHR5cGU6IFNDT1JFX1BBR0VfVE9fVEFSR0VULFxuICAgIHBheWxvYWQ6IHtcbiAgICAgIGRhdGE6IE1FSSxcbiAgICAgIHVyaTogcHViU2NvcmVVcmksXG4gICAgICB0YXJnZXQ6IHRhcmdldFxuICAgIH1cbiAgfVxufVxuXG5cbmV4cG9ydCBmdW5jdGlvbiBzY29yZU5leHRQYWdlU3RhdGljKHB1YlNjb3JlVXJpLCBwYWdlTnVtLCBNRUkpIHtcbiAgcmV0dXJuIChkaXNwYXRjaCkgPT4ge1xuICAgIGRpc3BhdGNoKHtcbiAgICAgIHR5cGU6IFNDT1JFX05FWFRfUEFHRSxcbiAgICAgIHBheWxvYWQ6IHtcbiAgICAgICAgcGFnZU51bTogcGFnZU51bSxcbiAgICAgICAgZGF0YTogTUVJLFxuICAgICAgICB1cmk6IHB1YlNjb3JlVXJpXG4gICAgICB9XG4gICAgfSk7XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHNjb3JlTmV4dFBhZ2Uoc2Vzc2lvbiwgbmV4dFNlc3Npb24sIGV0YWcsIGFubm90YXRpb24sIHB1YlNjb3JlVXJpLCBwYWdlTnVtLCBNRUkpIHtcbiAgcmV0dXJuIChkaXNwYXRjaCkgPT4ge1xuICAgIGlmIChNRUkpIHtcbiAgICAgIC8vIGNvbnNvbGUubG9nKFwiQXR0ZW1wdGluZyB0byBhY3Rpb24gU0NPUkVfTkVYVF9QQUdFXCIpO1xuICAgICAgY29uc3QgYWN0aW9uID0ge1xuICAgICAgICB0eXBlOiBTQ09SRV9ORVhUX1BBR0UsXG4gICAgICAgIHBheWxvYWQ6IHtcbiAgICAgICAgICBwYWdlTnVtOiBwYWdlTnVtLFxuICAgICAgICAgIGRhdGE6IE1FSSxcbiAgICAgICAgICB1cmk6IHB1YlNjb3JlVXJpLFxuICAgICAgICAgIG5leHRTZXNzaW9uOiBuZXh0U2Vzc2lvblxuICAgICAgICB9XG4gICAgICB9O1xuICAgICAgZGlzcGF0Y2goXG4gICAgICAgICAgcGF0Y2hBbmRQcm9jZXNzQW5ub3RhdGlvbihhY3Rpb24sIHNlc3Npb24sIGV0YWcsIGFubm90YXRpb24pXG4gICAgICApO1xuICAgIH0gZWxzZSB7XG4gICAgICBkaXNwYXRjaCh7XG4gICAgICAgIHR5cGU6IEFOTk9UQVRJT05fTk9UX0hBTkRMRUQsXG4gICAgICAgIHBheWxvYWQ6IFwiUGFnZSBmbGlwIGF0dGVtcHRlZCBvbiBub24tZXhpc3RpbmcgTUVJLiBIYXMgaXQgbG9hZGVkIHlldD9cIlxuICAgICAgfSlcbiAgICB9XG4gIH1cbn1cblxuXG5leHBvcnQgZnVuY3Rpb24gc2NvcmVQcmV2UGFnZVN0YXRpYyhwdWJTY29yZVVyaSwgcGFnZU51bSwgTUVJKSB7XG4gIHJldHVybiAoZGlzcGF0Y2gpID0+IHtcbiAgICBkaXNwYXRjaCh7XG4gICAgICB0eXBlOiBTQ09SRV9QUkVWX1BBR0UsXG4gICAgICBwYXlsb2FkOiB7XG4gICAgICAgIHBhZ2VOdW06IHBhZ2VOdW0sXG4gICAgICAgIGRhdGE6IE1FSSxcbiAgICAgICAgdXJpOiBwdWJTY29yZVVyaVxuICAgICAgfVxuICAgIH0pO1xuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzY29yZVByZXZQYWdlKHNlc3Npb24sIG5leHRTZXNzaW9uLCBldGFnLCBhbm5vdGF0aW9uLCBwdWJTY29yZVVyaSwgcGFnZU51bSwgTUVJKSB7XG4gIHJldHVybiAoZGlzcGF0Y2gpID0+IHtcbiAgICBpZiAoTUVJKSB7XG4gICAgICBjb25zdCBhY3Rpb24gPSB7XG4gICAgICAgIHR5cGU6IFNDT1JFX1BSRVZfUEFHRSxcbiAgICAgICAgcGF5bG9hZDoge1xuICAgICAgICAgIHBhZ2VOdW06IHBhZ2VOdW0sXG4gICAgICAgICAgZGF0YTogTUVJLFxuICAgICAgICAgIHVyaTogcHViU2NvcmVVcmksXG4gICAgICAgICAgbmV4dFNlc3Npb246IG5leHRTZXNzaW9uXG4gICAgICAgIH1cbiAgICAgIH07XG4gICAgICBkaXNwYXRjaChcbiAgICAgICAgICBwYXRjaEFuZFByb2Nlc3NBbm5vdGF0aW9uKGFjdGlvbiwgc2Vzc2lvbiwgZXRhZywgYW5ub3RhdGlvbilcbiAgICAgICk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGRpc3BhdGNoKHtcbiAgICAgICAgdHlwZTogQU5OT1RBVElPTl9OT1RfSEFORExFRCxcbiAgICAgICAgcGF5bG9hZDogXCJQYWdlIGZsaXAgYXR0ZW1wdGVkIG9uIG5vbi1leGlzdGluZyBNRUkuIEhhcyBpdCBsb2FkZWQgeWV0P1wiXG4gICAgICB9KVxuICAgIH1cbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gdHJhbnNpdGlvblRvU2Vzc2lvbih0aGlzU2Vzc2lvbiwgbmV4dFNlc3Npb24pIHtcbiAgLy8gVE9ETyBkbyB0aGlzIHByb3Blcmx5IHVzaW5nIHJlYWN0LnJvdXRlciB0byBhdm9pZCBmdWxsIHJlbG9hZFxuICB3aW5kb3cubG9jYXRpb24uYXNzaWduKCc/c2Vzc2lvbj0nICsgbmV4dFNlc3Npb24pO1xuICByZXR1cm4ge1xuICAgIHR5cGU6IEFOTk9UQVRJT05fSEFORExFRFxuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiByZXNldE5leHRTZXNzaW9uVHJpZ2dlcigpIHtcbiAgcmV0dXJuIHtcbiAgICB0eXBlOiBSRVNFVF9ORVhUX1NFU1NJT05fVFJJR0dFUlxuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBwb3N0TmV4dFBhZ2VBbm5vdGF0aW9uKHNlc3Npb24sIGV0YWcpIHtcbiAgcmV0dXJuIChkaXNwYXRjaCkgPT4ge1xuICAgIGRpc3BhdGNoKFxuICAgICAgICBwb3N0QW5ub3RhdGlvbihzZXNzaW9uLCBldGFnLCBKU09OLnN0cmluZ2lmeSh7XG4gICAgICAgICAgXCJvYTpoYXNUYXJnZXRcIjoge1wiQGlkXCI6IHNlc3Npb259LFxuICAgICAgICAgIFwib2E6bW90aXZhdGVkQnlcIjoge1wiQGlkXCI6IFwibW90aXZhdGlvbjpuZXh0UGFnZU9yUGllY2VcIn1cbiAgICAgICAgfSkpXG4gICAgKVxuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBwb3N0UHJldlBhZ2VBbm5vdGF0aW9uKHNlc3Npb24sIGV0YWcpIHtcbiAgcmV0dXJuIChkaXNwYXRjaCkgPT4ge1xuICAgIGRpc3BhdGNoKFxuICAgICAgICBwb3N0QW5ub3RhdGlvbihzZXNzaW9uLCBldGFnLCBKU09OLnN0cmluZ2lmeSh7XG4gICAgICAgICAgXCJvYTpoYXNUYXJnZXRcIjoge1wiQGlkXCI6IHNlc3Npb259LFxuICAgICAgICAgIFwib2E6bW90aXZhdGVkQnlcIjoge1wiQGlkXCI6IFwibW90aXZhdGlvbjpwcmV2UGFnZU9yUGllY2VcIn1cbiAgICAgICAgfSkpXG4gICAgKVxuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBwb3N0QW5ub3RhdGlvbihzZXNzaW9uLCBldGFnLCBqc29uLCByZXRyaWVzID0gTUFYX1JFVFJJRVMsIGNhbGxiYWNrID0ge30pIHtcbiAgbGV0IHV1aWQgPSB1dWlkdjQoKTtcbiAgaWYocmV0cmllcyA9PT0gXCJcIikgeyBcbiAgICByZXRyaWVzID0gTUFYX1JFVFJJRVM7XG4gIH1cbiAgaWYoIShcImlkXCIgaW4ganNvbikgJiYgIShcIkBpZFwiIGluIGpzb24pKSB7IFxuICAgIC8vIGJvb3RzdHJhcCBhIFVVSUQgZm9yIHRoaXMgYW5ub3RhdGlvblxuICAgIGpzb25bXCJAaWRcIl0gPSBzZXNzaW9uICsgdXVpZCArIFwiLmpzb25sZFwiO1xuICB9XG5cbiAgcmV0dXJuIChkaXNwYXRjaCkgPT4ge1xuICAgIGlmIChyZXRyaWVzKSB7XG4gICAgICBjb25zb2xlLmxvZyhcIlBvc3RpbmcgYW5ub3RhdGlvbjogXCIsIHNlc3Npb24sIGV0YWcsIGpzb24pXG4gICAgICBhdXRoLmZldGNoKHNlc3Npb24sIHtcbiAgICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2xkK2pzb24nLCBcbiAgICAgICAgICAnSWYtTm9uZS1NYXRjaCc6IGV0YWcsXG4gICAgICAgICAgJ1NsdWcnOiB1dWlkICsgXCIuanNvbmxkXCJcbiAgICAgICAgfSxcbiAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoanNvbilcbiAgICAgIH0pLnRoZW4oIChyZXNwb25zZSkgPT4geyBcbiAgICAgICAgICB0eXBlb2YgY2FsbGJhY2sgPT09IFwiZnVuY3Rpb25cIiAmJiBjYWxsYmFjayhyZXNwb25zZSlcbiAgICAgIH0pLmNhdGNoKGZ1bmN0aW9uIChlcnJvcikge1xuICAgICAgICBpZighZXJyb3IucmVzcG9uc2Upe1xuICAgICAgICAgIGNvbnNvbGUubG9nKGVycm9yLCBcIkFubm90YXRpb24gcG9zdCBmYWlsZWQuIEdpdmluZyB1cC5cIik7XG4gICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHR5cGU6IEFOTk9UQVRJT05fTk9UX0hBTkRMRURcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGVycm9yLnJlc3BvbnNlLnN0YXR1cyA9PSA0MTIpIHtcbiAgICAgICAgICBjb25zb2xlLmxvZyhcIk1pZC1haXIgY29sbGlzaW9uIHdoaWxlIGF0dGVtcHRpbmcgdG8gUE9TVCBhbm5vdGF0aW9uLiBSZXRyeWluZy5cIiwgc2Vzc2lvbiwgZXRhZywganNvbik7XG4gICAgICAgICAgLy8gR0VUIHRoZSBzZXNzaW9uIHJlc291cmNlIHRvIGZpZ3VyZSBvdXQgbmV3IGV0YWdcbiAgICAgICAgICBhdXRoLmZldGNoKHNlc3Npb24pLnRoZW4oKHJlc3BvbnNlKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gKGRpc3BhdGNoKSA9PiB7XG4gICAgICAgICAgICAgIC8vIGFuZCB0cnkgYWdhaW5cbiAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgZGlzcGF0Y2gocG9zdEFubm90YXRpb24oc2Vzc2lvbiwgcmVzcG9uc2UuaGVhZGVycy5nZXQoJ2V0YWcnKSwganNvbiwgcmV0cmllcyAtIDEpKVxuICAgICAgICAgICAgICB9LCBSRVRSWV9ERUxBWSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgY29uc29sZS5sb2coXCJSZXRyeWluZy5cIik7XG4gICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICBkaXNwYXRjaChwb3N0QW5ub3RhdGlvbihzZXNzaW9uLCByZXNwb25zZS5oZWFkZXJzLmdldChldGFnKSwganNvbiwgcmV0cmllcyAtIDEpKVxuICAgICAgICAgIH0sIFJFVFJZX0RFTEFZKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG5cbiAgICAgIHJldHVybiB7XG4gICAgICAgIHR5cGU6IEFOTk9UQVRJT05fUE9TVEVEXG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnNvbGUubG9nKFwiRkFJTEVEIFRPIFBPU1QgQU5OT1RBVElPTiAoTUFYIFJFVFJJRVMgRVhDRUVERUQpOiBcIiwgc2Vzc2lvbiwgZXRhZywganNvbik7XG4gICAgICByZXR1cm4ge1xuICAgICAgICB0eXBlOiBBTk5PVEFUSU9OX05PVF9IQU5ETEVEXG4gICAgICB9XG4gICAgfVxuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBtYXJrQW5ub3RhdGlvblByb2Nlc3NlZChzZXNzaW9uLCBldGFnLCBhbm5vdGF0aW9uLCByZXRyaWVzID0gTUFYX1JFVFJJRVMpIHtcbiAgaWYgKHJldHJpZXMpIHtcbiAgICAvLyBjb25zb2xlLmxvZyhcIlBBVENISU5HOiBcIiwgc2Vzc2lvbiwgZXRhZywgYW5ub3RhdGlvbik7XG4gICAgY29uc3QgcGF0Y2hKc29uID0gSlNPTi5zdHJpbmdpZnkoe1xuICAgICAgXCJAaWRcIjogYW5ub3RhdGlvbltcIkBpZFwiXSxcbiAgICAgIFwibWVsZDpzdGF0ZVwiOiB7XCJAaWRcIjogXCJtZWxkOnByb2Nlc3NlZFwifVxuICAgIH0pO1xuICAgIGF4aW9zLnBhdGNoKFxuICAgICAgICBzZXNzaW9uLFxuICAgICAgICBwYXRjaEpzb24sXG4gICAgICAgIHtoZWFkZXJzOiB7J0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9sZCtqc29uJywgJ0lmLU5vbmUtTWF0Y2gnOiBldGFnfX1cbiAgICApLmNhdGNoKGZ1bmN0aW9uIChlcnJvcikge1xuICAgICAgaWYgKGVycm9yLnJlc3BvbnNlLnN0YXR1cyA9PSA0MTIpIHtcbiAgICAgICAgY29uc29sZS5sb2coXCJNaWQtYWlyIGNvbGxpc2lvbiB3aGlsZSBhdHRlbXB0aW5nIHRvIE1BUksgYW5ub3RhdGlvbiBwcm9jZXNzZWQuIFJldHJ5aW5nLlwiLCBzZXNzaW9uLCBldGFnLCBhbm5vdGF0aW9uKTtcbiAgICAgICAgLy8gR0VUIHRoZSBzZXNzaW9uIHJlc291cmNlIHRvIGZpZ3VyZSBvdXQgbmV3IGV0YWdcbiAgICAgICAgYXV0aC5mZXRjaChzZXNzaW9uKS50aGVuKChyZXNwb25zZSkgPT4ge1xuICAgICAgICAgIC8vIGFuZCB0cnkgYWdhaW5cbiAgICAgICAgICByZXR1cm4gKGRpc3BhdGNoKSA9PiB7XG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgZGlzcGF0Y2gobWFya0Fubm90YXRpb25Qcm9jZXNzZWQoc2Vzc2lvbiwgcmVzcG9uc2UuaGVhZGVycy5ldGFnLCBhbm5vdGF0aW9uLCByZXRyaWVzIC0gMSkpXG4gICAgICAgICAgICB9LCBSRVRSWV9ERUxBWSk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiRXJyb3Igd2hpbGUgcGF0Y2hpbmcgYW5ub3RhdGlvbjogXCIsIGVycm9yKTtcbiAgICAgICAgY29uc29sZS5sb2coXCJSZXRyeWluZy5cIik7XG4gICAgICAgIHJldHVybiAoZGlzcGF0Y2gpID0+IHtcbiAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgIGRpc3BhdGNoKG1hcmtBbm5vdGF0aW9uUHJvY2Vzc2VkKHNlc3Npb24sIHJlc3BvbnNlLmhlYWRlcnMuZXRhZywgYW5ub3RhdGlvbiwgcmV0cmllcyAtIDEpKVxuICAgICAgICAgIH0sIFJFVFJZX0RFTEFZKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pLnRoZW4oXCJEb25lP1wiKTtcblxuICAgIHJldHVybiB7XG4gICAgICB0eXBlOiBBTk5PVEFUSU9OX1BBVENIRURcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgY29uc29sZS5sb2coXCJGQUlMRUQgVE8gUEFUQ0ggQU5OT1RBVElPTiAoTUFYIFJFVFJJRVMgRVhDRUVERUQpOiBcIiwgc2Vzc2lvbiwgZXRhZywgYW5ub3RhdGlvbik7XG4gICAgcmV0dXJuIHtcbiAgICAgIHR5cGU6IEFOTk9UQVRJT05fTk9UX0hBTkRMRURcbiAgICB9XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHBhdGNoQW5kUHJvY2Vzc0Fubm90YXRpb24oYWN0aW9uLCBzZXNzaW9uLCBldGFnLCBhbm5vdGF0aW9uLCBzdWNjZXNzID0ge3R5cGU6IEFOTk9UQVRJT05fUEFUQ0hFRH0sIHJldHJpZXMgPSBNQVhfUkVUUklFUykge1xuICBpZiAocmV0cmllcykge1xuICAgIC8vIGNvbnNvbGUubG9nKFwiUEFUQ0hJTkc6IFwiLCBzZXNzaW9uLCBldGFnLCBhbm5vdGF0aW9uKTtcbiAgICBjb25zdCBwYXRjaEpzb24gPSBKU09OLnN0cmluZ2lmeSh7XG4gICAgICBcIkBpZFwiOiBhbm5vdGF0aW9uW1wiQGlkXCJdLFxuICAgICAgXCJtZWxkOnN0YXRlXCI6IHtcIkBpZFwiOiBcIm1lbGQ6cHJvY2Vzc2VkXCJ9XG4gICAgfSk7XG4gICAgcmV0dXJuIChkaXNwYXRjaCkgPT4ge1xuICAgICAgYXhpb3MucGF0Y2goXG4gICAgICAgICAgc2Vzc2lvbixcbiAgICAgICAgICBwYXRjaEpzb24sXG4gICAgICAgICAge2hlYWRlcnM6IHsnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2xkK2pzb24nLCAnSWYtTm9uZS1NYXRjaCc6IGV0YWd9fVxuICAgICAgKS50aGVuKGZ1bmN0aW9uIChyZXNwb25zZSkge1xuICAgICAgICAvLyBjb25zb2xlLmxvZyhcIkRpc3BhdGNoaW5nIGFjdGlvbjogXCIsIGFjdGlvbik7XG4gICAgICAgIGRpc3BhdGNoKGFjdGlvbik7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKFwiRGlzcGF0Y2hpbmcgc3VjY2VzcyBjYWxsYmFjazogXCIsIHN1Y2Nlc3MpXG4gICAgICAgIGRpc3BhdGNoKHN1Y2Nlc3MpO1xuICAgICAgfSkuY2F0Y2goZnVuY3Rpb24gKGVycm9yKSB7XG4gICAgICAgIGlmIChlcnJvci5yZXNwb25zZS5zdGF0dXMgPT0gNDEyKSB7XG4gICAgICAgICAgY29uc29sZS5sb2coXCJNaWQtYWlyIGNvbGxpc2lvbiB3aGlsZSBhdHRlbXB0aW5nIHRvIFBBVENIIGFubm90YXRpb24uIFJldHJ5aW5nLlwiLCBzZXNzaW9uLCBldGFnLCBhbm5vdGF0aW9uKTtcbiAgICAgICAgICAvLyBHRVQgdGhlIHNlc3Npb24gcmVzb3VyY2UgdG8gZmlndXJlIG91dCBuZXcgZXRhZ1xuICAgICAgICAgIGF1dGguZmV0Y2goc2Vzc2lvbikudGhlbigocmVzcG9uc2UpID0+IHtcbiAgICAgICAgICAgIC8vIGFuZCB0cnkgYWdhaW5cbiAgICAgICAgICAgIHJldHVybiAoZGlzcGF0Y2gpID0+IHtcbiAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgZGlzcGF0Y2gocGF0Y2hBbmRQcm9jZXNzQW5ub3RhdGlvbihhY3Rpb24sIHNlc3Npb24sIHJlc3BvbnNlLmhlYWRlcnMuZXRhZywgYW5ub3RhdGlvbiwgc3VjY2VzcywgcmV0cmllcyAtIDEpKVxuICAgICAgICAgICAgICB9LCBSRVRSWV9ERUxBWSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgY29uc29sZS5sb2coXCJFcnJvciB3aGlsZSBwYXRjaGluZyBhbm5vdGF0aW9uOiBcIiwgZXJyb3IpO1xuICAgICAgICAgIGNvbnNvbGUubG9nKFwiUmV0cnlpbmcuXCIpO1xuICAgICAgICAgIHJldHVybiAoZGlzcGF0Y2gpID0+IHtcbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICBkaXNwYXRjaChwYXRjaEFuZFByb2Nlc3NBbm5vdGF0aW9uKGFjdGlvbiwgc2Vzc2lvbiwgcmVzcG9uc2UuaGVhZGVycy5ldGFnLCBhbm5vdGF0aW9uLCBzdWNjZXNzLCByZXRyaWVzIC0gMSkpXG4gICAgICAgICAgICB9LCBSRVRSWV9ERUxBWSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgY29uc29sZS5sb2coXCJGQUlMRUQgVE8gUEFUQ0ggQU5OT1RBVElPTiAoTUFYIFJFVFJJRVMgRVhDRUVERUQpOiBcIiwgc2Vzc2lvbiwgZXRhZywgYW5ub3RhdGlvbik7XG4gICAgcmV0dXJuIHtcbiAgICAgIHR5cGU6IEFOTk9UQVRJT05fTk9UX0hBTkRMRURcbiAgICB9XG4gIH1cbn1cblxuXG5leHBvcnQgZnVuY3Rpb24gdXBkYXRlTXV6aWNvZGVzKG11emljb2Rlc1VyaSwgc2Vzc2lvbiwgbWVpID0gXCJcIikge1xuICAvLyBpbmZvcm0gdGhlIG11emljb2RlcyBzZXJ2aWNlIHRoYXQgb3VyIHNlc3Npb24gaGFzIGxvYWRlZFxuICAvLyBjb25zb2xlLmxvZyhcIlVwZGF0aW5nIG11emljb2RlczpcIiwgbXV6aWNvZGVzVXJpLCBzZXNzaW9uKTtcbiAgY29uc3QgcGFyYW1zID0gcXVlcnlzdHJpbmcuc3RyaW5naWZ5KHtcbiAgICBcIm5hbWVcIjogXCJtZWxkLmxvYWRcIixcbiAgICBcIm1lbGRjb2xsZWN0aW9uXCI6IHNlc3Npb24sXG4gICAgXCJtZWxkbWVpXCI6IG1laVxuICB9KTtcblxuICBhdXRoLmZldGNoKG11emljb2Rlc1VyaSwgcGFyYW1zKTtcbiAgcmV0dXJuICh7XG4gICAgdHlwZTogTVVaSUNPREVTX1VQREFURURcbiAgfSlcbn1cblxuLy8gaGVscGVyIGZ1bmN0aW9uIHRvIGVuc3VyZSB0aGF0IGEgZ2l2ZW4ga2V5IG9mIGEgSlNPTiBvYmpcbi8vIGlzIGFuIGFycmF5LCByYXRoZXIgdGhhbiBhIHNpbmdsZSB2YWx1ZVxuLy8gdGhpcyBpcyBzbyB0aGF0IHdlIGNhbiB1c2UgdGhlIHNhbWUgYXBwcm9hY2ggZm9yIG9uZSBhbmQgZm9yXG4vLyBtYW55IHZhbHVlc1xuZXhwb3J0IGZ1bmN0aW9uIGVuc3VyZUFycmF5KHRoZU9iaiwgdGhlS2V5KSB7XG4gIGlmICh0aGVPYmogIT09IG51bGwgJiYgdHlwZW9mIHRoZU9iaiA9PT0gJ29iamVjdCcpIHtcbiAgICBpZiAoIXRoZUtleSBpbiB0aGVPYmopIHtcbiAgICAgIGNvbnNvbGUubG9nKFwiZW5zdXJlQXJyYXk6IEtFWSBOT1QgSU4gT0JKRUNUIVwiLCB0aGVLZXksIHRoZU9iaik7XG4gICAgfSBlbHNlIGlmICghQXJyYXkuaXNBcnJheSh0aGVPYmpbdGhlS2V5XSkpIHtcbiAgICAgIHRoZU9ialt0aGVLZXldID0gW3RoZU9ialt0aGVLZXldXTtcbiAgICB9XG4gICAgcmV0dXJuIHRoZU9iajtcbiAgfSBlbHNlIHtcbiAgICBjb25zb2xlLmxvZyhcImVuc3VyZUFycmF5OiBQcm92aWRlZCBzdHJ1Y3R1cmUgaXMgTk9UIEFOIE9CSkVDVCFcIilcbiAgfVxufVxuXG5cbi8vIEZ1bmN0aW9uIHRvIHNldCB1cCB0aGUgb2JqZWN0aXZlcyAob2JqZWN0cyBjb250YWluaW5nIEpTT04tTEQgZnJhbWVzKVxuLy8gbWF0Y2hlZCBhZ2FpbnN0IHRoZSBncmFwaCBiZWluZyBidWlsdCBkdXJpbmcgYSB0cmF2ZXJzYWwuXG4vLyBUeXBpY2FsbHkgY2FsbGVkIG9uY2UsIG9uIGNvbXBvbmVudFdpbGxNb3VudFxuZXhwb3J0IGZ1bmN0aW9uIGNvbmZpZ3VyZVRyYXZlcnNhbE9iamVjdGl2ZXMob2JqZWN0aXZlcykge1xuICByZXR1cm4ge1xuICAgIHR5cGU6IFNFVF9UUkFWRVJTQUxfT0JKRUNUSVZFUyxcbiAgICBwYXlsb2FkOiBvYmplY3RpdmVzXG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZVNlc3Npb24oc2Vzc2lvbnNVcmksIHNjb3JlVXJpLCB7c2Vzc2lvbiA9IFwiXCIsIGV0YWcgPSBcIlwiLCByZXRyaWVzID0gTUFYX1JFVFJJRVMsIHBlcmZvcm1lclVyaSA9IFwiXCIsIHNsdWcgPSBcIlwifSA9IHt9KSB7XG4gIHJldHVybiAoZGlzcGF0Y2gpID0+IHtcbiAgICBpZiAocmV0cmllcykge1xuICAgICAgLy8gY29uc29sZS5sb2coXCJUcnlpbmcgdG8gY3JlYXRlIHNlc3Npb246IFwiLCBzZXNzaW9uc1VyaSwgc2NvcmVVcmksIGV0YWcsIHJldHJpZXMsIHBlcmZvcm1lclVyaSk7XG4gICAgICBhdXRoLmZldGNoKHNlc3Npb25zVXJpKS50aGVuKChnZXRSZXNwb25zZSkgPT4ge1xuICAgICAgICBheGlvcy5wb3N0KFxuICAgICAgICAgICAgc2Vzc2lvbnNVcmksXG4gICAgICAgICAgICBKU09OLnN0cmluZ2lmeSh7XG4gICAgICAgICAgICAgIFwiQHR5cGVcIjogW1wibW86UGVyZm9ybWFuY2VcIiwgXCJsZHA6QmFzaWNDb250YWluZXJcIl0sXG4gICAgICAgICAgICAgIFwibW86cGVyZm9ybWFuY2Vfb2ZcIjoge1wiQGlkXCI6IHNjb3JlVXJpfVxuICAgICAgICAgICAgfSksXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgICAgICAgICBcIkNvbnRlbnQtVHlwZVwiOiBcImFwcGxpY2F0aW9uL2xkK2pzb25cIixcbiAgICAgICAgICAgICAgICBcIklmLU5vbmUtTWF0Y2hcIjogZ2V0UmVzcG9uc2UuaGVhZGVycy5ldGFnLFxuICAgICAgICAgICAgICAgIFwiU2x1Z1wiOiBzbHVnXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgKS50aGVuKChwb3N0UmVzcG9uc2UpID0+IHtcbiAgICAgICAgICAvLyAxLk5vdGUgdGhhdCB3ZSd2ZSBjcmVhdGVkIHRoZSBzZXNzaW9uXG4gICAgICAgICAgLy8gKGZvciByZWFsLXRpbWUgY2xpZW50LXNpZGUgcXVldWVpbmcpXG4gICAgICAgICAgZGlzcGF0Y2goe1xuICAgICAgICAgICAgdHlwZTogQ1JFQVRFX1NFU1NJT04sXG4gICAgICAgICAgICBwYXlsb2FkOiBwb3N0UmVzcG9uc2VcbiAgICAgICAgICB9KTtcbiAgICAgICAgICAvLyAyLklmIHdlJ3ZlIGJlZW4gY2FsbGVkIGluc2lkZSBhIHNlc3Npb24gY29udGV4dCxcbiAgICAgICAgICAvLyBwb3N0IGEgY29ycmVzcG9uZGluZyBxdWV1ZSBhbm5vdGF0aW9uXG4gICAgICAgICAgLy8gKGZvciBsYXRlciBzdGF0aWMgcmV2aXNpdHMsIGUuZy4gaW4gYXJjaGl2ZSlcbiAgICAgICAgICBpZiAoc2Vzc2lvbikge1xuICAgICAgICAgICAgZGlzcGF0Y2goXG4gICAgICAgICAgICAgICAgcG9zdEFubm90YXRpb24oXG4gICAgICAgICAgICAgICAgICAgIHNlc3Npb24sXG4gICAgICAgICAgICAgICAgICAgIGV0YWcsXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICBcIm9hOmhhc1RhcmdldFwiOiB7XCJAaWRcIjogc2Vzc2lvbn0sXG4gICAgICAgICAgICAgICAgICAgICAgXCJvYTptb3RpdmF0ZWRCeVwiOiB7XCJAaWRcIjogXCJtb3RpdmF0aW9uOnF1ZXVlTmV4dFNlc3Npb25cIn0sXG4gICAgICAgICAgICAgICAgICAgICAgXCJvYTpoYXNCb2R5XCI6IHtcIkBpZFwiOiBwb3N0UmVzcG9uc2UuaGVhZGVycy5sb2NhdGlvbn1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgIClcbiAgICAgICAgICB9XG4gICAgICAgIH0pLmNhdGNoKGZ1bmN0aW9uIChlcnJvcikge1xuICAgICAgICAgIGlmIChlcnJvci5yZXNwb25zZS5zdGF0dXMgPT0gNDEyKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIk1pZC1haXIgY29sbGlzaW9uIHdoaWxlIGF0dGVtcHRpbmcgdG8gUE9TVCBhbm5vdGF0aW9uLiBSZXRyeWluZy5cIik7XG4gICAgICAgICAgICBkaXNwYXRjaCgoKSA9PiB7XG4gICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICAgIGRpc3BhdGNoKGNyZWF0ZVNlc3Npb24oc2Vzc2lvbnNVcmksIHNjb3JlVXJpLCB7XG4gICAgICAgICAgICAgICAgICBldGFnOiBnZXRSZXNwb25zZS5oZWFkZXJzLmV0YWcsXG4gICAgICAgICAgICAgICAgICByZXRyaWVzOiByZXRyaWVzIC0gMSxcbiAgICAgICAgICAgICAgICAgIHBlcmZvcm1lclVyaTogcGVyZm9ybWVyVXJpLFxuICAgICAgICAgICAgICAgICAgc2x1Zzogc2x1Z1xuICAgICAgICAgICAgICAgIH0pKVxuICAgICAgICAgICAgICB9LCBSRVRSWV9ERUxBWSk7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIkVycm9yIHdoaWxlIGNyZWF0aW5nIHNlc3Npb246IFwiLCBlcnJvcik7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIlJldHJ5aW5nLlwiKTtcbiAgICAgICAgICAgIGRpc3BhdGNoKCgpID0+IHtcbiAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgZGlzcGF0Y2goY3JlYXRlU2Vzc2lvbihzZXNzaW9uc1VyaSwgc2NvcmVVcmksIHtcbiAgICAgICAgICAgICAgICAgIGV0YWc6IGdldFJlc3BvbnNlLmhlYWRlcnMuZXRhZyxcbiAgICAgICAgICAgICAgICAgIHJldHJpZXM6IHJldHJpZXMgLSAxLFxuICAgICAgICAgICAgICAgICAgcGVyZm9ybWVyVXJpOiBwZXJmb3JtZXJVcmksXG4gICAgICAgICAgICAgICAgICBzbHVnOiBzbHVnXG4gICAgICAgICAgICAgICAgfSkpXG4gICAgICAgICAgICAgIH0sIFJFVFJZX0RFTEFZKTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgfSlcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc29sZS5sb2coXCJGQUlMRUQgVE8gQ1JFQVRFIFNFU1NJT04gKE1BWCBSRVRSSUVTIEVYQ0VFREVEKTogXCIsIHNlc3Npb25zVXJpLCBzY29yZVVyaSwgcmVzcG9uc2UuaGVhZGVycy5ldGFnLCByZXRyaWVzIC0gMSwgcGVyZm9ybWVyVXJpKTtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIHR5cGU6IFNFU1NJT05fTk9UX0NSRUFURURcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHRpY2tUaW1lZFJlc291cmNlKHJlc291cmNlVXJpLCB0aW1lKSB7XG4gIHJldHVybiB7XG4gICAgdHlwZTogVElDSyxcbiAgICBwYXlsb2FkOiB7XG4gICAgICB1cmk6IHJlc291cmNlVXJpLFxuICAgICAgdGltZTogdGltZVxuICAgIH1cbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gcmVnaXN0ZXJDbG9jayhjbG9ja1VyaSkge1xuICByZXR1cm4ge1xuICAgIHR5cGU6IFwiUkVHSVNURVJfQ0xPQ0tcIixcbiAgICBwYXlsb2FkOiBjbG9ja1VyaVxuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiB1cGRhdGVMYXRlc3RSZW5kZXJlZFBhZ2VOdW0ocGFnZU51bSkge1xuICByZXR1cm4ge1xuICAgIHR5cGU6IFwiVVBEQVRFX0xBVEVTVF9SRU5ERVJFRF9QQUdFTlVNXCIsXG4gICAgcGF5bG9hZDogcGFnZU51bVxuICB9XG59XG4iXX0=