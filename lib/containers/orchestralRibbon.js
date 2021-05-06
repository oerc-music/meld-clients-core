import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchRibbonContent } from '../actions/index';
import { Orchestration, mergedInstruments, caption, drawBarLines, drawRibbons } from '../library/MEIRibbonUtils';
import InlineSVG from 'svg-inline-react';

class OrchestralRibbon extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active: false
    };
  }

  showLongName(e) {
    var cl = e.target.className.baseVal;
    var i = cl.substr(cl.indexOf('nnn') + 3);
    this.setState({
      active: parseInt(i)
    });
  }

  showShortName(e) {
    this.setState({
      active: false
    });
  }

  render() {
    if (Object.keys(this.props.score).length) {
      if (true && this.props.score["MEIfile"] && this.props.score["MEIfile"][this.props.uri]) {
        var orch = new Orchestration(this.props.score["MEIfile"][this.props.uri], this.props.additionalInstruments);
        var startx = 120;
        var starty = 20;
        var height = this.props.height;
        var width = this.props.width;
        var rowHeight = (height - starty) / orch.instruments.filter(x => x.type).length;
        var boxes = [];
        var captions = [];
        var misses = 0;
        var stop = Math.max(...Object.keys(orch.instruments)) + 1;

        for (var i = 0; i < stop; i++) {
          if (!orch.instruments[i]) {
            misses++;
            continue;
          }

          var inst = orch.instruments[i].type;

          if (!inst) {
            console.log("can't find", orch.instruments[i]);
            misses++;
            continue;
          }

          var xpos = 100;
          var ypos = rowHeight * (i - misses) + starty;
          var instName = inst.multiplicity ? inst.multiplicity + " " + inst.plural : inst.name;
          var cap = /*#__PURE__*/React.createElement("g", {
            key: 'instrLabel' + i
          }, /*#__PURE__*/React.createElement("text", {
            x: xpos,
            y: ypos + 2 * rowHeight / 3,
            className: 'instrLabel ' + inst.section + " " + inst.name + " nnn" + i
          }, instName));
          captions.push(cap);
          boxes.push(drawRibbons(orch.instruments[i].onOffArray(), ypos, rowHeight, (width - 120) / orch.measureCount, ' ' + inst.section + " " + inst.name + " nnn" + i, false, false, i, 120));
        }

        var bars = drawBarLines(orch.measureCount, width, height, 120, starty);
        var barNo = this.props.barNo ? /*#__PURE__*/React.createElement("text", {
          x: startx - 5,
          y: starty - 10,
          className: "barno"
        }, this.props.barNo) : false;
        return /*#__PURE__*/React.createElement("svg", {
          width: width,
          height: height,
          className: "orchestralRibbon"
        }, bars, boxes, captions, barNo);
      } else if (this.props.score["MEIfile"] && this.props.score["MEIfile"][this.props.uri]) {
        var orch = new Orchestration(this.props.score["MEIfile"][this.props.uri]);
        var mergedInst = mergedInstruments(orch.instruments);
        var height = Math.min(this.props.height, window.innerHeight - 200);
        var width = this.props.width;
        var rowHeight = height / mergedInst.length;
        var boxes = [];
        var captions = [];
        var startx = 0;

        for (var i = 0; i < mergedInst.length; i++) {
          var xpos = 0; // var ypos = rowHeight*(i+0.875);

          var ypos = rowHeight * i;
          var mover = this.showLongName.bind(this);
          var mout = this.showShortName.bind(this);
          var iname = '';
          var section = 'mixed';
          var cap = caption(mergedInst[i].instruments, orch.instruments, this.state.active === i, mover, mout, xpos, ypos + 2 * rowHeight / 3, 'instrLabel ', i);
          captions.push(cap.obj);
          boxes.push(drawRibbons(mergedInst[i].playing, ypos, rowHeight, (width - 40) / orch.measureCount, ' ' + cap.cl, mover, mout, i));
        }

        var bars = drawBarLines(orch.measureCount, width, height);
        return /*#__PURE__*/React.createElement("svg", {
          width: width,
          height: height,
          className: "orchestralRibbon"
        }, bars, boxes, captions);
      }

      return /*#__PURE__*/React.createElement("div", {
        className: "ribbon empty"
      });
    }

    return /*#__PURE__*/React.createElement("div", null, "Loading...");
  }

  componentDidMount() {
    this.props.fetchRibbonContent(this.props.uri);
  }

}

function mapStateToProps({
  score
}) {
  return {
    score
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    fetchRibbonContent
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(OrchestralRibbon);