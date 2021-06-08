"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Orchestration = Orchestration;
exports.mergedInstruments = mergedInstruments;
exports.caption = caption;

var _react = _interopRequireWildcard(require("react"));

var _svgUtils = require("../library/svgUtils.js");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

////////
//
// This library is primarily used by the orchestral ribbon, which
// draws MEI orchestral scores as a sort of zoomed-out piano-roll
// visualisation, but some of the functionality is generically
// useful for other MEI-processing tasks.
//
/////////
//
// 1. Time and duration functions
//
function duration(event, MEIObject) {
  // Get a duration as a number of crotchets from an MEI note or
  // rest. This is certainly too crude to be accurate.
  var base = event.getAttributeNS(null, 'dur');

  if (!base) {
    // Probably a chord – get dur from parent

    /*base = MEIObject.evaluate('./ancestor::*[@dur][1]', event, nsResolver,
    											XPathResult.NUMBER_TYPE, null).numberValue;*/
    var chord = event.closest('chord');
    if (chord) base = chord.getAttributeNS(null, 'dur');
  }

  base = 1 / Number(base);
  var dur = base;
  var dots = event.getAttributeNS(null, 'dots');
  if (dots) dur = base * (2 - 1 / Math.pow(2, Number(dots)));
  return dur * 4;
}

function countMeasures(MEIObject) {
  // Given parsed MEI, how many measures are there?
  var measureCount = MEIObject.evaluate('count(//mei:measure)', MEIObject, _svgUtils.nsResolver, XPathResult.NUMBER_TYPE, null);
  return measureCount.numberValue;
}

function findMeasures(n, MEIObject) {
  // Given parsed MEI, find all the bars with music in for staff/instrument n
  var staves = MEIObject.evaluate('//mei:staff[@n=' + n + ' and .//mei:note]', MEIObject, _svgUtils.nsResolver, XPathResult.ORDERED_NODE_ITERATORTYPE, null);
  var staff = staves.iterateNext();
  var bars = [];

  while (staff) {
    // Constructor for InstrumentMeasure is below
    bars.push(new InstrumentMeasure(staff, MEIObject));
    staff = staves.iterateNext();
  }

  return bars;
}

function InstrumentMeasure(barStaff, MEIObject) {
  // This object contains all the information for a bar of music
  // as played by one instrument on one staff
  this.MEIObject = MEIObject;
  this.barStaff = barStaff;
  this.barNo = this.MEIObject.evaluate('./ancestor::mei:measure/@n', barStaff, _svgUtils.nsResolver, XPathResult.NUMBER_TYPE, null).numberValue;
  this.events = [];
  this.duration = 0;
  var eventObjs = this.MEIObject.evaluate('./mei:layer//mei:note | ./mei:layer//mei:rest | ./mei:layer//mei:chord', barStaff, _svgUtils.nsResolver, XPathResult.ORDERED_NODE_ITERATORTYPE, null);
  var event = eventObjs.iterateNext();
  var t = 0;
  var newt = false;

  while (event) {
    newt = t + duration(event, MEIObject);

    if (this.events.length && this.events[this.events.length - 1]["extends"](event)) {
      // Just extend the previous thing in events
      this.events[this.events.length - 1].extend(t, newt, event);
    } else {
      this.events[this.events.length] = new MeasureEventBlock(t, newt, event);
    }

    t = newt;
    event = eventObjs.iterateNext();
  }

  this.duration = t;
} ///////////////////
//
// 2. Orchestration


function findInstruments(MEIObject, instrumentSet) {
  // Given parsed MEI, return objects for all instruments
  var staffDefs = MEIObject.evaluate('//mei:staffDef', MEIObject, _svgUtils.nsResolver, XPathResult.ORDERED_NODE_ITERATORTYPE, null);
  var staffDef = staffDefs.iterateNext();
  var instruments = [];

  while (staffDef) {
    // Constructor for Instrument is below
    instruments[staffDef.getAttributeNS(null, 'n') - 1] = new Instrument(staffDef, MEIObject, instrumentSet);
    staffDef = staffDefs.iterateNext();
  }

  return instruments;
} // We need more structured information about instruments (possibly
// this is partly because we are under-using the MEI facilities for this)
// We define InstrumentType as the abstract category (e.g. Violin) and
// Instrument as the thing in the score (e.g. Violin I)
// FIXME: Currently, this is poorly adapted for localisation (see, for example,
// the cor anglais entry. If this is to be intuitive, this will need expansion.


function InstrumentType(proto, name, shortname, section, plural, shortplural) {
  if (proto) {
    this.name = proto.name;
    this.shortname = proto.shortname;
    this.section = proto.section;
    this.plural = proto.plural;
    this.shortplural = proto.shortplural;
  } else {
    this.name = name;
    this.shortname = shortname;
    this.section = section;
    this.plural = plural;
    this.shortplural = shortplural;
  }

  this.eq = function (instType) {
    return this.name === instType.name;
  };
}

var Instruments = {
  "flute": new InstrumentType(false, 'Flute', 'fl', 'Woodwind', 'Flutes', 'fls'),
  "piccolo": new InstrumentType(false, 'Piccolo', 'pic', 'Woodwind', 'Piccolos', 'pics'),
  "oboe": new InstrumentType(false, 'Oboe', 'hb', 'Woodwind', 'Oboes', 'hbs'),
  "cor anglais": new InstrumentType(false, 'Cor anglais', 'ca', 'Woodwind', 'Cors anglais', 'cas'),
  "english horn": new InstrumentType(false, 'Cor anglais', 'ca', 'Woodwind', 'Cors anglais', 'cas'),
  "a clarinet": new InstrumentType(false, 'A Clarinet', 'cl.A', 'Woodwind', 'A Clarinets', 'cls.A'),
  "b♭ clarinet": new InstrumentType(false, 'B♭ Clarinet', 'cl.B♭', 'Woodwind', 'B♭ Clarinets', 'cls.♭'),
  "bass clarinet": new InstrumentType(false, 'Bass Clarinet', 'Bscl.', 'Woodwind', 'Bass Clarinets', 'Bscls.'),
  "a bass clarinet": new InstrumentType(false, 'A Bass Clarinet', 'Bscl.A', 'Woodwind', 'A Bass Clarinet', 'Bscls.A'),
  "bassoon": new InstrumentType(false, 'Bassoon', 'fg', 'Woodwind', 'Bassoons', 'fgs'),
  "horn in e": new InstrumentType(false, 'Horn in E', 'cr.E', 'Brass', 'E Horns', 'crs.E'),
  "horn in c": new InstrumentType(false, 'Horn in C', 'cr.C', 'Brass', 'C Horns', 'crs.C'),
  "horn in f": new InstrumentType(false, 'Horn in F', 'cr.', 'Brass', 'F Horns', 'crs'),
  "f horn": new InstrumentType(false, 'Horn in F', 'cr.', 'Brass', 'F Horns', 'crs'),
  "horn": new InstrumentType(false, 'Horn', 'cr.', 'Brass', 'Horns', 'crs'),
  "f trumpet": new InstrumentType(false, 'F Trumpet', 'trp.F', 'Brass', 'F Trumpets', 'trps.F'),
  "f trumpets (1-3)": new InstrumentType(false, 'F Trumpets (1-3)', 'trps.F', 'Brass', null, 'trps.F'),
  "trombone": new InstrumentType(false, 'Trombone', 'trb.', 'Brass', 'Trombones', 'trbs.'),
  "trombones (1-3)": new InstrumentType(false, 'Trombones (1-3)', 'trbs.F', 'Brass', null, 'trbs.F'),
  "bass tuba in e♭": new InstrumentType(false, 'E♭ Bass tuba', 'Bstb', 'Brass', 'E♭ Bass tubas', 'Bstbs.'),
  "timpani": new InstrumentType(false, 'Timpani', 'timp', 'Percussion', 'Timpani', 'timp'),
  "organ": new InstrumentType(false, 'Organ', 'org', 'Percussion', 'Organs', 'org'),
  "violin": new InstrumentType(false, 'Violin', 'vln', 'Strings', 'Violins', 'vlns'),
  "viola": new InstrumentType(false, 'Viola', 'vla', 'Strings', 'Violas', 'vlas'),
  "cello": new InstrumentType(false, 'Cello', 'vc', 'Strings', 'Cellos', 'vcs'),
  "violoncello": new InstrumentType(false, 'Cello', 'vc', 'Strings', 'Cellos', 'vcs'),
  "contrabass": new InstrumentType(false, 'Contrabass', 'vc', 'Strings', 'Contrabassi', 'Cb'),
  "men": new InstrumentType(false, 'Men', 'Men', 'Cast', null, 'Men'),
  "elsa": new InstrumentType(false, 'Elsa', 'E', 'Cast', null, 'Elsa'),
  "ortrud": new InstrumentType(false, 'Ortrud', 'O', 'Cast', null, 'Ort.'),
  "friedrich": new InstrumentType(false, 'Friedrich', 'F', 'Cast', null, 'Fried.'),
  "könig": new InstrumentType(false, 'König', 'K', 'Cast', null, 'Kön.'),
  "women and noble boys soprano": new InstrumentType(false, 'Women & boys S', 'S', 'Cast', null, 'S.'),
  "women and noble boys alto": new InstrumentType(false, 'Women & boys A', 'A', 'Cast', null, 'A.'),
  "tenor": new InstrumentType(false, 'Tenor', 'T', 'Cast', null, 'T.'),
  "bass": new InstrumentType(false, 'Bass', 'B', 'Cast', null, 'B.'),
  "lohengrin": new InstrumentType(false, 'Lohengrin', 'Lo', 'Cast', null, 'Loh')
}; // Working with InstrumentType objects

function instrumentMatch(type, multiplicity, instrumentSet) {
  if (instrumentSet[type.toLowerCase()]) {
    var it = new InstrumentType(instrumentSet[type.toLowerCase()]);
    if (multiplicity) it.multiplicity = multiplicity;
    return it;
  }
}

function getInstrumentType(instLabel, instrumentSet) {
  // find an InstrumentType to match the MEI label
  if (!instLabel) {
    console.log("no label");
    return false;
  }

  var multiplicity = false;

  if (/^[0-9]+/.test(instLabel)) {
    var pos = instLabel.search(/[^0-9 ]+/);
    multiplicity = Number(instLabel.substring(0, pos));
    instLabel = instLabel.substring(pos);
  }

  var type = instLabel;
  var no = false;
  var pos = instLabel.search(/ +[0-9]+/);

  if (pos > -1) {
    type = instLabel.substring(0, pos);
    var noString = instLabel.substr(pos);
    pos = instLabel.search(/[0-9]/);
    no = parseInt(instLabel.substr(pos), 10);
  }

  var instr = instrumentMatch(type, multiplicity, instrumentSet);

  if (!instr) {
    console.log("missed", type, noString);
    instr = new InstrumentType(false, type, type.substring(0, 3), 'Cast', type.substring(0, 3)); //		return false;
  }

  instr.no = no;
  return instr;
} ///////////////////
//
// 3. Ribbon functions and classes
//  Here, we don't care about separate notes, only blocks of continuous sound


