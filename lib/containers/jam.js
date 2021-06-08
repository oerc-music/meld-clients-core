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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb250YWluZXJzL2phbS5qcyJdLCJuYW1lcyI6WyJKYW0iLCJwcm9wcyIsImxvY2F0aW9uIiwicXVlcnkiLCJzZXNzaW9uIiwiZG9Qb2xsIiwiZ3JhcGhVcmkiLCJncmFwaCIsImV0YWdzIiwiZmV0Y2hTZXNzaW9uR3JhcGgiLCJzZXRUaW1lb3V0Iiwic2NvcmUiLCJwdWJsaXNoZWRTY29yZXMiLCJ0cmlnZ2VyTmV4dFNlc3Npb24iLCJuZXh0U2Vzc2lvbiIsInRyYW5zaXRpb25Ub1Nlc3Npb24iLCJhbm5vR3JhcGgiLCJyZXNldE5leHRTZXNzaW9uVHJpZ2dlciIsImNvbnNvbGUiLCJsb2ciLCJldGFnIiwiYnlJZCIsInRhcmdldHNCeUlkIiwiY29uY2VwdHVhbFNjb3JlcyIsInNjb3JlcyIsIk9iamVjdCIsImtleXMiLCJtYXAiLCJwUyIsImNTIiwiYW5ub3RhdGlvblRhcmdldHMiLCJhbm5vdGF0aW9ucyIsInQiLCJpbmNsdWRlcyIsInBhZ2VOdW0iLCJNRUkiLCJzY29yZVByZXZQYWdlIiwicG9zdE5leHRQYWdlQW5ub3RhdGlvbiIsIkNvbXBvbmVudCIsIm1hcFN0YXRlVG9Qcm9wcyIsIm1hcERpc3BhdGNoVG9Qcm9wcyIsImRpc3BhdGNoIiwic2NvcmVOZXh0UGFnZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUE7O0FBQ0E7O0FBUUE7O0FBQ0E7O0FBQ0E7O0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUFHTUEsRzs7Ozs7QUFDSixlQUFZQyxLQUFaLEVBQW1CO0FBQUE7O0FBQUEsNkJBQ1hBLEtBRFc7QUFFbEI7Ozs7V0FFRCw2QkFBb0I7QUFDbEIsVUFBSSxLQUFLQSxLQUFMLENBQVdDLFFBQVgsQ0FBb0JDLEtBQXBCLENBQTBCQyxPQUE5QixFQUF1QztBQUNyQztBQUNBLGFBQUtDLE1BQUw7QUFDRDtBQUVGOzs7V0FFRCxrQkFBUztBQUFBOztBQUNQLFVBQU1DLFFBQVEsR0FBRyxLQUFLTCxLQUFMLENBQVdD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a0JBQXpCLEVBQTZDeEMsR0FBN0MsQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwge0NvbXBvbmVudH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IHtcbiAgZmV0Y2hTZXNzaW9uR3JhcGgsXG4gIHBvc3ROZXh0UGFnZUFubm90YXRpb24sXG4gIHJlc2V0TmV4dFNlc3Npb25UcmlnZ2VyLFxuICBzY29yZU5leHRQYWdlLFxuICBzY29yZVByZXZQYWdlLFxuICB0cmFuc2l0aW9uVG9TZXNzaW9uXG59IGZyb20gJy4uL2FjdGlvbnMvaW5kZXgnO1xuaW1wb3J0IHtjb25uZWN0fSBmcm9tICdyZWFjdC1yZWR1eCc7XG5pbXBvcnQge2JpbmRBY3Rpb25DcmVhdG9yc30gZnJvbSAncmVkdXgnO1xuaW1wb3J0IHt3aXRoUm91dGVyfSBmcm9tICdyZWFjdC1yb3V0ZXInO1xuaW1wb3J0IFNjb3JlIGZyb20gJy4uL2NvbnRhaW5lcnMvc2NvcmUnO1xuXG5cbmNsYXNzIEphbSBleHRlbmRzIENvbXBvbmVudCB7XG4gIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgc3VwZXIocHJvcHMpO1xuICB9XG5cbiAgY29tcG9uZW50RGlkTW91bnQoKSB7XG4gICAgaWYgKHRoaXMucHJvcHMubG9jYXRpb24ucXVlcnkuc2Vzc2lvbikge1xuICAgICAgLy8gc3RhcnQgcG9sbGluZ1xuICAgICAgdGhpcy5kb1BvbGwoKTtcbiAgICB9XG5cbiAgfVxuXG4gIGRvUG9sbCgpIHtcbiAgICBjb25zdCBncmFwaFVyaSA9IHRoaXMucHJvcHMubG9jYXRpb24ucXVlcnkuc2Vzc2lvbjtcbiAgICBpZiAoJ2V0YWdzJyBpbiB0aGlzLnByb3BzLmdyYXBoICYmXG4gICAgICAgIGdyYXBoVXJpIGluIHRoaXMucHJvcHMuZ3JhcGguZXRhZ3MpIHtcbiAgICAgIHRoaXMucHJvcHMuZmV0Y2hTZXNzaW9uR3JhcGgoZ3JhcGhVcmksIHRoaXMucHJvcHMuZ3JhcGguZXRhZ3NbZ3JhcGhVcmldKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5wcm9wcy5mZXRjaFNlc3Npb25HcmFwaChncmFwaFVyaSk7XG4gICAgfVxuICAgIHNldFRpbWVvdXQoKCkgPT4gdGhpcy5kb1BvbGwoKSwgMjAwKTtcbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICBpZiAodGhpcy5wcm9wcy5zY29yZS5wdWJsaXNoZWRTY29yZXMpIHtcbiAgICAgIGlmICh0aGlzLnByb3BzLnNjb3JlLnRyaWdnZXJOZXh0U2Vzc2lvbikge1xuICAgICAgICAvLyBoYXZlIHdlIGdvdCBhIG5leHQgc2Vzc2lvbiBxdWV1ZWQgdXA/XG4gICAgICAgIGlmICh0aGlzLnByb3BzLmdyYXBoLm5leHRTZXNzaW9uKSB7XG4gICAgICAgICAgdGhpcy5wcm9wcy50cmFuc2l0aW9uVG9TZXNzaW9uKFxuICAgICAgICAgICAgICB0aGlzLnByb3BzLmdyYXBoLmFubm9HcmFwaFtcIkBpZFwiXSxcbiAgICAgICAgICAgICAgdGhpcy5wcm9wcy5ncmFwaC5uZXh0U2Vzc2lvblxuICAgICAgICAgICk7XG4gICAgICAgICAgcmV0dXJuIDxkaXY+TG9hZGluZyBuZXh0IHNlc3Npb24uLi48L2Rpdj5cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAvLyBpZiBub3QsIGlnbm9yZSB0aGlzIHJlcXVlc3QgYW5kIHJlc2V0IHRyaWdnZXJcbiAgICAgICAgICB0aGlzLnByb3BzLnJlc2V0TmV4dFNlc3Npb25UcmlnZ2VyKCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGNvbnNvbGUubG9nKFwiSmFtIHByb3BzOiBcIiwgdGhpcy5wcm9wcyk7XG4gICAgICAvL2lmKHRoaXMucHJvcHMuZ3JhcGgudGFyZ2V0c0J5SWQpIHtcbiAgICAgIGxldCBzZXNzaW9uID0gXCJcIjtcbiAgICAgIGxldCBldGFnID0gXCJcIjtcbiAgICAgIGlmICh0aGlzLnByb3BzLmdyYXBoICYmIHRoaXMucHJvcHMuZ3JhcGguYW5ub0dyYXBoKSB7XG4gICAgICAgIHNlc3Npb24gPSB0aGlzLnByb3BzLmdyYXBoLmFubm9HcmFwaFtcIkBpZFwiXTtcbiAgICAgICAgZXRhZyA9IHRoaXMucHJvcHMuZ3JhcGguZXRhZ3Nbc2Vzc2lvbl07XG4gICAgICAgIGNvbnNvbGUubG9nKFwic2Vzc2lvbjogXCIsIHNlc3Npb24sIFwiIGV0YWc6IFwiLCBldGFnLCBcIiBldGFnczogXCIsIHRoaXMucHJvcHMuZ3JhcGguZXRhZ3MpO1xuICAgICAgfVxuXG4gICAgICBjb25zdCBieUlkID0gdGhpcy5wcm9wcy5ncmFwaC50YXJnZXRzQnlJZDtcbiAgICAgIGNvbnN0IHB1Ymxpc2hlZFNjb3JlcyA9IHRoaXMucHJvcHMuc2NvcmUucHVibGlzaGVkU2NvcmVzO1xuICAgICAgY29uc3QgY29uY2VwdHVhbFNjb3JlcyA9IHRoaXMucHJvcHMuc2NvcmUuY29uY2VwdHVhbFNjb3JlcztcbiAgICAgIGNvbnN0IHNjb3JlcyA9IE9iamVjdC5rZXlzKHB1Ymxpc2hlZFNjb3JlcykubWFwKChwUykgPT4ge1xuICAgICAgICAvL3JldHVybiA8U2NvcmUga2V5PXsgc2MgfSB1cmk9eyBzYyB9IGFubm90YXRpb25zPXsgYnlJZFtzY11bXCJhbm5vdGF0aW9uc1wiXSB9IC8+O1xuICAgICAgICBjb25zdCBjUyA9IHB1Ymxpc2hlZFNjb3Jlc1twU107XG4gICAgICAgIGNvbnN0IGFubm90YXRpb25UYXJnZXRzID0gY29uY2VwdHVhbFNjb3Jlc1tjU107XG4gICAgICAgIGxldCBhbm5vdGF0aW9ucyA9IE9iamVjdC5rZXlzKGJ5SWQpLm1hcCgodCkgPT4ge1xuICAgICAgICAgIGlmIChhbm5vdGF0aW9uVGFyZ2V0cyAmJiBhbm5vdGF0aW9uVGFyZ2V0cy5pbmNsdWRlcyh0KSkge1xuICAgICAgICAgICAgcmV0dXJuIGJ5SWRbdF0uYW5ub3RhdGlvbnNcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICBjb25zb2xlLmxvZyhcIldPUktJTkcgV0lUSDogXCIsIGFubm90YXRpb25zKTtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXYga2V5PXtcIndyYXBwZXJcIiArIHBTfT5cbiAgICAgICAgICAgICAgPFNjb3JlIGtleT17cFN9IHVyaT17cFN9IGFubm90YXRpb25zPXthbm5vdGF0aW9uc30gc2Vzc2lvbj17c2Vzc2lvbn0gZXRhZz17ZXRhZ31cbiAgICAgICAgICAgICAgICAgICAgIG5leHRTZXNzaW9uPXt0aGlzLnByb3BzLm5leHRTZXNzaW9ufS8+O1xuXG4gICAgICAgICAgICAgIDxkaXYgaWQ9XCJwcmV2XCIga2V5PXtcInByZXZcIiArIHBTfSBvbkNsaWNrPXsoKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJwcmV2IGNsaWNrZWQsIHBzOiBcIiwgcFMsIHRoaXMucHJvcHMuc2NvcmUucGFnZU51bSwgdGhpcy5wcm9wcy5zY29yZS5NRUkpO1xuICAgICAgICAgICAgICAgIHRoaXMucHJvcHMuc2NvcmVQcmV2UGFnZShwUywgdGhpcy5wcm9wcy5zY29yZS5wYWdlTnVtLCB0aGlzLnByb3BzLnNjb3JlLk1FSVtwU10pXG4gICAgICAgICAgICAgIH19PiBQcmV2aW91cyA8L2Rpdj5cbiAgICAgICAgICAgICAgPGRpdiBpZD1cIm5leHRcIiBrZXk9e1wibmV4dFwiICsgcFN9IG9uQ2xpY2s9eygpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIm5leHQgY2xpY2tlZCwgcHM6IFwiLCBwUywgdGhpcy5wcm9wcy5zY29yZS5wYWdlTnVtLCB0aGlzLnByb3BzLnNjb3JlLk1FSSk7XG4gICAgICAgICAgICAgICAgLy90aGlzLnByb3BzLnNjb3JlTmV4dFBhZ2UocFMsIHRoaXMucHJvcHMuc2NvcmUucGFnZU51bSwgdGhpcy5wcm9wcy5zY29yZS5NRUlbcFNdKVxuICAgICAgICAgICAgICAgIHRoaXMucHJvcHMucG9zdE5leHRQYWdlQW5ub3RhdGlvbihzZXNzaW9uLCBldGFnKTtcbiAgICAgICAgICAgICAgfX0+IE5leHRcbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKVxuICAgICAgfSk7XG4gICAgICByZXR1cm4gKFxuICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICA8bGluayByZWw9XCJzdHlsZXNoZWV0XCIgaHJlZj1cIi4uLy4uL3N0eWxlL2phbS5jc3NcIiB0eXBlPVwidGV4dC9jc3NcIi8+XG4gICAgICAgICAgICA8ZGl2IGlkPVwiYW5ub3RhdGlvbnNcIj48L2Rpdj5cbiAgICAgICAgICAgIHtzY29yZXN9XG4gICAgICAgICAgPC9kaXY+XG4gICAgICApXG4gICAgfVxuICAgIHJldHVybiAoPGRpdj5Mb2FkaW5nLi4uPC9kaXY+KTtcbiAgfVxuXG59XG5cbmZ1bmN0aW9uIG1hcFN0YXRlVG9Qcm9wcyh7Z3JhcGgsIHNjb3JlfSkge1xuICByZXR1cm4ge2dyYXBoLCBzY29yZX1cbn1cblxuZnVuY3Rpb24gbWFwRGlzcGF0Y2hUb1Byb3BzKGRpc3BhdGNoKSB7XG4gIHJldHVybiBiaW5kQWN0aW9uQ3JlYXRvcnMoe1xuICAgIGZldGNoU2Vzc2lvbkdyYXBoLFxuICAgIHNjb3JlUHJldlBhZ2UsXG4gICAgc2NvcmVOZXh0UGFnZSxcbiAgICBwb3N0TmV4dFBhZ2VBbm5vdGF0aW9uLFxuICAgIHRyYW5zaXRpb25Ub1Nlc3Npb24sXG4gICAgcmVzZXROZXh0U2Vzc2lvblRyaWdnZXJcbiAgfSwgZGlzcGF0Y2gpO1xufVxuXG53aXRoUm91dGVyKEphbSk7XG5cbmV4cG9ydCBkZWZhdWx0IGNvbm5lY3QobWFwU3RhdGVUb1Byb3BzLCBtYXBEaXNwYXRjaFRvUHJvcHMpKEphbSk7XG4iXX0=