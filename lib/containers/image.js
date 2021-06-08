"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

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

var MyImage = /*#__PURE__*/function (_Component) {
  _inherits(MyImage, _Component);

  var _super = _createSuper(MyImage);

  function MyImage(props) {
    var _this;

    _classCallCheck(this, MyImage);

    _this = _super.call(this, props);
    _this.state = {
      positions: {}
    };
    _this.handleClick = _this.handleClick.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(MyImage, [{
    key: "resize",
    value: function resize() {
      var rules = document.styleSheets[0].cssRules || document.stylesheets[0].rules;
      var i = 0;

      while (!rules[i].selectorText || rules[i].selectorText.indexOf("img") === -1) {
        i++;
      }

      if (i == rules.length) {
        document.styleSheets[0].insertRule('.wrapper img {width:' + this.props.width + "px, height: " + this.props.height + "}");
      } else {
        var declaration = rules[i].style;
        declaration.setProperty('max-height', this.props.height + "px");
        declaration.setProperty('max-width', this.props.width + "px");
      }
    }
  }, {
    key: "render",
    value: function render() {
      if (this.props.height) {
        this.resize();
      }

      return /*#__PURE__*/_react["default"].createElement("img", {
        src: this.props.uri,
        onClick: this.handleClick
      });
    }
  }, {
    key: "handleClick",
    value: function handleClick() {
      if (this.props.uri.indexOf("_thumb") > -1) {
        var fullFatImage = this.props.uri;
        fullFatImage = fullFatImage.replace("_thumb", "");
        console.log("Thumb:", this.props.uri, "Full fat: ", fullFatImage);
        window.open(fullFatImage);
      }
    }
  }]);

  return MyImage;
}(_react.Component);

exports["default"] = MyImage;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb250YWluZXJzL2ltYWdlLmpzIl0sIm5hbWVzIjpbIk15SW1hZ2UiLCJwcm9wcyIsInN0YXRlIiwicG9zaXRpb25zIiwiaGFuZGxlQ2xpY2siLCJiaW5kIiwicnVsZXMiLCJkb2N1bWVudCIsInN0eWxlU2hlZXRzIiwiY3NzUnVsZXMiLCJzdHlsZXNoZWV0cyIsImkiLCJzZWxlY3RvclRleHQiLCJpbmRleE9mIiwibGVuZ3RoIiwiaW5zZXJ0UnVsZSIsIndpZHRoIiwiaGVpZ2h0IiwiZGVjbGFyYXRpb24iLCJzdHlsZSIsInNldFByb3BlcnR5IiwicmVzaXplIiwidXJpIiwiZnVsbEZhdEltYWdlIiwicmVwbGFjZSIsImNvbnNvbGUiLCJsb2ciLCJ3aW5kb3ciLCJvcGVuIiwiQ29tcG9uZW50Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUFFcUJBLE87Ozs7O0FBQ25CLG1CQUFZQyxLQUFaLEVBQW1CO0FBQUE7O0FBQUE7O0FBQ2pCLDhCQUFNQSxLQUFOO0FBQ0EsVUFBS0MsS0FBTCxHQUFhO0FBQ1hDLE1BQUFBLFNBQVMsRUFBRTtBQURBLEtBQWI7QUFHQSxVQUFLQyxXQUFMLEdBQW1CLE1BQUtBLFdBQUwsQ0FBaUJDLElBQWpCLCtCQUFuQjtBQUxpQjtBQU1sQjs7OztXQUVELGtCQUFTO0FBQ1AsVUFBSUMsS0FBSyxHQUFHQyxRQUFRLENBQUNDLFdBQVQsQ0FBcUIsQ0FBckIsRUFBd0JDLFFBQXhCLElBQW9DRixRQUFRLENBQUNHLFdBQVQsQ0FBcUIsQ0FBckIsRUFBd0JKLEtBQXhFO0FBQ0EsVUFBSUssQ0FBQyxHQUFHLENBQVI7O0FBQ0EsYUFBTyxDQUFDTCxLQUFLLENBQUNLLENBQUQsQ0FBTCxDQUFTQyxZQUFWLElBQTBCTixLQUFLLENBQUNLLENBQUQsQ0FBTCxDQUFTQyxZQUFULENBQXNCQyxPQUF0QixDQUE4QixLQUE5QixNQUF5QyxDQUFDLENBQTNFLEVBQThFO0FBQzVFRixRQUFBQSxDQUFDO0FBQ0Y7O0FBQ0QsVUFBSUEsQ0FBQyxJQUFJTCxLQUFLLENBQUNRLE1BQWYsRUFBdUI7QUFDckJQLFFBQUFBLFFBQVEsQ0FBQ0MsV0FBVCxDQUFxQixDQUFyQixFQUF3Qk8sVUFBeEIsQ0FBbUMseUJBQXlCLEtBQUtkLEtBQUwsQ0FBV2UsS0FBcEMsR0FBNEMsY0FBNUMsR0FBNkQsS0FBS2YsS0FBTCxDQUFXZ0IsTUFBeEUsR0FBaUYsR0FBcEg7QUFDRCxPQUZELE1BRU87QUFDTCxZQUFJQyxXQUFXLEdBQUdaLEtBQUssQ0FBQ0ssQ0FBRCxDQUFMLENBQVNRLEtBQTNCO0FBQ0FELFFBQUFBLFdBQVcsQ0FBQ0UsV0FBWixDQUF3QixZQUF4QixFQUFzQyxLQUFLbkIsS0FBTCxDQUFXZ0IsTUFBWCxHQUFvQixJQUExRDtBQUNBQyxRQUFBQSxXQUFXLENBQUNFLFdBQVosQ0FBd0IsV0FBeEIsRUFBcUMsS0FBS25CLEtBQUwsQ0FBV2UsS0FBWCxHQUFtQixJQUF4RDtBQUNEO0FBQ0Y7OztXQUVELGtCQUFTO0FBQ1AsVUFBSSxLQUFLZixLQUFMLENBQVdnQixNQUFmLEVBQXVCO0FBQ3JCLGFBQUtJLE1BQUw7QUFDRDs7QUFDRCwwQkFDSTtBQUFLLFFBQUEsR0FBRyxFQUFFLEtBQUtwQixLQUFMLENBQVdxQixHQUFyQjtBQUEwQixRQUFBLE9BQU8sRUFBRSxLQUFLbEI7QUFBeEMsUUFESjtBQUdEOzs7V0FFRCx1QkFBYztBQUNaLFVBQUksS0FBS0gsS0FBTCxDQUFXcUIsR0FBWCxDQUFlVCxPQUFmLENBQXVCLFFBQXZCLElBQW1DLENBQUMsQ0FBeEMsRUFBMkM7QUFDekMsWUFBSVUsWUFBWSxHQUFHLEtBQUt0QixLQUFMLENBQVdxQixHQUE5QjtBQUNBQyxRQUFBQSxZQUFZLEdBQUdBLFlBQVksQ0FBQ0MsT0FBYixDQUFxQixRQUFyQixFQUErQixFQUEvQixDQUFmO0FBQ0FDLFFBQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUFZLFFBQVosRUFBc0IsS0FBS3pCLEtBQUwsQ0FBV3FCLEdBQWpDLEVBQXNDLFlBQXRDLEVBQW9EQyxZQUFwRDtBQUNBSSxRQUFBQSxNQUFNLENBQUNDLElBQVAsQ0FBWUwsWUFBWjtBQUNEO0FBQ0Y7Ozs7RUF4Q2tDTSxnQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwge0NvbXBvbmVudH0gZnJvbSAncmVhY3QnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBNeUltYWdlIGV4dGVuZHMgQ29tcG9uZW50IHtcbiAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICBzdXBlcihwcm9wcyk7XG4gICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgIHBvc2l0aW9uczoge31cbiAgICB9O1xuICAgIHRoaXMuaGFuZGxlQ2xpY2sgPSB0aGlzLmhhbmRsZUNsaWNrLmJpbmQodGhpcyk7XG4gIH1cblxuICByZXNpemUoKSB7XG4gICAgdmFyIHJ1bGVzID0gZG9jdW1lbnQuc3R5bGVTaGVldHNbMF0uY3NzUnVsZXMgfHwgZG9jdW1lbnQuc3R5bGVzaGVldHNbMF0ucnVsZXM7XG4gICAgdmFyIGkgPSAwO1xuICAgIHdoaWxlICghcnVsZXNbaV0uc2VsZWN0b3JUZXh0IHx8IHJ1bGVzW2ldLnNlbGVjdG9yVGV4dC5pbmRleE9mKFwiaW1nXCIpID09PSAtMSkge1xuICAgICAgaSsrO1xuICAgIH1cbiAgICBpZiAoaSA9PSBydWxlcy5sZW5ndGgpIHtcbiAgICAgIGRvY3VtZW50LnN0eWxlU2hlZXRzWzBdLmluc2VydFJ1bGUoJy53cmFwcGVyIGltZyB7d2lkdGg6JyArIHRoaXMucHJvcHMud2lkdGggKyBcInB4LCBoZWlnaHQ6IFwiICsgdGhpcy5wcm9wcy5oZWlnaHQgKyBcIn1cIik7XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciBkZWNsYXJhdGlvbiA9IHJ1bGVzW2ldLnN0eWxlO1xuICAgICAgZGVjbGFyYXRpb24uc2V0UHJvcGVydHkoJ21heC1oZWlnaHQnLCB0aGlzLnByb3BzLmhlaWdodCArIFwicHhcIik7XG4gICAgICBkZWNsYXJhdGlvbi5zZXRQcm9wZXJ0eSgnbWF4LXdpZHRoJywgdGhpcy5wcm9wcy53aWR0aCArIFwicHhcIik7XG4gICAgfVxuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIGlmICh0aGlzLnByb3BzLmhlaWdodCkge1xuICAgICAgdGhpcy5yZXNpemUoKTtcbiAgICB9XG4gICAgcmV0dXJuIChcbiAgICAgICAgPGltZyBzcmM9e3RoaXMucHJvcHMudXJpfSBvbkNsaWNrPXt0aGlzLmhhbmRsZUNsaWNrfS8+XG4gICAgKVxuICB9XG5cbiAgaGFuZGxlQ2xpY2soKSB7XG4gICAgaWYgKHRoaXMucHJvcHMudXJpLmluZGV4T2YoXCJfdGh1bWJcIikgPiAtMSkge1xuICAgICAgbGV0IGZ1bGxGYXRJbWFnZSA9IHRoaXMucHJvcHMudXJpO1xuICAgICAgZnVsbEZhdEltYWdlID0gZnVsbEZhdEltYWdlLnJlcGxhY2UoXCJfdGh1bWJcIiwgXCJcIik7XG4gICAgICBjb25zb2xlLmxvZyhcIlRodW1iOlwiLCB0aGlzLnByb3BzLnVyaSwgXCJGdWxsIGZhdDogXCIsIGZ1bGxGYXRJbWFnZSk7XG4gICAgICB3aW5kb3cub3BlbihmdWxsRmF0SW1hZ2UpO1xuICAgIH1cbiAgfVxufVxuXG4iXX0=