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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb250YWluZXJzL2NsaW1iQXJjaGl2ZS5qcyJdLCJuYW1lcyI6WyJDbGltYkFyY2hpdmUiLCJwcm9wcyIsImdyYXBoVXJpIiwibG9jYXRpb24iLCJxdWVyeSIsInNlc3Npb24iLCJmZXRjaFNlc3Npb25HcmFwaCIsImNvbnNvbGUiLCJsb2ciLCJzY29yZSIsInB1Ymxpc2hlZFNjb3JlcyIsInRyaWdnZXJOZXh0U2Vzc2lvbiIsImdyYXBoIiwibmV4dFNlc3Npb24iLCJ0cmFuc2l0aW9uVG9TZXNzaW9uIiwiYW5ub0dyYXBoIiwicmVzZXROZXh0U2Vzc2lvblRyaWdnZXIiLCJldGFnIiwiZXRhZ3MiLCJieUlkIiwidGFyZ2V0c0J5SWQiLCJjb25jZXB0dWFsU2NvcmVzIiwic2NvcmVzIiwiT2JqZWN0Iiwia2V5cyIsIm1hcCIsInBTIiwiY1MiLCJhbm5vdGF0aW9uVGFyZ2V0cyIsImFubm90YXRpb25zIiwidCIsImluY2x1ZGVzIiwicmVkdWNlIiwiYSIsImIiLCJjb25jYXQiLCJwYWdlTnVtIiwiTUVJIiwic2NvcmVQcmV2UGFnZVN0YXRpYyIsInNjb3JlTmV4dFBhZ2VTdGF0aWMiLCJDb21wb25lbnQiLCJtYXBTdGF0ZVRvUHJvcHMiLCJtYXBEaXNwYXRjaFRvUHJvcHMiLCJkaXNwYXRjaCIsInBvc3ROZXh0UGFnZUFubm90YXRpb24iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBOztBQUNBOztBQVFBOztBQUNBOztBQUNBOztBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBRU1BLFk7Ozs7O0FBQ0osd0JBQVlDLEtBQVosRUFBbUI7QUFBQTs7QUFBQSw2QkFDWEEsS0FEVztBQUVsQjs7OztXQUVELDZCQUFvQjtBQUNsQixVQUFNQyxRQUFRLEdBQUcsS0FBS0QsS0FBTCxDQUFXRSxRQUFYLENBQW9CQyxLQUFwQixDQUEwQkMsT0FBM0M7QUFDQSxXQUFLSixLQUFMLENBQVdLLGlCQUFYLENBQTZCSixRQUE3QjtBQUNEOzs7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QUcsRUFBQyxZQUFWO0FBQXVCLFVBQUEsSUFBSSxFQUFDLDhCQUE1QjtBQUEyRCxVQUFBLElBQUksRUFBQztBQUFoRSxVQURGLGVBRUU7QUFBSyxVQUFBLEVBQUUsRUFBQztBQUFSLFVBRkYsRUFHR0osTUFISCxDQURKO0FBT0Q7O0FBQ0QsMEJBQVEsMERBQVI7QUFDRDs7OztFQTFFd0JrQixnQjs7QUE4RTNCLFNBQVNDLGVBQVQsT0FBeUM7QUFBQSxNQUFmN0IsS0FBZSxRQUFmQSxLQUFlO0FBQUEsTUFBUkgsS0FBUSxRQUFSQSxLQUFRO0FBQ3ZDLFNBQU87QUFBQ0csSUFBQUEsS0FBSyxFQUFMQSxLQUFEO0FBQVFILElBQUFBLEtBQUssRUFBTEE7QUFBUixHQUFQO0FBQ0Q7O0FBRUQsU0FBU2lDLGtCQUFULENBQTRCQyxRQUE1QixFQUFzQztBQUNwQyxTQUFPLCtCQUFtQjtBQUN4QnJDLElBQUFBLGlCQUFpQixFQUFqQkEsd0JBRHdCO0FBRXhCZ0MsSUFBQUEsbUJBQW1CLEVBQW5CQSwwQkFGd0I7QUFHeEJDLElBQUFBLG1CQUFtQixFQUFuQkEsMEJBSHdCO0FBSXhCSyxJQUFBQSxzQkFBc0IsRUFBdEJBLDZCQUp3QjtBQUt4QjlCLElBQUFBLG1CQUFtQixFQUFuQkEsMEJBTHdCO0FBTXhCRSxJQUFBQSx1QkFBdUIsRUFBdkJBO0FBTndCLEdBQW5CLEVBT0oyQixRQVBJLENBQVA7QUFRRDs7ZUFFYyx5QkFBUUYsZUFBUixFQUF5QkMsa0JBQXpCLEVBQTZDMUMsWUFBN0MsQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwge0NvbXBvbmVudH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IHtcbiAgZmV0Y2hTZXNzaW9uR3JhcGgsXG4gIHBvc3ROZXh0UGFnZUFubm90YXRpb24sXG4gIHJlc2V0TmV4dFNlc3Npb25UcmlnZ2VyLFxuICBzY29yZU5leHRQYWdlU3RhdGljLFxuICBzY29yZVByZXZQYWdlU3RhdGljLFxuICB0cmFuc2l0aW9uVG9TZXNzaW9uXG59IGZyb20gJy4uL2FjdGlvbnMvaW5kZXgnO1xuaW1wb3J0IHtjb25uZWN0fSBmcm9tICdyZWFjdC1yZWR1eCc7XG5pbXBvcnQge2JpbmRBY3Rpb25DcmVhdG9yc30gZnJvbSAncmVkdXgnO1xuaW1wb3J0IFNjb3JlIGZyb20gJy4uL2NvbnRhaW5lcnMvc2NvcmUnO1xuaW1wb3J0IEFubm90YXRpb25zTGlzdGluZyBmcm9tICcuLi9jb250YWluZXJzL2Fubm90YXRpb25zTGlzdGluZyc7XG5cbmNsYXNzIENsaW1iQXJjaGl2ZSBleHRlbmRzIENvbXBvbmVudCB7XG4gIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgc3VwZXIocHJvcHMpO1xuICB9XG5cbiAgY29tcG9uZW50RGlkTW91bnQoKSB7XG4gICAgY29uc3QgZ3JhcGhVcmkgPSB0aGlzLnByb3BzLmxvY2F0aW9uLnF1ZXJ5LnNlc3Npb247XG4gICAgdGhpcy5wcm9wcy5mZXRjaFNlc3Npb25HcmFwaChncmFwaFVyaSk7XG4gIH1cblxuICByZW5kZXIoKSB7XG4gICAgY29uc29sZS5sb2coXCJBcmNoaXZlIHByb3BzOiBcIiwgdGhpcy5wcm9wcyk7XG4gICAgaWYgKHRoaXMucHJvcHMuc2NvcmUucHVibGlzaGVkU2NvcmVzKSB7XG4gICAgICBpZiAodGhpcy5wcm9wcy5zY29yZS50cmlnZ2VyTmV4dFNlc3Npb24pIHtcbiAgICAgICAgLy8gaGF2ZSB3ZSBnb3QgYSBuZXh0IHNlc3Npb24gcXVldWVkIHVwP1xuICAgICAgICBpZiAodGhpcy5wcm9wcy5ncmFwaC5uZXh0U2Vzc2lvbikge1xuICAgICAgICAgIHRoaXMucHJvcHMudHJhbnNpdGlvblRvU2Vzc2lvbihcbiAgICAgICAgICAgICAgdGhpcy5wcm9wcy5ncmFwaC5hbm5vR3JhcGhbXCJAaWRcIl0sXG4gICAgICAgICAgICAgIFwiL0NsaW1iQXJjaGl2ZT9zZXNzaW9uPVwiICsgdGhpcy5wcm9wcy5ncmFwaC5uZXh0U2Vzc2lvblxuICAgICAgICAgICk7XG4gICAgICAgICAgcmV0dXJuIDxkaXY+TG9hZGluZyBuZXh0IHNlc3Npb24uLi48L2Rpdj5cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAvLyBpZiBub3QsIGlnbm9yZSB0aGlzIHJlcXVlc3QgYW5kIHJlc2V0IHRyaWdnZXJcbiAgICAgICAgICB0aGlzLnByb3BzLnJlc2V0TmV4dFNlc3Npb25UcmlnZ2VyKCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGxldCBzZXNzaW9uID0gXCJcIjtcbiAgICAgIGxldCBldGFnID0gXCJcIjtcbiAgICAgIGlmICh0aGlzLnByb3BzLmdyYXBoICYmIHRoaXMucHJvcHMuZ3JhcGguYW5ub0dyYXBoKSB7XG4gICAgICAgIHNlc3Npb24gPSB0aGlzLnByb3BzLmdyYXBoLmFubm9HcmFwaFtcIkBpZFwiXTtcbiAgICAgICAgZXRhZyA9IHRoaXMucHJvcHMuZ3JhcGguZXRhZ3Nbc2Vzc2lvbl07XG4gICAgICB9XG4gICAgICBjb25zdCBieUlkID0gdGhpcy5wcm9wcy5ncmFwaC50YXJnZXRzQnlJZDtcbiAgICAgIGNvbnN0IHB1Ymxpc2hlZFNjb3JlcyA9IHRoaXMucHJvcHMuc2NvcmUucHVibGlzaGVkU2NvcmVzO1xuICAgICAgY29uc3QgY29uY2VwdHVhbFNjb3JlcyA9IHRoaXMucHJvcHMuc2NvcmUuY29uY2VwdHVhbFNjb3JlcztcbiAgICAgIGNvbnN0IHNjb3JlcyA9IE9iamVjdC5rZXlzKHB1Ymxpc2hlZFNjb3JlcykubWFwKChwUykgPT4ge1xuICAgICAgICAvL3JldHVybiA8U2NvcmUga2V5PXsgc2MgfSB1cmk9eyBzYyB9IGFubm90YXRpb25zPXsgYnlJZFtzY11bXCJhbm5vdGF0aW9uc1wiXSB9IC8+O1xuICAgICAgICBjb25zdCBjUyA9IHB1Ymxpc2hlZFNjb3Jlc1twU107XG4gICAgICAgIGNvbnN0IGFubm90YXRpb25UYXJnZXRzID0gY29uY2VwdHVhbFNjb3Jlc1tjU107XG4gICAgICAgIGxldCBhbm5vdGF0aW9ucyA9IE9iamVjdC5rZXlzKGJ5SWQpLm1hcCgodCkgPT4ge1xuICAgICAgICAgIGlmIChhbm5vdGF0aW9uVGFyZ2V0cyAmJiBhbm5vdGF0aW9uVGFyZ2V0cy5pbmNsdWRlcyh0KSkge1xuICAgICAgICAgICAgcmV0dXJuIGJ5SWRbdF0uYW5ub3RhdGlvbnNcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICBhbm5vdGF0aW9ucyA9IGFubm90YXRpb25zLnJlZHVjZSgoYSwgYikgPT4gYS5jb25jYXQoYiksIFtdKTtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXYga2V5PXtcIndyYXBwZXJcIiArIHBTfT5cbiAgICAgICAgICAgICAgPEFubm90YXRpb25zTGlzdGluZyBhbm5vdGF0aW9ucz17YW5ub3RhdGlvbnN9IHNjb3JlVXJpPXtwU30vPlxuICAgICAgICAgICAgICA8U2NvcmUga2V5PXtwU30gdXJpPXtwU30gYW5ub3RhdGlvbnM9e2Fubm90YXRpb25zfSBzZXNzaW9uPXtzZXNzaW9ufSBldGFnPXtldGFnfVxuICAgICAgICAgICAgICAgICAgICAgbmV4dFNlc3Npb249e3RoaXMucHJvcHMubmV4dFNlc3Npb259Lz5cblxuICAgICAgICAgICAgICA8ZGl2IGlkPVwicHJldlwiIGtleT17XCJwcmV2XCIgKyBwU30gb25DbGljaz17KCkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwicHJldiBjbGlja2VkLCBwczogXCIsIHBTLCB0aGlzLnByb3BzLnNjb3JlLnBhZ2VOdW0sIHRoaXMucHJvcHMuc2NvcmUuTUVJKTtcbiAgICAgICAgICAgICAgICB0aGlzLnByb3BzLnNjb3JlUHJldlBhZ2VTdGF0aWMocFMsIHRoaXMucHJvcHMuc2NvcmUucGFnZU51bSwgdGhpcy5wcm9wcy5zY29yZS5NRUlbcFNdKVxuICAgICAgICAgICAgICB9fT4gUHJldmlvdXNcbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIDxkaXYgaWQ9XCJuZXh0XCIga2V5PXtcIm5leHRcIiArIHBTfSBvbkNsaWNrPXsoKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJuZXh0IGNsaWNrZWQsIHBzOiBcIiwgcFMsIHRoaXMucHJvcHMuc2NvcmUucGFnZU51bSwgdGhpcy5wcm9wcy5zY29yZS5NRUkpO1xuICAgICAgICAgICAgICAgIC8vdGhpcy5wcm9wcy5zY29yZU5leHRQYWdlKHBTLCB0aGlzLnByb3BzLnNjb3JlLnBhZ2VOdW0sIHRoaXMucHJvcHMuc2NvcmUuTUVJW3BTXSlcbiAgICAgICAgICAgICAgICB0aGlzLnByb3BzLnNjb3JlTmV4dFBhZ2VTdGF0aWMocFMsIHRoaXMucHJvcHMuc2NvcmUucGFnZU51bSwgdGhpcy5wcm9wcy5zY29yZS5NRUlbcFNdKVxuICAgICAgICAgICAgICB9fT4gTmV4dFxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApXG4gICAgICB9KTtcbiAgICAgIHJldHVybiAoXG4gICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgIDxsaW5rIHJlbD1cInN0eWxlc2hlZXRcIiBocmVmPVwiLi4vLi4vc3R5bGUvY2xpbWJBcmNoaXZlLmNzc1wiIHR5cGU9XCJ0ZXh0L2Nzc1wiLz5cbiAgICAgICAgICAgIDxkaXYgaWQ9XCJhbm5vdGF0aW9uc1wiPjwvZGl2PlxuICAgICAgICAgICAge3Njb3Jlc31cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgIClcbiAgICB9XG4gICAgcmV0dXJuICg8ZGl2PkxvYWRpbmcuLi48L2Rpdj4pO1xuICB9XG5cbn1cblxuZnVuY3Rpb24gbWFwU3RhdGVUb1Byb3BzKHtncmFwaCwgc2NvcmV9KSB7XG4gIHJldHVybiB7Z3JhcGgsIHNjb3JlfVxufVxuXG5mdW5jdGlvbiBtYXBEaXNwYXRjaFRvUHJvcHMoZGlzcGF0Y2gpIHtcbiAgcmV0dXJuIGJpbmRBY3Rpb25DcmVhdG9ycyh7XG4gICAgZmV0Y2hTZXNzaW9uR3JhcGgsXG4gICAgc2NvcmVQcmV2UGFnZVN0YXRpYyxcbiAgICBzY29yZU5leHRQYWdlU3RhdGljLFxuICAgIHBvc3ROZXh0UGFnZUFubm90YXRpb24sXG4gICAgdHJhbnNpdGlvblRvU2Vzc2lvbixcbiAgICByZXNldE5leHRTZXNzaW9uVHJpZ2dlclxuICB9LCBkaXNwYXRjaCk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGNvbm5lY3QobWFwU3RhdGVUb1Byb3BzLCBtYXBEaXNwYXRjaFRvUHJvcHMpKENsaW1iQXJjaGl2ZSk7XG4iXX0=