"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactRedux = require("react-redux");

var _redux = require("redux");

var _prefixes = require("../library/prefixes");

var _tei = _interopRequireDefault(require("../containers/tei"));

var _image = _interopRequireDefault(require("../containers/image"));

var _reactMediaPlayer = require("react-media-player");

var _reactMediaPlayerPlayPause = _interopRequireDefault(require("../containers/react-media-player-play-pause"));

var _index = require("../actions/index");

var _reactTabs = require("react-tabs");

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

var PlayPause = _reactMediaPlayer.controls.PlayPause,
    CurrentTime = _reactMediaPlayer.controls.CurrentTime,
    Progress = _reactMediaPlayer.controls.Progress,
    SeekBar = _reactMediaPlayer.controls.SeekBar,
    Duration = _reactMediaPlayer.controls.Duration,
    MuteUnmute = _reactMediaPlayer.controls.MuteUnmute,
    Volume = _reactMediaPlayer.controls.Volume,
    Fullscreen = _reactMediaPlayer.controls.Fullscreen;

function getParagraph(node) {
  node.closest('tei-p');
}

function findTextInPara(node, characters) {
  var parentPara = node.closest('tei-p');
  var prec = '';
  var foll = '';
  var precCut, match;
  var context = [];
  if (!parentPara) return;
  var iterator = document.createNodeIterator(parentPara);
  var currentNode;

  while (currentNode = iterator.nextNode()) {
    if (currentNode == node) {
      var pos = prec.lastIndexOf(" ", prec.length - characters);
      precCut = prec.substring(pos);
    } else if (currentNode.nodeType !== Node.TEXT_NODE) {
      continue;
    } else if (precCut && !match) {
      match = node.textContent;
    } else if (precCut) {
      foll += currentNode.textContent;

      if (foll.length > characters) {
        foll = foll.substring(0, characters);
        break;
      }
    } else {
      prec += currentNode.textContent;
    }
  }

  return [precCut, match, foll];
}

function getContext(node) {
  var prec = "";
  var characters = 50;
  var textBits = findTextInPara(node, characters);
  if (!textBits) return false;
  return /*#__PURE__*/_react["default"].createElement("div", {
    className: "motifList",
    onClick: function onClick(x) {
      return node.scrollIntoView();
    }
  }, "...", /*#__PURE__*/_react["default"].createElement("span", {
    className: "preContent"
  }, textBits[0]), /*#__PURE__*/_react["default"].createElement("span", {
    className: "content"
  }, textBits[1]), /*#__PURE__*/_react["default"].createElement("span", {
    className: "postContent"
  }, textBits[2]), "...");
}

