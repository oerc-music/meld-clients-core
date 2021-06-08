"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _app = _interopRequireDefault(require("../app"));

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

var ForbiddenQuestion = /*#__PURE__*/function (_Component) {
  _inherits(ForbiddenQuestion, _Component);

  var _super = _createSuper(ForbiddenQuestion);

  function ForbiddenQuestion(props) {
    _classCallCheck(this, ForbiddenQuestion);

    return _super.call(this, props);
  }

  _createClass(ForbiddenQuestion, [{
    key: "render",
    value: function render() {
      return /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement("link", {
        rel: "stylesheet",
        href: "../../style/forbiddenQuestion.css",
        type: "text/css"
      }), /*#__PURE__*/_react["default"].createElement(_app["default"], {
        foo: "bar",
        graphUri: this.props.location.query.annotations
      }));
    }
  }]);

  return ForbiddenQuestion;
}(_react.Component);

exports["default"] = ForbiddenQuestion;
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9jb250YWluZXJzL211c2ljb2xvZ3kvZGVtby9Mb2hlbmdyaW4uanMiXSwibmFtZXMiOlsiRm9yYmlkZGVuUXVlc3Rpb24iLCJwcm9wcyIsImxvY2F0aW9uIiwicXVlcnkiLCJhbm5vdGF0aW9ucyIsIkNvbXBvbmVudCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUE7O0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUFFcUJBLGlCOzs7OztBQUNuQiw2QkFBWUMsS0FBWixFQUFtQjtBQUFBOztBQUFBLDZCQUNYQSxLQURXO0FBRWxCOzs7O1dBR0Qsa0JBQVM7QUFDUCwwQkFDSSwwREFDRTtBQUFNLFFBQUEsR0FBRyxFQUFDLFlBQVY7QUFBdUIsUUFBQSxJQUFJLEVBQUMsbUNBQTVCO0FBQWdFLFFBQUEsSUFBSSxFQUFDO0FBQXJFLFFBREYsZUFFRSxnQ0FBQyxlQUFEO0FBQUssUUFBQSxHQUFHLEVBQUMsS0FBVDtBQUFlLFFBQUEsUUFBUSxFQUFFLEtBQUtBLEtBQUwsQ0FBV0MsUUFBWCxDQUFvQkMsS0FBcEIsQ0FBMEJDO0FBQW5ELFFBRkYsQ0FESjtBQU1EOzs7O0VBYjRDQyxnQjs7O0FBZTlDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7Q29tcG9uZW50fSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgQXBwIGZyb20gJy4uL2FwcCc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEZvcmJpZGRlblF1ZXN0aW9uIGV4dGVuZHMgQ29tcG9uZW50IHtcbiAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICBzdXBlcihwcm9wcyk7XG4gIH1cblxuXG4gIHJlbmRlcigpIHtcbiAgICByZXR1cm4gKFxuICAgICAgICA8ZGl2PlxuICAgICAgICAgIDxsaW5rIHJlbD1cInN0eWxlc2hlZXRcIiBocmVmPVwiLi4vLi4vc3R5bGUvZm9yYmlkZGVuUXVlc3Rpb24uY3NzXCIgdHlwZT1cInRleHQvY3NzXCIvPlxuICAgICAgICAgIDxBcHAgZm9vPVwiYmFyXCIgZ3JhcGhVcmk9e3RoaXMucHJvcHMubG9jYXRpb24ucXVlcnkuYW5ub3RhdGlvbnN9Lz5cbiAgICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxuXG59O1xuXG5cblxuIl19