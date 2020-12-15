import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { constituentClicked, setMode } from '../actions/modalUI';

class ModalUI extends Component {
  constructor(props) {
    super(props);
    this.state = {
      orientation: this.props.orientation ? this.props.orientation : "wide"
    };
  }

  componentDidMount() {
    // set the mode
    let mode; // if our configuration has specified a default, use that

    if (this.props.modes.hasOwnProperty("_default")) {
      mode = this.props.modes["_default"];
    } else {
      // otherwise use the first non-default
      mode = Object.keys(this.props.modes).filter(m => m !== "_default")[0];
    }

    mode = mode ? mode : "_NO_MODE_DEFINED";
    this.props.setMode(mode);
  }

  render() {
    if (this.props.modalUI.mode) {
      const mode = this.props.modalUI["mode"];
      console.log("Looking up ", mode, " in ", this.props.modes);
      console.log(this.props.modes[mode]);
      const constituents = this.props.modes[mode].map(c => {
        const classNameString = this.props.modalUI.constituents.has(c["id"]) ? "constituent active" : "constituent";
        return /*#__PURE__*/React.createElement("div", {
          className: classNameString,
          key: c["id"],
          id: c["id"],
          onClick: e => this.props.constituentClicked(e)
        }, c.hasOwnProperty("image") && /*#__PURE__*/React.createElement("img", {
          src: c["image"],
          alt: c["label"],
          title: c["label"]
        }), !c.hasOwnProperty("image") && /*#__PURE__*/React.createElement("div", {
          className: "label"
        }, c["label"]));
      });
      return /*#__PURE__*/React.createElement("div", {
        id: "modalPane",
        className: this.state.orientation
      }, constituents);
    } else {
      return /*#__PURE__*/React.createElement("div", null, "Loading...");
    }
  }

}

function mapStateToProps({
  modalUI
}) {
  return {
    modalUI
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    constituentClicked,
    setMode
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ModalUI);