"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactMediaPlayer = require("react-media-player");

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

var PlayPause = _reactMediaPlayer.controls.PlayPause,
    CurrentTime = _reactMediaPlayer.controls.CurrentTime,
    Progress = _reactMediaPlayer.controls.Progress,
    SeekBar = _reactMediaPlayer.controls.SeekBar,
    Duration = _reactMediaPlayer.controls.Duration,
    MuteUnmute = _reactMediaPlayer.controls.MuteUnmute,
    Volume = _reactMediaPlayer.controls.Volume,
    Fullscreen = _reactMediaPlayer.controls.Fullscreen;

var MediaPlayer = /*#__PURE__*/function (_Component) {
  _inherits(MediaPlayer, _Component);

  var _super = _createSuper(MediaPlayer);

  function MediaPlayer() {
    _classCallCheck(this, MediaPlayer);

    return _super.apply(this, arguments);
  }

  _createClass(MediaPlayer, [{
    key: "render",
    value: function render() {
      console.log("MEDIA PLAYER HAS PROPS: ", this.props);
      return /*#__PURE__*/_react["default"].createElement(_reactMediaPlayer.Media, null, /*#__PURE__*/_react["default"].createElement("div", {
        className: "media"
      }, /*#__PURE__*/_react["default"].createElement("div", {
        className: "media-player"
      }, /*#__PURE__*/_react["default"].createElement(_reactMediaPlayer.Player, {
        src: this.props.uri
      })), /*#__PURE__*/_react["default"].createElement("div", {
        className: "media-controls"
      }, /*#__PURE__*/_react["default"].createElement(PlayPause, null), /*#__PURE__*/_react["default"].createElement(CurrentTime, null), /*#__PURE__*/_react["default"].createElement(SeekBar, null), /*#__PURE__*/_react["default"].createElement(Duration, null), /*#__PURE__*/_react["default"].createElement(MuteUnmute, null), /*#__PURE__*/_react["default"].createElement(Volume, null), /*#__PURE__*/_react["default"].createElement(Fullscreen, null))));
    }
  }]);

  return MediaPlayer;
}(_react.Component);

var _default = MediaPlayer;
exports["default"] = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21wb25lbnRzL21lZGlhUGxheWVyLmpzIl0sIm5hbWVzIjpbIlBsYXlQYXVzZSIsImNvbnRyb2xzIiwiQ3VycmVudFRpbWUiLCJQcm9ncmVzcyIsIlNlZWtCYXIiLCJEdXJhdGlvbiIsIk11dGVVbm11dGUiLCJWb2x1bWUiLCJGdWxsc2NyZWVuIiwiTWVkaWFQbGF5ZXIiLCJjb25zb2xlIiwibG9nIiwicHJvcHMiLCJ1cmkiLCJDb21wb25lbnQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBOztBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUVBLElBQU9BLFNBQVAsR0FBOEZDLDBCQUE5RixDQUFPRCxTQUFQO0FBQUEsSUFBa0JFLFdBQWxCLEdBQThGRCwwQkFBOUYsQ0FBa0JDLFdBQWxCO0FBQUEsSUFBK0JDLFFBQS9CLEdBQThGRiwwQkFBOUYsQ0FBK0JFLFFBQS9CO0FBQUEsSUFBeUNDLE9BQXpDLEdBQThGSCwwQkFBOUYsQ0FBeUNHLE9BQXpDO0FBQUEsSUFBa0RDLFFBQWxELEdBQThGSiwwQkFBOUYsQ0FBa0RJLFFBQWxEO0FBQUEsSUFBNERDLFVBQTVELEdBQThGTCwwQkFBOUYsQ0FBNERLLFVBQTVEO0FBQUEsSUFBd0VDLE1BQXhFLEdBQThGTiwwQkFBOUYsQ0FBd0VNLE1BQXhFO0FBQUEsSUFBZ0ZDLFVBQWhGLEdBQThGUCwwQkFBOUYsQ0FBZ0ZPLFVBQWhGOztJQUVNQyxXOzs7Ozs7Ozs7Ozs7O1dBQ0osa0JBQVM7QUFDUEMsTUFBQUEsT0FBTyxDQUFDQyxHQUFSLENBQVksMEJBQVosRUFBd0MsS0FBS0MsS0FBN0M7QUFDQSwwQkFDSSxnQ0FBQyx1QkFBRCxxQkFDRTtBQUFLLFFBQUEsU0FBUyxFQUFDO0FBQWYsc0JBQ0U7QUFBSyxRQUFBLFNBQVMsRUFBQztBQUFmLHNCQUNFLGdDQUFDLHdCQUFEO0FBQVEsUUFBQSxHQUFHLEVBQUUsS0FBS0EsS0FBTCxDQUFXQztBQUF4QixRQURGLENBREYsZUFJRTtBQUFLLFFBQUEsU0FBUyxFQUFDO0FBQWYsc0JBQ0UsZ0NBQUMsU0FBRCxPQURGLGVBRUUsZ0NBQUMsV0FBRCxPQUZGLGVBSUUsZ0NBQUMsT0FBRCxPQUpGLGVBS0UsZ0NBQUMsUUFBRCxPQUxGLGVBTUUsZ0NBQUMsVUFBRCxPQU5GLGVBT0UsZ0NBQUMsTUFBRCxPQVBGLGVBUUUsZ0NBQUMsVUFBRCxPQVJGLENBSkYsQ0FERixDQURKO0FBbUJEOzs7O0VBdEJ1QkMsZ0I7O2VBeUJYTCxXIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7Q29tcG9uZW50fSBmcm9tICdyZWFjdCc7XG5pbXBvcnQge2NvbnRyb2xzLCBNZWRpYSwgUGxheWVyfSBmcm9tICdyZWFjdC1tZWRpYS1wbGF5ZXInO1xuXG5jb25zdCB7UGxheVBhdXNlLCBDdXJyZW50VGltZSwgUHJvZ3Jlc3MsIFNlZWtCYXIsIER1cmF0aW9uLCBNdXRlVW5tdXRlLCBWb2x1bWUsIEZ1bGxzY3JlZW59ID0gY29udHJvbHM7XG5cbmNsYXNzIE1lZGlhUGxheWVyIGV4dGVuZHMgQ29tcG9uZW50IHtcbiAgcmVuZGVyKCkge1xuICAgIGNvbnNvbGUubG9nKFwiTUVESUEgUExBWUVSIEhBUyBQUk9QUzogXCIsIHRoaXMucHJvcHMpO1xuICAgIHJldHVybiAoXG4gICAgICAgIDxNZWRpYT5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm1lZGlhXCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm1lZGlhLXBsYXllclwiPlxuICAgICAgICAgICAgICA8UGxheWVyIHNyYz17dGhpcy5wcm9wcy51cml9Lz5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtZWRpYS1jb250cm9sc1wiPlxuICAgICAgICAgICAgICA8UGxheVBhdXNlLz5cbiAgICAgICAgICAgICAgPEN1cnJlbnRUaW1lLz5cbiAgICAgICAgICAgICAgey8qIDxQcm9ncmVzcy8+ICovfVxuICAgICAgICAgICAgICA8U2Vla0Jhci8+XG4gICAgICAgICAgICAgIDxEdXJhdGlvbi8+XG4gICAgICAgICAgICAgIDxNdXRlVW5tdXRlLz5cbiAgICAgICAgICAgICAgPFZvbHVtZS8+XG4gICAgICAgICAgICAgIDxGdWxsc2NyZWVuLz5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L01lZGlhPlxuICAgICk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgTWVkaWFQbGF5ZXJcbiJdfQ==