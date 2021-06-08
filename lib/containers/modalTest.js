"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactRedux = require("react-redux");

var _redux = require("redux");

var _score = _interopRequireDefault(require("../containers/score"));

var _modalUI = _interopRequireDefault(require("../containers/modalUI"));

var _deliusModes = require("../../config/deliusModes");

var _modalUI2 = require("../actions/modalUI");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

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

var ModalTest = /*#__PURE__*/function (_Component) {
  _inherits(ModalTest, _Component);

  var _super = _createSuper(ModalTest);

  function ModalTest(props) {
    var _this;

    _classCallCheck(this, ModalTest);

    _this = _super.call(this, props);
    _this.state = {
      modes: _deliusModes.modes
    };
    return _this;
  }

  _createClass(ModalTest, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      console.log("I've found these notes: ", document.querySelectorAll('.note'));
    }
  }, {
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(nextProps) {
      // this is where we do app-specific logic for the modal UI
      if (this.props.modalUI.mode == "baseMode" && nextProps.modalUI.constituents.has("dynamics")) {
        // user has selected dynamics - clear selections, and switch modes
        this.props.clearConstituents();
        this.props.setMode("dynamicsMode");
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      return /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement("link", {
        rel: "stylesheet",
        href: "../../style/modalUI.css",
        type: "text/css"
      }), /*#__PURE__*/_react["default"].createElement(_modalUI["default"], {
        modes: this.state.modes,
        orientation: "wide"
      }), /*#__PURE__*/_react["default"].createElement(_score["default"], {
        uri: "http://meld.linkedmusic.org/mei/Late_Swallows-dolet-musescore-II.mei",
        onClick: function onClick(e) {
          return _this2.handleScoreClick(e);
        },
        ref: "score"
      }));
    }
  }, {
    key: "handleScoreClick",
    value: function handleScoreClick(e) {
      console.log("score clicked: ", e);
    }
  }]);

  return ModalTest;
}(_react.Component);

function mapStateToProps(_ref) {
  var modalUI = _ref.modalUI;
  return {
    modalUI: modalUI
  };
}

function mapDispatchToProps(dispatch) {
  return (0, _redux.bindActionCreators)({
    setMode: _modalUI2.setMode,
    clearConstituents: _modalUI2.clearConstituents
  }, dispatch);
}

var _default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(ModalTest);

