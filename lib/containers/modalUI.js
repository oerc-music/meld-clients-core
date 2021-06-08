"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactRedux = require("react-redux");

var _redux = require("redux");

var _modalUI = require("../actions/modalUI");

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

var ModalUI = /*#__PURE__*/function (_Component) {
  _inherits(ModalUI, _Component);

  var _super = _createSuper(ModalUI);

  function ModalUI(props) {
    var _this;

    _classCallCheck(this, ModalUI);

    _this = _super.call(this, props);
    _this.state = {
      orientation: _this.props.orientation ? _this.props.orientation : "wide"
    };
    return _this;
  }

  _createClass(ModalUI, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      // set the mode
      var mode; // if our configuration has specified a default, use that

      if (this.props.modes.hasOwnProperty("_default")) {
        mode = this.props.modes["_default"];
      } else {
        // otherwise use the first non-default
        mode = Object.keys(this.props.modes).filter(function (m) {
          return m !== "_default";
        })[0];
      }

      mode = mode ? mode : "_NO_MODE_DEFINED";
      this.props.setMode(mode);
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      if (this.props.modalUI.mode) {
        var mode = this.props.modalUI["mode"];
        console.log("Looking up ", mode, " in ", this.props.modes);
        console.log(this.props.modes[mode]);
        var constituents = this.props.modes[mode].map(function (c) {
          var classNameString = _this2.props.modalUI.constituents.has(c["id"]) ? "constituent active" : "constituent";
          return /*#__PURE__*/_react["default"].createElement("div", {
            className: classNameString,
            key: c["id"],
            id: c["id"],
            onClick: function onClick(e) {
              return _this2.props.constituentClicked(e);
            }
          }, c.hasOwnProperty("image") && /*#__PURE__*/_react["default"].createElement("img", {
            src: c["image"],
            alt: c["label"],
            title: c["label"]
          }), !c.hasOwnProperty("image") && /*#__PURE__*/_react["default"].createElement("div", {
            className: "label"
          }, c["label"]));
        });
        return /*#__PURE__*/_react["default"].createElement("div", {
          id: "modalPane",
          className: this.state.orientation
        }, constituents);
      } else {
        return /*#__PURE__*/_react["default"].createElement("div", null, "Loading...");
      }
    }
  }]);

  return ModalUI;
}(_react.Component);

function mapStateToProps(_ref) {
  var modalUI = _ref.modalUI;
  return {
    modalUI: modalUI
  };
}

function mapDispatchToProps(dispatch) {
  return (0, _redux.bindActionCreators)({
    constituentClicked: _modalUI.constituentClicked,
    setMode: _modalUI.setMode
  }, dispatch);
}

var _default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(ModalUI);

