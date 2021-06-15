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

var Jam = /*#__PURE__*/function (_Component) {
  _inherits(Jam, _Component);

  var _super = _createSuper(Jam);

  function Jam(props) {
    _classCallCheck(this, Jam);

    return _super.call(this, props);
  }

  _createClass(Jam, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      if (this.props.location.query.session) {
        // start polling
        this.doPoll();
      }
    }
  }, {
    key: "doPoll",
    value: function doPoll() {
      var _this = this;

      var graphUri = this.props.location.query.session;

      if ('etags' in this.props.graph && graphUri in this.props.graph.etags) {
        this.props.fetchSessionGraph(graphUri, this.props.graph.etags[graphUri]);
      } else {
        this.props.fetchSessionGraph(graphUri);
      }

      setTimeout(function () {
        return _this.doPoll();
      }, 200);
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      if (this.props.score.publishedScores) {
        if (this.props.score.triggerNextSession) {
          // have we got a next session queued up?
          if (this.props.graph.nextSession) {
            this.props.transitionToSession(this.props.graph.annoGraph["@id"], this.props.graph.nextSession);
            return /*#__PURE__*/_react["default"].createElement("div", null, "Loading next session...");
          } else {
            // if not, ignore this request and reset trigger
            this.props.resetNextSessionTrigger();
          }
        }

        console.log("Jam props: ", this.props); //if(this.props.graph.targetsById) {

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
          //return <Score key={ sc } uri={ sc } annotations={ byId[sc]["annotations"] } />;
          var cS = publishedScores[pS];
          var annotationTargets = conceptualScores[cS];
          var annotations = Object.keys(byId).map(function (t) {
            if (annotationTargets && annotationTargets.includes(t)) {
              return byId[t].annotations;
            }
          });
          console.log("WORKING WITH: ", annotations);
          return /*#__PURE__*/_react["default"].createElement("div", {
            key: "wrapper" + pS
          }, /*#__PURE__*/_react["default"].createElement(_score["default"], {
            key: pS,
            uri: pS,
            annotations: annotations,
            session: session,
            etag: etag,
            nextSession: _this2.props.nextSession
          }), ";", /*#__PURE__*/_react["default"].createElement("div", {
            id: "prev",
            key: "prev" + pS,
            onClick: function onClick() {
              console.log("prev clicked, ps: ", pS, _this2.props.score.pageNum, _this2.props.score.MEI);

              _this2.props.scorePrevPage(pS, _this2.props.score.pageNum, _this2.props.score.MEI[pS]);
            }
          }, " Previous "), /*#__PURE__*/_react["default"].createElement("div", {
            id: "next",
            key: "next" + pS,
            onClick: function onClick() {
              console.log("next clicked, ps: ", pS, _this2.props.score.pageNum, _this2.props.score.MEI); //this.props.scoreNextPage(pS, this.props.score.pageNum, this.props.score.MEI[pS])

              _this2.props.postNextPageAnnotation(session, etag);
            }
          }, " Next"));
        });
        return /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement("link", {
          rel: "stylesheet",
          href: "../../style/jam.css",
          type: "text/css"
        }), /*#__PURE__*/_react["default"].createElement("div", {
          id: "annotations"
        }), scores);
      }

      return /*#__PURE__*/_react["default"].createElement("div", null, "Loading...");
    }
  }]);

  return Jam;
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
    scorePrevPage: _index.scorePrevPage,
    scoreNextPage: _index.scoreNextPage,
    postNextPageAnnotation: _index.postNextPageAnnotation,
    transitionToSession: _index.transitionToSession,
    resetNextSessionTrigger: _index.resetNextSessionTrigger
  }, dispatch);
}

(0, _reactRouter.withRouter)(Jam);

var _default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(Jam);

exports["default"] = _default;