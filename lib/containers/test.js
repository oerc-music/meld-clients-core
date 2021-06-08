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

var Test = /*#__PURE__*/function (_Component) {
  _inherits(Test, _Component);

  var _super = _createSuper(Test);

  function Test(props) {
    _classCallCheck(this, Test);

    return _super.call(this, props);
  }

  _createClass(Test, [{
    key: "componentWillMount",
    value: function componentWillMount() {
      // https://reactjs.org/docs/react-component.html#unsafe_componentwillmount
      // @@NOTE: deprecated
      this.props.setTraversalObjectives([{
        "@context": {
          "oa": "http://www.w3.org/ns/oa#",
          "meldterm": "http://meld.linkedmusic.org/terms/"
        },
        "@id": {},
        "oa:hasBody": {
          "@id": "meldterm:highlight"
        }
      }]);
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      // start traversal
      this.props.traverse("http://meld.linkedmusic.org/annotations/Frageverbot1.json-ld");
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps, prevState) {
      console.log("Did update!", prevProps, this.props);

      if ("graph" in prevProps) {
        // check our traversal objectives if the graph has updated
        if (prevProps.graph.graph.length !== this.props.graph.graph.length) {
          this.props.checkTraversalObjectives(this.props.graph.graph, this.props.graph.objectives);
        }
      }
    }
  }, {
    key: "render",
    value: function render() {
      return /*#__PURE__*/_react["default"].createElement("div", null, "Hello MELD");
    }
  }]);

  return Test;
}(_react.Component);

function mapStateToProps(_ref) {
  var graph = _ref.graph;
  return {
    graph: graph
  };
}

function mapDispatchToProps(dispatch) {
  return (0, _redux.bindActionCreators)({
    traverse: _index.traverse,
    setTraversalObjectives: _index.setTraversalObjectives,
    checkTraversalObjectives: _index.checkTraversalObjectives
  }, dispatch);
}

var _default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(Test);

