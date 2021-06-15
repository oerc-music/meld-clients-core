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