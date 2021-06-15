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