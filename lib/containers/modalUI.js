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