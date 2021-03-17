import React, { Component } from 'react';
export default class MyImage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      positions: {}
    };
    this.handleClick = this.handleClick.bind(this);
  }

  resize() {
    var rules = document.styleSheets[0].cssRules || document.stylesheets[0].rules;
    var i = 0;

    while (!rules[i].selectorText || rules[i].selectorText.indexOf("img") === -1) {
      i++;
    }

    if (i == rules.length) {
      document.styleSheets[0].insertRule('.wrapper img {width:' + this.props.width + "px, height: " + this.props.height + "}");
    } else {
      var declaration = rules[i].style;
      declaration.setProperty('max-height', this.props.height + "px");
      declaration.setProperty('max-width', this.props.width + "px");
    }
  }

  render() {
    if (this.props.height) {
      this.resize();
    }

    return /*#__PURE__*/React.createElement("img", {
      src: this.props.uri,
      onClick: this.handleClick
    });
  }

  handleClick() {
    if (this.props.uri.indexOf("_thumb") > -1) {
      let fullFatImage = this.props.uri;
      fullFatImage = fullFatImage.replace("_thumb", "");
      console.log("Thumb:", this.props.uri, "Full fat: ", fullFatImage);
      window.open(fullFatImage);
    }
  }

}