"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactRedux = require("react-redux");

var _redux = require("redux");

var _react3dCarousel = _interopRequireDefault(require("react-3d-carousel"));

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

var MEICarousel = /*#__PURE__*/function (_Component) {
  _inherits(MEICarousel, _Component);

  var _super = _createSuper(MEICarousel);

  function MEICarousel(props) {
    var _this;

    _classCallCheck(this, MEICarousel);

    _this = _super.call(this, props);
    _this.state = {
      score: {},
      width: 400,
      layout: _this.props.layout,
      ease: 'linear',
      duration: 400
    };
    _this.handleChange = _this.handleChange.bind(_assertThisInitialized(_this));
    return _this;
  }
  /*
  componentWillMount() {
      this.onSides = function (event) {
          this.setState( { images: this.props.images }});
      }.bind(this);
      this.onLayout = function (event) {
          this.setState({layout: event.target.value});
      }.bind(this);
      this.onDuration = function (event) {
          this.setState({duration: parseInt(event.target.value) });
      }.bind(this);
     // this.onEase = function (event) {
     //     this.setState({ease:  event.target.value});
     // }.bind(this);
  }
  */


  _createClass(MEICarousel, [{
    key: "render",
    value: function render() {
      console.log("Carousel sees :", this.props.score);

      if ("MEI" in this.props.score && Object.keys(this.props.score["MEI"]).length) {
        return /*#__PURE__*/_react["default"].createElement("div", {
          className: "carouselWrapper"
        }, /*#__PURE__*/_react["default"].createElement(_react3dCarousel["default"], {
          width: this.state.width,
          images: Object.keys(this.props.score.MEI).map(function (k) {
            return k.replace(".mei", ".svg");
          }),
          motif: this.props.motif,
          onMotifChange: this.props.onMotifChange,
          ease: this.state.ease,
          duration: this.state.duration,
          layout: this.state.layout
        }));
      }

      return /*#__PURE__*/_react["default"].createElement("div", null);
    }
  }]);

  return MEICarousel;
}(_react.Component);

function mapStateToProps(_ref) {
  var score = _ref.score;
  return {
    score: score
  };
}

function mapDispatchToProps(dispatch) {
  return (0, _redux.bindActionCreators)({}, dispatch);
}

var _default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(MEICarousel);