var EssayLinks = /*#__PURE__*/function (_Component) {
  _inherits(EssayLinks, _Component);

  var _super = _createSuper(EssayLinks);

  function EssayLinks(props) {
    _classCallCheck(this, EssayLinks);

    return _super.call(this, props);
  }

  _createClass(EssayLinks, [{
    key: "componentDidUpdate",
    value: function componentDidUpdate() {}
  }, {
    key: "allRefsIndex",
    value: function allRefsIndex() {
      var refObj = document.getElementsByTagName('tei-link');

      var refs = _toConsumableArray(refObj);

      var blocks = [];

      for (var i = 0; i < this.props.iterations.length; i++) {
        var ID = this.props.iterations[i]['@id'];
        var relevant = refs.filter(function (x) {
          return x.getAttributeNS(null, 'target') == ID;
        });
        var linkDivs = relevant.map(getContext);

        if (linkDivs.length) {
          blocks.push( /*#__PURE__*/_react["default"].createElement("div", {
            className: "motifBlock"
          }, /*#__PURE__*/_react["default"].createElement("div", {
            className: "motifName"
          }, this.props.iterations[i][_prefixes.prefix.rdfs + "label"]), linkDivs));
        }
      }

      return blocks;
    }
  }, {
    key: "linkForIteration",
    value: function linkForIteration(uri) {
      var iteration = this.props.iterations.find(function (x) {
        return x['@id'] == uri;
      });
      var iName = iteration['http://www.w3.org/2000/01/rdf-schema#label'];
      var audioURI = iteration.embodimentLists.MP3 ? iteration.embodimentLists.MP3[0] : false;
      var audio = iteration.embodimentLists.MP3 ? /*#__PURE__*/_react["default"].createElement(_reactMediaPlayer.Media, {
        key: iteration.embodimentLists.MP3[0]
      }, /*#__PURE__*/_react["default"].createElement("div", {
        className: "media"
      }, /*#__PURE__*/_react["default"].createElement("div", {
        className: "media-player"
      }, /*#__PURE__*/_react["default"].createElement(_reactMediaPlayer.Player, {
        src: iteration.embodimentLists.MP3[0]
      })), /*#__PURE__*/_react["default"].createElement("div", {
        className: "media-controls"
      }, /*#__PURE__*/_react["default"].createElement(_reactMediaPlayerPlayPause["default"], null)))) : /*#__PURE__*/_react["default"].createElement("div", null);
      return /*#__PURE__*/_react["default"].createElement("div", {
        className: "linkBlock",
        key: "itLink" + uri
      }, /*#__PURE__*/_react["default"].createElement("div", {
        className: "itname"
      }, iName, audio), /*#__PURE__*/_react["default"].createElement("div", {
        className: "inspectLink",
        onClick: this.props.inspectFun.bind(null, uri)
      }, "Inspect"));
    }
  }, {
    key: "visibleLinks",
    value: function visibleLinks() {
      var visibleIts = this.props.visible.reduce(function (acc, val) {
        if (acc[val.getAttributeNS(null, 'target')]) {
          acc[val.getAttributeNS(null, 'target')].push(val);
        } else {
          acc[val.getAttributeNS(null, 'target')] = [val];
        }

        ;
        return acc;
      }, {});
      var links = Object.keys(visibleIts);
      var iterations = this.props.iterations.map(function (x) {
        return x['@id'];
      });
      var linkDivs = [];

      for (var i = 0; i < links.length; i++) {
        if (iterations.indexOf(links[i]) > -1) {
          linkDivs.push(this.linkForIteration(links[i]));
        }
      }

      return linkDivs;
    }
  }, {
    key: "render",
    value: function render() {
      if (document.getElementsByTagName('tei-link').item(0)) {
        var linkDivs = this.allRefsIndex();
      } else {
        setTimeout(this.props.advanceTime, 0.2);
      }

      var visibles = this.props.visible ? this.visibleLinks() : [];
      if (visibles.length == 1) visibles = visibles[0];
      return /*#__PURE__*/_react["default"].createElement(_reactTabs.Tabs, {
        defaultIndex: 0,
        className: "linksTab"
      }, /*#__PURE__*/_react["default"].createElement(_reactTabs.TabList, null, /*#__PURE__*/_react["default"].createElement(_reactTabs.Tab, null, "Links"), /*#__PURE__*/_react["default"].createElement(_reactTabs.Tab, null, "Motifs")), /*#__PURE__*/_react["default"].createElement(_reactTabs.TabPanel, null, /*#__PURE__*/_react["default"].createElement("div", {
        className: "links"
      }, visibles)), /*#__PURE__*/_react["default"].createElement(_reactTabs.TabPanel, null, " ", /*#__PURE__*/_react["default"].createElement("div", {
        className: "motifListBox"
      }, linkDivs)));
    }
  }]);

  return EssayLinks;
}(_react.Component);

