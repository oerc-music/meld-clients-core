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

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

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

      if (!this.props.annotations || !this.props.showAnnotations) return false; // Depending on the type of annotation, this document may concern
      // the target or body of annotations. Check for both (FIXME: but
      // treat these differently?)

      this.props.annotations.map(function (annotation) {
        var annotationTargets = annotation[_prefixes.prefix.oa + "hasTarget"];
        if (!Array.isArray(annotationTargets)) annotationTargets = [annotationTargets]; // each annotation...

        var frags = annotationTargets.map(function (annotationTarget) {
          // each annotation target
          if (annotationTarget["@id"].startsWith(_this2.props.uri) && annotationTarget["@id"].indexOf("#") > -1 || annotationTarget["@id"][0] == "#") {
            //
            var _myFrags = [annotationTarget];

            if (_myFrags.length) {
              // and apply any annotations
              _this2.handleMELDActions(annotation, _myFrags);
            }
          }
        });
        var annotationBodies = annotation[_prefixes.prefix.oa + "hasBody"];
        if (!Array.isArray(annotationBodies)) annotationBodies = [annotationBodies]; // each annotation...

        frags = annotationBodies.map(function (annotationBody) {
          // each annotation target
          if (annotationBody["@id"].startsWith(_this2.props.uri) && annotationBody["@id"].indexOf("#") > -1 || annotationBody["@id"][0] == "#") {
            var _myFrags2 = [annotationBody];

            if (_myFrags2.length) {
              // and apply any annotations
              _this2.handleMELDActions(annotation, _myFrags2);
            }
          }
        });

        if (_prefixes.prefix.oa + "motivatedBy" in annotation && annotation[_prefixes.prefix.oa + "motivatedBy"]["@id"] === _prefixes.prefix.meldterm + "personInfo") {
          var myFrags = Array.isArray(annotation[_prefixes.prefix.oa + "hasTarget"]) ? annotation[_prefixes.prefix.oa + "hasTarget"] : [annotation[_prefixes.prefix.oa + "hasTarget"]];

          _this2.handleMELDActions(annotation, myFrags);
        }
      });
      this.findOtherRefs();
    }
  }, {
    key: "findOtherRefs",
    value: function findOtherRefs() {
      /// Needed by Listening Through Time. Needs more
      // generalisation. (that means it should not be considered
      // particularly stable code)
      // For some cross references, it makes more sense to discover the
      // references themselves. Here, we find TEI refs and see if we
      // know about the thing they refer to.
      if (!("performances" in this.props)) return;
      var refs = document.querySelectorAll('.TEIContainer *[ref]');

      for (var i = 0; i < refs.length; i++) {
        var refURI = refs[i].getAttributeNS(null, 'ref');
        var perf = this.props.performances.find(function (x) {
          return x[_prefixes.prefix.frbr + 'partOf']['@id'] == refURI;
        });

        if (perf) {
          if (this.props.current.performance == perf) {
            refs[i].classList.add('current');
          }

          var defPerf = this.props.setPerformance.bind(null, perf);
          var undefPerf = this.props.clearPerformance;
          refs[i].onmouseenter = defPerf;
          refs[i].ontouchstart = defPerf;
          refs[i].onmouseleave = undefPerf;
          refs[i].ontouchend = undefPerf;
        }
      }
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
            // Some ontology disagreements between apps
            var annBody = objOrFirstObj(annotation[_prefixes.prefix.oa + "hasBody"]);

            if (annBody.definition) {
              // deprecated version
              var definition = {
                definition: annotation[_prefixes.prefix.oa + "hasBody"][0].definition,
                head: annotation[_prefixes.prefix.oa + "hasBody"][0].head
              };
            } else {
              var definition = {
                definition: annBody[_prefixes.prefix.meldterm + "definition"] ? annBody[_prefixes.prefix.meldterm + "definition"] : annBody[_prefixes.prefix.meldterm + "hasDefinition"],
                head: annBody[_prefixes.prefix.meldterm + "head"] ? annBody[_prefixes.prefix.meldterm + "head"] : annBody[_prefixes.prefix.meldterm + "hasHead"],
                role: annBody[_prefixes.prefix.meldterm + "role"],
                classref: annBody[_prefixes.prefix.meldterm + "classref"]
              };
            }

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
        // Old code: deprecated and likely to be removed. Incompatible
        // with new traversal mechanisms.
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb250YWluZXJzL3RlaS5qcyJdLCJuYW1lcyI6WyJURUkiLCJwcm9wcyIsInN0YXRlIiwidGVpIiwiYW5ub3RhdGlvbnMiLCJzY3JvbGxUb3AiLCJtb3RpZk5vIiwidGFyZ2V0Q2xhc3MiLCJ0ZXh0Qm94IiwiUmVhY3RET00iLCJmaW5kRE9NTm9kZSIsInRhcmdldEVsZW1lbnRzIiwiZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSIsImxlbmd0aCIsInNjcm9sbEludG9WaWV3Iiwib2Zmc2V0VG9wIiwiY2xpZW50SGVpZ2h0Iiwic2Nyb2xsVG9VUkkiLCJjb250YWluZXJEaXYiLCJmcmFnbWVudCIsInN1YnN0cmluZyIsImluZGV4T2YiLCJlbCIsImdldEVsZW1lbnRCeUlEIiwiaGVpZ2h0Iiwid2lkdGgiLCJhZGp1c3RUb1NpemUiLCJzZXRDU1NQcm9wIiwicmVzaXplIiwiaGlnaGxpZ2h0Iiwic2hvd0hpZ2hsaWdodHMiLCJPYmplY3QiLCJrZXlzIiwidXJpIiwib25Nb3RpZkNoYW5nZSIsIm1vdGlmIiwiZW5kc1dpdGgiLCJyZXR1cm5IVE1MaXplZFRFSSIsInN1YnN0ciIsInNjcm9sbEZ1biIsImZldGNoVEVJIiwiVEVJaHRtbCIsImlubmVySFRNTCIsInRpdGxlIiwicmVwbGFjZSIsIl9faHRtbCIsInNjcm9sbFRvTW90aWYiLCJzaG93QW5ub3RhdGlvbnMiLCJtYXAiLCJhbm5vdGF0aW9uIiwiYW5ub3RhdGlvblRhcmdldHMiLCJwcmVmIiwib2EiLCJBcnJheSIsImlzQXJyYXkiLCJmcmFncyIsImFubm90YXRpb25UYXJnZXQiLCJzdGFydHNXaXRoIiwibXlGcmFncyIsImhhbmRsZU1FTERBY3Rpb25zIiwiYW5ub3RhdGlvbkJvZGllcyIsImFubm90YXRpb25Cb2R5IiwibWVsZHRlcm0iLCJmaW5kT3RoZXJSZWZzIiwicmVmcyIsImRvY3VtZW50IiwicXVlcnlTZWxlY3RvckFsbCIsImkiLCJyZWZVUkkiLCJnZXRBdHRyaWJ1dGVOUyIsInBlcmYiLCJwZXJmb3JtYW5jZXMiLCJmaW5kIiwieCIsImZyYnIiLCJjdXJyZW50IiwicGVyZm9ybWFuY2UiLCJjbGFzc0xpc3QiLCJhZGQiLCJkZWZQZXJmIiwic2V0UGVyZm9ybWFuY2UiLCJiaW5kIiwidW5kZWZQZXJmIiwiY2xlYXJQZXJmb3JtYW5jZSIsIm9ubW91c2VlbnRlciIsIm9udG91Y2hzdGFydCIsIm9ubW91c2VsZWF2ZSIsIm9udG91Y2hlbmQiLCJydWxlcyIsInN0eWxlU2hlZXRzIiwiY3NzUnVsZXMiLCJzZWxlY3RvclRleHQiLCJkZWxldGVSdWxlIiwiaGlnaGxpZ2h0ZnJhZyIsInN0eWxlIiwiaGlnaGxpZ2h0U3R5bGUiLCJmaWxsIiwic3Ryb2tlIiwiY29sb3IiLCJjYW5jZWxIaWdobGlnaHRzIiwiYWRkSGlnaGxpZ2h0IiwiZGVmaW5pdGlvbiIsImZ1biIsImN1cnJlbnREZWZpbml0aW9uIiwic2hvdyIsInVwZGF0ZVZpZXdlciIsImZyYWdtZW50cyIsImlkT3JGaXJzdElkIiwidGhpbmciLCJwdXNoIiwiY29uY2F0IiwiZnJhZ0Z1bGxTdHJpbmciLCJmcmFnU3RyaW5nIiwiZ2V0RWxlbWVudEJ5SWQiLCJvbmNsaWNrIiwidXBkYXRlVmlld2VyRnVuIiwib2JqT3JGaXJzdE9iaiIsInRlcm1zIiwiZ2V0RWxlbWVudHNCeVRhZ05hbWUiLCJqIiwiZ2V0QXR0cmlidXRlIiwiaGVhZCIsImRlZkZ1biIsImRlZmluaXRpb25GdW4iLCJjbGVhckRlZmluaXRpb24iLCJhbm5Cb2R5Iiwicm9sZSIsImNsYXNzcmVmIiwiYiIsIk1BUktVUF9FTVBIQVNJUyIsImhhbmRsZUVtcGhhc2lzIiwiTUFSS1VQX0hJR0hMSUdIVCIsImhhbmRsZUhpZ2hsaWdodCIsIk1BUktVUF9ISUdITElHSFQyIiwiaGFuZGxlSGlnaGxpZ2h0MiIsIkNVRV9JTUFHRSIsImhhbmRsZUN1ZUltYWdlIiwiZnJhZ0ltYWdlcyIsImNvbnNvbGUiLCJsb2ciLCJDb21wb25lbnQiLCJzZWxlY3RvciIsIm9iaiIsInN0eWxlc2hlZXRzIiwiaW5zZXJ0UnVsZSIsImRlY2xhcmF0aW9uIiwibmV3UnVsZXMiLCJzZXRQcm9wZXJ0eSIsIm1hcFN0YXRlVG9Qcm9wcyIsIm1hcERpc3BhdGNoVG9Qcm9wcyIsImRpc3BhdGNoIiwiU3RyaW5nIiwicHJvdG90eXBlIiwic2VhcmNoU3RyaW5nIiwicG9zaXRpb24iLCJzdWJqZWN0U3RyaW5nIiwidG9TdHJpbmciLCJpc0Zpbml0ZSIsIk1hdGgiLCJmbG9vciIsImxhc3RJbmRleCIsImxhc3RJbmRleE9mIiwiamxkIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQVdNQSxHOzs7OztBQUNKLGVBQVlDLEtBQVosRUFBbUI7QUFBQTs7QUFBQTs7QUFDakIsOEJBQU1BLEtBQU47QUFFQSxVQUFLQyxLQUFMLEdBQWE7QUFDWEMsTUFBQUEsR0FBRyxFQUFFLEVBRE07QUFFWEMsTUFBQUEsV0FBVyxFQUFFLEVBRkY7QUFHWEMsTUFBQUEsU0FBUyxFQUFFO0FBSEEsS0FBYjtBQUhpQjtBQVFsQjs7OztXQUVELHVCQUFjQyxPQUFkLEVBQXVCO0FBQ3ZCO0FBQ0U7QUFDRjtBQUNFLFVBQUlDLFdBQVcsR0FBRyxpQ0FBaUNELE9BQWpDLEdBQTJDLElBQTdEOztBQUNBLFVBQUlFLE9BQU8sR0FBR0MscUJBQVNDLFdBQVQsQ0FBcUIsSUFBckIsQ0FBZDs7QUFDQSxVQUFJQyxjQUFjLEdBQUdILE9BQU8sQ0FBQ0ksc0JBQVIsQ0FBK0JMLFdBQS9CLENBQXJCOztBQUNBLFVBQUlJLGNBQWMsQ0FBQ0UsTUFBbkIsRUFBMkI7QUFDekJGLFFBQUFBLGNBQWMsQ0FBQyxDQUFELENBQWQsQ0FBa0JHLGNBQWxCO0FBQ0FOLFFBQUFBLE9BQU8sQ0FBQ0gsU0FBUixHQUFvQk0sY0FBYyxDQUFDLENBQUQsQ0FBZCxDQUFrQkksU0FBbEIsR0FBOEJQLE9BQU8sQ0FBQ08sU0FBdEMsR0FBbURQLE9B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LFFBQUksT0FBT0YsUUFBUCxLQUFvQixRQUFwQixJQUFnQyxDQUFDRyxRQUFRLENBQUNILFFBQUQsQ0FBekMsSUFBdURJLElBQUksQ0FBQ0MsS0FBTCxDQUFXTCxRQUFYLE1BQXlCQSxRQUFoRixJQUE0RkEsUUFBUSxHQUFHQyxhQUFhLENBQUM5SSxNQUF6SCxFQUFpSTtBQUMvSDZJLE1BQUFBLFFBQVEsR0FBR0MsYUFBYSxDQUFDOUksTUFBekI7QUFDRDs7QUFDRDZJLElBQUFBLFFBQVEsSUFBSUQsWUFBWSxDQUFDNUksTUFBekI7QUFDQSxRQUFJbUosU0FBUyxHQUFHTCxhQUFhLENBQUNNLFdBQWQsQ0FBMEJSLFlBQTFCLEVBQXdDQyxRQUF4QyxDQUFoQjtBQUNBLFdBQU9NLFNBQVMsS0FBSyxDQUFDLENBQWYsSUFBb0JBLFNBQVMsS0FBS04sUUFBekM7QUFDRCxHQVJEO0FBU0Q7O0FBQ0QsU0FBUy9DLFdBQVQsQ0FBcUJ1RCxHQUFyQixFQUF5QjtBQUN4QixTQUFPN0csS0FBSyxDQUFDQyxPQUFOLENBQWM0RyxHQUFkLElBQXFCQSxHQUFHLENBQUMsQ0FBRCxDQUFILENBQU8sS0FBUCxDQUFyQixHQUFxQ0EsR0FBRyxDQUFDLEtBQUQsQ0FBL0M7QUFDQTs7QUFDRCxTQUFTOUMsYUFBVCxDQUF1QjhDLEdBQXZCLEVBQTJCO0FBQzFCLFNBQU83RyxLQUFLLENBQUNDLE9BQU4sQ0FBYzRHLEdBQWQsSUFBcUJBLEdBQUcsQ0FBQyxDQUFELENBQXhCLEdBQThCQSxHQUFyQztBQUNBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7Q29tcG9uZW50fSBmcm9tICdyZWFjdCc7XG5pbXBvcnQge3ByZWZpeCBhcyBwcmVmfSBmcm9tICdtZWxkLWNsaWVudHMtY29yZS9saWIvbGlicmFyeS9wcmVmaXhlcyc7XG5pbXBvcnQgUmVhY3RET00gZnJvbSAncmVhY3QtZG9tJztcbmltcG9ydCB7Y29ubmVjdH0gZnJvbSAncmVhY3QtcmVkdXgnO1xuaW1wb3J0IHtiaW5kQWN0aW9uQ3JlYXRvcnN9IGZyb20gJ3JlZHV4JztcbmltcG9ydCB7ZmV0Y2hURUl9IGZyb20gJy4uL2FjdGlvbnMvaW5kZXgnO1xuaW1wb3J0IHtcbiAgQ1VFX0lNQUdFLFxuICBoYW5kbGVDdWVJbWFnZSxcbiAgaGFuZGxlRW1waGFzaXMsXG4gIGhhbmRsZUhpZ2hsaWdodCxcbiAgaGFuZGxlSGlnaGxpZ2h0MixcbiAgTUFSS1VQX0VNUEhBU0lTLFxuICBNQVJLVVBfSElHSExJR0hULFxuICBNQVJLVVBfSElHSExJR0hUMlxufSBmcm9tICcuLi9hY3Rpb25zL21lbGRBY3Rpb25zJztcblxuY2xhc3MgVEVJIGV4dGVuZHMgQ29tcG9uZW50IHtcbiAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICBzdXBlcihwcm9wcyk7XG5cbiAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgdGVpOiB7fSxcbiAgICAgIGFubm90YXRpb25zOiB7fSxcbiAgICAgIHNjcm9sbFRvcDogMFxuICAgIH07XG4gIH1cblxuICBzY3JvbGxUb01vdGlmKG1vdGlmTm8pIHtcblx0XHQvLyBGSVhNRTogVGhpcyBpcyBzcGVjaWZpYyB0byBGb3JiaWRkZW4gUXVlc3Rpb24gYXBwIGFzIGl0IHN0YW5kc1xuICAgIC8vIGFuZCBuZWVkcyB0byBiZSBhYnN0cmFjdGVkIG91dFxuXHRcdC8vIGNvbnNvbGUubG9nKFwic2Nyb2xsaW5nXCIpO1xuICAgIHZhciB0YXJnZXRDbGFzcyA9IFwiYW5ub3RhdGlvbl9fQXNraW5nRm9yYmlkZGVuX1wiICsgbW90aWZObyArIFwiXzFcIjtcbiAgICB2YXIgdGV4dEJveCA9IFJlYWN0RE9NLmZpbmRET01Ob2RlKHRoaXMpO1xuICAgIHZhciB0YXJnZXRFbGVtZW50cyA9IHRleHRCb3guZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSh0YXJnZXRDbGFzcyk7XG4gICAgaWYgKHRhcmdldEVsZW1lbnRzLmxlbmd0aCkge1xuICAgICAgdGFyZ2V0RWxlbWVudHNbMF0uc2Nyb2xsSW50b1ZpZXc7XG4gICAgICB0ZXh0Qm94LnNjcm9sbFRvcCA9IHRhcmdldEVsZW1lbnRzWzBdLm9mZnNldFRvcCAtIHRleHRCb3gub2Zmc2V0VG9wICsgKHRleHRCb3guY2xpZW50SGVpZ2h0IC8gMik7XG4gICAgfVxuICB9XG5cdHNjcm9sbFRvVVJJKCl7XG5cdFx0aWYodGhpcy5wcm9wcy5zY3JvbGxUb1VSSSAmJiB0aGlzLmNvbnRhaW5lckRpdil7XG5cdFx0XHR2YXIgZnJhZ21lbnQgPSB0aGlzLnByb3BzLnNjcm9sbFRvVVJJLnN1YnN0cmluZyh0aGlzLnByb3BzLnNjcm9sbFRvVVJJLmluZGV4T2YoJyMnKSsxKTtcblx0XHRcdHZhciBlbCA9IHRoaXMuY29udGFpbmVyRGl2LmdldEVsZW1lbnRCeUlEKGZyYWdtZW50KTtcblx0XHRcdGlmKGVsKXtcblx0XHRcdFx0dGV4dEJveC5zY3JvbGxUb3AgPSBlbC5vZmZzZXRUb3AgLSB0ZXh0Qm94Lm9mZnNldFRvcCArICh0ZXh0Qm94LmNsaWVudEhlaWdodCAvIDIpO1xuXHRcdFx0fVxuXHRcdH1cblx0fVxuXHRyZXNpemUoKXtcblx0XHQvLyBQcm9wcyBhdHRyaWJ1dGVzIGFsbG93IHRoZSBwYXJlbnQgYXBwIHRvIHNwZWNpZnkgdGhlIHNpemUgYW5kXG5cdFx0Ly8gdGhhdCB0aGlzIGNvbnRhaW5lciBzaG91bGQgcmVzaXplLlxuXHRcdGlmKHRoaXMucHJvcHMuaGVpZ2h0ICYmIHRoaXMucHJvcHMud2lkdGggJiYgdGhpcy5wcm9wcy5hZGp1c3RUb1NpemUpe1xuXHRcdFx0c2V0Q1NTUHJvcCgnLlRFSUNvbnRhaW5lci5jb21tZW50YXJ5Jywge3dpZHRoOiB0aGlzLnByb3BzLndpZHRoKydweCcsIGhlaWdodDogdGhpcy5wcm9wcy5oZWlnaHQrJ3B4J30pO1xuXHRcdH1cblx0fVxuICByZW5kZXIoKSB7XG5cdFx0dGhpcy5yZXNpemUoKTtcblx0XHRpZih0aGlzLnByb3BzLmhpZ2hsaWdodCkgdGhpcy5zaG93SGlnaGxpZ2h0cyh0aGlzLnByb3BzLmhpZ2hsaWdodCkgXG4gICAgaWYgKE9iamVjdC5rZXlzKHRoaXMucHJvcHMudGVpLlRFSSkubGVuZ3RoICYmIHRoaXMucHJvcHMudXJpIGluIHRoaXMucHJvcHMudGVpLlRFSSkge1xuICAgICAgLy8gSEFDSyAvL1xuICAgICAgaWYgKHRoaXMucHJvcHMudXJpLmluZGV4T2YoXCJjb21tZW50YXJpZXNcIikgPiAtMSkge1xuICAgICAgICBpZiAodGhpcy5wcm9wcy5vbk1vdGlmQ2hhbmdlICYmICghdGhpcy5wcm9wcy5tb3RpZiB8fCAhdGhpcy5wcm9wcy51cmkuZW5kc1dpdGgodGhpcy5wcm9wcy5tb3RpZikpKSB7XG4gICAgICAgICAgcmV0dXJuIDxkaXYvPjtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gPGRpdiBkYW5nZXJvdXNseVNldElubmVySFRNTD17dGhpcy5yZXR1cm5IVE1MaXplZFRFSSgpfSBjbGFzc05hbWU9XCJURUlDb250YWluZXIgY29tbWVudGFyeVwiXG4gICAgICAgICAgICAgICAgICAgIGlkPXt0aGlzLnByb3BzLnVyaS5zdWJzdHIodGhpcy5wcm9wcy51cmkuaW5kZXhPZihcImNvbW1lbnRhcmllcy9cIikgKyAxMyl9Lz47XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gKCA8ZGl2IGRhbmdlcm91c2x5U2V0SW5uZXJIVE1MPXt0aGlzLnJldHVybkhUTUxpemVkVEVJKCl9IGNsYXNzTmFtZT1cIlRFSUNvbnRhaW5lciBvdGhlclwiXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0b25TY3JvbGw9e3RoaXMucHJvcHMuc2Nyb2xsRnVufS8+ICk7XG4gICAgICB9XG4gICAgICAvLyBFTkQgSEFDSyAvL1xuICAgIH1cbiAgICByZXR1cm4gPGRpdj4gTG9hZGluZyBURUkuLi4gPC9kaXY+O1xuICB9XG5cbiAgY29tcG9uZW50RGlkTW91bnQoKSB7XG4gICAgdGhpcy5wcm9wcy5mZXRjaFRFSSh0aGlzLnByb3BzLnVyaSk7XG4gIH1cblxuICByZXR1cm5IVE1MaXplZFRFSSgpIHtcblx0XHR2YXIgVEVJaHRtbCA9IHRoaXMucHJvcHMudGVpLlRFSVt0aGlzLnByb3BzLnVyaV0uaW5uZXJIVE1MO1xuXHRcdGlmKHRoaXMucHJvcHMudGl0bGUpIHtcblx0XHRcdFRFSWh0bWwgPSBURUlodG1sLnJlcGxhY2UoLzx0ZWktdGl0bGUgZGF0YS10ZWluYW1lPVwidGl0bGVcIj4uKnRlaS10aXRsZT4vZ2ksXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdCc8dGVpLXRpdGxlIGRhdGEtdGVpbmFtZT1cInRpdGxlXCI+Jyt0aGlzLnByb3BzLnRpdGxlKyc8L3RlaS10aXRsZT4nKTtcblx0XHR9XG4gICAgcmV0dXJuIHtfX2h0bWw6IFRFSWh0bWx9O1xuICB9XG5cbiAgY29tcG9uZW50RGlkVXBkYXRlKCkge1xuXHRcdGlmKCFPYmplY3Qua2V5cyh0aGlzLnByb3BzLnRlaS5URUkpLmxlbmd0aCB8fCAhKHRoaXMucHJvcHMudXJpIGluIHRoaXMucHJvcHMudGVpLlRFSSkpIHJldHVybjtcbiAgICBpZiAodGhpcy5wcm9wcy5tb3RpZiAmJiB0aGlzLnByb3BzLnVyaS5pbmRleE9mKFwiY29tbWVudGFyaWVzXCIpID09PSAtMSkge1xuICAgICAgdGhpcy5zY3JvbGxUb01vdGlmKHRoaXMucHJvcHMubW90aWYpO1xuICAgIH0gZWxzZSBpZih0aGlzLnByb3BzLnNjcm9sbFRvVVJJKXtcblx0XHRcdHRoaXMuc2Nyb2xsVG9VUkkoKTtcblx0XHR9XG5cdFx0aWYoIXRoaXMucHJvcHMuYW5ub3RhdGlvbnMgfHwgIXRoaXMucHJvcHMuc2hvd0Fubm90YXRpb25zKSByZXR1cm4gZmFsc2U7XG5cdFx0Ly8gRGVwZW5kaW5nIG9uIHRoZSB0eXBlIG9mIGFubm90YXRpb24sIHRoaXMgZG9jdW1lbnQgbWF5IGNvbmNlcm5cblx0XHQvLyB0aGUgdGFyZ2V0IG9yIGJvZHkgb2YgYW5ub3RhdGlvbnMuIENoZWNrIGZvciBib3RoIChGSVhNRTogYnV0XG5cdFx0Ly8gdHJlYXQgdGhlc2UgZGlmZmVyZW50bHk/KVxuICAgIHRoaXMucHJvcHMuYW5ub3RhdGlvbnMubWFwKChhbm5vdGF0aW9uKSA9PiB7XG5cdFx0XHR2YXIgYW5ub3RhdGlvblRhcmdldHMgPSBhbm5vdGF0aW9uW3ByZWYub2ErXCJoYXNUYXJnZXRcIl07XG5cdFx0XHRpZighQXJyYXkuaXNBcnJheShhbm5vdGF0aW9uVGFyZ2V0cykpIGFubm90YXRpb25UYXJnZXRzID0gW2Fubm90YXRpb25UYXJnZXRzXTtcbiAgICAgIC8vIGVhY2ggYW5ub3RhdGlvbi4uLlxuICAgICAgdmFyIGZyYWdzID0gYW5ub3RhdGlvblRhcmdldHMubWFwKChhbm5vdGF0aW9uVGFyZ2V0KSA9PiB7XG4gICAgICAgIC8vIGVhY2ggYW5ub3RhdGlvbiB0YXJnZXRcbiAgICAgICAgaWYgKChhbm5vdGF0aW9uVGFyZ2V0W1wiQGlkXCJdLnN0YXJ0c1dpdGgodGhpcy5wcm9wcy51cmkpXG5cdFx0XHRcdFx0XHQgJiYgYW5ub3RhdGlvblRhcmdldFtcIkBpZFwiXS5pbmRleE9mKFwiI1wiKT4tMSlcblx0XHRcdFx0XHRcdHx8IGFubm90YXRpb25UYXJnZXRbXCJAaWRcIl1bMF09PVwiI1wiKSB7Ly9cblx0XHRcdFx0XHRjb25zdCBteUZyYWdzID0gW2Fubm90YXRpb25UYXJnZXRdO1xuICAgICAgICAgIGlmIChteUZyYWdzLmxlbmd0aCkge1xuICAgICAgICAgICAgLy8gYW5kIGFwcGx5IGFueSBhbm5vdGF0aW9uc1xuICAgICAgICAgICAgdGhpcy5oYW5kbGVNRUxEQWN0aW9ucyhhbm5vdGF0aW9uLCBteUZyYWdzKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgICAgdmFyIGFubm90YXRpb25Cb2RpZXMgPSBhbm5vdGF0aW9uW3ByZWYub2EgKyBcImhhc0JvZHlcIl07XG4gICAgICBpZiAoIUFycmF5LmlzQXJyYXkoYW5ub3RhdGlvbkJvZGllcykpIGFubm90YXRpb25Cb2RpZXMgPSBbYW5ub3RhdGlvbkJvZGllc107IC8vIGVhY2ggYW5ub3RhdGlvbi4uLlxuICAgICAgZnJhZ3MgPSBhbm5vdGF0aW9uQm9kaWVzLm1hcChhbm5vdGF0aW9uQm9keSA9PiB7XG4gICAgICAgIC8vIGVhY2ggYW5ub3RhdGlvbiB0YXJnZXRcbiAgICAgICAgaWYgKGFubm90YXRpb25Cb2R5W1wiQGlkXCJdLnN0YXJ0c1dpdGgodGhpcy5wcm9wcy51cmkpICYmIGFubm90YXRpb25Cb2R5W1wiQGlkXCJdLmluZGV4T2YoXCIjXCIpID4gLTEgfHwgYW5ub3RhdGlvbkJvZHlbXCJAaWRcIl1bMF0gPT0gXCIjXCIpIHtcbiAgICAgICAgICBjb25zdCBteUZyYWdzID0gW2Fubm90YXRpb25Cb2R5XTtcbiAgICAgICAgICBpZiAobXlGcmFncy5sZW5ndGgpIHtcbiAgICAgICAgICAgIC8vIGFuZCBhcHBseSBhbnkgYW5ub3RhdGlvbnNcbiAgICAgICAgICAgIHRoaXMuaGFuZGxlTUVMREFjdGlvbnMoYW5ub3RhdGlvbiwgbXlGcmFncyk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9KTtcblx0XHRcdGlmKChwcmVmLm9hK1wibW90aXZhdGVkQnlcIikgaW4gYW5ub3RhdGlvblxuXHRcdFx0XHQgJiYgYW5ub3RhdGlvbltwcmVmLm9hK1wibW90aXZhdGVkQnlcIl1bXCJAaWRcIl09PT0ocHJlZi5tZWxkdGVybSArIFwicGVyc29uSW5mb1wiKSkge1x0XG5cdFx0XHRcdHZhciBteUZyYWdzID0gQXJyYXkuaXNBcnJheShhbm5vdGF0aW9uW3ByZWYub2ErXCJoYXNUYXJnZXRcIl0pXG5cdFx0XHRcdFx0XHQ/IGFubm90YXRpb25bcHJlZi5vYStcImhhc1RhcmdldFwiXVxuXHRcdFx0XHRcdFx0OiBbYW5ub3RhdGlvbltwcmVmLm9hK1wiaGFzVGFyZ2V0XCJdXTtcbiAgICAgICAgdGhpcy5oYW5kbGVNRUxEQWN0aW9ucyhhbm5vdGF0aW9uLCBteUZyYWdzKTtcblx0XHRcdH1cbiAgICB9KTtcblx0XHR0aGlzLmZpbmRPdGhlclJlZnMoKTtcbiAgfVxuXG5cdGZpbmRPdGhlclJlZnMoKXtcblx0XHQvLy8gTmVlZGVkIGJ5IExpc3RlbmluZyBUaHJvdWdoIFRpbWUuIE5lZWRzIG1vcmVcblx0XHQvLyBnZW5lcmFsaXNhdGlvbi4gKHRoYXQgbWVhbnMgaXQgc2hvdWxkIG5vdCBiZSBjb25zaWRlcmVkXG5cdFx0Ly8gcGFydGljdWxhcmx5IHN0YWJsZSBjb2RlKVxuXHRcdC8vIEZvciBzb21lIGNyb3NzIHJlZmVyZW5jZXMsIGl0IG1ha2VzIG1vcmUgc2Vuc2UgdG8gZGlzY292ZXIgdGhlXG5cdFx0Ly8gcmVmZXJlbmNlcyB0aGVtc2VsdmVzLiBIZXJlLCB3ZSBmaW5kIFRFSSByZWZzIGFuZCBzZWUgaWYgd2Vcblx0XHQvLyBrbm93IGFib3V0IHRoZSB0aGluZyB0aGV5IHJlZmVyIHRvLlxuXHRcdGlmKCEoXCJwZXJmb3JtYW5jZXNcIiBpbiB0aGlzLnByb3BzKSkgcmV0dXJuO1xuXHRcdHZhciByZWZzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLlRFSUNvbnRhaW5lciAqW3JlZl0nKTtcblx0XHRmb3IodmFyIGk9MDsgaTxyZWZzLmxlbmd0aDsgaSsrKXtcblx0XHRcdHZhciByZWZVUkkgPSByZWZzW2ldLmdldEF0dHJpYnV0ZU5TKG51bGwsICdyZWYnKTtcblx0XHRcdHZhciBwZXJmID0gdGhpcy5wcm9wcy5wZXJmb3JtYW5jZXMuZmluZCh4PT54W3ByZWYuZnJicisncGFydE9mJ11bJ0BpZCddPT1yZWZVUkkpO1xuXHRcdFx0aWYocGVyZil7XG5cdFx0XHRcdGlmKHRoaXMucHJvcHMuY3VycmVudC5wZXJmb3JtYW5jZT09cGVyZil7XG5cdFx0XHRcdFx0cmVmc1tpXS5jbGFzc0xpc3QuYWRkKCdjdXJyZW50Jyk7XG5cdFx0XHRcdH1cblx0XHRcdFx0dmFyIGRlZlBlcmYgPSB0aGlzLnByb3BzLnNldFBlcmZvcm1hbmNlLmJpbmQobnVsbCwgcGVyZik7XG5cdFx0XHRcdHZhciB1bmRlZlBlcmYgPSB0aGlzLnByb3BzLmNsZWFyUGVyZm9ybWFuY2U7XG5cdFx0XHRcdHJlZnNbaV0ub25tb3VzZWVudGVyID0gZGVmUGVyZjtcblx0XHRcdFx0cmVmc1tpXS5vbnRvdWNoc3RhcnQgPSBkZWZQZXJmO1xuXHRcdFx0XHRyZWZzW2ldLm9ubW91c2VsZWF2ZSA9IHVuZGVmUGVyZjtcblx0XHRcdFx0cmVmc1tpXS5vbnRvdWNoZW5kID0gdW5kZWZQZXJmO1xuXHRcdFx0fVxuXHRcdH1cblx0fVxuXHRjYW5jZWxIaWdobGlnaHRzKCl7XG5cdFx0dmFyIHJ1bGVzID0gZG9jdW1lbnQuc3R5bGVTaGVldHNbMF0uY3NzUnVsZXMgfHwgZG9jdW1lbnQuc3R5bGVTaGVldHNbMF0ucnVsZXM7XG5cdFx0dmFyIGk9MDtcblx0XHRmb3IodmFyIGk9cnVsZXMubGVuZ3RoLTE7IGk+PTA7IGktLSl7XG5cdFx0XHRpZihydWxlc1tpXS5zZWxlY3RvclRleHQgJiYgcnVsZXNbaV0uc2VsZWN0b3JUZXh0LmluZGV4T2YoJ3RlbXBvcmFyeScpPi0xKXtcblx0XHRcdFx0ZG9jdW1lbnQuc3R5bGVTaGVldHNbMF0uZGVsZXRlUnVsZShpKTtcblx0XHRcdH1cblx0XHR9XG5cdH1cblx0YWRkSGlnaGxpZ2h0KGhpZ2hsaWdodCl7XG5cdFx0Ly8gRklYTUU6IFdoeSBkbyB0aGlzIGV4cGxpY2l0bHkgaGVyZSByYXRoZXIgdGhhbiBpbiBzdHlsZXNoZWV0P1xuXHRcdHZhciBoaWdobGlnaHRmcmFnID0gaGlnaGxpZ2h0LnN1YnN0cmluZyhoaWdobGlnaHQuaW5kZXhPZignIycpKTtcblx0XHR2YXIgc3R5bGUgPSB0aGlzLnByb3BzLmhpZ2hsaWdodFN0eWxlID8gdGhpcy5wcm9wcy5oaWdobGlnaHRTdHlsZSA6IHtmaWxsOiBcImJsdWVcIiwgc3Ryb2tlOiBcImJsdWUgIWltcG9ydGFudFwiLCBjb2xvcjogXCJibHVlXCJ9O1xuXHRcdHNldENTU1Byb3AoJy50ZW1wb3JhcnksICcraGlnaGxpZ2h0ZnJhZywgc3R5bGUpO1xuXHR9XG5cdHNob3dIaWdobGlnaHRzKGhpZ2hsaWdodCl7XG5cdFx0Ly8gR2l2ZW4gYSBzZXQgb2YgaGlnaGxpZ2h0cyBVUklzICh3aXRoIGFwcGxpY2FibGUgZnJhZ21lbnRzKSxcblx0XHQvLyBhcHBseSBoaWdobGlnaHQgZm9ybWF0dGluZ1xuXHRcdHRoaXMuY2FuY2VsSGlnaGxpZ2h0cygpO1xuXHRcdGZvcih2YXIgaT0wOyBpPGhpZ2hsaWdodC5sZW5ndGg7IGkrKyl7XG5cdFx0XHR0aGlzLmFkZEhpZ2hsaWdodChoaWdobGlnaHRbaV0pO1xuXHRcdH1cblx0fVxuXHRkZWZpbml0aW9uRnVuKGRlZmluaXRpb24pe1xuXHRcdHZhciBmdW4gPSB0aGlzLnByb3BzLmN1cnJlbnREZWZpbml0aW9uO1xuXHRcdHJldHVybiBmdW5jdGlvbigpe1xuXHRcdFx0ZnVuKGRlZmluaXRpb24pO1xuXHRcdH1cblx0fVxuXHR1cGRhdGVWaWV3ZXJGdW4oc2hvdywgaGlnaGxpZ2h0KXtcblx0XHR2YXIgZnVuID0gdGhpcy5wcm9wcy51cGRhdGVWaWV3ZXIuYmluZCh0aGlzKTtcblx0XHRyZXR1cm4gZnVuY3Rpb24oKXtcblx0XHRcdGZ1bihzaG93LCBoaWdobGlnaHQpO1xuXHRcdH1cblx0fVxuXHRcbiAgaGFuZGxlTUVMREFjdGlvbnMoYW5ub3RhdGlvbiwgZnJhZ21lbnRzKSB7XG4gICAgaWYocHJlZi5vYStcIm1vdGl2YXRlZEJ5XCIgaW4gYW5ub3RhdGlvbil7XG5cdFx0XHRzd2l0Y2goaWRPckZpcnN0SWQoYW5ub3RhdGlvbltwcmVmLm9hK1wibW90aXZhdGVkQnlcIl0pKXtcblx0XHRcdFx0Y2FzZSBwcmVmLm1lbGR0ZXJtK1widXBkYXRlVmlld2VyU3RhdGVcIjpcblx0XHRcdFx0XHR2YXIgc2hvdyA9IFtdO1xuXHRcdFx0XHRcdHZhciBoaWdobGlnaHQgPSBbXTtcblx0XHRcdFx0XHRmb3IodmFyIGk9MDsgaTxhbm5vdGF0aW9uW3ByZWYub2ErXCJoYXNCb2R5XCJdLmxlbmd0aDsgaSsrKXtcblx0XHRcdFx0XHRcdHZhciB0aGluZyA9IGFubm90YXRpb25bcHJlZi5vYStcImhhc0JvZHlcIl1baV07XG5cdFx0XHRcdFx0XHRpZih0aGluZ1tcIkBpZFwiXSkgc2hvdy5wdXNoKHRoaW5nW1wiQGlkXCJdKTtcblx0XHRcdFx0XHRcdGlmKHRoaW5nW3ByZWYubWVsZHRlcm0rXCJoaWdobGlnaHRcIl0pIGhpZ2hsaWdodCA9IGhpZ2hsaWdodC5jb25jYXQodGhpbmdbcHJlZi5tZWxkdGVybStcImhpZ2hsaWdodFwiXSk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdGZvcih2YXIgaT0wOyBpPGZyYWdtZW50cy5sZW5ndGg7IGkrKyl7XG5cdFx0XHRcdFx0XHR2YXIgZnJhZ0Z1bGxTdHJpbmcgPSBmcmFnbWVudHNbaV1bJ0BpZCddO1xuXHRcdFx0XHRcdFx0dmFyIGZyYWdTdHJpbmcgPSBmcmFnRnVsbFN0cmluZy5zdWJzdHJpbmcoZnJhZ0Z1bGxTdHJpbmcuaW5kZXhPZihcIiNcIikrMSk7XG5cdFx0XHRcdFx0XHR2YXIgZWwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChmcmFnU3RyaW5nKTtcblx0XHRcdFx0XHRcdGlmKGVsKSB7XG5cdFx0XHRcdFx0XHRcdGVsLm9uY2xpY2sgPSB0aGlzLnVwZGF0ZVZpZXdlckZ1bihzaG93LCBoaWdobGlnaHQpO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0Y2FzZSBwcmVmLm1lbGR0ZXJtK1wiZGVmaW5pdGlvblwiOlxuXHRcdFx0XHRcdHZhciBkZWZpbml0aW9uID0ge2RlZmluaXRpb246IG9iak9yRmlyc3RPYmooYW5ub3RhdGlvbltwcmVmLm9hK1wiaGFzQm9keVwiXSlbcHJlZi5tZWxkdGVybStcImhhc0RlZmluaXRpb25cIl19O1xuXHRcdFx0XHRcdGZvcih2YXIgaT0wOyBpPGZyYWdtZW50cy5sZW5ndGg7IGkrKyl7XG5cdFx0XHRcdFx0XHR2YXIgZnJhZ1N0cmluZyA9IGZyYWdtZW50c1tpXVsnQGlkJ107XG5cdFx0XHRcdFx0XHR2YXIgdGVybXMgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZShcInRlaS10ZXJtXCIpO1xuXHRcdFx0XHRcdFx0Zm9yKHZhciBqPTA7IGo8dGVybXMubGVuZ3RoOyBqKyspe1xuXHRcdFx0XHRcdFx0XHRpZih0ZXJtc1tqXS5nZXRBdHRyaWJ1dGUoXCJyZWZcIik9PT1mcmFnU3RyaW5nKXtcblx0XHRcdFx0XHRcdFx0XHR2YXIgZWwgPSB0ZXJtc1tqXTtcblx0XHRcdFx0XHRcdFx0XHRkZWZpbml0aW9uLmhlYWQgPSBlbC5pbm5lckhUTUw7XG5cdFx0XHRcdFx0XHRcdFx0aWYoZWwpIHtcblx0XHRcdFx0XHRcdFx0XHRcdHZhciBkZWZGdW4gPSB0aGlzLmRlZmluaXRpb25GdW4oZGVmaW5pdGlvbik7XG5cdFx0XHRcdFx0XHRcdFx0XHRlbC5vbm1vdXNlZW50ZXIgPSBkZWZGdW47XG5cdFx0XHRcdFx0XHRcdFx0XHRlbC5vbm1vdXNlbGVhdmUgPSB0aGlzLnByb3BzLmNsZWFyRGVmaW5pdGlvbjtcblx0XHRcdFx0XHRcdFx0XHRcdGVsLm9udG91Y2hzdGFydCA9IGRlZkZ1bjtcblx0XHRcdFx0XHRcdFx0XHRcdGVsLm9udG91Y2hlbmQgPSB0aGlzLnByb3BzLmNsZWFyRGVmaW5pdGlvbjtcblx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdGNhc2UgcHJlZi5tZWxkdGVybStcInBlcnNvbkluZm9cIjpcblx0XHRcdFx0XHQvLyBTb21lIG9udG9sb2d5IGRpc2FncmVlbWVudHMgYmV0d2VlbiBhcHBzXG5cdFx0XHRcdFx0dmFyIGFubkJvZHkgPSBvYmpPckZpcnN0T2JqKGFubm90YXRpb25bcHJlZi5vYSArIFwiaGFzQm9keVwiXSlcblx0XHRcdFx0XHRpZihhbm5Cb2R5LmRlZmluaXRpb24pIHsgLy8gZGVwcmVjYXRlZCB2ZXJzaW9uXG5cdFx0XHRcdFx0XHR2YXIgZGVmaW5pdGlvbiA9IHsgZGVmaW5pdGlvbjogYW5ub3RhdGlvbltwcmVmLm9hK1wiaGFzQm9keVwiXVswXS5kZWZpbml0aW9uLFxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0IGhlYWQ6IGFubm90YXRpb25bcHJlZi5vYStcImhhc0JvZHlcIl1bMF0uaGVhZCB9O1xuXHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHR2YXIgZGVmaW5pdGlvbiA9IHtcblx0XHRcdFx0XHRcdFx0ZGVmaW5pdGlvbjogYW5uQm9keVtwcmVmLm1lbGR0ZXJtK1wiZGVmaW5pdGlvblwiXVxuXHRcdFx0XHRcdFx0XHRcdD8gYW5uQm9keVtwcmVmLm1lbGR0ZXJtK1wiZGVmaW5pdGlvblwiXVxuXHRcdFx0XHRcdFx0XHRcdDogYW5uQm9keVtwcmVmLm1lbGR0ZXJtK1wiaGFzRGVmaW5pdGlvblwiXSxcblx0XHRcdFx0XHRcdFx0aGVhZDogYW5uQm9keVtwcmVmLm1lbGR0ZXJtK1wiaGVhZFwiXVxuXHRcdFx0XHRcdFx0XHRcdD8gYW5uQm9keVtwcmVmLm1lbGR0ZXJtK1wiaGVhZFwiXVxuXHRcdFx0XHRcdFx0XHRcdDogYW5uQm9keVtwcmVmLm1lbGR0ZXJtK1wiaGFzSGVhZFwiXSxcblx0XHRcdFx0XHRcdFx0cm9sZTogYW5uQm9keVtwcmVmLm1lbGR0ZXJtK1wicm9sZVwiXSxcblx0XHRcdFx0XHRcdFx0Y2xhc3NyZWY6IGFubkJvZHlbcHJlZi5tZWxkdGVybStcImNsYXNzcmVmXCJdXG5cdFx0XHRcdFx0XHR9O1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRmb3IodmFyIGk9MDsgaTxmcmFnbWVudHMubGVuZ3RoOyBpKyspe1xuXHRcdFx0XHRcdFx0dmFyIGZyYWdTdHJpbmcgPSBmcmFnbWVudHNbaV1bJ0BpZCddO1xuXHRcdFx0XHRcdFx0dmFyIHRlcm1zID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJ0ZWktcGVyc05hbWVcIik7XG5cdFx0XHRcdFx0XHRmb3IodmFyIGo9MDsgajx0ZXJtcy5sZW5ndGg7IGorKyl7XG5cdFx0XHRcdFx0XHRcdGlmKHRlcm1zW2pdLmdldEF0dHJpYnV0ZShcInJlZlwiKT09PWZyYWdTdHJpbmcpe1xuXHRcdFx0XHRcdFx0XHRcdHZhciBlbCA9IHRlcm1zW2pdO1xuXHRcdFx0XHRcdFx0XHRcdGlmKGVsKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHR2YXIgZGVmRnVuID0gdGhpcy5kZWZpbml0aW9uRnVuKGRlZmluaXRpb24pO1xuXHRcdFx0XHRcdFx0XHRcdFx0ZWwub25tb3VzZWVudGVyID0gZGVmRnVuO1xuXHRcdFx0XHRcdFx0XHRcdFx0ZWwub25tb3VzZWxlYXZlID0gdGhpcy5wcm9wcy5jbGVhckRlZmluaXRpb247XG5cdFx0XHRcdFx0XHRcdFx0XHRlbC5vbnRvdWNoc3RhcnQgPSBkZWZGdW47XG5cdFx0XHRcdFx0XHRcdFx0XHRlbC5vbnRvdWNoZW5kID0gdGhpcy5wcm9wcy5jbGVhckRlZmluaXRpb247XG5cdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0fVxuXHRcdH0gZWxzZSBpZiAoXCJvYTpoYXNCb2R5XCIgaW4gYW5ub3RhdGlvbikge1xuXHRcdFx0Ly8gT2xkIGNvZGU6IGRlcHJlY2F0ZWQgYW5kIGxpa2VseSB0byBiZSByZW1vdmVkLiBJbmNvbXBhdGlibGVcblx0XHRcdC8vIHdpdGggbmV3IHRyYXZlcnNhbCBtZWNoYW5pc21zLlxuICAgICAgYW5ub3RhdGlvbltcIm9hOmhhc0JvZHlcIl0ubWFwKChiKSA9PiB7XG4gICAgICAgIC8vIFRPRE8gY29udmVydCB0byBzd2l0Y2ggc3RhdGVtZW50XG4gICAgICAgIGlmIChiW1wiQGlkXCJdID09PSBNQVJLVVBfRU1QSEFTSVMpIHtcbiAgICAgICAgICB0aGlzLnByb3BzLmhhbmRsZUVtcGhhc2lzKFJlYWN0RE9NLmZpbmRET01Ob2RlKHRoaXMpLCBhbm5vdGF0aW9uLCB0aGlzLnByb3BzLnVyaSwgZnJhZ21lbnRzKTtcbiAgICAgICAgfSBlbHNlIGlmIChiW1wiQGlkXCJdID09PSBNQVJLVVBfSElHSExJR0hUKSB7XG4gICAgICAgICAgdGhpcy5wcm9wcy5oYW5kbGVIaWdobGlnaHQoUmVhY3RET00uZmluZERPTU5vZGUodGhpcyksIGFubm90YXRpb24sIHRoaXMucHJvcHMudXJpLCBmcmFnbWVudHMpO1xuICAgICAgICB9IGVsc2UgaWYgKGJbXCJAaWRcIl0gPT09IE1BUktVUF9ISUdITElHSFQyKSB7XG4gICAgICAgICAgdGhpcy5wcm9wcy5oYW5kbGVIaWdobGlnaHQyKFJlYWN0RE9NLmZpbmRET01Ob2RlKHRoaXMpLCBhbm5vdGF0aW9uLCB0aGlzLnByb3BzLnVyaSwgZnJhZ21lbnRzKTtcbiAgICAgICAgfSBlbHNlIGlmIChiW1wiQGlkXCJdID09PSBDVUVfSU1BR0UpIHtcbiAgICAgICAgICB0aGlzLnByb3BzLmhhbmRsZUN1ZUltYWdlKFJlYWN0RE9NLmZpbmRET01Ob2RlKHRoaXMpLCBhbm5vdGF0aW9uLCB0aGlzLnByb3BzLnVyaSwgZnJhZ21lbnRzLCB0aGlzLnByb3BzLnRlaS5mcmFnSW1hZ2VzKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBjb25zb2xlLmxvZyhcIlRFSSBjb21wb25lbnQgdW5hYmxlIHRvIGhhbmRsZSBtZWxkIGFjdGlvbjogXCIsIGIpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc29sZS5sb2coXCJTa2lwcGluZyBhbm5vdGF0aW9uIHdpdGhvdXQgYm9keTogXCIsIGFubm90YXRpb24pXG4gICAgfVxuICB9XG59XG5cbmZ1bmN0aW9uIHNldENTU1Byb3Aoc2VsZWN0b3IsIG9iail7XG5cdC8vIEdlbmVyYWwgcHVycG9zZSBDU1MgcnVsZSBzZXR0aW5nIGZ1bmN0aW9uLiBUcmllcyB0byBiZSB0aWR5IGFuZFxuXHQvLyB1cGRhdGUgZXhpc3RpbmcgcnVsZXMgcmF0aGVyIHRoYW4gc3BhbW1pbmcgbmV3IG9uZXNcblx0aWYoIWRvY3VtZW50LnN0eWxlc2hlZXRzIHx8ICFkb2N1bWVudC5zdHlsZXNoZWV0cy5sZW5ndGgpIHtcblx0XHQvLyBGSVhNRTogd2h5IG5vdCBzZXQgc29tZXRoaW5nIGhlcmU/XG5cdFx0Y29uc29sZS5sb2coJ05vIHN0eWxlc2hlZXRzIOKAkyBub3Qgc2V0dGluZyBzdHlsZScpO1xuXHRcdHJldHVybjtcblx0fVxuXHR2YXIgcnVsZXMgPSBkb2N1bWVudC5zdHlsZVNoZWV0c1swXS5jc3NSdWxlcyB8fCBkb2N1bWVudC5zdHlsZVNoZWV0c1swXS5ydWxlcztcblx0aWYoIXJ1bGVzKSB7XG5cdFx0cmV0dXJuO1xuXHR9O1xuXHR2YXIgaT0wO1xuXHRcdHdoaWxlKGk8cnVsZXMubGVuZ3RoICYmICghcnVsZXNbaV0uc2VsZWN0b3JUZXh0IHx8IHJ1bGVzW2ldLnNlbGVjdG9yVGV4dC5pbmRleE9mKHNlbGVjdG9yKT09PS0xKSl7XG5cdFx0XHRpKys7XG5cdFx0fVxuXHRpZihpPT1ydWxlcy5sZW5ndGgpIHtcblx0XHQvL2luc2VydCBydWxlc1xuICAgIGRvY3VtZW50LnN0eWxlU2hlZXRzWzBdLmluc2VydFJ1bGUoc2VsZWN0b3IrXCIge2Rpc3BsYXk6IHZpc2libGV9XCIpO1xuXHRcdHZhciBpPTA7XG5cdFx0d2hpbGUoaTxydWxlcy5sZW5ndGggJiYgKCFydWxlc1tpXS5zZWxlY3RvclRleHQgfHwgcnVsZXNbaV0uc2VsZWN0b3JUZXh0LmluZGV4T2Yoc2VsZWN0b3IpPT09LTEpKXtcblx0XHRcdGkrKztcblx0XHR9XG5cdH1cblx0dmFyIGRlY2xhcmF0aW9uID0gcnVsZXNbaV0uc3R5bGU7XG5cdHZhciBuZXdSdWxlcyA9IE9iamVjdC5rZXlzKG9iaik7XG5cdGZvcih2YXIgaj0wOyBqPG5ld1J1bGVzLmxlbmd0aDsgaisrKXtcblx0XHRkZWNsYXJhdGlvbi5zZXRQcm9wZXJ0eShuZXdSdWxlc1tqXSwgb2JqW25ld1J1bGVzW2pdXSk7XG5cdH1cbn1cblxuZnVuY3Rpb24gbWFwU3RhdGVUb1Byb3BzKHt0ZWl9KSB7XG4gIHJldHVybiB7dGVpfTtcbn1cblxuZnVuY3Rpb24gbWFwRGlzcGF0Y2hUb1Byb3BzKGRpc3BhdGNoKSB7XG4gIHJldHVybiBiaW5kQWN0aW9uQ3JlYXRvcnMoe2ZldGNoVEVJLCBoYW5kbGVFbXBoYXNpcywgaGFuZGxlQ3VlSW1hZ2UsIGhhbmRsZUhpZ2hsaWdodCwgaGFuZGxlSGlnaGxpZ2h0Mn0sIGRpc3BhdGNoKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgY29ubmVjdChtYXBTdGF0ZVRvUHJvcHMsIG1hcERpc3BhdGNoVG9Qcm9wcykoVEVJKTtcblxuaWYgKCFTdHJpbmcucHJvdG90eXBlLmVuZHNXaXRoKSB7XG4gIFN0cmluZy5wcm90b3R5cGUuZW5kc1dpdGggPSBmdW5jdGlvbiAoc2VhcmNoU3RyaW5nLCBwb3NpdGlvbikge1xuICAgIHZhciBzdWJqZWN0U3RyaW5nID0gdGhpcy50b1N0cmluZygpO1xuICAgIGlmICh0eXBlb2YgcG9zaXRpb24gIT09ICdudW1iZXInIHx8ICFpc0Zpbml0ZShwb3NpdGlvbikgfHwgTWF0aC5mbG9vcihwb3NpdGlvbikgIT09IHBvc2l0aW9uIHx8IHBvc2l0aW9uID4gc3ViamVjdFN0cmluZy5sZW5ndGgpIHtcbiAgICAgIHBvc2l0aW9uID0gc3ViamVjdFN0cmluZy5sZW5ndGg7XG4gICAgfVxuICAgIHBvc2l0aW9uIC09IHNlYXJjaFN0cmluZy5sZW5ndGg7XG4gICAgdmFyIGxhc3RJbmRleCA9IHN1YmplY3RTdHJpbmcubGFzdEluZGV4T2Yoc2VhcmNoU3RyaW5nLCBwb3NpdGlvbik7XG4gICAgcmV0dXJuIGxhc3RJbmRleCAhPT0gLTEgJiYgbGFzdEluZGV4ID09PSBwb3NpdGlvbjtcbiAgfTtcbn1cbmZ1bmN0aW9uIGlkT3JGaXJzdElkKGpsZCl7XG5cdHJldHVybiBBcnJheS5pc0FycmF5KGpsZCkgPyBqbGRbMF1bJ0BpZCddIDogamxkWydAaWQnXTtcbn1cbmZ1bmN0aW9uIG9iak9yRmlyc3RPYmooamxkKXtcblx0cmV0dXJuIEFycmF5LmlzQXJyYXkoamxkKSA/IGpsZFswXSA6IGpsZDtcbn1cbiJdfQ==