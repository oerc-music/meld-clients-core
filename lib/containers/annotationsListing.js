"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactRedux = require("react-redux");

var _redux = require("redux");

var _index = require("../actions/index");

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

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var AnnotationsListing = /*#__PURE__*/function (_Component) {
  _inherits(AnnotationsListing, _Component);

  var _super = _createSuper(AnnotationsListing);

  function AnnotationsListing(props) {
    _classCallCheck(this, AnnotationsListing);

    return _super.call(this, props);
  }

  _createClass(AnnotationsListing, [{
    key: "render",
    value: function render() {
      var _this = this;

      console.log("annolisting props: ", this.props);

      if (Object.keys(this.props.score).length && Object.keys(this.props.score.componentTargets).length) {
        // filter out undefined annotations
        var anno = annotations.filter(function (annotation) {
          return annotation;
        }); // order by timestamp

        anno.sort(function (a, b) {
          return a["dct:created"] < b["dct:created"] ? -1 : 1;
        });
        console.log("--Annotations: ", anno);
        console.log("--Props: ", this.props);
        return /*#__PURE__*/_react["default"].createElement("div", {
          className: "annotationsWrapper"
        }, /*#__PURE__*/_react["default"].createElement("div", null, "Events:"), anno.map(function (annotation) {
          return /*#__PURE__*/_react["default"].createElement("div", {
            className: "annotationListing",
            key: annotation["@id"]
          }, /*#__PURE__*/_react["default"].createElement("div", {
            className: "annotationTarget"
          }, annotation["oa:hasTarget"].map(function (t) {
            if (t["@id"] in _this.props.score.componentTargets) {
              return /*#__PURE__*/_react["default"].createElement("span", {
                className: annotation["oa:motivatedBy"]["@id"].replace(":", "_"),
                title: t["@id"],
                key: t["@id"],
                onClick: function onClick() {
                  _this.props.scorePageToComponentTarget( // TODO: Implement "startsWith" to pick correct
                  // first MEI target in future
                  _this.props.score.componentTargets[t["@id"]]["MEI"][0], _this.props.scoreUri, _this.props.score.MEI[_this.props.scoreUri]);
                }
              }, _this.props.score.componentTargets[t["@id"]]["description"]);
            } else {
              return /*#__PURE__*/_react["default"].createElement("span", null, "Loading component target: ", t["@id"]);
            }
          }), /*#__PURE__*/_react["default"].createElement("span", {
            className: "timestamp",
            key: annotation["@id"] + "_time"
          }, "(at ", annotation["dct:created"], ")")));
        }));
      }

      return /*#__PURE__*/_react["default"].createElement("div", null, "Loading...");
    }
  }]);

  return AnnotationsListing;
}(_react.Component);

function mapStateToProps(_ref) {
  var score = _ref.score;
  return {
    score: score
  };
}

function mapDispatchToProps(dispatch) {
  return (0, _redux.bindActionCreators)({
    scorePageToComponentTarget: _index.scorePageToComponentTarget
  }, dispatch);
}

var _default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(AnnotationsListing);

exports["default"] = _default;