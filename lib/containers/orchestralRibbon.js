import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchRibbonContent } from '../actions/index';
import InlineSVG from 'svg-inline-react';

class OrchestralRibbon extends Component {
  render() {
    if (Object.keys(this.props.score).length) {
      return /*#__PURE__*/React.createElement(InlineSVG, {
        className: "score",
        src: this.props.score["MEI"][this.props.uri]
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