import React, { Component } from 'react';
import { Map } from 'react-leaflet';
import IIIFTileLayer from 'react-leaflet-iiif';
import Leaflet from 'leaflet';
export default class IIIF extends Component {
  constructor(props) {
    super(props); // console.log("Hello, got props: ", this.props)

    const lat = "lat" in this.props ? this.props.lat : 0;
    const lng = "lng" in this.props ? this.props.lng : 0;
    const zoom = "zoom" in this.props ? this.props.zoom : 1;
    const className = "className" in this.props ? this.props.className : "map";
    const iiifTileLayer = "iiifTileLayer" in this.props ? this.props.iiifTileLayer : /*#__PURE__*/React.createElement(IIIFTileLayer, {
      url: this.props.url
    });
    const map = "map" in this.props ? this.props.map : /*#__PURE__*/React.createElement(Map, {
      className: className,
      center: [lat, lng],
      zoom: zoom,
      crs: Leaflet.CRS.Simple
    }, iiifTileLayer);
    this.state = {
      map
    };
  }

  render() {
    // console.log("STATE: ", this.state);
    return /*#__PURE__*/React.createElement("div", {
      className: "LeafletWrapper"
    }, /*#__PURE__*/React.createElement("link", {
      rel: "stylesheet",
      href: "../style/leaflet.css"
    }), /*#__PURE__*/React.createElement("link", {
      rel: "stylesheet",
      href: "../style/iiif.css"
    }), this.state.map);
  }

}