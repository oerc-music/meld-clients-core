import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withMediaProps } from 'react-media-player';

class CustomPlayPause extends Component {
  constructor(props) {
    super(props);
    this._handlePlayPause = this.__handlePlayPause.bind(this);
  }

  __handlePlayPause() {
    this.props.media.playPause();
  }

  render() {
    const {
      media: {
        isPlaying
      },
      className
    } = this.props;
    return /*#__PURE__*/React.createElement("svg", {
      role: "button",
      width: "36px",
      height: "36px",
      viewBox: "0 0 36 36",
      className: className,
      onClick: this._handlePlayPause
    }, /*#__PURE__*/React.createElement("circle", {
      fill: "#FFA500",
      cx: "18",
      cy: "18",
      r: "18"
    }), isPlaying && /*#__PURE__*/React.createElement("g", {
      key: "pause",
      style: {
        transformOrigin: '0% 50%'
      }
    }, /*#__PURE__*/React.createElement("rect", {
      x: "12",
      y: "11",
      fill: "#FFFFFF",
      width: "4",
      height: "14"
    }), /*#__PURE__*/React.createElement("rect", {
      x: "20",
      y: "11",
      fill: "#FFFFFF",
      width: "4",
      height: "14"
    })), !isPlaying && /*#__PURE__*/React.createElement("polygon", {
      key: "play",
      fill: "#FFFFFF",
      points: "14,11 26,18 14,25",
      style: {
        transformOrigin: '100% 50%'
      }
    }));
  }

}

export default withMediaProps(CustomPlayPause);