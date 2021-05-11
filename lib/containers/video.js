import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Media, Player, controls, utils } from 'react-media-player';
import CustomPlayPause from '../containers/react-media-player-play-pause';
import { fetchGraph, registerClock, tickTimedResource } from '../actions/index';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
const {
  defaultPlayPause,
  CurrentTime,
  Progress,
  SeekBar,
  Duration,
  MuteUnmute,
  Volume,
  Fullscreen
} = controls;

class Video extends Component {
  constructor(props) {
    super(props);
    this.state = {
      jumpedTime: false,
      lastMediaTick: 0
    };
    this.tick = this.tick.bind(this); //		this.clearCursor= this.clearCursor.bind(this);
  }

  inViewRefs() {}

  componentWillReceiveProps() {
    if (this.state.jumpedTime) this.setState({
      jumpedTime: false
    });
  }

  componentWillMount() {//		clockProvider = this.props.uri;
    //		this.props.registerClock(this.props.uri);
  }

  componentDidMount() {}

  componentDidUpdate() {}

  tick(id, t) {
    if (Math.floor(t.currentTime) > this.state.lastMediaTick || // if we've progressed across the next second boundary, 
    t.currentTime < this.state.lastMediaTick) {
      // OR if we've gone back in time (user did a seek)...
      this.setState({
        lastMediaTick: Math.floor(t.currentTime)
      }); // keep track of this time tick)
      // dispatch a "TICK" action 
      // any time-sensitive component subscribes to it, 
      // triggering time-anchored annotations triggered as appropriate

      this.props.tickTimedResource(id, Math.floor(t.currentTime));
    }
  }

  render() {
    console.log(this.props.timesync);
    var cT = this.props.timesync && "mediaResources" in this.props.timesync && this.props.uri in this.props.timesync.mediaResources ? this.props.timesync.mediaResources[this.props.uri]['currentTime'] : 0;
    /*
    console.log(this.props.timesync);
    if(this.props.timesync && "mediaResources" in this.props.timesync
    	 && clockProvider in this.props.timesync.mediaResources){
    	cT = this.props.timesync.mediaResources[clockProvider]['currentTime'];
    	var syncs = this.props.timesync.mediaResources[clockProvider]['times'];
    	var times = Object.keys(syncs).map((t)=> Number(t));
    	console.log(times, syncs);
    }*/

    return /*#__PURE__*/React.createElement(Media, {
      key: this.props.uri,
      className: "videoEssay"
    }, /*#__PURE__*/React.createElement("div", {
      className: "media videoEssay"
    }, /*#__PURE__*/React.createElement("div", {
      className: "media-player"
    }, /*#__PURE__*/React.createElement(Player, {
      width: "700px",
      src: this.props.uri,
      onTimeUpdate: t => {
        this.tick(this.props.uri, t);
      },
      defaultCurrentTime: cT
    })), /*#__PURE__*/React.createElement("div", {
      className: "media-controls"
    }, /*#__PURE__*/React.createElement(CustomPlayPause, null), /*#__PURE__*/React.createElement(SeekBar, null), /*#__PURE__*/React.createElement("div", {
      className: "media-info"
    }, /*#__PURE__*/React.createElement(CurrentTime, null), /*#__PURE__*/React.createElement("span", null, "/"), /*#__PURE__*/React.createElement(Duration, null)))));
  }

}

function mapStateToProps({
  graph,
  timesync
}) {
  return {
    graph,
    timesync
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    registerClock,
    tickTimedResource
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Video);