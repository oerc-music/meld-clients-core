"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactRedux = require("react-redux");

var _redux = require("redux");

var _reactMediaPlayer = require("react-media-player");

var _reactMediaPlayerPlayPause = _interopRequireDefault(require("../containers/react-media-player-play-pause"));

var _index = require("../actions/index");

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

var defaultPlayPause = _reactMediaPlayer.controls.defaultPlayPause,
    CurrentTime = _reactMediaPlayer.controls.CurrentTime,
    Progress = _reactMediaPlayer.controls.Progress,
    SeekBar = _reactMediaPlayer.controls.SeekBar,
    Duration = _reactMediaPlayer.controls.Duration,
    MuteUnmute = _reactMediaPlayer.controls.MuteUnmute,
    Volume = _reactMediaPlayer.controls.Volume,
    Fullscreen = _reactMediaPlayer.controls.Fullscreen;

var Video = /*#__PURE__*/function (_Component) {
  _inherits(Video, _Component);

  var _super = _createSuper(Video);

  function Video(props) {
    var _this;

    _classCallCheck(this, Video);

    _this = _super.call(this, props);
    _this.state = {
      jumpedTime: false,
      lastMediaTick: 0
    };
    _this.tick = _this.tick.bind(_assertThisInitialized(_this)); //		this.clearCursor= this.clearCursor.bind(this);

    return _this;
  }

  _createClass(Video, [{
    key: "inViewRefs",
    value: function inViewRefs() {}
  }, {
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps() {
      if (this.state.jumpedTime) this.setState({
        jumpedTime: false
      });
    }
  }, {
    key: "componentWillMount",
    value: function componentWillMount() {//		clockProvider = this.props.uri;
      //		this.props.registerClock(this.props.uri);
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {}
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate() {}
  }, {
    key: "tick",
    value: function tick(id, t) {
      if (Math.floor(t.currentTime) > this.state.lastMediaTick || // if we've progressed across the next second boundary, 
      t.currentTime < this.state.lastMediaTick) {
        // OR if we've gone back in time (user did a seek)...
        this.setState({
          lastMediaTick: Math.floor(t.currentTime)
        }); // keep track of this time tick)
        // dispatch a "TICK" action 
        // any time-sensitive component subscribes to it, 
        // triggering time-anchored annotations triggered as appropriate

        this.props.tickTimedResource(id, Math.floor(t.currentTime));
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      console.log(this.props.timesync);
      var cT = this.props.timesync && "mediaResources" in this.props.timesync && this.props.uri in this.props.timesync.mediaResources ? this.props.timesync.mediaResources[this.props.uri]['currentTime'] : 0;
      /*
      console.log(this.props.timesync);
      if(this.props.timesync && "mediaResources" in this.props.timesync
      	 && clockProvider in this.props.timesync.mediaResources){
      	cT = this.props.timesync.mediaResources[clockProvider]['currentTime'];
      	var syncs = this.props.timesync.mediaResources[clockProvider]['times'];
      	var times = Object.keys(syncs).map((t)=> Number(t));
      	console.log(times, syncs);
      }*/

      return /*#__PURE__*/_react["default"].createElement(_reactMediaPlayer.Media, {
        key: this.props.uri,
        className: "videoEssay"
      }, /*#__PURE__*/_react["default"].createElement("div", {
        className: "media videoEssay"
      }, /*#__PURE__*/_react["default"].createElement("div", {
        className: "media-player"
      }, /*#__PURE__*/_react["default"].createElement(_reactMediaPlayer.Player, {
        width: "700px",
        src: this.props.uri,
        onTimeUpdate: function onTimeUpdate(t) {
          _this2.tick(_this2.props.uri, t);
        },
        defaultCurrentTime: cT
      })), /*#__PURE__*/_react["default"].createElement("div", {
        className: "media-controls"
      }, /*#__PURE__*/_react["default"].createElement(_reactMediaPlayerPlayPause["default"], null), /*#__PURE__*/_react["default"].createElement(SeekBar, null), /*#__PURE__*/_react["default"].createElement("div", {
        className: "media-info"
      }, /*#__PURE__*/_react["default"].createElement(CurrentTime, null), /*#__PURE__*/_react["default"].createElement("span", null, "/"), /*#__PURE__*/_react["default"].createElement(Duration, null)))));
    }
  }]);

  return Video;
}(_react.Component);

function mapStateToProps(_ref) {
  var graph = _ref.graph,
      timesync = _ref.timesync;
  return {
    graph: graph,
    timesync: timesync
  };
}

function mapDispatchToProps(dispatch) {
  return (0, _redux.bindActionCreators)({
    registerClock: _index.registerClock,
    tickTimedResource: _index.tickTimedResource
  }, dispatch);
}

var _default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(Video);

exports["default"] = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb250YWluZXJzL3ZpZGVvLmpzIl0sIm5hbWVzIjpbImRlZmF1bHRQbGF5UGF1c2UiLCJjb250cm9scyIsIkN1cnJlbnRUaW1lIiwiUHJvZ3Jlc3MiLCJTZWVrQmFyIiwiRHVyYXRpb24iLCJNdXRlVW5tdXRlIiwiVm9sdW1lIiwiRnVsbHNjcmVlbiIsIlZpZGVvIiwicHJvcHMiLCJzdGF0ZSIsImp1bXBlZFRpbWUiLCJsYXN0TWVkaWFUaWNrIiwidGljayIsImJpbmQiLCJzZXRTdGF0ZSIsImlkIiwidCIsIk1hdGgiLCJmbG9vciIsImN1cnJlbnRUaW1lIiwidGlja1RpbWVkUmVzb3VyY2UiLCJjb25zb2xlIiwibG9nIiwidGltZXN5bmMiLCJjVCIsInVyaSIsIm1lZGlhUmVzb3VyY2VzIiwiQ29tcG9uZW50IiwibWFwU3RhdGVUb1Byb3BzIiwiZ3JhcGgiLCJtYXBEaXNwYXRjaFRvUHJvcHMiLCJkaXNwYXRjaCIsInJlZ2lzdGVyQ2xvY2siXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUVBOztBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBRUEsSUFBUUEsZ0JBQVIsR0FBdUdDLDBCQUF2RyxDQUFRRCxnQkFBUjtBQUFBLElBQTBCRSxXQUExQixHQUF1R0QsMEJBQXZHLENBQTBCQyxXQUExQjtBQUFBLElBQXVDQyxRQUF2QyxHQUF1R0YsMEJBQXZHLENBQXVDRSxRQUF2QztBQUFBLElBQWlEQyxPQUFqRCxHQUF1R0gsMEJBQXZHLENBQWlERyxPQUFqRDtBQUFBLElBQTBEQyxRQUExRCxHQUF1R0osMEJBQXZHLENBQTBESSxRQUExRDtBQUFBLElBQW9FQyxVQUFwRSxHQUF1R0wsMEJBQXZHLENBQW9FSyxVQUFwRTtBQUFBLElBQWdGQyxNQUFoRixHQUF1R04sMEJBQXZHLENBQWdGTSxNQUFoRjtBQUFBLElBQXdGQyxVQUF4RixHQUF1R1AsMEJBQXZHLENBQXdGTyxVQUF4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QW5FaUJHLGdCOztBQXFFcEIsU0FBU0MsZUFBVCxPQUE4QztBQUFBLE1BQW5CQyxLQUFtQixRQUFuQkEsS0FBbUI7QUFBQSxNQUFYTixRQUFXLFFBQVhBLFFBQVc7QUFDNUMsU0FBTztBQUFFTSxJQUFBQSxLQUFLLEVBQUxBLEtBQUY7QUFBVU4sSUFBQUEsUUFBUSxFQUFSQTtBQUFWLEdBQVA7QUFDRDs7QUFDRCxTQUFTTyxrQkFBVCxDQUE0QkMsUUFBNUIsRUFBc0M7QUFDcEMsU0FBTywrQkFBbUI7QUFBSUMsSUFBQUEsYUFBYSxFQUFiQSxvQkFBSjtBQUFtQlosSUFBQUEsaUJBQWlCLEVBQWpCQTtBQUFuQixHQUFuQixFQUEyRFcsUUFBM0QsQ0FBUDtBQUNEOztlQUVjLHlCQUFRSCxlQUFSLEVBQXlCRSxrQkFBekIsRUFBNkN2QixLQUE3QyxDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7IENvbXBvbmVudCB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IGNvbm5lY3QgfSBmcm9tICdyZWFjdC1yZWR1eCcgO1xuaW1wb3J0IHsgYmluZEFjdGlvbkNyZWF0b3JzIH0gZnJvbSAncmVkdXgnO1xuaW1wb3J0IHsgTWVkaWEsIFBsYXllciwgY29udHJvbHMsIHV0aWxzIH0gZnJvbSAncmVhY3QtbWVkaWEtcGxheWVyJztcbmltcG9ydCBDdXN0b21QbGF5UGF1c2UgZnJvbSAnLi4vY29udGFpbmVycy9yZWFjdC1tZWRpYS1wbGF5ZXItcGxheS1wYXVzZSc7XG5cbmltcG9ydCB7IGZldGNoR3JhcGgsIHJlZ2lzdGVyQ2xvY2ssIHRpY2tUaW1lZFJlc291cmNlIH0gZnJvbSAnLi4vYWN0aW9ucy9pbmRleCc7XG5pbXBvcnQgeyBUYWIsIFRhYnMsIFRhYkxpc3QsIFRhYlBhbmVsIH0gZnJvbSAncmVhY3QtdGFicyc7XG5cbmNvbnN0IHsgZGVmYXVsdFBsYXlQYXVzZSwgQ3VycmVudFRpbWUsIFByb2dyZXNzLCBTZWVrQmFyLCBEdXJhdGlvbiwgTXV0ZVVubXV0ZSwgVm9sdW1lLCBGdWxsc2NyZWVuIH0gPSBjb250cm9scztcblxuXG5jbGFzcyBWaWRlbyBleHRlbmRzIENvbXBvbmVudCB7XG4gIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgc3VwZXIocHJvcHMpO1xuXHRcdHRoaXMuc3RhdGUgPSB7IFxuXHRcdFx0anVtcGVkVGltZTogZmFsc2UsXG5cdFx0XHRsYXN0TWVkaWFUaWNrOiAwLFxuXHRcdH1cblx0XHR0aGlzLnRpY2sgPSB0aGlzLnRpY2suYmluZCh0aGlzKTtcbi8vXHRcdHRoaXMuY2xlYXJDdXJzb3I9IHRoaXMuY2xlYXJDdXJzb3IuYmluZCh0aGlzKTtcbiAgfVxuXHRpblZpZXdSZWZzKCl7XG5cdH1cblx0Y29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcygpe1xuXHRcdGlmKHRoaXMuc3RhdGUuanVtcGVkVGltZSkgdGhpcy5zZXRTdGF0ZSh7anVtcGVkVGltZTogZmFsc2V9KTtcblx0fVxuXHRjb21wb25lbnRXaWxsTW91bnQoKXtcbi8vXHRcdGNsb2NrUHJvdmlkZXIgPSB0aGlzLnByb3BzLnVyaTtcbi8vXHRcdHRoaXMucHJvcHMucmVnaXN0ZXJDbG9jayh0aGlzLnByb3BzLnVyaSk7XG5cdH1cblx0Y29tcG9uZW50RGlkTW91bnQoKXtcblx0fVxuXHRjb21wb25lbnREaWRVcGRhdGUoKXtcblx0XHRcblx0fVxuXHR0aWNrKGlkLHQpIHtcblx0XHRpZihNYXRoLmZsb29yKHQuY3VycmVudFRpbWUpID4gdGhpcy5zdGF0ZS5sYXN0TWVkaWFUaWNrIHx8IC8vIGlmIHdlJ3ZlIHByb2dyZXNzZWQgYWNyb3NzIHRoZSBuZXh0IHNlY29uZCBib3VuZGFyeSwgXG5cdFx0XHQgdC5jdXJyZW50VGltZSA8IHRoaXMuc3RhdGUubGFzdE1lZGlhVGljaykgeyAvLyBPUiBpZiB3ZSd2ZSBnb25lIGJhY2sgaW4gdGltZSAodXNlciBkaWQgYSBzZWVrKS4uLlxuXHRcdFx0dGhpcy5zZXRTdGF0ZSh7IGxhc3RNZWRpYVRpY2s6IE1hdGguZmxvb3IodC5jdXJyZW50VGltZSkgfSk7IC8vIGtlZXAgdHJhY2sgb2YgdGhpcyB0aW1lIHRpY2spXG5cdFx0XHQvLyBkaXNwYXRjaCBhIFwiVElDS1wiIGFjdGlvbiBcblx0XHRcdC8vIGFueSB0aW1lLXNlbnNpdGl2ZSBjb21wb25lbnQgc3Vic2NyaWJlcyB0byBpdCwgXG5cdFx0XHQvLyB0cmlnZ2VyaW5nIHRpbWUtYW5jaG9yZWQgYW5ub3RhdGlvbnMgdHJpZ2dlcmVkIGFzIGFwcHJvcHJpYXRlXG5cdFx0XHR0aGlzLnByb3BzLnRpY2tUaW1lZFJlc291cmNlKGlkLCBNYXRoLmZsb29yKHQuY3VycmVudFRpbWUpKTtcblx0XHR9XG5cdH1cblx0XG4gIHJlbmRlcigpe1xuXHRcdGNvbnNvbGUubG9nKHRoaXMucHJvcHMudGltZXN5bmMpO1xuXHRcdHZhciBjVCA9IHRoaXMucHJvcHMudGltZXN5bmMgJiYgXCJtZWRpYVJlc291cmNlc1wiIGluIHRoaXMucHJvcHMudGltZXN5bmNcblx0XHRcdFx0JiYgdGhpcy5wcm9wcy51cmkgaW4gdGhpcy5wcm9wcy50aW1lc3luYy5tZWRpYVJlc291cmNlcyA/IHRoaXMucHJvcHMudGltZXN5bmMubWVkaWFSZXNvdXJjZXNbdGhpcy5wcm9wcy51cmldWydjdXJyZW50VGltZSddIDogMDtcblx0XHQvKlxuXHRcdGNvbnNvbGUubG9nKHRoaXMucHJvcHMudGltZXN5bmMpO1xuXHRcdGlmKHRoaXMucHJvcHMudGltZXN5bmMgJiYgXCJtZWRpYVJlc291cmNlc1wiIGluIHRoaXMucHJvcHMudGltZXN5bmNcblx0XHRcdCAmJiBjbG9ja1Byb3ZpZGVyIGluIHRoaXMucHJvcHMudGltZXN5bmMubWVkaWFSZXNvdXJjZXMpe1xuXHRcdFx0Y1QgPSB0aGlzLnByb3BzLnRpbWVzeW5jLm1lZGlhUmVzb3VyY2VzW2Nsb2NrUHJvdmlkZXJdWydjdXJyZW50VGltZSddO1xuXHRcdFx0dmFyIHN5bmNzID0gdGhpcy5wcm9wcy50aW1lc3luYy5tZWRpYVJlc291cmNlc1tjbG9ja1Byb3ZpZGVyXVsndGltZXMnXTtcblx0XHRcdHZhciB0aW1lcyA9IE9iamVjdC5rZXlzKHN5bmNzKS5tYXAoKHQpPT4gTnVtYmVyKHQpKTtcblx0XHRcdGNvbnNvbGUubG9nKHRpbWVzLCBzeW5jcyk7XG5cdFx0fSovXG4gICAgcmV0dXJuIChcblx0XHRcdDxNZWRpYSBrZXk9eyB0aGlzLnByb3BzLnVyaSB9IGNsYXNzTmFtZT1cInZpZGVvRXNzYXlcIj5cblx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJtZWRpYSB2aWRlb0Vzc2F5XCI+XG5cdFx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJtZWRpYS1wbGF5ZXJcIj5cblx0XHRcdFx0XHRcdDxQbGF5ZXIgd2lkdGg9XCI3MDBweFwiIHNyYz17dGhpcy5wcm9wcy51cml9IG9uVGltZVVwZGF0ZT17KHQpPT57dGhpcy50aWNrKHRoaXMucHJvcHMudXJpLCB0KX19XG5cdFx0XHRcdFx0XHRcdFx0XHRcdGRlZmF1bHRDdXJyZW50VGltZT17Y1R9Lz5cblx0XHRcdFx0XHQ8L2Rpdj5cblx0XHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cIm1lZGlhLWNvbnRyb2xzXCI+XG5cdFx0XHRcdFx0XHQ8Q3VzdG9tUGxheVBhdXNlLz5cblx0XHRcdFx0XHRcdDxTZWVrQmFyLz5cblx0XHRcdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwibWVkaWEtaW5mb1wiPlxuXHRcdFx0XHRcdFx0XHQ8Q3VycmVudFRpbWUvPlxuXHRcdFx0XHRcdFx0XHQ8c3Bhbj4vPC9zcGFuPlxuXHRcdFx0XHRcdFx0XHQ8RHVyYXRpb24vPlxuXHRcdFx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdDwvZGl2PlxuXHRcdFx0PC9NZWRpYT5cbiAgICApO1xuICB9XG59XG5mdW5jdGlvbiBtYXBTdGF0ZVRvUHJvcHMoeyBncmFwaCAsIHRpbWVzeW5jfSkge1xuICByZXR1cm4geyBncmFwaCAsIHRpbWVzeW5jIH0gO1xufVxuZnVuY3Rpb24gbWFwRGlzcGF0Y2hUb1Byb3BzKGRpc3BhdGNoKSB7IFxuICByZXR1cm4gYmluZEFjdGlvbkNyZWF0b3JzKHsgXHRcdHJlZ2lzdGVyQ2xvY2ssIHRpY2tUaW1lZFJlc291cmNlIH0sIGRpc3BhdGNoKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgY29ubmVjdChtYXBTdGF0ZVRvUHJvcHMsIG1hcERpc3BhdGNoVG9Qcm9wcykoVmlkZW8pO1xuIl19