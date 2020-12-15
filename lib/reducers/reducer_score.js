import update from 'immutability-helper';
import { FETCH_COMPONENT_TARGET, FETCH_CONCEPTUAL_SCORE, FETCH_MANIFESTATIONS, FETCH_RIBBON_CONTENT, FETCH_SCORE, REGISTER_PUBLISHED_PERFORMANCE_SCORE, SCORE_NEXT_PAGE, SCORE_PAGE_TO_TARGET, SCORE_PREV_PAGE, TRANSITION_TO_NEXT_SESSION, UPDATE_LATEST_RENDERED_PAGENUM } from '../actions/index';
const EMBODIMENT = 'frbr:embodiment';
const MEITYPE = 'meld:MEIEmbodiment';
const AUDIOTYPE = 'meld:AudioEmbodiment';
const TEITYPE = 'meld:TEIEmbodiment';
const MEMBER = 'rdfs:member';
const scale = 35;
let conceptualScore;
let vrvOptions = {
  // override these defaults from your MELD app using
  // setScoreReducerVerovioOptions (below)
  ignoreLayout: 1,
  adjustPageHeight: 1,
  scale: scale,
  pageHeight: 1000 * 100 / scale,
  pageWidth: 700 * 100 / scale
};
export function setScoreReducerVerovioOptions(options) {
  vrvOptions = options;
}
export function ScoreReducer(state = {
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
}, action) {
  let svg;
  const pageCount = state.vrvTk.getPageCount();

  switch (action.type) {
    case FETCH_SCORE:
      // In the past, we rendered scores pre-emptively, but there's
      // nothing to say that this score will ever be drawn, and doing
      // it here puts all the processing up front. For multiple
      // scores, it's noticably slow.
      console.log("FETCH_SCORE: ", action);
      svg = false && state.vrvTk.renderData(action.payload.data, vrvOptions);

      if ("config" in action.payload) {
        return update(state, {
          SVG: {
            $merge: {
              [action.payload.config.url]: svg
            }
          },
          MEI: {
            $merge: {
              [action.payload.config.url]: action.payload.data
            }
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

    case FETCH_RIBBON_CONTENT:
      /*		var orch =  new Orchestration(action.payload.data);
          var svgRibbon = orch.drawOrchestration(false, 0, 400, 0, 600);
          return update(state, {MEI: { $merge: {[action.payload.config.url]: svgRibbon.outerHTML}}});*/
      var data = action.payload.data;
      if (!state.MEIfile) state.MEIfile = {};
      return update(state, {
        MEIfile: {
          $merge: {
            [action.payload.config.url]: action.payload.data
          }
        }
      });

    case FETCH_MANIFESTATIONS:
      // console.log("IN FETCH_MANIFESTATIONS, payload is: ", action.payload)
      const target = action.payload.target;
      const part = action.payload.part;

      if (typeof part === "undefined") {
        // part wasn't on segment line
        return state;
      }

      let fragments = {}; // go through each part, finding embodibags

      if (EMBODIMENT in part) {
        if (!Array.isArray(part[EMBODIMENT])) {
          part[EMBODIMENT] = [part[EMBODIMENT]];
        }

        part[EMBODIMENT].map(embodiment => {
          // go through each embodiment
          if (MEMBER in embodiment) {
            let fragtype; // extract set of fragments
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
            fragments[fragtype] = fragments[fragtype].concat(embodiment[MEMBER].map(member => {
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

        return update(state, {
          componentTargets: {
            $merge: {
              [target["@id"]]: fragments
            }
          }
        });
      }

      console.log("FETCH_MANIFESTATIONS: Unembodied target! ", target);
      return state;

    case FETCH_CONCEPTUAL_SCORE:
      const cS = action.payload; //return update(state, {publishedScores: { $push: [conceptualScore[PUBLISHED_AS]["@id"]] } });

      return update(state, {
        publishedScores: {
          $set: {
            [cS["mo:published_as"]["@id"]]: cS["@id"]
          }
        }
      });

    case FETCH_COMPONENT_TARGET:
      // ensure that our structure target collection is an array, then push this one in
      conceptualScore = action.payload.conceptualScore; // make sure we have an entry for this conceptual score, and that its value is an array

      let newState = update(state, {
        conceptualScores: {
          $merge: {
            [action.payload.conceptualScore]: state['conceptualScores'][action.payload.conceptualScore] || []
          }
        }
      }); // if this is a new structure target, push it in

      if (!newState['conceptualScores'][action.payload.conceptualScore].includes(action.payload.structureTarget)) {
        newState = update(newState, {
          conceptualScores: {
            [action.payload.conceptualScore]: {
              $push: [action.payload.structureTarget]
            }
          }
        });
      }

      return newState;

    case SCORE_NEXT_PAGE:
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
        return update(state, {
          triggerNextSession: {
            $set: true
          }
        });
      } else {
        return update(state, {
          //SVG: { $merge: { [action.payload.uri]: svg } }, -- DW merge -> set 20170722
          SVG: {
            $set: {
              [action.payload.uri]: svg
            }
          },
          pageNum: {
            $set: action.payload.pageNum + 1
          },
          pageCount: {
            $set: pageCount
          }
        });
      }

    case SCORE_PREV_PAGE:
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
        return update(state, {
          triggerPrevSession: {
            $set: true
          }
        });
      } else {
        return update(state, {
          //SVG: { $merge: { [action.payload.uri]: svg } }, -- DW merge -> set 20170722
          SVG: {
            $set: {
              [action.payload.uri]: svg
            }
          },
          pageNum: {
            $set: action.payload.pageNum - 1
          },
          pageCount: {
            $set: pageCount
          }
        });
      }

    case TRANSITION_TO_NEXT_SESSION:
      // console.log("forcing transition to next session if queued");
      return update(state, {
        triggerNextSession: {
          $set: true
        }
      });

    case SCORE_PAGE_TO_TARGET:
      if (!action.payload.data) {
        console.log("SCORE_PAGE_TO_TARGET attempted on non-loaded MEI data - ignoring!");
        return state;
      }

      const frag = action.payload.target.split("#")[1];
      const pageNum = state.vrvTk.getPageWithElement(frag);

      if (pageNum === 0) {
        console.log("SCORE_PAGE_TO_TARGET attempted on a target that doesn't exist in the MEI - ignoring!", frag);
        return state;
      }

      return update(state, {
        SVG: {
          $set: {
            [action.payload.uri]: svg
          }
        },
        pageNum: {
          $set: pageNum
        }
      });

    case REGISTER_PUBLISHED_PERFORMANCE_SCORE:
      // console.log("Register published performance score: ", action.payload, "on state: ", state);
      if (action.payload.conceptualScore["@id"] in state.scoreMapping) {
        // we already know this conceptual score
        // do we already know about the published score for this performance medium?
        if (action.payload.performanceMedium["@id"] in state.scoreMapping[action.payload.publishedScore["@id"]]) {
          // yes; so nothing to do. FIXME: should we cater for multiple published scores for same performance medium?
          return state;
        } else {
          // no; so register the published score for this new performance medium
          return update(state, {
            scoreMapping: {
              [action.payload.publishedScore["@id"]]: {
                $merge: {
                  [action.payload.performanceMedium["@id"]]: action.payload.conceptualScore["@id"]
                }
              }
            }
          });
        }
      } else {
        // first time we see this conceptual score
        // so attach the published score according to performance medium
        return update(state, {
          scoreMapping: {
            $merge: {
              [action.payload.publishedScore["@id"]]: {
                [action.payload.performanceMedium["@id"]]: action.payload.conceptualScore["@id"]
              }
            }
          }
        });
      }

    case UPDATE_LATEST_RENDERED_PAGENUM:
      return update(state, {
        latestRenderedPageNum: {
          $set: action.payload
        }
      });

    default:
      return state;
  }
}