exports["default"] = EssayLinks;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb250YWluZXJzL2Vzc2F5TGlua3MuanMiXSwibmFtZXMiOlsiUGxheVBhdXNlIiwiY29udHJvbHMiLCJDdXJyZW50VGltZSIsIlByb2dyZXNzIiwiU2Vla0JhciIsIkR1cmF0aW9uIiwiTXV0ZVVubXV0ZSIsIlZvbHVtZSIsIkZ1bGxzY3JlZW4iLCJnZXRQYXJhZ3JhcGgiLCJub2RlIiwiY2xvc2VzdCIsImZpbmRUZXh0SW5QYXJhIiwiY2hhcmFjdGVycyIsInBhcmVudFBhcmEiLCJwcmVjIiwiZm9sbCIsInByZWNDdXQiLCJtYXRjaCIsImNvbnRleHQiLCJpdGVyYXRvciIsImRvY3VtZW50IiwiY3JlYXRlTm9kZUl0ZXJhdG9yIiwiY3VycmVudE5vZGUiLCJuZXh0Tm9kZSIsInBvcyIsImxhc3RJbmRleE9mIiwibGVuZ3RoIiwic3Vic3RyaW5nIiwibm9kZVR5cGUiLCJOb2RlIiwiVEVYVF9OT0RFIiwidGV4dENvbnRlbnQiLCJnZXRDb250ZXh0IiwidGV4dEJpdHMiLCJ4Iiwic2Nyb2xsSW50b1ZpZXciLCJFc3NheUxpbmtzIiwicHJvcHMiLCJyZWZPYmoiLCJnZXRFbGVtZW50c0J5VGFnTmFtZSIsInJlZnMiLCJibG9ja3MiLCJpIiwiaXRlcmF0aW9ucyIsIklEIiwicmVsZXZhbnQiLCJmaWx0ZXIiLCJnZXRBdHRyaWJ1dGVOUyIsImxpbmtEaXZzIiwibWFwIiwicHVzaCIsInByZWZpeCIsInJkZnMiLCJ1cmkiLCJpdGVyYXRpb24iLCJmaW5kIiwiaU5hbWUiLCJhdWRpb1VSSSIsImVtYm9kaW1lbnRMaXN0cyIsIk1QMyIsImF1ZGlvIiwiaW5zcGVjdEZ1biIsImJpbmQiLCJ2aXNpYmxlSXRzIiwidmlzaWJsZSIsInJlZHVjZSIsImFjYyIsInZhbCIsImxpbmtzIiwiT2JqZWN0Iiwia2V5cyIsImluZGV4T2YiLCJsaW5rRm9ySXRlcmF0aW9uIiwiaXRlbSIsImFsbFJlZnNJbmRleCIsInNldFRpbWVvdXQiLCJhZHZhbmNlVGltZSIs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UyxFQUFDO0FBQWYsU0FBd0JBLFFBQXhCLENBREQsQ0FMRCxlQVNDLGdDQUFDLG1CQUFELDBCQUFXO0FBQUssUUFBQSxTQUFTLEVBQUM7QUFBZixTQUErQjdCLFFBQS9CLENBQVgsQ0FURCxDQURDO0FBY0Q7Ozs7RUE5RXFDK0IsZ0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHsgQ29tcG9uZW50IH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgY29ubmVjdCB9IGZyb20gJ3JlYWN0LXJlZHV4JyA7XG5pbXBvcnQgeyBiaW5kQWN0aW9uQ3JlYXRvcnMgfSBmcm9tICdyZWR1eCc7XG5pbXBvcnQge3ByZWZpeH0gZnJvbSAnLi4vbGlicmFyeS9wcmVmaXhlcyc7XG5cbmltcG9ydCBURUkgZnJvbSAnLi4vY29udGFpbmVycy90ZWknO1xuaW1wb3J0IE15SW1hZ2UgZnJvbSAnLi4vY29udGFpbmVycy9pbWFnZSc7XG5pbXBvcnQgeyBNZWRpYSwgUGxheWVyLCBjb250cm9scywgdXRpbHMgfSBmcm9tICdyZWFjdC1tZWRpYS1wbGF5ZXInO1xuaW1wb3J0IEN1c3RvbVBsYXlQYXVzZSBmcm9tICcuLi9jb250YWluZXJzL3JlYWN0LW1lZGlhLXBsYXllci1wbGF5LXBhdXNlJztcbmltcG9ydCB7IGZldGNoR3JhcGggfSBmcm9tICcuLi9hY3Rpb25zL2luZGV4JztcbmltcG9ydCB7IFRhYiwgVGFicywgVGFiTGlzdCwgVGFiUGFuZWwgfSBmcm9tICdyZWFjdC10YWJzJztcbmNvbnN0IHtcbiAgUGxheVBhdXNlLFxuICBDdXJyZW50VGltZSxcbiAgUHJvZ3Jlc3MsXG4gIFNlZWtCYXIsXG4gIER1cmF0aW9uLFxuICBNdXRlVW5tdXRlLFxuICBWb2x1bWUsXG4gIEZ1bGxzY3JlZW4sXG59ID0gY29udHJvbHNcblxuZnVuY3Rpb24gZ2V0UGFyYWdyYXBoKG5vZGUpe1xuXHRub2RlLmNsb3Nlc3QoJ3RlaS1wJyk7XG59XG5cbmZ1bmN0aW9uIGZpbmRUZXh0SW5QYXJhKG5vZGUsIGNoYXJhY3RlcnMpe1xuXHR2YXIgcGFyZW50UGFyYSA9IG5vZGUuY2xvc2VzdCgndGVpLXAnKTtcblx0dmFyIHByZWMgPSAnJztcblx0dmFyIGZvbGwgPSAnJztcblx0dmFyIHByZWNDdXQsIG1hdGNoO1xuXHR2YXIgY29udGV4dCA9IFtdO1xuXHRpZighcGFyZW50UGFyYSkgcmV0dXJuO1xuXHR2YXIgaXRlcmF0b3IgPSBkb2N1bWVudC5jcmVhdGVOb2RlSXRlcmF0b3IocGFyZW50UGFyYSk7XG5cdHZhciBjdXJyZW50Tm9kZTtcblx0d2hpbGUoKGN1cnJlbnROb2RlPWl0ZXJhdG9yLm5leHROb2RlKCkpKXtcblx0XHRpZihjdXJyZW50Tm9kZT09bm9kZSl7XG5cdFx0XHR2YXIgcG9zID0gcHJlYy5sYXN0SW5kZXhPZihcIiBcIiwgcHJlYy5sZW5ndGggLSBjaGFyYWN0ZXJzKTtcblx0XHRcdHByZWNDdXQgPSBwcmVjLnN1YnN0cmluZyhwb3MpO1xuXHRcdH0gZWxzZSBpZihjdXJyZW50Tm9kZS5ub2RlVHlwZSE9PSBOb2RlLlRFWFRfTk9ERSkge1xuXHRcdFx0Y29udGludWU7XG5cdFx0fSBlbHNlIGlmKHByZWNDdXQgJiYgIW1hdGNoKXtcblx0XHRcdG1hdGNoID0gbm9kZS50ZXh0Q29udGVudDtcblx0XHR9IGVsc2UgaWYocHJlY0N1dCl7XG5cdFx0XHRmb2xsICs9IGN1cnJlbnROb2RlLnRleHRDb250ZW50O1xuXHRcdFx0aWYoZm9sbC5sZW5ndGggPiBjaGFyYWN0ZXJzKXtcblx0XHRcdFx0Zm9sbCA9IGZvbGwuc3Vic3RyaW5nKDAsIGNoYXJhY3RlcnMpO1xuXHRcdFx0XHRicmVhaztcblx0XHRcdH1cblx0XHR9IGVsc2Uge1xuXHRcdFx0cHJlYyArPSBjdXJyZW50Tm9kZS50ZXh0Q29udGVudDtcblx0XHR9XG5cdH1cblx0cmV0dXJuIFtwcmVjQ3V0LCBtYXRjaCwgZm9sbF07XG59XG5cbmZ1bmN0aW9uIGdldENvbnRleHQobm9kZSl7XG5cdHZhciBwcmVjID0gXCJcIjtcblx0dmFyIGNoYXJhY3RlcnM9NTA7XG5cdHZhciB0ZXh0Qml0cyA9IGZpbmRUZXh0SW5QYXJhKG5vZGUsIGNoYXJhY3RlcnMpO1xuXHRpZighdGV4dEJpdHMpIHJldHVybiBmYWxzZTtcblx0cmV0dXJuICg8ZGl2IGNsYXNzTmFtZT1cIm1vdGlmTGlzdFwiIG9uQ2xpY2s9e3g9Pm5vZGUuc2Nyb2xsSW50b1ZpZXcoKX0+Li4uXG5cdFx0XHRcdFx0PHNwYW4gY2xhc3NOYW1lPVwicHJlQ29udGVudFwiPnt0ZXh0Qml0c1swXX08L3NwYW4+XG5cdFx0XHRcdFx0PHNwYW4gY2xhc3NOYW1lPVwiY29udGVudFwiPnt0ZXh0Qml0c1sxXX08L3NwYW4+XG5cdFx0XHRcdFx0PHNwYW4gY2xhc3NOYW1lPVwicG9zdENvbnRlbnRcIj57dGV4dEJpdHNbMl19PC9zcGFuPi4uLjwvZGl2Pik7XG59XG5leHBvcnQgZGVmYXVsdCBjbGFzcyBFc3NheUxpbmtzIGV4dGVuZHMgQ29tcG9uZW50IHtcbiAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICBzdXBlcihwcm9wcyk7XG5cdFx0XG4gIH1cblx0Y29tcG9uZW50RGlkVXBkYXRlKCl7XG5cdFx0XG5cdH1cblx0YWxsUmVmc0luZGV4KCl7XG5cdFx0dmFyIHJlZk9iaj1kb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSgndGVpLWxpbmsnKTtcblx0XHR2YXIgcmVmcyA9IFsuLi5yZWZPYmpdO1xuXHRcdHZhciBibG9ja3MgPSBbXTtcblx0XHRmb3IodmFyIGk9MDsgaTx0aGlzLnByb3BzLml0ZXJhdGlvbnMubGVuZ3RoOyBpKyspe1xuXHRcdFx0dmFyIElEID0gdGhpcy5wcm9wcy5pdGVyYXRpb25zW2ldWydAaWQnXTtcblx0XHRcdHZhciByZWxldmFudCA9IHJlZnMuZmlsdGVyKHg9PnguZ2V0QXR0cmlidXRlTlMobnVsbCwgJ3RhcmdldCcpPT1JRCk7XG5cdFx0XHR2YXIgbGlua0RpdnMgPSByZWxldmFudC5tYXAoZ2V0Q29udGV4dCk7XG5cdFx0XHRpZihsaW5rRGl2cy5sZW5ndGgpe1xuXHRcdFx0XHRibG9ja3MucHVzaCg8ZGl2IGNsYXNzTmFtZT1cIm1vdGlmQmxvY2tcIj48ZGl2IGNsYXNzTmFtZT1cIm1vdGlmTmFtZVwiPnt0aGlzLnByb3BzLml0ZXJhdGlvbnNbaV1bcHJlZml4LnJkZnMrXCJsYWJlbFwiXX08L2Rpdj57bGlua0RpdnN9PC9kaXY+KTtcblx0XHRcdH1cblx0XHR9XG5cdFx0cmV0dXJuIGJsb2Nrcztcblx0fVxuXHRsaW5rRm9ySXRlcmF0aW9uKHVyaSl7XG5cdFx0dmFyIGl0ZXJhdGlvbiA9IHRoaXMucHJvcHMuaXRlcmF0aW9ucy5maW5kKHg9PnhbJ0BpZCddPT11cmkpO1xuXHRcdHZhciBpTmFtZSA9IGl0ZXJhdGlvblsnaHR0cDovL3d3dy53My5vcmcvMjAwMC8wMS9yZGYtc2NoZW1hI2xhYmVsJ107XG5cdFx0dmFyIGF1ZGlvVVJJID0gaXRlcmF0aW9uLmVtYm9kaW1lbnRMaXN0cy5NUDMgPyBpdGVyYXRpb24uZW1ib2RpbWVudExpc3RzLk1QM1swXSA6IGZhbHNlO1xuXHRcdHZhciBhdWRpbyA9IGl0ZXJhdGlvbi5lbWJvZGltZW50TGlzdHMuTVAzID8gPE1lZGlhIGtleT17aXRlcmF0aW9uLmVtYm9kaW1lbnRMaXN0cy5NUDNbMF19PlxuXHRcdFx0XHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm1lZGlhXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJtZWRpYS1wbGF5ZXJcIj5cblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdCAgICAgIDxQbGF5ZXIgc3JjPXtpdGVyYXRpb24uZW1ib2RpbWVudExpc3RzLk1QM1swXX0vPlxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0ICAgIDwvZGl2PlxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0ICAgIDxkaXYgY2xhc3NOYW1lPVwibWVkaWEtY29udHJvbHNcIj48Q3VzdG9tUGxheVBhdXNlLz48L2Rpdj5cblx0XHRcdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG5cdFx0PC9NZWRpYT46IDxkaXYgLz47XG5cdFx0cmV0dXJuICg8ZGl2IGNsYXNzTmFtZT1cImxpbmtCbG9ja1wiIGtleT17XCJpdExpbmtcIit1cml9PjxkaXYgY2xhc3NOYW1lPVwiaXRuYW1lXCI+e2lOYW1lfXthdWRpb308L2Rpdj5cblx0XHRcdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwiaW5zcGVjdExpbmtcIiBvbkNsaWNrPXt0aGlzLnByb3BzLmluc3BlY3RGdW4uYmluZChudWxsLCB1cmkpfT5JbnNwZWN0PC9kaXY+PC9kaXY+KTtcblx0fVxuXHR2aXNpYmxlTGlua3MoKXtcblx0XHR2YXIgdmlzaWJsZUl0cyA9IHRoaXMucHJvcHMudmlzaWJsZS5yZWR1Y2UoKGFjYyx2YWwpPT57XG5cdFx0XHRpZihhY2NbdmFsLmdldEF0dHJpYnV0ZU5TKG51bGwsICd0YXJnZXQnKV0pe1xuXHRcdFx0XHRhY2NbdmFsLmdldEF0dHJpYnV0ZU5TKG51bGwsICd0YXJnZXQnKV0ucHVzaCh2YWwpO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0YWNjW3ZhbC5nZXRBdHRyaWJ1dGVOUyhudWxsLCAndGFyZ2V0JyldID0gW3ZhbF07XG5cdFx0XHR9O1xuXHRcdFx0cmV0dXJuIGFjYztcblx0XHR9LCB7fSk7XG5cdFx0dmFyIGxpbmtzID0gT2JqZWN0LmtleXModmlzaWJsZUl0cyk7XG5cdFx0dmFyIGl0ZXJhdGlvbnMgPSB0aGlzLnByb3BzLml0ZXJhdGlvbnMubWFwKHg9PnhbJ0BpZCddKTtcblx0XHR2YXIgbGlua0RpdnMgPSBbXTtcblx0XHRmb3IodmFyIGk9MDsgaTxsaW5rcy5sZW5ndGg7IGkrKyl7XG5cdFx0XHRpZihpdGVyYXRpb25zLmluZGV4T2YobGlua3NbaV0pPi0xKXtcblx0XHRcdFx0bGlua0RpdnMucHVzaCh0aGlzLmxpbmtGb3JJdGVyYXRpb24obGlua3NbaV0pKTtcblx0XHRcdH1cblx0XHR9XG5cdFx0cmV0dXJuIGxpbmtEaXZzO1xuXHR9XG4gIHJlbmRlcigpe1xuXHRcdGlmKGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCd0ZWktbGluaycpLml0ZW0oMCkpe1xuXHRcdFx0dmFyIGxpbmtEaXZzID0gdGhpcy5hbGxSZWZzSW5kZXgoKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0c2V0VGltZW91dCh0aGlzLnByb3BzLmFkdmFuY2VUaW1lLCAwLjIpO1xuXHRcdH1cblx0XHR2YXIgdmlzaWJsZXMgPSB0aGlzLnByb3BzLnZpc2libGUgPyB0aGlzLnZpc2libGVMaW5rcygpIDogW107XG5cdFx0aWYodmlzaWJsZXMubGVuZ3RoPT0xKSB2aXNpYmxlcyA9IHZpc2libGVzWzBdO1xuICAgIHJldHVybiAoXG5cdFx0XHQ8VGFicyBkZWZhdWx0SW5kZXg9ezB9IGNsYXNzTmFtZT1cImxpbmtzVGFiXCI+XG5cdFx0XHRcdDxUYWJMaXN0PlxuXHRcdFx0XHRcdDxUYWI+TGlua3M8L1RhYj5cblx0XHRcdFx0XHQ8VGFiPk1vdGlmczwvVGFiPlxuXHRcdFx0XHQ8L1RhYkxpc3Q+XG5cdFx0XHRcdDxUYWJQYW5lbD5cblx0XHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImxpbmtzXCI+e3Zpc2libGVzfVxuXHRcdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHQ8L1RhYlBhbmVsPlxuXHRcdFx0XHQ8VGFiUGFuZWw+IDxkaXYgY2xhc3NOYW1lPVwibW90aWZMaXN0Qm94XCI+e2xpbmtEaXZzfTwvZGl2PlxuXHRcdFx0XHQ8L1RhYlBhbmVsPlxuXHRcdFx0PC9UYWJzPlxuICAgICk7XG4gIH1cbn1cbiJdfQ==