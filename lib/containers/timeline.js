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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb250YWluZXJzL3RpbWVsaW5lLmpzIl0sIm5hbWVzIjpbIk1FSVRpbWVsaW5lIiwicHJvcHMiLCJzdGF0ZSIsInN0cnVjdHVyZXMiLCJzdW0iLCJpIiwibGVuZ3RoIiwiQXJyYXkiLCJpc0FycmF5Iiwic3VtQmFycyIsIk51bWJlciIsImlzSW50ZWdlciIsImNvbnNvbGUiLCJsb2ciLCJldmVudCIsImVsIiwidGFyZ2V0IiwibW90aWYiLCJnZXRBdHRyaWJ1dGVOUyIsIm1hdGNoIiwib25Nb3RpZkNoYW5nZSIsImJveFRvcCIsImJveEhlaWdodCIsImJveEJvdHRvbSIsIndpZHRoIiwiaGVpZ2h0Iiwic2NlbmVZIiwiYmFyQ291bnQiLCJzY2FsZSIsImN1cngiLCJtb3RpZkxpbmVzIiwiZGl2TGluZXMiLCJhY3QiLCJhY3RTdHJpbmciLCJwdXNoIiwic3Vic3RyaW5nIiwibSIsImN1cnJlbnQiLCJjdXJyZW50Q2xhc3MiLCJmdW4iLCJtb3RpZkNoYW5nZUNsaWNrSGFuZGxlciIsImJpbmQiLCJzIiwic2NlbmUiLCJDb21wb25lbnQiLCJtYXBTdGF0ZVRvUHJvcHMiLCJzY29yZSIsIm1hcERpc3BhdGNoVG9Qcm9wcyIsImRpc3BhdGNoIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQTs7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUFFTUEsVzs7Ozs7QUFDSix1QkFBWUMsS0FBWixFQUFtQjtBQUFBOztBQUFBOztBQUNqQiw4QkFBTUEsS0FBTjtBQUNBLFVBQUtDLEtBQUwsR0FBYTtBQUNYQyxNQUFBQSxVQUFVLEVBQUUsQ0FBQyxDQUFDLFVBQUQsRUFBYSxVQUFiLEVBQXlCLEVBQXpCLEVBQTZCLEtBQTdCLENBQUQsRUFDVixDQUFDLEtBQUQsRUFBUSxHQUFSLEVBQWEsQ0FBQyxDQUFDLE9BQUQsRUFBVSxDQUFWLEVBQWEsR0FBYixDQUFELEVBQ1gsQ0FBQyxPQUFELEVBQVUsQ0FBVixFQUFhLEdBQWIsQ0FEVyxFQUVYLENB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NUIsRUFBc0M7QUFDcEMsU0FBTyxFQUFQO0FBQ0Q7O2VBRWMseUJBQVFILGVBQVIsRUFBeUJFLGtCQUF6QixFQUE2Qy9DLFdBQTdDLEMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHtDb21wb25lbnR9IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7Y29ubmVjdH0gZnJvbSAncmVhY3QtcmVkdXgnO1xuXG5jbGFzcyBNRUlUaW1lbGluZSBleHRlbmRzIENvbXBvbmVudCB7XG4gIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgc3VwZXIocHJvcHMpO1xuICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICBzdHJ1Y3R1cmVzOiBbWydvdmVydHVyZScsICdWb3JzcGllbCcsIDc1LCBmYWxzZV0sXG4gICAgICAgIFsnYWN0JywgJ0knLCBbWydzY2VuZScsIDEsIDI2Ml0sXG4gICAgICAgICAgWydzY2VuZScsIDIsIDM5N10sXG4gICAgICAgICAgWydzY2VuZScsIDMsIDU4N11dLFxuICAgICAgICAgIFtbJ0YxJywgNzc3XSwgWydGMicsIDc4OV1dXSxcbiAgICAgICAgWydhY3QnLCAnSUknLCBbWydzY2VuZScsIDEsIDQyM10sXG4gICAgICAgICAgWydzY2VuZScsIDIsIDQ0M10sXG4gICAgICAgICAgWydzY2VuZScsIDMsIDQ3OV0sXG4gICAgICAgICAgWydzY2VuZScsIDQsIDI4M10sXG4gICAgICAgICAgWydzY2VuZScsIDUsIDQ3OF1dLFxuICAgICAgICAgIFtbJ0YzJywgMThdLCBbJ0Y0JywgMzFdLCBbJ0Y1JywgMjg4XSwgWydGNicsIDc2N10sIFsnRjcnLCAxODc1XSwgWydGOCcsIDE5NDldLCBbJ0Y5JywgMjA5OF1dXSxcbiAgICAgICAgWydhY3QnLCAnSUknLCBbWydzY2VuZScsIDEsIDE3NF0sXG4gICAgICAgICAgWydzY2VuZScsIDIsIDU1M10sXG4gICAgICAgICAgWydzY2VuZScsIDMsIDg0NV1dLFxuICAgICAgICAgIFtbJ0YxMCcsIDQ5NF0sIFsnRjExJywgNjIxXSwgWydGMTInLCA3MzddLCBbJ0YxMycsIDgyNF0sIFsnRjE0JywgODMyXSwgWydGMTUnLCA4MzZdLCBbJ0YxNicsIDEwNjJdXV1dXG4gICAgfTtcbiAgfVxuXG4gIHN1bUJhcnMoc3RydWN0dXJlcykge1xuICAgIHZhciBzdW0gPSAwO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgc3RydWN0dXJlcy5sZW5ndGg7IGkrKykge1xuICAgICAgaWYgKEFycmF5LmlzQXJyYXkoc3RydWN0dXJlc1tpXVsyXSkpIHtcbiAgICAgICAgc3VtICs9IHRoaXMuc3VtQmFycyhzdHJ1Y3R1cmVzW2ldWzJdKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGlmIChOdW1iZXIuaXNJbnRlZ2VyKHN0cnVjdHVyZXNbaV1bMl0pKSB7XG4gICAgICAgICAgc3VtICs9IHN0cnVjdHVyZXNbaV1bMl07XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgY29uc29sZS5sb2coXCJtYW5nbGVkIGRyYW1hdGljIHN0cnVjdHVyZTogXCIsIHN0cnVjdHVyZXNbaV0sIEFycmF5LmlzQXJyYXkoc3RydWN0dXJlc1tpXVsyXSkpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBzdW07XG4gIH1cblxuICBtb3RpZkNoYW5nZUNsaWNrSGFuZGxlcihldmVudCkge1xuICAgIHZhciBlbCA9IGV2ZW50LnRhcmdldDtcbiAgICB2YXIgbW90aWYgPSBlbC5nZXRBdHRyaWJ1dGVOUyhudWxsLCAnY2xhc3MnKS5tYXRjaCgvRlswLTldKy8pO1xuICAgIHRoaXMucHJvcHMub25Nb3RpZkNoYW5nZShtb3RpZik7XG4gIH1cblxuICByZW5kZXIoKSB7XG4gICAgaWYgKHRoaXMuc3RhdGUuc3RydWN0dXJlcykge1xuICAgICAgdmFyIHN0cnVjdHVyZXMgPSB0aGlzLnN0YXRlLnN0cnVjdHVyZXM7XG4gICAgICB2YXIgYm94VG9wID0gdGhpcy5wcm9wcy5ib3hUb3AgfHwgMjA7XG4gICAgICB2YXIgYm94SGVpZ2h0ID0gdGhpcy5wcm9wcy5ib3hIZWlnaHQgfHwgMjA7XG4gICAgICB2YXIgYm94Qm90dG9tID0gYm94VG9wICsgYm94SGVpZ2h0O1xuICAgICAgdmFyIHdpZHRoID0gdGhpcy5wcm9wcy53aWR0aCB8fCAxMjAwO1xuICAgICAgdmFyIGhlaWdodCA9IHRoaXMucHJvcHMuaGVpZ2h0IHx8IDgwO1xuICAgICAgdmFyIHNjZW5lWSA9IGJveEJvdHRvbSArICgoaGVpZ2h0IC0gYm94Qm90dG9tKSAvIDMpO1xuICAgICAgdmFyIGJhckNvdW50ID0gdGhpcy5zdW1CYXJzKHRoaXMuc3RhdGUuc3RydWN0dXJlcyk7XG4gICAgICB2YXIgc2NhbGUgPSB3aWR0aCAvIGJhckNvdW50O1xuICAgICAgdmFyIGN1cnggPSAwO1xuICAgICAgdmFyIG1vdGlmTGluZXMgPSBbXTtcbiAgICAgIHZhciBkaXZMaW5lcyA9IFtdO1xuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBzdHJ1Y3R1cmVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHZhciBhY3QgPSBzdHJ1Y3R1cmVzW2ldO1xuICAgICAgICB2YXIgYWN0U3RyaW5nID0gYWN0WzBdICsgXCItXCIgKyBhY3RbMV07XG4gICAgICAgIC8vIERyYXcgbGluZXMgZm9yIGFjdHNcbiAgICAgICAgZGl2TGluZXMucHVzaCg8bGluZSBjbGFzc05hbWU9XCJhY3QgZGl2aXNpb25cIiBpZD17XCJ0bC1cIiArIGFjdFN0cmluZ31cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB4MT17Y3VyeH0geDI9e2N1cnh9IHkxPXtpID8gYm94VG9wIDogYm94VG9wICsgNn0geTI9e2hlaWdodCAtIDJ9Lz4pO1xuICAgICAgICBkaXZMaW5lcy5wdXNoKDx0ZXh0IGNsYXNzTmFtZT1cImFjdG5hbWVcIiB4PXtjdXJ4ICsgMn0geT17aGVpZ2h0fT57KGFjdFsxXSArIFwiXCIpLnN1YnN0cmluZygwLCAzKX08L3RleHQ+KTtcbiAgICAgICAgLy8gZHJhdyBsaW5lcyBmb3IgbW90aWZzIChmaXJzdCBiZWNhdXNlIGJhciBudW1iZXJzIGFyZSBpbmRleCBieSBhY3QsIG5vdCBzY2VuZSlcbiAgICAgICAgaWYgKGFjdFszXSAmJiBhY3RbM10ubGVuZ3RoKSB7XG4gICAgICAgICAgZm9yICh2YXIgbSA9IDA7IG0gPCBhY3RbM10ubGVuZ3RoOyBtKyspIHtcbiAgICAgICAgICAgIHZhciBtb3RpZiA9IGFjdFszXVttXTtcbiAgICAgICAgICAgIHZhciBjdXJyZW50ID0gdGhpcy5wcm9wcy5tb3RpZiAmJiB0aGlzLnByb3BzLm1vdGlmID09IG1vdGlmWzBdO1xuICAgICAgICAgICAgdmFyIGN1cnJlbnRDbGFzcyA9IGN1cnJlbnQgPyBcIiBhY3RpdmVcIiA6IFwiXCI7XG4gICAgICAgICAgICB2YXIgZnVuID0gdGhpcy5tb3RpZkNoYW5nZUNsaWNrSGFuZGxlci5iaW5kKHRoaXMpO1xuICAgICAgICAgICAgbW90aWZMaW5lcy5wdXNoKDxsaW5lIGNsYXNzTmFtZT17XCJhbm5vdGF0aW9uIGFubm90YXRpb25fX0Fza2luZ0ZvcmJpZGRlbl9cIiArIG1vdGlmWzBdICsgXCJfMVwiICsgY3VycmVudENsYXNzfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9e2Z1bn1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB4MT17Y3VyeCArIChtb3RpZlsxXSAqIHNjYWxlKX0geDI9e2N1cnggKyAobW90aWZbMV0gKiBzY2FsZSl9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeTE9e2N1cnJlbnQgPyAwIDogNX0geTI9e2JveEJvdHRvbX0vPik7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmIChBcnJheS5pc0FycmF5KGFjdFsyXSkpIHtcbiAgICAgICAgICBmb3IgKHZhciBzID0gMDsgcyA8IGFjdFsyXS5sZW5ndGg7IHMrKykge1xuICAgICAgICAgICAgdmFyIHNjZW5lID0gYWN0WzJdW3NdO1xuICAgICAgICAgICAgZGl2TGluZXMucHVzaCg8bGluZSBjbGFzc05hbWU9XCJzY2VuZSBkaXZpc2lvblwiIGlkPXtcInRsLVwiICsgc2NlbmVbMF0gKyBcIi1cIiArIHNjZW5lWzFdICsgXCItXCIgKyBhY3RTdHJpbmd9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHgxPXtjdXJ4fSB4Mj17Y3VyeH0geTE9e2JveFRvcH0geTI9e3NjZW5lWX0vPik7XG4gICAgICAgICAgICBkaXZMaW5lcy5wdXNoKDx0ZXh0IGNsYXNzTmFtZT1cInNjZW5lbmFtZVwiIHg9e2N1cnggKyAyfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB5PXtzY2VuZVkgKyAyfT57KHNjZW5lWzFdICsgXCJcIikuc3Vic3RyaW5nKDAsIDMpfTwvdGV4dD4pO1xuICAgICAgICAgICAgY3VyeCArPSBzY2FsZSAqIHNjZW5lWzJdO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBjdXJ4ICs9IHNjYWxlICogYWN0WzJdO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gKFxuICAgICAgICAgIDxzdmcgd2lkdGg9e3dpZHRofSBoZWlnaHQ9e2hlaWdodH0gY2xhc3NOYW1lPVwidGltZWxpbmUtb3ZlcnZpZXdcIj5cbiAgICAgICAgICAgIDxyZWN0IGNsYXNzTmFtZT17XCJ0aW1lbGluZVwifSB5PXtib3hUb3B9IHg9XCIwXCIgcng9XCI2cHhcIiByeT1cIjZweFwiIHdpZHRoPXt3aWR0aH0gaGVpZ2h0PXtib3hIZWlnaHR9PjwvcmVjdD5cbiAgICAgICAgICAgIHtkaXZMaW5lc31cbiAgICAgICAgICAgIHttb3RpZkxpbmVzfVxuICAgICAgICAgIDwvc3ZnPik7XG4gICAgfVxuICAgIHJldHVybiA8ZGl2PkxvYWRpbmcuLi48L2Rpdj47XG4gIH1cblxufVxuXG5cbmZ1bmN0aW9uIG1hcFN0YXRlVG9Qcm9wcyh7c2NvcmV9KSB7XG4gIHJldHVybiB7c2NvcmV9O1xufVxuXG5mdW5jdGlvbiBtYXBEaXNwYXRjaFRvUHJvcHMoZGlzcGF0Y2gpIHtcbiAgcmV0dXJuIHt9O1xufVxuXG5leHBvcnQgZGVmYXVsdCBjb25uZWN0KG1hcFN0YXRlVG9Qcm9wcywgbWFwRGlzcGF0Y2hUb1Byb3BzKShNRUlUaW1lbGluZSk7XG4iXX0=