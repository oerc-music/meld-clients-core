"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactRedux = require("react-redux");

var _redux = require("redux");

var _image = _interopRequireDefault(require("meld-clients-core/lib/containers/image.js"));

var _index = require("../actions/index");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

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

var TimeSensitiveImage = /*#__PURE__*/function (_Component) {
  _inherits(TimeSensitiveImage, _Component);

  var _super = _createSuper(TimeSensitiveImage);

  function TimeSensitiveImage(props) {
    var _this;

    _classCallCheck(this, TimeSensitiveImage);

    _this = _super.call(this, props);
    _this.state = {
      activeUri: "",
      lastMediaTick: 0
    };
    _this.tick = _this.tick.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(TimeSensitiveImage, [{
    key: "tick",
    value: function tick(id, t) {
      // Update timing information so that it's visible to all
      // components that subscribe to this clock source.
      //
      // Only do it if we've crossed a boundary:
      // if we've progressed across the next second boundary, 
      if (Math.floor(t.currentTime) > this.state.lastMediaTick || // OR if we've gone back in time (user did a seek)...
      t.currentTime < this.state.lastMediaTick) {
        // store the time... (FIXME: note rounding)
        this.setState({
          lastMediaTick: Math.floor(t.currentTime)
        }); // ... and dispatch a "TICK" action 
        // any time-sensitive component subscribes to it, 
        // triggering time-anchored annotations triggered as appropriate

        this.props.tickTimedResource(id, Math.floor(t.currentTime));
      }
    }
  }, {
    key: "render",
    value: function render() {
      // objective: set our active URI according to the clock
      // 1. check the time according to our clock provider
      if ("mediaResources" in this.props.timesync && this.props.clockProvider in this.props.timesync.mediaResources) {
        var t = this.props.timesync.mediaResources[this.props.clockProvider]["currentTime"];
        var offset = this.props.offset ? this.props.offset : 3; // Often a transition should happen at a little earlier
        // than the semantic match (i.e. turning pages exactly at
        // the point of the page turn is bad). The offset is a
        // not very satisfactory workaround.

        t = t + offset;
        var syncs = this.props.timesync.mediaResources[this.props.clockProvider]["times"];
        var times = Object.keys(syncs).map(function (t) {
          return Number(t);
        }); // ensure number, not string

        if (times.length) {
          // 2. find the closest corresponding synchronisation point before t
          var closest = times.reduce(function (closestSoFar, curr) {
            // ensure we have numbers, not strings
            return curr > closestSoFar && curr <= t ? curr : closestSoFar;
          }); // 3. this becomes our active URI pointing to the image to load

          return /*#__PURE__*/_react["default"].createElement(_image["default"], _extends({}, this.props, {
            uri: syncs[closest][0]["@id"]
          }));
        }
      } // Show an image even if the timings aren't working (does this make sense?)


      return /*#__PURE__*/_react["default"].createElement(_image["default"], _extends({}, this.props, {
        uri: this.props.uri
      }));
    }
  }]);

  return TimeSensitiveImage;
}(_react.Component);

function mapStateToProps(_ref) {
  var timesync = _ref.timesync;
  return {
    timesync: timesync
  };
}

var _default = (0, _reactRedux.connect)(mapStateToProps)(TimeSensitiveImage);

exports["default"] = _default;