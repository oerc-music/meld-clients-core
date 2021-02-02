"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactRedux = require("react-redux");

var _redux = require("redux");

var _prefixes = require("../../lib/library/prefixes");

var _reactMediaPlayer = require("react-media-player");

var _index = require("../actions/index");

var _reactMediaPlayerPlayPause = _interopRequireDefault(require("../containers/react-media-player-play-pause"));

var _reactTabs = require("react-tabs");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

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

var PlayPause = _reactMediaPlayer.controls.PlayPause,
    CurrentTime = _reactMediaPlayer.controls.CurrentTime,
    Progress = _reactMediaPlayer.controls.Progress,
    SeekBar = _reactMediaPlayer.controls.SeekBar,
    Duration = _reactMediaPlayer.controls.Duration,
    MuteUnmute = _reactMediaPlayer.controls.MuteUnmute,
    Volume = _reactMediaPlayer.controls.Volume,
    Fullscreen = _reactMediaPlayer.controls.Fullscreen;

var VideoLinks = /*#__PURE__*/function (_Component) {
  _inherits(VideoLinks, _Component);

  var _super = _createSuper(VideoLinks);

  function VideoLinks(props) {
    _classCallCheck(this, VideoLinks);

    return _super.call(this, props);
  }

  _createClass(VideoLinks, [{
    key: "componentDidUpdate",
    value: function componentDidUpdate() {}
  }, {
    key: "videoPlayer",
    value: function videoPlayer(url) {
      return /*#__PURE__*/_react["default"].createElement(_reactMediaPlayer.Media, {
        key: url
      }, /*#__PURE__*/_react["default"].createElement("div", {
        className: "media"
      }, /*#__PURE__*/_react["default"].createElement("div", {
        className: "media-player"
      }, /*#__PURE__*/_react["default"].createElement(_reactMediaPlayer.Player, {
        src: url
      })), /*#__PURE__*/_react["default"].createElement("div", {
        className: "media-controls"
      }, /*#__PURE__*/_react["default"].createElement(_reactMediaPlayerPlayPause["default"], null))));
    }
  }, {
    key: "isIteration",
    value: function isIteration(thing) {
      if (typeTest("https://meld.linkedmusic.org/companion/vocab/MotifIteration", thing)) return true;
      if (this.props.iterations.find(function (x) {
        return x['@id'] === thing['@id'];
      })) return true;
      return false;
    }
  }, {
    key: "isIterationSegment",
    value: function isIterationSegment(thing) {
      //		console.log(thing);
      if (typeTest("https://meld.linkedmusic.org/companion/vocab/MotifIterationSegment", thing)) return true;
      if (this.props.iterations.find(function (x) {
        return x.iterationSegments.find(function (y) {
          return y['@id'] === thing['@id'];
        });
      })) return true;
      return false;
    }
  }, {
    key: "makeLinks",
    value: function makeLinks(links) {
      var linkMedia = [];
      var TM = [];
      var compares = []; //		console.log(links);

      for (var i = 0; i < links.length; i++) {
        var targets = links[i].targets;

        for (var j = 0; j < targets.length; j++) {
          if (this.isIteration(targets[j])) {
            var targetID = targets[j]['@id'];
            var iterationNo = this.props.iterations.findIndex(function (x) {
              return x['@id'] == targetID;
            });
            var iteration = this.props.iterations[iterationNo];
            var audio = iteration.embodimentLists.MP3 ? this.videoPlayer(iteration.embodimentLists.MP3[0]) : /*#__PURE__*/_react["default"].createElement("div", null);
            linkMedia[iterationNo] = /*#__PURE__*/_react["default"].createElement("div", {
              className: "motifBlock",
              key: "vl-" + targetID
            }, /*#__PURE__*/_react["default"].createElement("div", {
              className: "motifName",
              onClick: this.props.inspectMotive.bind(null, targets[j]['@id'])
            }, iteration["http://www.w3.org/2000/01/rdf-schema#label"]), audio);
          } else if (this.isIterationSegment(targets[j])) {
            var targetID = targets[j]['@id'];
            var iterationNo = this.props.iterations.findIndex(function (x) {
              return x.iterationSegments.find(function (y) {
                return y['@id'] == targetID;
              });
            });
            var iteration = this.props.iterations[iterationNo];
            var segment = iteration.iterationSegments.find(function (x) {
              return x['@id'] == targetID;
            });
            var audio = iteration.embodimentLists.MP3 ? this.videoPlayer(iteration.embodimentLists.MP3[0]) : /*#__PURE__*/_react["default"].createElement("div", null);
            var segmentName = segment["http://purl.org/vocab/frbr/core#realizationOf"]["http://www.w3.org/2000/01/rdf-schema#label"];

            if (!segmentName) {
              //FIXME: HACK because of JSON-LD framing issues
              var pos = segment["http://purl.org/vocab/frbr/core#realizationOf"]['@id'].lastIndexOf('-');
              segmentName = segment["http://purl.org/vocab/frbr/core#realizationOf"]['@id'].substring(pos + 1);
            }

            linkMedia[iterationNo] = /*#__PURE__*/_react["default"].createElement("div", {
              className: "motifBlock",
              key: "vl-" + targetID
            }, /*#__PURE__*/_react["default"].createElement("div", {
              className: "motifName"
            }, /*#__PURE__*/_react["default"].createElement("span", {
              className: "motif",
              onClick: this.props.inspectMotive.bind(null, iteration['@id'])
            }, iteration["http://www.w3.org/2000/01/rdf-schema#label"], " "), /*#__PURE__*/_react["default"].createElement("span", {
              className: "segment",
              onClick: this.props.inspectMotive.bind(null, iteration['@id'], targetID)
            }, segmentName + " segment")), audio);
          } else if (typeTest("https://meld.linkedmusic.org/companion/vocab/TimeMachine", targets[j])) {
            var TM = [/*#__PURE__*/_react["default"].createElement("div", {
              className: "motifBlock",
              key: "TMlink",
              onClick: this.props.timeMachine
            }, "TimeMachine")];
          } else if (typeTest("https://meld.linkedmusic.org/companion/vocab/Compare", targets[j])) {
            var LID = targets[j]["https://meld.linkedmusic.org/companion/vocab/LeftMotif"]['@id'];
            var RID = targets[j]["https://meld.linkedmusic.org/companion/vocab/RightMotif"]['@id'];
            var iterationL = this.props.iterations.find(function (x) {
              return x['@id'] == LID;
            });
            var iterationR = this.props.iterations.find(function (x) {
              return x['@id'] == RID;
            });
            compares.push( /*#__PURE__*/_react["default"].createElement("div", {
              className: "motifBlock",
              key: "c-" + LID + "---" + RID
            }, /*#__PURE__*/_react["default"].createElement("div", {
              className: "motifName motifNames",
              onClick: this.props.compare.bind(null, LID, RID)
            }, "Compare ", iterationL[_prefixes.prefix.rdfs + "label"], " & ", iterationR[_prefixes.prefix.rdfs + 'label'])));
          }
        }
      }

      return TM.concat(Object.values(linkMedia), compares);
    }
  }, {
    key: "render",
    value: function render() {
      var cT = 0; //		console.log(this.props.timesync);

      var links = [];

      if (this.props.timesync && "mediaResources" in this.props.timesync && this.props.uri in this.props.timesync.mediaResources) {
        cT = this.props.timesync.mediaResources[this.props.uri]['currentTime'];
        var syncs = this.props.timesync.mediaResources[this.props.uri]['times'];

        if (syncs) {
          var times = Object.keys(syncs).map(function (t) {
            return Number(t);
          });
          var window = 5;

          for (var i = 0; i < times.length; i++) {
            if (cT > times[i] && cT < (syncs[times[i]].end ? syncs[times[i]].end : times[i] + window)) {
              links.push(syncs[times[i]]);
            }
          }
        } else console.log("no syncs", this.props.timesync, this.props.uri);
      }

      var linkDivs = this.makeLinks(links);
      /*		if(document.getElementsByTagName('tei-link').item(0)){
      			var linkDivs = this.allRefsIndex();
      		} else {
      			setTimeout(this.props.advanceTime, 0.2);
      		}*/
      // var visibles = this.props.visible ? this.visibleLinks() : [];
      // if(visibles.length==1) visibles = visibles[0];
      //		console.log(linkDivs);

      return /*#__PURE__*/_react["default"].createElement("div", {
        className: "videoLinks linksTab"
      }, /*#__PURE__*/_react["default"].createElement("div", {
        className: "tabHeading"
      }, "Links"), linkDivs.length == 1 ? linkDivs[0] : linkDivs);
    }
  }]);

  return VideoLinks;
}(_react.Component);

function typeTest(type, jldObj) {
  if (jldObj['@type']) {
    if (typeof jldObj['@type'] == 'string') {
      return jldObj['@type'] == type;
    } else {
      return jldObj['@type'].indexOf(type) > -1;
    }
  } else return false;
}

function mapStateToProps(_ref) {
  var graph = _ref.graph,
      timesync = _ref.timesync;
  return {
    graph: graph,
    timesync: timesync
  };
}

function mapDispatchToProps(dispatch) {
  return (0, _redux.bindActionCreators)({
    registerClock: _index.registerClock,
    tickTimedResource: _index.tickTimedResource
  }, dispatch);
}

var _default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(VideoLinks);

exports["default"] = _default;