function MeasureEventBlock(startTime, endTime, event) {
  this.start = startTime;
  this.end = endTime;
  this.duration = endTime - startTime;
  this.sounding = event.nodeName == 'note' || event.nodeName == 'chord';
  this.events = [event];

  this.extend = function (startTime, endTime, event) {
    this.events.push(event);
    this.start = Math.min(startTime, this.start);
    this.end = Math.max(endTime, this.end);
  };

  this["extends"] = function (event) {
    // Boolean: Is the new event of the same type as others in this
    // object? (so does it continue the same on/off state?)
    return event.nodeName == 'note' && this.sounding || event.nodeName == 'note' && this.sounding || event.nodeName == 'rest' && !this.sounding;
  };
}

function Orchestration(MEIString, additionalInstruments) {
  // The Orchestration object holds a parsed MEI XML object
  // and then extracts various elements of the orchestration
  // for drawing.
  this.MEIString = MEIString;
  this.instrumentSet = _objectSpread(_objectSpread({}, Instruments), additionalInstruments);
  var p = new DOMParser();
  this.MEIObject = p.parseFromString(MEIString, "text/xml");
  this.measureCount = countMeasures(this.MEIObject);
  this.instruments = findInstruments(this.MEIObject, this.instrumentSet);
} // An Instrument is a particular case of an InstrumentType in a
// score, e.g. Violin I in a given MEI file is an Instrument with
// InstrumentType violin. It is a container for blocks of contiguous
// sounding or silence, from which the ribbons are derived.


function Instrument(staffDef, MEIObject, instrumentSet) {
  // Instrument object (includes activity info)
  this.MEIObject = MEIObject;
  this.instrumentSet = instrumentSet;
  this.name = staffDef.getAttributeNS(null, 'label');
  this.n = staffDef.getAttributeNS(null, 'n');

  if (!this.name) {
    var label = staffDef.querySelector('label');

    if (label) {
      this.name = label.textContent.trim();
    }
  }

  if (this.name) {
    this.type = getInstrumentType(this.name, instrumentSet);
  } else {
    console.log("No label", staffDef);
  }

  this.number = false;
  this.measures = findMeasures(this.n, MEIObject);

  this.caption = function (SVG, x, y, active) {
    if (!this.type) this.type = getInstrumentType(this.name, this.instrumentSet);

    if (this.type) {
      if (this.type.multiplicity) {
        return /*#__PURE__*/_react["default"].createElement("text", {
          x: x,
          y: y
        }, this.type.multiplicity, " ", this.type.plural);
      } else {
        return /*#__PURE__*/_react["default"].createElement("text", {
          x: x,
          y: y
        }, this.type.name);
      }
      /*			return(<text x={x} y={y}>{active ? this.name
      																: this.type.shortname}</text>);*/

    } else if (this.name) {
      return /*#__PURE__*/_react["default"].createElement("text", {
        x: x,
        y: y
      }, this.name);
    } else {
      return /*#__PURE__*/_react["default"].createElement("div", null);
    }
  };

  this.classes = function () {
    if (!this.type) this.type = getInstrumentType(this.name, this.instrumentSet);

    if (this.type) {
      return this.type.shortname + " " + this.type.section;
    }

    return '';
  };

  this.typeEq = function (otherInstrument) {
    return this.type.name === otherInstrument.type.name;
  };

  this.onOffArray = function () {
    // A simple rhythm-only array of contiguous sounding block, of the
    // form [[<sounding-starts>, <soundingends>], [<sounding2-starts...]]
    var prevMeasure = false;
    var onOffArray = [];
    var prevn = false;
    var start = false;
    var startX = false;

    for (var i = 0; i < this.measures.length; i++) {
      var measure = this.measures[i];
      var n = measure.barNo - 1;

      if ((start || start === 0) && (prevn || prevn === 0) && prevn < n - 1) {
        // There's been at least one empty bar. Need to close
        onOffArray.push([start, prevn + 1]);
        start = false;
      }

      for (var j = 0; j < measure.events.length; j++) {
        var event = measure.events[j];

        if (event.sounding) {
          if (!start && start !== 0) {
            start = n + event.start / measure.duration;
          }
        } else {
          if (start || start === 0) {
            onOffArray.push([start, n + event.start / measure.duration]);
            start = false;
          }
        }
      }

      prevn = n;
    }

    if (start || start === 0) {
      onOffArray.push([start, prevn + 1]);
    }

    return onOffArray;
  };
} ///////////////////////
// Mergine instruments
// Instruments can (optionally) automatically be merged if they're
// playing at the same time. This was dropped from the TimeMachine
// app, and could use more options for the logic.


function mergedInstruments(instruments) {
  var playingSets = [];
  var covered = [];
  var instrumentsPlaying = instruments.map(function (x) {
    return x.onOffArray();
  });

  for (var i = 0; i < instruments.length; i++) {
    if (covered.indexOf(i) === -1) {
      var playing = instrumentsPlaying[i];
      var playingSet = {
        playing: playing,
        instruments: [instruments[i]]
      };
      covered.push(i);

      for (var j = i + 1; j < instruments.length; j++) {
        if (onOffArrayEq(playing, instrumentsPlaying[j])) {
          covered.push(j);
          playingSet.instruments.push(instruments[j]);
        }
      } //			isAllOfInstrument(playingSet, instruments);


      playingSets.push(playingSet);
    }
  }

  return playingSets;
}

function singleInstrument(set) {
  return set.every(function (x) {
    return x.type && x.type.name === set[0].type.name;
  }) ? set[0].type.name : false;
}

function singleSection(set) {
  return set.every(function (x) {
    return x.type && x.type.section === set[0].type.section;
  }) ? set[0].type.section : false;
}

function caption(set, orchestra, active, mover, mout, x, y, baseclass, n) {
  var inst = singleInstrument(set);
  var section = singleSection(set);
  var cl = '';

  if (active) {
    if (set.length === 1) {
      cl = section + " " + inst + " nnn" + n;
      return {
        obj: /*#__PURE__*/_react["default"].createElement("g", {
          onMouseOver: mover,
          onMouseOut: mout
        }, /*#__PURE__*/_react["default"].createElement("text", {
          x: x,
          y: y,
          className: baseclass + cl
        }, set[0].name)),
        cl: cl
      };
    } else if (section && orchestra.filter(function (x) {
      return x.type.section === section;
    }).length === set.length) {
      // This is the entire section at this point. FIXME, this is
      // broken logic (because it's so local). I may need to preset an
      // orchestra somehow.
      cl = section + " " + inst + " nnn" + n;
      return {
        obj: /*#__PURE__*/_react["default"].createElement("g", {
          onMouseOver: mover,
          onMouseOut: mout
        }, /*#__PURE__*/_react["default"].createElement("text", {
          x: x,
          y: y,
          className: baseclass + cl
        }, section)),
        cl: cl
      };
    } else {
      var out = set[0].name;
      cl = (section ? section : 'misc') + " " + (inst ? inst : 'miscinst') + " nnn" + n;

      for (var i = 1; i < set.length - 1; i++) {
        out += ", " + set[0].name;
      }

      return {
        obj: /*#__PURE__*/_react["default"].createElement("g", {
          onMouseOver: mover,
          onMouseOut: mout
        }, /*#__PURE__*/_react["default"].createElement("text", {
          x: x,
          y: y,
          className: baseclass + cl
        }, out + " & " + set[set.length - 1].name)),
        cl: cl
      };
    }
  } else {
    if (set.length === 1) {
      cl = section + " " + inst + " nnn" + n;
      return {
        obj: /*#__PURE__*/_react["default"].createElement("g", {
          onMouseOver: mover,
          onMouseOut: mout
        }, /*#__PURE__*/_react["default"].createElement("text", {
          x: x,
          y: y,
          className: baseclass + cl
        }, set[0].type.shortname)),
        cl: cl
      };
    } else if (section && orchestra.filter(function (x) {
      return x.type.section === section;
    }).length === set.length) {
      cl = section + " " + inst + " nnn" + n;
      return {
        obj: /*#__PURE__*/_react["default"].createElement("g", {
          onMouseOver: mover,
          onMouseOut: mout
        }, /*#__PURE__*/_react["default"].createElement("text", {
          x: x,
          y: y,
          className: baseclass + cl
        }, section.substring(0, 3))),
        cl: cl
      };
    } else if (inst && orchestra.filter(function (x) {
      return x.type.name === inst;
    }).length === set.length) {
      cl = section + " " + inst + " nnn" + n;
      return {
        obj: /*#__PURE__*/_react["default"].createElement("g", {
          onMouseOver: mover,
          onMouseOut: mout
        }, /*#__PURE__*/_react["default"].createElement("text", {
          x: x,
          y: y,
          className: baseclass + cl
        }, set[0].type.shortplural)),
        cl: cl
      };
    } else {
      cl = (section ? section : 'misc') + " " + (inst ? inst : 'miscinst') + " nnn" + n;
      return {
        obj: /*#__PURE__*/_react["default"].createElement("g", {
          onMouseOver: mover,
          onMouseOut: mout
        }, /*#__PURE__*/_react["default"].createElement("text", {
          x: x,
          y: y,
          className: baseclass + cl
        }, inst ? set[0].type.shortplural : 'misc')),
        cl: cl
      };
    }
  }
}

function isAllOfInstrument(set, orchestra) {
  // returns true if all instruments of a given type in all are
  // represented in set. V fragile, not very musical, logic
  if (set.length) {
    var instr = set[0].type.name;

    if (set.every(function (x) {
      return x.type.name === instr;
    })) {
      return orchestra.filter(function (x) {
        return x.type.name === instr;
      }).length === set.length;
    }
  }

  return false;
}

function entireSection(set, orchestra) {
  // returns true if all instruments are from the same section and are
  // all of that section present. V fragile, not very musical, logic
  if (set.length) {
    var section = set[0].type.section;

    if (set.every(function (x) {
      return x.type.section === section;
    })) {
      return orchestra.filter(function (x) {
        return x.type.section === section;
      }).length === set.length;
    }
  }

  return false;
}

