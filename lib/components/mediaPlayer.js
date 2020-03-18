import React, { Component } from 'react';
import { Media, Player, controls } from 'react-media-player';
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
    return React.createElement(Media, null, React.createElement("div", {
      className: "media"
    }, React.createElement("div", {
      className: "media-player"
    }, React.createElement(Player, {
      src: this.props.uri
    })), React.createElement("div", {
      className: "media-controls"
    }, React.createElement(PlayPause, null), React.createElement(CurrentTime, null), React.createElement(SeekBar, null), React.createElement(Duration, null), React.createElement(MuteUnmute, null), React.createElement(Volume, null), React.createElement(Fullscreen, null))));
  }

}

export default MediaPlayer;