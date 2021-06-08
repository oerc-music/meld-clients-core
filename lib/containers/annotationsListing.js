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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb250YWluZXJzL2Fubm90YXRpb25zTGlzdGluZy5qcyJdLCJuYW1lcyI6WyJBbm5vdGF0aW9uc0xpc3RpbmciLCJwcm9wcyIsImNvbnNvbGUiLCJsb2ciLCJPYmplY3QiLCJrZXlzIiwic2NvcmUiLCJsZW5ndGgiLCJjb21wb25lbnRUYXJnZXRzIiwiYW5ubyIsImFubm90YXRpb25zIiwiZmlsdGVyIiwiYW5ub3RhdGlvbiIsInNvcnQiLCJhIiwiYiIsIm1hcCIsInQiLCJyZXBsYWNlIiwic2NvcmVQYWdlVG9Db21wb25lbnRUYXJnZXQiLCJzY29yZVVyaSIsIk1FSSIsIkNvbXBvbmVudCIsIm1hcFN0YXRlVG9Qcm9wcyIsIm1hcERpc3BhdGNoVG9Qcm9wcyIsImRpc3BhdGNoIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQTs7QUFDQTs7QUFDQTs7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUFFTUEsa0I7Ozs7O0FBQ0osOEJBQVlDLEtBQVosRUFBbUI7QUFBQTs7QUFBQSw2QkFDWEEsS0FEVztBQUVsQjs7OztXQUVELGtCQUFTO0FBQUE7O0FBQ1BDLE1BQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUFZLHFCQUFaLEVBQW1DLEtBQUtGLEtBQXhDOztBQUNBLFVBQUlHLE1BQU0sQ0FBQ0MsSUFBUCxDQUFZLEtBQUtKLEtBQUwsQ0FBV0ssS0FBdkIsRUFBOEJDLE1BQTlCLElBQXdDSCxNQUFNLENBQUNDLElBQVAsQ0FBWSxLQUFLSixLQUFMLENBQVdLLEtBQVgsQ0FBaUJFLGdCQUE3QixFQUErQ0QsTUFBM0YsRUFBbUc7QUFDakc7QUFDQSxZQUFNRSxJQUFJLEdBQUdDLFdBQVcsQ0FBQ0MsTUFBWixDQUFtQixVQUFDQyxVQUFELEVBQWdCO0FBQzlDLGlCQUFPQSxVQUFQO0FBQ0QsU0FGWSxDQUFiLENBRmlHLENBS2pHOztBQUNBSCxRQUFBQSxJQUFJLENBQUNJLElBQUwsQ0FBVSxVQUFVQyxDQUFWLEVBQWFDLENBQWIsRUFBZ0I7QUFDeEIsaUJBQU9ELENBQUMsQ0FBQyxhQUFELENBQUQsR0FBbUJDLENBQUMsQ0FBQyxhQUFELENBQXBCLEdBQXNDLENBQUMsQ0FBdkMsR0FBMkMsQ0FBbEQ7QUFDRCxTQUZEO0FBR0FiLFFBQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUFZLGlCQUFaLEVBQStCTSxJQUEvQjtBQUNBUCxRQUFBQSxPQUFPLENBQUNDLEdBQVIsQ0FBWSxXQUFaLEVBQXlCLEtBQUtGLEtBQTlCO0FBQ0EsNEJBQ0k7QUFBSyxVQUFBLFNBQVMsRUFBQztBQUFmLHdCQUNFLHVEQURGLEVBR0lRLElBQUksQ0FBQ08sR0FBTCxDQUFTLFVBQUNKLFVBQUQsRUFBZ0I7QUFDdkIsOEJBQ0k7QUFBSyxZQUFBLFNBQVMsRUFBQyxtQkFBZjtBQUFtQyxZQUFBLEdBQUcsRUFBRUEsVUFBVSxDQUFDLEtBQUQ7QUFBbEQsMEJBQ0U7QUFBSyxZQUFBLFNBQVMsRUFBQztBQUFmLGFBRUlBLFVBQVUsQ0FBQyxjQUFELENBQVYsQ0FBMkJJLEdBQTNCLENBQ0ksVUFBQ0MsQ0FBRCxFQUFPO0FBQ0wsZ0JBQUlBLENBQUMsQ0FBQyxLQUFELENBQUQsSUFBWSxLQUFJLENBQUNoQixLQUFMLENBQVdLLEtBQVgsQ0FBaUJFLGdCQUFqQyxFQUFtRDtBQUNqRCxrQ0FDSTtBQUNJLGdCQUFBLFNBQVMsRUFBRUksVUFBVSxDQUFDLGdCQUFELENBQVYsQ0FBNkIsS0FBN0IsRUFBb0NNLE9BQXBDLENBQTRDLEdBQTVDLEVBQWlELEdBQWpELENBRGY7QUFFSSxnQkFBQSxLQUFLLEVBQUVELENBQUMsQ0FBQyxLQUFELENBRlo7QUFHSSxnQkFBQSxHQUFHLEVBQUVBLENBQUMsQ0FBQyxLQUFELENBSFY7QUFJSSxnQkFBQSxPQUFPLEVBQUUsbUJBQU07QUFDYixrQkFBQSxLQUFJLENBQUNoQixLQUFMLENBQVdrQiwwQkFBWCxFQUNJO0FBQ0E7QUFDQSxrQkFBQSxLQUFJLENBQUNsQixLQUFMLENBQVdLLEtBQVgsQ0FBaUJFLGdCQUFqQixDQUFrQ1MsQ0FBQyxDQUFDLEtBQUQsQ0FBbkMsRUFBNEMsS0FBNUMsRUFBbUQsQ0FBbkQsQ0FISixFQUlJLEtBQUksQ0FBQ2hCLEtBQUwsQ0FBV21CLFFBSmYsRUFLSSxLQUFJLENBQUNuQixLQUFMLENBQVdLLEtBQVgsQ0FBaUJlLEdBQWpCLENBQXFCLEtBQUksQ0FBQ3BCLEtBQUwsQ0FBV21CLFFBQWhDLENBTEo7QUFPRDtBQVpMLGlCQWFwQixLQUFJLENBQUNuQixLQUFMLENBQVdLLEtBQVgsQ0FBaUJFLGdCQUFqQixDQUFrQ1MsQ0FBQyxDQUFDLEtBQUQsQ0FBbkMsRUFBNEMsYUFBNUMsQ0Fib0IsQ0FESjtBQWlCRCxhQWxCRCxNQWtCTztBQUNMLGtDQUFPLDRFQUFpQ0EsQ0FBQyxDQUFDLEtBQUQsQ0FBbEMsQ0FBUDtBQUNEO0FBQ0YsV0F2QkwsQ0FGSixlQTRCRTtBQUFNLFlBQUEsU0FBUyxFQUFDLFdBQWhCO0FBQTRCLFlBQUEsR0FBRyxFQUFFTCxVQUFVLENBQUMsS0FBRCxDQUFWLEdBQW9CO0FBQXJELHFCQUNSQSxVQUFVLENBQUMsYUFBRCxDQURGLE1BNUJGLENBREYsQ0FESjtBQW9DRCxTQXJDRCxDQUhKLENBREo7QUE2Q0Q7O0FBQ0QsMEJBQU8sMERBQVA7QUFDRDs7OztFQWpFOEJVLGdCOztBQW9FakMsU0FBU0MsZUFBVCxPQUFrQztBQUFBLE1BQVJqQixLQUFRLFFBQVJBLEtBQVE7QUFDaEMsU0FBTztBQUFDQSxJQUFBQSxLQUFLLEVBQUxBO0FBQUQsR0FBUDtBQUNEOztBQUVELFNBQVNrQixrQkFBVCxDQUE0QkMsUUFBNUIsRUFBc0M7QUFDcEMsU0FBTywrQkFBbUI7QUFBQ04sSUFBQUEsMEJBQTBCLEVBQTFCQTtBQUFELEdBQW5CLEVBQWlETSxRQUFqRCxDQUFQO0FBQ0Q7O2VBRWMseUJBQVFGLGVBQVIsRUFBeUJDLGtCQUF6QixFQUE2Q3hCLGtCQUE3QyxDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7Q29tcG9uZW50fSBmcm9tICdyZWFjdCc7XG5pbXBvcnQge2Nvbm5lY3R9IGZyb20gJ3JlYWN0LXJlZHV4JztcbmltcG9ydCB7YmluZEFjdGlvbkNyZWF0b3JzfSBmcm9tICdyZWR1eCc7XG5pbXBvcnQge3Njb3JlUGFnZVRvQ29tcG9uZW50VGFyZ2V0fSBmcm9tICcuLi9hY3Rpb25zL2luZGV4JztcblxuY2xhc3MgQW5ub3RhdGlvbnNMaXN0aW5nIGV4dGVuZHMgQ29tcG9uZW50IHtcbiAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICBzdXBlcihwcm9wcyk7XG4gIH1cblxuICByZW5kZXIoKSB7XG4gICAgY29uc29sZS5sb2coXCJhbm5vbGlzdGluZyBwcm9wczogXCIsIHRoaXMucHJvcHMpO1xuICAgIGlmIChPYmplY3Qua2V5cyh0aGlzLnByb3BzLnNjb3JlKS5sZW5ndGggJiYgT2JqZWN0LmtleXModGhpcy5wcm9wcy5zY29yZS5jb21wb25lbnRUYXJnZXRzKS5sZW5ndGgpIHtcbiAgICAgIC8vIGZpbHRlciBvdXQgdW5kZWZpbmVkIGFubm90YXRpb25zXG4gICAgICBjb25zdCBhbm5vID0gYW5ub3RhdGlvbnMuZmlsdGVyKChhbm5vdGF0aW9uKSA9PiB7XG4gICAgICAgIHJldHVybiBhbm5vdGF0aW9uXG4gICAgICB9KTtcbiAgICAgIC8vIG9yZGVyIGJ5IHRpbWVzdGFtcFxuICAgICAgYW5uby5zb3J0KGZ1bmN0aW9uIChhLCBiKSB7XG4gICAgICAgIHJldHVybiBhW1wiZGN0OmNyZWF0ZWRcIl0gPCBiW1wiZGN0OmNyZWF0ZWRcIl0gPyAtMSA6IDFcbiAgICAgIH0pO1xuICAgICAgY29uc29sZS5sb2coXCItLUFubm90YXRpb25zOiBcIiwgYW5ubyk7XG4gICAgICBjb25zb2xlLmxvZyhcIi0tUHJvcHM6IFwiLCB0aGlzLnByb3BzKTtcbiAgICAgIHJldHVybiAoXG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhbm5vdGF0aW9uc1dyYXBwZXJcIj5cbiAgICAgICAgICAgIDxkaXY+RXZlbnRzOjwvZGl2PlxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBhbm5vLm1hcCgoYW5ub3RhdGlvbikgPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYW5ub3RhdGlvbkxpc3RpbmdcIiBrZXk9e2Fubm90YXRpb25bXCJAaWRcIl19PlxuICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYW5ub3RhdGlvblRhcmdldFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICBhbm5vdGF0aW9uW1wib2E6aGFzVGFyZ2V0XCJdLm1hcChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICh0KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0W1wiQGlkXCJdIGluIHRoaXMucHJvcHMuc2NvcmUuY29tcG9uZW50VGFyZ2V0cykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2Fubm90YXRpb25bXCJvYTptb3RpdmF0ZWRCeVwiXVtcIkBpZFwiXS5yZXBsYWNlKFwiOlwiLCBcIl9cIil9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aXRsZT17dFtcIkBpZFwiXX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGtleT17dFtcIkBpZFwiXX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5wcm9wcy5zY29yZVBhZ2VUb0NvbXBvbmVudFRhcmdldChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIFRPRE86IEltcGxlbWVudCBcInN0YXJ0c1dpdGhcIiB0byBwaWNrIGNvcnJlY3RcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGZpcnN0IE1FSSB0YXJnZXQgaW4gZnV0dXJlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnByb3BzLnNjb3JlLmNvbXBvbmVudFRhcmdldHNbdFtcIkBpZFwiXV1bXCJNRUlcIl1bMF0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnByb3BzLnNjb3JlVXJpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5wcm9wcy5zY29yZS5NRUlbdGhpcy5wcm9wcy5zY29yZVVyaV1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfX0+XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0e3RoaXMucHJvcHMuc2NvcmUuY29tcG9uZW50VGFyZ2V0c1t0W1wiQGlkXCJdXVtcImRlc2NyaXB0aW9uXCJdfVxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gPHNwYW4+TG9hZGluZyBjb21wb25lbnQgdGFyZ2V0OiB7dFtcIkBpZFwiXX08L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGltZXN0YW1wXCIga2V5PXthbm5vdGF0aW9uW1wiQGlkXCJdICsgXCJfdGltZVwifT5cblx0XHRcdFx0XHRcdFx0XHRcdFx0XHQoYXQge2Fubm90YXRpb25bXCJkY3Q6Y3JlYXRlZFwiXX0pXG5cdFx0XHRcdFx0XHRcdFx0XHRcdDwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgfVxuICAgICAgICAgIDwvZGl2PlxuICAgICAgKVxuICAgIH1cbiAgICByZXR1cm4gPGRpdj5Mb2FkaW5nLi4uPC9kaXY+XG4gIH1cbn1cblxuZnVuY3Rpb24gbWFwU3RhdGVUb1Byb3BzKHtzY29yZX0pIHtcbiAgcmV0dXJuIHtzY29yZX1cbn1cblxuZnVuY3Rpb24gbWFwRGlzcGF0Y2hUb1Byb3BzKGRpc3BhdGNoKSB7XG4gIHJldHVybiBiaW5kQWN0aW9uQ3JlYXRvcnMoe3Njb3JlUGFnZVRvQ29tcG9uZW50VGFyZ2V0fSwgZGlzcGF0Y2gpO1xufVxuXG5leHBvcnQgZGVmYXVsdCBjb25uZWN0KG1hcFN0YXRlVG9Qcm9wcywgbWFwRGlzcGF0Y2hUb1Byb3BzKShBbm5vdGF0aW9uc0xpc3RpbmcpO1xuIl19