exports["default"] = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb250YWluZXJzL211c2ljb2xvZ3kvY2Fyb3VzZWwuanMiXSwibmFtZXMiOlsiTUVJQ2Fyb3VzZWwiLCJwcm9wcyIsInN0YXRlIiwic2NvcmUiLCJ3aWR0aCIsImxheW91dCIsImVhc2UiLCJkdXJhdGlvbiIsImhhbmRsZUNoYW5nZSIsImJpbmQiLCJjb25zb2xlIiwibG9nIiwiT2JqZWN0Iiwia2V5cyIsImxlbmd0aCIsIk1FSSIsIm1hcCIsImsiLCJyZXBsYWNlIiwibW90aWYiLCJvbk1vdGlmQ2hhbmdlIiwiQ29tcG9uZW50IiwibWFwU3RhdGVUb1Byb3BzIiwibWFwRGlzcGF0Y2hUb1Byb3BzIiwiZGlzcGF0Y2giXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBOztBQUNBOztBQUNBOztBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBRU1BLFc7Ozs7O0FBQ0osdUJBQVlDLEtBQVosRUFBbUI7QUFBQTs7QUFBQTs7QUFDakIsOEJBQU1BLEtBQU47QUFDQSxVQUFLQyxLQUFMLEdBQWE7QUFDWEMsTUFBQUEsS0FBSyxFQUFFLEVBREk7QUFFWEMsTUFBQUEsS0FBSyxFQUFFLEdBRkk7QUFHWEMsTUFBQUEsTUFBTSxFQUFFLE1BQUtKLEtBQUwsQ0FBV0ksTUFIUjtBQUlYQyxNQUFBQSxJQUFJLEVBQUUsUUFKSztBQUtYQyxNQUFBQSxRQUFRLEVBQUU7QUFMQyxLQUFiO0FBT0EsVUFBS0MsWUFBTCxHQUFvQixNQUFLQSxZQUFMLENBQWtCQyxJQUFsQiwrQkFBcEI7QUFUaUI7QUFVbEI7QUFFRDtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7V0FFRSxrQkFBUztBQUNQQyxNQUFBQSxPQUFPLENBQUNDLEdBQVIsQ0FBWSxpQkFBWixFQUErQixLQUFLVixLQUFMLENBQVdFLEtBQTFDOztBQUNBLFVBQUksU0FBUyxLQUFLRixLQUFMLENBQVdFLEtBQXBCLElBQTZCUyxNQUFNLENBQUNDLElBQVAsQ0FBWSxLQUFLWixLQUFMLENBQVdFLEtBQVgsQ0FBaUIsS0FBakIsQ0FBWixFQUFxQ1csTUFBdEUsRUFBOEU7QUFDNUUsNEJBQ0k7QUFBSyxVQUFBLFNBQVMsRUFBQztBQUFmLHdCQUNFLGdDQUFDLDJCQUFEO0FBQVUsVUFBQSxLQUFLLEVBQUUsS0FBS1osS0FBTCxDQUFXRSxLQUE1QjtBQUNVLFVBQUEsTUFBTSxFQUNKUSxNQUFNLENBQUNDLElBQVAsQ0FBWSxLQUFLWixLQUFMLENBQVdFLEtBQVgsQ0FBaUJZLEdBQTdCLEVBQWtDQyxHQUFsQyxDQUNJLFVBQUNDLENBQUQ7QUFBQSxtQkFBT0EsQ0FBQyxDQUFDQyxPQUFGLENBQVUsTUFBVixFQUFrQixNQUFsQixDQUFQO0FBQUEsV0FESixDQUZaO0FBTVUsVUFBQSxLQUFLLEVBQUUsS0FBS2pCLEtBQUwsQ0FBV2tCLEtBTjVCO0FBT1UsVUFBQSxhQUFhLEVBQUUsS0FBS2xCLEtBQUwsQ0FBV21CLGFBUHBDO0FBUVUsVUFBQSxJQUFJLEVBQUUsS0FBS2xCLEtBQUwsQ0FBV0ksSUFSM0I7QUFTVSxVQUFBLFFBQVEsRUFBRSxLQUFLSixLQUFMLENBQVdLLFFBVC9CO0FBVVUsVUFBQSxNQUFNLEVBQUUsS0FBS0wsS0FBTCxDQUFXRztBQVY3QixVQURGLENBREo7QUFlRDs7QUFDRCwwQkFBTyw0Q0FBUDtBQUNEOzs7O0VBbER1QmdCLGdCOztBQXNEMUIsU0FBU0MsZUFBVCxPQUFrQztBQUFBLE1BQVJuQixLQUFRLFFBQVJBLEtBQVE7QUFDaEMsU0FBTztBQUFDQSxJQUFBQSxLQUFLLEVBQUxBO0FBQUQsR0FBUDtBQUNEOztBQUVELFNBQVNvQixrQkFBVCxDQUE0QkMsUUFBNUIsRUFBc0M7QUFDcEMsU0FBTywrQkFBbUIsRUFBbkIsRUFBdUJBLFFBQXZCLENBQVA7QUFDRDs7ZUFFYyx5QkFBUUYsZUFBUixFQUF5QkMsa0JBQXpCLEVBQTZDdkIsV0FBN0MsQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwge0NvbXBvbmVudH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IHtjb25uZWN0fSBmcm9tICdyZWFjdC1yZWR1eCc7XG5pbXBvcnQge2JpbmRBY3Rpb25DcmVhdG9yc30gZnJvbSAncmVkdXgnO1xuaW1wb3J0IENhcm91c2VsIGZyb20gJ3JlYWN0LTNkLWNhcm91c2VsJztcblxuY2xhc3MgTUVJQ2Fyb3VzZWwgZXh0ZW5kcyBDb21wb25lbnQge1xuICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgIHN1cGVyKHByb3BzKTtcbiAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgc2NvcmU6IHt9LFxuICAgICAgd2lkdGg6IDQwMCxcbiAgICAgIGxheW91dDogdGhpcy5wcm9wcy5sYXlvdXQsXG4gICAgICBlYXNlOiAnbGluZWFyJyxcbiAgICAgIGR1cmF0aW9uOiA0MDBcbiAgICB9O1xuICAgIHRoaXMuaGFuZGxlQ2hhbmdlID0gdGhpcy5oYW5kbGVDaGFuZ2UuYmluZCh0aGlzKTtcbiAgfVxuXG4gIC8qXG4gIGNvbXBvbmVudFdpbGxNb3VudCgpIHtcbiAgICAgIHRoaXMub25TaWRlcyA9IGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICAgIHRoaXMuc2V0U3RhdGUoIHsgaW1hZ2VzOiB0aGlzLnByb3BzLmltYWdlcyB9fSk7XG4gICAgICB9LmJpbmQodGhpcyk7XG4gICAgICB0aGlzLm9uTGF5b3V0ID0gZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7bGF5b3V0OiBldmVudC50YXJnZXQudmFsdWV9KTtcbiAgICAgIH0uYmluZCh0aGlzKTtcbiAgICAgIHRoaXMub25EdXJhdGlvbiA9IGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe2R1cmF0aW9uOiBwYXJzZUludChldmVudC50YXJnZXQudmFsdWUpIH0pO1xuICAgICAgfS5iaW5kKHRoaXMpO1xuICAgICAvLyB0aGlzLm9uRWFzZSA9IGZ1bmN0aW9uIChldmVudCkge1xuICAgICAvLyAgICAgdGhpcy5zZXRTdGF0ZSh7ZWFzZTogIGV2ZW50LnRhcmdldC52YWx1ZX0pO1xuICAgICAvLyB9LmJpbmQodGhpcyk7XG4gIH1cbiovXG5cbiAgcmVuZGVyKCkge1xuICAgIGNvbnNvbGUubG9nKFwiQ2Fyb3VzZWwgc2VlcyA6XCIsIHRoaXMucHJvcHMuc2NvcmUpO1xuICAgIGlmIChcIk1FSVwiIGluIHRoaXMucHJvcHMuc2NvcmUgJiYgT2JqZWN0LmtleXModGhpcy5wcm9wcy5zY29yZVtcIk1FSVwiXSkubGVuZ3RoKSB7XG4gICAgICByZXR1cm4gKFxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY2Fyb3VzZWxXcmFwcGVyXCI+XG4gICAgICAgICAgICA8Q2Fyb3VzZWwgd2lkdGg9e3RoaXMuc3RhdGUud2lkdGh9XG4gICAgICAgICAgICAgICAgICAgICAgaW1hZ2VzPXtcbiAgICAgICAgICAgICAgICAgICAgICAgIE9iamVjdC5rZXlzKHRoaXMucHJvcHMuc2NvcmUuTUVJKS5tYXAoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKGspID0+IGsucmVwbGFjZShcIi5tZWlcIiwgXCIuc3ZnXCIpXG4gICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgIG1vdGlmPXt0aGlzLnByb3BzLm1vdGlmfVxuICAgICAgICAgICAgICAgICAgICAgIG9uTW90aWZDaGFuZ2U9e3RoaXMucHJvcHMub25Nb3RpZkNoYW5nZX1cbiAgICAgICAgICAgICAgICAgICAgICBlYXNlPXt0aGlzLnN0YXRlLmVhc2V9XG4gICAgICAgICAgICAgICAgICAgICAgZHVyYXRpb249e3RoaXMuc3RhdGUuZHVyYXRpb259XG4gICAgICAgICAgICAgICAgICAgICAgbGF5b3V0PXt0aGlzLnN0YXRlLmxheW91dH0vPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgKTtcbiAgICB9XG4gICAgcmV0dXJuIDxkaXYvPlxuICB9XG59XG5cblxuZnVuY3Rpb24gbWFwU3RhdGVUb1Byb3BzKHtzY29yZX0pIHtcbiAgcmV0dXJuIHtzY29yZX07XG59XG5cbmZ1bmN0aW9uIG1hcERpc3BhdGNoVG9Qcm9wcyhkaXNwYXRjaCkge1xuICByZXR1cm4gYmluZEFjdGlvbkNyZWF0b3JzKHt9LCBkaXNwYXRjaCk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGNvbm5lY3QobWFwU3RhdGVUb1Byb3BzLCBtYXBEaXNwYXRjaFRvUHJvcHMpKE1FSUNhcm91c2VsKTtcbiJdfQ==