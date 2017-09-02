'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _keys = require('next/node_modules/babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

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

var _head = require('next/dist/lib/head.js');

var _head2 = _interopRequireDefault(_head);

var _LinkWrapper = require('./LinkWrapper');

var _LinkWrapper2 = _interopRequireDefault(_LinkWrapper);

var _HeadMaker = require('../components/HeadMaker');

var _HeadMaker2 = _interopRequireDefault(_HeadMaker);

var _story = require('../static/story');

var _story2 = _interopRequireDefault(_story);

var _config = require('../config');

var _citations = require('../static/generated/citations');

var _citations2 = _interopRequireDefault(_citations);

var _peritextTemplateWebGarlic = require('peritext-template-web-garlic');

var _peritextConfig = require('../peritextConfig');

var _peritextConfig2 = _interopRequireDefault(_peritextConfig);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

var additionalStylesheets = _peritextConfig2.default.additionalStylesheets;

var additionalCss = additionalStylesheets.shared.concat(additionalStylesheets.web).join('\n');

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

var GlobalsProvider = function (_Component) {
  (0, _inherits3.default)(GlobalsProvider, _Component);

  function GlobalsProvider(props) {
    (0, _classCallCheck3.default)(this, GlobalsProvider);

    var _this = (0, _possibleConstructorReturn3.default)(this, (GlobalsProvider.__proto__ || (0, _getPrototypeOf2.default)(GlobalsProvider)).call(this, props));

    _this.getChildContext = function () {
      return {
        story: _story2.default,
        activeViewId: _this.props.activeViewId,
        LinkComponent: _LinkWrapper2.default,
        contextualizers: _peritextConfig2.default.contextualizers,
        rawCitations: _citations2.default
      };
    };

    _this.makeStyles = function () {
      var contextualizers = _peritextConfig2.default.contextualizers;
      return (0, _keys2.default)(contextualizers).reduce(function (result, type) {
        var defaultCss = contextualizers[type] ? contextualizers[type].defaultCss : '';
        return result + '\n' + defaultCss;
      }, '') + '\n' + (additionalCss || '') + '\n' + (_story2.default.settings.css && _story2.default.settings.css.web ? _story2.default.settings.css.web : '');
    };

    _this.render = function () {
      var children = _this.props.children;

      var styles = _this.makeStyles();
      return _react2.default.createElement('div', { id: 'globals-provider' }, _react2.default.createElement(_HeadMaker2.default, {
        title: _story2.default.metadata.title,
        authors: _story2.default.metadata.authors,
        description: _story2.default.metadata.description,
        url: _config.url
      }, _react2.default.createElement('base', { href: '/' }), _peritextTemplateWebGarlic.typefaceNames.map(function (name) {
        var googleName = capitalizeFirstLetter(name).replace(' ', '+');
        return _react2.default.createElement('link', { key: name, href: 'https://fonts.googleapis.com/css?family=' + googleName + ':300,400,700,800', rel: 'stylesheet' });
      }), _react2.default.createElement('style', { dangerouslySetInnerHTML: { __html: styles } })), children);
    };

    return _this;
  }

  return GlobalsProvider;
}(_react.Component);

exports.default = GlobalsProvider;

GlobalsProvider.childContextTypes = {
  story: _propTypes2.default.object,
  activeViewId: _propTypes2.default.string,
  navigateTo: _propTypes2.default.func,
  LinkComponent: _propTypes2.default.func,
  contextualizers: _propTypes2.default.object,
  rawCitations: _propTypes2.default.object
};