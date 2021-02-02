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

var _MEIRibbonUtils = require("../library/MEIRibbonUtils");

var _svgInlineReact = _interopRequireDefault(require("svg-inline-react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

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

var OrchestralRibbon = /*#__PURE__*/function (_Component) {
  _inherits(OrchestralRibbon, _Component);

  var _super = _createSuper(OrchestralRibbon);

  function OrchestralRibbon(props) {
    var _this;

    _classCallCheck(this, OrchestralRibbon);

    _this = _super.call(this, props);
    _this.state = {
      active: false
    };
    return _this;
  }

  _createClass(OrchestralRibbon, [{
    key: "showLongName",
    value: function showLongName(e) {
      var cl = e.target.className.baseVal;
      var i = cl.substr(cl.indexOf('nnn') + 3);
      this.setState({
        active: parseInt(i)
      });
    }
  }, {
    key: "showShortName",
    value: function showShortName(e) {
      this.setState({
        active: false
      });
    }
  }, {
    key: "render",
    value: function render() {
      if (Object.keys(this.props.score).length) {
        if (true && this.props.score["MEIfile"] && this.props.score["MEIfile"][this.props.uri]) {
          var orch = new _MEIRibbonUtils.Orchestration(this.props.score["MEIfile"][this.props.uri], this.props.additionalInstruments);
          var startx = 120;
          var starty = 20;
          var height = this.props.height;
          var width = this.props.width;
          var rowHeight = (height - starty) / orch.instruments.filter(function (x) {
            return x.type;
          }).length;
          var boxes = [];
          var captions = [];
          var misses = 0;
          var stop = Math.max.apply(Math, _toConsumableArray(Object.keys(orch.instruments))) + 1;

          for (var i = 0; i < stop; i++) {
            if (!orch.instruments[i]) {
              misses++;
              continue;
            }

            var inst = orch.instruments[i].type;

            if (!inst) {
              console.log("can't find", orch.instruments[i]);
              misses++;
              continue;
            }

            var xpos = 100;
            var ypos = rowHeight * (i - misses) + starty;
            var instName = inst.multiplicity ? inst.multiplicity + " " + inst.plural : inst.name;

            var cap = /*#__PURE__*/_react["default"].createElement("g", {
              key: 'instrLabel' + i
            }, /*#__PURE__*/_react["default"].createElement("text", {
              x: xpos,
              y: ypos + 2 * rowHeight / 3,
              className: 'instrLabel ' + inst.section + " " + inst.name + " nnn" + i
            }, instName));

            captions.push(cap);
            boxes.push((0, _MEIRibbonUtils.drawRibbons)(orch.instruments[i].onOffArray(), ypos, rowHeight, (width - 120) / orch.measureCount, ' ' + inst.section + " " + inst.name + " nnn" + i, false, false, i, 120));
          }

          var bars = (0, _MEIRibbonUtils.drawBarLines)(orch.measureCount, width, height, 120, starty);
          var barNo = this.props.barNo ? /*#__PURE__*/_react["default"].createElement("text", {
            x: startx - 5,
            y: starty - 10,
            className: "barno"
          }, this.props.barNo) : false;
          return /*#__PURE__*/_react["default"].createElement("svg", {
            width: width,
            height: height,
            className: "orchestralRibbon"
          }, bars, boxes, captions, barNo);
        } else if (this.props.score["MEIfile"] && this.props.score["MEIfile"][this.props.uri]) {
          var orch = new _MEIRibbonUtils.Orchestration(this.props.score["MEIfile"][this.props.uri]);
          var mergedInst = (0, _MEIRibbonUtils.mergedInstruments)(orch.instruments);
          var height = Math.min(this.props.height, window.innerHeight - 200);
          var width = this.props.width;
          var rowHeight = height / mergedInst.length;
          var boxes = [];
          var captions = [];
          var startx = 0;

          for (var i = 0; i < mergedInst.length; i++) {
            var xpos = 0; // var ypos = rowHeight*(i+0.875);

            var ypos = rowHeight * i;
            var mover = this.showLongName.bind(this);
            var mout = this.showShortName.bind(this);
            var iname = '';
            var section = 'mixed';
            var cap = (0, _MEIRibbonUtils.caption)(mergedInst[i].instruments, orch.instruments, this.state.active === i, mover, mout, xpos, ypos + 2 * rowHeight / 3, 'instrLabel ', i);
            captions.push(cap.obj);
            boxes.push((0, _MEIRibbonUtils.drawRibbons)(mergedInst[i].playing, ypos, rowHeight, (width - 40) / orch.measureCount, ' ' + cap.cl, mover, mout, i));
          }

          var bars = (0, _MEIRibbonUtils.drawBarLines)(orch.measureCount, width, height);
          return /*#__PURE__*/_react["default"].createElement("svg", {
            width: width,
            height: height,
            className: "orchestralRibbon"
          }, bars, boxes, captions);
        }

        return /*#__PURE__*/_react["default"].createElement("div", {
          className: "ribbon empty"
        });
      }

      return /*#__PURE__*/_react["default"].createElement("div", null, "Loading...");
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      this.props.fetchRibbonContent(this.props.uri);
    }
  }]);

  return OrchestralRibbon;
}(_react.Component);

function mapStateToProps(_ref) {
  var score = _ref.score;
  return {
    score: score
  };
}

function mapDispatchToProps(dispatch) {
  return (0, _redux.bindActionCreators)({
    fetchRibbonContent: _index.fetchRibbonContent
  }, dispatch);
}

var _default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(OrchestralRibbon);

exports["default"] = _default;