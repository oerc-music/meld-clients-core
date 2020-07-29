import React, { Component } from 'react';
import { nsResolver, svgLine, svgRoundedRect, svgGroup, svgSpan, svgText } from '../library/svgUtils.js'; ////////
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
  var measureCount = MEIObject.evaluate('count(//mei:measure)', MEIObject, nsResolver, XPathResult.NUMBER_TYPE, null);
  return measureCount.numberValue;
}

function findMeasures(n, MEIObject) {
  // Given parsed MEI, find all the bars with music in for staff/instrument n
  var staves = MEIObject.evaluate('//mei:staff[@n=' + n + ' and .//mei:note]', MEIObject, nsResolver, XPathResult.ORDERED_NODE_ITERATORTYPE, null);
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
  this.barNo = this.MEIObject.evaluate('./ancestor::mei:measure/@n', barStaff, nsResolver, XPathResult.NUMBER_TYPE, null).numberValue;
  this.events = [];
  this.duration = 0;
  var eventObjs = this.MEIObject.evaluate('./mei:layer//mei:note | ./mei:layer//mei:rest | ./mei:layer//mei:chord', barStaff, nsResolver, XPathResult.ORDERED_NODE_ITERATORTYPE, null);
  var event = eventObjs.iterateNext();
  var t = 0;
  var newt = false;

  while (event) {
    newt = t + duration(event, MEIObject);

    if (this.events.length && this.events[this.events.length - 1].extends(event)) {
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
  var staffDefs = MEIObject.evaluate('//mei:staffDef', MEIObject, nsResolver, XPathResult.ORDERED_NODE_ITERATORTYPE, null);
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

  this.extends = function (event) {
    // Boolean: Is the new event of the same type as others in this
    // object? (so does it continue the same on/off state?)
    return event.nodeName == 'note' && this.sounding || event.nodeName == 'note' && this.sounding || event.nodeName == 'rest' && !this.sounding;
  };
}

export function Orchestration(MEIString, additionalInstruments) {
  // The Orchestration object holds a parsed MEI XML object
  // and then extracts various elements of the orchestration
  // for drawing.
  this.MEIString = MEIString;
  this.instrumentSet = { ...Instruments,
    ...additionalInstruments
  };
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
        return /*#__PURE__*/React.createElement("text", {
          x: x,
          y: y
        }, this.type.multiplicity, " ", this.type.plural);
      } else {
        return /*#__PURE__*/React.createElement("text", {
          x: x,
          y: y
        }, this.type.name);
      }
      /*			return(<text x={x} y={y}>{active ? this.name
      																: this.type.shortname}</text>);*/

    } else if (this.name) {
      return /*#__PURE__*/React.createElement("text", {
        x: x,
        y: y
      }, this.name);
    } else {
      return /*#__PURE__*/React.createElement("div", null);
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


export function mergedInstruments(instruments) {
  var playingSets = [];
  var covered = [];
  var instrumentsPlaying = instruments.map(x => x.onOffArray());

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
  return set.every(x => x.type && x.type.name === set[0].type.name) ? set[0].type.name : false;
}

function singleSection(set) {
  return set.every(x => x.type && x.type.section === set[0].type.section) ? set[0].type.section : false;
}

export function caption(set, orchestra, active, mover, mout, x, y, baseclass, n) {
  var inst = singleInstrument(set);
  var section = singleSection(set);
  var cl = '';

  if (active) {
    if (set.length === 1) {
      cl = section + " " + inst + " nnn" + n;
      return {
        obj: /*#__PURE__*/React.createElement("g", {
          onMouseOver: mover,
          onMouseOut: mout
        }, /*#__PURE__*/React.createElement("text", {
          x: x,
          y: y,
          className: baseclass + cl
        }, set[0].name)),
        cl: cl
      };
    } else if (section && orchestra.filter(x => x.type.section === section).length === set.length) {
      // This is the entire section at this point. FIXME, this is
      // broken logic (because it's so local). I may need to preset an
      // orchestra somehow.
      cl = section + " " + inst + " nnn" + n;
      return {
        obj: /*#__PURE__*/React.createElement("g", {
          onMouseOver: mover,
          onMouseOut: mout
        }, /*#__PURE__*/React.createElement("text", {
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
        obj: /*#__PURE__*/React.createElement("g", {
          onMouseOver: mover,
          onMouseOut: mout
        }, /*#__PURE__*/React.createElement("text", {
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
        obj: /*#__PURE__*/React.createElement("g", {
          onMouseOver: mover,
          onMouseOut: mout
        }, /*#__PURE__*/React.createElement("text", {
          x: x,
          y: y,
          className: baseclass + cl
        }, set[0].type.shortname)),
        cl: cl
      };
    } else if (section && orchestra.filter(x => x.type.section === section).length === set.length) {
      cl = section + " " + inst + " nnn" + n;
      return {
        obj: /*#__PURE__*/React.createElement("g", {
          onMouseOver: mover,
          onMouseOut: mout
        }, /*#__PURE__*/React.createElement("text", {
          x: x,
          y: y,
          className: baseclass + cl
        }, section.substring(0, 3))),
        cl: cl
      };
    } else if (inst && orchestra.filter(x => x.type.name === inst).length === set.length) {
      cl = section + " " + inst + " nnn" + n;
      return {
        obj: /*#__PURE__*/React.createElement("g", {
          onMouseOver: mover,
          onMouseOut: mout
        }, /*#__PURE__*/React.createElement("text", {
          x: x,
          y: y,
          className: baseclass + cl
        }, set[0].type.shortplural)),
        cl: cl
      };
    } else {
      cl = (section ? section : 'misc') + " " + (inst ? inst : 'miscinst') + " nnn" + n;
      return {
        obj: /*#__PURE__*/React.createElement("g", {
          onMouseOver: mover,
          onMouseOut: mout
        }, /*#__PURE__*/React.createElement("text", {
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

    if (set.every(x => x.type.name === instr)) {
      return orchestra.filter(x => x.type.name === instr).length === set.length;
    }
  }

  return false;
}

function entireSection(set, orchestra) {
  // returns true if all instruments are from the same section and are
  // all of that section present. V fragile, not very musical, logic
  if (set.length) {
    var section = set[0].type.section;

    if (set.every(x => x.type.section === section)) {
      return orchestra.filter(x => x.type.section === section).length === set.length;
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