exports["default"] = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb250YWluZXJzL21vZGFsVUkuanMiXSwibmFtZXMiOlsiTW9kYWxVSSIsInByb3BzIiwic3RhdGUiLCJvcmllbnRhdGlvbiIsIm1vZGUiLCJtb2RlcyIsImhhc093blByb3BlcnR5IiwiT2JqZWN0Iiwia2V5cyIsImZpbHRlciIsIm0iLCJzZXRNb2RlIiwibW9kYWxVSSIsImNvbnNvbGUiLCJsb2ciLCJjb25zdGl0dWVudHMiLCJtYXAiLCJjIiwiY2xhc3NOYW1lU3RyaW5nIiwiaGFzIiwiZSIsImNvbnN0aXR1ZW50Q2xpY2tlZCIsIkNvbXBvbmVudCIsIm1hcFN0YXRlVG9Qcm9wcyIsIm1hcERpc3BhdGNoVG9Qcm9wcyIsImRpc3BhdGNoIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQTs7QUFDQTs7QUFDQTs7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUFFTUEsTzs7Ozs7QUFDSixtQkFBWUMsS0FBWixFQUFtQjtBQUFBOztBQUFBOztBQUNqQiw4QkFBTUEsS0FBTjtBQUNBLFVBQUtDLEtBQUwsR0FBYTtBQUNYQyxNQUFBQSxXQUFXLEVBQUUsTUFBS0YsS0FBTCxDQUFXRSxXQUFYLEdBQXlCLE1BQUtGLEtBQUwsQ0FBV0UsV0FBcEMsR0FBa0Q7QUFEcEQsS0FBYjtBQUZpQjtBQUtsQjs7OztXQUVELDZCQUFvQjtBQUNsQjtBQUNBLFVBQUlDLElBQUosQ0FGa0IsQ0FHbEI7O0FBQ0EsVUFBSSxLQUFLSCxLQUFMLENBQVdJLEtBQVgsQ0FBaUJDLGNBQWpCLENBQWdDLFVBQWhDLENBQUosRUFBaUQ7QUFDL0NGLFFBQUFBLElBQUksR0FBRyxLQUFLSCxLQUFMLENBQVdJLEtBQVgsQ0FBaUIsVUFBakIsQ0FBUDtBQUNELE9BRkQsTUFFTztBQUNMO0FBQ0FELFFBQUFBLElBQUksR0FBR0csTUFBTSxDQUFDQyxJQUFQLENBQVksS0FBS1AsS0FBTCxDQUFXSSxLQUF2QixFQUE4QkksTUFBOUIsQ0FBcUMsVUFBQUMsQ0FBQztBQUFBLGlCQUFJQSxDQUFDLEtBQUssVUFBVjtBQUFBLFNBQXRDLEVBQTRELENBQTVELENBQVA7QUFDRDs7QUFDRE4sTUFBQUEsSUFBSSxHQUFHQSxJQUFJLEdBQUdBLElBQUgsR0FBVSxrQkFBckI7QUFDQSxXQUFLSCxLQUFMLENBQVdVLE9BQVgsQ0FBbUJQLElBQW5CO0FBQ0Q7OztXQUdELGtCQUFTO0FBQUE7O0FBQ1AsVUFBSSxLQUFLSCxLQUFMLENBQVdXLE9BQVgsQ0FBbUJSLElBQXZCLEVBQTZCO0FBQzNCLFlBQU1BLElBQUksR0FBRyxLQUFLSCxLQUFMLENBQVdXLE9BQVgsQ0FBbUIsTUFBbkIsQ0FBYjtBQUNBQyxRQUFBQSxPQUFPLENBQUNDLEdBQVIsQ0FBWSxhQUFaLEVBQTJCVixJQUEzQixFQUFpQyxNQUFqQyxFQUF5QyxLQUFLSCxLQUFMLENBQVdJLEtBQXBEO0FBQ0FRLFFBQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUFZLEtBQUtiLEtBQUwsQ0FBV0ksS0FBWCxDQUFpQkQsSUFBakIsQ0FBWjtBQUNBLFlBQU1XLFlBQVksR0FBRyxLQUFLZCxLQUFMLENBQVdJLEtBQVgsQ0FBaUJELElBQWpCLEVBQXVCWSxHQUF2QixDQUEyQixVQUFDQyxDQUFELEVBQU87QUFDckQsY0FBTUMsZUFBZSxHQUFHLE1BQUksQ0FBQ2pCLEtBQUwsQ0FBV1csT0FBWCxDQUFtQkcsWUFBbkIsQ0FBZ0NJLEdBQWhDLENBQW9DRixDQUFDLENBQUMsSUFBRCxDQUFyQyxJQUNwQixvQkFEb0IsR0FDRyxhQUQzQjtBQUVBLDhCQUNJO0FBQUssWUFBQSxTQUFTLEVBQUVDLGVBQWhCO0FBQWlDLFlBQUEsR0FBRyxFQUFFRCxDQUFDLENBQUMsSUFBRCxDQUF2QztBQUErQyxZQUFBLEVBQUUsRUFBRUEsQ0FBQyxDQUFDLElBQUQsQ0FBcEQ7QUFDSyxZQUFBLE9BQU8sRUFBRSxpQkFBQ0csQ0FBRDtBQUFBLHFCQUFPLE1BQUksQ0FBQ25CLEtBQUwsQ0FBV29CLGtCQUFYLENBQThCRCxDQUE5QixDQUFQO0FBQUE7QUFEZCxhQUdHSCxDQUFDLENBQUNYLGNBQUYsQ0FBaUIsT0FBakIsa0JBQ0Q7QUFBSyxZQUFBLEdBQUcsRUFBRVcsQ0FBQyxDQUFDLE9BQUQsQ0FBWDtBQUFzQixZQUFBLEdBQUcsRUFBRUEsQ0FBQyxDQUFDLE9BQUQsQ0FBNUI7QUFBdUMsWUFBQSxLQUFLLEVBQUVBLENBQUMsQ0FBQyxPQUFEO0FBQS9DLFlBSkYsRUFPRyxDQUFFQSxDQUFDLENBQUNYLGNBQUYsQ0FBaUIsT0FBakIsQ0FBRixpQkFDRDtBQUFLLFlBQUEsU0FBUyxFQUFDO0FBQWYsYUFDR1csQ0FBQyxDQUFDLE9BQUQsQ0FESixDQVJGLENBREo7QUFlRCxTQWxCb0IsQ0FBckI7QUFtQkEsNEJBQ0k7QUFBSyxVQUFBLEVBQUUsRUFBQyxXQUFSO0FBQW9CLFVBQUEsU0FBUyxFQUFFLEtBQUtmLEtBQUwsQ0FBV0M7QUFBMUMsV0FDR1ksWUFESCxDQURKO0FBS0QsT0E1QkQsTUE0Qk87QUFDTCw0QkFBTywwREFBUDtBQUNEO0FBQ0Y7Ozs7RUF2RG1CTyxnQjs7QUEyRHRCLFNBQVNDLGVBQVQsT0FBb0M7QUFBQSxNQUFWWCxPQUFVLFFBQVZBLE9BQVU7QUFDbEMsU0FBTztBQUFDQSxJQUFBQSxPQUFPLEVBQVBBO0FBQUQsR0FBUDtBQUNEOztBQUVELFNBQVNZLGtCQUFULENBQTRCQyxRQUE1QixFQUFzQztBQUNwQyxTQUFPLCtCQUFtQjtBQUFDSixJQUFBQSxrQkFBa0IsRUFBbEJBLDJCQUFEO0FBQXFCVixJQUFBQSxPQUFPLEVBQVBBO0FBQXJCLEdBQW5CLEVBQWtEYyxRQUFsRCxDQUFQO0FBQ0Q7O2VBRWMseUJBQVFGLGVBQVIsRUFBeUJDLGtCQUF6QixFQUE2Q3hCLE9BQTdDLEMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHtDb21wb25lbnR9IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7Y29ubmVjdH0gZnJvbSAncmVhY3QtcmVkdXgnO1xuaW1wb3J0IHtiaW5kQWN0aW9uQ3JlYXRvcnN9IGZyb20gJ3JlZHV4JztcbmltcG9ydCB7Y29uc3RpdHVlbnRDbGlja2VkLCBzZXRNb2RlfSBmcm9tICcuLi9hY3Rpb25zL21vZGFsVUknO1xuXG5jbGFzcyBNb2RhbFVJIGV4dGVuZHMgQ29tcG9uZW50IHtcbiAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICBzdXBlcihwcm9wcyk7XG4gICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgIG9yaWVudGF0aW9uOiB0aGlzLnByb3BzLm9yaWVudGF0aW9uID8gdGhpcy5wcm9wcy5vcmllbnRhdGlvbiA6IFwid2lkZVwiXG4gICAgfVxuICB9XG5cbiAgY29tcG9uZW50RGlkTW91bnQoKSB7XG4gICAgLy8gc2V0IHRoZSBtb2RlXG4gICAgbGV0IG1vZGU7XG4gICAgLy8gaWYgb3VyIGNvbmZpZ3VyYXRpb24gaGFzIHNwZWNpZmllZCBhIGRlZmF1bHQsIHVzZSB0aGF0XG4gICAgaWYgKHRoaXMucHJvcHMubW9kZXMuaGFzT3duUHJvcGVydHkoXCJfZGVmYXVsdFwiKSkge1xuICAgICAgbW9kZSA9IHRoaXMucHJvcHMubW9kZXNbXCJfZGVmYXVsdFwiXVxuICAgIH0gZWxzZSB7XG4gICAgICAvLyBvdGhlcndpc2UgdXNlIHRoZSBmaXJzdCBub24tZGVmYXVsdFxuICAgICAgbW9kZSA9IE9iamVjdC5rZXlzKHRoaXMucHJvcHMubW9kZXMpLmZpbHRlcihtID0+IG0gIT09IFwiX2RlZmF1bHRcIilbMF07XG4gICAgfVxuICAgIG1vZGUgPSBtb2RlID8gbW9kZSA6IFwiX05PX01PREVfREVGSU5FRFwiO1xuICAgIHRoaXMucHJvcHMuc2V0TW9kZShtb2RlKTtcbiAgfVxuXG5cbiAgcmVuZGVyKCkge1xuICAgIGlmICh0aGlzLnByb3BzLm1vZGFsVUkubW9kZSkge1xuICAgICAgY29uc3QgbW9kZSA9IHRoaXMucHJvcHMubW9kYWxVSVtcIm1vZGVcIl07XG4gICAgICBjb25zb2xlLmxvZyhcIkxvb2tpbmcgdXAgXCIsIG1vZGUsIFwiIGluIFwiLCB0aGlzLnByb3BzLm1vZGVzKTtcbiAgICAgIGNvbnNvbGUubG9nKHRoaXMucHJvcHMubW9kZXNbbW9kZV0pO1xuICAgICAgY29uc3QgY29uc3RpdHVlbnRzID0gdGhpcy5wcm9wcy5tb2Rlc1ttb2RlXS5tYXAoKGMpID0+IHtcbiAgICAgICAgY29uc3QgY2xhc3NOYW1lU3RyaW5nID0gdGhpcy5wcm9wcy5tb2RhbFVJLmNvbnN0aXR1ZW50cy5oYXMoY1tcImlkXCJdKSA/XG4gICAgICAgICAgICBcImNvbnN0aXR1ZW50IGFjdGl2ZVwiIDogXCJjb25zdGl0dWVudFwiO1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9e2NsYXNzTmFtZVN0cmluZ30ga2V5PXtjW1wiaWRcIl19IGlkPXtjW1wiaWRcIl19XG4gICAgICAgICAgICAgICAgIG9uQ2xpY2s9eyhlKSA9PiB0aGlzLnByb3BzLmNvbnN0aXR1ZW50Q2xpY2tlZChlKX0+XG4gICAgICAgICAgICAgIHsvKiBkaXNwbGF5IGltYWdlIGlmIGF2YWlsYWJsZSAqL31cbiAgICAgICAgICAgICAge2MuaGFzT3duUHJvcGVydHkoXCJpbWFnZVwiKSAmJlxuICAgICAgICAgICAgICA8aW1nIHNyYz17Y1tcImltYWdlXCJdfSBhbHQ9e2NbXCJsYWJlbFwiXX0gdGl0bGU9e2NbXCJsYWJlbFwiXX0vPlxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIHsvKiBJZiBubyBpbWFnZSwgZGlzcGxheSBsYWJlbCAqL31cbiAgICAgICAgICAgICAgeyEoYy5oYXNPd25Qcm9wZXJ0eShcImltYWdlXCIpKSAmJlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImxhYmVsXCI+XG4gICAgICAgICAgICAgICAge2NbXCJsYWJlbFwiXX1cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgICAgfSk7XG4gICAgICByZXR1cm4gKFxuICAgICAgICAgIDxkaXYgaWQ9XCJtb2RhbFBhbmVcIiBjbGFzc05hbWU9e3RoaXMuc3RhdGUub3JpZW50YXRpb259PlxuICAgICAgICAgICAge2NvbnN0aXR1ZW50c31cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgIClcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIDxkaXY+TG9hZGluZy4uLjwvZGl2PlxuICAgIH1cbiAgfVxuXG59XG5cbmZ1bmN0aW9uIG1hcFN0YXRlVG9Qcm9wcyh7bW9kYWxVSX0pIHtcbiAgcmV0dXJuIHttb2RhbFVJfVxufVxuXG5mdW5jdGlvbiBtYXBEaXNwYXRjaFRvUHJvcHMoZGlzcGF0Y2gpIHtcbiAgcmV0dXJuIGJpbmRBY3Rpb25DcmVhdG9ycyh7Y29uc3RpdHVlbnRDbGlja2VkLCBzZXRNb2RlfSwgZGlzcGF0Y2gpO1xufVxuXG5leHBvcnQgZGVmYXVsdCBjb25uZWN0KG1hcFN0YXRlVG9Qcm9wcywgbWFwRGlzcGF0Y2hUb1Byb3BzKShNb2RhbFVJKTtcbiJdfQ==