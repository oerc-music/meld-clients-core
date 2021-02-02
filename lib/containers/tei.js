"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _prefixes = require("meld-clients-core/lib/library/prefixes");

var _reactDom = _interopRequireDefault(require("react-dom"));

var _reactRedux = require("react-redux");

var _redux = require("redux");

var _index = require("../actions/index");

var _meldActions = require("../actions/meldActions");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var TEI = /*#__PURE__*/function (_Component) {
  _inherits(TEI, _Component);

  var _super = _createSuper(TEI);

  function TEI(props) {
    var _this;

    _classCallCheck(this, TEI);

    _this = _super.call(this, props);
    _this.state = {
      tei: {},
      annotations: {},
      scrollTop: 0
    };
    return _this;
  }

  _createClass(TEI, [{
    key: "scrollToMotif",
    value: function scrollToMotif(motifNo) {
      // FIXME: This is specific to Forbidden Question app as it stands
      // and needs to be abstracted out
      // console.log("scrolling");
      var targetClass = "annotation__AskingForbidden_" + motifNo + "_1";

      var textBox = _reactDom["default"].findDOMNode(this);

      var targetElements = textBox.getElementsByClassName(targetClass);

      if (targetElements.length) {
        targetElements[0].scrollIntoView;
        textBox.scrollTop = targetElements[0].offsetTop - textBox.offsetTop + textBox.clientHeight / 2;
      }
    }
  }, {
    key: "scrollToURI",
    value: function scrollToURI() {
      if (this.props.scrollToURI && this.containerDiv) {
        var fragment = this.props.scrollToURI.substring(this.props.scrollToURI.indexOf('#') + 1);
        var el = this.containerDiv.getElementByID(fragment);

        if (el) {
          textBox.scrollTop = el.offsetTop - textBox.offsetTop + textBox.clientHeight / 2;
        }
      }
    }
  }, {
    key: "resize",
    value: function resize() {
      // Props attributes allow the parent app to specify the size and
      // that this container should resize.
      if (this.props.height && this.props.width && this.props.adjustToSize) {
        setCSSProp('.TEIContainer.commentary', {
          width: this.props.width + 'px',
          height: this.props.height + 'px'
        });
      }
    }
  }, {
    key: "render",
    value: function render() {
      this.resize();
      if (this.props.highlight) this.showHighlights(this.props.highlight);

      if (Object.keys(this.props.tei.TEI).length && this.props.uri in this.props.tei.TEI) {
        // HACK //
        if (this.props.uri.indexOf("commentaries") > -1) {
          if (this.props.onMotifChange && (!this.props.motif || !this.props.uri.endsWith(this.props.motif))) {
            return /*#__PURE__*/_react["default"].createElement("div", null);
          }

          return /*#__PURE__*/_react["default"].createElement("div", {
            dangerouslySetInnerHTML: this.returnHTMLizedTEI(),
            className: "TEIContainer commentary",
            id: this.props.uri.substr(this.props.uri.indexOf("commentaries/") + 13)
          });
        } else {
          return /*#__PURE__*/_react["default"].createElement("div", {
            dangerouslySetInnerHTML: this.returnHTMLizedTEI(),
            className: "TEIContainer other",
            onScroll: this.props.scrollFun
          });
        } // END HACK //

      }

      return /*#__PURE__*/_react["default"].createElement("div", null, " Loading TEI... ");
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      this.props.fetchTEI(this.props.uri);
    }
  }, {
    key: "returnHTMLizedTEI",
    value: function returnHTMLizedTEI() {
      var TEIhtml = this.props.tei.TEI[this.props.uri].innerHTML;

      if (this.props.title) {
        TEIhtml = TEIhtml.replace(/<tei-title data-teiname="title">.*tei-title>/gi, '<tei-title data-teiname="title">' + this.props.title + '</tei-title>');
      }

      return {
        __html: TEIhtml
      };
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate() {
      var _this2 = this;

      if (!Object.keys(this.props.tei.TEI).length || !(this.props.uri in this.props.tei.TEI)) return;

      if (this.props.motif && this.props.uri.indexOf("commentaries") === -1) {
        this.scrollToMotif(this.props.motif);
      } else if (this.props.scrollToURI) {
        this.scrollToURI();
      }
      /*
        var mc = this.props.onMotifChange;
        ReactDOM.findDOMNode(this).onclick = function (e) {
          var target = e.target;
      	console.log(e, target);	
          if (target && target.className.match(/F[0-9]+/).length) {
            mc(target.className.match(/F[0-9]+/)[0]);
          }
      	};*/


      if (!this.props.annotations || !this.props.showAnnotations) return false;
      this.props.annotations.map(function (annotation) {
        var annotationTarget = annotation[_prefixes.prefix.oa + "hasTarget"];
        if (!Array.isArray(annotationTarget)) annotationTarget = [annotationTarget]; // each annotation...

        var frags = annotationTarget.map(function (annotationTarget) {
          // each annotation target
          if (annotationTarget["@id"].startsWith(_this2.props.uri) && annotationTarget["@id"].indexOf("#") > -1 || annotationTarget["@id"][0] == "#") {
            //

            /* if(annotationTarget["@id"] in this.props.tei.componentTargets) {
                 // if this is my target, grab any of MY fragment IDs
                 const myFrags = this.props.tei.componentTargets[annotationTarget["@id"]]
            			.filter((frag) => {
            				return frag.substr(0, frag.indexOf("#")) === this.props.uri;
            			});
            */
            var myFrags = [annotationTarget];

            if (myFrags.length) {
              // and apply any annotations
              _this2.handleMELDActions(annotation, myFrags);
            }
          }
        });
      });
    }
  }, {
    key: "cancelHighlights",
    value: function cancelHighlights() {
      var rules = document.styleSheets[0].cssRules || document.styleSheets[0].rules;
      var i = 0;

      for (var i = rules.length - 1; i >= 0; i--) {
        if (rules[i].selectorText && rules[i].selectorText.indexOf('temporary') > -1) {
          document.styleSheets[0].deleteRule(i);
        }
      }
    }
  }, {
    key: "addHighlight",
    value: function addHighlight(highlight) {
      // FIXME: Why do this explicitly here rather than in stylesheet?
      var highlightfrag = highlight.substring(highlight.indexOf('#'));
      var style = this.props.highlightStyle ? this.props.highlightStyle : {
        fill: "blue",
        stroke: "blue !important",
        color: "blue"
      };
      setCSSProp('.temporary, ' + highlightfrag, style);
    }
  }, {
    key: "showHighlights",
    value: function showHighlights(highlight) {
      // Given a set of highlights URIs (with applicable fragments),
      // apply highlight formatting
      this.cancelHighlights();

      for (var i = 0; i < highlight.length; i++) {
        this.addHighlight(highlight[i]);
      }
    }
  }, {
    key: "definitionFun",
    value: function definitionFun(definition) {
      var fun = this.props.currentDefinition;
      return function () {
        fun(definition);
      };
    }
  }, {
    key: "updateViewerFun",
    value: function updateViewerFun(show, highlight) {
      var fun = this.props.updateViewer.bind(this);
      return function () {
        fun(show, highlight);
      };
    }
  }, {
    key: "handleMELDActions",
    value: function handleMELDActions(annotation, fragments) {
      var _this3 = this;

      if (_prefixes.prefix.oa + "motivatedBy" in annotation) {
        switch (idOrFirstId(annotation[_prefixes.prefix.oa + "motivatedBy"])) {
          case _prefixes.prefix.meldterm + "updateViewerState":
            var show = [];
            var highlight = [];

            for (var i = 0; i < annotation[_prefixes.prefix.oa + "hasBody"].length; i++) {
              var thing = annotation[_prefixes.prefix.oa + "hasBody"][i];
              if (thing["@id"]) show.push(thing["@id"]);
              if (thing[_prefixes.prefix.meldterm + "highlight"]) highlight = highlight.concat(thing[_prefixes.prefix.meldterm + "highlight"]);
            }

            for (var i = 0; i < fragments.length; i++) {
              var fragFullString = fragments[i]['@id'];
              var fragString = fragFullString.substring(fragFullString.indexOf("#") + 1);
              var el = document.getElementById(fragString);

              if (el) {
                el.onclick = this.updateViewerFun(show, highlight);
              }
            }

            break;

          case _prefixes.prefix.meldterm + "definition":
            var definition = {
              definition: objOrFirstObj(annotation[_prefixes.prefix.oa + "hasBody"])[_prefixes.prefix.meldterm + "hasDefinition"]
            };

            for (var i = 0; i < fragments.length; i++) {
              var fragString = fragments[i]['@id'];
              var terms = document.getElementsByTagName("tei-term");

              for (var j = 0; j < terms.length; j++) {
                if (terms[j].getAttribute("ref") === fragString) {
                  var el = terms[j];
                  definition.head = el.innerHTML;

                  if (el) {
                    var defFun = this.definitionFun(definition);
                    el.onmouseenter = defFun;
                    el.onmouseleave = this.props.clearDefinition;
                    el.ontouchstart = defFun;
                    el.ontouchend = this.props.clearDefinition;
                  }
                }
              }
            }

            break;

          case _prefixes.prefix.meldterm + "personInfo":
            var definition = {
              definition: annotation[_prefixes.prefix.oa + "hasBody"][0].definition,
              head: annotation[_prefixes.prefix.oa + "hasBody"][0].head
            };

            for (var i = 0; i < fragments.length; i++) {
              var fragString = fragments[i]['@id'];
              var terms = document.getElementsByTagName("tei-persName");

              for (var j = 0; j < terms.length; j++) {
                if (terms[j].getAttribute("ref") === fragString) {
                  var el = terms[j];

                  if (el) {
                    var defFun = this.definitionFun(definition);
                    el.onmouseenter = defFun;
                    el.onmouseleave = this.props.clearDefinition;
                    el.ontouchstart = defFun;
                    el.ontouchend = this.props.clearDefinition;
                  }
                }
              }
            }

            break;
        }
      } else if ("oa:hasBody" in annotation) {
        annotation["oa:hasBody"].map(function (b) {
          // TODO convert to switch statement
          if (b["@id"] === _meldActions.MARKUP_EMPHASIS) {
            _this3.props.handleEmphasis(_reactDom["default"].findDOMNode(_this3), annotation, _this3.props.uri, fragments);
          } else if (b["@id"] === _meldActions.MARKUP_HIGHLIGHT) {
            _this3.props.handleHighlight(_reactDom["default"].findDOMNode(_this3), annotation, _this3.props.uri, fragments);
          } else if (b["@id"] === _meldActions.MARKUP_HIGHLIGHT2) {
            _this3.props.handleHighlight2(_reactDom["default"].findDOMNode(_this3), annotation, _this3.props.uri, fragments);
          } else if (b["@id"] === _meldActions.CUE_IMAGE) {
            _this3.props.handleCueImage(_reactDom["default"].findDOMNode(_this3), annotation, _this3.props.uri, fragments, _this3.props.tei.fragImages);
          } else {
            console.log("TEI component unable to handle meld action: ", b);
          }
        });
      } else {
        console.log("Skipping annotation without body: ", annotation);
      }
    }
  }]);

  return TEI;
}(_react.Component);

function setCSSProp(selector, obj) {
  // General purpose CSS rule setting function. Tries to be tidy and
  // update existing rules rather than spamming new ones
  if (!document.stylesheets || !document.stylesheets.length) {
    // FIXME: why not set something here?
    console.log('No stylesheets – not setting style');
    return;
  }

  var rules = document.styleSheets[0].cssRules || document.styleSheets[0].rules;

  if (!rules) {
    return;
  }

  ;
  var i = 0;

  while (i < rules.length && (!rules[i].selectorText || rules[i].selectorText.indexOf(selector) === -1)) {
    i++;
  }

  if (i == rules.length) {
    //insert rules
    document.styleSheets[0].insertRule(selector + " {display: visible}");
    var i = 0;

    while (i < rules.length && (!rules[i].selectorText || rules[i].selectorText.indexOf(selector) === -1)) {
      i++;
    }
  }

  var declaration = rules[i].style;
  var newRules = Object.keys(obj);

  for (var j = 0; j < newRules.length; j++) {
    declaration.setProperty(newRules[j], obj[newRules[j]]);
  }
}

function mapStateToProps(_ref) {
  var tei = _ref.tei;
  return {
    tei: tei
  };
}

function mapDispatchToProps(dispatch) {
  return (0, _redux.bindActionCreators)({
    fetchTEI: _index.fetchTEI,
    handleEmphasis: _meldActions.handleEmphasis,
    handleCueImage: _meldActions.handleCueImage,
    handleHighlight: _meldActions.handleHighlight,
    handleHighlight2: _meldActions.handleHighlight2
  }, dispatch);
}

var _default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(TEI);

exports["default"] = _default;

if (!String.prototype.endsWith) {
  String.prototype.endsWith = function (searchString, position) {
    var subjectString = this.toString();

    if (typeof position !== 'number' || !isFinite(position) || Math.floor(position) !== position || position > subjectString.length) {
      position = subjectString.length;
    }

    position -= searchString.length;
    var lastIndex = subjectString.lastIndexOf(searchString, position);
    return lastIndex !== -1 && lastIndex === position;
  };
}

function idOrFirstId(jld) {
  return Array.isArray(jld) ? jld[0]['@id'] : jld['@id'];
}

function objOrFirstObj(jld) {
  return Array.isArray(jld) ? jld[0] : jld;
}