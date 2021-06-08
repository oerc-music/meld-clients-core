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

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb250YWluZXJzL3RpbWVTZW5zaXRpdmVJbWFnZS5qcyJdLCJuYW1lcyI6WyJUaW1lU2Vuc2l0aXZlSW1hZ2UiLCJwcm9wcyIsInN0YXRlIiwiYWN0aXZlVXJpIiwibGFzdE1lZGlhVGljayIsInRpY2siLCJiaW5kIiwiaWQiLCJ0IiwiTWF0aCIsImZsb29yIiwiY3VycmVudFRpbWUiLCJzZXRTdGF0ZSIsInRpY2tUaW1lZFJlc291cmNlIiwidGltZXN5bmMiLCJjbG9ja1Byb3ZpZGVyIiwibWVkaWFSZXNvdXJjZXMiLCJvZmZzZXQiLCJzeW5jcyIsInRpbWVzIiwiT2JqZWN0Iiwia2V5cyIsIm1hcCIsIk51bWJlciIsImxlbmd0aCIsImNsb3Nlc3QiLCJyZWR1Y2UiLCJjbG9zZXN0U29GYXIiLCJjdXJyIiwidXJpIiwiQ29tcG9uZW50IiwibWFwU3RhdGVUb1Byb3BzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBRU1BLGtCOzs7OztBQUNKLDhCQUFZQyxLQUFaLEVBQW1CO0FBQUE7O0FBQUE7O0FBQ2pCLDhCQUFNQSxLQUFOO0FBQ0EsVUFBS0MsS0FBTCxHQUFhO0FBQ1hDLE1BQUFBLFNBQVMsRUFBRSxFQURBO0FBRWRDLE1BQUFBLGFBQWEsRUFBRTtBQUZELEtBQWI7QUFJRixVQUFLQyxJQUFMLEdBQVksTUFBS0EsSUFBTCxDQUFVQyxJQUFWLCtCQUFaO0FBTm1CO0FBT2xCOzs7O1dBRUYsY0FBS0MsRUFBTCxFQUFRQyxDQUFSLEVBQVc7QUFDVjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBR0MsSUFBSSxDQUFDQyxLQUFMLENBQVdGLENBQUMsQ0FBQ0csV0FBYixJQUE0QixLQUFLVCxLQUFMLENBQVdFLGFBQXZDLElBQ0Q7QUFDQUksTUFBQUEsQ0FBQyxDQUFDRyxXQUFGLEdBQWdCLEtBQUtULEtBQUwsQ0FBV0UsYUFGN0IsRUFFNEM7QUFDM0M7QUFDQSxhQUFLUSxRQUFMLENBQWM7QUFBRVIsVUFBQUEsYUFBYSxFQUFFSyxJQUFJLENBQUNDLEtBQUwsQ0FBV0YsQ0FBQyxDQUFDRyxXQUFiO0FBQWpCLFNBQWQsRUFGMkMsQ0FHM0M7QUFDQTtBQUNBOztBQUNBLGFBQUtWLEtBQUwsQ0FBV1ksaUJBQVgsQ0FBNkJOLEVBQTdCLEVBQWlDRSxJQUFJLENBQUNDLEtBQUwsQ0FBV0YsQ0FBQyxDQUFDRyxXQUFiLENBQWpDO0FBQ0E7QUFDRDs7O1dBRUEsa0JBQVM7QUFDUDtBQUNBO0FBQ0EsVUFBSSxvQkFBb0IsS0FBS1YsS0FBTCxDQUFXYSxRQUEvQixJQUNBLEtBQUtiLEtBQUwsQ0FBV2MsYUFBWCxJQUE0QixLQUFLZCxLQUFMLENBQVdhLFFBQVgsQ0FBb0JFLGNBRHBELEVBQ29FO0FBQ2xFLFlBQUlSLENBQUMsR0FBRyxLQUFLUCxLQUFMLENBQVdhLFFBQVgsQ0FBb0JFLGNBQXBCLENBQW1DLEtBQUtmLEtBQUwsQ0FBV2MsYUFBOUMsRUFBNkQsYUFBN0QsQ0FBUjtBQUNILFlBQUlFLE1BQU0sR0FBRyxLQUFLaEIsS0FBTCxDQUFXZ0IsTUFBWCxHQUFvQixLQUFLaEIsS0FBTCxDQUFXZ0IsTUFBL0IsR0FBd0MsQ0FBckQsQ0FGcUUsQ0FHckU7QUFDQTtBQUNBO0FBQ0E7O0FBQ0dULFFBQUFBLENBQUMsR0FBR0EsQ0FBQyxHQUFHUyxNQUFSO0FBQ0EsWUFBTUMsS0FBSyxHQUFHLEtBQUtqQixLQUFMLENBQVdhLFFBQVgsQ0FBb0JFLGNBQXBCLENBQW1DLEtBQUtmLEtBQUwsQ0FBV2MsYUFBOUMsRUFBNkQsT0FBN0QsQ0FBZDtBQUNBLFlBQU1JLEtBQUssR0FBR0MsTUFBTSxDQUFDQyxJQUFQLENBQVlILEtBQVosRUFBbUJJLEdBQW5CLENBQXVCLFVBQUNkLENBQUQ7QUFBQSxpQkFBT2UsTUFBTSxDQUFDZixDQUFELENBQWI7QUFBQSxTQUF2QixDQUFkLENBVGtFLENBU1Y7O0FBQ3hELFlBQUlXLEtBQUssQ0FBQ0ssTUFBVixFQUFrQjtBQUNoQjtBQUNBLGNBQU1DLE9BQU8sR0FBR04sS0FBSyxDQUFDTyxNQUFOLENBQWEsVUFBQ0MsWUFBRCxFQUFlQyxJQUFmLEVBQXdCO0FBQ25EO0FBQ0EsbUJBQU9BLElBQUksR0FBR0QsWUFBUCxJQUF1QkMsSUFBSSxJQUFJcEIsQ0FBL0IsR0FBbUNvQixJQUFuQyxHQUEwQ0QsWUFBakQ7QUFDRCxXQUhlLENBQWhCLENBRmdCLENBTWhCOztBQUNBLDhCQUFPLGdDQUFDLGlCQUFELGVBQWEsS0FBSzFCLEtBQWxCO0FBQXlCLFlBQUEsR0FBRyxFQUFFaUIsS0FBSyxDQUFDTyxPQUFELENBQUwsQ0FBZSxDQUFmLEVBQWtCLEtBQWxCO0FBQTlCLGFBQVA7QUFDRDtBQUNGLE9BdkJNLENBd0JUOzs7QUFDQSwwQkFBTyxnQ0FBQyxpQkFBRCxlQUFhLEtBQUt4QixLQUFsQjtBQUF5QixRQUFBLEdBQUcsRUFBRyxLQUFLQSxLQUFMLENBQVc0QjtBQUExQyxTQUFQO0FBQ0M7Ozs7RUF0RDhCQyxnQjs7QUEwRGpDLFNBQVNDLGVBQVQsT0FBcUM7QUFBQSxNQUFYakIsUUFBVyxRQUFYQSxRQUFXO0FBQ25DLFNBQU87QUFBQ0EsSUFBQUEsUUFBUSxFQUFSQTtBQUFELEdBQVA7QUFDRDs7ZUFFYyx5QkFBUWlCLGVBQVIsRUFBMEIvQixrQkFBMUIsQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwge0NvbXBvbmVudH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IHtjb25uZWN0fSBmcm9tICdyZWFjdC1yZWR1eCc7XG5pbXBvcnQgeyBiaW5kQWN0aW9uQ3JlYXRvcnMgfSBmcm9tICdyZWR1eCc7XG5pbXBvcnQgTXlJbWFnZSBmcm9tICdtZWxkLWNsaWVudHMtY29yZS9saWIvY29udGFpbmVycy9pbWFnZS5qcydcbmltcG9ydCB7IGZldGNoR3JhcGgsIHJlZ2lzdGVyQ2xvY2ssIHRpY2tUaW1lZFJlc291cmNlIH0gZnJvbSAnLi4vYWN0aW9ucy9pbmRleCc7XG5cbmNsYXNzIFRpbWVTZW5zaXRpdmVJbWFnZSBleHRlbmRzIENvbXBvbmVudCB7XG4gIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgc3VwZXIocHJvcHMpO1xuICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICBhY3RpdmVVcmk6IFwiXCIsXG5cdFx0XHRsYXN0TWVkaWFUaWNrOiAwXG4gICAgfVxuXHRcdHRoaXMudGljayA9IHRoaXMudGljay5iaW5kKHRoaXMpO1xuICB9XG5cblx0dGljayhpZCx0KSB7XG5cdFx0Ly8gVXBkYXRlIHRpbWluZyBpbmZvcm1hdGlvbiBzbyB0aGF0IGl0J3MgdmlzaWJsZSB0byBhbGxcblx0XHQvLyBjb21wb25lbnRzIHRoYXQgc3Vic2NyaWJlIHRvIHRoaXMgY2xvY2sgc291cmNlLlxuXHRcdC8vXG5cdFx0Ly8gT25seSBkbyBpdCBpZiB3ZSd2ZSBjcm9zc2VkIGEgYm91bmRhcnk6XG5cdFx0Ly8gaWYgd2UndmUgcHJvZ3Jlc3NlZCBhY3Jvc3MgdGhlIG5leHQgc2Vjb25kIGJvdW5kYXJ5LCBcblx0XHRpZihNYXRoLmZsb29yKHQuY3VycmVudFRpbWUpID4gdGhpcy5zdGF0ZS5sYXN0TWVkaWFUaWNrIHx8XG5cdFx0XHQgLy8gT1IgaWYgd2UndmUgZ29uZSBiYWNrIGluIHRpbWUgKHVzZXIgZGlkIGEgc2VlaykuLi5cblx0XHRcdCB0LmN1cnJlbnRUaW1lIDwgdGhpcy5zdGF0ZS5sYXN0TWVkaWFUaWNrKSB7XG5cdFx0XHQvLyBzdG9yZSB0aGUgdGltZS4uLiAoRklYTUU6IG5vdGUgcm91bmRpbmcpXG5cdFx0XHR0aGlzLnNldFN0YXRlKHsgbGFzdE1lZGlhVGljazogTWF0aC5mbG9vcih0LmN1cnJlbnRUaW1lKSB9KTsgXG5cdFx0XHQvLyAuLi4gYW5kIGRpc3BhdGNoIGEgXCJUSUNLXCIgYWN0aW9uIFxuXHRcdFx0Ly8gYW55IHRpbWUtc2Vuc2l0aXZlIGNvbXBvbmVudCBzdWJzY3JpYmVzIHRvIGl0LCBcblx0XHRcdC8vIHRyaWdnZXJpbmcgdGltZS1hbmNob3JlZCBhbm5vdGF0aW9ucyB0cmlnZ2VyZWQgYXMgYXBwcm9wcmlhdGVcblx0XHRcdHRoaXMucHJvcHMudGlja1RpbWVkUmVzb3VyY2UoaWQsIE1hdGguZmxvb3IodC5jdXJyZW50VGltZSkpO1xuXHRcdH1cblx0fVxuXG4gIHJlbmRlcigpIHtcbiAgICAvLyBvYmplY3RpdmU6IHNldCBvdXIgYWN0aXZlIFVSSSBhY2NvcmRpbmcgdG8gdGhlIGNsb2NrXG4gICAgLy8gMS4gY2hlY2sgdGhlIHRpbWUgYWNjb3JkaW5nIHRvIG91ciBjbG9jayBwcm92aWRlclxuICAgIGlmIChcIm1lZGlhUmVzb3VyY2VzXCIgaW4gdGhpcy5wcm9wcy50aW1lc3luYyAmJlxuICAgICAgICB0aGlzLnByb3BzLmNsb2NrUHJvdmlkZXIgaW4gdGhpcy5wcm9wcy50aW1lc3luYy5tZWRpYVJlc291cmNlcykge1xuICAgICAgbGV0IHQgPSB0aGlzLnByb3BzLnRpbWVzeW5jLm1lZGlhUmVzb3VyY2VzW3RoaXMucHJvcHMuY2xvY2tQcm92aWRlcl1bXCJjdXJyZW50VGltZVwiXTtcblx0XHRcdGxldCBvZmZzZXQgPSB0aGlzLnByb3BzLm9mZnNldCA/IHRoaXMucHJvcHMub2Zmc2V0IDogMztcblx0XHRcdC8vIE9mdGVuIGEgdHJhbnNpdGlvbiBzaG91bGQgaGFwcGVuIGF0IGEgbGl0dGxlIGVhcmxpZXJcblx0XHRcdC8vIHRoYW4gdGhlIHNlbWFudGljIG1hdGNoIChpLmUuIHR1cm5pbmcgcGFnZXMgZXhhY3RseSBhdFxuXHRcdFx0Ly8gdGhlIHBvaW50IG9mIHRoZSBwYWdlIHR1cm4gaXMgYmFkKS4gVGhlIG9mZnNldCBpcyBhXG5cdFx0XHQvLyBub3QgdmVyeSBzYXRpc2ZhY3Rvcnkgd29ya2Fyb3VuZC5cbiAgICAgIHQgPSB0ICsgb2Zmc2V0O1xuICAgICAgY29uc3Qgc3luY3MgPSB0aGlzLnByb3BzLnRpbWVzeW5jLm1lZGlhUmVzb3VyY2VzW3RoaXMucHJvcHMuY2xvY2tQcm92aWRlcl1bXCJ0aW1lc1wiXTtcbiAgICAgIGNvbnN0IHRpbWVzID0gT2JqZWN0LmtleXMoc3luY3MpLm1hcCgodCkgPT4gTnVtYmVyKHQpKTsgLy8gZW5zdXJlIG51bWJlciwgbm90IHN0cmluZ1xuICAgICAgaWYgKHRpbWVzLmxlbmd0aCkge1xuICAgICAgICAvLyAyLiBmaW5kIHRoZSBjbG9zZXN0IGNvcnJlc3BvbmRpbmcgc3luY2hyb25pc2F0aW9uIHBvaW50IGJlZm9yZSB0XG4gICAgICAgIGNvbnN0IGNsb3Nlc3QgPSB0aW1lcy5yZWR1Y2UoKGNsb3Nlc3RTb0ZhciwgY3VycikgPT4ge1xuICAgICAgICAgIC8vIGVuc3VyZSB3ZSBoYXZlIG51bWJlcnMsIG5vdCBzdHJpbmdzXG4gICAgICAgICAgcmV0dXJuIGN1cnIgPiBjbG9zZXN0U29GYXIgJiYgY3VyciA8PSB0ID8gY3VyciA6IGNsb3Nlc3RTb0ZhclxuICAgICAgICB9KTtcbiAgICAgICAgLy8gMy4gdGhpcyBiZWNvbWVzIG91ciBhY3RpdmUgVVJJIHBvaW50aW5nIHRvIHRoZSBpbWFnZSB0byBsb2FkXG4gICAgICAgIHJldHVybiA8TXlJbWFnZSB7Li4udGhpcy5wcm9wc30gdXJpPXtzeW5jc1tjbG9zZXN0XVswXVtcIkBpZFwiXX0vPlxuICAgICAgfVxuICAgIH1cblx0XHQvLyBTaG93IGFuIGltYWdlIGV2ZW4gaWYgdGhlIHRpbWluZ3MgYXJlbid0IHdvcmtpbmcgKGRvZXMgdGhpcyBtYWtlIHNlbnNlPylcblx0XHRyZXR1cm4gPE15SW1hZ2Ugey4uLnRoaXMucHJvcHN9IHVyaT17IHRoaXMucHJvcHMudXJpICB9IC8+XG4gIH1cbn1cblxuXG5mdW5jdGlvbiBtYXBTdGF0ZVRvUHJvcHMoe3RpbWVzeW5jfSkge1xuICByZXR1cm4ge3RpbWVzeW5jfTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgY29ubmVjdChtYXBTdGF0ZVRvUHJvcHMsKShUaW1lU2Vuc2l0aXZlSW1hZ2UpO1xuIl19