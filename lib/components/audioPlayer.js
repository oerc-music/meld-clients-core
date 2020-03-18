import React, { Component } from 'react';
export default class AudioPlayer extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return React.createElement("audio", {
      controls: true,
      "data-uri": this.props.uri
    }, React.createElement("source", {
      src: this.props.uri,
      type: "audio/mp3"
    }));
  }

}