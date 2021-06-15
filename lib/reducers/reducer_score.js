"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ScoreReducer = ScoreReducer;

var _immutabilityHelper = _interopRequireDefault(require("immutability-helper"));

var _index = require("../actions/index");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var EMBODIMENT = 'frbr:embodiment';
var MEITYPE = 'meld:MEIEmbodiment';
var AUDIOTYPE = 'meld:AudioEmbodiment';
var TEITYPE = 'meld:TEIEmbodiment';
var MEMBER = 'rdfs:member';
var conceptualScore;

function retrieveOrGenerateSVG(data, state, url, pageNum, options) {
  // We can use the previously cached SVG if:
  // 1. We already have SVG rendered for this URI
  // 2. We already have SVG rendered for this page number
  // 3. We rendered it with these options
  if (url in state.pageState && url in state.SVG && pageNum in state.SVG[url] && JSON.stringify(state.SVG[url][pageNum].options) === JSON.stringify(options)) {
    // we can reuse the cached SVG!
    console.log("Score reducer: Reusing SVG for ".concat(url, " page ").concat(pageNum));
    return state.SVG[url][pageNum].data;
  } else {
    // we need to generate SVG!
    // is the MEI file currently loaded into Verovio?
    if (url !== state.currentlyLoadedIntoVrv) {
      // no -- so set our options, and then load it
      state.vrvTk.setOptions(options);
      state.vrvTk.loadData(data);
    } // have we loaded this page before?


    if (url in state.SVG && pageNum in state.SVG[url]) {
      // yes. Options must have changed, or we would have returned above.
      // So, redo layout to take account of new options
      state.vrvTk.setOptions(options);
      state.vrvTk.redoLayout();
    } // now render the page and return the SVG


    return state.vrvTk.renderToSVG(pageNum, options);
  }
}

function retrieveOptions(options, url, currentPage, state) {
  var opts;

  if (_typeof(options) === "object") {
    // use options object if supplied with action
    opts = options;
  } else if (url in state.SVG && currentPage in state.SVG[url]) {
    // otherwise if we've previously rendered this page, use those options
    opts = state.SVG[url][currentPage].options;
  } else {
    opts = state.options; // or as fallback, use defaults
  }

  return opts;
}

function ScoreReducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {
    currentlyLoadedIntoVrv: null,
    publishedScores: {},
    conceptualScores: {},
    MEI: {},
    SVG: {},
    pageState: {},
    componentTargets: {},
    scoreMapping: {},
    pageNum: 1,
    latestRenderedPageNum: 0,
    pageCount: 0,
    triggerNextSession: "",
    triggerPrevSession: "",
    vrvTk: null,
    //delay this until loaded: vrvTk: new verovio.toolkit(),
    options: {
      // default, unless overridden in FETCH_SCORE or SCORE_SET_OPTIONS
      ignoreLayout: 1,
      adjustPageHeight: 1,
      scale: 35,
      pageHeight: 1000 * 100 / 35,
      pageWidth: 700 * 100 / 35
    }
  };
  var action = arguments.length > 1 ? arguments[1] : undefined;
  var svg;
  var url;
  var currentPage;
  var options; // const pageCount = state.vrvTk.getPageCount();
  // Delay initializing state.vrvTk until action is required.
  // NOTE: reducers are pure functions, and must not mutate the supplied state value.
  //       This code creates a new state value with an updated toolkit reference, and then
  //       assigns that to the local 'state' parameter variable.
  //
  //       Cleaner code would use a new variable for the updated state value, and use that 
  //       consistently through the rest of the function @@TODO@@
  //

  if (!state.vrvTk) {
    // See: https://stackoverflow.com/questions/9107240
    var globalscope = function () {
      return this || (1, eval)('this');
    }();

    var vrvTk = new globalscope.verovio.toolkit();
    console.log("reducer_score.ScoreReducer: initialize state.vrvTk: verovio " + verovio + ", vrvTk " + vrvTk);
    state = (0, _immutabilityHelper["default"])(state, {
      vrvTk: {
        "$set": vrvTk
      }
    });
  }

  switch (action.type) {
    case _index.FETCH_SCORE:
      console.log("reducer_score action FETCH_SCORE: state.vrvTk " + state.vrvTk);
      url = action.payload.config.url;
      currentPage = url in state.pageState ? state.pageState[url].currentPage : 1; // set options:

      options = retrieveOptions(action.payload.config.options, url, currentPage, state); // We can use a previously cached SVG if:
      // 1. We already have SVG rendered for this URI
      // 2. We already have SVG rendered for this page number
      // 3. We already have SVG rendered for these options

      svg = retrieveOrGenerateSVG(action.payload.data, state, url, currentPage, options);
      return (0, _immutabilityHelper["default"])(state, {
        currentlyLoadedIntoVrv: {
          $set: url
        },
        SVG: _defineProperty({}, url, {
          $set: _defineProperty({}, currentPage, {
            data: svg,
            options: options
          })
        }),
        MEI: {
          $merge: _defineProperty({}, url, action.payload.data)
        },
        pageState: _defineProperty({}, url, {
          $set: {
            currentPage: currentPage,
            pageCount: state.vrvTk.getPageCount(),
            currentOptions: options
          }
        })
      });

    case _index.FETCH_RIBBON_CONTENT:
      /*		var orch =  new Orchestration(action.payload.data);
          var svgRibbon = orch.drawOrchestration(false, 0, 400, 0, 600);
          return update(state, {MEI: { $merge: {[action.payload.config.url]: svgRibbon.outerHTML}}});*/
      var data = action.payload.data;
      if (!state.MEIfile) state.MEIfile = {};
      return (0, _immutabilityHelper["default"])(state, {
        MEIfile: {
          $merge: _defineProperty({}, action.payload.config.url, action.payload.data)
        }
      });

    case _index.FETCH_MANIFESTATIONS:
      // console.log("IN FETCH_MANIFESTATIONS, payload is: ", action.payload)
      var target = action.payload.target;
      var part = action.payload.part;

      if (typeof part === "undefined") {
        // part wasn't on segment line
        return state;
      }

      var fragments = {}; // go through each part, finding embodibags

      if (EMBODIMENT in part) {
        if (!Array.isArray(part[EMBODIMENT])) {
          part[EMBODIMENT] = [part[EMBODIMENT]];
        }

        part[EMBODIMENT].map(function (embodiment) {
          // go through each embodiment
          if (MEMBER in embodiment) {
            var fragtype; // extract set of fragments
            // we want to separate out different types of media fragments

            if (!Array.isArray(embodiment["@type"])) {
              embodiment["@type"] = [embodiment["@type"]];
            }

            if (!Array.isArray(target["@type"])) {
              target["@type"] = [target["@type"]];
            }

            if (embodiment["@type"].includes(MEITYPE)) {
              fragtype = "MEI";
            } else if (embodiment["@type"].includes(AUDIOTYPE)) {
              fragtype = "Audio";
            } else if (embodiment["@type"].includes(TEITYPE)) {
              fragtype = "TEI";
            } else {
              console.log("Score Reducer: Embodiment with unknown type", embodiment);
            }

            if (!Array.isArray(embodiment[MEMBER])) {
              embodiment[MEMBER] = [embodiment[MEMBER]];
            }

            fragments[fragtype] = fragments[fragtype] || [];
            fragments[fragtype] = fragments[fragtype].concat(embodiment[MEMBER].map(function (member) {
              return member["@id"];
            }));
            fragments["description"] = target["rdfs:label"];

            if (target["@type"].includes("meld:Muzicode")) {
              fragments["muzicodeType"] = target["mc:type"];
              fragments["cue"] = target["climb:cue"];
            }
          } else {
            console.log("Embodiment without members: ", part, embodiment);
          }
        }); // console.log("Updating state: ");
        // console.log( update(state, {componentTargets: { $merge: { [target["@id"]]: fragments } } }));

        return (0, _immutabilityHelper["default"])(state, {
          componentTargets: {
            $merge: _defineProperty({}, target["@id"], fragments)
          }
        });
      }

      console.log("FETCH_MANIFESTATIONS: Unembodied target! ", target);
      return state;

    case _index.FETCH_CONCEPTUAL_SCORE:
      var cS = action.payload; //return update(state, {publishedScores: { $push: [conceptualScore[PUBLISHED_AS]["@id"]] } });

      return (0, _immutabilityHelper["default"])(state, {
        publishedScores: {
          $set: _defineProperty({}, cS["mo:published_as"]["@id"], cS["@id"])
        }
      });

    case _index.FETCH_COMPONENT_TARGET:
      // ensure that our structure target collection is an array, then push this one in
      conceptualScore = action.payload.conceptualScore; // make sure we have an entry for this conceptual score, and that its value is an array

      var newState = (0, _immutabilityHelper["default"])(state, {
        conceptualScores: {
          $merge: _defineProperty({}, action.payload.conceptualScore, state['conceptualScores'][action.payload.conceptualScore] || [])
        }
      }); // if this is a new structure target, push it in

      if (!newState['conceptualScores'][action.payload.conceptualScore].includes(action.payload.structureTarget)) {
        newState = (0, _immutabilityHelper["default"])(newState, {
          conceptualScores: _defineProperty({}, action.payload.conceptualScore, {
            $push: [action.payload.structureTarget]
          })
        });
      }

      return newState;

    case _index.SCORE_NEXT_PAGE:
      url = action.payload.uri;

      if (!action.payload.data) {
        console.log("SCORE_NEXT_PAGE attempted on non-loaded MEI data - ignoring!");
        return state;
      }

      if (action.payload.pageNum !== state.pageState[url].currentPage) {
        console.warn("Mismatch in page numbers: received ".concat(action.payload.pageNum, " expected ").concat(state.pageState[url].currentPage));
      }

      if (action.payload.pageNum === state.vrvTk.getPageCount()) {
        // we've left the last page, set up a transfer to the next session
        // console.log("TRIGGERING")
        console.info("Attempted SCORE_NEXT_PAGE while on last page of score");
        return (0, _immutabilityHelper["default"])(state, {
          triggerNextSession: {
            $set: true
          }
        });
      } else {
        options = retrieveOptions(state.pageState[url].currentOptions, url, state.pageState.currentPage, state);
        svg = retrieveOrGenerateSVG(state.MEI[url], state, url, action.payload.pageNum + 1, options);
        return (0, _immutabilityHelper["default"])(state, {
          SVG: _defineProperty({}, url, {
            $merge: _defineProperty({}, action.payload.pageNum + 1, {
              data: svg,
              options: options
            })
          }),
          pageState: _defineProperty({}, url, {
            $set: {
              currentPage: action.payload.pageNum + 1,
              pageCount: state.vrvTk.getPageCount(),
              currentOptions: options
            }
          })
        });
      }

    case _index.SCORE_PREV_PAGE:
      url = action.payload.uri;

      if (!action.payload.data) {
        console.log("SCORE_PREV_PAGE attempted on non-loaded MEI data - ignoring!");
        return state;
      }

      if (action.payload.pageNum !== state.pageState[url].currentPage) {
        console.warn("Mismatch in page numbers: received ".concat(action.payload.pageNum, " expected ").concat(state.pageState[url].currentPage));
      }

      if (action.payload.pageNum === 1) {
        // we're on the first page, go back to previous session
        // console.log("TRIGGERING")
        console.info("Attempted SCORE_PREV_PAGE while on first page of score");
        return (0, _immutabilityHelper["default"])(state, {
          triggerPrevSession: {
            $set: true
          }
        });
      } else {
        options = retrieveOptions(state.pageState[url].currentOptions, url, state.pageState.currentPage, state);
        svg = retrieveOrGenerateSVG(state.MEI[url], state, url, action.payload.pageNum - 1, options);
        return (0, _immutabilityHelper["default"])(state, {
          SVG: _defineProperty({}, url, {
            $merge: _defineProperty({}, action.payload.pageNum - 1, {
              data: svg,
              options: options
            })
          }),
          pageState: _defineProperty({}, url, {
            $set: {
              currentPage: action.payload.pageNum - 1,
              pageCount: state.vrvTk.getPageCount(),
              currentOptions: options
            }
          })
        });
      }

    case _index.SCORE_SET_OPTIONS:
      url = action.payload.uri;
      currentPage = url in state.pageState && "currentPage" in state.pageState[url] ? state.pageState[url].currentPage : 1;
      svg = retrieveOrGenerateSVG(state.MEI[url], state, url, currentPage, action.payload.options);
      return (0, _immutabilityHelper["default"])(state, {
        options: {
          $set: action.payload.options
        },
        currentlyLoadedIntoVrv: {
          $set: url
        },
        SVG: _defineProperty({}, url, {
          $set: _defineProperty({}, currentPage, {
            data: svg,
            options: action.payload.options
          })
        }),
        pageState: _defineProperty({}, url, {
          $set: {
            currentPage: currentPage,
            pageCount: state.vrvTk.getPageCount(),
            currentOptions: options
          }
        })
      });

    case _index.TRANSITION_TO_NEXT_SESSION:
      // console.log("forcing transition to next session if queued");
      return (0, _immutabilityHelper["default"])(state, {
        triggerNextSession: {
          $set: true
        }
      });

    case _index.SCORE_PAGE_TO_TARGET:
      if (!action.payload.data) {
        console.log("SCORE_PAGE_TO_TARGET attempted on non-loaded MEI data - ignoring!");
        return state;
      }

      var frag = action.payload.target.split("#")[1];
      var pageNum = state.vrvTk.getPageWithElement(frag);

      if (pageNum === 0) {
        console.log("SCORE_PAGE_TO_TARGET attempted on a target that doesn't exist in the MEI - ignoring!", frag);
        return state;
      }

      url = action.payload.uri;
      options = retrieveOptions(state.pageState[url].currentOptions, url, pageNum, state);
      svg = retrieveOrGenerateSVG(state.MEI[url], state, url, pageNum, options);
      return (0, _immutabilityHelper["default"])(state, {
        SVG: _defineProperty({}, url, {
          $merge: _defineProperty({}, pageNum, {
            data: svg,
            options: options
          })
        }),
        pageState: _defineProperty({}, url, {
          $set: {
            currentPage: pageNum,
            pageCount: state.vrvTk.getPageCount(),
            currentOptions: options
          }
        })
      });

    case _index.REGISTER_PUBLISHED_PERFORMANCE_SCORE:
      // console.log("Register published performance score: ", action.payload, "on state: ", state);
      if (action.payload.conceptualScore["@id"] in state.scoreMapping) {
        // we already know this conceptual score
        // do we already know about the published score for this performance medium?
        if (action.payload.performanceMedium["@id"] in state.scoreMapping[action.payload.publishedScore["@id"]]) {
          // yes; so nothing to do. FIXME: should we cater for multiple published scores for same performance medium?
          return state;
        } else {
          // no; so register the published score for this new performance medium
          return (0, _immutabilityHelper["default"])(state, {
            scoreMapping: _defineProperty({}, action.payload.publishedScore["@id"], {
              $merge: _defineProperty({}, action.payload.performanceMedium["@id"], action.payload.conceptualScore["@id"])
            })
          });
        }
      } else {
        // first time we see this conceptual score
        // so attach the published score according to performance medium
        return (0, _immutabilityHelper["default"])(state, {
          scoreMapping: {
            $merge: _defineProperty({}, action.payload.publishedScore["@id"], _defineProperty({}, action.payload.performanceMedium["@id"], action.payload.conceptualScore["@id"]))
          }
        });
      }

    case _index.UPDATE_LATEST_RENDERED_PAGENUM:
      return (0, _immutabilityHelper["default"])(state, {
        latestRenderedPageNum: {
          $set: action.payload
        }
      });

    default:
      return state;
  }
}