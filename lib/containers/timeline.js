"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactRedux = require("react-redux");

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

var MEITimeline = /*#__PURE__*/function (_Component) {
  _inherits(MEITimeline, _Component);

  var _super = _createSuper(MEITimeline);

  function MEITimeline(props) {
    var _this;

    _classCallCheck(this, MEITimeline);

    _this = _super.call(this, props);
    _this.state = {
      structures: [['overture', 'Vorspiel', 75, false], ['act', 'I', [['scene', 1, 262], ['scene', 2, 397], ['scene', 3, 587]], [['F1', 777], ['F2', 789]]], ['act', 'II', [['scene', 1, 423], ['scene', 2, 443], ['scene', 3, 479], ['scene', 4, 283], ['scene', 5, 478]], [['F3', 18], ['F4', 31], ['F5', 288], ['F6', 767], ['F7', 1875], ['F8', 1949], ['F9', 2098]]], ['act', 'II', [['scene', 1, 174], ['scene', 2, 553], ['scene', 3, 845]], [['F10', 494], ['F11', 621], ['F12', 737], ['F13', 824], ['F14', 832], ['F15', 836], ['F16', 1062]]]]
    };
    return _this;
  }

  _createClass(MEITimeline, [{
    key: "sumBars",
    value: function sumBars(structures) {
      var sum = 0;

      for (var i = 0; i < structures.length; i++) {
        if (Array.isArray(structures[i][2])) {
          sum += this.sumBars(structures[i][2]);
        } else {
          if (Number.isInteger(structures[i][2])) {
            sum += structures[i][2];
          } else {
            console.log("mangled dramatic structure: ", structures[i], Array.isArray(structures[i][2]));
          }
        }
      }

      return sum;
    }
  }, {
    key: "motifChangeClickHandler",
    value: function motifChangeClickHandler(event) {
      var el = event.target;
      var motif = el.getAttributeNS(null, 'class').match(/F[0-9]+/);
      this.props.onMotifChange(motif);
    }
  }, {
    key: "render",
    value: function render() {
      if (this.state.structures) {
        var structures = this.state.structures;
        var boxTop = this.props.boxTop || 20;
        var boxHeight = this.props.boxHeight || 20;
        var boxBottom = boxTop + boxHeight;
        var width = this.props.width || 1200;
        var height = this.props.height || 80;
        var sceneY = boxBottom + (height - boxBottom) / 3;
        var barCount = this.sumBars(this.state.structures);
        var scale = width / barCount;
        var curx = 0;
        var motifLines = [];
        var divLines = [];

        for (var i = 0; i < structures.length; i++) {
          var act = structures[i];
          var actString = act[0] + "-" + act[1]; // Draw lines for acts

          divLines.push( /*#__PURE__*/_react["default"].createElement("line", {
            className: "act division",
            id: "tl-" + actString,
            x1: curx,
            x2: curx,
            y1: i ? boxTop : boxTop + 6,
            y2: height - 2
          }));
          divLines.push( /*#__PURE__*/_react["default"].createElement("text", {
            className: "actname",
            x: curx + 2,
            y: height
          }, (act[1] + "").substring(0, 3))); // draw lines for motifs (first because bar numbers are index by act, not scene)

          if (act[3] && act[3].length) {
            for (var m = 0; m < act[3].length; m++) {
              var motif = act[3][m];
              var current = this.props.motif && this.props.motif == motif[0];
              var currentClass = current ? " active" : "";
              var fun = this.motifChangeClickHandler.bind(this);
              motifLines.push( /*#__PURE__*/_react["default"].createElement("line", {
                className: "annotation annotation__AskingForbidden_" + motif[0] + "_1" + currentClass,
                onClick: fun,
                x1: curx + motif[1] * scale,
                x2: curx + motif[1] * scale,
                y1: current ? 0 : 5,
                y2: boxBottom
              }));
            }
          }

          if (Array.isArray(act[2])) {
            for (var s = 0; s < act[2].length; s++) {
              var scene = act[2][s];
              divLines.push( /*#__PURE__*/_react["default"].createElement("line", {
                className: "scene division",
                id: "tl-" + scene[0] + "-" + scene[1] + "-" + actString,
                x1: curx,
                x2: curx,
                y1: boxTop,
                y2: sceneY
              }));
              divLines.push( /*#__PURE__*/_react["default"].createElement("text", {
                className: "scenename",
                x: curx + 2,
                y: sceneY + 2
              }, (scene[1] + "").substring(0, 3)));
              curx += scale * scene[2];
            }
          } else {
            curx += scale * act[2];
          }
        }

        return /*#__PURE__*/_react["default"].createElement("svg", {
          width: width,
          height: height,
          className: "timeline-overview"
        }, /*#__PURE__*/_react["default"].createElement("rect", {
          className: "timeline",
          y: boxTop,
          x: "0",
          rx: "6px",
          ry: "6px",
          width: width,
          height: boxHeight
        }), divLines, motifLines);
      }

      return /*#__PURE__*/_react["default"].createElement("div", null, "Loading...");
    }
  }]);

  return MEITimeline;
}(_react.Component);

function mapStateToProps(_ref) {
  var score = _ref.score;
  return {
    score: score
  };
}

function mapDispatchToProps(dispatch) {
  return {};
}

var _default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(MEITimeline);

exports["default"] = _default;