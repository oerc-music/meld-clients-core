import React, { Component } from 'react';
import { controls, Media, Player } from 'react-media-player';
const {
  PlayPause,
  CurrentTime,
  Progress,
  SeekBar,
  Duration,
  MuteUnmute,
  Volume,
  Fullscreen
} = controls;

class MediaPlayer extends Component {
  render() {
    console.log("MEDIA PLAYER HAS PROPS: ", this.props);
    return /*#__PURE__*/React.createElement(Media, null, /*#__PURE__*/React.createElement("div", {
      className: "media"
    }, /*#__PURE__*/React.createElement("div", {
      className: "media-player"
    }, /*#__PURE__*/React.createElement(Player, {
      src: this.props.uri
    })), /*#__PURE__*/React.createElement("div", {
      className: "media-controls"
    }, /*#__PURE__*/React.createElement(PlayPause, null), /*#__PURE__*/React.createElement(CurrentTime, null), /*#__PURE__*/React.createElement(SeekBar, null), /*#__PURE__*/React.createElement(Duration, null), /*#__PURE__*/React.createElement(MuteUnmute, null), /*#__PURE__*/React.createElement(Volume, null), /*#__PURE__*/React.createElement(Fullscreen, null))));
  }

}

export default MediaPlayer;