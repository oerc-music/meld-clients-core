function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React, { Component } from 'react';
import { connect } from 'react-redux';
import MyImage from 'meld-clients-core/src/containers/image.js';

class TimeSensitiveImage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeUri: ""
    };
  }

  render() {
    // objective: set our active URI according to the clock
    // 1. check the time according to our clock provider
    if ("mediaResources" in this.props.timesync && this.props.clockProvider in this.props.timesync.mediaResources) {
      let t = this.props.timesync.mediaResources[this.props.clockProvider]["currentTime"];
      t = t + 3; // initiate image switch 3 seconds AHEAD of where it is specified (NOTE: APP / USE-CASE SPECIFIC...)

      const syncs = this.props.timesync.mediaResources[this.props.clockProvider]["times"];
      const times = Object.keys(syncs).map(t => Number(t)); // ensure number, not string

      if (times.length) {
        // 2. find the closest corresponding synchronisation point before t
        const closest = times.reduce((closestSoFar, curr) => {
          // ensure we have numbers, not strings
          return curr > closestSoFar && curr <= t ? curr : closestSoFar;
        }); // 3. this becomes our active URI pointing to the image to load

        return /*#__PURE__*/React.createElement(MyImage, _extends({}, this.props, {
          uri: syncs[closest][0]["@id"]
        }));
      }
    }

    return /*#__PURE__*/React.createElement("div", null);
  }

}

;

function mapStateToProps({
  timesync
}) {
  return {
    timesync
  };
}

export default connect(mapStateToProps)(TimeSensitiveImage);