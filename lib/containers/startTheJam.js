"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _index = require("../actions/index");

var _reactRedux = require("react-redux");

var _redux = require("redux");

var _reactRouter = require("react-router");

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

var StartTheJam = /*#__PURE__*/function (_Component) {
  _inherits(StartTheJam, _Component);

  var _super = _createSuper(StartTheJam);

  function StartTheJam(props) {
    var _this;

    _classCallCheck(this, StartTheJam);

    _this = _super.call(this, props);
    _this.state = {
      performerUri: "",
      scoreUri: "",
      slug: "",
      sessionsUri: "http://127.0.0.1:5000/sessions"
    }; // Following binding required to make 'this' work in the callback

    _this.startClimb = _this.startClimb.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(StartTheJam, [{
    key: "render",
    value: function render() {
      console.log(this.props.sessionControl.newSessionUri);

      if (this.props.sessionControl.newSessionUri) {
        window.location.assign('/Climb?session=' + this.props.sessionControl.newSessionUri);
        return /*#__PURE__*/_react["default"].createElement("div", {
          className: "loading"
        }, "Loading session");
      } else {
        return /*#__PURE__*/_react["default"].createElement("div", {
          className: "sessionControls"
        }, /*#__PURE__*/_react["default"].createElement("div", null, "Score URI: ", /*#__PURE__*/_react["default"].createElement("input", {
          type: "text",
          name: "scoreUri",
          value: this.state.scoreUri,
          onChange: this.handleScoreChange.bind(this)
        })), /*#__PURE__*/_react["default"].createElement("div", null, "Performer URI: ", /*#__PURE__*/_react["default"].createElement("input", {
          type: "text",
          name: "performerUri",
          value: this.state.performerUri,
          onChange: this.handlePerformerChange.bind(this)
        })), /*#__PURE__*/_react["default"].createElement("div", null, "Session slug: ", /*#__PURE__*/_react["default"].createElement("input", {
          type: "text",
          name: "slug",
          value: this.state.slug,
          onChange: this.handleSlugChange.bind(this)
        }), " (optional)"), /*#__PURE__*/_react["default"].createElement("button", {
          onClick: this.startClimb,
          disabled: !(this.state.scoreUri && this.state.performerUri)
        }, "Start the climb!"));
      }
    }
  }, {
    key: "handleScoreChange",
    value: function handleScoreChange(event) {
      this.setState({
        scoreUri: event.target.value
      });
    }
  }, {
    key: "handlePerformerChange",
    value: function handlePerformerChange(event) {
      this.setState({
        performerUri: event.target.value
      });
    }
  }, {
    key: "handleSlugChange",
    value: function handleSlugChange(event) {
      this.setState({
        slug: event.target.value
      });
    }
  }, {
    key: "startClimb",
    value: function startClimb() {
      this.props.createSession(this.state.sessionsUri, this.state.scoreUri, {
        performerUri: this.state.performerUri,
        slug: this.state.slug
      });
    }
  }]);

  return StartTheJam;
}(_react.Component);

function mapStateToProps(_ref) {
  var sessionControl = _ref.sessionControl;
  return {
    sessionControl: sessionControl
  };
}

function mapDispatchToProps(dispatch) {
  return (0, _redux.bindActionCreators)({
    createSession: _index.createSession
  }, dispatch);
}

(0, _reactRouter.withRouter)(StartTheJam);

var _default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(StartTheJam);

exports["default"] = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb250YWluZXJzL3N0YXJ0VGhlSmFtLmpzIl0sIm5hbWVzIjpbIlN0YXJ0VGhlSmFtIiwicHJvcHMiLCJzdGF0ZSIsInBlcmZvcm1lclVyaSIsInNjb3JlVXJpIiwic2x1ZyIsInNlc3Npb25zVXJpIiwic3RhcnRDbGltYiIsImJpbmQiLCJjb25zb2xlIiwibG9nIiwic2Vzc2lvbkNvbnRyb2wiLCJuZXdTZXNzaW9uVXJpIiwid2luZG93IiwibG9jYXRpb24iLCJhc3NpZ24iLCJoYW5kbGVTY29yZUNoYW5nZSIsImhhbmRsZVBlcmZvcm1lckNoYW5nZSIsImhhbmRsZVNsdWdDaGFuZ2UiLCJldmVudCIsInNldFN0YXRlIiwidGFyZ2V0IiwidmFsdWUiLCJjcmVhdGVTZXNzaW9uIiwiQ29tcG9uZW50IiwibWFwU3RhdGVUb1Byb3BzIiwibWFwRGlzcGF0Y2hUb1Byb3BzIiwiZGlzcGF0Y2giXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQUVNQSxXOzs7OztBQUNKLHVCQUFZQyxLQUFaLEVBQW1CO0FBQUE7O0FBQUE7O0FBQ2pCLDhCQUFNQSxLQUFOO0FBQ0EsVUFBS0MsS0FBTCxHQUFhO0FBQ1hDLE1BQUFBLFlBQVksRUFBRSxFQURIO0FBRVhDLE1BQUFBLFFBQVEsRUFBRSxFQUZDO0FBR1hDLE1BQUFBLElBQUksRUFBRSxFQUhLO0FBSVhDLE1BQUFBLFdBQVcsRUFBRTtBQUpGLEtBQWIsQ0FGaUIsQ0FRakI7O0FBQ0EsVUFBS0MsVUFBTCxHQUFrQixNQUFLQSxVQUFMLENBQWdCQyxJQUFoQiwrQkFBbEI7QUFUaUI7QUFVbEI7Ozs7V0FFRCxrQkFBUztBQUNQQyxNQUFBQSxPQUFPLENBQUNDLEdBQVIsQ0FBWSxLQUFLVCxLQUFMLENBQVdVLGNBQVgsQ0FBMEJDLGFBQXRDOztBQUNBLFVBQUksS0FBS1gsS0FBTCxDQUFXVSxjQUFYLENBQTBCQyxhQUE5QixFQUE2QztBQUMzQ0MsUUFBQUEsTUFBTSxDQUFDQyxRQUFQLENBQWdCQyxNQUFoQixDQUF1QixvQkFBb0IsS0FBS2QsS0FBTCxDQUFXVSxjQUFYLENBQTBCQyxhQUFyRTtBQUNBLDRCQUFRO0FBQUssVUFBQSxTQUFTLEVBQUM7QUFBZiw2QkFBUjtBQUNELE9BSEQsTUFHTztBQUNMLDRCQUNJO0FBQUssVUFBQSxTQUFTLEVBQUM7QUFBZix3QkFDRSx5RUFBZ0I7QUFBTyxVQUFBLElBQUksRUFBQyxNQUFaO0FBQW1CLFVBQUEsSUFBSSxFQUFDLFVBQXhCO0FBQW1DLFVBQUEsS0FBSyxFQUFFLEtBQUtWLEtBQUwsQ0FBV0UsUUFBckQ7QUFDTyxVQUFBLFFBQVEsRUFBRSxLQUFLWSxpQkFBTCxDQUF1QlIsSUFBdkIsQ0FBNEIsSUFBNUI7QUFEakIsVUFBaEIsQ0FERixlQUdFLDZFQUFvQjtBQUFPLFVBQUEsSUFBSSxFQUFDLE1BQVo7QUFBbUIsVUFBQSxJQUFJLEVBQUMsY0FBeEI7QUFBdUMsVUFBQSxLQUFLLEVBQUUsS0FBS04sS0FBTCxDQUFXQyxZQUF6RDtBQUNPLFVBQUEsUUFBUSxFQUFFLEtBQUtjLHFCQUFMLENBQTJCVCxJQUEzQixDQUFnQyxJQUFoQztBQURqQixVQUFwQixDQUhGLGVBS0UsNEVBQW1CO0FBQU8sVUFBQSxJQUFJLEVBQUMsTUFBWjtBQUFtQixVQUFBLElBQUksRUFBQyxNQUF4QjtBQUErQixVQUFBLEtBQUssRUFBRSxLQUFLTixLQUFMLENBQVdHLElBQWpEO0FBQ08sVUFBQSxRQUFRLEVBQUUsS0FBS2EsZ0JBQUwsQ0FBc0JWLElBQXRCLENBQTJCLElBQTNCO0FBRGpCLFVBQW5CLGdCQUxGLGVBUUU7QUFBUSxVQUFBLE9BQU8sRUFBRSxLQUFLRCxVQUF0QjtBQUFrQyxVQUFBLFFBQVEsRUFBRSxFQUFFLEtBQUtMLEtBQUwsQ0FBV0UsUUFBWCxJQUF1QixLQUFLRixLQUFMLENBQVdDLFlBQXBDO0FBQTVDLDhCQVJGLENBREo7QUFjRDtBQUNGOzs7V0FHRCwyQkFBa0JnQixLQUFsQixFQUF5QjtBQUN2QixXQUFLQyxRQUFMLENBQWM7QUFBQ2hCLFFBQUFBLFFBQVEsRUFBRWUsS0FBSyxDQUFDRSxNQUFOLENBQWFDO0FBQXhCLE9BQWQ7QUFDRDs7O1dBRUQsK0JBQXNCSCxLQUF0QixFQUE2QjtBQUMzQixXQUFLQyxRQUFMLENBQWM7QUFBQ2pCLFFBQUFBLFlBQVksRUFBRWdCLEtBQUssQ0FBQ0UsTUFBTixDQUFhQztBQUE1QixPQUFkO0FBQ0Q7OztXQUVELDBCQUFpQkgsS0FBakIsRUFBd0I7QUFDdEIsV0FBS0MsUUFBTCxDQUFjO0FBQUNmLFFBQUFBLElBQUksRUFBRWMsS0FBSyxDQUFDRSxNQUFOLENBQWFDO0FBQXBCLE9BQWQ7QUFDRDs7O1dBRUQsc0JBQWE7QUFDWCxXQUFLckIsS0FBTCxDQUFXc0IsYUFBWCxDQUNJLEtBQUtyQixLQUFMLENBQVdJLFdBRGYsRUFFSSxLQUFLSixLQUFMLENBQVdFLFFBRmYsRUFHSTtBQUNFRCxRQUFBQSxZQUFZLEVBQUUsS0FBS0QsS0FBTCxDQUFXQyxZQUQzQjtBQUVFRSxRQUFBQSxJQUFJLEVBQUUsS0FBS0gsS0FBTCxDQUFXRztBQUZuQixPQUhKO0FBUUQ7Ozs7RUExRHVCbUIsZ0I7O0FBOEQxQixTQUFTQyxlQUFULE9BQTJDO0FBQUEsTUFBakJkLGNBQWlCLFFBQWpCQSxjQUFpQjtBQUN6QyxTQUFPO0FBQUNBLElBQUFBLGNBQWMsRUFBZEE7QUFBRCxHQUFQO0FBQ0Q7O0FBRUQsU0FBU2Usa0JBQVQsQ0FBNEJDLFFBQTVCLEVBQXNDO0FBQ3BDLFNBQU8sK0JBQW1CO0FBQUNKLElBQUFBLGFBQWEsRUFBYkE7QUFBRCxHQUFuQixFQUFvQ0ksUUFBcEMsQ0FBUDtBQUNEOztBQUVELDZCQUFXM0IsV0FBWDs7ZUFFZSx5QkFBUXlCLGVBQVIsRUFBeUJDLGtCQUF6QixFQUE2QzFCLFdBQTdDLEMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHtDb21wb25lbnR9IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7Y3JlYXRlU2Vzc2lvbn0gZnJvbSAnLi4vYWN0aW9ucy9pbmRleCc7XG5pbXBvcnQge2Nvbm5lY3R9IGZyb20gJ3JlYWN0LXJlZHV4JztcbmltcG9ydCB7YmluZEFjdGlvbkNyZWF0b3JzfSBmcm9tICdyZWR1eCc7XG5pbXBvcnQge3dpdGhSb3V0ZXJ9IGZyb20gJ3JlYWN0LXJvdXRlcic7XG5cbmNsYXNzIFN0YXJ0VGhlSmFtIGV4dGVuZHMgQ29tcG9uZW50IHtcbiAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICBzdXBlcihwcm9wcyk7XG4gICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgIHBlcmZvcm1lclVyaTogXCJcIixcbiAgICAgIHNjb3JlVXJpOiBcIlwiLFxuICAgICAgc2x1ZzogXCJcIixcbiAgICAgIHNlc3Npb25zVXJpOiBcImh0dHA6Ly8xMjcuMC4wLjE6NTAwMC9zZXNzaW9uc1wiXG4gICAgfTtcbiAgICAvLyBGb2xsb3dpbmcgYmluZGluZyByZXF1aXJlZCB0byBtYWtlICd0aGlzJyB3b3JrIGluIHRoZSBjYWxsYmFja1xuICAgIHRoaXMuc3RhcnRDbGltYiA9IHRoaXMuc3RhcnRDbGltYi5iaW5kKHRoaXMpO1xuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIGNvbnNvbGUubG9nKHRoaXMucHJvcHMuc2Vzc2lvbkNvbnRyb2wubmV3U2Vzc2lvblVyaSk7XG4gICAgaWYgKHRoaXMucHJvcHMuc2Vzc2lvbkNvbnRyb2wubmV3U2Vzc2lvblVyaSkge1xuICAgICAgd2luZG93LmxvY2F0aW9uLmFzc2lnbignL0NsaW1iP3Nlc3Npb249JyArIHRoaXMucHJvcHMuc2Vzc2lvbkNvbnRyb2wubmV3U2Vzc2lvblVyaSk7XG4gICAgICByZXR1cm4gKDxkaXYgY2xhc3NOYW1lPVwibG9hZGluZ1wiPkxvYWRpbmcgc2Vzc2lvbjwvZGl2Pik7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiAoXG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzZXNzaW9uQ29udHJvbHNcIj5cbiAgICAgICAgICAgIDxkaXY+U2NvcmUgVVJJOiA8aW5wdXQgdHlwZT1cInRleHRcIiBuYW1lPVwic2NvcmVVcmlcIiB2YWx1ZT17dGhpcy5zdGF0ZS5zY29yZVVyaX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9e3RoaXMuaGFuZGxlU2NvcmVDaGFuZ2UuYmluZCh0aGlzKX0vPjwvZGl2PlxuICAgICAgICAgICAgPGRpdj5QZXJmb3JtZXIgVVJJOiA8aW5wdXQgdHlwZT1cInRleHRcIiBuYW1lPVwicGVyZm9ybWVyVXJpXCIgdmFsdWU9e3RoaXMuc3RhdGUucGVyZm9ybWVyVXJpfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9e3RoaXMuaGFuZGxlUGVyZm9ybWVyQ2hhbmdlLmJpbmQodGhpcyl9Lz48L2Rpdj5cbiAgICAgICAgICAgIDxkaXY+U2Vzc2lvbiBzbHVnOiA8aW5wdXQgdHlwZT1cInRleHRcIiBuYW1lPVwic2x1Z1wiIHZhbHVlPXt0aGlzLnN0YXRlLnNsdWd9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXt0aGlzLmhhbmRsZVNsdWdDaGFuZ2UuYmluZCh0aGlzKX0vPiAob3B0aW9uYWwpXG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxidXR0b24gb25DbGljaz17dGhpcy5zdGFydENsaW1ifSBkaXNhYmxlZD17ISh0aGlzLnN0YXRlLnNjb3JlVXJpICYmIHRoaXMuc3RhdGUucGVyZm9ybWVyVXJpKX0+U3RhcnQgdGhlXG4gICAgICAgICAgICAgIGNsaW1iIVxuICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICApXG4gICAgfVxuICB9XG5cblxuICBoYW5kbGVTY29yZUNoYW5nZShldmVudCkge1xuICAgIHRoaXMuc2V0U3RhdGUoe3Njb3JlVXJpOiBldmVudC50YXJnZXQudmFsdWV9KTtcbiAgfVxuXG4gIGhhbmRsZVBlcmZvcm1lckNoYW5nZShldmVudCkge1xuICAgIHRoaXMuc2V0U3RhdGUoe3BlcmZvcm1lclVyaTogZXZlbnQudGFyZ2V0LnZhbHVlfSk7XG4gIH1cblxuICBoYW5kbGVTbHVnQ2hhbmdlKGV2ZW50KSB7XG4gICAgdGhpcy5zZXRTdGF0ZSh7c2x1ZzogZXZlbnQudGFyZ2V0LnZhbHVlfSk7XG4gIH1cblxuICBzdGFydENsaW1iKCkge1xuICAgIHRoaXMucHJvcHMuY3JlYXRlU2Vzc2lvbihcbiAgICAgICAgdGhpcy5zdGF0ZS5zZXNzaW9uc1VyaSxcbiAgICAgICAgdGhpcy5zdGF0ZS5zY29yZVVyaSxcbiAgICAgICAge1xuICAgICAgICAgIHBlcmZvcm1lclVyaTogdGhpcy5zdGF0ZS5wZXJmb3JtZXJVcmksXG4gICAgICAgICAgc2x1ZzogdGhpcy5zdGF0ZS5zbHVnXG4gICAgICAgIH1cbiAgICApXG4gIH1cbn1cblxuXG5mdW5jdGlvbiBtYXBTdGF0ZVRvUHJvcHMoe3Nlc3Npb25Db250cm9sfSkge1xuICByZXR1cm4ge3Nlc3Npb25Db250cm9sfVxufVxuXG5mdW5jdGlvbiBtYXBEaXNwYXRjaFRvUHJvcHMoZGlzcGF0Y2gpIHtcbiAgcmV0dXJuIGJpbmRBY3Rpb25DcmVhdG9ycyh7Y3JlYXRlU2Vzc2lvbn0sIGRpc3BhdGNoKTtcbn1cblxud2l0aFJvdXRlcihTdGFydFRoZUphbSk7XG5cbmV4cG9ydCBkZWZhdWx0IGNvbm5lY3QobWFwU3RhdGVUb1Byb3BzLCBtYXBEaXNwYXRjaFRvUHJvcHMpKFN0YXJ0VGhlSmFtKTtcblxuIl19