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

var _score = _interopRequireDefault(require("../containers/score"));

var _annotationsListing = _interopRequireDefault(require("../containers/annotationsListing"));

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

var ClimbArchive = /*#__PURE__*/function (_Component) {
  _inherits(ClimbArchive, _Component);

  var _super = _createSuper(ClimbArchive);

  function ClimbArchive(props) {
    _classCallCheck(this, ClimbArchive);

    return _super.call(this, props);
  }

  _createClass(ClimbArchive, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var graphUri = this.props.location.query.session;
      this.props.fetchSessionGraph(graphUri);
    }
  }, {
    key: "render",
    value: function render() {
      var _this = this;

      console.log("Archive props: ", this.props);

      if (this.props.score.publishedScores) {
        if (this.props.score.triggerNextSession) {
          // have we got a next session queued up?
          if (this.props.graph.nextSession) {
            this.props.transitionToSession(this.props.graph.annoGraph["@id"], "/ClimbArchive?session=" + this.props.graph.nextSession);
            return /*#__PURE__*/_react["default"].createElement("div", null, "Loading next session...");
          } else {
            // if not, ignore this request and reset trigger
            this.props.resetNextSessionTrigger();
          }
        }

        var session = "";
        var etag = "";

        if (this.props.graph && this.props.graph.annoGraph) {
          session = this.props.graph.annoGraph["@id"];
          etag = this.props.graph.etags[session];
        }

        var byId = this.props.graph.targetsById;
        var publishedScores = this.props.score.publishedScores;
        var conceptualScores = this.props.score.conceptualScores;
        var scores = Object.keys(publishedScores).map(function (pS) {
          //return <Score key={ sc } uri={ sc } annotations={ byId[sc]["annotations"] } />;
          var cS = publishedScores[pS];
          var annotationTargets = conceptualScores[cS];
          var annotations = Object.keys(byId).map(function (t) {
            if (annotationTargets && annotationTargets.includes(t)) {
              return byId[t].annotations;
            }
          });
          annotations = annotations.reduce(function (a, b) {
            return a.concat(b);
          }, []);
          return /*#__PURE__*/_react["default"].createElement("div", {
            key: "wrapper" + pS
          }, /*#__PURE__*/_react["default"].createElement(_annotationsListing["default"], {
            annotations: annotations,
            scoreUri: pS
          }), /*#__PURE__*/_react["default"].createElement(_score["default"], {
            key: pS,
            uri: pS,
            annotations: annotations,
            session: session,
            etag: etag,
            nextSession: _this.props.nextSession
          }), /*#__PURE__*/_react["default"].createElement("div", {
            id: "prev",
            key: "prev" + pS,
            onClick: function onClick() {
              console.log("prev clicked, ps: ", pS, _this.props.score.pageNum, _this.props.score.MEI);

              _this.props.scorePrevPageStatic(pS, _this.props.score.pageNum, _this.props.score.MEI[pS]);
            }
          }, " Previous"), /*#__PURE__*/_react["default"].createElement("div", {
            id: "next",
            key: "next" + pS,
            onClick: function onClick() {
              console.log("next clicked, ps: ", pS, _this.props.score.pageNum, _this.props.score.MEI); //this.props.scoreNextPage(pS, this.props.score.pageNum, this.props.score.MEI[pS])

              _this.props.scoreNextPageStatic(pS, _this.props.score.pageNum, _this.props.score.MEI[pS]);
            }
          }, " Next"));
        });
        return /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement("link", {
          rel: "stylesheet",
          href: "../../style/climbArchive.css",
          type: "text/css"
        }), /*#__PURE__*/_react["default"].createElement("div", {
          id: "annotations"
        }), scores);
      }

      return /*#__PURE__*/_react["default"].createElement("div", null, "Loading...");
    }
  }]);

  return ClimbArchive;
}(_react.Component);

function mapStateToProps(_ref) {
  var graph = _ref.graph,
      score = _ref.score;
  return {
    graph: graph,
    score: score
  };
}

function mapDispatchToProps(dispatch) {
  return (0, _redux.bindActionCreators)({
    fetchSessionGraph: _index.fetchSessionGraph,
    scorePrevPageStatic: _index.scorePrevPageStatic,
    scoreNextPageStatic: _index.scoreNextPageStatic,
    postNextPageAnnotation: _index.postNextPageAnnotation,
    transitionToSession: _index.transitionToSession,
    resetNextSessionTrigger: _index.resetNextSessionTrigger
  }, dispatch);
}

var _default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(ClimbArchive);

exports["default"] = _default;