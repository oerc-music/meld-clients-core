"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _index = require("../actions/index");

var _reactRedux = require("react-redux");

var _redux = require("redux");

var _reactRouter = require("react-router");

var _querystring = require("querystring");

var _score = _interopRequireDefault(require("../containers/score"));

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

var muzicodesUri = "http://localhost:3000/input";

var Climb = /*#__PURE__*/function (_Component) {
  _inherits(Climb, _Component);

  var _super = _createSuper(Climb);

  function Climb(props) {
    var _this;

    _classCallCheck(this, Climb);

    _this = _super.call(this, props);
    _this.monitorKeys = _this.monitorKeys.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(Climb, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      document.addEventListener('keydown', this.monitorKeys);
      var qpars = (0, _querystring.parse)(this.props.location.search.slice(1)); // slice above to remove leading '?'

      console.log("qpars", qpars);

      if ("session" in qpars) {
        // start polling
        this.doPoll();
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      // clean up...
      document.removeEventListener('keydown', this.monitorKeys);
    }
  }, {
    key: "monitorKeys",
    value: function monitorKeys(ev) {
      if (this.props.graph && this.props.graph.annoGraph) {
        var session = this.props.graph.annoGraph["@id"];
        var etag = this.props.graph.etags[session];

        switch (ev.which) {
          case 34: //page down

          case 39: //right

          case 40:
            //down
            console.log('next (key)');
            ev.preventDefault();
            this.props.postNextPageAnnotation(session, etag);
            break;

          case 33: //page up

          case 37: //left

          case 38:
            //up
            console.log('prev (key)');
            ev.preventDefault();
            this.props.postPrevPageAnnotation(session, etag);
            break;

          default:
            console.log('ignore key: ' + ev.which);
        }
      }
    }
  }, {
    key: "doPoll",
    value: function doPoll() {
      var _this2 = this;

      var qpars = (0, _querystring.parse)(this.props.location.search.slice(1));
      var graphUri = "session" in qpars ? qpars["session"] : null;

      if ('etags' in this.props.graph && graphUri in this.props.graph.etags) {
        this.props.fetchSessionGraph(graphUri, this.props.graph.etags[graphUri]);
      } else {
        this.props.fetchSessionGraph(graphUri);
      }

      setTimeout(function () {
        return _this2.doPoll();
      }, 2000);
    }
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;

      if (this.props.score.publishedScores) {
        if (this.props.score.triggerNextSession) {
          // have we got a next session queued up?
          if (this.props.sessionControl.newSessionUri) {
            this.props.transitionToSession(this.props.graph.annoGraph["@id"], "/Climb?session=" + this.props.sessionControl.newSessionUri);
            return /*#__PURE__*/_react["default"].createElement("div", null, "Loading next session...");
          } else {
            // if not, ignore this request and reset trigger
            this.props.resetNextSessionTrigger();
          }
        }

        console.log("Climb props: ", this.props); //if(this.props.graph.targetsById) {

        var session = "";
        var etag = "";

        if (this.props.graph && this.props.graph.annoGraph) {
          session = this.props.graph.annoGraph["@id"];
          etag = this.props.graph.etags[session];
          console.log("session: ", session, " etag: ", etag, " etags: ", this.props.graph.etags);
        }

        var byId = this.props.graph.targetsById;
        var publishedScores = this.props.score.publishedScores;
        var conceptualScores = this.props.score.conceptualScores;
        var scores = Object.keys(publishedScores).map(function (pS) {
          console.log("MAP ON PS: ", pS); //return <Score key={ sc } uri={ sc } annotations={ byId[sc]["annotations"] } />;

          var cS = publishedScores[pS];
          var annotationTargets = conceptualScores[cS];
          var currentCSPretty = cS.substring(cS.lastIndexOf('/') + 1);
          var nextCS = _this3.props.sessionControl.newSessionScore;
          var nextCSPretty = nextCS ? nextCS.substring(nextCS.lastIndexOf('/') + 1) : "";
          var annotations = Object.keys(byId).map(function (t) {
            if (annotationTargets && annotationTargets.includes(t)) {
              return byId[t].annotations;
            }
          });
          console.log("Flattening array:", annotations);
          annotations = annotations.reduce(function (a, b) {
            return a.concat(b);
          }, []);
          console.log("WORKING WITH (flattened):", annotations); // if required, inform muzicodes

          if (!_this3.props.sessionControl.muzicodesUpdated) {
            _this3.props.updateMuzicodes(muzicodesUri, _this3.props.graph.annoGraph["@id"], pS);
          }

          return /*#__PURE__*/_react["default"].createElement("div", {
            key: "wrapper" + pS
          }, /*#__PURE__*/_react["default"].createElement("div", {
            id: "indicatorBar"
          }, /*#__PURE__*/_react["default"].createElement("button", {
            id: "prevButton",
            key: "prev" + pS,
            onClick: function onClick() {
              console.log("prev clicked, ps: ", pS, _this3.props.score.pageNum, _this3.props.score.MEI);

              _this3.props.postPrevPageAnnotation(session, etag);
            }
          }, " Previous"), /*#__PURE__*/_react["default"].createElement("button", {
            id: "nextButton",
            key: "next" + pS,
            onClick: function onClick() {
              console.log("next clicked, ps: ", pS, _this3.props.score.pageNum, _this3.props.score.MEI);

              _this3.props.postNextPageAnnotation(session, etag);
            }
          }, " Next"), /*#__PURE__*/_react["default"].createElement("span", {
            id: "indicator"
          }, "Current: ", /*#__PURE__*/_react["default"].createElement("span", {
            id: "indicatorCurrent"
          }, " ", currentCSPretty, " "), " | Page ", _this3.props.score.pageNum, " of ", _this3.props.score.pageCount, " | Queued: ", /*#__PURE__*/_react["default"].createElement("span", {
            id: "indicatorQueued"
          }, " ", nextCSPretty, " "))), /*#__PURE__*/_react["default"].createElement(_score["default"], {
            key: pS,
            uri: pS,
            annotations: annotations,
            session: session,
            etag: etag,
            nextSession: _this3.props.sessionControl.newSessionUri
          }));
        });
        return /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement("link", {
          rel: "stylesheet",
          href: "../../style/climb.css",
          type: "text/css"
        }), /*#__PURE__*/_react["default"].createElement("div", {
          id: "annotations"
        }), scores);
      }

      return /*#__PURE__*/_react["default"].createElement("div", null, "Loading...");
    }
  }]);

  return Climb;
}(_react.Component);

