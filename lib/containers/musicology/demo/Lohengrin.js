import React, { Component } from 'react';
import App from '../app';
export default class ForbiddenQuestion extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("link", {
      rel: "stylesheet",
      href: "../../style/forbiddenQuestion.css",
      type: "text/css"
    }), /*#__PURE__*/React.createElement(App, {
      foo: "bar",
      graphUri: this.props.location.query.annotations
    }));
  }

}
;