exports["default"] = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb250YWluZXJzL21vZGFsVGVzdC5qcyJdLCJuYW1lcyI6WyJNb2RhbFRlc3QiLCJwcm9wcyIsInN0YXRlIiwibW9kZXMiLCJjb25zb2xlIiwibG9nIiwiZG9jdW1lbnQiLCJxdWVyeVNlbGVjdG9yQWxsIiwibmV4dFByb3BzIiwibW9kYWxVSSIsIm1vZGUiLCJjb25zdGl0dWVudHMiLCJoYXMiLCJjbGVhckNvbnN0aXR1ZW50cyIsInNldE1vZGUiLCJlIiwiaGFuZGxlU2NvcmVDbGljayIsIkNvbXBvbmVudCIsIm1hcFN0YXRlVG9Qcm9wcyIsIm1hcERpc3BhdGNoVG9Qcm9wcyIsImRpc3BhdGNoIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFFQTs7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQUVNQSxTOzs7OztBQUNKLHFCQUFZQyxLQUFaLEVBQW1CO0FBQUE7O0FBQUE7O0FBQ2pCLDhCQUFNQSxLQUFOO0FBQ0EsVUFBS0MsS0FBTCxHQUFhO0FBQUNDLE1BQUFBLEtBQUssRUFBTEE7QUFBRCxLQUFiO0FBRmlCO0FBR2xCOzs7O1dBRUQsNkJBQW9CO0FBQ2xCQyxNQUFBQSxPQUFPLENBQUNDLEdBQVIsQ0FBWSwwQkFBWixFQUF3Q0MsUUFBUSxDQUFDQyxnQkFBVCxDQUEwQixPQUExQixDQUF4QztBQUNEOzs7V0FFRCxtQ0FBMEJDLFNBQTFCLEVBQXFDO0FBQ25DO0FBQ0EsVUFBSSxLQUFLUCxLQUFMLENBQVdRLE9BQVgsQ0FBbUJDLElBQW5CLElBQTJCLFVBQTNCLElBQXlDRixTQUFTLENBQUNDLE9BQVYsQ0FBa0JFLFlBQWxCLENBQStCQyxHQUEvQixDQUFtQyxVQUFuQyxDQUE3QyxFQUE2RjtBQUMzRjtBQUNBLGFBQUtYLEtBQUwsQ0FBV1ksaUJBQVg7QUFDQSxhQUFLWixLQUFMLENBQVdhLE9BQVgsQ0FBbUIsY0FBbkI7QUFDRDtBQUNGOzs7V0FFRCxrQkFBUztBQUFBOztBQUNQLDBCQUNJLDBEQUNFO0FBQU0sUUFBQSxHQUFHLEVBQUMsWUFBVjtBQUF1QixRQUFBLElBQUksRUFBQyx5QkFBNUI7QUFBc0QsUUFBQSxJQUFJLEVBQUM7QUFBM0QsUUFERixlQUVFLGdDQUFDLG1CQUFEO0FBQU8sUUFBQSxLQUFLLEVBQUUsS0FBS1osS0FBTCxDQUFXQyxLQUF6QjtBQUFnQyxRQUFBLFdBQVcsRUFBQztBQUE1QyxRQUZGLGVBR0UsZ0NBQUMsaUJBQUQ7QUFBTyxRQUFBLEdBQUcsRUFBQyxzRUFBWDtBQUNPLFFBQUEsT0FBTyxFQUFFLGlCQUFDWSxDQUFEO0FBQUEsaUJBQU8sTUFBSSxDQUFDQyxnQkFBTCxDQUFzQkQsQ0FBdEIsQ0FBUDtBQUFBLFNBRGhCO0FBQ2lELFFBQUEsR0FBRyxFQUFDO0FBRHJELFFBSEYsQ0FESjtBQVFEOzs7V0FFRCwwQkFBaUJBLENBQWpCLEVBQW9CO0FBQ2xCWCxNQUFBQSxPQUFPLENBQUNDLEdBQVIsQ0FBWSxpQkFBWixFQUErQlUsQ0FBL0I7QUFDRDs7OztFQWhDcUJFLGdCOztBQW1DeEIsU0FBU0MsZUFBVCxPQUFvQztBQUFBLE1BQVZULE9BQVUsUUFBVkEsT0FBVTtBQUNsQyxTQUFPO0FBQUNBLElBQUFBLE9BQU8sRUFBUEE7QUFBRCxHQUFQO0FBQ0Q7O0FBRUQsU0FBU1Usa0JBQVQsQ0FBNEJDLFFBQTVCLEVBQXNDO0FBQ3BDLFNBQU8sK0JBQW1CO0FBQUNOLElBQUFBLE9BQU8sRUFBUEEsaUJBQUQ7QUFBVUQsSUFBQUEsaUJBQWlCLEVBQWpCQTtBQUFWLEdBQW5CLEVBQWlETyxRQUFqRCxDQUFQO0FBQ0Q7O2VBRWMseUJBQVFGLGVBQVIsRUFBeUJDLGtCQUF6QixFQUE2Q25CLFNBQTdDLEMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHtDb21wb25lbnR9IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7Y29ubmVjdH0gZnJvbSAncmVhY3QtcmVkdXgnO1xuaW1wb3J0IHtiaW5kQWN0aW9uQ3JlYXRvcnN9IGZyb20gJ3JlZHV4JztcbmltcG9ydCBTY29yZSBmcm9tICcuLi9jb250YWluZXJzL3Njb3JlJztcbmltcG9ydCBNb2RhbCBmcm9tICcuLi9jb250YWluZXJzL21vZGFsVUknO1xuXG5pbXBvcnQge21vZGVzfSBmcm9tICcuLi8uLi9jb25maWcvZGVsaXVzTW9kZXMnO1xuaW1wb3J0IHtjbGVhckNvbnN0aXR1ZW50cywgc2V0TW9kZX0gZnJvbSAnLi4vYWN0aW9ucy9tb2RhbFVJJ1xuXG5jbGFzcyBNb2RhbFRlc3QgZXh0ZW5kcyBDb21wb25lbnQge1xuICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgIHN1cGVyKHByb3BzKTtcbiAgICB0aGlzLnN0YXRlID0ge21vZGVzfTtcbiAgfVxuXG4gIGNvbXBvbmVudERpZE1vdW50KCkge1xuICAgIGNvbnNvbGUubG9nKFwiSSd2ZSBmb3VuZCB0aGVzZSBub3RlczogXCIsIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5ub3RlJykpO1xuICB9XG5cbiAgY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyhuZXh0UHJvcHMpIHtcbiAgICAvLyB0aGlzIGlzIHdoZXJlIHdlIGRvIGFwcC1zcGVjaWZpYyBsb2dpYyBmb3IgdGhlIG1vZGFsIFVJXG4gICAgaWYgKHRoaXMucHJvcHMubW9kYWxVSS5tb2RlID09IFwiYmFzZU1vZGVcIiAmJiBuZXh0UHJvcHMubW9kYWxVSS5jb25zdGl0dWVudHMuaGFzKFwiZHluYW1pY3NcIikpIHtcbiAgICAgIC8vIHVzZXIgaGFzIHNlbGVjdGVkIGR5bmFtaWNzIC0gY2xlYXIgc2VsZWN0aW9ucywgYW5kIHN3aXRjaCBtb2Rlc1xuICAgICAgdGhpcy5wcm9wcy5jbGVhckNvbnN0aXR1ZW50cygpO1xuICAgICAgdGhpcy5wcm9wcy5zZXRNb2RlKFwiZHluYW1pY3NNb2RlXCIpO1xuICAgIH1cbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICByZXR1cm4gKFxuICAgICAgICA8ZGl2PlxuICAgICAgICAgIDxsaW5rIHJlbD1cInN0eWxlc2hlZXRcIiBocmVmPVwiLi4vLi4vc3R5bGUvbW9kYWxVSS5jc3NcIiB0eXBlPVwidGV4dC9jc3NcIi8+XG4gICAgICAgICAgPE1vZGFsIG1vZGVzPXt0aGlzLnN0YXRlLm1vZGVzfSBvcmllbnRhdGlvbj1cIndpZGVcIi8+XG4gICAgICAgICAgPFNjb3JlIHVyaT1cImh0dHA6Ly9tZWxkLmxpbmtlZG11c2ljLm9yZy9tZWkvTGF0ZV9Td2FsbG93cy1kb2xldC1tdXNlc2NvcmUtSUkubWVpXCJcbiAgICAgICAgICAgICAgICAgb25DbGljaz17KGUpID0+IHRoaXMuaGFuZGxlU2NvcmVDbGljayhlKX0gcmVmPVwic2NvcmVcIi8+XG4gICAgICAgIDwvZGl2PlxuICAgIClcbiAgfVxuXG4gIGhhbmRsZVNjb3JlQ2xpY2soZSkge1xuICAgIGNvbnNvbGUubG9nKFwic2NvcmUgY2xpY2tlZDogXCIsIGUpO1xuICB9XG59XG5cbmZ1bmN0aW9uIG1hcFN0YXRlVG9Qcm9wcyh7bW9kYWxVSX0pIHtcbiAgcmV0dXJuIHttb2RhbFVJfVxufVxuXG5mdW5jdGlvbiBtYXBEaXNwYXRjaFRvUHJvcHMoZGlzcGF0Y2gpIHtcbiAgcmV0dXJuIGJpbmRBY3Rpb25DcmVhdG9ycyh7c2V0TW9kZSwgY2xlYXJDb25zdGl0dWVudHN9LCBkaXNwYXRjaCk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGNvbm5lY3QobWFwU3RhdGVUb1Byb3BzLCBtYXBEaXNwYXRjaFRvUHJvcHMpKE1vZGFsVGVzdCk7XG4iXX0=