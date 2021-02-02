"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setScoreReducerVerovioOptions = setScoreReducerVerovioOptions;
exports.ScoreReducer = ScoreReducer;

var _immutabilityHelper = _interopRequireDefault(require("immutability-helper"));

var _index = require("../actions/index");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var EMBODIMENT = 'frbr:embodiment';
var MEITYPE = 'meld:MEIEmbodiment';
var AUDIOTYPE = 'meld:AudioEmbodiment';
var TEITYPE = 'meld:TEIEmbodiment';
var MEMBER = 'rdfs:member';
var scale = 35;
var conceptualScore;
var vrvOptions = {
  // override these defaults from your MELD app using
  // setScoreReducerVerovioOptions (below)
  ignoreLayout: 1,
  adjustPageHeight: 1,
  scale: scale,
  pageHeight: 1000 * 100 / scale,
  pageWidth: 700 * 100 / scale
};

function setScoreReducerVerovioOptions(options) {
  vrvOptions = options;
}

function ScoreReducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {
    publishedScores: {},
    conceptualScores: {},
    MEI: {},
    SVG: {},
    componentTargets: {},
    scoreMapping: {},
    pageNum: 1,
    latestRenderedPageNum: 0,
    pageCount: 0,
    triggerNextSession: "",
    triggerPrevSession: "",
    vrvTk: new verovio.toolkit()
  };
  var action = arguments.length > 1 ? arguments[1] : undefined;
  var svg;
  var pageCount = state.vrvTk.getPageCount();

  switch (action.type) {
    case _index.FETCH_SCORE:
      // In the past, we rendered scores pre-emptively, but there's
      // nothing to say that this score will ever be drawn, and doing
      // it here puts all the processing up front. For multiple
      // scores, it's noticably slow.
      console.log("FETCH_SCORE: ", action);
      svg = false && state.vrvTk.renderData(action.payload.data, vrvOptions);

      if ("config" in action.payload) {
        return (0, _immutabilityHelper["default"])(state, {
          SVG: {
            $merge: _defineProperty({}, action.payload.config.url, svg)
          },
          MEI: {
            $merge: _defineProperty({}, action.payload.config.url, action.payload.data)
          },
          pageNum: {
            $set: 1
          },
          pageCount: {
            $set: pageCount
          }
        });
      } else {
        console.error("Problem fetching score: ", action);
        return state;
      }

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
      if (!action.payload.data) {
        console.log("SCORE_NEXT_PAGE attempted on non-loaded MEI data - ignoring!");
        return state;
      }

      console.log("Page count: ", pageCount);
      console.log("Page num: ", action.payload.pageNum);
      console.log("URI: ", action.payload.uri);

      if (action.payload.pageNum === pageCount) {
        // we've left the last page, set up a transfer to the next session
        // console.log("TRIGGERING")
        return (0, _immutabilityHelper["default"])(state, {
          triggerNextSession: {
            $set: true
          }
        });
      } else {
        return (0, _immutabilityHelper["default"])(state, {
          //SVG: { $merge: { [action.payload.uri]: svg } }, -- DW merge -> set 20170722
          SVG: {
            $set: _defineProperty({}, action.payload.uri, svg)
          },
          pageNum: {
            $set: action.payload.pageNum + 1
          },
          pageCount: {
            $set: pageCount
          }
        });
      }

    case _index.SCORE_PREV_PAGE:
      if (!action.payload.data) {
        console.log("SCORE_PREV_PAGE attempted on non-loaded MEI data - ignoring!");
        return state;
      }

      console.log("Page count: ", pageCount);
      console.log("Page num: ", action.payload.pageNum);
      console.log("URI: ", action.payload.uri);

      if (action.payload.pageNum === 0) {
        // we've left the first page, go back in history (to previous session)
        // TODO do this within react-router
        console.log("SCORE_PREV_PAGE attempted on first page -- go back to previous session!");
        return (0, _immutabilityHelper["default"])(state, {
          triggerPrevSession: {
            $set: true
          }
        });
      } else {
        return (0, _immutabilityHelper["default"])(state, {
          //SVG: { $merge: { [action.payload.uri]: svg } }, -- DW merge -> set 20170722
          SVG: {
            $set: _defineProperty({}, action.payload.uri, svg)
          },
          pageNum: {
            $set: action.payload.pageNum - 1
          },
          pageCount: {
            $set: pageCount
          }
        });
      }

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

      return (0, _immutabilityHelper["default"])(state, {
        SVG: {
          $set: _defineProperty({}, action.payload.uri, svg)
        },
        pageNum: {
          $set: pageNum
        }
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