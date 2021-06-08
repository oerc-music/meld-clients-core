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

var StartTheClimb = /*#__PURE__*/function (_Component) {
  _inherits(StartTheClimb, _Component);

  var _super = _createSuper(StartTheClimb);

  function StartTheClimb(props) {
    var _this;

    _classCallCheck(this, StartTheClimb);

    _this = _super.call(this, props);
    _this.state = {
      scoreUri: "http://127.0.0.1:5000/score/basecamp",
      sessionsUri: "http://127.0.0.1:5000/sessions"
    }; // Following binding required to make 'this' work in the callback

    _this.startClimb = _this.startClimb.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(StartTheClimb, [{
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
        }, /*#__PURE__*/_react["default"].createElement("button", {
          onClick: this.startClimb
        }, "Start the climb!"));
      }
    } //	handleChange(event) { 
    //		this.setState({performerUri: event.target.value});
    //	}

  }, {
    key: "startClimb",
    value: function startClimb() {
      this.props.createSession(this.state.sessionsUri, this.state.scoreUri);
    }
  }]);

  return StartTheClimb;
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

(0, _reactRouter.withRouter)(StartTheClimb);

var _default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(StartTheClimb);

exports["default"] = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb250YWluZXJzL3N0YXJ0VGhlQ2xpbWIuanMiXSwibmFtZXMiOlsiU3RhcnRUaGVDbGltYiIsInByb3BzIiwic3RhdGUiLCJzY29yZVVyaSIsInNlc3Npb25zVXJpIiwic3RhcnRDbGltYiIsImJpbmQiLCJjb25zb2xlIiwibG9nIiwic2Vzc2lvbkNvbnRyb2wiLCJuZXdTZXNzaW9uVXJpIiwid2luZG93IiwibG9jYXRpb24iLCJhc3NpZ24iLCJjcmVhdGVTZXNzaW9uIiwiQ29tcG9uZW50IiwibWFwU3RhdGVUb1Byb3BzIiwibWFwRGlzcGF0Y2hUb1Byb3BzIiwiZGlzcGF0Y2giXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQUVNQSxhOzs7OztBQUNKLHlCQUFZQyxLQUFaLEVBQW1CO0FBQUE7O0FBQUE7O0FBQ2pCLDhCQUFNQSxLQUFOO0FBQ0EsVUFBS0MsS0FBTCxHQUFhO0FBQ1hDLE1BQUFBLFFBQVEsRUFBRSxzQ0FEQztBQUVYQyxNQUFBQSxXQUFXLEVBQUU7QUFGRixLQUFiLENBRmlCLENBTWpCOztBQUNBLFVBQUtDLFVBQUwsR0FBa0IsTUFBS0EsVUFBTCxDQUFnQkMsSUFBaEIsK0JBQWxCO0FBUGlCO0FBUWxCOzs7O1dBRUQsa0JBQVM7QUFDUEMsTUFBQUEsT0FBTyxDQUFDQyxHQUFSLENBQVksS0FBS1AsS0FBTCxDQUFXUSxjQUFYLENBQTBCQyxhQUF0Qzs7QUFDQSxVQUFJLEtBQUtULEtBQUwsQ0FBV1EsY0FBWCxDQUEwQkMsYUFBOUIsRUFBNkM7QUFDM0NDLFFBQUFBLE1BQU0sQ0FBQ0MsUUFBUCxDQUFnQkMsTUFBaEIsQ0FBdUIsb0JBQW9CLEtBQUtaLEtBQUwsQ0FBV1EsY0FBWCxDQUEwQkMsYUFBckU7QUFDQSw0QkFBUTtBQUFLLFVBQUEsU0FBUyxFQUFDO0FBQWYsNkJBQVI7QUFDRCxPQUhELE1BR087QUFDTCw0QkFDSTtBQUFLLFVBQUEsU0FBUyxFQUFDO0FBQWYsd0JBRUU7QUFBUSxVQUFBLE9BQU8sRUFBRSxLQUFLTDtBQUF0Qiw4QkFGRixDQURKO0FBTUQ7QUFDRixLLENBRUg7QUFDQTtBQUNBOzs7O1dBRUUsc0JBQWE7QUFDWCxXQUFLSixLQUFMLENBQVdhLGFBQVgsQ0FBeUIsS0FBS1osS0FBTCxDQUFXRSxXQUFwQyxFQUFpRCxLQUFLRixLQUFMLENBQVdDLFFBQTVEO0FBQ0Q7Ozs7RUFoQ3lCWSxnQjs7QUFvQzVCLFNBQVNDLGVBQVQsT0FBMkM7QUFBQSxNQUFqQlAsY0FBaUIsUUFBakJBLGNBQWlCO0FBQ3pDLFNBQU87QUFBQ0EsSUFBQUEsY0FBYyxFQUFkQTtBQUFELEdBQVA7QUFDRDs7QUFFRCxTQUFTUSxrQkFBVCxDQUE0QkMsUUFBNUIsRUFBc0M7QUFDcEMsU0FBTywrQkFBbUI7QUFBQ0osSUFBQUEsYUFBYSxFQUFiQTtBQUFELEdBQW5CLEVBQW9DSSxRQUFwQyxDQUFQO0FBQ0Q7O0FBRUQsNkJBQVdsQixhQUFYOztlQUVlLHlCQUFRZ0IsZUFBUixFQUF5QkMsa0JBQXpCLEVBQTZDakIsYUFBN0MsQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwge0NvbXBvbmVudH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IHtjcmVhdGVTZXNzaW9ufSBmcm9tICcuLi9hY3Rpb25zL2luZGV4JztcbmltcG9ydCB7Y29ubmVjdH0gZnJvbSAncmVhY3QtcmVkdXgnO1xuaW1wb3J0IHtiaW5kQWN0aW9uQ3JlYXRvcnN9IGZyb20gJ3JlZHV4JztcbmltcG9ydCB7d2l0aFJvdXRlcn0gZnJvbSAncmVhY3Qtcm91dGVyJztcblxuY2xhc3MgU3RhcnRUaGVDbGltYiBleHRlbmRzIENvbXBvbmVudCB7XG4gIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgc3VwZXIocHJvcHMpO1xuICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICBzY29yZVVyaTogXCJodHRwOi8vMTI3LjAuMC4xOjUwMDAvc2NvcmUvYmFzZWNhbXBcIixcbiAgICAgIHNlc3Npb25zVXJpOiBcImh0dHA6Ly8xMjcuMC4wLjE6NTAwMC9zZXNzaW9uc1wiXG4gICAgfTtcbiAgICAvLyBGb2xsb3dpbmcgYmluZGluZyByZXF1aXJlZCB0byBtYWtlICd0aGlzJyB3b3JrIGluIHRoZSBjYWxsYmFja1xuICAgIHRoaXMuc3RhcnRDbGltYiA9IHRoaXMuc3RhcnRDbGltYi5iaW5kKHRoaXMpO1xuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIGNvbnNvbGUubG9nKHRoaXMucHJvcHMuc2Vzc2lvbkNvbnRyb2wubmV3U2Vzc2lvblVyaSk7XG4gICAgaWYgKHRoaXMucHJvcHMuc2Vzc2lvbkNvbnRyb2wubmV3U2Vzc2lvblVyaSkge1xuICAgICAgd2luZG93LmxvY2F0aW9uLmFzc2lnbignL0NsaW1iP3Nlc3Npb249JyArIHRoaXMucHJvcHMuc2Vzc2lvbkNvbnRyb2wubmV3U2Vzc2lvblVyaSk7XG4gICAgICByZXR1cm4gKDxkaXYgY2xhc3NOYW1lPVwibG9hZGluZ1wiPkxvYWRpbmcgc2Vzc2lvbjwvZGl2Pik7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiAoXG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzZXNzaW9uQ29udHJvbHNcIj5cbiAgICAgICAgICAgIHsvKlBlcmZvcm1lciBVUkk6IDxpbnB1dCB0eXBlPVwidGV4dFwiIG5hbWU9XCJwZXJmb3JtZXJVcmlcIiB2YWx1ZT17dGhpcy5zdGF0ZS5wZXJmb3JtZXJVcml9IG9uQ2hhbmdlPXt0aGlzLmhhbmRsZUNoYW5nZS5iaW5kKHRoaXMpfS8+IDxidXR0b24gb25DbGljaz17dGhpcy5zdGFydENsaW1ifSBkaXNhYmxlZD17IXRoaXMuc3RhdGUucGVyZm9ybWVyVXJpfT5TdGFydCB0aGUgY2xpbWIhPC9idXR0b24+Ki99XG4gICAgICAgICAgICA8YnV0dG9uIG9uQ2xpY2s9e3RoaXMuc3RhcnRDbGltYn0+U3RhcnQgdGhlIGNsaW1iITwvYnV0dG9uPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgKVxuICAgIH1cbiAgfVxuXG4vL1x0aGFuZGxlQ2hhbmdlKGV2ZW50KSB7IFxuLy9cdFx0dGhpcy5zZXRTdGF0ZSh7cGVyZm9ybWVyVXJpOiBldmVudC50YXJnZXQudmFsdWV9KTtcbi8vXHR9XG5cbiAgc3RhcnRDbGltYigpIHtcbiAgICB0aGlzLnByb3BzLmNyZWF0ZVNlc3Npb24odGhpcy5zdGF0ZS5zZXNzaW9uc1VyaSwgdGhpcy5zdGF0ZS5zY29yZVVyaSlcbiAgfVxufVxuXG5cbmZ1bmN0aW9uIG1hcFN0YXRlVG9Qcm9wcyh7c2Vzc2lvbkNvbnRyb2x9KSB7XG4gIHJldHVybiB7c2Vzc2lvbkNvbnRyb2x9XG59XG5cbmZ1bmN0aW9uIG1hcERpc3BhdGNoVG9Qcm9wcyhkaXNwYXRjaCkge1xuICByZXR1cm4gYmluZEFjdGlvbkNyZWF0b3JzKHtjcmVhdGVTZXNzaW9ufSwgZGlzcGF0Y2gpO1xufVxuXG53aXRoUm91dGVyKFN0YXJ0VGhlQ2xpbWIpO1xuXG5leHBvcnQgZGVmYXVsdCBjb25uZWN0KG1hcFN0YXRlVG9Qcm9wcywgbWFwRGlzcGF0Y2hUb1Byb3BzKShTdGFydFRoZUNsaW1iKTtcblxuIl19