function mapStateToProps(_ref) {
  var graph = _ref.graph,
      score = _ref.score,
      sessionControl = _ref.sessionControl;
  return {
    graph: graph,
    score: score,
    sessionControl: sessionControl
  };
}

function mapDispatchToProps(dispatch) {
  return (0, _redux.bindActionCreators)({
    fetchSessionGraph: _index.fetchSessionGraph,
    scorePrevPage: _index.scorePrevPage,
    postPrevPageAnnotation: _index.postPrevPageAnnotation,
    scoreNextPage: _index.scoreNextPage,
    postNextPageAnnotation: _index.postNextPageAnnotation,
    transitionToSession: _index.transitionToSession,
    resetNextSessionTrigger: _index.resetNextSessionTrigger,
    updateMuzicodes: _index.updateMuzicodes
  }, dispatch);
}

(0, _reactRouter.withRouter)(Climb);

var _default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(Climb);

exports["default"] = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb250YWluZXJzL2NsaW1iLmpzIl0sIm5hbWVzIjpbIm11emljb2Rlc1VyaSIsIkNsaW1iIiwicHJvcHMiLCJtb25pdG9yS2V5cyIsImJpbmQiLCJkb2N1bWVudCIsImFkZEV2ZW50TGlzdGVuZXIiLCJxcGFycyIsImxvY2F0aW9uIiwic2VhcmNoIiwic2xpY2UiLCJjb25zb2xlIiwibG9nIiwiZG9Qb2xsIiwicmVtb3ZlRXZlbnRMaXN0ZW5lciIsImV2IiwiZ3JhcGgiLCJhbm5vR3JhcGgiLCJzZXNzaW9uIiwiZXRhZyIsImV0YWdzIiwid2hpY2giLCJwcmV2ZW50RGVmYXVsdCIsInBvc3ROZXh0UGFnZUFubm90YXRpb24iLCJwb3N0UHJldlBhZ2VBbm5vdGF0aW9uIiwiZ3JhcGhVcmkiLCJmZXRjaFNlc3Npb25HcmFwaCIsInNldFRpbWVvdXQiLCJzY29yZSIsInB1Ymxpc2hlZFNjb3JlcyIsInRyaWdnZXJOZXh0U2Vzc2lvbiIsInNlc3Npb25Db250cm9sIiwibmV3U2Vzc2lvblVyaSIsInRyYW5zaXRpb25Ub1Nlc3Npb24iLCJyZXNldE5leHRTZXNzaW9uVHJpZ2dlciIsImJ5SWQiLCJ0YXJnZXRzQnlJZCIsImNvbmNlcHR1YWxTY29yZXMiLCJzY29yZXMiLCJPYmplY3QiLCJrZXlzIiwibWFwIiwicFMiLCJjUyIsImFubm90YXRpb25UYXJnZXRzIiwiY3VycmVudENTUHJldHR5Iiwic3Vic3RyaW5nIiwibGFzdEluZGV4T2YiLCJuZXh0Q1MiLCJuZXdTZXNzaW9uU2NvcmUiLCJuZXh0Q1NQcmV0dHkiLCJhbm5vdGF0aW9ucyIsInQiLCJpbmNsdWRlcyIsInJlZHVjZSIsImEiLCJiIiwiY29uY2F0IiwibXV6aWNvZGVzVXBkYXRlZCIsInVwZGF0ZU11emljb2RlcyIsInBhZ2VOdW0iLCJNRUkiLCJwYWdlQ291bnQiLCJDb21wb25lbnQiLCJtYXBTdGF0ZVRvUHJvcHMiLCJtYXBEaXNwYXRjaFRvUHJvcHMiLCJkaXNwYXRjaCIsInNj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OlsiaW1wb3J0IFJlYWN0LCB7Q29tcG9uZW50fSBmcm9tICdyZWFjdCc7XG5pbXBvcnQge1xuICBmZXRjaFNlc3Npb25HcmFwaCxcbiAgcG9zdE5leHRQYWdlQW5ub3RhdGlvbixcbiAgcG9zdFByZXZQYWdlQW5ub3RhdGlvbixcbiAgcmVzZXROZXh0U2Vzc2lvblRyaWdnZXIsXG4gIHNjb3JlTmV4dFBhZ2UsXG4gIHNjb3JlUHJldlBhZ2UsXG4gIHRyYW5zaXRpb25Ub1Nlc3Npb24sXG4gIHVwZGF0ZU11emljb2Rlc1xufSBmcm9tICcuLi9hY3Rpb25zL2luZGV4JztcbmltcG9ydCB7Y29ubmVjdH0gZnJvbSAncmVhY3QtcmVkdXgnO1xuaW1wb3J0IHtiaW5kQWN0aW9uQ3JlYXRvcnN9IGZyb20gJ3JlZHV4JztcbmltcG9ydCB7d2l0aFJvdXRlcn0gZnJvbSAncmVhY3Qtcm91dGVyJztcbmltcG9ydCB7cGFyc2V9IGZyb20gJ3F1ZXJ5c3RyaW5nJztcbmltcG9ydCBTY29yZSBmcm9tICcuLi9jb250YWluZXJzL3Njb3JlJztcblxuY29uc3QgbXV6aWNvZGVzVXJpID0gXCJodHRwOi8vbG9jYWxob3N0OjMwMDAvaW5wdXRcIjtcblxuY2xhc3MgQ2xpbWIgZXh0ZW5kcyBDb21wb25lbnQge1xuICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgIHN1cGVyKHByb3BzKTtcbiAgICB0aGlzLm1vbml0b3JLZXlzID0gdGhpcy5tb25pdG9yS2V5cy5iaW5kKHRoaXMpO1xuICB9XG5cbiAgY29tcG9uZW50RGlkTW91bnQoKSB7XG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIHRoaXMubW9uaXRvcktleXMpO1xuICAgIGNvbnN0IHFwYXJzID0gcGFyc2UodGhpcy5wcm9wcy5sb2NhdGlvbi5zZWFyY2guc2xpY2UoMSkpO1xuICAgIC8vIHNsaWNlIGFib3ZlIHRvIHJlbW92ZSBsZWFkaW5nICc/J1xuICAgIGNvbnNvbGUubG9nKFwicXBhcnNcIiwgcXBhcnMpO1xuICAgIGlmIChcInNlc3Npb25cIiBpbiBxcGFycykge1xuICAgICAgLy8gc3RhcnQgcG9sbGluZ1xuICAgICAgdGhpcy5kb1BvbGwoKTtcbiAgICB9XG5cbiAgfVxuXG4gIGNvbXBvbmVudFdpbGxVbm1vdW50KCkge1xuICAgIC8vIGNsZWFuIHVwLi4uXG4gICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIHRoaXMubW9uaXRvcktleXMpO1xuICB9XG5cbiAgbW9uaXRvcktleXMoZXYpIHtcbiAgICBpZiAodGhpcy5wcm9wcy5ncmFwaCAmJiB0aGlzLnByb3BzLmdyYXBoLmFubm9HcmFwaCkge1xuICAgICAgY29uc3Qgc2Vzc2lvbiA9IHRoaXMucHJvcHMuZ3JhcGguYW5ub0dyYXBoW1wiQGlkXCJdO1xuICAgICAgY29uc3QgZXRhZyA9IHRoaXMucHJvcHMuZ3JhcGguZXRhZ3Nbc2Vzc2lvbl07XG4gICAgICBzd2l0Y2ggKGV2LndoaWNoKSB7XG4gICAgICAgIGNhc2UgMzQ6Ly9wYWdlIGRvd25cbiAgICAgICAgY2FzZSAzOTovL3JpZ2h0XG4gICAgICAgIGNhc2UgNDA6Ly9kb3duXG4gICAgICAgICAgY29uc29sZS5sb2coJ25leHQgKGtleSknKTtcbiAgICAgICAgICBldi5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgIHRoaXMucHJvcHMucG9zdE5leHRQYWdlQW5ub3RhdGlvbihzZXNzaW9uLCBldGFnKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAzMzovL3BhZ2UgdXBcbiAgICAgICAgY2FzZSAzNzovL2xlZnRcbiAgICAgICAgY2FzZSAzODovL3VwXG4gICAgICAgICAgY29uc29sZS5sb2coJ3ByZXYgKGtleSknKTtcbiAgICAgICAgICBldi5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgIHRoaXMucHJvcHMucG9zdFByZXZQYWdlQW5ub3RhdGlvbihzZXNzaW9uLCBldGFnKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICBjb25zb2xlLmxvZygnaWdub3JlIGtleTogJyArIGV2LndoaWNoKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBkb1BvbGwoKSB7XG4gICAgY29uc3QgcXBhcnMgPSBwYXJzZSh0aGlzLnByb3BzLmxvY2F0aW9uLnNlYXJjaC5zbGljZSgxKSk7XG4gICAgY29uc3QgZ3JhcGhVcmkgPSBcInNlc3Npb25cIiBpbiBxcGFycyA/IHFwYXJzW1wic2Vzc2lvblwiXSA6IG51bGw7XG4gICAgaWYgKCdldGFncycgaW4gdGhpcy5wcm9wcy5ncmFwaCAmJlxuICAgICAgICBncmFwaFVyaSBpbiB0aGlzLnByb3BzLmdyYXBoLmV0YWdzKSB7XG4gICAgICB0aGlzLnByb3BzLmZldGNoU2Vzc2lvbkdyYXBoKGdyYXBoVXJpLCB0aGlzLnByb3BzLmdyYXBoLmV0YWdzW2dyYXBoVXJpXSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMucHJvcHMuZmV0Y2hTZXNzaW9uR3JhcGgoZ3JhcGhVcmkpO1xuICAgIH1cbiAgICBzZXRUaW1lb3V0KCgpID0+IHRoaXMuZG9Qb2xsKCksIDIwMDApO1xuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIGlmICh0aGlzLnByb3BzLnNjb3JlLnB1Ymxpc2hlZFNjb3Jlcykge1xuICAgICAgaWYgKHRoaXMucHJvcHMuc2NvcmUudHJpZ2dlck5leHRTZXNzaW9uKSB7XG4gICAgICAgIC8vIGhhdmUgd2UgZ290IGEgbmV4dCBzZXNzaW9uIHF1ZXVlZCB1cD9cbiAgICAgICAgaWYgKHRoaXMucHJvcHMuc2Vzc2lvbkNvbnRyb2wubmV3U2Vzc2lvblVyaSkge1xuICAgICAgICAgIHRoaXMucHJvcHMudHJhbnNpdGlvblRvU2Vzc2lvbihcbiAgICAgICAgICAgICAgdGhpcy5wcm9wcy5ncmFwaC5hbm5vR3JhcGhbXCJAaWRcIl0sXG4gICAgICAgICAgICAgIFwiL0NsaW1iP3Nlc3Npb249XCIgKyB0aGlzLnByb3BzLnNlc3Npb25Db250cm9sLm5ld1Nlc3Npb25VcmlcbiAgICAgICAgICApO1xuICAgICAgICAgIHJldHVybiA8ZGl2PkxvYWRpbmcgbmV4dCBzZXNzaW9uLi4uPC9kaXY+XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgLy8gaWYgbm90LCBpZ25vcmUgdGhpcyByZXF1ZXN0IGFuZCByZXNldCB0cmlnZ2VyXG4gICAgICAgICAgdGhpcy5wcm9wcy5yZXNldE5leHRTZXNzaW9uVHJpZ2dlcigpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBjb25zb2xlLmxvZyhcIkNsaW1iIHByb3BzOiBcIiwgdGhpcy5wcm9wcyk7XG4gICAgICAvL2lmKHRoaXMucHJvcHMuZ3JhcGgudGFyZ2V0c0J5SWQpIHtcbiAgICAgIGxldCBzZXNzaW9uID0gXCJcIjtcbiAgICAgIGxldCBldGFnID0gXCJcIjtcbiAgICAgIGlmICh0aGlzLnByb3BzLmdyYXBoICYmIHRoaXMucHJvcHMuZ3JhcGguYW5ub0dyYXBoKSB7XG4gICAgICAgIHNlc3Npb24gPSB0aGlzLnByb3BzLmdyYXBoLmFubm9HcmFwaFtcIkBpZFwiXTtcbiAgICAgICAgZXRhZyA9IHRoaXMucHJvcHMuZ3JhcGguZXRhZ3Nbc2Vzc2lvbl07XG4gICAgICAgIGNvbnNvbGUubG9nKFwic2Vzc2lvbjogXCIsIHNlc3Npb24sIFwiIGV0YWc6IFwiLCBldGFnLCBcIiBldGFnczogXCIsIHRoaXMucHJvcHMuZ3JhcGguZXRhZ3MpO1xuXG4gICAgICB9XG5cbiAgICAgIGNvbnN0IGJ5SWQgPSB0aGlzLnByb3BzLmdyYXBoLnRhcmdldHNCeUlkO1xuICAgICAgY29uc3QgcHVibGlzaGVkU2NvcmVzID0gdGhpcy5wcm9wcy5zY29yZS5wdWJsaXNoZWRTY29yZXM7XG4gICAgICBjb25zdCBjb25jZXB0dWFsU2NvcmVzID0gdGhpcy5wcm9wcy5zY29yZS5jb25jZXB0dWFsU2NvcmVzO1xuXG4gICAgICBjb25zdCBzY29yZXMgPSBPYmplY3Qua2V5cyhwdWJsaXNoZWRTY29yZXMpLm1hcCgocFMpID0+IHtcbiAgICAgICAgY29uc29sZS5sb2coXCJNQVAgT04gUFM6IFwiLCBwUyk7XG4gICAgICAgIC8vcmV0dXJuIDxTY29yZSBrZXk9eyBzYyB9IHVyaT17IHNjIH0gYW5ub3RhdGlvbnM9eyBieUlkW3NjXVtcImFubm90YXRpb25zXCJdIH0gLz47XG4gICAgICAgIGNvbnN0IGNTID0gcHVibGlzaGVkU2NvcmVzW3BTXTtcbiAgICAgICAgY29uc3QgYW5ub3RhdGlvblRhcmdldHMgPSBjb25jZXB0dWFsU2NvcmVzW2NTXTtcbiAgICAgICAgY29uc3QgY3VycmVudENTUHJldHR5ID0gY1Muc3Vic3RyaW5nKGNTLmxhc3RJbmRleE9mKCcvJykgKyAxKTtcbiAgICAgICAgY29uc3QgbmV4dENTID0gdGhpcy5wcm9wcy5zZXNzaW9uQ29udHJvbC5uZXdTZXNzaW9uU2NvcmU7XG4gICAgICAgIGNvbnN0IG5leHRDU1ByZXR0eSA9IG5leHRDUyA/IG5leHRDUy5zdWJzdHJpbmcobmV4dENTLmxhc3RJbmRleE9mKCcvJykgKyAxKSA6IFwiXCI7XG4gICAgICAgIGxldCBhbm5vdGF0aW9ucyA9IE9iamVjdC5rZXlzKGJ5SWQpLm1hcCgodCkgPT4ge1xuICAgICAgICAgIGlmIChhbm5vdGF0aW9uVGFyZ2V0cyAmJiBhbm5vdGF0aW9uVGFyZ2V0cy5pbmNsdWRlcyh0KSkge1xuICAgICAgICAgICAgcmV0dXJuIGJ5SWRbdF0uYW5ub3RhdGlvbnNcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICBjb25zb2xlLmxvZyhcIkZsYXR0ZW5pbmcgYXJyYXk6XCIsIGFubm90YXRpb25zKTtcbiAgICAgICAgYW5ub3RhdGlvbnMgPSBhbm5vdGF0aW9ucy5yZWR1Y2UoKGEsIGIpID0+IGEuY29uY2F0KGIpLCBbXSk7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiV09SS0lORyBXSVRIIChmbGF0dGVuZWQpOlwiLCBhbm5vdGF0aW9ucyk7XG5cbiAgICAgICAgLy8gaWYgcmVxdWlyZWQsIGluZm9ybSBtdXppY29kZXNcbiAgICAgICAgaWYgKCF0aGlzLnByb3BzLnNlc3Npb25Db250cm9sLm11emljb2Rlc1VwZGF0ZWQpIHtcbiAgICAgICAgICB0aGlzLnByb3BzLnVwZGF0ZU11emljb2RlcyhtdXppY29kZXNVcmksIHRoaXMucHJvcHMuZ3JhcGguYW5ub0dyYXBoW1wiQGlkXCJdLCBwUylcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2IGtleT17XCJ3cmFwcGVyXCIgKyBwU30+XG4gICAgICAgICAgICAgIDxkaXYgaWQ9XCJpbmRpY2F0b3JCYXJcIj5cbiAgICAgICAgICAgICAgICA8YnV0dG9uIGlkPVwicHJldkJ1dHRvblwiIGtleT17XCJwcmV2XCIgKyBwU30gb25DbGljaz17KCkgPT4ge1xuICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJwcmV2IGNsaWNrZWQsIHBzOiBcIiwgcFMsIHRoaXMucHJvcHMuc2NvcmUucGFnZU51bSwgdGhpcy5wcm9wcy5zY29yZS5NRUkpO1xuICAgICAgICAgICAgICAgICAgdGhpcy5wcm9wcy5wb3N0UHJldlBhZ2VBbm5vdGF0aW9uKHNlc3Npb24sIGV0YWcpO1xuICAgICAgICAgICAgICAgIH19PiBQcmV2aW91c1xuICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgIDxidXR0b24gaWQ9XCJuZXh0QnV0dG9uXCIga2V5PXtcIm5leHRcIiArIHBTfSBvbkNsaWNrPXsoKSA9PiB7XG4gICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIm5leHQgY2xpY2tlZCwgcHM6IFwiLCBwUywgdGhpcy5wcm9wcy5zY29yZS5wYWdlTnVtLCB0aGlzLnByb3BzLnNjb3JlLk1FSSk7XG4gICAgICAgICAgICAgICAgICB0aGlzLnByb3BzLnBvc3ROZXh0UGFnZUFubm90YXRpb24oc2Vzc2lvbiwgZXRhZyk7XG4gICAgICAgICAgICAgICAgfX0+IE5leHRcbiAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICA8c3BhbiBpZD1cImluZGljYXRvclwiPlxuXHRcdFx0XHRcdFx0XHRcdEN1cnJlbnQ6IDxzcGFuIGlkPVwiaW5kaWNhdG9yQ3VycmVudFwiPiB7Y3VycmVudENTUHJldHR5fSA8L3NwYW4+IHxcblx0XHRcdFx0XHRcdFx0XHRQYWdlIHt0aGlzLnByb3BzLnNjb3JlLnBhZ2VOdW19IG9mIHt0aGlzLnByb3BzLnNjb3JlLnBhZ2VDb3VudH0gfFxuXHRcdFx0XHRcdFx0XHRcdFF1ZXVlZDogPHNwYW4gaWQ9XCJpbmRpY2F0b3JRdWV1ZWRcIj4ge25leHRDU1ByZXR0eX0gPC9zcGFuPlxuXHRcdFx0XHRcdFx0XHQ8L3NwYW4+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICA8U2NvcmUga2V5PXtwU30gdXJpPXtwU30gYW5ub3RhdGlvbnM9e2Fubm90YXRpb25zfSBzZXNzaW9uPXtzZXNzaW9ufSBldGFnPXtldGFnfVxuICAgICAgICAgICAgICAgICAgICAgbmV4dFNlc3Npb249e3RoaXMucHJvcHMuc2Vzc2lvbkNvbnRyb2wubmV3U2Vzc2lvblVyaX0vPlxuXG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKVxuICAgICAgfSk7XG4gICAgICByZXR1cm4gKFxuICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICA8bGluayByZWw9XCJzdHlsZXNoZWV0XCIgaHJlZj1cIi4uLy4uL3N0eWxlL2NsaW1iLmNzc1wiIHR5cGU9XCJ0ZXh0L2Nzc1wiLz5cbiAgICAgICAgICAgIDxkaXYgaWQ9XCJhbm5vdGF0aW9uc1wiPjwvZGl2PlxuICAgICAgICAgICAge3Njb3Jlc31cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgIClcbiAgICB9XG4gICAgcmV0dXJuICg8ZGl2PkxvYWRpbmcuLi48L2Rpdj4pO1xuICB9XG5cbn1cblxuZnVuY3Rpb24gbWFwU3RhdGVUb1Byb3BzKHtncmFwaCwgc2NvcmUsIHNlc3Npb25Db250cm9sfSkge1xuICByZXR1cm4ge2dyYXBoLCBzY29yZSwgc2Vzc2lvbkNvbnRyb2x9XG59XG5cbmZ1bmN0aW9uIG1hcERpc3BhdGNoVG9Qcm9wcyhkaXNwYXRjaCkge1xuICByZXR1cm4gYmluZEFjdGlvbkNyZWF0b3JzKHtcbiAgICBmZXRjaFNlc3Npb25HcmFwaCxcbiAgICBzY29yZVByZXZQYWdlLFxuICAgIHBvc3RQcmV2UGFnZUFubm90YXRpb24sXG4gICAgc2NvcmVOZXh0UGFnZSxcbiAgICBwb3N0TmV4dFBhZ2VBbm5vdGF0aW9uLFxuICAgIHRyYW5zaXRpb25Ub1Nlc3Npb24sXG4gICAgcmVzZXROZXh0U2Vzc2lvblRyaWdnZXIsXG4gICAgdXBkYXRlTXV6aWNvZGVzXG4gIH0sIGRpc3BhdGNoKTtcbn1cblxud2l0aFJvdXRlcihDbGltYik7XG5cbmV4cG9ydCBkZWZhdWx0IGNvbm5lY3QobWFwU3RhdGVUb1Byb3BzLCBtYXBEaXNwYXRjaFRvUHJvcHMpKENsaW1iKTtcbiJdfQ==