"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactLeaflet = require("react-leaflet");

var _reactLeafletIiif = _interopRequireDefault(require("react-leaflet-iiif"));

var _leaflet = _interopRequireDefault(require("leaflet"));

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

var IIIF = /*#__PURE__*/function (_Component) {
  _inherits(IIIF, _Component);

  var _super = _createSuper(IIIF);

  function IIIF(props) {
    var _this;

    _classCallCheck(this, IIIF);

    _this = _super.call(this, props); // console.log("Hello, got props: ", this.props)

    var lat = "lat" in _this.props ? _this.props.lat : 0;
    var lng = "lng" in _this.props ? _this.props.lng : 0;
    var zoom = "zoom" in _this.props ? _this.props.zoom : 1;
    var className = "className" in _this.props ? _this.props.className : "map";
    var iiifTileLayer = "iiifTileLayer" in _this.props ? _this.props.iiifTileLayer : /*#__PURE__*/_react["default"].createElement(_reactLeafletIiif["default"], {
      url: _this.props.url
    });
    var map = "map" in _this.props ? _this.props.map : /*#__PURE__*/_react["default"].createElement(_reactLeaflet.Map, {
      className: className,
      center: [lat, lng],
      zoom: zoom,
      crs: _leaflet["default"].CRS.Simple
    }, iiifTileLayer);
    _this.state = {
      map: map
    };
    return _this;
  }

  _createClass(IIIF, [{
    key: "render",
    value: function render() {
      // console.log("STATE: ", this.state);
      return /*#__PURE__*/_react["default"].createElement("div", {
        className: "LeafletWrapper"
      }, /*#__PURE__*/_react["default"].createElement("link", {
        rel: "stylesheet",
        href: "../style/leaflet.css"
      }), /*#__PURE__*/_react["default"].createElement("link", {
        rel: "stylesheet",
        href: "../style/iiif.css"
      }), this.state.map);
    }
  }]);

  return IIIF;
}(_react.Component);

