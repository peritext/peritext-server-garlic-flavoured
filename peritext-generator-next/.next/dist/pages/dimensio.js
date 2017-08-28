'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getPrototypeOf = require('next/node_modules/babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('next/node_modules/babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require('next/node_modules/babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('next/node_modules/babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _GlobalsProvider = require('../components/GlobalsProvider');

var _GlobalsProvider2 = _interopRequireDefault(_GlobalsProvider);

var _peritextConfig = require('../peritextConfig');

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

var isBrowser = new Function("try {return this===window;}catch(e){ return false;}");
var inBrowser = isBrowser();

var ReactPDF = void 0;
if (inBrowser) {
  ReactPDF = require('react-pdf/build/entry.webpack');
}

var Dimensio = _peritextConfig.templates.web.Dimensio;

var Contents = function (_Component) {
  (0, _inherits3.default)(Contents, _Component);

  function Contents(props) {
    (0, _classCallCheck3.default)(this, Contents);

    var _this = (0, _possibleConstructorReturn3.default)(this, (Contents.__proto__ || (0, _getPrototypeOf2.default)(Contents)).call(this, props));

    _this.render = function () {
      var _this$context$story = _this.context.story,
          id = _this$context$story.id,
          title = _this$context$story.metadata.title;

      var pdfUrl = '/static/generated/' + id + '.pdf';
      var epubUrl = '/static/generated/' + id + '.epub';
      if (inBrowser) {
        pdfUrl = window.location.origin + pdfUrl;
        epubUrl = window.location.origin + epubUrl;
      }
      return _react2.default.createElement(Dimensio, {
        storyTitle: title,
        pdfUrl: pdfUrl,
        epubUrl: epubUrl
      });
    };

    return _this;
  }

  return Contents;
}(_react.Component);

Contents.contextTypes = {
  story: _propTypes2.default.object
};

exports.default = function () {
  return _react2.default.createElement(_GlobalsProvider2.default, { activeViewId: 'dimensio' }, _react2.default.createElement(Contents, null));
};