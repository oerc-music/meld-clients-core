"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.InstrumentType = InstrumentType;
exports.Orchestration = Orchestration;
exports.drawRibbons = drawRibbons;
exports.drawBarLines = drawBarLines;
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
// visualisation, but some of the functionality may be generically
// useful for other MEI-processing tasks.
//
// Usage:
//   1. orch = new Orchestration(<MEIobject>);
//
//   2. Draw the SVG and structure for the ribbons
//
//   3. For each instrument (bear in mind that the below software uses
//   the MEI numbering, so isn't necessarily compact) run drawRibbons
//
//   4. drawBarLines
//
// This is used by containers/orchestralRibbon.js, and there's an
// example in the Lohengrin TimeMachine App (for which this was
// written)
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
// FIXME: This would benefit from more generalisation and thought


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
  "tenor": new InstrumentType(false, 'Tenor', 'T', 'Cast', null, 'T.'),
  "bass": new InstrumentType(false, 'Bass', 'B', 'Cast', null, 'B.')
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
}

function drawRibbons(blobs, y, rowHeight, step, classes, mover, mout, i, xoff) {
  var ribbons = [];
  if (!xoff) xoff = 0;

  for (var i = 0; i < blobs.length; i++) {
    ribbons.push( /*#__PURE__*/_react["default"].createElement("rect", {
      y: y + rowHeight / 8,
      x: blobs[i][0] * step + xoff,
      width: step * (blobs[i][1] - blobs[i][0]),
      key: 'ribbon ' + i + y,
      height: rowHeight * 7 / 8,
      rx: "5",
      ry: "5",
      className: 'box ' + classes + ' nnn' + i,
      onMouseOver: mover,
      onMouseOut: mout
    }));
  }

  return /*#__PURE__*/_react["default"].createElement("g", null, ribbons);
}

