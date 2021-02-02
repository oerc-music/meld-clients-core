"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactRedux = require("react-redux");

var _redux = require("redux");

var _tei = _interopRequireDefault(require("../containers/tei"));

var _image = _interopRequireDefault(require("../containers/image"));

var _index = require("..//actions/index");

var _reactTabs = require("react-tabs");

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

var MEIManifestation = "meldterm:MEIManifestation";
var TEIManifestation = "meldterm:TEIManifestation";
var IIIFManifestation = "meldterm:IIIFManifestation";
var VideoManifestation = "meldterm:VideoManifestation";
var AudioManifestation = "meldterm:AudioManifestation";
var ImageManifestation = "meldterm:ImageManifestation";
var Carousel = "meldterm:MEICarousel";
var CarouselClassic = "meldterm:MEIClassicCarousel";
var FOR_ORCHESTRA = "http://id.loc.gov/authorities/performanceMediums/2013015516";
var HAS_PIANO = "http://id.loc.gov/authorities/performanceMediums/2013015550";

function isElementInViewport(el) {
  var rect = el.getBoundingClientRect(); // FIXME: Hardwired values

  return rect.top >= 110 && // Based on the TEI container's CSS 
  rect.left >= (window.innerWidth || document.documentElement.clientWidth) / 2 - 350 && rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) - 190 && rect.right <= (window.innerWidth || document.documentElement.clientWidth) / 2 + 350;
}

var Essay = /*#__PURE__*/function (_Component) {
  _inherits(Essay, _Component);

  var _super = _createSuper(Essay);

  function Essay(props) {
    _classCallCheck(this, Essay);

    return _super.call(this, props);
  }

  _createClass(Essay, [{
    key: "inViewRefs",
    value: function inViewRefs() {
      var refs = document.getElementsByTagName('tei-link');
      refs = Array.from(refs).filter(isElementInViewport);
      this.props.updateLinks(refs);
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate() {}
  }, {
    key: "render",
    value: function render() {
      return /*#__PURE__*/_react["default"].createElement(_tei["default"], {
        key: this.props.uri,
        uri: this.props.uri // motif={ this.props.current }
        ,
        scrollFun: this.inViewRefs.bind(this)
      });
    }
  }]);

  return Essay;
}(_react.Component);

exports["default"] = Essay;