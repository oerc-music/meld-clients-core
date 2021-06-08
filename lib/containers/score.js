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

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

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
      var svg = ''; // ensure verovio has generated an SVG for the current MEI and current page: 

      if ("score" in this.props && this.props.uri in this.props.score.SVG && typeof this.props.score.SVG[this.props.uri] !== "undefined" && this.props.uri in this.props.score.pageState && typeof this.props.score.pageState[this.props.uri] !== "undefined" && "currentPage" in this.props.score.pageState[this.props.uri] && this.props.score.pageState[this.props.uri].currentPage in this.props.score.SVG[this.props.uri]) {
        var currentPage = this.props.score.pageState[this.props.uri].currentPage;
        svg = this.props.score.SVG[this.props.uri][currentPage].data;

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
      this.props.fetchScore(this.props.uri, this.props.options);
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

      if (Object.keys(prevProps.score.pageState).length && this.props.uri in prevProps.score.pageState && (prevProps.score.pageState[this.props.uri].currentPage !== this.props.score.pageState[this.props.uri].currentPage || // on page flip...
      prevProps.score.pageState[this.props.uri].pageCount < this.props.score.pageState[this.props.uri].pageCount) // ...or first load
      ) {
          // signal that Verovio has rendered a new page
          this.props.updateLatestRenderedPageNum(this.props.score.pageState[this.props.uri].currentPage);
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
            this.props.scoreNextPage(this.props.session, this.props.nextSession, this.props.etag, annotation, this.props.uri, this.props.score.pageState[this.props.uri].currentPage, this.props.score.MEI[this.props.uri]);
            break;

          case "motivation:prevPageOrPiece":
            // console.log("----", this.props);
            this.props.scorePrevPage(this.props.session, this.props.nextSession, this.props.etag, annotation, this.props.uri, this.props.score.pageState[this.props.uri].currentPage, this.props.score.MEI[this.props.uri]);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb250YWluZXJzL3Njb3JlLmpzIl0sIm5hbWVzIjpbImRlZmF1bHRWcnZPcHRpb25zIiwiaWdub3JlTGF5b3V0IiwiYWRqdXN0UGFnZUhlaWdodCIsInNwYWNpbmdTdGFmZiIsInNwYWNpbmdTeXN0ZW0iLCJzcGFjaW5nTGluZWFyIiwic3BhY2luZ05vbkxpbmVhciIsIm5vRm9vdGVyIiwibm9IZWFkZXIiLCJzY2FsZSIsInBhZ2VIZWlnaHQiLCJwYWdlV2lkdGgiLCJTY29yZSIsInByb3BzIiwic3RhdGUiLCJzY29yZSIsImFubm90YXRpb25zIiwic3ZnIiwidXJpIiwiU1ZHIiwicGFnZVN0YXRlIiwiY3VycmVudFBhZ2UiLCJkYXRhIiwic2NvcmVBbm5vdGF0aW9ucyIsImRyYXdBbm5vdGF0aW9uIiwicGFyc2VyIiwiRE9NUGFyc2VyIiwic3ZnT2JqZWN0IiwicGFyc2VGcm9tU3RyaW5nIiwic3ZnQ2hpbGQiLCJnZXRFbGVtZW50c0J5Q2xhc3NOYW1lIiwib1NlcmlhbGl6ZXIiLCJYTUxTZXJpYWxpemVyIiwic2VyaWFsaXplVG9TdHJpbmciLCJfX2h0bWwiLCJmZXRjaFNjb3JlIiwib3B0aW9ucyIsInByZXZQcm9wcyIsInByZXZTdGF0ZSIsIkFycmF5IiwiaXNBcnJheSIsImxlbmd0aCIsImluY2x1ZGVzIiwibWFwIiwiYW5ub3RhdGlvbiIsImZyYWdzIiwiYW5ub3RhdGlvblRhcmdldCIsImNvbXBvbmVudFRhcmdldHMiLCJtZWRpYVR5cGVzIiwiT2JqZWN0Iiwia2V5cyIsIm15RnJhZ3MiLCJ0eXBlIiwiZmlsdGVyIiwiZnJhZyIsInN1YnN0ciIsImluZGV4T2YiLCJoYW5kbGVNRUxEQWN0aW9ucyIsInNlc3Npb24iLCJwYWdlQ291bnQiLCJ1cGRhdGVMYXRlc3RSZW5kZXJlZFBhZ2VOdW0iLCJmcmFnbWVudHMiLCJoYW5kbGVIaWdobGlnaHQiLCJSZWFjdERPTSIsImZpbmRET01Ob2RlIiwiaGFuZGxlSWRlbnRpZnlNdXppY29kZSIsImhhbmRsZUNob2ljZU11emljb2RlIiwiaGFuZGxlQ2hhbGxlbmdlUGFzc2VkIiwiaGFuZGxlRGlza2xhdmllclN0YXJ0IiwibXV6aWNvZGVUYXJnZXQiLCJoYW5kbGVNdXppY29kZVRyaWdnZXJlZCIsIm5leHRTZXNzaW9uIiwiZXRhZyIsImFyY2hpdmVkTXV6aWNvZGVUYXJnZXQiLCJoYW5kbGVBcmNoaXZlZE11emljb2RlVHJpZ2dlciIsInNjb3JlTmV4dFBhZ2UiLCJNRUkiLCJzY29yZVByZXZQYWdlIiwiaGFuZGxlUXVldWVOZXh0U2Vzc2lvbiIsImhhbmRsZUNyZWF0ZU5leHRTZXNzaW9uIiwiaGFuZGxlVHJhbnNpdGlvblRvTmV4dFNlc3Npb24iLCJjb25zb2xlIiwibG9nIiwiSEFTX0JPRFkiLCJiIiwiTUFSS1VQX0VNUEhBU0lTIiwiaGFuZGxlRW1waGFzaXMiLCJNQVJLVVBfSElHSExJR0hUIiwiTUFSS1VQX0hJR0hMSUdIVDIiLCJoYW5kbGVIaWdobGlnaHQyIiwiQ1VFX0FVRElPIiwiaGFuZGxlQ3VlQXVkaW8iLCJDVUVfVklERU8iLCJoYW5kbGVDdWVWaWRlbyIsIlJlYWN0IiwiQ29tcG9uZW50IiwibWFwU3RhdGVUb1Byb3BzIiwibWFwRGlzcGF0Y2hUb1Byb3BzIiwiZGlzcGF0Y2giLCJmb3J3YXJkUmVmIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFRQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBdUJBLElBQU1BLGlCQUFpQixHQUFHO0FBQ3hCQyxFQUFBQSxZQUFZLEVBQUUsQ0FEVTtBQUV4QkMsRUFBQUEsZ0JBQWdCLEVBQUUsQ0FGTTtBQUd4QkMsRUFBQUEsWUFBWSxFQUFFLENBSFU7QUFJeEJDLEVBQUFBLGFBQWEsRUFBRSxDQUpTO0FBS3hCQyxFQUFBQSxhQUFhLEVBQUUsR0FMUztBQU14QkMsRUFBQUEsZ0JBQWdCLEVBQUUsSUFOTTtBQU94QkMsRUFBQUEsUUFBUSxFQUFFLENBUGM7QUFReEJDLEVBQUFBLFFB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QUFjLEVBQWRBLDJCQU53QjtBQU94QkUsSUFBQUEsY0FBYyxFQUFkQSwyQkFQd0I7QUFReEJoQixJQUFBQSxhQUFhLEVBQWJBLG9CQVJ3QjtBQVN4QkYsSUFBQUEsYUFBYSxFQUFiQSxvQkFUd0I7QUFVeEJHLElBQUFBLHNCQUFzQixFQUF0QkEsbUNBVndCO0FBV3hCQyxJQUFBQSx1QkFBdUIsRUFBdkJBLG9DQVh3QjtBQVl4QkMsSUFBQUEsNkJBQTZCLEVBQTdCQSwwQ0Fad0I7QUFheEJmLElBQUFBLHNCQUFzQixFQUF0QkEsbUNBYndCO0FBY3hCQyxJQUFBQSxvQkFBb0IsRUFBcEJBLGlDQWR3QjtBQWV4QkMsSUFBQUEscUJBQXFCLEVBQXJCQSxrQ0Fmd0I7QUFnQnhCQyxJQUFBQSxxQkFBcUIsRUFBckJBLGtDQWhCd0I7QUFpQnhCRSxJQUFBQSx1QkFBdUIsRUFBdkJBLG9DQWpCd0I7QUFrQnhCSSxJQUFBQSw2QkFBNkIsRUFBN0JBO0FBbEJ3QixHQUFuQixFQW1CSndCLFFBbkJJLENBQVA7QUFvQkQ7O2VBRWMseUJBQVFGLGVBQVIsRUFBeUJDLGtCQUF6QixFQUE2QyxJQUE3QyxFQUFtRDtBQUFDRSxFQUFBQSxVQUFVLEVBQUU7QUFBYixDQUFuRCxFQUF1RXZGLEtBQXZFLEMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFJlYWN0RE9NIGZyb20gJ3JlYWN0LWRvbSdcbmltcG9ydCB7Y29ubmVjdH0gZnJvbSAncmVhY3QtcmVkdXgnO1xuaW1wb3J0IHtiaW5kQWN0aW9uQ3JlYXRvcnN9IGZyb20gJ3JlZHV4JztcbmltcG9ydCB7XG4gIGVuc3VyZUFycmF5LFxuICBmZXRjaFNjb3JlLFxuICBIQVNfQk9EWSxcbiAgc2NvcmVOZXh0UGFnZSxcbiAgc2NvcmVQcmV2UGFnZSxcbiAgdXBkYXRlTGF0ZXN0UmVuZGVyZWRQYWdlTnVtXG59IGZyb20gJy4uL2FjdGlvbnMvaW5kZXgnO1xuaW1wb3J0IHtcbiAgQ1VFX0FVRElPLFxuICBDVUVfVklERU8sXG4gIGhhbmRsZUFyY2hpdmVkTXV6aWNvZGVUcmlnZ2VyLFxuICBoYW5kbGVDaGFsbGVuZ2VQYXNzZWQsXG4gIGhhbmRsZUNob2ljZU11emljb2RlLFxuICBoYW5kbGVDcmVhdGVOZXh0U2Vzc2lvbixcbiAgaGFuZGxlQ3VlQXVkaW8sXG4gIGhhbmRsZUN1ZVZpZGVvLFxuICBoYW5kbGVEaXNrbGF2aWVyU3RhcnQsXG4gIGhhbmRsZUVtcGhhc2lzLFxuICBoYW5kbGVIaWdobGlnaHQsXG4gIGhhbmRsZUhpZ2hsaWdodDIsXG4gIGhhbmRsZUlkZW50aWZ5TXV6aWNvZGUsXG4gIGhhbmRsZU11emljb2RlVHJpZ2dlcmVkLFxuICBoYW5kbGVRdWV1ZU5leHRTZXNzaW9uLFxuICBoYW5kbGVUcmFuc2l0aW9uVG9OZXh0U2Vzc2lvbixcbiAgTUFSS1VQX0VNUEhBU0lTLFxuICBNQVJLVVBfSElHSExJR0hULFxuICBNQVJLVVBfSElHSExJR0hUMlxufSBmcm9tICcuLi9hY3Rpb25zL21lbGRBY3Rpb25zJztcblxuXG5jb25zdCBkZWZhdWx0VnJ2T3B0aW9ucyA9IHtcbiAgaWdub3JlTGF5b3V0OiAxLFxuICBhZGp1c3RQYWdlSGVpZ2h0OiAxLFxuICBzcGFjaW5nU3RhZmY6IDAsXG4gIHNwYWNpbmdTeXN0ZW06IDQsXG4gIHNwYWNpbmdMaW5lYXI6IDAuMixcbiAgc3BhY2luZ05vbkxpbmVhcjogMC41NSxcbiAgbm9Gb290ZXI6IDEsXG4gIG5vSGVhZGVyOiAxLFxuICBzY2FsZTogMzAsXG4gIHBhZ2VIZWlnaHQ6IDMwMDAsXG4gIHBhZ2VXaWR0aDogMTgwMFxufTtcblxuXG5jbGFzcyBTY29yZSBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgc3VwZXIocHJvcHMpO1xuXG4gICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgIHNjb3JlOiB7fSxcbiAgICAgIGFubm90YXRpb25zOiB7fVxuICAgIH07XG4gIH1cblxuICByZW5kZXIoKSB7XG4gICAgbGV0IHN2ZyA9ICcnO1xuICAgIC8vIGVuc3VyZSB2ZXJvdmlvIGhhcyBnZW5lcmF0ZWQgYW4gU1ZHIGZvciB0aGUgY3VycmVudCBNRUkgYW5kIGN1cnJlbnQgcGFnZTogXG4gICAgaWYoXCJzY29yZVwiIGluIHRoaXMucHJvcHMgJiZcbiAgICAgICB0aGlzLnByb3BzLnVyaSBpbiB0aGlzLnByb3BzLnNjb3JlLlNWRyAmJlxuICAgICAgIHR5cGVvZiB0aGlzLnByb3BzLnNjb3JlLlNWR1t0aGlzLnByb3BzLnVyaV0gIT09IFwidW5kZWZpbmVkXCIgJiZcbiAgICAgICB0aGlzLnByb3BzLnVyaSBpbiB0aGlzLnByb3BzLnNjb3JlLnBhZ2VTdGF0ZSAmJlxuICAgICAgIHR5cGVvZiB0aGlzLnByb3BzLnNjb3JlLnBhZ2VTdGF0ZVt0aGlzLnByb3BzLnVyaV0gIT09IFwidW5kZWZpbmVkXCIgJiZcbiAgICAgICBcImN1cnJlbnRQYWdlXCIgaW4gdGhpcy5wcm9wcy5zY29yZS5wYWdlU3RhdGVbdGhpcy5wcm9wcy51cmldICYmXG4gICAgICAgdGhpcy5wcm9wcy5zY29yZS5wYWdlU3RhdGVbdGhpcy5wcm9wcy51cmldLmN1cnJlbnRQYWdlIGluIHRoaXMucHJvcHMuc2NvcmUuU1ZHW3RoaXMucHJvcHMudXJpXSkgeyBcbiAgICAgIGxldCBjdXJyZW50UGFnZSA9IHRoaXMucHJvcHMuc2NvcmUucGFnZVN0YXRlW3RoaXMucHJvcHMudXJpXS5jdXJyZW50UGFnZTtcbiAgICAgIHN2ZyA9IHRoaXMucHJvcHMuc2NvcmUuU1ZHW3RoaXMucHJvcHMudXJpXVtjdXJyZW50UGFnZV0uZGF0YTtcbiAgICAgIGlmICh0aGlzLnByb3BzLnNjb3JlQW5ub3RhdGlvbnMgJiYgdGhpcy5wcm9wcy5kcmF3QW5ub3RhdGlvbiAmJiBzdmcpIHtcbiAgICAgICAgLy8gV2UgY2FuJ3QgZWRpdCB0aGUgb3V0cHV0IG9mIFZlcm92aW8gd2hpbGUgaXQncyBhIHN0cmluZyxcbiAgICAgICAgLy8gc28sIGlmIHRoZXJlJ3MgYW55dGhpbmcgdG8gYmUgZG9uZSB0byBpdCwgaXQgc2hvdWxkIGhhcHBlblxuICAgICAgICAvLyB0byBhIHBhcnNlZCB2ZXJzaW9uLlxuICAgICAgICAvLyBJZGVhbGx5LCB0aGlzIHdvdWxkIGJlIHRoZSB2ZXJzaW9uIHJlbmRlcmVkLCBidXQgaW4gcHJhY3RpY2UsIEknbVxuICAgICAgICAvLyByZWdlbmVyYXRpbmcgdGhlIHNlcmlhbGlzYXRpb24gYW5kIHRoZW4gZHJhd2luZyB0aGF0LiBXaGljaCBpcyBwcmV0dHkgc2lsbHkuXG4gICAgICAgIHZhciBwYXJzZXIgPSBuZXcgRE9NUGFyc2VyKCk7XG4gICAgICAgIHZhciBzdmdPYmplY3QgPSBwYXJzZXIucGFyc2VGcm9tU3RyaW5nKHN2ZywgXCJpbWFnZS9zdmcreG1sXCIpO1xuICAgICAgICB2YXIgc3ZnQ2hpbGQgPSBzdmdPYmplY3QuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnZGVmaW5pdGlvbi1zY2FsZScpWzBdO1xuICAgICAgICB2YXIgb1NlcmlhbGl6ZXIgPSBuZXcgWE1MU2VyaWFsaXplcigpO1xuICAgICAgICB0aGlzLnByb3BzLmRyYXdBbm5vdGF0aW9uKHRoaXMucHJvcHMuc2NvcmVBbm5vdGF0aW9ucywgc3ZnQ2hpbGQpO1xuICAgICAgICBzdmcgPSBvU2VyaWFsaXplci5zZXJpYWxpemVUb1N0cmluZyhzdmdPYmplY3QpO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gKFxuICAgICAgICAgIDxkaXYgaWQ9e3RoaXMucHJvcHMudXJpfSBjbGFzc05hbWU9XCJzY29yZXBhbmVcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29udHJvbHNcIi8+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFubm90YXRpb25zXCIvPlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzY29yZVwiIGRhbmdlcm91c2x5U2V0SW5uZXJIVE1MPXt7X19odG1sOiBzdmd9fS8+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICApO1xuICAgIH1cbiAgICByZXR1cm4gPGRpdj5Mb2FkaW5nLi4uPC9kaXY+O1xuICB9XG5cbiAgY29tcG9uZW50RGlkTW91bnQoKSB7XG4gICAgdGhpcy5wcm9wcy5mZXRjaFNjb3JlKHRoaXMucHJvcHMudXJpLCB0aGlzLnByb3BzLm9wdGlvbnMpO1xuICB9XG5cbiAgY29tcG9uZW50RGlkVXBkYXRlKHByZXZQcm9wcywgcHJldlN0YXRlKSB7XG4gICAgbGV0IGFubm90YXRpb25zID0gdGhpcy5wcm9wcy5hbm5vdGF0aW9ucztcbiAgICBpZiAoIUFycmF5LmlzQXJyYXkoYW5ub3RhdGlvbnMpKSB7XG4gICAgICBhbm5vdGF0aW9ucyA9IFthbm5vdGF0aW9uc11cbiAgICB9XG4gICAgLy8gY29uc29sZS5sb2coXCJhbm5vdGF0aW9uczpcIiwgYW5ub3RhdGlvbnMpXG4gICAgaWYgKGFubm90YXRpb25zLmxlbmd0aCAmJiB0eXBlb2YgYW5ub3RhdGlvbnNbMF0gIT09IFwidW5kZWZpbmVkXCIgJiYgXCJAdHlwZVwiIGluIGFubm90YXRpb25zWzBdICYmIGFubm90YXRpb25zWzBdW1wiQHR5cGVcIl0uaW5jbHVkZXMoXCJtZWxkdGVybTp0b3BMZXZlbFwiKSkge1xuICAgICAgLy8gY29uc29sZS5sb2coXCJGb3VuZCBvbGQgTGFycnktbWVsZCBzdHlsZSB0b3BMZXZlbCBhbm5vdGF0aW9uLCBjb252ZXJ0aW5nLi4uXCIpXG4gICAgICBhbm5vdGF0aW9ucyA9IGFubm90YXRpb25zWzBdW1wib2E6aGFzQm9keVwiXVxuICAgIH1cbiAgICBhbm5vdGF0aW9ucy5tYXAoKGFubm90YXRpb24pID0+IHtcbiAgICAgIC8vIGNvbnNvbGUubG9nKFwiYW5ub3RhdGlvbiBpczogXCIsIGFubm90YXRpb24pXG4gICAgICBpZiAodHlwZW9mIGFubm90YXRpb24gPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgIHJldHVyblxuICAgICAgfVxuICAgICAgLy8gZWFjaCBhbm5vdGF0aW9uLi4uXG4gICAgICBhbm5vdGF0aW9uID0gZW5zdXJlQXJyYXkoYW5ub3RhdGlvbiwgXCJvYTpoYXNUYXJnZXRcIik7XG4gICAgICBjb25zdCBmcmFncyA9IGFubm90YXRpb25bXCJvYTpoYXNUYXJnZXRcIl0ubWFwKChhbm5vdGF0aW9uVGFyZ2V0KSA9PiB7XG4gICAgICAgIC8vIGVhY2ggYW5ub3RhdGlvbiB0YXJnZXRcbiAgICAgICAgaWYgKGFubm90YXRpb25UYXJnZXRbXCJAaWRcIl0gaW4gdGhpcy5wcm9wcy5zY29yZS5jb21wb25lbnRUYXJnZXRzKSB7XG4gICAgICAgICAgLy8gaWYgdGhpcyBpcyBteSB0YXJnZXQsIGdyYWIgZnJhZyBpZHMgYWNjb3JkaW5nIHRvIG1lZGlhIHR5cGVcbiAgICAgICAgICBjb25zdCBtZWRpYVR5cGVzID0gT2JqZWN0LmtleXModGhpcy5wcm9wcy5zY29yZS5jb21wb25lbnRUYXJnZXRzW2Fubm90YXRpb25UYXJnZXRbXCJAaWRcIl1dKTtcbiAgICAgICAgICBsZXQgbXlGcmFncyA9IHt9O1xuICAgICAgICAgIG1lZGlhVHlwZXMubWFwKCh0eXBlKSA9PiB7XG4gICAgICAgICAgICBpZiAodHlwZSA9PT0gXCJNRUlcIikge1xuICAgICAgICAgICAgICAvLyBvbmx5IGdyYWIgTVkgZnJhZyBJRHMsIGZvciBUSElTIG1laSBmaWxlXG4gICAgICAgICAgICAgIG15RnJhZ3NbdHlwZV0gPSB0aGlzLnByb3BzLnNjb3JlLmNvbXBvbmVudFRhcmdldHNbYW5ub3RhdGlvblRhcmdldFtcIkBpZFwiXV1bdHlwZV0uZmlsdGVyKChmcmFnKSA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZyYWcuc3Vic3RyKDAsIGZyYWcuaW5kZXhPZihcIiNcIikpID09PSB0aGlzLnByb3BzLnVyaTtcbiAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIC8vVE9ETyB0aGluayBhYm91dCB3aGF0IHRvIGRvIGhlcmUgdG8gZmlsdGVyIChlLmcuIG11bHRpcGxlIGF1ZGlvcylcbiAgICAgICAgICAgICAgbXlGcmFnc1t0eXBlXSA9IHRoaXMucHJvcHMuc2NvcmUuY29tcG9uZW50VGFyZ2V0c1thbm5vdGF0aW9uVGFyZ2V0W1wiQGlkXCJdXVt0eXBlXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KTtcbiAgICAgICAgICAvLyBhbmQgYXBwbHkgYW55IGFubm90YXRpb25zXG4gICAgICAgICAgdGhpcy5oYW5kbGVNRUxEQWN0aW9ucyhhbm5vdGF0aW9uLCBteUZyYWdzKTtcbiAgICAgICAgfSBlbHNlIGlmIChhbm5vdGF0aW9uVGFyZ2V0W1wiQGlkXCJdID09IHRoaXMucHJvcHMuc2Vzc2lvbikge1xuICAgICAgICAgIC8vIHRoaXMgYW5ub3RhdGlvbiBhcHBsaWVzIHRvIHRoZSAqc2Vzc2lvbiosIGUuZy4gYSBwYWdlIHR1cm5cbiAgICAgICAgICB0aGlzLmhhbmRsZU1FTERBY3Rpb25zKGFubm90YXRpb24sIG51bGwpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9KTtcbiAgICBpZiAoT2JqZWN0LmtleXMocHJldlByb3BzLnNjb3JlLnBhZ2VTdGF0ZSkubGVuZ3RoICYmXG4gICAgICAgIHRoaXMucHJvcHMudXJpIGluIHByZXZQcm9wcy5zY29yZS5wYWdlU3RhdGUgJiYgKFxuICAgICAgICBwcmV2UHJvcHMuc2NvcmUucGFnZVN0YXRlW3RoaXMucHJvcHMudXJpXS5jdXJyZW50UGFnZSAhPT0gXG4gICAgICAgICAgdGhpcy5wcm9wcy5zY29yZS5wYWdlU3RhdGVbdGhpcy5wcm9wcy51cmldLmN1cnJlbnRQYWdlIHx8IC8vIG9uIHBhZ2UgZmxpcC4uLlxuICAgICAgICBwcmV2UHJvcHMuc2NvcmUucGFnZVN0YXRlW3RoaXMucHJvcHMudXJpXS5wYWdlQ291bnQgPCBcbiAgICAgICAgICB0aGlzLnByb3BzLnNjb3JlLnBhZ2VTdGF0ZVt0aGlzLnByb3BzLnVyaV0ucGFnZUNvdW50KSAgIC8vIC4uLm9yIGZpcnN0IGxvYWRcbiAgICApIHtcbiAgICAgIC8vIHNpZ25hbCB0aGF0IFZlcm92aW8gaGFzIHJlbmRlcmVkIGEgbmV3IHBhZ2VcbiAgICAgIHRoaXMucHJvcHMudXBkYXRlTGF0ZXN0UmVuZGVyZWRQYWdlTnVtKFxuICAgICAgICB0aGlzLnByb3BzLnNjb3JlLnBhZ2VTdGF0ZVt0aGlzLnByb3BzLnVyaV0uY3VycmVudFBhZ2VcbiAgICAgICk7XG4gICAgfVxuXG4gIH1cblxuICBoYW5kbGVNRUxEQWN0aW9ucyhhbm5vdGF0aW9uLCBmcmFnbWVudHMpIHtcbiAgICAvLyBjb25zb2xlLmxvZyhcIkhBTkRMSU5HIE1FTEQgQUNUSU9OOiBcIiwgYW5ub3RhdGlvbiwgZnJhZ21lbnRzKTtcbiAgICBpZiAoXCJvYTptb3RpdmF0ZWRCeVwiIGluIGFubm90YXRpb24pIHtcbiAgICAgIHN3aXRjaCAoYW5ub3RhdGlvbltcIm9hOm1vdGl2YXRlZEJ5XCJdW1wiQGlkXCJdKSB7XG4gICAgICAgIGNhc2UgXCJvYTpoaWdobGlnaHRpbmdcIjpcbiAgICAgICAgICB0aGlzLnByb3BzLmhhbmRsZUhpZ2hsaWdodChSZWFjdERPTS5maW5kRE9NTm9kZSh0aGlzKSwgYW5ub3RhdGlvbiwgdGhpcy5wcm9wcy51cmksIGZyYWdtZW50c1tcIk1FSVwiXSk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgXCJtb3RpdmF0aW9uOm11emljb2RlSWRlbnRpZnlcIjpcbiAgICAgICAgICB0aGlzLnByb3BzLmhhbmRsZUlkZW50aWZ5TXV6aWNvZGUoUmVhY3RET00uZmluZERPTU5vZGUodGhpcyksIGFubm90YXRpb24sIHRoaXMucHJvcHMudXJpLCBmcmFnbWVudHNbXCJNRUlcIl0pO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIFwibW90aXZhdGlvbjptdXppY29kZUNob2ljZVwiOlxuICAgICAgICAgIHRoaXMucHJvcHMuaGFuZGxlQ2hvaWNlTXV6aWNvZGUoUmVhY3RET00uZmluZERPTU5vZGUodGhpcyksIGFubm90YXRpb24sIHRoaXMucHJvcHMudXJpLCBmcmFnbWVudHNbXCJNRUlcIl0pO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIFwibW90aXZhdGlvbjptdXppY29kZUNoYWxsZW5nZVBhc3NlZFwiOlxuICAgICAgICAgIHRoaXMucHJvcHMuaGFuZGxlQ2hhbGxlbmdlUGFzc2VkKFJlYWN0RE9NLmZpbmRET01Ob2RlKHRoaXMpLCBhbm5vdGF0aW9uLCB0aGlzLnByb3BzLnVyaSwgZnJhZ21lbnRzW1wiTUVJXCJdKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBcIm1vdGl2YXRpb246bXV6aWNvZGVEaXNrbGF2aWVyU3RhcnRcIjpcbiAgICAgICAgICB0aGlzLnByb3BzLmhhbmRsZURpc2tsYXZpZXJTdGFydChSZWFjdERPTS5maW5kRE9NTm9kZSh0aGlzKSwgYW5ub3RhdGlvbiwgdGhpcy5wcm9wcy51cmksIGZyYWdtZW50c1tcIk1FSVwiXSk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgXCJtb3RpdmF0aW9uOm11emljb2RlVHJpZ2dlcmVkXCI6XG4gICAgICAgICAgLy8gZm9yIG11emljb2RlcywgdGhlIGNvbXBvbmVudCB0YXJnZXQgY29udGFpbnMgaW5mb3JtYXRpb24gb24gbXV6aWNvZGUgdHlwZSBhbmQgY2xpbWIgY3VlXG4gICAgICAgICAgY29uc3QgbXV6aWNvZGVUYXJnZXQgPSB0aGlzLnByb3BzLnNjb3JlLmNvbXBvbmVudFRhcmdldHNbYW5ub3RhdGlvbltcIm9hOmhhc1RhcmdldFwiXVswXVtcIkBpZFwiXV07IC8vRklYTUUgaGFuZGxlIG4+MSB0YXJnZXRzXG4gICAgICAgICAgdGhpcy5wcm9wcy5oYW5kbGVNdXppY29kZVRyaWdnZXJlZChSZWFjdERPTS5maW5kRE9NTm9kZSh0aGlzKSwgYW5ub3RhdGlvbiwgdGhpcy5wcm9wcy51cmksIGZyYWdtZW50c1tcIk1FSVwiXSwgbXV6aWNvZGVUYXJnZXQsIHRoaXMucHJvcHMuc2Vzc2lvbiwgdGhpcy5wcm9wcy5uZXh0U2Vzc2lvbiwgdGhpcy5wcm9wcy5ldGFnKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBcIm1vdGl2YXRpb246YXJjaGl2ZWRNdXppY29kZVRyaWdnZXJcIjpcbiAgICAgICAgICBjb25zdCBhcmNoaXZlZE11emljb2RlVGFyZ2V0ID0gdGhpcy5wcm9wcy5zY29yZS5jb21wb25lbnRUYXJnZXRzW2Fubm90YXRpb25bXCJvYTpoYXNUYXJnZXRcIl1bMF1bXCJAaWRcIl1dOyAvL0ZJWE1FIGhhbmRsZSBuPjEgdGFyZ2V0c1xuICAgICAgICAgIHRoaXMucHJvcHMuaGFuZGxlQXJjaGl2ZWRNdXppY29kZVRyaWdnZXIoUmVhY3RET00uZmluZERPTU5vZGUodGhpcyksIGFubm90YXRpb24sIHRoaXMucHJvcHMudXJpLCBmcmFnbWVudHNbXCJNRUlcIl0sIGFyY2hpdmVkTXV6aWNvZGVUYXJnZXQsIHRoaXMucHJvcHMuc2Vzc2lvbiwgdGhpcy5wcm9wcy5uZXh0U2Vzc2lvbik7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgXCJtb3RpdmF0aW9uOm5leHRQYWdlT3JQaWVjZVwiOlxuICAgICAgICAgIC8vIGNvbnNvbGUubG9nKFwiLS0tLVwiLCB0aGlzLnByb3BzKTtcbiAgICAgICAgICB0aGlzLnByb3BzLnNjb3JlTmV4dFBhZ2UodGhpcy5wcm9wcy5zZXNzaW9uLCB0aGlzLnByb3BzLm5leHRTZXNzaW9uLCB0aGlzLnByb3BzLmV0YWcsIGFubm90YXRpb24sIHRoaXMucHJvcHMudXJpLCB0aGlzLnByb3BzLnNjb3JlLnBhZ2VTdGF0ZVt0aGlzLnByb3BzLnVyaV0uY3VycmVudFBhZ2UsIHRoaXMucHJvcHMuc2NvcmUuTUVJW3RoaXMucHJvcHMudXJpXSk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgXCJtb3RpdmF0aW9uOnByZXZQYWdlT3JQaWVjZVwiOlxuICAgICAgICAgIC8vIGNvbnNvbGUubG9nKFwiLS0tLVwiLCB0aGlzLnByb3BzKTtcbiAgICAgICAgICB0aGlzLnByb3BzLnNjb3JlUHJldlBhZ2UodGhpcy5wcm9wcy5zZXNzaW9uLCB0aGlzLnByb3BzLm5leHRTZXNzaW9uLCB0aGlzLnByb3BzLmV0YWcsIGFubm90YXRpb24sIHRoaXMucHJvcHMudXJpLCB0aGlzLnByb3BzLnNjb3JlLnBhZ2VTdGF0ZVt0aGlzLnByb3BzLnVyaV0uY3VycmVudFBhZ2UsIHRoaXMucHJvcHMuc2NvcmUuTUVJW3RoaXMucHJvcHMudXJpXSk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgXCJtb3RpdmF0aW9uOnF1ZXVlTmV4dFNlc3Npb25cIjpcbiAgICAgICAgICB0aGlzLnByb3BzLmhhbmRsZVF1ZXVlTmV4dFNlc3Npb24odGhpcy5wcm9wcy5zZXNzaW9uLCB0aGlzLnByb3BzLmV0YWcsIGFubm90YXRpb24pO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIFwibW90aXZhdGlvbjpjcmVhdGVOZXh0U2Vzc2lvblwiOlxuICAgICAgICAgIHRoaXMucHJvcHMuaGFuZGxlQ3JlYXRlTmV4dFNlc3Npb24odGhpcy5wcm9wcy5zZXNzaW9uLCB0aGlzLnByb3BzLmV0YWcsIGFubm90YXRpb24pO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIFwibW90aXZhdGlvbjp0cmFuc2l0aW9uVG9OZXh0U2Vzc2lvblwiOlxuICAgICAgICAgIHRoaXMucHJvcHMuaGFuZGxlVHJhbnNpdGlvblRvTmV4dFNlc3Npb24odGhpcy5wcm9wcy5zZXNzaW9uLCB0aGlzLnByb3BzLmV0YWcsIGFubm90YXRpb24pO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgIGNvbnNvbGUubG9nKFwiVW5rbm93biBtb3RpdmF0aW9uOiBcIiwgYW5ub3RhdGlvbltcIm9hOm1vdGl2YXRlZEJ5XCJdKTtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKEhBU19CT0RZIGluIGFubm90YXRpb24pIHtcbiAgICAgIGFubm90YXRpb25bSEFTX0JPRFldLm1hcCgoYikgPT4ge1xuICAgICAgICAvLyBUT0RPIGNvbnZlcnQgdG8gc3dpdGNoIHN0YXRlbWVudFxuICAgICAgICBpZiAoYltcIkBpZFwiXSA9PT0gTUFSS1VQX0VNUEhBU0lTKSB7XG4gICAgICAgICAgdGhpcy5wcm9wcy5oYW5kbGVFbXBoYXNpcyhSZWFjdERPTS5maW5kRE9NTm9kZSh0aGlzKSwgYW5ub3RhdGlvbiwgdGhpcy5wcm9wcy51cmksIGZyYWdtZW50c1tcIk1FSVwiXSk7XG4gICAgICAgIH0gZWxzZSBpZiAoYltcIkBpZFwiXSA9PT0gTUFSS1VQX0hJR0hMSUdIVCkge1xuICAgICAgICAgIHRoaXMucHJvcHMuaGFuZGxlSGlnaGxpZ2h0KFJlYWN0RE9NLmZpbmRET01Ob2RlKHRoaXMpLCBhbm5vdGF0aW9uLCB0aGlzLnByb3BzLnVyaSwgZnJhZ21lbnRzW1wiTUVJXCJdKTtcbiAgICAgICAgfSBlbHNlIGlmIChiW1wiQGlkXCJdID09PSBNQVJLVVBfSElHSExJR0hUMikge1xuICAgICAgICAgIHRoaXMucHJvcHMuaGFuZGxlSGlnaGxpZ2h0MihSZWFjdERPTS5maW5kRE9NTm9kZSh0aGlzKSwgYW5ub3RhdGlvbiwgdGhpcy5wcm9wcy51cmksIGZyYWdtZW50c1tcIk1FSVwiXSk7XG4gICAgICAgIH0gZWxzZSBpZiAoYltcIkBpZFwiXSA9PT0gQ1VFX0FVRElPKSB7XG4gICAgICAgICAgdGhpcy5wcm9wcy5oYW5kbGVDdWVBdWRpbyhSZWFjdERPTS5maW5kRE9NTm9kZSh0aGlzKSwgYW5ub3RhdGlvbiwgYiwgdGhpcy5wcm9wcy51cmksIGZyYWdtZW50cyk7XG4gICAgICAgIH0gZWxzZSBpZiAoYltcIkBpZFwiXSA9PT0gQ1VFX1ZJREVPKSB7XG4gICAgICAgICAgdGhpcy5wcm9wcy5oYW5kbGVDdWVWaWRlbyhSZWFjdERPTS5maW5kRE9NTm9kZSh0aGlzKSwgYW5ub3RhdGlvbiwgYiwgdGhpcy5wcm9wcy51cmksIGZyYWdtZW50cyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgY29uc29sZS5sb2coXCJTY29yZSBjb21wb25lbnQgdW5hYmxlIHRvIGhhbmRsZSBtZWxkIGFjdGlvbjogXCIsIGIpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICAgIC8vIEZJWE1FOiB0aGUgYWJvdmUgc2hvdWxkIGJlIHBoYXNlZCBvdXQgYXMgd2UgbW92ZSBpbnRvXG4gICAgICAvLyB1c2luZyBtb3RpdmF0aW9ucyBpbnN0ZWFkIG9mIGJvZGllcyBmb3IgcmVuZGVyaW5nIGluc3RydWN0aW9uc1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zb2xlLmxvZyhcIlNraXBwaW5nIGFubm90YXRpb24gd2l0aG91dCByZW5kZXJpbmcgaW5zdHJ1Y3Rpb25zOiBcIiwgYW5ub3RhdGlvbilcbiAgICB9XG4gIH1cbn1cblxuZnVuY3Rpb24gbWFwU3RhdGVUb1Byb3BzKHtzY29yZX0pIHtcbiAgcmV0dXJuIHtzY29yZX07XG59XG5cbmZ1bmN0aW9uIG1hcERpc3BhdGNoVG9Qcm9wcyhkaXNwYXRjaCkge1xuICByZXR1cm4gYmluZEFjdGlvbkNyZWF0b3JzKHtcbiAgICBmZXRjaFNjb3JlLFxuICAgIHVwZGF0ZUxhdGVzdFJlbmRlcmVkUGFnZU51bSxcbiAgICBoYW5kbGVFbXBoYXNpcyxcbiAgICBoYW5kbGVIaWdobGlnaHQsXG4gICAgaGFuZGxlSGlnaGxpZ2h0MixcbiAgICBoYW5kbGVDdWVBdWRpbyxcbiAgICBoYW5kbGVDdWVWaWRlbyxcbiAgICBzY29yZVByZXZQYWdlLFxuICAgIHNjb3JlTmV4dFBhZ2UsXG4gICAgaGFuZGxlUXVldWVOZXh0U2Vzc2lvbixcbiAgICBoYW5kbGVDcmVhdGVOZXh0U2Vzc2lvbixcbiAgICBoYW5kbGVUcmFuc2l0aW9uVG9OZXh0U2Vzc2lvbixcbiAgICBoYW5kbGVJZGVudGlmeU11emljb2RlLFxuICAgIGhhbmRsZUNob2ljZU11emljb2RlLFxuICAgIGhhbmRsZUNoYWxsZW5nZVBhc3NlZCxcbiAgICBoYW5kbGVEaXNrbGF2aWVyU3RhcnQsXG4gICAgaGFuZGxlTXV6aWNvZGVUcmlnZ2VyZWQsXG4gICAgaGFuZGxlQXJjaGl2ZWRNdXppY29kZVRyaWdnZXJcbiAgfSwgZGlzcGF0Y2gpO1xufVxuXG5leHBvcnQgZGVmYXVsdCBjb25uZWN0KG1hcFN0YXRlVG9Qcm9wcywgbWFwRGlzcGF0Y2hUb1Byb3BzLCBudWxsLCB7Zm9yd2FyZFJlZjogdHJ1ZX0pKFNjb3JlKTtcbiJdfQ==