function drawBarLines(barcount, width, height, xoff, yoff) {
  var x = xoff ? xoff : 0;
  var y = yoff ? yoff : 0;
  var lines = [];

  for (var i = 0; i < barcount; i++) {
    lines.push( /*#__PURE__*/_react["default"].createElement("line", {
      key: "barline-" + i + "-" + x + "-" + height,
      x1: x,
      x2: x,
      y1: 0,
      y2: height,
      className: "ribbon-barline bar" + i
    }));
    x += (width - xoff) / barcount;
  }

  return lines;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9saWJyYXJ5L01FSVJpYmJvblV0aWxzLmpzIl0sIm5hbWVzIjpbImR1cmF0aW9uIiwiZXZlbnQiLCJNRUlPYmplY3QiLCJiYXNlIiwiZ2V0QXR0cmlidXRlTlMiLCJjaG9yZCIsImNsb3Nlc3QiLCJOdW1iZXIiLCJkdXIiLCJkb3RzIiwiTWF0aCIsInBvdyIsImNvdW50TWVhc3VyZXMiLCJtZWFzdXJlQ291bnQiLCJldmFsdWF0ZSIsIm5zUmVzb2x2ZXIiLCJYUGF0aFJlc3VsdCIsIk5VTUJFUl9UWVBFIiwibnVtYmVyVmFsdWUiLCJmaW5kTWVhc3VyZXMiLCJuIiwic3RhdmVzIiwiT1JERVJFRF9OT0RFX0lURVJBVE9SVFlQRSIsInN0YWZmIiwiaXRlcmF0ZU5leHQiLCJiYXJzIiwicHVzaCIsIkluc3RydW1lbnRNZWFzdXJlIiwiYmFyU3RhZmYiLCJiYXJObyIsImV2ZW50cyIsImV2ZW50T2JqcyIsInQiLCJuZXd0IiwibGVuZ3RoIiwiZXh0ZW5kIiwiTWVhc3VyZUV2ZW50QmxvY2siLCJmaW5kSW5zdHJ1bWVudHMiLCJpbnN0cnVtZW50U2V0Iiwic3RhZmZEZWZzIiwic3RhZmZEZWYiLCJpbnN0cnVtZW50cyIsIkluc3RydW1lbnQiLCJJbnN0cnVtZW50VHlwZSIsInByb3RvIiwibmFtZSIsInNob3J0bmFtZSIsInNlY3Rpb24iLCJwbHVyYWwiLCJzaG9ydHBsdXJhbCIsImVxIiwiaW5zdFR5cGUiLCJJbnN0cnVtZW50cyIsImluc3RydW1lbnRNYXRjaCIsInR5cGUiLCJtdWx0aXBsaWNpdHkiLCJ0b0xvd2VyQ2FzZSIsIml0IiwiZ2V0SW5zdHJ1bWVudFR5cGUiLCJpbnN0TGFiZWwiLCJjb25zb2xlIiwibG9nIiwidGVzdCIsInBvcyIsInNlYXJjaCIsInN1YnN0cmluZyIsIm5vIiwibm9TdHJpbmciLCJzdWJzdHIiLCJwYXJzZUludCIsImluc3RyIiwic3RhcnRUaW1lIiwiZW5kVGltZSIsInN0YXJ0IiwiZW5kIiwic291bmRpbmciLCJub2RlTmFtZSIsIm1pbiIsIm1heCIsIk9yY2hlc3RyYXRpb24iLCJNRUlTdHJpbmciLCJhZGRpdGlvbmFsSW5zdHJ1bWVudHMiLCJwIiwiRE9NUGFyc2VyIiwicGFyc2VGcm9tU3RyaW5nIiwibGFiZWwiLCJxdWVyeVNlbGVjdG9yIiwidGV4dENvbnRlbnQiLCJ0cmltIiwibnVtYmVyIiwibWVhc3VyZXMiLCJjYXB0aW9uIiwiU1ZHIiwieCIsInkiLCJhY3RpdmUiLCJjbGFzc2VzIiwidHlwZUVxIiwib3RoZXJJbnN0cnVtZW50Iiwib25PZmZBcnJheSIsInByZXZNZWFzdXJlIiwicHJldm4iLCJzdGFydFgiLCJpIiwibWVhc3VyZSIsImoiLCJkcmF3UmliYm9ucyIsImJsb2JzIiwicm93SGVpZ2h0Iiwic3RlcCIsIm1vdmVyIiwibW91dCIsInhvZmYiLCJyaWJib25zIiwiZHJhd0JhckxpbmVzIiwiYmFyY291bnQiLCJ3aWR0aCIsImhlaWdodCIsInlvZmYiLCJsaW5lcyIsIm1lcmdlZEluc3RydW1lbnRzIiwicGxheWluZ1NldHMiLCJjb3ZlcmVkIiwiaW5zdHJ1bWVudHNQbGF5aW5nIiwibWFwIiwiaW5kZXhPZiIsInBsYXlpbmciLCJwbGF5aW5nU2V0Iiwib25PZmZBcnJheUVxIiwic2luZ2xlSW5zdHJ1bWVudCIsInNldCIsImV2ZXJ5Iiwic2luZ2xlU2VjdGlvbiIsIm9yY2hlc3RyYSIsImJhc2VjbGFzcyIsImluc3QiLCJjbCIsIm9iaiIsImZpbHRlciIsIm91dCIsImlzQWxsT2ZJbnN0cnVtZW50IiwiZW50aXJlU2VjdGlvbiIsImFycjEiLCJhcnIyIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUFBOztBQUNBOzs7Ozs7Ozs7Ozs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVNBLFFB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IHsgbnNSZXNvbHZlciwgc3ZnTGluZSwgc3ZnUm91bmRlZFJlY3QsIHN2Z0dyb3VwLCBzdmdTcGFuLCBzdmdUZXh0IH0gZnJvbSAnLi4vbGlicmFyeS9zdmdVdGlscy5qcyc7XG5cbi8vLy8vLy8vXG4vL1xuLy8gVGhpcyBsaWJyYXJ5IGlzIHByaW1hcmlseSB1c2VkIGJ5IHRoZSBvcmNoZXN0cmFsIHJpYmJvbiwgd2hpY2hcbi8vIGRyYXdzIE1FSSBvcmNoZXN0cmFsIHNjb3JlcyBhcyBhIHNvcnQgb2Ygem9vbWVkLW91dCBwaWFuby1yb2xsXG4vLyB2aXN1YWxpc2F0aW9uLCBidXQgc29tZSBvZiB0aGUgZnVuY3Rpb25hbGl0eSBtYXkgYmUgZ2VuZXJpY2FsbHlcbi8vIHVzZWZ1bCBmb3Igb3RoZXIgTUVJLXByb2Nlc3NpbmcgdGFza3MuXG4vL1xuLy8gVXNhZ2U6XG4vLyAgIDEuIG9yY2ggPSBuZXcgT3JjaGVzdHJhdGlvbig8TUVJb2JqZWN0Pik7XG4vL1xuLy8gICAyLiBEcmF3IHRoZSBTVkcgYW5kIHN0cnVjdHVyZSBmb3IgdGhlIHJpYmJvbnNcbi8vXG4vLyAgIDMuIEZvciBlYWNoIGluc3RydW1lbnQgKGJlYXIgaW4gbWluZCB0aGF0IHRoZSBiZWxvdyBzb2Z0d2FyZSB1c2VzXG4vLyAgIHRoZSBNRUkgbnVtYmVyaW5nLCBzbyBpc24ndCBuZWNlc3NhcmlseSBjb21wYWN0KSBydW4gZHJhd1JpYmJvbnNcbi8vXG4vLyAgIDQuIGRyYXdCYXJMaW5lc1xuLy9cbi8vIFRoaXMgaXMgdXNlZCBieSBjb250YWluZXJzL29yY2hlc3RyYWxSaWJib24uanMsIGFuZCB0aGVyZSdzIGFuXG4vLyBleGFtcGxlIGluIHRoZSBMb2hlbmdyaW4gVGltZU1hY2hpbmUgQXBwIChmb3Igd2hpY2ggdGhpcyB3YXNcbi8vIHdyaXR0ZW4pXG4vL1xuLy8vLy8vLy8vXG4vL1xuLy8gMS4gVGltZSBhbmQgZHVyYXRpb24gZnVuY3Rpb25zXG4vL1xuZnVuY3Rpb24gZHVyYXRpb24oZXZlbnQsIE1FSU9iamVjdCl7XG5cdC8vIEdldCBhIGR1cmF0aW9uIGFzIGEgbnVtYmVyIG9mIGNyb3RjaGV0cyBmcm9tIGFuIE1FSSBub3RlIG9yXG5cdC8vIHJlc3QuIFRoaXMgaXMgY2VydGFpbmx5IHRvbyBjcnVkZSB0byBiZSBhY2N1cmF0ZS5cbiAgdmFyIGJhc2UgPSBldmVudC5nZXRBdHRyaWJ1dGVOUyhudWxsLCAnZHVyJyk7XG4gIGlmKCFiYXNlKXtcbiAgICAvLyBQcm9iYWJseSBhIGNob3JkIOKAk8KgZ2V0IGR1ciBmcm9tIHBhcmVudFxuICAgIC8qYmFzZSA9IE1FSU9iamVjdC5ldmFsdWF0ZSgnLi9hbmNlc3Rvcjo6KltAZHVyXVsxXScsIGV2ZW50LCBuc1Jlc29sdmVyLFxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0WFBhdGhSZXN1bHQuTlVNQkVSX1RZUEUsIG51bGwpLm51bWJlclZhbHVlOyovXG5cdFx0dmFyIGNob3JkID0gZXZlbnQuY2xvc2VzdCgnY2hvcmQnKTtcblx0XHRpZihjaG9yZCkgYmFzZSA9IGNob3JkLmdldEF0dHJpYnV0ZU5TKG51bGwsICdkdXInKTtcbiAgfVxuICBiYXNlID0gMS9OdW1iZXIoYmFzZSk7XG4gIHZhciBkdXIgPSBiYXNlO1xuICB2YXIgZG90cyA9IGV2ZW50LmdldEF0dHJpYnV0ZU5TKG51bGwsICdkb3RzJyk7XG4gIGlmKGRvdHMpIGR1ciA9IGJhc2UqKDIgLSAoMSAvIChNYXRoLnBvdygyLCBOdW1iZXIoZG90cykpKSkpO1xuICByZXR1cm4gZHVyKjQ7XG59XG5mdW5jdGlvbiBjb3VudE1lYXN1cmVzKE1FSU9iamVjdCl7XG4gIC8vIEdpdmVuIHBhcnNlZCBNRUksIGhvdyBtYW55IG1lYXN1cmVzIGFyZSB0aGVyZT9cbiAgdmFyIG1lYXN1cmVDb3VudCA9IE1FSU9iamVjdC5ldmFsdWF0ZSgnY291bnQoLy9tZWk6bWVhc3VyZSknLCBNRUlPYmplY3QsIG5zUmVzb2x2ZXIsIFhQYXRoUmVzdWx0Lk5VTUJFUl9UWVBFLCBudWxsKTtcbiAgcmV0dXJuIG1lYXN1cmVDb3VudC5udW1iZXJWYWx1ZTtcbn1cblxuZnVuY3Rpb24gZmluZE1lYXN1cmVzKG4sIE1FSU9iamVjdCl7XG4gIC8vIEdpdmVuIHBhcnNlZCBNRUksIGZpbmQgYWxsIHRoZSBiYXJzIHdpdGggbXVzaWMgaW4gZm9yIHN0YWZmL2luc3RydW1lbnQgblxuICB2YXIgc3RhdmVzID0gTUVJT2JqZWN0LmV2YWx1YXRlKCcvL21laTpzdGFmZltAbj0nK24rJyBhbmQgLi8vbWVpOm5vdGVdJywgTUVJT2JqZWN0LCBuc1Jlc29sdmVyLCBYUGF0aFJlc3VsdC5PUkRFUkVEX05PREVfSVRFUkFUT1JUWVBFLCBudWxsKTtcbiAgdmFyIHN0YWZmID0gc3RhdmVzLml0ZXJhdGVOZXh0KCk7XG4gIHZhciBiYXJzID0gW107XG4gIHdoaWxlKHN0YWZmKXtcblx0XHQvLyBDb25zdHJ1Y3RvciBmb3IgSW5zdHJ1bWVudE1lYXN1cmUgaXMgYmVsb3dcbiAgICBiYXJzLnB1c2gobmV3IEluc3RydW1lbnRNZWFzdXJlKHN0YWZmLCBNRUlPYmplY3QpKTtcbiAgICBzdGFmZiA9IHN0YXZlcy5pdGVyYXRlTmV4dCgpO1xuICB9XG4gIHJldHVybiBiYXJzO1xufVxuXG5mdW5jdGlvbiBJbnN0cnVtZW50TWVhc3VyZShiYXJTdGFmZiwgTUVJT2JqZWN0KXtcbiAgLy8gVGhpcyBvYmplY3QgY29udGFpbnMgYWxsIHRoZSBpbmZvcm1hdGlvbiBmb3IgYSBiYXIgb2YgbXVzaWNcbiAgLy8gYXMgcGxheWVkIGJ5IG9uZSBpbnN0cnVtZW50IG9uIG9uZSBzdGFmZlxuICB0aGlzLk1FSU9iamVjdCA9IE1FSU9iamVjdDtcbiAgdGhpcy5iYXJTdGFmZiA9IGJhclN0YWZmO1xuICB0aGlzLmJhck5vID0gdGhpcy5NRUlPYmplY3QuZXZhbHVhdGUoJy4vYW5jZXN0b3I6Om1laTptZWFzdXJlL0BuJywgYmFyU3RhZmYsXG4gICAgbnNSZXNvbHZlciwgWFBhdGhSZXN1bHQuTlVNQkVSX1RZUEUsIG51bGwpLm51bWJlclZhbHVlO1xuICB0aGlzLmV2ZW50cyA9IFtdO1xuICB0aGlzLmR1cmF0aW9uID0gMDtcbiAgdmFyIGV2ZW50T2JqcyA9IHRoaXMuTUVJT2JqZWN0LmV2YWx1YXRlKCcuL21laTpsYXllci8vbWVpOm5vdGUgfCAuL21laTpsYXllci8vbWVpOnJlc3QgfCAuL21laTpsYXllci8vbWVpOmNob3JkJywgYmFyU3RhZmYsIG5zUmVzb2x2ZXIsIFhQYXRoUmVzdWx0Lk9SREVSRURfTk9ERV9JVEVSQVRPUlRZUEUsIG51bGwpO1xuICB2YXIgZXZlbnQgPSBldmVudE9ianMuaXRlcmF0ZU5leHQoKTtcbiAgdmFyIHQgPSAwO1xuICB2YXIgbmV3dCA9IGZhbHNlO1xuICB3aGlsZShldmVudCl7XG4gICAgbmV3dCA9IHQrZHVyYXRpb24oZXZlbnQsIE1FSU9iamVjdCk7XG4gICAgaWYodGhpcy5ldmVudHMubGVuZ3RoICYmIHRoaXMuZXZlbnRzW3RoaXMuZXZlbnRzLmxlbmd0aC0xXS5leHRlbmRzKGV2ZW50KSl7XG4gICAgICAvLyBKdXN0IGV4dGVuZCB0aGUgcHJldmlvdXMgdGhpbmcgaW4gZXZlbnRzXG4gICAgICB0aGlzLmV2ZW50c1t0aGlzLmV2ZW50cy5sZW5ndGgtMV0uZXh0ZW5kKHQsIG5ld3QsIGV2ZW50KTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5ldmVudHNbdGhpcy5ldmVudHMubGVuZ3RoXSA9IG5ldyBNZWFzdXJlRXZlbnRCbG9jayh0LCBuZXd0LCBldmVudCk7XG4gICAgfVxuICAgIHQgPSBuZXd0O1xuICAgIGV2ZW50ID0gZXZlbnRPYmpzLml0ZXJhdGVOZXh0KCk7XG4gIH1cbiAgdGhpcy5kdXJhdGlvbiA9IHQ7XG59XG5cbi8vLy8vLy8vLy8vLy8vLy8vLy9cbi8vXG4vLyAyLiBPcmNoZXN0cmF0aW9uXG5cbmZ1bmN0aW9uIGZpbmRJbnN0cnVtZW50cyhNRUlPYmplY3QsIGluc3RydW1lbnRTZXQpe1xuICAvLyBHaXZlbiBwYXJzZWQgTUVJLCByZXR1cm4gb2JqZWN0cyBmb3IgYWxsIGluc3RydW1lbnRzXG4gIHZhciBzdGFmZkRlZnMgPSBNRUlPYmplY3QuZXZhbHVhdGUoJy8vbWVpOnN0YWZmRGVmJywgTUVJT2JqZWN0LCBuc1Jlc29sdmVyLCBYUGF0aFJlc3VsdC5PUkRFUkVEX05PREVfSVRFUkFUT1JUWVBFLCBudWxsKTtcbiAgdmFyIHN0YWZmRGVmID0gc3RhZmZEZWZzLml0ZXJhdGVOZXh0KCk7XG4gIHZhciBpbnN0cnVtZW50cyA9IFtdO1xuICB3aGlsZShzdGFmZkRlZil7XG5cdFx0Ly8gQ29uc3RydWN0b3IgZm9yIEluc3RydW1lbnQgaXMgYmVsb3dcbiAgICBpbnN0cnVtZW50c1tzdGFmZkRlZi5nZXRBdHRyaWJ1dGVOUyhudWxsLCAnbicpLTFdPW5ldyBJbnN0cnVtZW50KHN0YWZmRGVmLCBNRUlPYmplY3QsIGluc3RydW1lbnRTZXQpO1xuICAgIHN0YWZmRGVmID0gc3RhZmZEZWZzLml0ZXJhdGVOZXh0KCk7XG4gIH1cbiAgcmV0dXJuIGluc3RydW1lbnRzO1xufVxuXG4vLyBXZSBuZWVkIG1vcmUgc3RydWN0dXJlZCBpbmZvcm1hdGlvbiBhYm91dCBpbnN0cnVtZW50cyAocG9zc2libHlcbi8vIHRoaXMgaXMgcGFydGx5IGJlY2F1c2Ugd2UgYXJlIHVuZGVyLXVzaW5nIHRoZSBNRUkgZmFjaWxpdGllcyBmb3IgdGhpcylcbi8vIFdlIGRlZmluZSBJbnN0cnVtZW50VHlwZSBhcyB0aGUgYWJzdHJhY3QgY2F0ZWdvcnkgKGUuZy4gVmlvbGluKSBhbmRcbi8vIEluc3RydW1lbnQgYXMgdGhlIHRoaW5nIGluIHRoZSBzY29yZSAoZS5nLiBWaW9saW4gSSlcblxuLy8gRklYTUU6IEN1cnJlbnRseSwgdGhpcyBpcyBwb29ybHkgYWRhcHRlZCBmb3IgbG9jYWxpc2F0aW9uIChzZWUsIGZvciBleGFtcGxlLFxuLy8gdGhlIGNvciBhbmdsYWlzIGVudHJ5LiBJZiB0aGlzIGlzIHRvIGJlIGludHVpdGl2ZSwgdGhpcyB3aWxsIG5lZWQgZXhwYW5zaW9uLlxuLy8gRklYTUU6IFRoaXMgd291bGQgYmVuZWZpdCBmcm9tIG1vcmUgZ2VuZXJhbGlzYXRpb24gYW5kIHRob3VnaHRcbmV4cG9ydCBmdW5jdGlvbiBJbnN0cnVtZW50VHlwZShwcm90bywgbmFtZSwgc2hvcnRuYW1lLCBzZWN0aW9uLCBwbHVyYWwsIHNob3J0cGx1cmFsKXtcbiAgaWYocHJvdG8pe1xuICAgIHRoaXMubmFtZT1wcm90by5uYW1lO1xuICAgIHRoaXMuc2hvcnRuYW1lPXByb3RvLnNob3J0bmFtZTtcbiAgICB0aGlzLnNlY3Rpb249cHJvdG8uc2VjdGlvbjtcblx0XHR0aGlzLnBsdXJhbD1wcm90by5wbHVyYWw7XG5cdFx0dGhpcy5zaG9ydHBsdXJhbCA9IHByb3RvLnNob3J0cGx1cmFsO1xuICB9IGVsc2Uge1xuICAgIHRoaXMubmFtZT1uYW1lO1xuICAgIHRoaXMuc2hvcnRuYW1lPXNob3J0bmFtZTtcbiAgICB0aGlzLnNlY3Rpb249c2VjdGlvbjtcblx0XHR0aGlzLnBsdXJhbD1wbHVyYWw7XG5cdFx0dGhpcy5zaG9ydHBsdXJhbD1zaG9ydHBsdXJhbDtcbiAgfVxuXHR0aGlzLmVxID0gZnVuY3Rpb24oaW5zdFR5cGUpIHtcblx0XHRyZXR1cm4gdGhpcy5uYW1lPT09aW5zdFR5cGUubmFtZTtcblx0fTtcbn1cblxudmFyIEluc3RydW1lbnRzID0ge1xuICBcImZsdXRlXCI6IG5ldyBJbnN0cnVtZW50VHlwZShmYWxzZSwnRmx1dGUnLCAnZmwnLCAnV29vZHdpbmQnLCAnRmx1dGVzJywgJ2ZscycpLFxuICBcInBpY2NvbG9cIjogbmV3IEluc3RydW1lbnRUeXBlKGZhbHNlLCdQaWNjb2xvJywgJ3BpYycsICdXb29kd2luZCcsICdQaWNjb2xvcycsICdwaWNzJyksXG4gIFwib2JvZVwiOiBuZXcgSW5zdHJ1bWVudFR5cGUoZmFsc2UsJ09ib2UnLCAnaGInLCAnV29vZHdpbmQnLCAnT2JvZXMnLCAnaGJzJyksXG4gIFwiY29yIGFuZ2xhaXNcIjogbmV3IEluc3RydW1lbnRUeXBlKGZhbHNlLCdDb3IgYW5nbGFpcycsICdjYScsICdXb29kd2luZCcsICdDb3JzIGFuZ2xhaXMnLCAnY2FzJyksXG4gIFwiZW5nbGlzaCBob3JuXCI6IG5ldyBJbnN0cnVtZW50VHlwZShmYWxzZSwnQ29yIGFuZ2xhaXMnLCAnY2EnLCAnV29vZHdpbmQnLCAnQ29ycyBhbmdsYWlzJywgJ2NhcycpLFxuICBcImEgY2xhcmluZXRcIjogbmV3IEluc3RydW1lbnRUeXBlKGZhbHNlLCdBIENsYXJpbmV0JywgJ2NsLkEnLCAnV29vZHdpbmQnLCAnQSBDbGFyaW5ldHMnLCAnY2xzLkEnKSxcbiAgXCJi4pmtIGNsYXJpbmV0XCI6IG5ldyBJbnN0cnVtZW50VHlwZShmYWxzZSwnQuKZrSBDbGFyaW5ldCcsICdjbC5C4pmtJywgJ1dvb2R3aW5kJywgJ0Lima0gQ2xhcmluZXRzJywgJ2Nscy7ima0nKSxcbiAgXCJiYXNzIGNsYXJpbmV0XCI6IG5ldyBJbnN0cnVtZW50VHlwZShmYWxzZSwnQmFzcyBDbGFyaW5ldCcsICdCc2NsLicsICdXb29kd2luZCcsICdCYXNzIENsYXJpbmV0cycsICdCc2Nscy4nKSxcbiAgXCJhIGJhc3MgY2xhcmluZXRcIjogbmV3IEluc3RydW1lbnRUeXBlKGZhbHNlLCdBIEJhc3MgQ2xhcmluZXQnLCAnQnNjbC5BJywgJ1dvb2R3aW5kJywgJ0EgQmFzcyBDbGFyaW5ldCcsICdCc2Nscy5BJyksXG4gIFwiYmFzc29vblwiOiBuZXcgSW5zdHJ1bWVudFR5cGUoZmFsc2UsJ0Jhc3Nvb24nLCAnZmcnLCAnV29vZHdpbmQnLCAnQmFzc29vbnMnLCAnZmdzJyksXG4gIFwiaG9ybiBpbiBlXCI6IG5ldyBJbnN0cnVtZW50VHlwZShmYWxzZSwnSG9ybiBpbiBFJywgJ2NyLkUnLCAnQnJhc3MnLCAnRSBIb3JucycsICdjcnMuRScpLFxuICBcImhvcm4gaW4gY1wiOiBuZXcgSW5zdHJ1bWVudFR5cGUoZmFsc2UsJ0hvcm4gaW4gQycsICdjci5DJywgJ0JyYXNzJywgJ0MgSG9ybnMnLCAnY3JzLkMnKSxcbiAgXCJob3JuIGluIGZcIjogbmV3IEluc3RydW1lbnRUeXBlKGZhbHNlLCdIb3JuIGluIEYnLCAnY3IuJywgJ0JyYXNzJywgJ0YgSG9ybnMnLCAnY3JzJyksXG4gIFwiZiBob3JuXCI6IG5ldyBJbnN0cnVtZW50VHlwZShmYWxzZSwnSG9ybiBpbiBGJywgJ2NyLicsICdCcmFzcycsICdGIEhvcm5zJywgJ2NycycpLFxuICBcImhvcm5cIjogbmV3IEluc3RydW1lbnRUeXBlKGZhbHNlLCdIb3JuJywgJ2NyLicsICdCcmFzcycsICdIb3JucycsICdjcnMnKSxcbiAgXCJmIHRydW1wZXRcIjogbmV3IEluc3RydW1lbnRUeXBlKGZhbHNlLCdGIFRydW1wZXQnLCAndHJwLkYnLCAnQnJhc3MnLCAnRiBUcnVtcGV0cycsICd0cnBzLkYnKSxcbiAgXCJmIHRydW1wZXRzICgxLTMpXCI6IG5ldyBJbnN0cnVtZW50VHlwZShmYWxzZSwnRiBUcnVtcGV0cyAoMS0zKScsICd0cnBzLkYnLCAnQnJhc3MnLCBudWxsLCAndHJwcy5GJyksXG4gIFwidHJvbWJvbmVcIjogbmV3IEluc3RydW1lbnRUeXBlKGZhbHNlLCdUcm9tYm9uZScsICd0cmIuJywgJ0JyYXNzJywgJ1Ryb21ib25lcycsICd0cmJzLicpLFxuICBcInRyb21ib25lcyAoMS0zKVwiOiBuZXcgSW5zdHJ1bWVudFR5cGUoZmFsc2UsJ1Ryb21ib25lcyAoMS0zKScsICd0cmJzLkYnLCAnQnJhc3MnLCBudWxsLCAndHJicy5GJyksXG4gIFwiYmFzcyB0dWJhIGluIGXima1cIjogbmV3IEluc3RydW1lbnRUeXBlKGZhbHNlLCdF4pmtIEJhc3MgdHViYScsICdCc3RiJywgJ0JyYXNzJywgJ0Xima0gQmFzcyB0dWJhcycsICdCc3Ricy4nKSxcbiAgXCJ0aW1wYW5pXCI6IG5ldyBJbnN0cnVtZW50VHlwZShmYWxzZSwnVGltcGFuaScsICd0aW1wJywgJ1BlcmN1c3Npb24nLCAnVGltcGFuaScsICd0aW1wJyksXG4gIFwib3JnYW5cIjogbmV3IEluc3RydW1lbnRUeXBlKGZhbHNlLCdPcmdhbicsICdvcmcnLCAnUGVyY3Vzc2lvbicsICdPcmdhbnMnLCAnb3JnJyksXG4gIFwidmlvbGluXCI6IG5ldyBJbnN0cnVtZW50VHlwZShmYWxzZSwnVmlvbGluJywgJ3ZsbicsICdTdHJpbmdzJywgJ1Zpb2xpbnMnLCAndmxucycpLFxuICBcInZpb2xhXCI6IG5ldyBJbnN0cnVtZW50VHlwZShmYWxzZSwnVmlvbGEnLCAndmxhJywgJ1N0cmluZ3MnLCAnVmlvbGFzJywgJ3ZsYXMnKSxcbiAgXCJjZWxsb1wiOiBuZXcgSW5zdHJ1bWVudFR5cGUoZmFsc2UsJ0NlbGxvJywgJ3ZjJywgJ1N0cmluZ3MnLCAnQ2VsbG9zJywgJ3ZjcycpLFxuICBcInZpb2xvbmNlbGxvXCI6IG5ldyBJbnN0cnVtZW50VHlwZShmYWxzZSwnQ2VsbG8nLCAndmMnLCAnU3RyaW5ncycsICdDZWxsb3MnLCAndmNzJyksXG4gIFwiY29udHJhYmFzc1wiOiBuZXcgSW5zdHJ1bWVudFR5cGUoZmFsc2UsJ0NvbnRyYWJhc3MnLCAndmMnLCAnU3RyaW5ncycsICdDb250cmFiYXNzaScsICdDYicpLFxuICBcIm1lblwiOiBuZXcgSW5zdHJ1bWVudFR5cGUoZmFsc2UsJ01lbicsICdNZW4nLCAnQ2FzdCcsIG51bGwsICdNZW4nKSxcbiAgXCJ0ZW5vclwiOiBuZXcgSW5zdHJ1bWVudFR5cGUoZmFsc2UsJ1Rlbm9yJywgJ1QnLCAnQ2FzdCcsIG51bGwsICdULicpLFxuICBcImJhc3NcIjogbmV3IEluc3RydW1lbnRUeXBlKGZhbHNlLCdCYXNzJywgJ0InLCAnQ2FzdCcsIG51bGwsICdCLicpLFxufTtcblxuLy8gV29ya2luZyB3aXRoIEluc3RydW1lbnRUeXBlIG9iamVjdHNcbmZ1bmN0aW9uIGluc3RydW1lbnRNYXRjaCh0eXBlLCBtdWx0aXBsaWNpdHksIGluc3RydW1lbnRTZXQpe1xuICBpZihpbnN0cnVtZW50U2V0W3R5cGUudG9Mb3dlckNhc2UoKV0pe1xuXHRcdHZhciBpdCA9IG5ldyBJbnN0cnVtZW50VHlwZShpbnN0cnVtZW50U2V0W3R5cGUudG9Mb3dlckNhc2UoKV0pO1xuXHRcdGlmKG11bHRpcGxpY2l0eSkgaXQubXVsdGlwbGljaXR5ID0gbXVsdGlwbGljaXR5O1xuICAgIHJldHVybiBpdDtcbiAgfVxufVxuZnVuY3Rpb24gZ2V0SW5zdHJ1bWVudFR5cGUoaW5zdExhYmVsLCBpbnN0cnVtZW50U2V0KXtcblx0Ly8gZmluZCBhbiBJbnN0cnVtZW50VHlwZSB0byBtYXRjaCB0aGUgTUVJIGxhYmVsXG5cdGlmKCFpbnN0TGFiZWwpIHtcblx0XHRjb25zb2xlLmxvZyhcIm5vIGxhYmVsXCIpO1xuXHRcdHJldHVybiBmYWxzZTtcblx0fVxuXHR2YXIgbXVsdGlwbGljaXR5ID0gZmFsc2U7XG5cdGlmKC9eWzAtOV0rLy50ZXN0KGluc3RMYWJlbCkpe1xuXHRcdHZhciBwb3MgPSBpbnN0TGFiZWwuc2VhcmNoKC9bXjAtOSBdKy8pO1xuXHRcdG11bHRpcGxpY2l0eSA9IE51bWJlcihpbnN0TGFiZWwuc3Vic3RyaW5nKDAscG9zKSk7XG5cdFx0aW5zdExhYmVsID0gaW5zdExhYmVsLnN1YnN0cmluZyhwb3MpO1xuXHR9XG4gIHZhciB0eXBlPWluc3RMYWJlbDtcbiAgdmFyIG5vPWZhbHNlO1xuICB2YXIgcG9zPWluc3RMYWJlbC5zZWFyY2goLyArWzAtOV0rLyk7XG4gIGlmKHBvcz4tMSl7XG4gICAgdHlwZSA9IGluc3RMYWJlbC5zdWJzdHJpbmcoMCxwb3MpO1xuICAgIHZhciBub1N0cmluZyA9IGluc3RMYWJlbC5zdWJzdHIocG9zKTtcbiAgICBwb3MgPSBpbnN0TGFiZWwuc2VhcmNoKC9bMC05XS8pO1xuICAgIG5vID0gcGFyc2VJbnQoaW5zdExhYmVsLnN1YnN0cihwb3MpLCAxMCk7XG4gIH1cbiAgdmFyIGluc3RyID0gaW5zdHJ1bWVudE1hdGNoKHR5cGUsIG11bHRpcGxpY2l0eSwgaW5zdHJ1bWVudFNldCk7XG4gIGlmKCFpbnN0cikge1xuXHRcdGNvbnNvbGUubG9nKFwibWlzc2VkXCIsIHR5cGUsIG5vU3RyaW5nKTtcblx0XHRpbnN0ciA9IG5ldyBJbnN0cnVtZW50VHlwZShmYWxzZSwgdHlwZSwgdHlwZS5zdWJzdHJpbmcoMCwgMyksICdDYXN0JywgdHlwZS5zdWJzdHJpbmcoMCwzKSk7XG4vL1x0XHRyZXR1cm4gZmFsc2U7XG5cdH1cbiAgaW5zdHIubm8gPSBubztcbiAgcmV0dXJuIGluc3RyO1xufVxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vLy9cbi8vXG4vLyAzLiBSaWJib24gZnVuY3Rpb25zIGFuZCBjbGFzc2VzXG5cblxuLy8gIEhlcmUsIHdlIGRvbid0IGNhcmUgYWJvdXQgc2VwYXJhdGUgbm90ZXMsIG9ubHkgYmxvY2tzIG9mIGNvbnRpbnVvdXMgc291bmRcblxuZnVuY3Rpb24gTWVhc3VyZUV2ZW50QmxvY2soc3RhcnRUaW1lLCBlbmRUaW1lLCBldmVudCl7XG4gIHRoaXMuc3RhcnQgPSBzdGFydFRpbWU7XG4gIHRoaXMuZW5kID0gZW5kVGltZTtcbiAgdGhpcy5kdXJhdGlvbiA9IGVuZFRpbWUtc3RhcnRUaW1lO1xuICB0aGlzLnNvdW5kaW5nID0gZXZlbnQubm9kZU5hbWU9PSdub3RlJyB8fCBldmVudC5ub2RlTmFtZT09J2Nob3JkJztcbiAgdGhpcy5ldmVudHMgPSBbZXZlbnRdO1xuXHR0aGlzLmV4dGVuZCA9IGZ1bmN0aW9uKHN0YXJ0VGltZSwgZW5kVGltZSwgZXZlbnQpe1xuXHRcdHRoaXMuZXZlbnRzLnB1c2goZXZlbnQpO1xuXHRcdHRoaXMuc3RhcnQgPSBNYXRoLm1pbihzdGFydFRpbWUsIHRoaXMuc3RhcnQpO1xuXHRcdHRoaXMuZW5kID0gTWF0aC5tYXgoZW5kVGltZSwgdGhpcy5lbmQpO1xuXHR9O1xuXHR0aGlzLmV4dGVuZHMgPSBmdW5jdGlvbihldmVudCl7XG5cdFx0Ly8gQm9vbGVhbjogSXMgdGhlIG5ldyBldmVudCBvZiB0aGUgc2FtZSB0eXBlIGFzIG90aGVycyBpbiB0aGlzXG5cdFx0Ly8gb2JqZWN0PyAoc28gZG9lcyBpdCBjb250aW51ZSB0aGUgc2FtZSBvbi9vZmYgc3RhdGU/KVxuXHRcdHJldHVybiAoZXZlbnQubm9kZU5hbWUgPT0gJ25vdGUnICYmIHRoaXMuc291bmRpbmcpXG4gICAgICB8fCAoZXZlbnQubm9kZU5hbWUgPT0gJ25vdGUnICYmIHRoaXMuc291bmRpbmcpXG4gICAgICB8fCAoZXZlbnQubm9kZU5hbWU9PSdyZXN0JyAmJiAhdGhpcy5zb3VuZGluZyk7XG5cdH07XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBPcmNoZXN0cmF0aW9uIChNRUlTdHJpbmcsIGFkZGl0aW9uYWxJbnN0cnVtZW50cyl7XG4gIC8vIFRoZSBPcmNoZXN0cmF0aW9uIG9iamVjdCBob2xkcyBhIHBhcnNlZCBNRUkgWE1MIG9iamVjdFxuICAvLyBhbmQgdGhlbiBleHRyYWN0cyB2YXJpb3VzIGVsZW1lbnRzIG9mIHRoZSBvcmNoZXN0cmF0aW9uXG4gIC8vIGZvciBkcmF3aW5nLlxuICB0aGlzLk1FSVN0cmluZyA9IE1FSVN0cmluZztcblx0dGhpcy5pbnN0cnVtZW50U2V0ID0gey4uLkluc3RydW1lbnRzLCAuLi5hZGRpdGlvbmFsSW5zdHJ1bWVudHN9XG4gIHZhciBwID0gbmV3IERPTVBhcnNlcigpO1xuICB0aGlzLk1FSU9iamVjdCA9IHAucGFyc2VGcm9tU3RyaW5nKE1FSVN0cmluZywgXCJ0ZXh0L3htbFwiKTtcbiAgdGhpcy5tZWFzdXJlQ291bnQgPSBjb3VudE1lYXN1cmVzKHRoaXMuTUVJT2JqZWN0KTtcbiAgdGhpcy5pbnN0cnVtZW50cyA9IGZpbmRJbnN0cnVtZW50cyh0aGlzLk1FSU9iamVjdCwgdGhpcy5pbnN0cnVtZW50U2V0KTtcbn1cblxuLy8gQW4gSW5zdHJ1bWVudCBpcyBhIHBhcnRpY3VsYXIgY2FzZSBvZiBhbiBJbnN0cnVtZW50VHlwZSBpbiBhXG4vLyBzY29yZSwgZS5nLiBWaW9saW4gSSBpbiBhIGdpdmVuIE1FSSBmaWxlIGlzIGFuIEluc3RydW1lbnQgd2l0aFxuLy8gSW5zdHJ1bWVudFR5cGUgdmlvbGluLiBJdCBpcyBhIGNvbnRhaW5lciBmb3IgYmxvY2tzIG9mIGNvbnRpZ3VvdXNcbi8vIHNvdW5kaW5nIG9yIHNpbGVuY2UsIGZyb20gd2hpY2ggdGhlIHJpYmJvbnMgYXJlIGRlcml2ZWQuXG5cbmZ1bmN0aW9uIEluc3RydW1lbnQoc3RhZmZEZWYsIE1FSU9iamVjdCwgaW5zdHJ1bWVudFNldCl7XG4gIC8vIEluc3RydW1lbnQgb2JqZWN0IChpbmNsdWRlcyBhY3Rpdml0eSBpbmZvKVxuICB0aGlzLk1FSU9iamVjdCA9IE1FSU9iamVjdDtcblx0dGhpcy5pbnN0cnVtZW50U2V0ID0gaW5zdHJ1bWVudFNldFxuICB0aGlzLm5hbWUgPSBzdGFmZkRlZi5nZXRBdHRyaWJ1dGVOUyhudWxsLCAnbGFiZWwnKTtcbiAgdGhpcy5uID0gc3RhZmZEZWYuZ2V0QXR0cmlidXRlTlMobnVsbCwgJ24nKTtcblx0aWYoIXRoaXMubmFtZSl7XG5cdFx0dmFyIGxhYmVsID0gc3RhZmZEZWYucXVlcnlTZWxlY3RvcignbGFiZWwnKTtcblx0XHRpZihsYWJlbCl7XG5cdFx0XHR0aGlzLm5hbWUgPSBsYWJlbC50ZXh0Q29udGVudC50cmltKCk7XG5cdFx0fVxuXHR9XG5cdGlmKHRoaXMubmFtZSl7XG5cdFx0dGhpcy50eXBlID0gZ2V0SW5zdHJ1bWVudFR5cGUodGhpcy5uYW1lLCBpbnN0cnVtZW50U2V0KTtcblx0fSBlbHNlIHtcblx0XHRjb25zb2xlLmxvZyhcIk5vIGxhYmVsXCIsIHN0YWZmRGVmKTtcblx0fVxuICB0aGlzLm51bWJlciA9IGZhbHNlO1xuICB0aGlzLm1lYXN1cmVzID0gZmluZE1lYXN1cmVzKHRoaXMubiwgTUVJT2JqZWN0KTtcblx0dGhpcy5jYXB0aW9uID0gZnVuY3Rpb24oU1ZHLCB4LCB5LCBhY3RpdmUpIHtcblx0XHRpZighdGhpcy50eXBlKSAgdGhpcy50eXBlPWdldEluc3RydW1lbnRUeXBlKHRoaXMubmFtZSwgdGhpcy5pbnN0cnVtZW50U2V0KTtcblx0XHRpZih0aGlzLnR5cGUpe1xuXHRcdFx0aWYodGhpcy50eXBlLm11bHRpcGxpY2l0eSl7XG5cdFx0XHRcdHJldHVybiAoPHRleHQgeD17eH0geT17eX0+e3RoaXMudHlwZS5tdWx0aXBsaWNpdHl9IHt0aGlzLnR5cGUucGx1cmFsfTwvdGV4dD4pO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0cmV0dXJuICg8dGV4dCB4PXt4fSB5PXt5fT57dGhpcy50eXBlLm5hbWV9PC90ZXh0Pilcblx0XHRcdH1cbi8qXHRcdFx0cmV0dXJuKDx0ZXh0IHg9e3h9IHk9e3l9PnthY3RpdmUgPyB0aGlzLm5hbWVcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0OiB0aGlzLnR5cGUuc2hvcnRuYW1lfTwvdGV4dD4pOyovXG5cdFx0fSBlbHNlIGlmKHRoaXMubmFtZSl7XG5cdFx0XHRyZXR1cm4gKDx0ZXh0IHg9e3h9IHk9e3l9Pnt0aGlzLm5hbWV9PC90ZXh0Pik7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHJldHVybig8ZGl2Lz4pO1xuXHRcdH1cblx0fTtcblx0dGhpcy5jbGFzc2VzID0gZnVuY3Rpb24oKXtcblx0XHRpZighdGhpcy50eXBlKSB0aGlzLnR5cGU9Z2V0SW5zdHJ1bWVudFR5cGUodGhpcy5uYW1lLCB0aGlzLmluc3RydW1lbnRTZXQpO1xuXHRcdGlmKHRoaXMudHlwZSkge1xuXHRcdFx0cmV0dXJuIHRoaXMudHlwZS5zaG9ydG5hbWUrXCIgXCIrdGhpcy50eXBlLnNlY3Rpb247XG5cdFx0fVxuXHRcdHJldHVybiAnJztcblx0fTtcblx0dGhpcy50eXBlRXEgPSBmdW5jdGlvbihvdGhlckluc3RydW1lbnQpe1xuXHRcdHJldHVybiB0aGlzLnR5cGUubmFtZT09PW90aGVySW5zdHJ1bWVudC50eXBlLm5hbWU7XG5cdH07XG5cdHRoaXMub25PZmZBcnJheSA9IGZ1bmN0aW9uKCl7XG5cdFx0Ly8gQSBzaW1wbGUgcmh5dGhtLW9ubHkgYXJyYXkgb2YgY29udGlndW91cyBzb3VuZGluZyBibG9jaywgb2YgdGhlXG5cdFx0Ly8gZm9ybSBbWzxzb3VuZGluZy1zdGFydHM+LCA8c291bmRpbmdlbmRzPl0sIFs8c291bmRpbmcyLXN0YXJ0cy4uLl1dXG5cdFx0dmFyIHByZXZNZWFzdXJlID0gZmFsc2U7XG5cdFx0dmFyIG9uT2ZmQXJyYXkgPSBbXTtcblx0XHR2YXIgcHJldm4gPSBmYWxzZTtcblx0XHR2YXIgc3RhcnQgPSBmYWxzZTtcblx0XHR2YXIgc3RhcnRYID0gZmFsc2U7XG5cdFx0Zm9yKHZhciBpPTA7IGk8dGhpcy5tZWFzdXJlcy5sZW5ndGg7IGkrKyl7XG5cdFx0XHR2YXIgbWVhc3VyZSA9IHRoaXMubWVhc3VyZXNbaV07XG5cdFx0XHR2YXIgbiA9IG1lYXN1cmUuYmFyTm8tMTtcblx0XHRcdGlmKChzdGFydCB8fCBzdGFydD09PTApICYmIChwcmV2biB8fCBwcmV2bj09PTApICYmIHByZXZuPG4tMSl7XG5cdFx0XHRcdC8vIFRoZXJlJ3MgYmVlbiBhdCBsZWFzdCBvbmUgZW1wdHkgYmFyLiBOZWVkIHRvIGNsb3NlXG5cdFx0XHRcdG9uT2ZmQXJyYXkucHVzaChbc3RhcnQsIHByZXZuKzFdKTtcblx0XHRcdFx0c3RhcnQgPSBmYWxzZTtcblx0XHRcdH1cblx0XHRcdGZvcih2YXIgaj0wOyBqPG1lYXN1cmUuZXZlbnRzLmxlbmd0aDsgaisrKXtcblx0XHRcdFx0dmFyIGV2ZW50ID0gbWVhc3VyZS5ldmVudHNbal07XG5cdFx0XHRcdGlmKGV2ZW50LnNvdW5kaW5nKSB7XG5cdFx0XHRcdFx0aWYoIXN0YXJ0ICYmIHN0YXJ0IT09MCl7XG5cdFx0XHRcdFx0XHRzdGFydCA9IG4rKGV2ZW50LnN0YXJ0L21lYXN1cmUuZHVyYXRpb24pO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRpZihzdGFydCB8fCBzdGFydD09PTApe1xuXHRcdFx0XHRcdFx0b25PZmZBcnJheS5wdXNoKFtzdGFydCwgbitldmVudC5zdGFydC9tZWFzdXJlLmR1cmF0aW9uXSk7XG5cdFx0XHRcdFx0XHRzdGFydCA9IGZhbHNlO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0cHJldm4gPSBuO1xuXHRcdH1cblx0XHRpZihzdGFydCB8fCBzdGFydD09PTApIHtcblx0XHRcdG9uT2ZmQXJyYXkucHVzaChbc3RhcnQsIHByZXZuKzFdKTtcblx0XHR9XG5cdFx0cmV0dXJuIG9uT2ZmQXJyYXk7XG5cdH07XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBkcmF3UmliYm9ucyhibG9icywgeSwgcm93SGVpZ2h0LCBzdGVwLCBjbGFzc2VzLCBtb3ZlciwgbW91dCwgaSwgeG9mZil7XG5cdHZhciByaWJib25zID0gW107XG5cdGlmKCF4b2ZmKSB4b2ZmPTA7XG5cdGZvcih2YXIgaT0wO2k8YmxvYnMubGVuZ3RoOyBpKyspe1xuXHRcdHJpYmJvbnMucHVzaCg8cmVjdCB5PXt5K3Jvd0hlaWdodC84fSB4PXsoYmxvYnNbaV1bMF0pKnN0ZXAgKyB4b2ZmfVxuXHRcdFx0XHRcdFx0XHRcdCB3aWR0aD17c3RlcCooYmxvYnNbaV1bMV0tYmxvYnNbaV1bMF0pfVxuXHRcdFx0XHRcdFx0XHRcdCBrZXk9eydyaWJib24gJytpK3l9XG5cdFx0XHRcdFx0XHRcdFx0IGhlaWdodD17cm93SGVpZ2h0KjcvOH1cblx0XHRcdFx0XHRcdFx0XHQgcng9XCI1XCIgcnk9XCI1XCIgY2xhc3NOYW1lPXsnYm94ICcrY2xhc3NlcysnIG5ubicraX1cblx0XHRcdFx0XHRcdFx0XHQgb25Nb3VzZU92ZXI9e21vdmVyfSBvbk1vdXNlT3V0PXttb3V0fS8+KTtcblx0fVxuXHRyZXR1cm4gPGc+e3JpYmJvbnN9PC9nPjtcbn1cbmV4cG9ydCBmdW5jdGlvbiBkcmF3QmFyTGluZXMoYmFyY291bnQsIHdpZHRoLCBoZWlnaHQsIHhvZmYsIHlvZmYpe1xuXHR2YXIgeCA9IHhvZmYgPyB4b2ZmIDogMDtcblx0dmFyIHkgPSB5b2ZmID8geW9mZiA6IDA7XG5cdHZhciBsaW5lcyA9IFtdO1xuXHRmb3IodmFyIGk9MDsgaTxiYXJjb3VudDsgaSsrKXtcblx0XHRsaW5lcy5wdXNoKDxsaW5lIGtleT17XCJiYXJsaW5lLVwiK2krXCItXCIreCtcIi1cIitoZWlnaHR9IHgxPXt4fSB4Mj17eH0geTE9ezB9IHkyPXtoZWlnaHR9IGNsYXNzTmFtZT17XCJyaWJib24tYmFybGluZSBiYXJcIitpfS8+KTtcblx0XHR4Kz0gKHdpZHRoLXhvZmYpIC8gYmFyY291bnQ7XG5cdH1cblx0cmV0dXJuIGxpbmVzO1xufVxuXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gTWVyZ2luZSBpbnN0cnVtZW50c1xuLy8gSW5zdHJ1bWVudHMgY2FuIChvcHRpb25hbGx5KSBhdXRvbWF0aWNhbGx5IGJlIG1lcmdlZCBpZiB0aGV5J3JlXG4vLyBwbGF5aW5nIGF0IHRoZSBzYW1lIHRpbWUuIFRoaXMgd2FzIGRyb3BwZWQgZnJvbSB0aGUgVGltZU1hY2hpbmVcbi8vIGFwcCwgYW5kIGNvdWxkIHVzZSBtb3JlIG9wdGlvbnMgZm9yIHRoZSBsb2dpYy5cbmV4cG9ydCBmdW5jdGlvbiBtZXJnZWRJbnN0cnVtZW50cyhpbnN0cnVtZW50cyl7XG5cdHZhciBwbGF5aW5nU2V0cyA9IFtdO1xuXHR2YXIgY292ZXJlZCA9IFtdO1xuXHR2YXIgaW5zdHJ1bWVudHNQbGF5aW5nID0gaW5zdHJ1bWVudHMubWFwKHggPT4geC5vbk9mZkFycmF5KCkpO1xuXHRmb3IodmFyIGk9MDsgaTxpbnN0cnVtZW50cy5sZW5ndGg7IGkrKyl7XG5cdFx0aWYoY292ZXJlZC5pbmRleE9mKGkpPT09LTEpe1xuXHRcdFx0dmFyIHBsYXlpbmcgPSBpbnN0cnVtZW50c1BsYXlpbmdbaV07XG5cdFx0XHR2YXIgcGxheWluZ1NldCA9IHtwbGF5aW5nOiBwbGF5aW5nLCBpbnN0cnVtZW50czogW2luc3RydW1lbnRzW2ldXX07XG5cdFx0XHRjb3ZlcmVkLnB1c2goaSk7XG5cdFx0XHRmb3IodmFyIGo9aSsxOyBqPGluc3RydW1lbnRzLmxlbmd0aDsgaisrKXtcblx0XHRcdFx0aWYob25PZmZBcnJheUVxKHBsYXlpbmcsIGluc3RydW1lbnRzUGxheWluZ1tqXSkpe1xuXHRcdFx0XHRcdGNvdmVyZWQucHVzaChqKTtcblx0XHRcdFx0XHRwbGF5aW5nU2V0Lmluc3RydW1lbnRzLnB1c2goaW5zdHJ1bWVudHNbal0pO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG4vL1x0XHRcdGlzQWxsT2ZJbnN0cnVtZW50KHBsYXlpbmdTZXQsIGluc3RydW1lbnRzKTtcblx0XHRcdHBsYXlpbmdTZXRzLnB1c2gocGxheWluZ1NldCk7XG5cdFx0fVxuXHR9XG5cdHJldHVybiBwbGF5aW5nU2V0cztcbn1cbmZ1bmN0aW9uIHNpbmdsZUluc3RydW1lbnQoc2V0KXtcblx0cmV0dXJuIHNldC5ldmVyeSh4ID0+IHgudHlwZSAmJiB4LnR5cGUubmFtZT09PXNldFswXS50eXBlLm5hbWUpID8gc2V0WzBdLnR5cGUubmFtZSA6IGZhbHNlO1xufVxuZnVuY3Rpb24gc2luZ2xlU2VjdGlvbihzZXQpe1xuXHRyZXR1cm4gc2V0LmV2ZXJ5KHggPT4geC50eXBlICYmIHgudHlwZS5zZWN0aW9uPT09c2V0WzBdLnR5cGUuc2VjdGlvbikgPyBzZXRbMF0udHlwZS5zZWN0aW9uIDogZmFsc2U7XG59XG5leHBvcnQgZnVuY3Rpb24gY2FwdGlvbihzZXQsIG9yY2hlc3RyYSwgYWN0aXZlLCBtb3ZlciwgbW91dCwgeCwgeSwgYmFzZWNsYXNzLCBuKXtcblx0dmFyIGluc3QgPSBzaW5nbGVJbnN0cnVtZW50KHNldCk7XG5cdHZhciBzZWN0aW9uID0gc2luZ2xlU2VjdGlvbihzZXQpO1xuXHR2YXIgY2wgPSAnJztcblx0aWYoYWN0aXZlKXtcblx0XHRpZiAoc2V0Lmxlbmd0aD09PTEpe1xuXHRcdFx0Y2wgPSBzZWN0aW9uK1wiIFwiK2luc3QrXCIgbm5uXCIrbjtcblx0XHRcdHJldHVybiB7b2JqOiA8ZyBvbk1vdXNlT3Zlcj17bW92ZXJ9IG9uTW91c2VPdXQ9e21vdXR9PlxuXHRcdFx0XHRcdFx0XHQ8dGV4dCB4PXt4fSB5PXt5fSBjbGFzc05hbWU9e2Jhc2VjbGFzcytjbH0+e3NldFswXS5uYW1lfTwvdGV4dD48L2c+LFxuXHRcdFx0XHRcdFx0XHRjbDogY2x9O1xuXHRcdH0gZWxzZSBpZihzZWN0aW9uICYmIG9yY2hlc3RyYS5maWx0ZXIoeCA9PiB4LnR5cGUuc2VjdGlvbj09PXNlY3Rpb24pLmxlbmd0aD09PXNldC5sZW5ndGgpe1xuXHRcdFx0Ly8gVGhpcyBpcyB0aGUgZW50aXJlIHNlY3Rpb24gYXQgdGhpcyBwb2ludC4gRklYTUUsIHRoaXMgaXNcblx0XHRcdC8vIGJyb2tlbiBsb2dpYyAoYmVjYXVzZSBpdCdzIHNvIGxvY2FsKS4gSSBtYXkgbmVlZCB0byBwcmVzZXQgYW5cblx0XHRcdC8vIG9yY2hlc3RyYSBzb21laG93LlxuXHRcdFx0Y2w9IHNlY3Rpb24rXCIgXCIraW5zdCtcIiBubm5cIituO1xuXHRcdFx0cmV0dXJuIHtvYmo6IDxnIG9uTW91c2VPdmVyPXttb3Zlcn0gb25Nb3VzZU91dD17bW91dH0+XG5cdFx0XHRcdFx0XHRcdDx0ZXh0IHg9e3h9IHk9e3l9IGNsYXNzTmFtZT17YmFzZWNsYXNzK2NsfT57c2VjdGlvbn08L3RleHQ+PC9nPixcblx0XHRcdFx0XHRcdFx0Y2w6Y2x9O1xuXHRcdH0gZWxzZSB7XG5cdFx0XHR2YXIgb3V0PXNldFswXS5uYW1lO1xuXHRcdFx0Y2wgPSAoc2VjdGlvbj8gc2VjdGlvbiA6ICdtaXNjJylcblx0XHRcdFx0K1wiIFwiKyhpbnN0ID8gaW5zdCA6ICdtaXNjaW5zdCcpICtcIiBubm5cIituO1xuXHRcdFx0Zm9yICh2YXIgaT0xOyBpPHNldC5sZW5ndGgtMTsgaSsrKXtcblx0XHRcdFx0b3V0ICs9IFwiLCBcIitzZXRbMF0ubmFtZTtcblx0XHRcdH1cblx0XHRcdHJldHVybiB7b2JqOiA8ZyBvbk1vdXNlT3Zlcj17bW92ZXJ9IG9uTW91c2VPdXQ9e21vdXR9PlxuXHRcdFx0XHRcdFx0XHQ8dGV4dCB4PXt4fSB5PXt5fSBjbGFzc05hbWU9e2Jhc2VjbGFzcytjbH0+e291dCArIFwiICYgXCIrc2V0W3NldC5sZW5ndGgtMV0ubmFtZX08L3RleHQ+PC9nPixcblx0XHRcdFx0XHRcdFx0Y2w6IGNsfTtcblx0XHR9XG5cdH0gZWxzZSB7XG5cdFx0aWYoc2V0Lmxlbmd0aD09PTEpe1xuXHRcdFx0Y2wgPSBzZWN0aW9uK1wiIFwiK2luc3QrXCIgbm5uXCIrbjtcblx0XHRcdHJldHVybiB7b2JqOiA8ZyBvbk1vdXNlT3Zlcj17bW92ZXJ9IG9uTW91c2VPdXQ9e21vdXR9PlxuXHRcdFx0XHRcdFx0XHQ8dGV4dCB4PXt4fSB5PXt5fSBjbGFzc05hbWU9e2Jhc2VjbGFzcytjbH0+e3NldFswXS50eXBlLnNob3J0bmFtZX08L3RleHQ+PC9nPixcblx0XHRcdFx0XHRcdFx0Y2w6Y2x9O1xuXHRcdH0gZWxzZSBpZihzZWN0aW9uICYmIG9yY2hlc3RyYS5maWx0ZXIoeCA9PiB4LnR5cGUuc2VjdGlvbj09PXNlY3Rpb24pLmxlbmd0aD09PXNldC5sZW5ndGgpe1xuXHRcdFx0Y2wgPSBzZWN0aW9uK1wiIFwiK2luc3QrXCIgbm5uXCIrbjtcblx0XHRcdHJldHVybiB7b2JqOiA8ZyBvbk1vdXNlT3Zlcj17bW92ZXJ9IG9uTW91c2VPdXQ9e21vdXR9PlxuXHRcdFx0XHRcdFx0XHQ8dGV4dCB4PXt4fSB5PXt5fSBjbGFzc05hbWU9e2Jhc2VjbGFzcytjbH0+e3NlY3Rpb24uc3Vic3RyaW5nKDAsMyl9PC90ZXh0PjwvZz4sXG5cdFx0XHRcdFx0XHRcdGNsOmNsfTtcblx0XHR9IGVsc2UgaWYgKGluc3QgJiYgb3JjaGVzdHJhLmZpbHRlcih4ID0+IHgudHlwZS5uYW1lPT09aW5zdCkubGVuZ3RoPT09c2V0Lmxlbmd0aCl7XG5cdFx0XHRjbD0gc2VjdGlvbitcIiBcIitpbnN0K1wiIG5ublwiK247XG5cdFx0XHRyZXR1cm4ge29iajogPGcgb25Nb3VzZU92ZXI9e21vdmVyfSBvbk1vdXNlT3V0PXttb3V0fT5cblx0XHRcdFx0XHRcdFx0PHRleHQgeD17eH0geT17eX0gY2xhc3NOYW1lPXtiYXNlY2xhc3MrY2x9PntzZXRbMF0udHlwZS5zaG9ydHBsdXJhbH08L3RleHQ+PC9nPixcblx0XHRcdFx0XHRcdFx0Y2w6Y2x9O1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRjbD0oc2VjdGlvbj8gc2VjdGlvbiA6ICdtaXNjJykgK1wiIFwiKyhpbnN0ID8gaW5zdCA6ICdtaXNjaW5zdCcpICtcIiBubm5cIituO1xuXHRcdFx0cmV0dXJuIHtvYmo6IDxnIG9uTW91c2VPdmVyPXttb3Zlcn0gb25Nb3VzZU91dD17bW91dH0+XG5cdFx0XHRcdFx0XHRcdDx0ZXh0IHg9e3h9IHk9e3l9IGNsYXNzTmFtZT17YmFzZWNsYXNzK2NsfT57aW5zdCA/IHNldFswXS50eXBlLnNob3J0cGx1cmFsIDogJ21pc2MnfTwvdGV4dD48L2c+LFxuXHRcdFx0XHRcdFx0XHRjbDpjbH07XG5cdFx0fVxuXHR9XG59XG5cbmZ1bmN0aW9uIGlzQWxsT2ZJbnN0cnVtZW50KHNldCwgb3JjaGVzdHJhKXtcblx0Ly8gcmV0dXJucyB0cnVlIGlmIGFsbCBpbnN0cnVtZW50cyBvZiBhIGdpdmVuIHR5cGUgaW4gYWxsIGFyZVxuXHQvLyByZXByZXNlbnRlZCBpbiBzZXQuIFYgZnJhZ2lsZSwgbm90IHZlcnkgbXVzaWNhbCwgbG9naWNcblx0aWYoc2V0Lmxlbmd0aCl7XG5cdFx0dmFyIGluc3RyID0gc2V0WzBdLnR5cGUubmFtZTtcblx0XHRpZihzZXQuZXZlcnkoeCA9PiB4LnR5cGUubmFtZT09PWluc3RyKSl7XG5cdFx0XHRyZXR1cm4gb3JjaGVzdHJhLmZpbHRlcih4ID0+IHgudHlwZS5uYW1lPT09aW5zdHIpLmxlbmd0aD09PXNldC5sZW5ndGg7XG5cdFx0fVxuXHR9XG5cdHJldHVybiBmYWxzZTtcbn1cbmZ1bmN0aW9uIGVudGlyZVNlY3Rpb24oc2V0LCBvcmNoZXN0cmEpe1xuXHQvLyByZXR1cm5zIHRydWUgaWYgYWxsIGluc3RydW1lbnRzIGFyZSBmcm9tIHRoZSBzYW1lIHNlY3Rpb24gYW5kIGFyZVxuXHQvLyBhbGwgb2YgdGhhdCBzZWN0aW9uIHByZXNlbnQuIFYgZnJhZ2lsZSwgbm90IHZlcnkgbXVzaWNhbCwgbG9naWNcblx0aWYoc2V0Lmxlbmd0aCl7XG5cdFx0dmFyIHNlY3Rpb24gPSBzZXRbMF0udHlwZS5zZWN0aW9uO1xuXHRcdGlmKHNldC5ldmVyeSh4ID0+IHgudHlwZS5zZWN0aW9uID09PSBzZWN0aW9uKSl7XG5cdFx0XHRyZXR1cm4gb3JjaGVzdHJhLmZpbHRlcih4ID0+IHgudHlwZS5zZWN0aW9uPT09c2VjdGlvbikubGVuZ3RoPT09c2V0Lmxlbmd0aDtcblx0XHR9XG5cdH1cblx0cmV0dXJuIGZhbHNlO1xufVxuXG5mdW5jdGlvbiBvbk9mZkFycmF5RXEoYXJyMSwgYXJyMil7XG5cdGlmKGFycjEubGVuZ3RoICE9PWFycjIubGVuZ3RoKSByZXR1cm4gZmFsc2U7XG5cdGZvcih2YXIgaT0wOyBpPGFycjEubGVuZ3RoOyBpKyspe1xuXHRcdGlmKGFycjFbaV1bMF0hPT1hcnIyW2ldWzBdIHx8IGFycjFbaV1bMV0hPT1hcnIyW2ldWzFdKSByZXR1cm4gZmFsc2U7XG5cdH1cblx0cmV0dXJuIHRydWU7XG59XG4iXX0=