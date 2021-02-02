"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactDom = _interopRequireDefault(require("react-dom"));

var _reactRedux = require("react-redux");

var _redux = require("redux");

var _index = require("../actions/index");

var _meldActions = require("../actions/meldActions");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

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

var defaultVrvOptions = {
  ignoreLayout: 1,
  adjustPageHeight: 1,
  spacingStaff: 0,
  spacingSystem: 4,
  spacingLinear: 0.2,
  spacingNonLinear: 0.55,
  noFooter: 1,
  noHeader: 1,
  scale: 30,
  pageHeight: 3000,
  pageWidth: 1800
};

var Score = /*#__PURE__*/function (_React$Component) {
  _inherits(Score, _React$Component);

  var _super = _createSuper(Score);

  function Score(props) {
    var _this;

    _classCallCheck(this, Score);

    _this = _super.call(this, props);
    _this.state = {
      score: {},
      annotations: {}
    };
    return _this;
  }

  _createClass(Score, [{
    key: "render",
    value: function render() {
      if (Object.keys(this.props.score).length) {
        if (this.props.score.MEI[this.props.uri]) {
          this.props.score.vrvTk.loadData(this.props.score.MEI[this.props.uri]);
          this.props.score.vrvTk.setOptions(this.props.options ? this.props.options : defaultVrvOptions);
          this.props.score.vrvTk.redoLayout();
          var svg = this.props.score.vrvTk.renderToSVG(this.props.score.pageNum);
        } else if (this.props.score.SVG[this.props.uri]) {
          svg = this.props.score.SVG[this.props.uri];
        } else {
          svg = '';
        }

        if (this.props.scoreAnnotations && this.props.drawAnnotation && svg) {
          // We can't edit the output of Verovio while it's a string,
          // so, if there's anything to be done to it, it should happen
          // to a parsed version.
          // Ideally, this would be the version rendered, but in practice, I'm
          // regenerating the serialisation and then drawing that. Which is pretty silly.
          var parser = new DOMParser();
          var svgObject = parser.parseFromString(svg, "image/svg+xml");
          var svgChild = svgObject.getElementsByClassName('definition-scale')[0];
          var oSerializer = new XMLSerializer();
          this.props.drawAnnotation(this.props.scoreAnnotations, svgChild);
          svg = oSerializer.serializeToString(svgObject);
        }

        return /*#__PURE__*/_react["default"].createElement("div", {
          id: this.props.uri,
          className: "scorepane"
        }, /*#__PURE__*/_react["default"].createElement("div", {
          className: "controls"
        }), /*#__PURE__*/_react["default"].createElement("div", {
          className: "annotations"
        }), /*#__PURE__*/_react["default"].createElement("div", {
          className: "score",
          dangerouslySetInnerHTML: {
            __html: svg
          }
        }));
      }

      return /*#__PURE__*/_react["default"].createElement("div", null, "Loading...");
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      this.props.fetchScore(this.props.uri);
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps, prevState) {
      var _this2 = this;

      var annotations = this.props.annotations;

      if (!Array.isArray(annotations)) {
        annotations = [annotations];
      } // console.log("annotations:", annotations)


      if (annotations.length && typeof annotations[0] !== "undefined" && "@type" in annotations[0] && annotations[0]["@type"].includes("meldterm:topLevel")) {
        // console.log("Found old Larry-meld style topLevel annotation, converting...")
        annotations = annotations[0]["oa:hasBody"];
      }

      annotations.map(function (annotation) {
        // console.log("annotation is: ", annotation)
        if (typeof annotation === 'undefined') {
          return;
        } // each annotation...


        annotation = (0, _index.ensureArray)(annotation, "oa:hasTarget");
        var frags = annotation["oa:hasTarget"].map(function (annotationTarget) {
          // each annotation target
          if (annotationTarget["@id"] in _this2.props.score.componentTargets) {
            // if this is my target, grab frag ids according to media type
            var mediaTypes = Object.keys(_this2.props.score.componentTargets[annotationTarget["@id"]]);
            var myFrags = {};
            mediaTypes.map(function (type) {
              if (type === "MEI") {
                // only grab MY frag IDs, for THIS mei file
                myFrags[type] = _this2.props.score.componentTargets[annotationTarget["@id"]][type].filter(function (frag) {
                  return frag.substr(0, frag.indexOf("#")) === _this2.props.uri;
                });
              } else {
                //TODO think about what to do here to filter (e.g. multiple audios)
                myFrags[type] = _this2.props.score.componentTargets[annotationTarget["@id"]][type];
              }
            }); // and apply any annotations

            _this2.handleMELDActions(annotation, myFrags);
          } else if (annotationTarget["@id"] == _this2.props.session) {
            // this annotation applies to the *session*, e.g. a page turn
            _this2.handleMELDActions(annotation, null);
          }
        });
      });

      if (prevProps.score.pageNum !== this.props.score.pageNum || // on page flip...
      prevProps.score.pageCount < this.props.score.pageCount // ...or first load
      ) {
          // signal that Verovio has rendered a new page
          this.props.updateLatestRenderedPageNum(this.props.score.pageNum);
        }
    }
  }, {
    key: "handleMELDActions",
    value: function handleMELDActions(annotation, fragments) {
      var _this3 = this;

      // console.log("HANDLING MELD ACTION: ", annotation, fragments);
      if ("oa:motivatedBy" in annotation) {
        switch (annotation["oa:motivatedBy"]["@id"]) {
          case "oa:highlighting":
            this.props.handleHighlight(_reactDom["default"].findDOMNode(this), annotation, this.props.uri, fragments["MEI"]);
            break;

          case "motivation:muzicodeIdentify":
            this.props.handleIdentifyMuzicode(_reactDom["default"].findDOMNode(this), annotation, this.props.uri, fragments["MEI"]);
            break;

          case "motivation:muzicodeChoice":
            this.props.handleChoiceMuzicode(_reactDom["default"].findDOMNode(this), annotation, this.props.uri, fragments["MEI"]);
            break;

          case "motivation:muzicodeChallengePassed":
            this.props.handleChallengePassed(_reactDom["default"].findDOMNode(this), annotation, this.props.uri, fragments["MEI"]);
            break;

          case "motivation:muzicodeDisklavierStart":
            this.props.handleDisklavierStart(_reactDom["default"].findDOMNode(this), annotation, this.props.uri, fragments["MEI"]);
            break;

          case "motivation:muzicodeTriggered":
            // for muzicodes, the component target contains information on muzicode type and climb cue
            var muzicodeTarget = this.props.score.componentTargets[annotation["oa:hasTarget"][0]["@id"]]; //FIXME handle n>1 targets

            this.props.handleMuzicodeTriggered(_reactDom["default"].findDOMNode(this), annotation, this.props.uri, fragments["MEI"], muzicodeTarget, this.props.session, this.props.nextSession, this.props.etag);
            break;

          case "motivation:archivedMuzicodeTrigger":
            var archivedMuzicodeTarget = this.props.score.componentTargets[annotation["oa:hasTarget"][0]["@id"]]; //FIXME handle n>1 targets

            this.props.handleArchivedMuzicodeTrigger(_reactDom["default"].findDOMNode(this), annotation, this.props.uri, fragments["MEI"], archivedMuzicodeTarget, this.props.session, this.props.nextSession);
            break;

          case "motivation:nextPageOrPiece":
            // console.log("----", this.props);
            this.props.scoreNextPage(this.props.session, this.props.nextSession, this.props.etag, annotation, this.props.uri, this.props.score.pageNum, this.props.score.MEI[this.props.uri]);
            break;

          case "motivation:prevPageOrPiece":
            // console.log("----", this.props);
            this.props.scorePrevPage(this.props.session, this.props.nextSession, this.props.etag, annotation, this.props.uri, this.props.score.pageNum, this.props.score.MEI[this.props.uri]);
            break;

          case "motivation:queueNextSession":
            this.props.handleQueueNextSession(this.props.session, this.props.etag, annotation);
            break;

          case "motivation:createNextSession":
            this.props.handleCreateNextSession(this.props.session, this.props.etag, annotation);
            break;

          case "motivation:transitionToNextSession":
            this.props.handleTransitionToNextSession(this.props.session, this.props.etag, annotation);
            break;

          default:
            console.log("Unknown motivation: ", annotation["oa:motivatedBy"]);
        }
      } else if (_index.HAS_BODY in annotation) {
        annotation[_index.HAS_BODY].map(function (b) {
          // TODO convert to switch statement
          if (b["@id"] === _meldActions.MARKUP_EMPHASIS) {
            _this3.props.handleEmphasis(_reactDom["default"].findDOMNode(_this3), annotation, _this3.props.uri, fragments["MEI"]);
          } else if (b["@id"] === _meldActions.MARKUP_HIGHLIGHT) {
            _this3.props.handleHighlight(_reactDom["default"].findDOMNode(_this3), annotation, _this3.props.uri, fragments["MEI"]);
          } else if (b["@id"] === _meldActions.MARKUP_HIGHLIGHT2) {
            _this3.props.handleHighlight2(_reactDom["default"].findDOMNode(_this3), annotation, _this3.props.uri, fragments["MEI"]);
          } else if (b["@id"] === _meldActions.CUE_AUDIO) {
            _this3.props.handleCueAudio(_reactDom["default"].findDOMNode(_this3), annotation, b, _this3.props.uri, fragments);
          } else if (b["@id"] === _meldActions.CUE_VIDEO) {
            _this3.props.handleCueVideo(_reactDom["default"].findDOMNode(_this3), annotation, b, _this3.props.uri, fragments);
          } else {
            console.log("Score component unable to handle meld action: ", b);
          }
        }); // FIXME: the above should be phased out as we move into
        // using motivations instead of bodies for rendering instructions

      } else {
        console.log("Skipping annotation without rendering instructions: ", annotation);
      }
    }
  }]);

  return Score;
}(_react["default"].Component);

