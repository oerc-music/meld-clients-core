import React, {Component} from 'react';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import MyImage from 'meld-clients-core/lib/containers/image.js'
import { fetchGraph, registerClock, tickTimedResource } from '../actions/index';

class TimeSensitiveImage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeUri: "",
			lastMediaTick: 0
    }
		this.tick = this.tick.bind(this);
  }

	tick(id,t) {
		// Update timing information so that it's visible to all
		// components that subscribe to this clock source.
		//
		// Only do it if we've crossed a boundary:
		// if we've progressed across the next second boundary, 
		if(Math.floor(t.currentTime) > this.state.lastMediaTick ||
			 // OR if we've gone back in time (user did a seek)...
			 t.currentTime < this.state.lastMediaTick) {
			// store the time... (FIXME: note rounding)
			this.setState({ lastMediaTick: Math.floor(t.currentTime) }); 
			// ... and dispatch a "TICK" action 
			// any time-sensitive component subscribes to it, 
			// triggering time-anchored annotations triggered as appropriate
			this.props.tickTimedResource(id, Math.floor(t.currentTime));
		}
	}

  render() {
    // objective: set our active URI according to the clock
    // 1. check the time according to our clock provider
    if ("mediaResources" in this.props.timesync &&
        this.props.clockProvider in this.props.timesync.mediaResources) {
      let t = this.props.timesync.mediaResources[this.props.clockProvider]["currentTime"];
			let offset = this.props.offset ? this.props.offset : 3;
			// Often a transition should happen at a little earlier
			// than the semantic match (i.e. turning pages exactly at
			// the point of the page turn is bad). The offset is a
			// not very satisfactory workaround.
      t = t + offset;
      const syncs = this.props.timesync.mediaResources[this.props.clockProvider]["times"];
      const times = Object.keys(syncs).map((t) => Number(t)); // ensure number, not string
      if (times.length) {
        // 2. find the closest corresponding synchronisation point before t
        const closest = times.reduce((closestSoFar, curr) => {
          // ensure we have numbers, not strings
          return curr > closestSoFar && curr <= t ? curr : closestSoFar
        });
        // 3. this becomes our active URI pointing to the image to load
        return <MyImage {...this.props} uri={syncs[closest][0]["@id"]}/>
      }
    }
		// Show an image even if the timings aren't working (does this make sense?)
		return <MyImage {...this.props} uri={ this.props.uri  } />
  }
}


function mapStateToProps({timesync}) {
  return {timesync};
}

export default connect(mapStateToProps,)(TimeSensitiveImage);