exports["default"] = IIIF;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21wb25lbnRzL2lpaWYuanMiXSwibmFtZXMiOlsiSUlJRiIsInByb3BzIiwibGF0IiwibG5nIiwiem9vbSIsImNsYXNzTmFtZSIsImlpaWZUaWxlTGF5ZXIiLCJ1cmwiLCJtYXAiLCJMZWFmbGV0IiwiQ1JTIiwiU2ltcGxlIiwic3RhdGUiLCJDb21wb25lbnQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBOztBQUNBOztBQUNBOztBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBRXFCQSxJOzs7OztBQUNuQixnQkFBWUMsS0FBWixFQUFtQjtBQUFBOztBQUFBOztBQUNqQiw4QkFBTUEsS0FBTixFQURpQixDQUVqQjs7QUFDQSxRQUFNQyxHQUFHLEdBQUcsU0FBUyxNQUFLRCxLQUFkLEdBQXNCLE1BQUtBLEtBQUwsQ0FBV0MsR0FBakMsR0FBdUMsQ0FBbkQ7QUFDQSxRQUFNQyxHQUFHLEdBQUcsU0FBUyxNQUFLRixLQUFkLEdBQXNCLE1BQUtBLEtBQUwsQ0FBV0UsR0FBakMsR0FBdUMsQ0FBbkQ7QUFDQSxRQUFNQyxJQUFJLEdBQUcsVUFBVSxNQUFLSCxLQUFmLEdBQXVCLE1BQUtBLEtBQUwsQ0FBV0csSUFBbEMsR0FBeUMsQ0FBdEQ7QUFDQSxRQUFNQyxTQUFTLEdBQUcsZUFBZSxNQUFLSixLQUFwQixHQUE0QixNQUFLQSxLQUFMLENBQVdJLFNBQXZDLEdBQW1ELEtBQXJFO0FBQ0EsUUFBTUMsYUFBYSxHQUFHLG1CQUFtQixNQUFLTCxLQUF4QixHQUFnQyxNQUFLQSxLQUFMLENBQVdLLGFBQTNDLGdCQUNsQixnQ0FBQyw0QkFBRDtBQUFlLE1BQUEsR0FBRyxFQUFFLE1BQUtMLEtBQUwsQ0FBV007QUFBL0IsTUFESjtBQUVBLFFBQU1DLEdBQUcsR0FBRyxTQUFTLE1BQUtQLEtBQWQsR0FBc0IsTUFBS0EsS0FBTCxDQUFXTyxHQUFqQyxnQkFDUixnQ0FBQyxpQkFBRDtBQUFLLE1BQUEsU0FBUyxFQUFFSCxTQUFoQjtBQUEyQixNQUFBLE1BQU0sRUFBRSxDQUFDSCxHQUFELEVBQU1DLEdBQU4sQ0FBbkM7QUFBK0MsTUFBQSxJQUFJLEVBQUVDLElBQXJEO0FBQTJELE1BQUEsR0FBRyxFQUFFSyxvQkFBUUMsR0FBUixDQUFZQztBQUE1RSxPQUNHTCxhQURILENBREo7QUFJQSxVQUFLTSxLQUFMLEdBQWE7QUFBQ0osTUFBQUEsR0FBRyxFQUFIQTtBQUFELEtBQWI7QUFiaUI7QUFjbEI7Ozs7V0FFRCxrQkFBUztBQUNQO0FBQ0EsMEJBQ0k7QUFBSyxRQUFBLFNBQVMsRUFBRTtBQUFoQixzQkFDRTtBQUFNLFFBQUEsR0FBRyxFQUFDLFlBQVY7QUFBdUIsUUFBQSxJQUFJLEVBQUM7QUFBNUIsUUFERixlQUVFO0FBQU0sUUFBQSxHQUFHLEVBQUMsWUFBVjtBQUF1QixRQUFBLElBQUksRUFBQztBQUE1QixRQUZGLEVBR0csS0FBS0ksS0FBTCxDQUFXSixHQUhkLENBREo7QUFPRDs7OztFQTFCK0JLLGdCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7Q29tcG9uZW50fSBmcm9tICdyZWFjdCc7XG5pbXBvcnQge01hcH0gZnJvbSAncmVhY3QtbGVhZmxldCdcbmltcG9ydCBJSUlGVGlsZUxheWVyIGZyb20gJ3JlYWN0LWxlYWZsZXQtaWlpZidcbmltcG9ydCBMZWFmbGV0IGZyb20gJ2xlYWZsZXQnXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIElJSUYgZXh0ZW5kcyBDb21wb25lbnQge1xuICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgIHN1cGVyKHByb3BzKTtcbiAgICAvLyBjb25zb2xlLmxvZyhcIkhlbGxvLCBnb3QgcHJvcHM6IFwiLCB0aGlzLnByb3BzKVxuICAgIGNvbnN0IGxhdCA9IFwibGF0XCIgaW4gdGhpcy5wcm9wcyA/IHRoaXMucHJvcHMubGF0IDogMDtcbiAgICBjb25zdCBsbmcgPSBcImxuZ1wiIGluIHRoaXMucHJvcHMgPyB0aGlzLnByb3BzLmxuZyA6IDA7XG4gICAgY29uc3Qgem9vbSA9IFwiem9vbVwiIGluIHRoaXMucHJvcHMgPyB0aGlzLnByb3BzLnpvb20gOiAxO1xuICAgIGNvbnN0IGNsYXNzTmFtZSA9IFwiY2xhc3NOYW1lXCIgaW4gdGhpcy5wcm9wcyA/IHRoaXMucHJvcHMuY2xhc3NOYW1lIDogXCJtYXBcIjtcbiAgICBjb25zdCBpaWlmVGlsZUxheWVyID0gXCJpaWlmVGlsZUxheWVyXCIgaW4gdGhpcy5wcm9wcyA/IHRoaXMucHJvcHMuaWlpZlRpbGVMYXllciA6XG4gICAgICAgIDxJSUlGVGlsZUxheWVyIHVybD17dGhpcy5wcm9wcy51cmx9Lz47XG4gICAgY29uc3QgbWFwID0gXCJtYXBcIiBpbiB0aGlzLnByb3BzID8gdGhpcy5wcm9wcy5tYXAgOlxuICAgICAgICA8TWFwIGNsYXNzTmFtZT17Y2xhc3NOYW1lfSBjZW50ZXI9e1tsYXQsIGxuZ119IHpvb209e3pvb219IGNycz17TGVhZmxldC5DUlMuU2ltcGxlfT5cbiAgICAgICAgICB7aWlpZlRpbGVMYXllcn1cbiAgICAgICAgPC9NYXA+O1xuICAgIHRoaXMuc3RhdGUgPSB7bWFwfVxuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIC8vIGNvbnNvbGUubG9nKFwiU1RBVEU6IFwiLCB0aGlzLnN0YXRlKTtcbiAgICByZXR1cm4gKFxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT17XCJMZWFmbGV0V3JhcHBlclwifT5cbiAgICAgICAgICA8bGluayByZWw9XCJzdHlsZXNoZWV0XCIgaHJlZj1cIi4uL3N0eWxlL2xlYWZsZXQuY3NzXCIvPlxuICAgICAgICAgIDxsaW5rIHJlbD1cInN0eWxlc2hlZXRcIiBocmVmPVwiLi4vc3R5bGUvaWlpZi5jc3NcIi8+XG4gICAgICAgICAge3RoaXMuc3RhdGUubWFwfVxuICAgICAgICA8L2Rpdj5cbiAgICApXG4gIH1cbn1cblxuIl19