function onOffArrayEq(arr1, arr2) {
  if (arr1.length !== arr2.length) return false;

  for (var i = 0; i < arr1.length; i++) {
    if (arr1[i][0] !== arr2[i][0] || arr1[i][1] !== arr2[i][1]) return false;
  }

  return true;
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9saWJyYXJ5L21laVV0aWxzLmpzIl0sIm5hbWVzIjpbImR1cmF0aW9uIiwiZXZlbnQiLCJNRUlPYmplY3QiLCJiYXNlIiwiZ2V0QXR0cmlidXRlTlMiLCJjaG9yZCIsImNsb3Nlc3QiLCJOdW1iZXIiLCJkdXIiLCJkb3RzIiwiTWF0aCIsInBvdyIsImNvdW50TWVhc3VyZXMiLCJtZWFzdXJlQ291bnQiLCJldmFsdWF0ZSIsIm5zUmVzb2x2ZXIiLCJYUGF0aFJlc3VsdCIsIk5VTUJFUl9UWVBFIiwibnVtYmVyVmFsdWUiLCJmaW5kTWVhc3VyZXMiLCJuIiwic3RhdmVzIiwiT1JERVJFRF9OT0RFX0lURVJBVE9SVFlQRSIsInN0YWZmIiwiaXRlcmF0ZU5leHQiLCJiYXJzIiwicHVzaCIsIkluc3RydW1lbnRNZWFzdXJlIiwiYmFyU3RhZmYiLCJiYXJObyIsImV2ZW50cyIsImV2ZW50T2JqcyIsInQiLCJuZXd0IiwibGVuZ3RoIiwiZXh0ZW5kIiwiTWVhc3VyZUV2ZW50QmxvY2siLCJmaW5kSW5zdHJ1bWVudHMiLCJpbnN0cnVtZW50U2V0Iiwic3RhZmZEZWZzIiwic3RhZmZEZWYiLCJpbnN0cnVtZW50cyIsIkluc3RydW1lbnQiLCJJbnN0cnVtZW50VHlwZSIsInByb3RvIiwibmFtZSIsInNob3J0bmFtZSIsInNlY3Rpb24iLCJwbHVyYWwiLCJzaG9ydHBsdXJhbCIsImVxIiwiaW5zdFR5cGUiLCJJbnN0cnVtZW50cyIsImluc3RydW1lbnRNYXRjaCIsInR5cGUiLCJtdWx0aXBsaWNpdHkiLCJ0b0xvd2VyQ2FzZSIsIml0IiwiZ2V0SW5zdHJ1bWVudFR5cGUiLCJpbnN0TGFiZWwiLCJjb25zb2xlIiwibG9nIiwidGVzdCIsInBvcyIsInNlYXJjaCIsInN1YnN0cmluZyIsIm5vIiwibm9TdHJpbmciLCJzdWJzdHIiLCJwYXJzZUludCIsImluc3RyIiwic3RhcnRUaW1lIiwiZW5kVGltZSIsInN0YXJ0IiwiZW5kIiwic291bmRpbmciLCJub2RlTmFtZSIsIm1pbiIsIm1heCIsIk9yY2hlc3RyYXRpb24iLCJNRUlTdHJpbmciLCJhZGRpdGlvbmFsSW5zdHJ1bWVudHMiLCJwIiwiRE9NUGFyc2VyIiwicGFyc2VGcm9tU3RyaW5nIiwibGFiZWwiLCJxdWVyeVNlbGVjdG9yIiwidGV4dENvbnRlbnQiLCJ0cmltIiwibnVtYmVyIiwibWVhc3VyZXMiLCJjYXB0aW9uIiwiU1ZHIiwieCIsInkiLCJhY3RpdmUiLCJjbGFzc2VzIiwidHlwZUVxIiwib3RoZXJJbnN0cnVtZW50Iiwib25PZmZBcnJheSIsInByZXZNZWFzdXJlIiwicHJldm4iLCJzdGFydFgiLCJpIiwibWVhc3VyZSIsImoiLCJtZXJnZWRJbnN0cnVtZW50cyIsInBsYXlpbmdTZXRzIiwiY292ZXJlZCIsImluc3RydW1lbnRzUGxheWluZyIsIm1hcCIsImluZGV4T2YiLCJwbGF5aW5nIiwicGxheWluZ1NldCIsIm9uT2ZmQXJyYXlFcSIsInNpbmdsZUluc3RydW1lbnQiLCJzZXQiLCJldmVyeSIsInNpbmdsZVNlY3Rpb24iLCJvcmNoZXN0cmEiLCJtb3ZlciIsIm1vdXQiLCJiYXNlY2xhc3MiLCJpbnN0IiwiY2wiLCJvYmoiLCJmaWx0ZXIiLCJvdXQiLCJpc0FsbE9mSW5zdHJ1bWVudCIsImVudGlyZVNlY3Rpb24iLCJhcnIxIiwiYXJyMiJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQTs7QUFDQTs7Ozs7Ozs7Ozs7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVNBLFFBQVQsQ0FBa0JDLEtBQWxCLEVBQXlCQyxTQUF6QixFQUFtQztBQUNsQztBQUNBO0FBQ0MsTUFBSUMsSUFBSSxHQUFHRixLQUFLLENBQUNHLGNBQU4sQ0FBcUIsSUFBckIsRUFBMkIsS0FBM0IsQ0FBWDs7QUFDQSxNQUFHLENBQUNELElBQUosRUFBUztBQUNQOztBQUNBO0FBQ0o7QUFDRSxRQUFJRSxLQUFLLEdBQUdKLEtBQUssQ0FBQ0ssT0FBTixD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QUNDLEtBQUosQ0FBVSxVQUFBeEIsQ0FBQztBQUFBLGFBQUlBLENBQUMsQ0FBQ3ZDLElBQUYsQ0FBT1AsT0FBUCxLQUFtQkEsT0FBdkI7QUFBQSxLQUFYLENBQUgsRUFBOEM7QUFDN0MsYUFBT3dFLFNBQVMsQ0FBQ08sTUFBVixDQUFpQixVQUFBakMsQ0FBQztBQUFBLGVBQUlBLENBQUMsQ0FBQ3ZDLElBQUYsQ0FBT1AsT0FBUCxLQUFpQkEsT0FBckI7QUFBQSxPQUFsQixFQUFnRGIsTUFBaEQsS0FBeURrRixHQUFHLENBQUNsRixNQUFwRTtBQUNBO0FBQ0Q7O0FBQ0QsU0FBTyxLQUFQO0FBQ0E7O0FBRUQsU0FBU2dGLFlBQVQsQ0FBc0JnQixJQUF0QixFQUE0QkMsSUFBNUIsRUFBaUM7QUFDaEMsTUFBR0QsSUFBSSxDQUFDaEcsTUFBTCxLQUFlaUcsSUFBSSxDQUFDakcsTUFBdkIsRUFBK0IsT0FBTyxLQUFQOztBQUMvQixPQUFJLElBQUlxRSxDQUFDLEdBQUMsQ0FBVixFQUFhQSxDQUFDLEdBQUMyQixJQUFJLENBQUNoRyxNQUFwQixFQUE0QnFFLENBQUMsRUFBN0IsRUFBZ0M7QUFDL0IsUUFBRzJCLElBQUksQ0FBQzNCLENBQUQsQ0FBSixDQUFRLENBQVIsTUFBYTRCLElBQUksQ0FBQzVCLENBQUQsQ0FBSixDQUFRLENBQVIsQ0FBYixJQUEyQjJCLElBQUksQ0FBQzNCLENBQUQsQ0FBSixDQUFRLENBQVIsTUFBYTRCLElBQUksQ0FBQzVCLENBQUQsQ0FBSixDQUFRLENBQVIsQ0FBM0MsRUFBdUQsT0FBTyxLQUFQO0FBQ3ZEOztBQUNELFNBQU8sSUFBUDtBQUNBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7IENvbXBvbmVudCB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IG5zUmVzb2x2ZXIsIHN2Z0xpbmUsIHN2Z1JvdW5kZWRSZWN0LCBzdmdHcm91cCwgc3ZnU3Bhbiwgc3ZnVGV4dCB9IGZyb20gJy4uL2xpYnJhcnkvc3ZnVXRpbHMuanMnO1xuXG4vLy8vLy8vL1xuLy9cbi8vIFRoaXMgbGlicmFyeSBpcyBwcmltYXJpbHkgdXNlZCBieSB0aGUgb3JjaGVzdHJhbCByaWJib24sIHdoaWNoXG4vLyBkcmF3cyBNRUkgb3JjaGVzdHJhbCBzY29yZXMgYXMgYSBzb3J0IG9mIHpvb21lZC1vdXQgcGlhbm8tcm9sbFxuLy8gdmlzdWFsaXNhdGlvbiwgYnV0IHNvbWUgb2YgdGhlIGZ1bmN0aW9uYWxpdHkgaXMgZ2VuZXJpY2FsbHlcbi8vIHVzZWZ1bCBmb3Igb3RoZXIgTUVJLXByb2Nlc3NpbmcgdGFza3MuXG4vL1xuXG4vLy8vLy8vLy9cbi8vXG4vLyAxLiBUaW1lIGFuZCBkdXJhdGlvbiBmdW5jdGlvbnNcbi8vXG5mdW5jdGlvbiBkdXJhdGlvbihldmVudCwgTUVJT2JqZWN0KXtcblx0Ly8gR2V0IGEgZHVyYXRpb24gYXMgYSBudW1iZXIgb2YgY3JvdGNoZXRzIGZyb20gYW4gTUVJIG5vdGUgb3Jcblx0Ly8gcmVzdC4gVGhpcyBpcyBjZXJ0YWlubHkgdG9vIGNydWRlIHRvIGJlIGFjY3VyYXRlLlxuICB2YXIgYmFzZSA9IGV2ZW50LmdldEF0dHJpYnV0ZU5TKG51bGwsICdkdXInKTtcbiAgaWYoIWJhc2Upe1xuICAgIC8vIFByb2JhYmx5IGEgY2hvcmQg4oCTwqBnZXQgZHVyIGZyb20gcGFyZW50XG4gICAgLypiYXNlID0gTUVJT2JqZWN0LmV2YWx1YXRlKCcuL2FuY2VzdG9yOjoqW0BkdXJdWzFdJywgZXZlbnQsIG5zUmVzb2x2ZXIsXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRYUGF0aFJlc3VsdC5OVU1CRVJfVFlQRSwgbnVsbCkubnVtYmVyVmFsdWU7Ki9cblx0XHR2YXIgY2hvcmQgPSBldmVudC5jbG9zZXN0KCdjaG9yZCcpO1xuXHRcdGlmKGNob3JkKSBiYXNlID0gY2hvcmQuZ2V0QXR0cmlidXRlTlMobnVsbCwgJ2R1cicpO1xuICB9XG4gIGJhc2UgPSAxL051bWJlcihiYXNlKTtcbiAgdmFyIGR1ciA9IGJhc2U7XG4gIHZhciBkb3RzID0gZXZlbnQuZ2V0QXR0cmlidXRlTlMobnVsbCwgJ2RvdHMnKTtcbiAgaWYoZG90cykgZHVyID0gYmFzZSooMiAtICgxIC8gKE1hdGgucG93KDIsIE51bWJlcihkb3RzKSkpKSk7XG4gIHJldHVybiBkdXIqNDtcbn1cbmZ1bmN0aW9uIGNvdW50TWVhc3VyZXMoTUVJT2JqZWN0KXtcbiAgLy8gR2l2ZW4gcGFyc2VkIE1FSSwgaG93IG1hbnkgbWVhc3VyZXMgYXJlIHRoZXJlP1xuICB2YXIgbWVhc3VyZUNvdW50ID0gTUVJT2JqZWN0LmV2YWx1YXRlKCdjb3VudCgvL21laTptZWFzdXJlKScsIE1FSU9iamVjdCwgbnNSZXNvbHZlciwgWFBhdGhSZXN1bHQuTlVNQkVSX1RZUEUsIG51bGwpO1xuICByZXR1cm4gbWVhc3VyZUNvdW50Lm51bWJlclZhbHVlO1xufVxuXG5mdW5jdGlvbiBmaW5kTWVhc3VyZXMobiwgTUVJT2JqZWN0KXtcbiAgLy8gR2l2ZW4gcGFyc2VkIE1FSSwgZmluZCBhbGwgdGhlIGJhcnMgd2l0aCBtdXNpYyBpbiBmb3Igc3RhZmYvaW5zdHJ1bWVudCBuXG4gIHZhciBzdGF2ZXMgPSBNRUlPYmplY3QuZXZhbHVhdGUoJy8vbWVpOnN0YWZmW0BuPScrbisnIGFuZCAuLy9tZWk6bm90ZV0nLCBNRUlPYmplY3QsIG5zUmVzb2x2ZXIsIFhQYXRoUmVzdWx0Lk9SREVSRURfTk9ERV9JVEVSQVRPUlRZUEUsIG51bGwpO1xuICB2YXIgc3RhZmYgPSBzdGF2ZXMuaXRlcmF0ZU5leHQoKTtcbiAgdmFyIGJhcnMgPSBbXTtcbiAgd2hpbGUoc3RhZmYpe1xuXHRcdC8vIENvbnN0cnVjdG9yIGZvciBJbnN0cnVtZW50TWVhc3VyZSBpcyBiZWxvd1xuICAgIGJhcnMucHVzaChuZXcgSW5zdHJ1bWVudE1lYXN1cmUoc3RhZmYsIE1FSU9iamVjdCkpO1xuICAgIHN0YWZmID0gc3RhdmVzLml0ZXJhdGVOZXh0KCk7XG4gIH1cbiAgcmV0dXJuIGJhcnM7XG59XG5cbmZ1bmN0aW9uIEluc3RydW1lbnRNZWFzdXJlKGJhclN0YWZmLCBNRUlPYmplY3Qpe1xuICAvLyBUaGlzIG9iamVjdCBjb250YWlucyBhbGwgdGhlIGluZm9ybWF0aW9uIGZvciBhIGJhciBvZiBtdXNpY1xuICAvLyBhcyBwbGF5ZWQgYnkgb25lIGluc3RydW1lbnQgb24gb25lIHN0YWZmXG4gIHRoaXMuTUVJT2JqZWN0ID0gTUVJT2JqZWN0O1xuICB0aGlzLmJhclN0YWZmID0gYmFyU3RhZmY7XG4gIHRoaXMuYmFyTm8gPSB0aGlzLk1FSU9iamVjdC5ldmFsdWF0ZSgnLi9hbmNlc3Rvcjo6bWVpOm1lYXN1cmUvQG4nLCBiYXJTdGFmZixcbiAgICBuc1Jlc29sdmVyLCBYUGF0aFJlc3VsdC5OVU1CRVJfVFlQRSwgbnVsbCkubnVtYmVyVmFsdWU7XG4gIHRoaXMuZXZlbnRzID0gW107XG4gIHRoaXMuZHVyYXRpb24gPSAwO1xuICB2YXIgZXZlbnRPYmpzID0gdGhpcy5NRUlPYmplY3QuZXZhbHVhdGUoJy4vbWVpOmxheWVyLy9tZWk6bm90ZSB8IC4vbWVpOmxheWVyLy9tZWk6cmVzdCB8IC4vbWVpOmxheWVyLy9tZWk6Y2hvcmQnLCBiYXJTdGFmZiwgbnNSZXNvbHZlciwgWFBhdGhSZXN1bHQuT1JERVJFRF9OT0RFX0lURVJBVE9SVFlQRSwgbnVsbCk7XG4gIHZhciBldmVudCA9IGV2ZW50T2Jqcy5pdGVyYXRlTmV4dCgpO1xuICB2YXIgdCA9IDA7XG4gIHZhciBuZXd0ID0gZmFsc2U7XG4gIHdoaWxlKGV2ZW50KXtcbiAgICBuZXd0ID0gdCtkdXJhdGlvbihldmVudCwgTUVJT2JqZWN0KTtcbiAgICBpZih0aGlzLmV2ZW50cy5sZW5ndGggJiYgdGhpcy5ldmVudHNbdGhpcy5ldmVudHMubGVuZ3RoLTFdLmV4dGVuZHMoZXZlbnQpKXtcbiAgICAgIC8vIEp1c3QgZXh0ZW5kIHRoZSBwcmV2aW91cyB0aGluZyBpbiBldmVudHNcbiAgICAgIHRoaXMuZXZlbnRzW3RoaXMuZXZlbnRzLmxlbmd0aC0xXS5leHRlbmQodCwgbmV3dCwgZXZlbnQpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmV2ZW50c1t0aGlzLmV2ZW50cy5sZW5ndGhdID0gbmV3IE1lYXN1cmVFdmVudEJsb2NrKHQsIG5ld3QsIGV2ZW50KTtcbiAgICB9XG4gICAgdCA9IG5ld3Q7XG4gICAgZXZlbnQgPSBldmVudE9ianMuaXRlcmF0ZU5leHQoKTtcbiAgfVxuICB0aGlzLmR1cmF0aW9uID0gdDtcbn1cblxuLy8vLy8vLy8vLy8vLy8vLy8vL1xuLy9cbi8vIDIuIE9yY2hlc3RyYXRpb25cblxuZnVuY3Rpb24gZmluZEluc3RydW1lbnRzKE1FSU9iamVjdCwgaW5zdHJ1bWVudFNldCl7XG4gIC8vIEdpdmVuIHBhcnNlZCBNRUksIHJldHVybiBvYmplY3RzIGZvciBhbGwgaW5zdHJ1bWVudHNcbiAgdmFyIHN0YWZmRGVmcyA9IE1FSU9iamVjdC5ldmFsdWF0ZSgnLy9tZWk6c3RhZmZEZWYnLCBNRUlPYmplY3QsIG5zUmVzb2x2ZXIsIFhQYXRoUmVzdWx0Lk9SREVSRURfTk9ERV9JVEVSQVRPUlRZUEUsIG51bGwpO1xuICB2YXIgc3RhZmZEZWYgPSBzdGFmZkRlZnMuaXRlcmF0ZU5leHQoKTtcbiAgdmFyIGluc3RydW1lbnRzID0gW107XG4gIHdoaWxlKHN0YWZmRGVmKXtcblx0XHQvLyBDb25zdHJ1Y3RvciBmb3IgSW5zdHJ1bWVudCBpcyBiZWxvd1xuICAgIGluc3RydW1lbnRzW3N0YWZmRGVmLmdldEF0dHJpYnV0ZU5TKG51bGwsICduJyktMV09bmV3IEluc3RydW1lbnQoc3RhZmZEZWYsIE1FSU9iamVjdCwgaW5zdHJ1bWVudFNldCk7XG4gICAgc3RhZmZEZWYgPSBzdGFmZkRlZnMuaXRlcmF0ZU5leHQoKTtcbiAgfVxuICByZXR1cm4gaW5zdHJ1bWVudHM7XG59XG5cbi8vIFdlIG5lZWQgbW9yZSBzdHJ1Y3R1cmVkIGluZm9ybWF0aW9uIGFib3V0IGluc3RydW1lbnRzIChwb3NzaWJseVxuLy8gdGhpcyBpcyBwYXJ0bHkgYmVjYXVzZSB3ZSBhcmUgdW5kZXItdXNpbmcgdGhlIE1FSSBmYWNpbGl0aWVzIGZvciB0aGlzKVxuLy8gV2UgZGVmaW5lIEluc3RydW1lbnRUeXBlIGFzIHRoZSBhYnN0cmFjdCBjYXRlZ29yeSAoZS5nLiBWaW9saW4pIGFuZFxuLy8gSW5zdHJ1bWVudCBhcyB0aGUgdGhpbmcgaW4gdGhlIHNjb3JlIChlLmcuIFZpb2xpbiBJKVxuXG4vLyBGSVhNRTogQ3VycmVudGx5LCB0aGlzIGlzIHBvb3JseSBhZGFwdGVkIGZvciBsb2NhbGlzYXRpb24gKHNlZSwgZm9yIGV4YW1wbGUsXG4vLyB0aGUgY29yIGFuZ2xhaXMgZW50cnkuIElmIHRoaXMgaXMgdG8gYmUgaW50dWl0aXZlLCB0aGlzIHdpbGwgbmVlZCBleHBhbnNpb24uXG5mdW5jdGlvbiBJbnN0cnVtZW50VHlwZShwcm90bywgbmFtZSwgc2hvcnRuYW1lLCBzZWN0aW9uLCBwbHVyYWwsIHNob3J0cGx1cmFsKXtcbiAgaWYocHJvdG8pe1xuICAgIHRoaXMubmFtZT1wcm90by5uYW1lO1xuICAgIHRoaXMuc2hvcnRuYW1lPXByb3RvLnNob3J0bmFtZTtcbiAgICB0aGlzLnNlY3Rpb249cHJvdG8uc2VjdGlvbjtcblx0XHR0aGlzLnBsdXJhbD1wcm90by5wbHVyYWw7XG5cdFx0dGhpcy5zaG9ydHBsdXJhbCA9IHByb3RvLnNob3J0cGx1cmFsO1xuICB9IGVsc2Uge1xuICAgIHRoaXMubmFtZT1uYW1lO1xuICAgIHRoaXMuc2hvcnRuYW1lPXNob3J0bmFtZTtcbiAgICB0aGlzLnNlY3Rpb249c2VjdGlvbjtcblx0XHR0aGlzLnBsdXJhbD1wbHVyYWw7XG5cdFx0dGhpcy5zaG9ydHBsdXJhbD1zaG9ydHBsdXJhbDtcbiAgfVxuXHR0aGlzLmVxID0gZnVuY3Rpb24oaW5zdFR5cGUpIHtcblx0XHRyZXR1cm4gdGhpcy5uYW1lPT09aW5zdFR5cGUubmFtZTtcblx0fTtcbn1cblxudmFyIEluc3RydW1lbnRzID0ge1xuICBcImZsdXRlXCI6IG5ldyBJbnN0cnVtZW50VHlwZShmYWxzZSwnRmx1dGUnLCAnZmwnLCAnV29vZHdpbmQnLCAnRmx1dGVzJywgJ2ZscycpLFxuICBcInBpY2NvbG9cIjogbmV3IEluc3RydW1lbnRUeXBlKGZhbHNlLCdQaWNjb2xvJywgJ3BpYycsICdXb29kd2luZCcsICdQaWNjb2xvcycsICdwaWNzJyksXG4gIFwib2JvZVwiOiBuZXcgSW5zdHJ1bWVudFR5cGUoZmFsc2UsJ09ib2UnLCAnaGInLCAnV29vZHdpbmQnLCAnT2JvZXMnLCAnaGJzJyksXG4gIFwiY29yIGFuZ2xhaXNcIjogbmV3IEluc3RydW1lbnRUeXBlKGZhbHNlLCdDb3IgYW5nbGFpcycsICdjYScsICdXb29kd2luZCcsICdDb3JzIGFuZ2xhaXMnLCAnY2FzJyksXG4gIFwiZW5nbGlzaCBob3JuXCI6IG5ldyBJbnN0cnVtZW50VHlwZShmYWxzZSwnQ29yIGFuZ2xhaXMnLCAnY2EnLCAnV29vZHdpbmQnLCAnQ29ycyBhbmdsYWlzJywgJ2NhcycpLFxuICBcImEgY2xhcmluZXRcIjogbmV3IEluc3RydW1lbnRUeXBlKGZhbHNlLCdBIENsYXJpbmV0JywgJ2NsLkEnLCAnV29vZHdpbmQnLCAnQSBDbGFyaW5ldHMnLCAnY2xzLkEnKSxcbiAgXCJi4pmtIGNsYXJpbmV0XCI6IG5ldyBJbnN0cnVtZW50VHlwZShmYWxzZSwnQuKZrSBDbGFyaW5ldCcsICdjbC5C4pmtJywgJ1dvb2R3aW5kJywgJ0Lima0gQ2xhcmluZXRzJywgJ2Nscy7ima0nKSxcbiAgXCJiYXNzIGNsYXJpbmV0XCI6IG5ldyBJbnN0cnVtZW50VHlwZShmYWxzZSwnQmFzcyBDbGFyaW5ldCcsICdCc2NsLicsICdXb29kd2luZCcsICdCYXNzIENsYXJpbmV0cycsICdCc2Nscy4nKSxcbiAgXCJhIGJhc3MgY2xhcmluZXRcIjogbmV3IEluc3RydW1lbnRUeXBlKGZhbHNlLCdBIEJhc3MgQ2xhcmluZXQnLCAnQnNjbC5BJywgJ1dvb2R3aW5kJywgJ0EgQmFzcyBDbGFyaW5ldCcsICdCc2Nscy5BJyksXG4gIFwiYmFzc29vblwiOiBuZXcgSW5zdHJ1bWVudFR5cGUoZmFsc2UsJ0Jhc3Nvb24nLCAnZmcnLCAnV29vZHdpbmQnLCAnQmFzc29vbnMnLCAnZmdzJyksXG4gIFwiaG9ybiBpbiBlXCI6IG5ldyBJbnN0cnVtZW50VHlwZShmYWxzZSwnSG9ybiBpbiBFJywgJ2NyLkUnLCAnQnJhc3MnLCAnRSBIb3JucycsICdjcnMuRScpLFxuICBcImhvcm4gaW4gY1wiOiBuZXcgSW5zdHJ1bWVudFR5cGUoZmFsc2UsJ0hvcm4gaW4gQycsICdjci5DJywgJ0JyYXNzJywgJ0MgSG9ybnMnLCAnY3JzLkMnKSxcbiAgXCJob3JuIGluIGZcIjogbmV3IEluc3RydW1lbnRUeXBlKGZhbHNlLCdIb3JuIGluIEYnLCAnY3IuJywgJ0JyYXNzJywgJ0YgSG9ybnMnLCAnY3JzJyksXG4gIFwiZiBob3JuXCI6IG5ldyBJbnN0cnVtZW50VHlwZShmYWxzZSwnSG9ybiBpbiBGJywgJ2NyLicsICdCcmFzcycsICdGIEhvcm5zJywgJ2NycycpLFxuICBcImhvcm5cIjogbmV3IEluc3RydW1lbnRUeXBlKGZhbHNlLCdIb3JuJywgJ2NyLicsICdCcmFzcycsICdIb3JucycsICdjcnMnKSxcbiAgXCJmIHRydW1wZXRcIjogbmV3IEluc3RydW1lbnRUeXBlKGZhbHNlLCdGIFRydW1wZXQnLCAndHJwLkYnLCAnQnJhc3MnLCAnRiBUcnVtcGV0cycsICd0cnBzLkYnKSxcbiAgXCJmIHRydW1wZXRzICgxLTMpXCI6IG5ldyBJbnN0cnVtZW50VHlwZShmYWxzZSwnRiBUcnVtcGV0cyAoMS0zKScsICd0cnBzLkYnLCAnQnJhc3MnLCBudWxsLCAndHJwcy5GJyksXG4gIFwidHJvbWJvbmVcIjogbmV3IEluc3RydW1lbnRUeXBlKGZhbHNlLCdUcm9tYm9uZScsICd0cmIuJywgJ0JyYXNzJywgJ1Ryb21ib25lcycsICd0cmJzLicpLFxuICBcInRyb21ib25lcyAoMS0zKVwiOiBuZXcgSW5zdHJ1bWVudFR5cGUoZmFsc2UsJ1Ryb21ib25lcyAoMS0zKScsICd0cmJzLkYnLCAnQnJhc3MnLCBudWxsLCAndHJicy5GJyksXG4gIFwiYmFzcyB0dWJhIGluIGXima1cIjogbmV3IEluc3RydW1lbnRUeXBlKGZhbHNlLCdF4pmtIEJhc3MgdHViYScsICdCc3RiJywgJ0JyYXNzJywgJ0Xima0gQmFzcyB0dWJhcycsICdCc3Ricy4nKSxcbiAgXCJ0aW1wYW5pXCI6IG5ldyBJbnN0cnVtZW50VHlwZShmYWxzZSwnVGltcGFuaScsICd0aW1wJywgJ1BlcmN1c3Npb24nLCAnVGltcGFuaScsICd0aW1wJyksXG4gIFwib3JnYW5cIjogbmV3IEluc3RydW1lbnRUeXBlKGZhbHNlLCdPcmdhbicsICdvcmcnLCAnUGVyY3Vzc2lvbicsICdPcmdhbnMnLCAnb3JnJyksXG4gIFwidmlvbGluXCI6IG5ldyBJbnN0cnVtZW50VHlwZShmYWxzZSwnVmlvbGluJywgJ3ZsbicsICdTdHJpbmdzJywgJ1Zpb2xpbnMnLCAndmxucycpLFxuICBcInZpb2xhXCI6IG5ldyBJbnN0cnVtZW50VHlwZShmYWxzZSwnVmlvbGEnLCAndmxhJywgJ1N0cmluZ3MnLCAnVmlvbGFzJywgJ3ZsYXMnKSxcbiAgXCJjZWxsb1wiOiBuZXcgSW5zdHJ1bWVudFR5cGUoZmFsc2UsJ0NlbGxvJywgJ3ZjJywgJ1N0cmluZ3MnLCAnQ2VsbG9zJywgJ3ZjcycpLFxuICBcInZpb2xvbmNlbGxvXCI6IG5ldyBJbnN0cnVtZW50VHlwZShmYWxzZSwnQ2VsbG8nLCAndmMnLCAnU3RyaW5ncycsICdDZWxsb3MnLCAndmNzJyksXG4gIFwiY29udHJhYmFzc1wiOiBuZXcgSW5zdHJ1bWVudFR5cGUoZmFsc2UsJ0NvbnRyYWJhc3MnLCAndmMnLCAnU3RyaW5ncycsICdDb250cmFiYXNzaScsICdDYicpLFxuICBcIm1lblwiOiBuZXcgSW5zdHJ1bWVudFR5cGUoZmFsc2UsJ01lbicsICdNZW4nLCAnQ2FzdCcsIG51bGwsICdNZW4nKSxcbiAgXCJlbHNhXCI6IG5ldyBJbnN0cnVtZW50VHlwZShmYWxzZSwnRWxzYScsICdFJywgJ0Nhc3QnLCBudWxsLCAnRWxzYScpLFxuICBcIm9ydHJ1ZFwiOiBuZXcgSW5zdHJ1bWVudFR5cGUoZmFsc2UsJ09ydHJ1ZCcsICdPJywgJ0Nhc3QnLCBudWxsLCAnT3J0LicpLFxuICBcImZyaWVkcmljaFwiOiBuZXcgSW5zdHJ1bWVudFR5cGUoZmFsc2UsJ0ZyaWVkcmljaCcsICdGJywgJ0Nhc3QnLCBudWxsLCAnRnJpZWQuJyksXG4gIFwia8O2bmlnXCI6IG5ldyBJbnN0cnVtZW50VHlwZShmYWxzZSwnS8O2bmlnJywgJ0snLCAnQ2FzdCcsIG51bGwsICdLw7ZuLicpLFxuICBcIndvbWVuIGFuZCBub2JsZSBib3lzIHNvcHJhbm9cIjogbmV3IEluc3RydW1lbnRUeXBlKGZhbHNlLCdXb21lbiAmIGJveXMgUycsICdTJywgJ0Nhc3QnLCBudWxsLCAnUy4nKSxcbiAgXCJ3b21lbiBhbmQgbm9ibGUgYm95cyBhbHRvXCI6IG5ldyBJbnN0cnVtZW50VHlwZShmYWxzZSwnV29tZW4gJiBib3lzIEEnLCAnQScsICdDYXN0JywgbnVsbCwgJ0EuJyksXG4gIFwidGVub3JcIjogbmV3IEluc3RydW1lbnRUeXBlKGZhbHNlLCdUZW5vcicsICdUJywgJ0Nhc3QnLCBudWxsLCAnVC4nKSxcbiAgXCJiYXNzXCI6IG5ldyBJbnN0cnVtZW50VHlwZShmYWxzZSwnQmFzcycsICdCJywgJ0Nhc3QnLCBudWxsLCAnQi4nKSxcbiAgXCJsb2hlbmdyaW5cIjogbmV3IEluc3RydW1lbnRUeXBlKGZhbHNlLCdMb2hlbmdyaW4nLCAnTG8nLCAnQ2FzdCcsIG51bGwsICdMb2gnKVxufTtcblxuLy8gV29ya2luZyB3aXRoIEluc3RydW1lbnRUeXBlIG9iamVjdHNcbmZ1bmN0aW9uIGluc3RydW1lbnRNYXRjaCh0eXBlLCBtdWx0aXBsaWNpdHksIGluc3RydW1lbnRTZXQpe1xuICBpZihpbnN0cnVtZW50U2V0W3R5cGUudG9Mb3dlckNhc2UoKV0pe1xuXHRcdHZhciBpdCA9IG5ldyBJbnN0cnVtZW50VHlwZShpbnN0cnVtZW50U2V0W3R5cGUudG9Mb3dlckNhc2UoKV0pO1xuXHRcdGlmKG11bHRpcGxpY2l0eSkgaXQubXVsdGlwbGljaXR5ID0gbXVsdGlwbGljaXR5O1xuICAgIHJldHVybiBpdDtcbiAgfVxufVxuZnVuY3Rpb24gZ2V0SW5zdHJ1bWVudFR5cGUoaW5zdExhYmVsLCBpbnN0cnVtZW50U2V0KXtcblx0Ly8gZmluZCBhbiBJbnN0cnVtZW50VHlwZSB0byBtYXRjaCB0aGUgTUVJIGxhYmVsXG5cdGlmKCFpbnN0TGFiZWwpIHtcblx0XHRjb25zb2xlLmxvZyhcIm5vIGxhYmVsXCIpO1xuXHRcdHJldHVybiBmYWxzZTtcblx0fVxuXHR2YXIgbXVsdGlwbGljaXR5ID0gZmFsc2U7XG5cdGlmKC9eWzAtOV0rLy50ZXN0KGluc3RMYWJlbCkpe1xuXHRcdHZhciBwb3MgPSBpbnN0TGFiZWwuc2VhcmNoKC9bXjAtOSBdKy8pO1xuXHRcdG11bHRpcGxpY2l0eSA9IE51bWJlcihpbnN0TGFiZWwuc3Vic3RyaW5nKDAscG9zKSk7XG5cdFx0aW5zdExhYmVsID0gaW5zdExhYmVsLnN1YnN0cmluZyhwb3MpO1xuXHR9XG4gIHZhciB0eXBlPWluc3RMYWJlbDtcbiAgdmFyIG5vPWZhbHNlO1xuICB2YXIgcG9zPWluc3RMYWJlbC5zZWFyY2goLyArWzAtOV0rLyk7XG4gIGlmKHBvcz4tMSl7XG4gICAgdHlwZSA9IGluc3RMYWJlbC5zdWJzdHJpbmcoMCxwb3MpO1xuICAgIHZhciBub1N0cmluZyA9IGluc3RMYWJlbC5zdWJzdHIocG9zKTtcbiAgICBwb3MgPSBpbnN0TGFiZWwuc2VhcmNoKC9bMC05XS8pO1xuICAgIG5vID0gcGFyc2VJbnQoaW5zdExhYmVsLnN1YnN0cihwb3MpLCAxMCk7XG4gIH1cbiAgdmFyIGluc3RyID0gaW5zdHJ1bWVudE1hdGNoKHR5cGUsIG11bHRpcGxpY2l0eSwgaW5zdHJ1bWVudFNldCk7XG4gIGlmKCFpbnN0cikge1xuXHRcdGNvbnNvbGUubG9nKFwibWlzc2VkXCIsIHR5cGUsIG5vU3RyaW5nKTtcblx0XHRpbnN0ciA9IG5ldyBJbnN0cnVtZW50VHlwZShmYWxzZSwgdHlwZSwgdHlwZS5zdWJzdHJpbmcoMCwgMyksICdDYXN0JywgdHlwZS5zdWJzdHJpbmcoMCwzKSk7XG4vL1x0XHRyZXR1cm4gZmFsc2U7XG5cdH1cbiAgaW5zdHIubm8gPSBubztcbiAgcmV0dXJuIGluc3RyO1xufVxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vLy9cbi8vXG4vLyAzLiBSaWJib24gZnVuY3Rpb25zIGFuZCBjbGFzc2VzXG5cblxuLy8gIEhlcmUsIHdlIGRvbid0IGNhcmUgYWJvdXQgc2VwYXJhdGUgbm90ZXMsIG9ubHkgYmxvY2tzIG9mIGNvbnRpbnVvdXMgc291bmRcblxuZnVuY3Rpb24gTWVhc3VyZUV2ZW50QmxvY2soc3RhcnRUaW1lLCBlbmRUaW1lLCBldmVudCl7XG4gIHRoaXMuc3RhcnQgPSBzdGFydFRpbWU7XG4gIHRoaXMuZW5kID0gZW5kVGltZTtcbiAgdGhpcy5kdXJhdGlvbiA9IGVuZFRpbWUtc3RhcnRUaW1lO1xuICB0aGlzLnNvdW5kaW5nID0gZXZlbnQubm9kZU5hbWU9PSdub3RlJyB8fCBldmVudC5ub2RlTmFtZT09J2Nob3JkJztcbiAgdGhpcy5ldmVudHMgPSBbZXZlbnRdO1xuXHR0aGlzLmV4dGVuZCA9IGZ1bmN0aW9uKHN0YXJ0VGltZSwgZW5kVGltZSwgZXZlbnQpe1xuXHRcdHRoaXMuZXZlbnRzLnB1c2goZXZlbnQpO1xuXHRcdHRoaXMuc3RhcnQgPSBNYXRoLm1pbihzdGFydFRpbWUsIHRoaXMuc3RhcnQpO1xuXHRcdHRoaXMuZW5kID0gTWF0aC5tYXgoZW5kVGltZSwgdGhpcy5lbmQpO1xuXHR9O1xuXHR0aGlzLmV4dGVuZHMgPSBmdW5jdGlvbihldmVudCl7XG5cdFx0Ly8gQm9vbGVhbjogSXMgdGhlIG5ldyBldmVudCBvZiB0aGUgc2FtZSB0eXBlIGFzIG90aGVycyBpbiB0aGlzXG5cdFx0Ly8gb2JqZWN0PyAoc28gZG9lcyBpdCBjb250aW51ZSB0aGUgc2FtZSBvbi9vZmYgc3RhdGU/KVxuXHRcdHJldHVybiAoZXZlbnQubm9kZU5hbWUgPT0gJ25vdGUnICYmIHRoaXMuc291bmRpbmcpXG4gICAgICB8fCAoZXZlbnQubm9kZU5hbWUgPT0gJ25vdGUnICYmIHRoaXMuc291bmRpbmcpXG4gICAgICB8fCAoZXZlbnQubm9kZU5hbWU9PSdyZXN0JyAmJiAhdGhpcy5zb3VuZGluZyk7XG5cdH07XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBPcmNoZXN0cmF0aW9uIChNRUlTdHJpbmcsIGFkZGl0aW9uYWxJbnN0cnVtZW50cyl7XG4gIC8vIFRoZSBPcmNoZXN0cmF0aW9uIG9iamVjdCBob2xkcyBhIHBhcnNlZCBNRUkgWE1MIG9iamVjdFxuICAvLyBhbmQgdGhlbiBleHRyYWN0cyB2YXJpb3VzIGVsZW1lbnRzIG9mIHRoZSBvcmNoZXN0cmF0aW9uXG4gIC8vIGZvciBkcmF3aW5nLlxuICB0aGlzLk1FSVN0cmluZyA9IE1FSVN0cmluZztcblx0dGhpcy5pbnN0cnVtZW50U2V0ID0gey4uLkluc3RydW1lbnRzLCAuLi5hZGRpdGlvbmFsSW5zdHJ1bWVudHN9XG4gIHZhciBwID0gbmV3IERPTVBhcnNlcigpO1xuICB0aGlzLk1FSU9iamVjdCA9IHAucGFyc2VGcm9tU3RyaW5nKE1FSVN0cmluZywgXCJ0ZXh0L3htbFwiKTtcbiAgdGhpcy5tZWFzdXJlQ291bnQgPSBjb3VudE1lYXN1cmVzKHRoaXMuTUVJT2JqZWN0KTtcbiAgdGhpcy5pbnN0cnVtZW50cyA9IGZpbmRJbnN0cnVtZW50cyh0aGlzLk1FSU9iamVjdCwgdGhpcy5pbnN0cnVtZW50U2V0KTtcbn1cblxuLy8gQW4gSW5zdHJ1bWVudCBpcyBhIHBhcnRpY3VsYXIgY2FzZSBvZiBhbiBJbnN0cnVtZW50VHlwZSBpbiBhXG4vLyBzY29yZSwgZS5nLiBWaW9saW4gSSBpbiBhIGdpdmVuIE1FSSBmaWxlIGlzIGFuIEluc3RydW1lbnQgd2l0aFxuLy8gSW5zdHJ1bWVudFR5cGUgdmlvbGluLiBJdCBpcyBhIGNvbnRhaW5lciBmb3IgYmxvY2tzIG9mIGNvbnRpZ3VvdXNcbi8vIHNvdW5kaW5nIG9yIHNpbGVuY2UsIGZyb20gd2hpY2ggdGhlIHJpYmJvbnMgYXJlIGRlcml2ZWQuXG5cbmZ1bmN0aW9uIEluc3RydW1lbnQoc3RhZmZEZWYsIE1FSU9iamVjdCwgaW5zdHJ1bWVudFNldCl7XG4gIC8vIEluc3RydW1lbnQgb2JqZWN0IChpbmNsdWRlcyBhY3Rpdml0eSBpbmZvKVxuICB0aGlzLk1FSU9iamVjdCA9IE1FSU9iamVjdDtcblx0dGhpcy5pbnN0cnVtZW50U2V0ID0gaW5zdHJ1bWVudFNldFxuICB0aGlzLm5hbWUgPSBzdGFmZkRlZi5nZXRBdHRyaWJ1dGVOUyhudWxsLCAnbGFiZWwnKTtcbiAgdGhpcy5uID0gc3RhZmZEZWYuZ2V0QXR0cmlidXRlTlMobnVsbCwgJ24nKTtcblx0aWYoIXRoaXMubmFtZSl7XG5cdFx0dmFyIGxhYmVsID0gc3RhZmZEZWYucXVlcnlTZWxlY3RvcignbGFiZWwnKTtcblx0XHRpZihsYWJlbCl7XG5cdFx0XHR0aGlzLm5hbWUgPSBsYWJlbC50ZXh0Q29udGVudC50cmltKCk7XG5cdFx0fVxuXHR9XG5cdGlmKHRoaXMubmFtZSl7XG5cdFx0dGhpcy50eXBlID0gZ2V0SW5zdHJ1bWVudFR5cGUodGhpcy5uYW1lLCBpbnN0cnVtZW50U2V0KTtcblx0fSBlbHNlIHtcblx0XHRjb25zb2xlLmxvZyhcIk5vIGxhYmVsXCIsIHN0YWZmRGVmKTtcblx0fVxuICB0aGlzLm51bWJlciA9IGZhbHNlO1xuICB0aGlzLm1lYXN1cmVzID0gZmluZE1lYXN1cmVzKHRoaXMubiwgTUVJT2JqZWN0KTtcblx0dGhpcy5jYXB0aW9uID0gZnVuY3Rpb24oU1ZHLCB4LCB5LCBhY3RpdmUpIHtcblx0XHRpZighdGhpcy50eXBlKSAgdGhpcy50eXBlPWdldEluc3RydW1lbnRUeXBlKHRoaXMubmFtZSwgdGhpcy5pbnN0cnVtZW50U2V0KTtcblx0XHRpZih0aGlzLnR5cGUpe1xuXHRcdFx0aWYodGhpcy50eXBlLm11bHRpcGxpY2l0eSl7XG5cdFx0XHRcdHJldHVybiAoPHRleHQgeD17eH0geT17eX0+e3RoaXMudHlwZS5tdWx0aXBsaWNpdHl9IHt0aGlzLnR5cGUucGx1cmFsfTwvdGV4dD4pO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0cmV0dXJuICg8dGV4dCB4PXt4fSB5PXt5fT57dGhpcy50eXBlLm5hbWV9PC90ZXh0Pilcblx0XHRcdH1cbi8qXHRcdFx0cmV0dXJuKDx0ZXh0IHg9e3h9IHk9e3l9PnthY3RpdmUgPyB0aGlzLm5hbWVcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0OiB0aGlzLnR5cGUuc2hvcnRuYW1lfTwvdGV4dD4pOyovXG5cdFx0fSBlbHNlIGlmKHRoaXMubmFtZSl7XG5cdFx0XHRyZXR1cm4gKDx0ZXh0IHg9e3h9IHk9e3l9Pnt0aGlzLm5hbWV9PC90ZXh0Pik7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHJldHVybig8ZGl2Lz4pO1xuXHRcdH1cblx0fTtcblx0dGhpcy5jbGFzc2VzID0gZnVuY3Rpb24oKXtcblx0XHRpZighdGhpcy50eXBlKSB0aGlzLnR5cGU9Z2V0SW5zdHJ1bWVudFR5cGUodGhpcy5uYW1lLCB0aGlzLmluc3RydW1lbnRTZXQpO1xuXHRcdGlmKHRoaXMudHlwZSkge1xuXHRcdFx0cmV0dXJuIHRoaXMudHlwZS5zaG9ydG5hbWUrXCIgXCIrdGhpcy50eXBlLnNlY3Rpb247XG5cdFx0fVxuXHRcdHJldHVybiAnJztcblx0fTtcblx0dGhpcy50eXBlRXEgPSBmdW5jdGlvbihvdGhlckluc3RydW1lbnQpe1xuXHRcdHJldHVybiB0aGlzLnR5cGUubmFtZT09PW90aGVySW5zdHJ1bWVudC50eXBlLm5hbWU7XG5cdH07XG5cdHRoaXMub25PZmZBcnJheSA9IGZ1bmN0aW9uKCl7XG5cdFx0Ly8gQSBzaW1wbGUgcmh5dGhtLW9ubHkgYXJyYXkgb2YgY29udGlndW91cyBzb3VuZGluZyBibG9jaywgb2YgdGhlXG5cdFx0Ly8gZm9ybSBbWzxzb3VuZGluZy1zdGFydHM+LCA8c291bmRpbmdlbmRzPl0sIFs8c291bmRpbmcyLXN0YXJ0cy4uLl1dXG5cdFx0dmFyIHByZXZNZWFzdXJlID0gZmFsc2U7XG5cdFx0dmFyIG9uT2ZmQXJyYXkgPSBbXTtcblx0XHR2YXIgcHJldm4gPSBmYWxzZTtcblx0XHR2YXIgc3RhcnQgPSBmYWxzZTtcblx0XHR2YXIgc3RhcnRYID0gZmFsc2U7XG5cdFx0Zm9yKHZhciBpPTA7IGk8dGhpcy5tZWFzdXJlcy5sZW5ndGg7IGkrKyl7XG5cdFx0XHR2YXIgbWVhc3VyZSA9IHRoaXMubWVhc3VyZXNbaV07XG5cdFx0XHR2YXIgbiA9IG1lYXN1cmUuYmFyTm8tMTtcblx0XHRcdGlmKChzdGFydCB8fCBzdGFydD09PTApICYmIChwcmV2biB8fCBwcmV2bj09PTApICYmIHByZXZuPG4tMSl7XG5cdFx0XHRcdC8vIFRoZXJlJ3MgYmVlbiBhdCBsZWFzdCBvbmUgZW1wdHkgYmFyLiBOZWVkIHRvIGNsb3NlXG5cdFx0XHRcdG9uT2ZmQXJyYXkucHVzaChbc3RhcnQsIHByZXZuKzFdKTtcblx0XHRcdFx0c3RhcnQgPSBmYWxzZTtcblx0XHRcdH1cblx0XHRcdGZvcih2YXIgaj0wOyBqPG1lYXN1cmUuZXZlbnRzLmxlbmd0aDsgaisrKXtcblx0XHRcdFx0dmFyIGV2ZW50ID0gbWVhc3VyZS5ldmVudHNbal07XG5cdFx0XHRcdGlmKGV2ZW50LnNvdW5kaW5nKSB7XG5cdFx0XHRcdFx0aWYoIXN0YXJ0ICYmIHN0YXJ0IT09MCl7XG5cdFx0XHRcdFx0XHRzdGFydCA9IG4rKGV2ZW50LnN0YXJ0L21lYXN1cmUuZHVyYXRpb24pO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRpZihzdGFydCB8fCBzdGFydD09PTApe1xuXHRcdFx0XHRcdFx0b25PZmZBcnJheS5wdXNoKFtzdGFydCwgbitldmVudC5zdGFydC9tZWFzdXJlLmR1cmF0aW9uXSk7XG5cdFx0XHRcdFx0XHRzdGFydCA9IGZhbHNlO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0cHJldm4gPSBuO1xuXHRcdH1cblx0XHRpZihzdGFydCB8fCBzdGFydD09PTApIHtcblx0XHRcdG9uT2ZmQXJyYXkucHVzaChbc3RhcnQsIHByZXZuKzFdKTtcblx0XHR9XG5cdFx0cmV0dXJuIG9uT2ZmQXJyYXk7XG5cdH07XG59XG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gTWVyZ2luZSBpbnN0cnVtZW50c1xuLy8gSW5zdHJ1bWVudHMgY2FuIChvcHRpb25hbGx5KSBhdXRvbWF0aWNhbGx5IGJlIG1lcmdlZCBpZiB0aGV5J3JlXG4vLyBwbGF5aW5nIGF0IHRoZSBzYW1lIHRpbWUuIFRoaXMgd2FzIGRyb3BwZWQgZnJvbSB0aGUgVGltZU1hY2hpbmVcbi8vIGFwcCwgYW5kIGNvdWxkIHVzZSBtb3JlIG9wdGlvbnMgZm9yIHRoZSBsb2dpYy5cbmV4cG9ydCBmdW5jdGlvbiBtZXJnZWRJbnN0cnVtZW50cyhpbnN0cnVtZW50cyl7XG5cdHZhciBwbGF5aW5nU2V0cyA9IFtdO1xuXHR2YXIgY292ZXJlZCA9IFtdO1xuXHR2YXIgaW5zdHJ1bWVudHNQbGF5aW5nID0gaW5zdHJ1bWVudHMubWFwKHggPT4geC5vbk9mZkFycmF5KCkpO1xuXHRmb3IodmFyIGk9MDsgaTxpbnN0cnVtZW50cy5sZW5ndGg7IGkrKyl7XG5cdFx0aWYoY292ZXJlZC5pbmRleE9mKGkpPT09LTEpe1xuXHRcdFx0dmFyIHBsYXlpbmcgPSBpbnN0cnVtZW50c1BsYXlpbmdbaV07XG5cdFx0XHR2YXIgcGxheWluZ1NldCA9IHtwbGF5aW5nOiBwbGF5aW5nLCBpbnN0cnVtZW50czogW2luc3RydW1lbnRzW2ldXX07XG5cdFx0XHRjb3ZlcmVkLnB1c2goaSk7XG5cdFx0XHRmb3IodmFyIGo9aSsxOyBqPGluc3RydW1lbnRzLmxlbmd0aDsgaisrKXtcblx0XHRcdFx0aWYob25PZmZBcnJheUVxKHBsYXlpbmcsIGluc3RydW1lbnRzUGxheWluZ1tqXSkpe1xuXHRcdFx0XHRcdGNvdmVyZWQucHVzaChqKTtcblx0XHRcdFx0XHRwbGF5aW5nU2V0Lmluc3RydW1lbnRzLnB1c2goaW5zdHJ1bWVudHNbal0pO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG4vL1x0XHRcdGlzQWxsT2ZJbnN0cnVtZW50KHBsYXlpbmdTZXQsIGluc3RydW1lbnRzKTtcblx0XHRcdHBsYXlpbmdTZXRzLnB1c2gocGxheWluZ1NldCk7XG5cdFx0fVxuXHR9XG5cdHJldHVybiBwbGF5aW5nU2V0cztcbn1cbmZ1bmN0aW9uIHNpbmdsZUluc3RydW1lbnQoc2V0KXtcblx0cmV0dXJuIHNldC5ldmVyeSh4ID0+IHgudHlwZSAmJiB4LnR5cGUubmFtZT09PXNldFswXS50eXBlLm5hbWUpID8gc2V0WzBdLnR5cGUubmFtZSA6IGZhbHNlO1xufVxuZnVuY3Rpb24gc2luZ2xlU2VjdGlvbihzZXQpe1xuXHRyZXR1cm4gc2V0LmV2ZXJ5KHggPT4geC50eXBlICYmIHgudHlwZS5zZWN0aW9uPT09c2V0WzBdLnR5cGUuc2VjdGlvbikgPyBzZXRbMF0udHlwZS5zZWN0aW9uIDogZmFsc2U7XG59XG5leHBvcnQgZnVuY3Rpb24gY2FwdGlvbihzZXQsIG9yY2hlc3RyYSwgYWN0aXZlLCBtb3ZlciwgbW91dCwgeCwgeSwgYmFzZWNsYXNzLCBuKXtcblx0dmFyIGluc3QgPSBzaW5nbGVJbnN0cnVtZW50KHNldCk7XG5cdHZhciBzZWN0aW9uID0gc2luZ2xlU2VjdGlvbihzZXQpO1xuXHR2YXIgY2wgPSAnJztcblx0aWYoYWN0aXZlKXtcblx0XHRpZiAoc2V0Lmxlbmd0aD09PTEpe1xuXHRcdFx0Y2wgPSBzZWN0aW9uK1wiIFwiK2luc3QrXCIgbm5uXCIrbjtcblx0XHRcdHJldHVybiB7b2JqOiA8ZyBvbk1vdXNlT3Zlcj17bW92ZXJ9IG9uTW91c2VPdXQ9e21vdXR9PlxuXHRcdFx0XHRcdFx0XHQ8dGV4dCB4PXt4fSB5PXt5fSBjbGFzc05hbWU9e2Jhc2VjbGFzcytjbH0+e3NldFswXS5uYW1lfTwvdGV4dD48L2c+LFxuXHRcdFx0XHRcdFx0XHRjbDogY2x9O1xuXHRcdH0gZWxzZSBpZihzZWN0aW9uICYmIG9yY2hlc3RyYS5maWx0ZXIoeCA9PiB4LnR5cGUuc2VjdGlvbj09PXNlY3Rpb24pLmxlbmd0aD09PXNldC5sZW5ndGgpe1xuXHRcdFx0Ly8gVGhpcyBpcyB0aGUgZW50aXJlIHNlY3Rpb24gYXQgdGhpcyBwb2ludC4gRklYTUUsIHRoaXMgaXNcblx0XHRcdC8vIGJyb2tlbiBsb2dpYyAoYmVjYXVzZSBpdCdzIHNvIGxvY2FsKS4gSSBtYXkgbmVlZCB0byBwcmVzZXQgYW5cblx0XHRcdC8vIG9yY2hlc3RyYSBzb21laG93LlxuXHRcdFx0Y2w9IHNlY3Rpb24rXCIgXCIraW5zdCtcIiBubm5cIituO1xuXHRcdFx0cmV0dXJuIHtvYmo6IDxnIG9uTW91c2VPdmVyPXttb3Zlcn0gb25Nb3VzZU91dD17bW91dH0+XG5cdFx0XHRcdFx0XHRcdDx0ZXh0IHg9e3h9IHk9e3l9IGNsYXNzTmFtZT17YmFzZWNsYXNzK2NsfT57c2VjdGlvbn08L3RleHQ+PC9nPixcblx0XHRcdFx0XHRcdFx0Y2w6Y2x9O1xuXHRcdH0gZWxzZSB7XG5cdFx0XHR2YXIgb3V0PXNldFswXS5uYW1lO1xuXHRcdFx0Y2wgPSAoc2VjdGlvbj8gc2VjdGlvbiA6ICdtaXNjJylcblx0XHRcdFx0K1wiIFwiKyhpbnN0ID8gaW5zdCA6ICdtaXNjaW5zdCcpICtcIiBubm5cIituO1xuXHRcdFx0Zm9yICh2YXIgaT0xOyBpPHNldC5sZW5ndGgtMTsgaSsrKXtcblx0XHRcdFx0b3V0ICs9IFwiLCBcIitzZXRbMF0ubmFtZTtcblx0XHRcdH1cblx0XHRcdHJldHVybiB7b2JqOiA8ZyBvbk1vdXNlT3Zlcj17bW92ZXJ9IG9uTW91c2VPdXQ9e21vdXR9PlxuXHRcdFx0XHRcdFx0XHQ8dGV4dCB4PXt4fSB5PXt5fSBjbGFzc05hbWU9e2Jhc2VjbGFzcytjbH0+e291dCArIFwiICYgXCIrc2V0W3NldC5sZW5ndGgtMV0ubmFtZX08L3RleHQ+PC9nPixcblx0XHRcdFx0XHRcdFx0Y2w6IGNsfTtcblx0XHR9XG5cdH0gZWxzZSB7XG5cdFx0aWYoc2V0Lmxlbmd0aD09PTEpe1xuXHRcdFx0Y2wgPSBzZWN0aW9uK1wiIFwiK2luc3QrXCIgbm5uXCIrbjtcblx0XHRcdHJldHVybiB7b2JqOiA8ZyBvbk1vdXNlT3Zlcj17bW92ZXJ9IG9uTW91c2VPdXQ9e21vdXR9PlxuXHRcdFx0XHRcdFx0XHQ8dGV4dCB4PXt4fSB5PXt5fSBjbGFzc05hbWU9e2Jhc2VjbGFzcytjbH0+e3NldFswXS50eXBlLnNob3J0bmFtZX08L3RleHQ+PC9nPixcblx0XHRcdFx0XHRcdFx0Y2w6Y2x9O1xuXHRcdH0gZWxzZSBpZihzZWN0aW9uICYmIG9yY2hlc3RyYS5maWx0ZXIoeCA9PiB4LnR5cGUuc2VjdGlvbj09PXNlY3Rpb24pLmxlbmd0aD09PXNldC5sZW5ndGgpe1xuXHRcdFx0Y2wgPSBzZWN0aW9uK1wiIFwiK2luc3QrXCIgbm5uXCIrbjtcblx0XHRcdHJldHVybiB7b2JqOiA8ZyBvbk1vdXNlT3Zlcj17bW92ZXJ9IG9uTW91c2VPdXQ9e21vdXR9PlxuXHRcdFx0XHRcdFx0XHQ8dGV4dCB4PXt4fSB5PXt5fSBjbGFzc05hbWU9e2Jhc2VjbGFzcytjbH0+e3NlY3Rpb24uc3Vic3RyaW5nKDAsMyl9PC90ZXh0PjwvZz4sXG5cdFx0XHRcdFx0XHRcdGNsOmNsfTtcblx0XHR9IGVsc2UgaWYgKGluc3QgJiYgb3JjaGVzdHJhLmZpbHRlcih4ID0+IHgudHlwZS5uYW1lPT09aW5zdCkubGVuZ3RoPT09c2V0Lmxlbmd0aCl7XG5cdFx0XHRjbD0gc2VjdGlvbitcIiBcIitpbnN0K1wiIG5ublwiK247XG5cdFx0XHRyZXR1cm4ge29iajogPGcgb25Nb3VzZU92ZXI9e21vdmVyfSBvbk1vdXNlT3V0PXttb3V0fT5cblx0XHRcdFx0XHRcdFx0PHRleHQgeD17eH0geT17eX0gY2xhc3NOYW1lPXtiYXNlY2xhc3MrY2x9PntzZXRbMF0udHlwZS5zaG9ydHBsdXJhbH08L3RleHQ+PC9nPixcblx0XHRcdFx0XHRcdFx0Y2w6Y2x9O1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRjbD0oc2VjdGlvbj8gc2VjdGlvbiA6ICdtaXNjJykgK1wiIFwiKyhpbnN0ID8gaW5zdCA6ICdtaXNjaW5zdCcpICtcIiBubm5cIituO1xuXHRcdFx0cmV0dXJuIHtvYmo6IDxnIG9uTW91c2VPdmVyPXttb3Zlcn0gb25Nb3VzZU91dD17bW91dH0+XG5cdFx0XHRcdFx0XHRcdDx0ZXh0IHg9e3h9IHk9e3l9IGNsYXNzTmFtZT17YmFzZWNsYXNzK2NsfT57aW5zdCA/IHNldFswXS50eXBlLnNob3J0cGx1cmFsIDogJ21pc2MnfTwvdGV4dD48L2c+LFxuXHRcdFx0XHRcdFx0XHRjbDpjbH07XG5cdFx0fVxuXHR9XG59XG5cbmZ1bmN0aW9uIGlzQWxsT2ZJbnN0cnVtZW50KHNldCwgb3JjaGVzdHJhKXtcblx0Ly8gcmV0dXJucyB0cnVlIGlmIGFsbCBpbnN0cnVtZW50cyBvZiBhIGdpdmVuIHR5cGUgaW4gYWxsIGFyZVxuXHQvLyByZXByZXNlbnRlZCBpbiBzZXQuIFYgZnJhZ2lsZSwgbm90IHZlcnkgbXVzaWNhbCwgbG9naWNcblx0aWYoc2V0Lmxlbmd0aCl7XG5cdFx0dmFyIGluc3RyID0gc2V0WzBdLnR5cGUubmFtZTtcblx0XHRpZihzZXQuZXZlcnkoeCA9PiB4LnR5cGUubmFtZT09PWluc3RyKSl7XG5cdFx0XHRyZXR1cm4gb3JjaGVzdHJhLmZpbHRlcih4ID0+IHgudHlwZS5uYW1lPT09aW5zdHIpLmxlbmd0aD09PXNldC5sZW5ndGg7XG5cdFx0fVxuXHR9XG5cdHJldHVybiBmYWxzZTtcbn1cbmZ1bmN0aW9uIGVudGlyZVNlY3Rpb24oc2V0LCBvcmNoZXN0cmEpe1xuXHQvLyByZXR1cm5zIHRydWUgaWYgYWxsIGluc3RydW1lbnRzIGFyZSBmcm9tIHRoZSBzYW1lIHNlY3Rpb24gYW5kIGFyZVxuXHQvLyBhbGwgb2YgdGhhdCBzZWN0aW9uIHByZXNlbnQuIFYgZnJhZ2lsZSwgbm90IHZlcnkgbXVzaWNhbCwgbG9naWNcblx0aWYoc2V0Lmxlbmd0aCl7XG5cdFx0dmFyIHNlY3Rpb24gPSBzZXRbMF0udHlwZS5zZWN0aW9uO1xuXHRcdGlmKHNldC5ldmVyeSh4ID0+IHgudHlwZS5zZWN0aW9uID09PSBzZWN0aW9uKSl7XG5cdFx0XHRyZXR1cm4gb3JjaGVzdHJhLmZpbHRlcih4ID0+IHgudHlwZS5zZWN0aW9uPT09c2VjdGlvbikubGVuZ3RoPT09c2V0Lmxlbmd0aDtcblx0XHR9XG5cdH1cblx0cmV0dXJuIGZhbHNlO1xufVxuXG5mdW5jdGlvbiBvbk9mZkFycmF5RXEoYXJyMSwgYXJyMil7XG5cdGlmKGFycjEubGVuZ3RoICE9PWFycjIubGVuZ3RoKSByZXR1cm4gZmFsc2U7XG5cdGZvcih2YXIgaT0wOyBpPGFycjEubGVuZ3RoOyBpKyspe1xuXHRcdGlmKGFycjFbaV1bMF0hPT1hcnIyW2ldWzBdIHx8IGFycjFbaV1bMV0hPT1hcnIyW2ldWzFdKSByZXR1cm4gZmFsc2U7XG5cdH1cblx0cmV0dXJuIHRydWU7XG59XG4iXX0=