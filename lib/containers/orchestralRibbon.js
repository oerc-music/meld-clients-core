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

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

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

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb250YWluZXJzL29yY2hlc3RyYWxSaWJib24uanMiXSwibmFtZXMiOlsiT3JjaGVzdHJhbFJpYmJvbiIsInByb3BzIiwic3RhdGUiLCJhY3RpdmUiLCJlIiwiY2wiLCJ0YXJnZXQiLCJjbGFzc05hbWUiLCJiYXNlVmFsIiwiaSIsInN1YnN0ciIsImluZGV4T2YiLCJzZXRTdGF0ZSIsInBhcnNlSW50IiwiT2JqZWN0Iiwia2V5cyIsInNjb3JlIiwibGVuZ3RoIiwidXJpIiwib3JjaCIsIk9yY2hlc3RyYXRpb24iLCJhZGRpdGlvbmFsSW5zdHJ1bWVudHMiLCJzdGFydHgiLCJzdGFydHkiLCJoZWlnaHQiLCJ3aWR0aCIsInJvd0hlaWdodCIsImluc3RydW1lbnRzIiwiZmlsdGVyIiwieCIsInR5cGUiLCJib3hlcyIsImNhcHRpb25zIiwibWlzc2VzIiwic3RvcCIsIk1hdGgiLCJtYXgiLCJpbnN0IiwiY29uc29sZSIsImxvZyIsInhwb3MiLCJ5cG9zIiwiaW5zdE5hbWUiLCJtdWx0aXBsaWNpdHkiLCJwbHVyYWwiLCJuYW1lIiwiY2FwIiwic2VjdGlvbiIsInB1c2giLCJvbk9mZkFycmF5IiwibWVhc3VyZUNvdW50IiwiYmFycyIsImJhck5vIiwibWVyZ2VkSW5zdCIsIm1pbiIsIndpbmRvdyIsImlubmVySGVpZ2h0IiwibW92ZXIiLCJzaG93TG9uZ05hbWUiLCJiaW5kIiwibW91dCIsInNob3dTaG9ydE5hbWUiLCJpbmFtZSIsIm9iaiIsInBsYXlpbmciLCJmZXRjaFJpYmJvbkNvbnRlbnQiLCJDb21wb25lbnQiLCJtYXBTdGF0ZVRvUHJvcHMiLCJtYXBEaXNwYXRjaFRvUHJvcHMiLCJkaXNwYXRjaCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUE7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBRUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUFFTUEsZ0I7Ozs7O0FBQ0wsNEJBQVlDLEtBQVosRUFBbUI7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QUFnQ3pCLEtBQWhDLEVBQXVDRCxNQUF2QyxDQUFYO0FBQ0EsOEJBQU87QUFBSyxZQUFBLEtBQUssRUFBRUMsS0FBWjtBQUFtQixZQUFBLE1BQU0sRUFBRUQsTUFBM0I7QUFBbUMsWUFBQSxTQUFTLEVBQUM7QUFBN0MsYUFBaUUyQixJQUFqRSxFQUF1RXBCLEtBQXZFLEVBQThFQyxRQUE5RSxDQUFQO0FBQ0E7O0FBQ0QsNEJBQU87QUFBSyxVQUFBLFNBQVMsRUFBQztBQUFmLFVBQVA7QUFDQTs7QUFDRCwwQkFBTywwREFBUDtBQUNBOzs7V0FFQSw2QkFBb0I7QUFDbEIsV0FBSy9CLEtBQUwsQ0FBV2dFLGtCQUFYLENBQThCLEtBQUtoRSxLQUFMLENBQVdpQixHQUF6QztBQUNEOzs7O0VBdkY0QmdELGdCOztBQTBGL0IsU0FBU0MsZUFBVCxPQUFrQztBQUFBLE1BQVJuRCxLQUFRLFFBQVJBLEtBQVE7QUFDaEMsU0FBTztBQUFDQSxJQUFBQSxLQUFLLEVBQUxBO0FBQUQsR0FBUDtBQUNEOztBQUVELFNBQVNvRCxrQkFBVCxDQUE0QkMsUUFBNUIsRUFBc0M7QUFDcEMsU0FBTywrQkFBbUI7QUFBQ0osSUFBQUEsa0JBQWtCLEVBQWxCQTtBQUFELEdBQW5CLEVBQXlDSSxRQUF6QyxDQUFQO0FBQ0Q7O2VBRWMseUJBQVFGLGVBQVIsRUFBeUJDLGtCQUF6QixFQUE2Q3BFLGdCQUE3QyxDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7Q29tcG9uZW50fSBmcm9tICdyZWFjdCc7XG5pbXBvcnQge2Nvbm5lY3R9IGZyb20gJ3JlYWN0LXJlZHV4JztcbmltcG9ydCB7YmluZEFjdGlvbkNyZWF0b3JzfSBmcm9tICdyZWR1eCc7XG5pbXBvcnQge2ZldGNoUmliYm9uQ29udGVudH0gZnJvbSAnLi4vYWN0aW9ucy9pbmRleCc7XG5pbXBvcnQgeyBPcmNoZXN0cmF0aW9uLCBtZXJnZWRJbnN0cnVtZW50cywgY2FwdGlvbiwgZHJhd0JhckxpbmVzLCBkcmF3UmliYm9ucyB9IGZyb20gJy4uL2xpYnJhcnkvTUVJUmliYm9uVXRpbHMnO1xuXG5pbXBvcnQgSW5saW5lU1ZHIGZyb20gJ3N2Zy1pbmxpbmUtcmVhY3QnO1xuXG5jbGFzcyBPcmNoZXN0cmFsUmliYm9uIGV4dGVuZHMgQ29tcG9uZW50IHtcblx0Y29uc3RydWN0b3IocHJvcHMpIHtcblx0XHRzdXBlcihwcm9wcyk7XG5cdFx0dGhpcy5zdGF0ZSA9IHsgYWN0aXZlOiBmYWxzZSB9O1xuXHR9XG5cblx0c2hvd0xvbmdOYW1lKGUpe1xuXHRcdHZhciBjbCA9IGUudGFyZ2V0LmNsYXNzTmFtZS5iYXNlVmFsO1xuXHRcdHZhciBpID0gY2wuc3Vic3RyKGNsLmluZGV4T2YoJ25ubicpKzMpO1xuXHRcdHRoaXMuc2V0U3RhdGUoe2FjdGl2ZTogcGFyc2VJbnQoaSl9KTtcblx0fVxuXHRzaG93U2hvcnROYW1lKGUpe1xuXHRcdHRoaXMuc2V0U3RhdGUoe2FjdGl2ZTogZmFsc2V9KTtcblx0fVxuXG4gIHJlbmRlcigpe1xuICAgIGlmKE9iamVjdC5rZXlzKHRoaXMucHJvcHMuc2NvcmUpLmxlbmd0aCkge1xuXHRcdFx0aWYodHJ1ZSAmJiAodGhpcy5wcm9wcy5zY29yZVtcIk1FSWZpbGVcIl0gJiYgdGhpcy5wcm9wcy5zY29yZVtcIk1FSWZpbGVcIl1bdGhpcy5wcm9wcy51cmldKSl7XG5cdFx0XHRcdHZhciBvcmNoID0gbmV3IE9yY2hlc3RyYXRpb24odGhpcy5wcm9wcy5zY29yZVtcIk1FSWZpbGVcIl1bdGhpcy5wcm9wcy51cmldLCB0aGlzLnByb3BzLmFkZGl0aW9uYWxJbnN0cnVtZW50cyk7XG5cdFx0XHRcdHZhciBzdGFydHggPSAxMjA7XG5cdFx0XHRcdHZhciBzdGFydHkgPSAyMDtcblx0XHRcdFx0dmFyIGhlaWdodCA9IHRoaXMucHJvcHMuaGVpZ2h0O1xuXHRcdFx0XHR2YXIgd2lkdGggPSB0aGlzLnByb3BzLndpZHRoO1xuXHRcdFx0XHR2YXIgcm93SGVpZ2h0ID0gKGhlaWdodCAtIHN0YXJ0eSkgLyBvcmNoLmluc3RydW1lbnRzLmZpbHRlcih4PT54LnR5cGUpLmxlbmd0aDtcblx0XHRcdFx0dmFyIGJveGVzID0gW107XG5cdFx0XHRcdHZhciBjYXB0aW9ucyA9IFtdO1xuXHRcdFx0XHR2YXIgbWlzc2VzID0gMDtcblx0XHRcdFx0dmFyIHN0b3A9TWF0aC5tYXgoLi4uT2JqZWN0LmtleXMob3JjaC5pbnN0cnVtZW50cykpKzE7XG5cdFx0XHRcdGZvciAodmFyIGk9MDsgaTxzdG9wOyBpKyspe1xuXHRcdFx0XHRcdGlmKCFvcmNoLmluc3RydW1lbnRzW2ldKXtcblx0XHRcdFx0XHRcdG1pc3NlcysrO1xuXHRcdFx0XHRcdFx0Y29udGludWU7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdHZhciBpbnN0ID0gb3JjaC5pbnN0cnVtZW50c1tpXS50eXBlO1xuXHRcdFx0XHRcdGlmKCFpbnN0KSB7XG5cdFx0XHRcdFx0XHRjb25zb2xlLmxvZyhcImNhbid0IGZpbmRcIiwgb3JjaC5pbnN0cnVtZW50c1tpXSk7XG5cdFx0XHRcdFx0XHRtaXNzZXMrK1xuXHRcdFx0XHRcdFx0Y29udGludWU7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdHZhciB4cG9zID0gMTAwO1xuXHRcdFx0XHRcdHZhciB5cG9zID0gKHJvd0hlaWdodCooaSAtIG1pc3NlcykpK3N0YXJ0eTtcblx0XHRcdFx0XHR2YXIgaW5zdE5hbWUgID0gaW5zdC5tdWx0aXBsaWNpdHkgPyBpbnN0Lm11bHRpcGxpY2l0eSArIFwiIFwiICsgaW5zdC5wbHVyYWwgOiBpbnN0Lm5hbWU7XG5cdFx0XHRcdFx0dmFyIGNhcCA9ICg8ZyBrZXk9eydpbnN0ckxhYmVsJytpfT5cblx0XHRcdFx0XHRcdFx0XHRcdFx0IDx0ZXh0IHg9e3hwb3N9IHk9e3lwb3MrMipyb3dIZWlnaHQvM30gXG5cdFx0XHRcdFx0XHRcdFx0XHRcdCAgICAgICBjbGFzc05hbWU9eydpbnN0ckxhYmVsICcraW5zdC5zZWN0aW9uK1wiIFwiK2luc3QubmFtZStcIiBubm5cIitpfT5cblx0XHRcdFx0XHRcdFx0XHRcdFx0IHtpbnN0TmFtZX08L3RleHQ+XG5cdFx0XHRcdFx0XHRcdFx0XHRcdCA8L2c+KTtcblx0XHRcdFx0XHRjYXB0aW9ucy5wdXNoKGNhcCk7XG5cdFx0XHRcdFx0Ym94ZXMucHVzaChkcmF3UmliYm9ucyhvcmNoLmluc3RydW1lbnRzW2ldLm9uT2ZmQXJyYXkoKSwgeXBvcywgcm93SGVpZ2h0LFxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQgKHdpZHRoLTEyMCkvb3JjaC5tZWFzdXJlQ291bnQsICcgJytpbnN0LnNlY3Rpb25cblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0ICtcIiBcIitpbnN0Lm5hbWUrXCIgbm5uXCIraSxcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0IGZhbHNlLCBmYWxzZSwgaSwgMTIwKSk7XG5cdFx0XHRcdH1cblx0XHRcdFx0dmFyIGJhcnMgPSBkcmF3QmFyTGluZXMob3JjaC5tZWFzdXJlQ291bnQsIHdpZHRoLCBoZWlnaHQsIDEyMCwgc3RhcnR5KTtcblx0XHRcdFx0dmFyIGJhck5vID0gdGhpcy5wcm9wcy5iYXJObyA/IDx0ZXh0IHg9e3N0YXJ0eC01fSB5PXtzdGFydHktMTB9IGNsYXNzTmFtZT1cImJhcm5vXCI+e3RoaXMucHJvcHMuYmFyTm99PC90ZXh0PiA6IGZhbHNlO1xuXHRcdFx0XHRyZXR1cm4gPHN2ZyB3aWR0aD17d2lkdGh9IGhlaWdodD17aGVpZ2h0fSBjbGFzc05hbWU9XCJvcmNoZXN0cmFsUmliYm9uXCI+e2JhcnN9e2JveGVzfXtjYXB0aW9uc317YmFyTm99PC9zdmc+O1xuXHRcdFx0fSBlbHNlIGlmKHRoaXMucHJvcHMuc2NvcmVbXCJNRUlmaWxlXCJdICYmIHRoaXMucHJvcHMuc2NvcmVbXCJNRUlmaWxlXCJdW3RoaXMucHJvcHMudXJpXSl7XG5cdFx0XHRcdHZhciBvcmNoID0gbmV3IE9yY2hlc3RyYXRpb24odGhpcy5wcm9wcy5zY29yZVtcIk1FSWZpbGVcIl1bdGhpcy5wcm9wcy51cmldKTtcblx0XHRcdFx0dmFyIG1lcmdlZEluc3QgPSBtZXJnZWRJbnN0cnVtZW50cyhvcmNoLmluc3RydW1lbnRzKTtcblx0XHRcdFx0dmFyIGhlaWdodCA9IE1hdGgubWluKHRoaXMucHJvcHMuaGVpZ2h0LCB3aW5kb3cuaW5uZXJIZWlnaHQgLSAyMDApO1xuXHRcdFx0XHR2YXIgd2lkdGggPSB0aGlzLnByb3BzLndpZHRoO1xuXHRcdFx0XHR2YXIgcm93SGVpZ2h0ID0gaGVpZ2h0IC8gbWVyZ2VkSW5zdC5sZW5ndGg7XG5cdFx0XHRcdHZhciBib3hlcyA9IFtdO1xuXHRcdFx0XHR2YXIgY2FwdGlvbnMgPSBbXTtcblx0XHRcdFx0dmFyIHN0YXJ0eCA9IDA7XG5cdFx0XHRcdGZvcih2YXIgaT0wOyBpPG1lcmdlZEluc3QubGVuZ3RoOyBpKyspe1xuXHRcdFx0XHRcdHZhciB4cG9zID0gMDtcblx0XHRcdFx0XHQvLyB2YXIgeXBvcyA9IHJvd0hlaWdodCooaSswLjg3NSk7XG5cdFx0XHRcdFx0dmFyIHlwb3MgPSByb3dIZWlnaHQqaTtcblx0XHRcdFx0XHR2YXIgbW92ZXIgPSB0aGlzLnNob3dMb25nTmFtZS5iaW5kKHRoaXMpO1xuXHRcdFx0XHRcdHZhciBtb3V0ID0gdGhpcy5zaG93U2hvcnROYW1lLmJpbmQodGhpcyk7XG5cdFx0XHRcdFx0dmFyIGluYW1lID0gJyc7XG5cdFx0XHRcdFx0dmFyIHNlY3Rpb24gPSAnbWl4ZWQnO1xuXHRcdFx0XHRcdHZhciBjYXAgPSBjYXB0aW9uKG1lcmdlZEluc3RbaV0uaW5zdHJ1bWVudHMsb3JjaC5pbnN0cnVtZW50cywgdGhpcy5zdGF0ZS5hY3RpdmU9PT1pLCBtb3Zlcixtb3V0LCB4cG9zLCB5cG9zKygyKnJvd0hlaWdodC8zKSwgJ2luc3RyTGFiZWwgJywgaSk7XG5cdFx0XHRcdFx0Y2FwdGlvbnMucHVzaChjYXAub2JqKTtcblx0XHRcdFx0XHRib3hlcy5wdXNoKGRyYXdSaWJib25zKG1lcmdlZEluc3RbaV0ucGxheWluZywgeXBvcywgcm93SGVpZ2h0LCAod2lkdGgtNDApL29yY2gubWVhc3VyZUNvdW50LCAnICcrY2FwLmNsLCBtb3ZlciwgbW91dCwgaSkpO1xuXHRcdFx0XHR9XG5cdFx0XHRcdHZhciBiYXJzID0gZHJhd0JhckxpbmVzKG9yY2gubWVhc3VyZUNvdW50LCB3aWR0aCwgaGVpZ2h0KTtcblx0XHRcdFx0cmV0dXJuIDxzdmcgd2lkdGg9e3dpZHRofSBoZWlnaHQ9e2hlaWdodH0gY2xhc3NOYW1lPVwib3JjaGVzdHJhbFJpYmJvblwiPntiYXJzfXtib3hlc317Y2FwdGlvbnN9PC9zdmc+O1xuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIDxkaXYgY2xhc3NOYW1lPVwicmliYm9uIGVtcHR5XCI+PC9kaXY+O1xuXHRcdH1cblx0XHRyZXR1cm4gPGRpdj5Mb2FkaW5nLi4uPC9kaXY+O1xuXHR9XG5cbiAgY29tcG9uZW50RGlkTW91bnQoKSB7XG4gICAgdGhpcy5wcm9wcy5mZXRjaFJpYmJvbkNvbnRlbnQodGhpcy5wcm9wcy51cmkpO1xuICB9XG59XG5cbmZ1bmN0aW9uIG1hcFN0YXRlVG9Qcm9wcyh7c2NvcmV9KSB7XG4gIHJldHVybiB7c2NvcmV9O1xufVxuXG5mdW5jdGlvbiBtYXBEaXNwYXRjaFRvUHJvcHMoZGlzcGF0Y2gpIHtcbiAgcmV0dXJuIGJpbmRBY3Rpb25DcmVhdG9ycyh7ZmV0Y2hSaWJib25Db250ZW50fSwgZGlzcGF0Y2gpO1xufVxuXG5leHBvcnQgZGVmYXVsdCBjb25uZWN0KG1hcFN0YXRlVG9Qcm9wcywgbWFwRGlzcGF0Y2hUb1Byb3BzKShPcmNoZXN0cmFsUmliYm9uKTtcbiJdfQ==