function mapStateToProps(_ref) {
  var score = _ref.score;
  return {
    score: score
  };
}

function mapDispatchToProps(dispatch) {
  return (0, _redux.bindActionCreators)({
    fetchScore: _index.fetchScore,
    updateLatestRenderedPageNum: _index.updateLatestRenderedPageNum,
    handleEmphasis: _meldActions.handleEmphasis,
    handleHighlight: _meldActions.handleHighlight,
    handleHighlight2: _meldActions.handleHighlight2,
    handleCueAudio: _meldActions.handleCueAudio,
    handleCueVideo: _meldActions.handleCueVideo,
    scorePrevPage: _index.scorePrevPage,
    scoreNextPage: _index.scoreNextPage,
    handleQueueNextSession: _meldActions.handleQueueNextSession,
    handleCreateNextSession: _meldActions.handleCreateNextSession,
    handleTransitionToNextSession: _meldActions.handleTransitionToNextSession,
    handleIdentifyMuzicode: _meldActions.handleIdentifyMuzicode,
    handleChoiceMuzicode: _meldActions.handleChoiceMuzicode,
    handleChallengePassed: _meldActions.handleChallengePassed,
    handleDisklavierStart: _meldActions.handleDisklavierStart,
    handleMuzicodeTriggered: _meldActions.handleMuzicodeTriggered,
    handleArchivedMuzicodeTrigger: _meldActions.handleArchivedMuzicodeTrigger
  }, dispatch);
}

var _default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps, null, {
  forwardRef: true
})(Score);

exports["default"] = _default;