exports["default"] = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb250YWluZXJzL3Rlc3QuanMiXSwibmFtZXMiOlsiVGVzdCIsInByb3BzIiwic2V0VHJhdmVyc2FsT2JqZWN0aXZlcyIsInRyYXZlcnNlIiwicHJldlByb3BzIiwicHJldlN0YXRlIiwiY29uc29sZSIsImxvZyIsImdyYXBoIiwibGVuZ3RoIiwiY2hlY2tUcmF2ZXJzYWxPYmplY3RpdmVzIiwib2JqZWN0aXZlcyIsIkNvbXBvbmVudCIsIm1hcFN0YXRlVG9Qcm9wcyIsIm1hcERpc3BhdGNoVG9Qcm9wcyIsImRpc3BhdGNoIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQTs7QUFDQTs7QUFDQTs7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUFFTUEsSTs7Ozs7QUFDSixnQkFBWUMsS0FBWixFQUFtQjtBQUFBOztBQUFBLDZCQUNYQSxLQURXO0FBRWxCOzs7O1dBRUQsOEJBQXFCO0FBQ25CO0FBQ0E7QUFDQSxXQUFLQSxLQUFMLENBQVdDLHNCQUFYLENBQWtDLENBQ2hDO0FBQ0Usb0JBQVk7QUFDVixnQkFBTSwwQkFESTtBQUVWLHNCQUFZO0FBRkYsU0FEZDtBQUtFLGVBQU8sRUFMVDtBQU1FLHNCQUFjO0FBQ1osaUJBQU87QUFESztBQU5oQixPQURnQyxDQUFsQztBQVlEOzs7V0FFRCw2QkFBb0I7QUFDbEI7QUFDQSxXQUFLRCxLQUFMLENBQVdFLFFBQVgsQ0FBb0IsOERBQXBCO0FBQ0Q7OztXQUVELDRCQUFtQkMsU0FBbkIsRUFBOEJDLFNBQTlCLEVBQXlDO0FBQ3ZDQyxNQUFBQSxPQUFPLENBQUNDLEdBQVIsQ0FBWSxhQUFaLEVBQTJCSCxTQUEzQixFQUFzQyxLQUFLSCxLQUEzQzs7QUFDQSxVQUFJLFdBQVdHLFNBQWYsRUFBMEI7QUFDeEI7QUFDQSxZQUFJQSxTQUFTLENBQUNJLEtBQVYsQ0FBZ0JBLEtBQWhCLENBQXNCQyxNQUF0QixLQUFpQyxLQUFLUixLQUFMLENBQVdPLEtBQVgsQ0FBaUJBLEtBQWpCLENBQXVCQyxNQUE1RCxFQUFvRTtBQUNsRSxlQUFLUixLQUFMLENBQVdTLHdCQUFYLENBQW9DLEtBQUtULEtBQUwsQ0FBV08sS0FBWCxDQUFpQkEsS0FBckQsRUFBNEQsS0FBS1AsS0FBTCxDQUFXTyxLQUFYLENBQWlCRyxVQUE3RTtBQUNEO0FBQ0Y7QUFDRjs7O1dBRUQsa0JBQVM7QUFDUCwwQkFBTywwREFBUDtBQUNEOzs7O0VBdkNnQkMsZ0I7O0FBMENuQixTQUFTQyxlQUFULE9BQWtDO0FBQUEsTUFBUkwsS0FBUSxRQUFSQSxLQUFRO0FBQ2hDLFNBQU87QUFBQ0EsSUFBQUEsS0FBSyxFQUFMQTtBQUFELEdBQVA7QUFDRDs7QUFFRCxTQUFTTSxrQkFBVCxDQUE0QkMsUUFBNUIsRUFBc0M7QUFDcEMsU0FBTywrQkFBbUI7QUFBQ1osSUFBQUEsUUFBUSxFQUFSQSxlQUFEO0FBQVdELElBQUFBLHNCQUFzQixFQUF0QkEsNkJBQVg7QUFBbUNRLElBQUFBLHdCQUF3QixFQUF4QkE7QUFBbkMsR0FBbkIsRUFBaUZLLFFBQWpGLENBQVA7QUFDRDs7ZUFFYyx5QkFBUUYsZUFBUixFQUF5QkMsa0JBQXpCLEVBQTZDZCxJQUE3QyxDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7Q29tcG9uZW50fSBmcm9tICdyZWFjdCc7XG5pbXBvcnQge2NoZWNrVHJhdmVyc2FsT2JqZWN0aXZlcywgc2V0VHJhdmVyc2FsT2JqZWN0aXZlcywgdHJhdmVyc2V9IGZyb20gJy4uL2FjdGlvbnMvaW5kZXgnO1xuaW1wb3J0IHtjb25uZWN0fSBmcm9tICdyZWFjdC1yZWR1eCc7XG5pbXBvcnQge2JpbmRBY3Rpb25DcmVhdG9yc30gZnJvbSAncmVkdXgnO1xuXG5jbGFzcyBUZXN0IGV4dGVuZHMgQ29tcG9uZW50IHtcbiAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICBzdXBlcihwcm9wcyk7XG4gIH1cblxuICBjb21wb25lbnRXaWxsTW91bnQoKSB7XG4gICAgLy8gaHR0cHM6Ly9yZWFjdGpzLm9yZy9kb2NzL3JlYWN0LWNvbXBvbmVudC5odG1sI3Vuc2FmZV9jb21wb25lbnR3aWxsbW91bnRcbiAgICAvLyBAQE5PVEU6IGRlcHJlY2F0ZWRcbiAgICB0aGlzLnByb3BzLnNldFRyYXZlcnNhbE9iamVjdGl2ZXMoW1xuICAgICAge1xuICAgICAgICBcIkBjb250ZXh0XCI6IHtcbiAgICAgICAgICBcIm9hXCI6IFwiaHR0cDovL3d3dy53My5vcmcvbnMvb2EjXCIsXG4gICAgICAgICAgXCJtZWxkdGVybVwiOiBcImh0dHA6Ly9tZWxkLmxpbmtlZG11c2ljLm9yZy90ZXJtcy9cIlxuICAgICAgICB9LFxuICAgICAgICBcIkBpZFwiOiB7fSxcbiAgICAgICAgXCJvYTpoYXNCb2R5XCI6IHtcbiAgICAgICAgICBcIkBpZFwiOiBcIm1lbGR0ZXJtOmhpZ2hsaWdodFwiXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICBdKTtcbiAgfVxuXG4gIGNvbXBvbmVudERpZE1vdW50KCkge1xuICAgIC8vIHN0YXJ0IHRyYXZlcnNhbFxuICAgIHRoaXMucHJvcHMudHJhdmVyc2UoXCJodHRwOi8vbWVsZC5saW5rZWRtdXNpYy5vcmcvYW5ub3RhdGlvbnMvRnJhZ2V2ZXJib3QxLmpzb24tbGRcIik7XG4gIH1cblxuICBjb21wb25lbnREaWRVcGRhdGUocHJldlByb3BzLCBwcmV2U3RhdGUpIHtcbiAgICBjb25zb2xlLmxvZyhcIkRpZCB1cGRhdGUhXCIsIHByZXZQcm9wcywgdGhpcy5wcm9wcyk7XG4gICAgaWYgKFwiZ3JhcGhcIiBpbiBwcmV2UHJvcHMpIHtcbiAgICAgIC8vIGNoZWNrIG91ciB0cmF2ZXJzYWwgb2JqZWN0aXZlcyBpZiB0aGUgZ3JhcGggaGFzIHVwZGF0ZWRcbiAgICAgIGlmIChwcmV2UHJvcHMuZ3JhcGguZ3JhcGgubGVuZ3RoICE9PSB0aGlzLnByb3BzLmdyYXBoLmdyYXBoLmxlbmd0aCkge1xuICAgICAgICB0aGlzLnByb3BzLmNoZWNrVHJhdmVyc2FsT2JqZWN0aXZlcyh0aGlzLnByb3BzLmdyYXBoLmdyYXBoLCB0aGlzLnByb3BzLmdyYXBoLm9iamVjdGl2ZXMpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICByZXR1cm4gPGRpdj5IZWxsbyBNRUxEPC9kaXY+XG4gIH1cbn1cblxuZnVuY3Rpb24gbWFwU3RhdGVUb1Byb3BzKHtncmFwaH0pIHtcbiAgcmV0dXJuIHtncmFwaH07XG59XG5cbmZ1bmN0aW9uIG1hcERpc3BhdGNoVG9Qcm9wcyhkaXNwYXRjaCkge1xuICByZXR1cm4gYmluZEFjdGlvbkNyZWF0b3JzKHt0cmF2ZXJzZSwgc2V0VHJhdmVyc2FsT2JqZWN0aXZlcywgY2hlY2tUcmF2ZXJzYWxPYmplY3RpdmVzfSwgZGlzcGF0Y2gpO1xufVxuXG5leHBvcnQgZGVmYXVsdCBjb25uZWN0KG1hcFN0YXRlVG9Qcm9wcywgbWFwRGlzcGF0Y2hUb1Byb3BzKShUZXN0KTtcbiJdfQ==