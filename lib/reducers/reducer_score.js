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
    //vrvTk: new verovio.toolkit(),
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
  var options;
  var pageCount = state.vrvTk.getPageCount(); // Delay initializing state.vrvTk until action is required.
  // NOTE: reducers are pure functions, and must not mutate the supplied state value.
  //       This code creates a new state value with an updated toolkit reference, and then
  //       assigns that to the local 'state' parameter variable.
  //
  //       Cleaner code would use a new variable for the updated state value, and use that 
  //       consistently through the rest of the function @@TODO@@
  //

  if (!state.vrvTk) {
    vrvTk = verovio.toolkit();
    state = (0, _immutabilityHelper["default"])(state, {
      vrvTk: {
        "$set": vrvTk
      }
    });
  }

  switch (action.type) {
    case _index.FETCH_SCORE:
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

      if (action.payload.pageNum === pageCount) {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9yZWR1Y2Vycy9yZWR1Y2VyX3Njb3JlLmpzIl0sIm5hbWVzIjpbIkVNQk9ESU1FTlQiLCJNRUlUWVBFIiwiQVVESU9UWVBFIiwiVEVJVFlQRSIsIk1FTUJFUiIsImNvbmNlcHR1YWxTY29yZSIsInJldHJpZXZlT3JHZW5lcmF0ZVNWRyIsImRhdGEiLCJzdGF0ZSIsInVybCIsInBhZ2VOdW0iLCJvcHRpb25zIiwicGFnZVN0YXRlIiwiU1ZHIiwiSlNPTiIsInN0cmluZ2lmeSIsImNvbnNvbGUiLCJsb2ciLCJjdXJyZW50bHlMb2FkZWRJbnRvVnJ2IiwidnJ2VGsiLCJzZXRPcHRpb25zIiwibG9hZERhdGEiLCJyZWRvTGF5b3V0IiwicmVuZGVyVG9TVkciLCJyZXRyaWV2ZU9wdGlvbnMiLCJjdXJyZW50UGFnZSIsIm9wdHMiLCJTY29yZVJlZHVjZXIiLCJwdWJsaXNoZWRTY29yZXMiLCJjb25jZXB0dWFsU2NvcmVzIiwiTUVJIiwiY29tcG9uZW50VGFyZ2V0cyIsInNjb3JlTWFwcGluZyIsImxhdGVzdFJlbmRlcmVkUGFnZU51bSIsInBhZ2VDb3VudCIsInRyaWdnZXJOZXh0U2Vzc2lvbiIsInRyaWdnZXJQcmV2U2Vzc2lvbiIsImlnbm9yZUxheW91dCIsImFkanVzdFBhZ2VIZWlnaHQiLCJzY2FsZSIsInBhZ2VIZWlnaHQiLCJwYWdlV2lkdGgiLCJhY3Rpb24iLCJzdmciLCJnZXRQYWdlQ291bnQiLCJ2ZXJvdmlvIiwidG9vbGtpdCIsInR5cGUiLCJGRVRDSF9TQ09SRSIsInBheWxvYWQiLCJjb25maWciLCIkc2V0IiwiJG1lcmdlIiwiY3VycmVudE9wdGlvbnMiLCJGRVRDSF9SSUJCT05fQ09OVEVOVCIsIk1FSWZpbGUiLCJGRVRDSF9NQU5JRkVTVEFUSU9OUyIsInRhcmdldCIsInBhcnQiLCJmcmFnbWVudHMiLCJBcnJheSIsImlzQXJyYXkiLCJtYXAiLCJlbWJvZGltZW50IiwiZnJhZ3R5cGUiLCJpbmNsdWRlcyIsImNvbmNhdCIsIm1lbWJlciIsIkZFVENIX0NPTkNFUFRVQUxfU0NPUkUiLCJjUyIsIkZFVENIX0NPTVBPTkVOVF9UQVJHRVQiLCJuZXdTdGF0ZSIsInN0cnVjdHVyZVRhcmdldCIsIiRwdXNoIiwiU0NPUkVfTkVYVF9QQUdFIiwidXJpIiwid2FybiIsImluZm8iLCJTQ09SRV9QUkVWX1BBR0UiLCJTQ09SRV9TRVRfT1BUSU9OUyIsIlRSQU5TSVRJT05fVE9fTkVYVF9TRVNTSU9OIiwiU0NPUkVfUEFHRV9UT19UQVJHRVQiLCJmcmFnIiwic3BsaXQiLCJnZXRQYWdlV2l0aEVsZW1lbnQiLCJSRUdJU1RFUl9QVUJMSVNIRURfUEVSRk9STUFOQ0VfU0NPUkUiLCJwZXJmb3JtYW5jZU1lZGl1bSIsInB1Ymxpc2hlZFNjb3JlIiwiVVBEQVRFX0xBVEVTVF9SRU5ERVJFRF9QQUdFTlVNIl0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQUE7O0FBQ0E7Ozs7Ozs7O0FBQ0EsSUFBTUEsVUFBVSxHQUFHLGlCQUFuQjtBQUNBLElBQU1DLE9BQU8sR0FBRyxvQkFBaEI7QUFDQSxJQUFNQyxTQUFTLEdBQUcsc0JBQWxCO0FBQ0EsSUFBTUMsT0FBTyxHQUFHLG9CQUFoQjtBQUNBLElBQU1DLE1BQU0sR0FBRyxhQUFmO0FBRUEsSUFBSUMsZUFBSjs7QUFFQSxTQUFTQyxxQkFBVCxDQUErQkMsSUFBL0IsRUFBcUNDLEtBQXJDLEVBQTRDQyxHQUE1QyxFQUFpREMsT0FBakQsRUFBMERDLE9BQTFELEVBQW1FO0FBQ2pFO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBR0YsR0FBRyxJQUFJRCxLQUFLLENBQUNJLFNBQWIsSUFBMEJILEdBQUcsSUFBSUQsS0FBSyxDQUFDSyxHQUF2QyxJQUNESCxPQUFPLElBQUlGLEtBQUssQ0FBQ0ssR0FBTixDQUFVSixHQUFWLENBRFYsSUFFREssSUFBSSxDQUFDQyxTQUFMLENBQWVQLEtBQUssQ0FBQ0ssR0FBTixDQUFVSixHQUFWLEVBQWVDLE9BQWYsRUFBd0JDLE9BQXZDLE1BQ0FHLElBQUksQ0FBQ0MsU0FBTCxDQUFl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UDs7QUFNRjtBQUNFLGFBQU96QyxLQUFQO0FBalhKO0FBbVhEIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHVwZGF0ZSBmcm9tICdpbW11dGFiaWxpdHktaGVscGVyJztcbmltcG9ydCB7IEZFVENIX0NPTVBPTkVOVF9UQVJHRVQsIEZFVENIX0NPTkNFUFRVQUxfU0NPUkUsIEZFVENIX01BTklGRVNUQVRJT05TLCBGRVRDSF9SSUJCT05fQ09OVEVOVCwgRkVUQ0hfU0NPUkUsIFJFR0lTVEVSX1BVQkxJU0hFRF9QRVJGT1JNQU5DRV9TQ09SRSwgU0NPUkVfTkVYVF9QQUdFLCBTQ09SRV9QQUdFX1RPX1RBUkdFVCwgU0NPUkVfUFJFVl9QQUdFLCBUUkFOU0lUSU9OX1RPX05FWFRfU0VTU0lPTiwgVVBEQVRFX0xBVEVTVF9SRU5ERVJFRF9QQUdFTlVNLCBTQ09SRV9TRVRfT1BUSU9OUyB9IGZyb20gJy4uL2FjdGlvbnMvaW5kZXgnO1xuY29uc3QgRU1CT0RJTUVOVCA9ICdmcmJyOmVtYm9kaW1lbnQnO1xuY29uc3QgTUVJVFlQRSA9ICdtZWxkOk1FSUVtYm9kaW1lbnQnO1xuY29uc3QgQVVESU9UWVBFID0gJ21lbGQ6QXVkaW9FbWJvZGltZW50JztcbmNvbnN0IFRFSVRZUEUgPSAnbWVsZDpURUlFbWJvZGltZW50JztcbmNvbnN0IE1FTUJFUiA9ICdyZGZzOm1lbWJlcic7XG5cbmxldCBjb25jZXB0dWFsU2NvcmU7XG5cbmZ1bmN0aW9uIHJldHJpZXZlT3JHZW5lcmF0ZVNWRyhkYXRhLCBzdGF0ZSwgdXJsLCBwYWdlTnVtLCBvcHRpb25zKSB7IFxuICAvLyBXZSBjYW4gdXNlIHRoZSBwcmV2aW91c2x5IGNhY2hlZCBTVkcgaWY6XG4gIC8vIDEuIFdlIGFscmVhZHkgaGF2ZSBTVkcgcmVuZGVyZWQgZm9yIHRoaXMgVVJJXG4gIC8vIDIuIFdlIGFscmVhZHkgaGF2ZSBTVkcgcmVuZGVyZWQgZm9yIHRoaXMgcGFnZSBudW1iZXJcbiAgLy8gMy4gV2UgcmVuZGVyZWQgaXQgd2l0aCB0aGVzZSBvcHRpb25zXG4gIGlmKHVybCBpbiBzdGF0ZS5wYWdlU3RhdGUgJiYgdXJsIGluIHN0YXRlLlNWRyAmJlxuICAgIHBhZ2VOdW0gaW4gc3RhdGUuU1ZHW3VybF0gJiZcbiAgICBKU09OLnN0cmluZ2lmeShzdGF0ZS5TVkdbdXJsXVtwYWdlTnVtXS5vcHRpb25zKSA9PT1cbiAgICBKU09OLnN0cmluZ2lmeShvcHRpb25zKVxuICApIHsgXG4gICAgLy8gd2UgY2FuIHJldXNlIHRoZSBjYWNoZWQgU1ZHIVxuICAgIGNvbnNvbGUubG9nKGBTY29yZSByZWR1Y2VyOiBSZXVzaW5nIFNWRyBmb3IgJHt1cmx9IHBhZ2UgJHtwYWdlTnVtfWApO1xuICAgIHJldHVybiBzdGF0ZS5TVkdbdXJsXVtwYWdlTnVtXS5kYXRhO1xuICB9IGVsc2UgeyBcbiAgICAvLyB3ZSBuZWVkIHRvIGdlbmVyYXRlIFNWRyFcbiAgICAvLyBpcyB0aGUgTUVJIGZpbGUgY3VycmVudGx5IGxvYWRlZCBpbnRvIFZlcm92aW8/XG4gICAgaWYodXJsICE9PSBzdGF0ZS5jdXJyZW50bHlMb2FkZWRJbnRvVnJ2KSB7IFxuICAgICAgLy8gbm8gLS0gc28gc2V0IG91ciBvcHRpb25zLCBhbmQgdGhlbiBsb2FkIGl0XG4gICAgICBzdGF0ZS52cnZUay5zZXRPcHRpb25zKG9wdGlvbnMpO1xuICAgICAgc3RhdGUudnJ2VGsubG9hZERhdGEoZGF0YSk7XG4gICAgfSBcbiAgICAvLyBoYXZlIHdlIGxvYWRlZCB0aGlzIHBhZ2UgYmVmb3JlP1xuICAgIGlmKHVybCBpbiBzdGF0ZS5TVkcgJiZcbiAgICAgIHBhZ2VOdW0gaW4gc3RhdGUuU1ZHW3VybF0pIHsgXG4gICAgICAvLyB5ZXMuIE9wdGlvbnMgbXVzdCBoYXZlIGNoYW5nZWQsIG9yIHdlIHdvdWxkIGhhdmUgcmV0dXJuZWQgYWJvdmUuXG4gICAgICAvLyBTbywgcmVkbyBsYXlvdXQgdG8gdGFrZSBhY2NvdW50IG9mIG5ldyBvcHRpb25zXG4gICAgICBzdGF0ZS52cnZUay5zZXRPcHRpb25zKG9wdGlvbnMpO1xuICAgICAgc3RhdGUudnJ2VGsucmVkb0xheW91dCgpO1xuICAgIH1cbiAgICAvLyBub3cgcmVuZGVyIHRoZSBwYWdlIGFuZCByZXR1cm4gdGhlIFNWR1xuICAgIHJldHVybiBzdGF0ZS52cnZUay5yZW5kZXJUb1NWRyhwYWdlTnVtLCBvcHRpb25zKTtcbiAgfVxufVxuXG5mdW5jdGlvbiByZXRyaWV2ZU9wdGlvbnMob3B0aW9ucywgdXJsLCBjdXJyZW50UGFnZSwgc3RhdGUpIHsgXG4gIGxldCBvcHRzO1xuICBpZih0eXBlb2Ygb3B0aW9ucyA9PT0gXCJvYmplY3RcIikgeyBcbiAgICAvLyB1c2Ugb3B0aW9ucyBvYmplY3QgaWYgc3VwcGxpZWQgd2l0aCBhY3Rpb25cbiAgICBvcHRzID0gb3B0aW9ucztcbiAgfSBlbHNlIGlmKHVybCBpbiBzdGF0ZS5TVkcgJiYgY3VycmVudFBhZ2UgaW4gc3RhdGUuU1ZHW3VybF0pIHsgXG4gICAgLy8gb3RoZXJ3aXNlIGlmIHdlJ3ZlIHByZXZpb3VzbHkgcmVuZGVyZWQgdGhpcyBwYWdlLCB1c2UgdGhvc2Ugb3B0aW9uc1xuICAgIG9wdHMgPSBzdGF0ZS5TVkdbdXJsXVtjdXJyZW50UGFnZV0ub3B0aW9ucztcbiAgfSBlbHNlIHsgXG4gICAgb3B0cyA9IHN0YXRlLm9wdGlvbnM7IC8vIG9yIGFzIGZhbGxiYWNrLCB1c2UgZGVmYXVsdHNcbiAgfVxuICByZXR1cm4gb3B0cztcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIFNjb3JlUmVkdWNlcihzdGF0ZSA9IHtcbiAgY3VycmVudGx5TG9hZGVkSW50b1ZydjogbnVsbCxcbiAgcHVibGlzaGVkU2NvcmVzOiB7fSxcbiAgY29uY2VwdHVhbFNjb3Jlczoge30sXG4gIE1FSToge30sXG4gIFNWRzoge30sXG4gIHBhZ2VTdGF0ZToge30sXG4gIGNvbXBvbmVudFRhcmdldHM6IHt9LFxuICBzY29yZU1hcHBpbmc6IHt9LFxuICBwYWdlTnVtOiAxLFxuICBsYXRlc3RSZW5kZXJlZFBhZ2VOdW06IDAsXG4gIHBhZ2VDb3VudDogMCxcbiAgdHJpZ2dlck5leHRTZXNzaW9uOiBcIlwiLFxuICB0cmlnZ2VyUHJldlNlc3Npb246IFwiXCIsXG4gIC8vdnJ2VGs6IG5ldyB2ZXJvdmlvLnRvb2xraXQoKSxcbiAgb3B0aW9uczogeyAvLyBkZWZhdWx0LCB1bmxlc3Mgb3ZlcnJpZGRlbiBpbiBGRVRDSF9TQ09SRSBvciBTQ09SRV9TRVRfT1BUSU9OU1xuICAgIGlnbm9yZUxheW91dDogMSxcbiAgICBhZGp1c3RQYWdlSGVpZ2h0OiAxLFxuICAgIHNjYWxlOiAzNSxcbiAgICBwYWdlSGVpZ2h0OiAxMDAwICogMTAwIC8gMzUsXG4gICAgcGFnZVdpZHRoOiA3MDAgKiAxMDAgLyAzNSBcbiAgfVxufSwgYWN0aW9uKSB7XG4gIGxldCBzdmc7XG4gIGxldCB1cmw7XG4gIGxldCBjdXJyZW50UGFnZTtcbiAgbGV0IG9wdGlvbnM7XG4gIGNvbnN0IHBhZ2VDb3VudCA9IHN0YXRlLnZydlRrLmdldFBhZ2VDb3VudCgpO1xuICAvLyBEZWxheSBpbml0aWFsaXppbmcgc3RhdGUudnJ2VGsgdW50aWwgYWN0aW9uIGlzIHJlcXVpcmVkLlxuICAvLyBOT1RFOiByZWR1Y2VycyBhcmUgcHVyZSBmdW5jdGlvbnMsIGFuZCBtdXN0IG5vdCBtdXRhdGUgdGhlIHN1cHBsaWVkIHN0YXRlIHZhbHVlLlxuICAvLyAgICAgICBUaGlzIGNvZGUgY3JlYXRlcyBhIG5ldyBzdGF0ZSB2YWx1ZSB3aXRoIGFuIHVwZGF0ZWQgdG9vbGtpdCByZWZlcmVuY2UsIGFuZCB0aGVuXG4gIC8vICAgICAgIGFzc2lnbnMgdGhhdCB0byB0aGUgbG9jYWwgJ3N0YXRlJyBwYXJhbWV0ZXIgdmFyaWFibGUuXG4gIC8vXG4gIC8vICAgICAgIENsZWFuZXIgY29kZSB3b3VsZCB1c2UgYSBuZXcgdmFyaWFibGUgZm9yIHRoZSB1cGRhdGVkIHN0YXRlIHZhbHVlLCBhbmQgdXNlIHRoYXQgXG4gIC8vICAgICAgIGNvbnNpc3RlbnRseSB0aHJvdWdoIHRoZSByZXN0IG9mIHRoZSBmdW5jdGlvbiBAQFRPRE9AQFxuICAvL1xuICBpZiAoICFzdGF0ZS52cnZUayApIHtcbiAgICB2cnZUayA9IHZlcm92aW8udG9vbGtpdCgpO1xuICAgIHN0YXRlID0gdXBkYXRlKHN0YXRlLCB7XG4gICAgICAgIHZydlRrOiB7IFwiJHNldFwiOiB2cnZUayB9XG4gICAgICAgIH1cbiAgICApXG4gIH1cblxuICBzd2l0Y2ggKGFjdGlvbi50eXBlKSB7XG4gICAgY2FzZSBGRVRDSF9TQ09SRTpcbiAgICAgIHVybCA9IGFjdGlvbi5wYXlsb2FkLmNvbmZpZy51cmw7XG4gICAgICBjdXJyZW50UGFnZSA9IHVybCBpbiBzdGF0ZS5wYWdlU3RhdGUgXG4gICAgICAgID8gc3RhdGUucGFnZVN0YXRlW3VybF0uY3VycmVudFBhZ2UgOiAxO1xuICAgICAgLy8gc2V0IG9wdGlvbnM6XG4gICAgICBvcHRpb25zID0gcmV0cmlldmVPcHRpb25zKGFjdGlvbi5wYXlsb2FkLmNvbmZpZy5vcHRpb25zLCB1cmwsIGN1cnJlbnRQYWdlLCBzdGF0ZSk7IFxuICAgICAgLy8gV2UgY2FuIHVzZSBhIHByZXZpb3VzbHkgY2FjaGVkIFNWRyBpZjpcbiAgICAgIC8vIDEuIFdlIGFscmVhZHkgaGF2ZSBTVkcgcmVuZGVyZWQgZm9yIHRoaXMgVVJJXG4gICAgICAvLyAyLiBXZSBhbHJlYWR5IGhhdmUgU1ZHIHJlbmRlcmVkIGZvciB0aGlzIHBhZ2UgbnVtYmVyXG4gICAgICAvLyAzLiBXZSBhbHJlYWR5IGhhdmUgU1ZHIHJlbmRlcmVkIGZvciB0aGVzZSBvcHRpb25zXG4gICAgICBzdmcgPSByZXRyaWV2ZU9yR2VuZXJhdGVTVkcoYWN0aW9uLnBheWxvYWQuZGF0YSwgc3RhdGUsIHVybCwgY3VycmVudFBhZ2UsIG9wdGlvbnMpO1xuICAgICAgcmV0dXJuIHVwZGF0ZShzdGF0ZSwge1xuICAgICAgICBjdXJyZW50bHlMb2FkZWRJbnRvVnJ2OiB7IFxuICAgICAgICAgICRzZXQ6IHVybFxuICAgICAgICB9LFxuICAgICAgICBTVkc6IHtcbiAgICAgICAgICBbdXJsXToge1xuICAgICAgICAgICAgJHNldDogeyBcbiAgICAgICAgICAgICAgW2N1cnJlbnRQYWdlXToge1xuICAgICAgICAgICAgICAgIGRhdGE6IHN2ZyxcbiAgICAgICAgICAgICAgICBvcHRpb25zOiBvcHRpb25zXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIE1FSToge1xuICAgICAgICAgICRtZXJnZToge1xuICAgICAgICAgICAgW3VybF06IGFjdGlvbi5wYXlsb2FkLmRhdGFcbiAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIHBhZ2VTdGF0ZTogeyBcbiAgICAgICAgICBbdXJsXToge1xuICAgICAgICAgICAgJHNldDoge1xuICAgICAgICAgICAgICBjdXJyZW50UGFnZTogY3VycmVudFBhZ2UsXG4gICAgICAgICAgICAgIHBhZ2VDb3VudDogc3RhdGUudnJ2VGsuZ2V0UGFnZUNvdW50KCksXG4gICAgICAgICAgICAgIGN1cnJlbnRPcHRpb25zOiBvcHRpb25zXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9KVxuICAgIGNhc2UgRkVUQ0hfUklCQk9OX0NPTlRFTlQ6XG4gICAgICAvKlx0XHR2YXIgb3JjaCA9ICBuZXcgT3JjaGVzdHJhdGlvbihhY3Rpb24ucGF5bG9hZC5kYXRhKTtcbiAgICAgICAgICB2YXIgc3ZnUmliYm9uID0gb3JjaC5kcmF3T3JjaGVzdHJhdGlvbihmYWxzZSwgMCwgNDAwLCAwLCA2MDApO1xuICAgICAgICAgIHJldHVybiB1cGRhdGUoc3RhdGUsIHtNRUk6IHsgJG1lcmdlOiB7W2FjdGlvbi5wYXlsb2FkLmNvbmZpZy51cmxdOiBzdmdSaWJib24ub3V0ZXJIVE1MfX19KTsqL1xuICAgICAgdmFyIGRhdGEgPSBhY3Rpb24ucGF5bG9hZC5kYXRhO1xuICAgICAgaWYgKCFzdGF0ZS5NRUlmaWxlKSBzdGF0ZS5NRUlmaWxlID0ge307XG4gICAgICByZXR1cm4gdXBkYXRlKHN0YXRlLCB7XG4gICAgICAgIE1FSWZpbGU6IHtcbiAgICAgICAgICAkbWVyZ2U6IHtcbiAgICAgICAgICAgIFthY3Rpb24ucGF5bG9hZC5jb25maWcudXJsXTogYWN0aW9uLnBheWxvYWQuZGF0YVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSk7XG5cbiAgICBjYXNlIEZFVENIX01BTklGRVNUQVRJT05TOlxuICAgICAgLy8gY29uc29sZS5sb2coXCJJTiBGRVRDSF9NQU5JRkVTVEFUSU9OUywgcGF5bG9hZCBpczogXCIsIGFjdGlvbi5wYXlsb2FkKVxuICAgICAgY29uc3QgdGFyZ2V0ID0gYWN0aW9uLnBheWxvYWQudGFyZ2V0O1xuICAgICAgY29uc3QgcGFydCA9IGFjdGlvbi5wYXlsb2FkLnBhcnQ7XG5cbiAgICAgIGlmICh0eXBlb2YgcGFydCA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICAvLyBwYXJ0IHdhc24ndCBvbiBzZWdtZW50IGxpbmVcbiAgICAgICAgcmV0dXJuIHN0YXRlO1xuICAgICAgfVxuXG4gICAgICBsZXQgZnJhZ21lbnRzID0ge307IC8vIGdvIHRocm91Z2ggZWFjaCBwYXJ0LCBmaW5kaW5nIGVtYm9kaWJhZ3NcblxuICAgICAgaWYgKEVNQk9ESU1FTlQgaW4gcGFydCkge1xuICAgICAgICBpZiAoIUFycmF5LmlzQXJyYXkocGFydFtFTUJPRElNRU5UXSkpIHtcbiAgICAgICAgICBwYXJ0W0VNQk9ESU1FTlRdID0gW3BhcnRbRU1CT0RJTUVOVF1dO1xuICAgICAgICB9XG5cbiAgICAgICAgcGFydFtFTUJPRElNRU5UXS5tYXAoZW1ib2RpbWVudCA9PiB7XG4gICAgICAgICAgLy8gZ28gdGhyb3VnaCBlYWNoIGVtYm9kaW1lbnRcbiAgICAgICAgICBpZiAoTUVNQkVSIGluIGVtYm9kaW1lbnQpIHtcbiAgICAgICAgICAgIGxldCBmcmFndHlwZTsgLy8gZXh0cmFjdCBzZXQgb2YgZnJhZ21lbnRzXG4gICAgICAgICAgICAvLyB3ZSB3YW50IHRvIHNlcGFyYXRlIG91dCBkaWZmZXJlbnQgdHlwZXMgb2YgbWVkaWEgZnJhZ21lbnRzXG5cbiAgICAgICAgICAgIGlmICghQXJyYXkuaXNBcnJheShlbWJvZGltZW50W1wiQHR5cGVcIl0pKSB7XG4gICAgICAgICAgICAgIGVtYm9kaW1lbnRbXCJAdHlwZVwiXSA9IFtlbWJvZGltZW50W1wiQHR5cGVcIl1dO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoIUFycmF5LmlzQXJyYXkodGFyZ2V0W1wiQHR5cGVcIl0pKSB7XG4gICAgICAgICAgICAgIHRhcmdldFtcIkB0eXBlXCJdID0gW3RhcmdldFtcIkB0eXBlXCJdXTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKGVtYm9kaW1lbnRbXCJAdHlwZVwiXS5pbmNsdWRlcyhNRUlUWVBFKSkge1xuICAgICAgICAgICAgICBmcmFndHlwZSA9IFwiTUVJXCI7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKGVtYm9kaW1lbnRbXCJAdHlwZVwiXS5pbmNsdWRlcyhBVURJT1RZUEUpKSB7XG4gICAgICAgICAgICAgIGZyYWd0eXBlID0gXCJBdWRpb1wiO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChlbWJvZGltZW50W1wiQHR5cGVcIl0uaW5jbHVkZXMoVEVJVFlQRSkpIHtcbiAgICAgICAgICAgICAgZnJhZ3R5cGUgPSBcIlRFSVwiO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJTY29yZSBSZWR1Y2VyOiBFbWJvZGltZW50IHdpdGggdW5rbm93biB0eXBlXCIsIGVtYm9kaW1lbnQpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoIUFycmF5LmlzQXJyYXkoZW1ib2RpbWVudFtNRU1CRVJdKSkge1xuICAgICAgICAgICAgICBlbWJvZGltZW50W01FTUJFUl0gPSBbZW1ib2RpbWVudFtNRU1CRVJdXTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgZnJhZ21lbnRzW2ZyYWd0eXBlXSA9IGZyYWdtZW50c1tmcmFndHlwZV0gfHwgW107XG4gICAgICAgICAgICBmcmFnbWVudHNbZnJhZ3R5cGVdID0gZnJhZ21lbnRzW2ZyYWd0eXBlXS5jb25jYXQoZW1ib2RpbWVudFtNRU1CRVJdLm1hcChtZW1iZXIgPT4ge1xuICAgICAgICAgICAgICByZXR1cm4gbWVtYmVyW1wiQGlkXCJdO1xuICAgICAgICAgICAgfSkpO1xuICAgICAgICAgICAgZnJhZ21lbnRzW1wiZGVzY3JpcHRpb25cIl0gPSB0YXJnZXRbXCJyZGZzOmxhYmVsXCJdO1xuXG4gICAgICAgICAgICBpZiAodGFyZ2V0W1wiQHR5cGVcIl0uaW5jbHVkZXMoXCJtZWxkOk11emljb2RlXCIpKSB7XG4gICAgICAgICAgICAgIGZyYWdtZW50c1tcIm11emljb2RlVHlwZVwiXSA9IHRhcmdldFtcIm1jOnR5cGVcIl07XG4gICAgICAgICAgICAgIGZyYWdtZW50c1tcImN1ZVwiXSA9IHRhcmdldFtcImNsaW1iOmN1ZVwiXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJFbWJvZGltZW50IHdpdGhvdXQgbWVtYmVyczogXCIsIHBhcnQsIGVtYm9kaW1lbnQpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7IC8vIGNvbnNvbGUubG9nKFwiVXBkYXRpbmcgc3RhdGU6IFwiKTtcbiAgICAgICAgLy8gY29uc29sZS5sb2coIHVwZGF0ZShzdGF0ZSwge2NvbXBvbmVudFRhcmdldHM6IHsgJG1lcmdlOiB7IFt0YXJnZXRbXCJAaWRcIl1dOiBmcmFnbWVudHMgfSB9IH0pKTtcblxuICAgICAgICByZXR1cm4gdXBkYXRlKHN0YXRlLCB7XG4gICAgICAgICAgY29tcG9uZW50VGFyZ2V0czoge1xuICAgICAgICAgICAgJG1lcmdlOiB7XG4gICAgICAgICAgICAgIFt0YXJnZXRbXCJAaWRcIl1dOiBmcmFnbWVudHNcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfVxuXG4gICAgICBjb25zb2xlLmxvZyhcIkZFVENIX01BTklGRVNUQVRJT05TOiBVbmVtYm9kaWVkIHRhcmdldCEgXCIsIHRhcmdldCk7XG4gICAgICByZXR1cm4gc3RhdGU7XG5cbiAgICBjYXNlIEZFVENIX0NPTkNFUFRVQUxfU0NPUkU6XG4gICAgICBjb25zdCBjUyA9IGFjdGlvbi5wYXlsb2FkOyAvL3JldHVybiB1cGRhdGUoc3RhdGUsIHtwdWJsaXNoZWRTY29yZXM6IHsgJHB1c2g6IFtjb25jZXB0dWFsU2NvcmVbUFVCTElTSEVEX0FTXVtcIkBpZFwiXV0gfSB9KTtcblxuICAgICAgcmV0dXJuIHVwZGF0ZShzdGF0ZSwge1xuICAgICAgICBwdWJsaXNoZWRTY29yZXM6IHtcbiAgICAgICAgICAkc2V0OiB7XG4gICAgICAgICAgICBbY1NbXCJtbzpwdWJsaXNoZWRfYXNcIl1bXCJAaWRcIl1dOiBjU1tcIkBpZFwiXVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSk7XG5cbiAgICBjYXNlIEZFVENIX0NPTVBPTkVOVF9UQVJHRVQ6XG4gICAgICAvLyBlbnN1cmUgdGhhdCBvdXIgc3RydWN0dXJlIHRhcmdldCBjb2xsZWN0aW9uIGlzIGFuIGFycmF5LCB0aGVuIHB1c2ggdGhpcyBvbmUgaW5cbiAgICAgIGNvbmNlcHR1YWxTY29yZSA9IGFjdGlvbi5wYXlsb2FkLmNvbmNlcHR1YWxTY29yZTsgLy8gbWFrZSBzdXJlIHdlIGhhdmUgYW4gZW50cnkgZm9yIHRoaXMgY29uY2VwdHVhbCBzY29yZSwgYW5kIHRoYXQgaXRzIHZhbHVlIGlzIGFuIGFycmF5XG5cbiAgICAgIGxldCBuZXdTdGF0ZSA9IHVwZGF0ZShzdGF0ZSwge1xuICAgICAgICBjb25jZXB0dWFsU2NvcmVzOiB7XG4gICAgICAgICAgJG1lcmdlOiB7XG4gICAgICAgICAgICBbYWN0aW9uLnBheWxvYWQuY29uY2VwdHVhbFNjb3JlXTogc3RhdGVbJ2NvbmNlcHR1YWxTY29yZXMnXVthY3Rpb24ucGF5bG9hZC5jb25jZXB0dWFsU2NvcmVdIHx8IFtdXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9KTsgLy8gaWYgdGhpcyBpcyBhIG5ldyBzdHJ1Y3R1cmUgdGFyZ2V0LCBwdXNoIGl0IGluXG5cbiAgICAgIGlmICghbmV3U3RhdGVbJ2NvbmNlcHR1YWxTY29yZXMnXVthY3Rpb24ucGF5bG9hZC5jb25jZXB0dWFsU2NvcmVdLmluY2x1ZGVzKGFjdGlvbi5wYXlsb2FkLnN0cnVjdHVyZVRhcmdldCkpIHtcbiAgICAgICAgbmV3U3RhdGUgPSB1cGRhdGUobmV3U3RhdGUsIHtcbiAgICAgICAgICBjb25jZXB0dWFsU2NvcmVzOiB7XG4gICAgICAgICAgICBbYWN0aW9uLnBheWxvYWQuY29uY2VwdHVhbFNjb3JlXToge1xuICAgICAgICAgICAgICAkcHVzaDogW2FjdGlvbi5wYXlsb2FkLnN0cnVjdHVyZVRhcmdldF1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gbmV3U3RhdGU7XG5cbiAgICBjYXNlIFNDT1JFX05FWFRfUEFHRTpcbiAgICAgIHVybCA9IGFjdGlvbi5wYXlsb2FkLnVyaTtcbiAgICAgIGlmICghYWN0aW9uLnBheWxvYWQuZGF0YSkge1xuICAgICAgICBjb25zb2xlLmxvZyhcIlNDT1JFX05FWFRfUEFHRSBhdHRlbXB0ZWQgb24gbm9uLWxvYWRlZCBNRUkgZGF0YSAtIGlnbm9yaW5nIVwiKTtcbiAgICAgICAgcmV0dXJuIHN0YXRlO1xuICAgICAgfVxuICAgICAgaWYoYWN0aW9uLnBheWxvYWQucGFnZU51bSAhPT0gc3RhdGUucGFnZVN0YXRlW3VybF0uY3VycmVudFBhZ2UpIHsgXG4gICAgICAgIGNvbnNvbGUud2FybihgTWlzbWF0Y2ggaW4gcGFnZSBudW1iZXJzOiByZWNlaXZlZCAke2FjdGlvbi5wYXlsb2FkLnBhZ2VOdW19IGV4cGVjdGVkICR7c3RhdGUucGFnZVN0YXRlW3VybF0uY3VycmVudFBhZ2V9YCk7XG4gICAgICB9XG4gICAgICBpZihhY3Rpb24ucGF5bG9hZC5wYWdlTnVtID09PSBwYWdlQ291bnQpIHtcbiAgICAgICAgLy8gd2UndmUgbGVmdCB0aGUgbGFzdCBwYWdlLCBzZXQgdXAgYSB0cmFuc2ZlciB0byB0aGUgbmV4dCBzZXNzaW9uXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKFwiVFJJR0dFUklOR1wiKVxuICAgICAgICBjb25zb2xlLmluZm8oXCJBdHRlbXB0ZWQgU0NPUkVfTkVYVF9QQUdFIHdoaWxlIG9uIGxhc3QgcGFnZSBvZiBzY29yZVwiKTtcbiAgICAgICAgcmV0dXJuIHVwZGF0ZShzdGF0ZSwge1xuICAgICAgICAgIHRyaWdnZXJOZXh0U2Vzc2lvbjoge1xuICAgICAgICAgICAgJHNldDogdHJ1ZVxuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBvcHRpb25zID0gcmV0cmlldmVPcHRpb25zKHN0YXRlLnBhZ2VTdGF0ZVt1cmxdLmN1cnJlbnRPcHRpb25zLCB1cmwsIHN0YXRlLnBhZ2VTdGF0ZS5jdXJyZW50UGFnZSwgc3RhdGUpO1xuICAgICAgICBzdmcgPSByZXRyaWV2ZU9yR2VuZXJhdGVTVkcoc3RhdGUuTUVJW3VybF0sIHN0YXRlLCB1cmwsIGFjdGlvbi5wYXlsb2FkLnBhZ2VOdW0gKyAxLCBvcHRpb25zKTtcbiAgICAgICAgcmV0dXJuIHVwZGF0ZShzdGF0ZSwge1xuICAgICAgICAgIFNWRzoge1xuICAgICAgICAgICAgW3VybF06IHsgXG4gICAgICAgICAgICAgICRtZXJnZTogeyBcbiAgICAgICAgICAgICAgICBbYWN0aW9uLnBheWxvYWQucGFnZU51bSsxXToge1xuICAgICAgICAgICAgICAgICAgZGF0YTogc3ZnLFxuICAgICAgICAgICAgICAgICAgb3B0aW9uczogb3B0aW9uc1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0sXG4gICAgICAgICAgcGFnZVN0YXRlOiB7XG4gICAgICAgICAgICAgIFt1cmxdOiB7XG4gICAgICAgICAgICAgICAgJHNldDoge1xuICAgICAgICAgICAgICAgICAgY3VycmVudFBhZ2U6IGFjdGlvbi5wYXlsb2FkLnBhZ2VOdW0rMSwgXG4gICAgICAgICAgICAgICAgICBwYWdlQ291bnQ6IHN0YXRlLnZydlRrLmdldFBhZ2VDb3VudCgpLFxuICAgICAgICAgICAgICAgICAgY3VycmVudE9wdGlvbnM6IG9wdGlvbnNcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIGNhc2UgU0NPUkVfUFJFVl9QQUdFOlxuICAgICAgdXJsID0gYWN0aW9uLnBheWxvYWQudXJpO1xuICAgICAgaWYgKCFhY3Rpb24ucGF5bG9hZC5kYXRhKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiU0NPUkVfUFJFVl9QQUdFIGF0dGVtcHRlZCBvbiBub24tbG9hZGVkIE1FSSBkYXRhIC0gaWdub3JpbmchXCIpO1xuICAgICAgICByZXR1cm4gc3RhdGU7XG4gICAgICB9XG4gICAgICBpZihhY3Rpb24ucGF5bG9hZC5wYWdlTnVtICE9PSBzdGF0ZS5wYWdlU3RhdGVbdXJsXS5jdXJyZW50UGFnZSkgeyBcbiAgICAgICAgY29uc29sZS53YXJuKGBNaXNtYXRjaCBpbiBwYWdlIG51bWJlcnM6IHJlY2VpdmVkICR7YWN0aW9uLnBheWxvYWQucGFnZU51bX0gZXhwZWN0ZWQgJHtzdGF0ZS5wYWdlU3RhdGVbdXJsXS5jdXJyZW50UGFnZX1gKTtcbiAgICAgIH1cbiAgICAgIGlmKGFjdGlvbi5wYXlsb2FkLnBhZ2VOdW0gPT09IDEpIHtcbiAgICAgICAgLy8gd2UncmUgb24gdGhlIGZpcnN0IHBhZ2UsIGdvIGJhY2sgdG8gcHJldmlvdXMgc2Vzc2lvblxuICAgICAgICAvLyBjb25zb2xlLmxvZyhcIlRSSUdHRVJJTkdcIilcbiAgICAgICAgY29uc29sZS5pbmZvKFwiQXR0ZW1wdGVkIFNDT1JFX1BSRVZfUEFHRSB3aGlsZSBvbiBmaXJzdCBwYWdlIG9mIHNjb3JlXCIpO1xuICAgICAgICByZXR1cm4gdXBkYXRlKHN0YXRlLCB7XG4gICAgICAgICAgdHJpZ2dlclByZXZTZXNzaW9uOiB7XG4gICAgICAgICAgICAkc2V0OiB0cnVlXG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIG9wdGlvbnMgPSByZXRyaWV2ZU9wdGlvbnMoc3RhdGUucGFnZVN0YXRlW3VybF0uY3VycmVudE9wdGlvbnMsIHVybCwgc3RhdGUucGFnZVN0YXRlLmN1cnJlbnRQYWdlLCBzdGF0ZSlcbiAgICAgICAgc3ZnID0gcmV0cmlldmVPckdlbmVyYXRlU1ZHKHN0YXRlLk1FSVt1cmxdLCBzdGF0ZSwgdXJsLCBhY3Rpb24ucGF5bG9hZC5wYWdlTnVtIC0gMSwgb3B0aW9ucyk7XG4gICAgICAgIHJldHVybiB1cGRhdGUoc3RhdGUsIHtcbiAgICAgICAgICBTVkc6IHtcbiAgICAgICAgICAgIFt1cmxdOiB7IFxuICAgICAgICAgICAgICAkbWVyZ2U6IHsgXG4gICAgICAgICAgICAgICAgW2FjdGlvbi5wYXlsb2FkLnBhZ2VOdW0tMV06IHtcbiAgICAgICAgICAgICAgICAgIGRhdGE6IHN2ZyxcbiAgICAgICAgICAgICAgICAgIG9wdGlvbnM6IG9wdGlvbnNcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9LFxuICAgICAgICAgIHBhZ2VTdGF0ZToge1xuICAgICAgICAgICAgICBbdXJsXToge1xuICAgICAgICAgICAgICAgICRzZXQ6IHtcbiAgICAgICAgICAgICAgICAgIGN1cnJlbnRQYWdlOiBhY3Rpb24ucGF5bG9hZC5wYWdlTnVtLTEsIFxuICAgICAgICAgICAgICAgICAgcGFnZUNvdW50OiBzdGF0ZS52cnZUay5nZXRQYWdlQ291bnQoKSxcbiAgICAgICAgICAgICAgICAgIGN1cnJlbnRPcHRpb25zOiBvcHRpb25zXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICBcbiAgICBjYXNlIFNDT1JFX1NFVF9PUFRJT05TOlxuICAgICAgdXJsID0gYWN0aW9uLnBheWxvYWQudXJpO1xuICAgICAgY3VycmVudFBhZ2UgPSB1cmwgaW4gc3RhdGUucGFnZVN0YXRlICYmIFwiY3VycmVudFBhZ2VcIiBpbiBzdGF0ZS5wYWdlU3RhdGVbdXJsXVxuICAgICAgICA/IHN0YXRlLnBhZ2VTdGF0ZVt1cmxdLmN1cnJlbnRQYWdlIDogMTtcbiAgICAgIHN2ZyA9IHJldHJpZXZlT3JHZW5lcmF0ZVNWRyhzdGF0ZS5NRUlbdXJsXSwgc3RhdGUsIHVybCwgY3VycmVudFBhZ2UsIGFjdGlvbi5wYXlsb2FkLm9wdGlvbnMpO1xuICAgICAgcmV0dXJuIHVwZGF0ZShzdGF0ZSwgeyBcbiAgICAgICAgb3B0aW9uczogeyBcbiAgICAgICAgICAkc2V0OiBhY3Rpb24ucGF5bG9hZC5vcHRpb25zXG4gICAgICAgIH0sXG4gICAgICAgIGN1cnJlbnRseUxvYWRlZEludG9WcnY6IHsgXG4gICAgICAgICAgJHNldDogdXJsXG4gICAgICAgIH0sXG4gICAgICAgIFNWRzogeyBcbiAgICAgICAgICBbdXJsXTogeyBcbiAgICAgICAgICAgICRzZXQ6IHtcbiAgICAgICAgICAgICAgW2N1cnJlbnRQYWdlXToge1xuICAgICAgICAgICAgICAgIGRhdGE6IHN2ZyxcbiAgICAgICAgICAgICAgICBvcHRpb25zOiBhY3Rpb24ucGF5bG9hZC5vcHRpb25zXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH0sIFxuICAgICAgICBwYWdlU3RhdGU6IHsgXG4gICAgICAgICAgW3VybF06IHsgXG4gICAgICAgICAgICAkc2V0OiB7IFxuICAgICAgICAgICAgICBjdXJyZW50UGFnZTogY3VycmVudFBhZ2UsXG4gICAgICAgICAgICAgIHBhZ2VDb3VudDogc3RhdGUudnJ2VGsuZ2V0UGFnZUNvdW50KCksXG4gICAgICAgICAgICAgIGN1cnJlbnRPcHRpb25zOiBvcHRpb25zXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9KTtcblxuICAgIGNhc2UgVFJBTlNJVElPTl9UT19ORVhUX1NFU1NJT046XG4gICAgICAvLyBjb25zb2xlLmxvZyhcImZvcmNpbmcgdHJhbnNpdGlvbiB0byBuZXh0IHNlc3Npb24gaWYgcXVldWVkXCIpO1xuICAgICAgcmV0dXJuIHVwZGF0ZShzdGF0ZSwge1xuICAgICAgICB0cmlnZ2VyTmV4dFNlc3Npb246IHtcbiAgICAgICAgICAkc2V0OiB0cnVlXG4gICAgICAgIH1cbiAgICAgIH0pO1xuXG4gICAgY2FzZSBTQ09SRV9QQUdFX1RPX1RBUkdFVDpcbiAgICAgIGlmICghYWN0aW9uLnBheWxvYWQuZGF0YSkge1xuICAgICAgICBjb25zb2xlLmxvZyhcIlNDT1JFX1BBR0VfVE9fVEFSR0VUIGF0dGVtcHRlZCBvbiBub24tbG9hZGVkIE1FSSBkYXRhIC0gaWdub3JpbmchXCIpO1xuICAgICAgICByZXR1cm4gc3RhdGU7XG4gICAgICB9XG4gICAgICBjb25zdCBmcmFnID0gYWN0aW9uLnBheWxvYWQudGFyZ2V0LnNwbGl0KFwiI1wiKVsxXTtcbiAgICAgIGNvbnN0IHBhZ2VOdW0gPSBzdGF0ZS52cnZUay5nZXRQYWdlV2l0aEVsZW1lbnQoZnJhZyk7XG4gICAgICBpZiAocGFnZU51bSA9PT0gMCkge1xuICAgICAgICBjb25zb2xlLmxvZyhcIlNDT1JFX1BBR0VfVE9fVEFSR0VUIGF0dGVtcHRlZCBvbiBhIHRhcmdldCB0aGF0IGRvZXNuJ3QgZXhpc3QgaW4gdGhlIE1FSSAtIGlnbm9yaW5nIVwiLCBmcmFnKTtcbiAgICAgICAgcmV0dXJuIHN0YXRlO1xuICAgICAgfVxuICAgICAgdXJsID0gYWN0aW9uLnBheWxvYWQudXJpOyBcbiAgICAgIG9wdGlvbnMgPSByZXRyaWV2ZU9wdGlvbnMoc3RhdGUucGFnZVN0YXRlW3VybF0uY3VycmVudE9wdGlvbnMsIHVybCwgcGFnZU51bSwgc3RhdGUpXG4gICAgICBzdmcgPSByZXRyaWV2ZU9yR2VuZXJhdGVTVkcoc3RhdGUuTUVJW3VybF0sIHN0YXRlLCB1cmwsIHBhZ2VOdW0sIG9wdGlvbnMpXG4gICAgICByZXR1cm4gdXBkYXRlKHN0YXRlLCB7XG4gICAgICAgIFNWRzoge1xuICAgICAgICAgIFt1cmxdOiB7IFxuICAgICAgICAgICAgJG1lcmdlOiB7IFxuICAgICAgICAgICAgICBbcGFnZU51bV06IHsgXG4gICAgICAgICAgICAgICAgZGF0YTogc3ZnLFxuICAgICAgICAgICAgICAgIG9wdGlvbnM6IG9wdGlvbnNcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfSwgXG4gICAgICAgIHBhZ2VTdGF0ZTogeyBcbiAgICAgICAgICBbdXJsXTogeyBcbiAgICAgICAgICAgICRzZXQ6IHsgXG4gICAgICAgICAgICAgIGN1cnJlbnRQYWdlOiBwYWdlTnVtLFxuICAgICAgICAgICAgICBwYWdlQ291bnQ6IHN0YXRlLnZydlRrLmdldFBhZ2VDb3VudCgpLFxuICAgICAgICAgICAgICBjdXJyZW50T3B0aW9uczogb3B0aW9uc1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSk7XG5cbiAgICBjYXNlIFJFR0lTVEVSX1BVQkxJU0hFRF9QRVJGT1JNQU5DRV9TQ09SRTpcbiAgICAgIC8vIGNvbnNvbGUubG9nKFwiUmVnaXN0ZXIgcHVibGlzaGVkIHBlcmZvcm1hbmNlIHNjb3JlOiBcIiwgYWN0aW9uLnBheWxvYWQsIFwib24gc3RhdGU6IFwiLCBzdGF0ZSk7XG4gICAgICBpZiAoYWN0aW9uLnBheWxvYWQuY29uY2VwdHVhbFNjb3JlW1wiQGlkXCJdIGluIHN0YXRlLnNjb3JlTWFwcGluZykge1xuICAgICAgICAvLyB3ZSBhbHJlYWR5IGtub3cgdGhpcyBjb25jZXB0dWFsIHNjb3JlXG4gICAgICAgIC8vIGRvIHdlIGFscmVhZHkga25vdyBhYm91dCB0aGUgcHVibGlzaGVkIHNjb3JlIGZvciB0aGlzIHBlcmZvcm1hbmNlIG1lZGl1bT9cbiAgICAgICAgaWYgKGFjdGlvbi5wYXlsb2FkLnBlcmZvcm1hbmNlTWVkaXVtW1wiQGlkXCJdIGluIHN0YXRlLnNjb3JlTWFwcGluZ1thY3Rpb24ucGF5bG9hZC5wdWJsaXNoZWRTY29yZVtcIkBpZFwiXV0pIHtcbiAgICAgICAgICAvLyB5ZXM7IHNvIG5vdGhpbmcgdG8gZG8uIEZJWE1FOiBzaG91bGQgd2UgY2F0ZXIgZm9yIG11bHRpcGxlIHB1Ymxpc2hlZCBzY29yZXMgZm9yIHNhbWUgcGVyZm9ybWFuY2UgbWVkaXVtP1xuICAgICAgICAgIHJldHVybiBzdGF0ZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAvLyBubzsgc28gcmVnaXN0ZXIgdGhlIHB1Ymxpc2hlZCBzY29yZSBmb3IgdGhpcyBuZXcgcGVyZm9ybWFuY2UgbWVkaXVtXG4gICAgICAgICAgcmV0dXJuIHVwZGF0ZShzdGF0ZSwge1xuICAgICAgICAgICAgc2NvcmVNYXBwaW5nOiB7XG4gICAgICAgICAgICAgIFthY3Rpb24ucGF5bG9hZC5wdWJsaXNoZWRTY29yZVtcIkBpZFwiXV06IHtcbiAgICAgICAgICAgICAgICAkbWVyZ2U6IHtcbiAgICAgICAgICAgICAgICAgIFthY3Rpb24ucGF5bG9hZC5wZXJmb3JtYW5jZU1lZGl1bVtcIkBpZFwiXV06IGFjdGlvbi5wYXlsb2FkLmNvbmNlcHR1YWxTY29yZVtcIkBpZFwiXVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyBmaXJzdCB0aW1lIHdlIHNlZSB0aGlzIGNvbmNlcHR1YWwgc2NvcmVcbiAgICAgICAgLy8gc28gYXR0YWNoIHRoZSBwdWJsaXNoZWQgc2NvcmUgYWNjb3JkaW5nIHRvIHBlcmZvcm1hbmNlIG1lZGl1bVxuICAgICAgICByZXR1cm4gdXBkYXRlKHN0YXRlLCB7XG4gICAgICAgICAgc2NvcmVNYXBwaW5nOiB7XG4gICAgICAgICAgICAkbWVyZ2U6IHtcbiAgICAgICAgICAgICAgW2FjdGlvbi5wYXlsb2FkLnB1Ymxpc2hlZFNjb3JlW1wiQGlkXCJdXToge1xuICAgICAgICAgICAgICAgIFthY3Rpb24ucGF5bG9hZC5wZXJmb3JtYW5jZU1lZGl1bVtcIkBpZFwiXV06IGFjdGlvbi5wYXlsb2FkLmNvbmNlcHR1YWxTY29yZVtcIkBpZFwiXVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH1cblxuICAgIGNhc2UgVVBEQVRFX0xBVEVTVF9SRU5ERVJFRF9QQUdFTlVNOlxuICAgICAgcmV0dXJuIHVwZGF0ZShzdGF0ZSwge1xuICAgICAgICBsYXRlc3RSZW5kZXJlZFBhZ2VOdW06IHtcbiAgICAgICAgICAkc2V0OiBhY3Rpb24ucGF5bG9hZFxuICAgICAgICB9XG4gICAgICB9KTtcblxuICAgIGRlZmF1bHQ6XG4gICAgICByZXR1cm4gc3RhdGU7XG4gIH1cbn1cbiJdfQ==