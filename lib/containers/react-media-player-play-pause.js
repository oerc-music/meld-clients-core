"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _reactMediaPlayer = require("react-media-player");

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

var CustomPlayPause = /*#__PURE__*/function (_Component) {
  _inherits(CustomPlayPause, _Component);

  var _super = _createSuper(CustomPlayPause);

  function CustomPlayPause(props) {
    var _this;

    _classCallCheck(this, CustomPlayPause);

    _this = _super.call(this, props);
    _this._handlePlayPause = _this.__handlePlayPause.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(CustomPlayPause, [{
    key: "__handlePlayPause",
    value: function __handlePlayPause() {
      this.props.media.playPause();
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props = this.props,
          isPlaying = _this$props.media.isPlaying,
          className = _this$props.className;
      return /*#__PURE__*/_react["default"].createElement("svg", {
        role: "button",
        width: "36px",
        height: "36px",
        viewBox: "0 0 36 36",
        className: className,
        onClick: this._handlePlayPause
      }, /*#__PURE__*/_react["default"].createElement("circle", {
        fill: "#FFA500",
        cx: "18",
        cy: "18",
        r: "18"
      }), isPlaying && /*#__PURE__*/_react["default"].createElement("g", {
        key: "pause",
        style: {
          transformOrigin: '0% 50%'
        }
      }, /*#__PURE__*/_react["default"].createElement("rect", {
        x: "12",
        y: "11",
        fill: "#FFFFFF",
        width: "4",
        height: "14"
      }), /*#__PURE__*/_react["default"].createElement("rect", {
        x: "20",
        y: "11",
        fill: "#FFFFFF",
        width: "4",
        height: "14"
      })), !isPlaying && /*#__PURE__*/_react["default"].createElement("polygon", {
        key: "play",
        fill: "#FFFFFF",
        points: "14,11 26,18 14,25",
        style: {
          transformOrigin: '100% 50%'
        }
      }));
    }
  }]);

  return CustomPlayPause;
}(_react.Component);

var _default = (0, _reactMediaPlayer.withMediaProps)(CustomPlayPause);

exports["default"] = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb250YWluZXJzL3JlYWN0LW1lZGlhLXBsYXllci1wbGF5LXBhdXNlLmpzIl0sIm5hbWVzIjpbIkN1c3RvbVBsYXlQYXVzZSIsInByb3BzIiwiX2hhbmRsZVBsYXlQYXVzZSIsIl9faGFuZGxlUGxheVBhdXNlIiwiYmluZCIsIm1lZGlhIiwicGxheVBhdXNlIiwiaXNQbGF5aW5nIiwiY2xhc3NOYW1lIiwidHJhbnNmb3JtT3JpZ2luIiwiQ29tcG9uZW50Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQTs7QUFDQTs7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQUVNQSxlOzs7OztBQUNMLDJCQUFZQyxLQUFaLEVBQWtCO0FBQUE7O0FBQUE7O0FBQ2pCLDhCQUFNQSxLQUFOO0FBQ0EsVUFBS0MsZ0JBQUwsR0FBd0IsTUFBS0MsaUJBQUwsQ0FBdUJDLElBQXZCLCtCQUF4QjtBQUZpQjtBQUdqQjs7OztXQUNBLDZCQUFxQjtBQUNuQixXQUFLSCxLQUFMLENBQVdJLEtBQVgsQ0FBaUJDLFNBQWpCO0FBQ0Q7OztXQUVELGtCQUFTO0FBQ1Asd0JBQTRDLEtBQUtMLEtBQWpEO0FBQUEsVUFBaUJNLFNBQWpCLGVBQVFGLEtBQVIsQ0FBaUJFLFNBQWpCO0FBQUEsVUFBOEJDLFNBQTlCLGVBQThCQSxTQUE5QjtBQUNBLDBCQUNFO0FBQ0UsUUFBQSxJQUFJLEVBQUMsUUFEUDtBQUVFLFFBQUEsS0FBSyxFQUFDLE1BRlI7QUFHRSxRQUFBLE1BQU0sRUFBQyxNQUhUO0FBSUUsUUFBQSxPQUFPLEVBQUMsV0FKVjtBQUtFLFFBQUEsU0FBUyxFQUFFQSxTQUxiO0FBTUUsUUFBQSxPQUFPLEVBQUUsS0FBS047QUFOaEIsc0JBUUM7QUFBUSxRQUFBLElBQUksRUFBQyxTQUFiO0FBQXVCLFFBQUEsRUFBRSxFQUFDLElBQTFCO0FBQStCLFFBQUEsRUFBRSxFQUFDLElBQWxDO0FBQXVDLFFBQUEsQ0FBQyxFQUFDO0FBQXpDLFFBUkQsRUFTUUssU0FBUyxpQkFDVDtBQUFHLFFBQUEsR0FBRyxFQUFDLE9BQVA7QUFBZSxRQUFBLEtBQUssRUFBRTtBQUFFRSxVQUFBQSxlQUFlLEVBQUU7QUFBbkI7QUFBdEIsc0JBQ0M7QUFBTSxRQUFBLENBQUMsRUFBQyxJQUFSO0FBQWEsUUFBQSxDQUFDLEVBQUMsSUFBZjtBQUFvQixRQUFBLElBQUksRUFBQyxTQUF6QjtBQUFtQyxRQUFBLEtBQUssRUFBQyxHQUF6QztBQUE2QyxRQUFBLE1BQU0sRUFBQztBQUFwRCxRQURELGVBRUM7QUFBTSxRQUFBLENBQUMsRUFBQyxJQUFSO0FBQWEsUUFBQSxDQUFDLEVBQUMsSUFBZjtBQUFvQixRQUFBLElBQUksRUFBQyxTQUF6QjtBQUFtQyxRQUFBLEtBQUssRUFBQyxHQUF6QztBQUE2QyxRQUFBLE1BQU0sRUFBQztBQUFwRCxRQUZELENBVlIsRUFlUSxDQUFDRixTQUFELGlCQUNBO0FBQ0UsUUFBQSxHQUFHLEVBQUMsTUFETjtBQUVFLFFBQUEsSUFBSSxFQUFDLFNBRlA7QUFHRSxRQUFBLE1BQU0sRUFBQyxtQkFIVDtBQUlFLFFBQUEsS0FBSyxFQUFFO0FBQUVFLFVBQUFBLGVBQWUsRUFBRTtBQUFuQjtBQUpULFFBaEJSLENBREY7QUEwQkQ7Ozs7RUFyQzJCQyxnQjs7ZUF3Q2Ysc0NBQWVWLGVBQWYsQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwgeyBDb21wb25lbnQgfSBmcm9tICdyZWFjdCdcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcydcbmltcG9ydCB7IHdpdGhNZWRpYVByb3BzIH0gZnJvbSAncmVhY3QtbWVkaWEtcGxheWVyJ1xuXG5jbGFzcyBDdXN0b21QbGF5UGF1c2UgZXh0ZW5kcyBDb21wb25lbnQge1xuXHRjb25zdHJ1Y3Rvcihwcm9wcyl7XG5cdFx0c3VwZXIocHJvcHMpXG5cdFx0dGhpcy5faGFuZGxlUGxheVBhdXNlID0gdGhpcy5fX2hhbmRsZVBsYXlQYXVzZS5iaW5kKHRoaXMpO1xuXHR9XG4gIF9faGFuZGxlUGxheVBhdXNlICgpIHtcbiAgICB0aGlzLnByb3BzLm1lZGlhLnBsYXlQYXVzZSgpO1xuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIGNvbnN0IHsgbWVkaWE6IHsgaXNQbGF5aW5nIH0sIGNsYXNzTmFtZSB9ID0gdGhpcy5wcm9wc1xuICAgIHJldHVybiAoXG4gICAgICA8c3ZnXG4gICAgICAgIHJvbGU9XCJidXR0b25cIlxuICAgICAgICB3aWR0aD1cIjM2cHhcIlxuICAgICAgICBoZWlnaHQ9XCIzNnB4XCJcbiAgICAgICAgdmlld0JveD1cIjAgMCAzNiAzNlwiXG4gICAgICAgIGNsYXNzTmFtZT17Y2xhc3NOYW1lfVxuICAgICAgICBvbkNsaWNrPXt0aGlzLl9oYW5kbGVQbGF5UGF1c2V9XG4gICAgICA+XG4gICAgICBcdDxjaXJjbGUgZmlsbD1cIiNGRkE1MDBcIiBjeD1cIjE4XCIgY3k9XCIxOFwiIHI9XCIxOFwiLz5cbiAgICAgICAgICAgIHsgaXNQbGF5aW5nICYmXG4gICAgICAgICAgICAgIDxnIGtleT1cInBhdXNlXCIgc3R5bGU9e3sgdHJhbnNmb3JtT3JpZ2luOiAnMCUgNTAlJyB9fT5cbiAgICAgICAgXHQgICAgICA8cmVjdCB4PVwiMTJcIiB5PVwiMTFcIiBmaWxsPVwiI0ZGRkZGRlwiIHdpZHRoPVwiNFwiIGhlaWdodD1cIjE0XCIvPlxuICAgICAgICBcdCAgICAgIDxyZWN0IHg9XCIyMFwiIHk9XCIxMVwiIGZpbGw9XCIjRkZGRkZGXCIgd2lkdGg9XCI0XCIgaGVpZ2h0PVwiMTRcIi8+XG4gICAgICAgICAgICAgIDwvZz5cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHsgIWlzUGxheWluZyAmJlxuICAgICAgICAgICAgICA8cG9seWdvblxuICAgICAgICAgICAgICAgIGtleT1cInBsYXlcIlxuICAgICAgICAgICAgICAgIGZpbGw9XCIjRkZGRkZGXCJcbiAgICAgICAgICAgICAgICBwb2ludHM9XCIxNCwxMSAyNiwxOCAxNCwyNVwiXG4gICAgICAgICAgICAgICAgc3R5bGU9e3sgdHJhbnNmb3JtT3JpZ2luOiAnMTAwJSA1MCUnIH19XG4gICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICB9XG4gICAgICA8L3N2Zz5cbiAgICApXG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgd2l0aE1lZGlhUHJvcHMoQ3VzdG9tUGxheVBhdXNlKVxuIl19