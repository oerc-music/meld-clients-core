"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = _default;

var _immutabilityHelper = _interopRequireDefault(require("immutability-helper"));

var _index = require("../actions/index");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var EMBODIMENT = 'frbr:embodiment';
var ASSOCIATED = "http://example.com/must-revisit-these/associatedWith";
var MEMBER = 'rdfs:member';
var TEITYPE = 'meld:TEIEmbodiment';
var LIBRETTOTYPE = 'mo:PublishedLibretto';

function _default() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {
    TEI: {},
    componentTargets: {},
    fragImages: {},
    librettoTargets: {}
  };
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case _index.FETCH_TEI:
      return (0, _immutabilityHelper["default"])(state, {
        TEI: {
          $merge: _defineProperty({}, action.payload.uri, action.payload.data)
        }
      });

    case _index.FETCH_MANIFESTATIONS:
      // find associated TEI
      var target = action.payload.target;
      var part = action.payload.part;

      if (typeof part === "undefined") {
        // part wasn't on segment line
        return state;
      } // console.log("In FETCH_MANIFESTATIONS TEI, target is: ", target, " part is: ", part);


      var fragments = [];
      var libretto = []; // go through each part, finding embodibags

      if (EMBODIMENT in part) {
        if (!Array.isArray(part[EMBODIMENT])) {
          part[EMBODIMENT] = [part[EMBODIMENT]];
        }

        part[EMBODIMENT].map(function (embodiment) {
          // go through each embodiment
          if (MEMBER in embodiment) {
            // extract set of fragments
            if (!Array.isArray(embodiment["@type"])) {
              embodiment["@type"] = [embodiment["@type"]];
            }

            if (embodiment["@type"].includes(TEITYPE)) {
              if (!Array.isArray(embodiment[MEMBER])) {
                embodiment[MEMBER] = [embodiment[MEMBER]];
              }

              var TEIFrags = embodiment[MEMBER].map(function (member) {
                return member["@id"];
              });

              if (embodiment["@type"].includes(LIBRETTOTYPE)) {
                console.log("----------------------");
                libretto = libretto.concat(TEIFrags);
              }

              fragments = fragments.concat(TEIFrags);
            } else {
              console.log("TEI Reducer: Embodiment with unknown type", embodiment);
            } //fragments[fragtype] = embodiment[MEMBER].map( (member) => {

          } else {
            console.log("Embodiment without members: ", part, embodiment);
          }
        });
        return (0, _immutabilityHelper["default"])(state, {
          componentTargets: {
            $merge: _defineProperty({}, target["@id"], fragments)
          },
          librettoTargets: {
            $merge: _defineProperty({}, target["@id"], libretto)
          }
        });
      }
      /*
          if(ASSOCIATED in target) {
        if(!Array.isArray(target[ASSOCIATED])) {
          target[ASSOCIATED] = [target[ASSOCIATED]];
        }
              // extract target fragments
              // TODO properly ontologize ASSOCIATED, including differentiating TEI and others
              const fragments = target[ASSOCIATED].map( (assoc) => {
                  return assoc["@id"];
              });
              const targetid = target["@id"];
        // are there any associated images?
        const fragImages = {};
          target[ASSOCIATED].filter( (assoc) => {
          return EMBODIMENT in assoc
        }).map( (assoc) => {
          fragImages[assoc["@id"]] = assoc[EMBODIMENT]["@id"];
        })
              return update(state, {
          componentTargets: { $merge: { [target["@id"]]: fragments }},
          fragImages: { $merge: fragImages }
         });
          console.log("FETCH_COMPONENT_TARGET: Unassociated target! ", target);
          }*/


      return state;

    default:
      return state;
  }
}

;