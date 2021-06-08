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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb250YWluZXJzL2Vzc2F5LmpzIl0sIm5hbWVzIjpbIk1FSU1hbmlmZXN0YXRpb24iLCJURUlNYW5pZmVzdGF0aW9uIiwiSUlJRk1hbmlmZXN0YXRpb24iLCJWaWRlb01hbmlmZXN0YXRpb24iLCJBdWRpb01hbmlmZXN0YXRpb24iLCJJbWFnZU1hbmlmZXN0YXRpb24iLCJDYXJvdXNlbCIsIkNhcm91c2VsQ2xhc3NpYyIsIkZPUl9PUkNIRVNUUkEiLCJIQVNfUElBTk8iLCJpc0VsZW1lbnRJblZpZXdwb3J0IiwiZWwiLCJyZWN0IiwiZ2V0Qm91bmRpbmdDbGllbnRSZWN0IiwidG9wIiwibGVmdCIsIndpbmRvdyIsImlubmVyV2lkdGgiLCJkb2N1bWVudCIsImRvY3VtZW50RWxlbWVudCIsImNsaWVudFdpZHRoIiwiYm90dG9tIiwiaW5uZXJIZWlnaHQiLCJjbGllbnRIZWlnaHQiLCJyaWdodCIsIkVzc2F5IiwicHJvcHMiLCJyZWZzIiwiZ2V0RWxlbWVudHNCeVRhZ05hbWUiLCJBcnJheSIsImZyb20iLCJmaWx0ZXIiLCJ1cGRhdGVMaW5rcyIsInVyaSIsImluVmlld1JlZnMiLCJiaW5kIiwiQ29tcG9uZW50Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQTs7QUFDQTs7QUFDQTs7QUFJQTs7QUFDQTs7QUFDQTs7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUVBLElBQU1BLGdCQUFnQixHQUFHLDJCQUF6QjtBQUNBLElBQU1DLGdCQUFnQixHQUFHLDJCQUF6QjtBQUNBLElBQU1DLGlCQUFpQixHQUFHLDRCQUExQjtBQUNBLElBQU1DLGtCQUFrQixHQUFHLDZCQUEzQjtBQUNBLElBQU1DLGtCQUFrQixHQUFHLDZCQUEzQjtBQUNBLElBQU1DLGtCQUFrQixHQUFHLDZCQUEzQjtBQUNBLElBQU1DLFFBQVEsR0FBRSxzQkFBaEI7QUFDQSxJQUFNQyxlQUFlLEdBQUUsNkJBQXZCO0FBQ0EsSUFBTUMsYUFBYSxHQUFHLDZEQUF0QjtBQUNBLElBQU1DLFNBQVMsR0FBRyw2REFBbEI7O0FBRUEsU0FBU0MsbUJBQVQsQ0FBNkJDLEVBQTdCLEVBQWdDO0FBQy9CLE1BQUlDLElBQUksR0FBR0QsRUFBRSxDQUFDRSxxQkFBSCxFQUFYLENBRCtCLENBRS9COztBQUNDLFNBQ0VELElBQUksQ0FBQ0UsR0FBTCxJQUFZLEdBQVosSUFBbUI7QUFDakJGLEVBQUFBLElBQUksQ0FBQ0csSUFBTCxJQUFjLENBQUNDLE1BQU0sQ0FBQ0MsVUFBUCxJQUFxQkMsUUFBUSxDQUFDQyxlQUFULENBQXlCQyxXQUEvQyxJQUE4RCxDQUEvRCxHQUFvRSxHQURuRixJQUVEUixJQUFJLENBQUNTLE1BQUwsSUFBZSxDQUFDTCxNQUFNLENBQUNNLFdBQVAsSUFBc0JKLFFBQVEsQ0FBQ0MsZUFBVCxDQUF5QkksWUFBaEQsSUFBZ0UsR0FGOUUsSUFHRFgsSUFBSSxDQUFDWSxLQUFMLElBQWUsQ0FBQ1IsTUFBTSxDQUFDQyxVQUFQLElBQXFCQyxRQUFRLENBQUNDLGVBQVQsQ0FBeUJDLFdBQS9DLElBQTZELENBQTlELEdBQW1FLEdBSmxGO0FBTUQ7O0lBRW9CSyxLOzs7OztBQUNuQixpQkFBWUMsS0FBWixFQUFtQjtBQUFBOztBQUFBLDZCQUNYQSxLQURXO0FBR2xCOzs7O1dBQ0Ysc0JBQVk7QUFDWCxVQUFJQyxJQUFJLEdBQUNULFFBQVEsQ0FBQ1Usb0JBQVQsQ0FBOEIsVUFBOUIsQ0FBVDtBQUNBRCxNQUFBQSxJQUFJLEdBQUdFLEtBQUssQ0FBQ0MsSUFBTixDQUFXSCxJQUFYLEVBQWlCSSxNQUFqQixDQUF3QnJCLG1CQUF4QixDQUFQO0FBQ0EsV0FBS2dCLEtBQUwsQ0FBV00sV0FBWCxDQUF1QkwsSUFBdkI7QUFDQTs7O1dBQ0QsOEJBQW9CLENBRW5COzs7V0FDQSxrQkFBUTtBQUNOLDBCQUNELGdDQUFDLGVBQUQ7QUFBSyxRQUFBLEdBQUcsRUFBRSxLQUFLRCxLQUFMLENBQVdPLEdBQXJCO0FBQ0ssUUFBQSxHQUFHLEVBQUUsS0FBS1AsS0FBTCxDQUFXTyxHQURyQixDQUVHO0FBRkg7QUFHRyxRQUFBLFNBQVMsRUFBRSxLQUFLQyxVQUFMLENBQWdCQyxJQUFoQixDQUFxQixJQUFyQjtBQUhkLFFBREM7QUFNRDs7OztFQXBCZ0NDLGdCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7IENvbXBvbmVudCB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IGNvbm5lY3QgfSBmcm9tICdyZWFjdC1yZWR1eCcgO1xuaW1wb3J0IHsgYmluZEFjdGlvbkNyZWF0b3JzIH0gZnJvbSAncmVkdXgnO1xuXG4vL2ltcG9ydCBTY29yZSBmcm9tICdtZWxkLWNsaWVudC9zcmMvY29udGFpbmVycy9zY29yZSc7XG4vL2ltcG9ydCBURUkgZnJvbSAnLi4vY29udGFpbmVycy90ZWknO1xuaW1wb3J0IFRFSSBmcm9tICcuLi9jb250YWluZXJzL3RlaSc7XG5pbXBvcnQgTXlJbWFnZSBmcm9tICcuLi9jb250YWluZXJzL2ltYWdlJztcbmltcG9ydCB7IGZldGNoR3JhcGggfSBmcm9tICcuLi8vYWN0aW9ucy9pbmRleCc7XG5pbXBvcnQgeyBUYWIsIFRhYnMsIFRhYkxpc3QsIFRhYlBhbmVsIH0gZnJvbSAncmVhY3QtdGFicyc7XG5cbmNvbnN0IE1FSU1hbmlmZXN0YXRpb24gPSBcIm1lbGR0ZXJtOk1FSU1hbmlmZXN0YXRpb25cIjtcbmNvbnN0IFRFSU1hbmlmZXN0YXRpb24gPSBcIm1lbGR0ZXJtOlRFSU1hbmlmZXN0YXRpb25cIjtcbmNvbnN0IElJSUZNYW5pZmVzdGF0aW9uID0gXCJtZWxkdGVybTpJSUlGTWFuaWZlc3RhdGlvblwiO1xuY29uc3QgVmlkZW9NYW5pZmVzdGF0aW9uID0gXCJtZWxkdGVybTpWaWRlb01hbmlmZXN0YXRpb25cIjtcbmNvbnN0IEF1ZGlvTWFuaWZlc3RhdGlvbiA9IFwibWVsZHRlcm06QXVkaW9NYW5pZmVzdGF0aW9uXCI7XG5jb25zdCBJbWFnZU1hbmlmZXN0YXRpb24gPSBcIm1lbGR0ZXJtOkltYWdlTWFuaWZlc3RhdGlvblwiO1xuY29uc3QgQ2Fyb3VzZWw9IFwibWVsZHRlcm06TUVJQ2Fyb3VzZWxcIjtcbmNvbnN0IENhcm91c2VsQ2xhc3NpYz0gXCJtZWxkdGVybTpNRUlDbGFzc2ljQ2Fyb3VzZWxcIjtcbmNvbnN0IEZPUl9PUkNIRVNUUkEgPSBcImh0dHA6Ly9pZC5sb2MuZ292L2F1dGhvcml0aWVzL3BlcmZvcm1hbmNlTWVkaXVtcy8yMDEzMDE1NTE2XCI7XG5jb25zdCBIQVNfUElBTk8gPSBcImh0dHA6Ly9pZC5sb2MuZ292L2F1dGhvcml0aWVzL3BlcmZvcm1hbmNlTWVkaXVtcy8yMDEzMDE1NTUwXCI7XG5cbmZ1bmN0aW9uIGlzRWxlbWVudEluVmlld3BvcnQoZWwpe1xuXHR2YXIgcmVjdCA9IGVsLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuXHQvLyBGSVhNRTogSGFyZHdpcmVkIHZhbHVlc1xuICByZXR1cm4gKFxuICAgIHJlY3QudG9wID49IDExMCAmJiAvLyBCYXNlZCBvbiB0aGUgVEVJIGNvbnRhaW5lcidzIENTUyBcbiAgICAgIHJlY3QubGVmdCA+PSAoKHdpbmRvdy5pbm5lcldpZHRoIHx8IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGllbnRXaWR0aCkgLyAyKSAtIDM1MCAmJlxuXHRcdFx0cmVjdC5ib3R0b20gPD0gKHdpbmRvdy5pbm5lckhlaWdodCB8fCBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xpZW50SGVpZ2h0KSAtIDE5MCAmJiBcblx0XHRcdHJlY3QucmlnaHQgPD0gKCh3aW5kb3cuaW5uZXJXaWR0aCB8fCBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xpZW50V2lkdGgpIC8yKSArIDM1MFxuICApO1xufVxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBFc3NheSBleHRlbmRzIENvbXBvbmVudCB7XG4gIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgc3VwZXIocHJvcHMpO1xuXHRcdFxuICB9XG5cdGluVmlld1JlZnMoKXtcblx0XHR2YXIgcmVmcz1kb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSgndGVpLWxpbmsnKTtcblx0XHRyZWZzID0gQXJyYXkuZnJvbShyZWZzKS5maWx0ZXIoaXNFbGVtZW50SW5WaWV3cG9ydCk7XG5cdFx0dGhpcy5wcm9wcy51cGRhdGVMaW5rcyhyZWZzKTtcblx0fVxuXHRjb21wb25lbnREaWRVcGRhdGUoKXtcblx0XHRcblx0fVxuICByZW5kZXIoKXtcbiAgICByZXR1cm4gKFxuXHRcdFx0PFRFSSBrZXk9e3RoaXMucHJvcHMudXJpfVxuXHRcdFx0ICAgICB1cmk9e3RoaXMucHJvcHMudXJpfVxuXHRcdFx0XHRcdCAvLyBtb3RpZj17IHRoaXMucHJvcHMuY3VycmVudCB9XG5cdFx0XHRcdFx0IHNjcm9sbEZ1bj17dGhpcy5pblZpZXdSZWZzLmJpbmQodGhpcyl9Lz5cbiAgICApO1xuICB9XG59XG4iXX0=