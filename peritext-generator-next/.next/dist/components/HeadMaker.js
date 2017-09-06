'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _head = require('next/dist/lib/head.js');

var _head2 = _interopRequireDefault(_head);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

exports.default = function (_ref) {
  var _ref$title = _ref.title,
      title = _ref$title === undefined ? '' : _ref$title,
      _ref$authors = _ref.authors,
      authors = _ref$authors === undefined ? [] : _ref$authors,
      _ref$tags = _ref.tags,
      tags = _ref$tags === undefined ? [] : _ref$tags,
      _ref$description = _ref.description,
      description = _ref$description === undefined ? '' : _ref$description,
      _ref$url = _ref.url,
      url = _ref$url === undefined ? '' : _ref$url,
      children = _ref.children;

  var authorsStr = authors.map(function (author) {
    return author.given + ' ' + author.family;
  }).join(', ');

  return _react2.default.createElement(_head2.default, null, _react2.default.createElement('title', null, title), _react2.default.createElement('meta', { name: 'generator', content: 'peritext' }), _react2.default.createElement('meta', { name: 'DC.Title', lang: 'fr', content: title }), _react2.default.createElement('meta', { name: 'DC.Date.created', schema: 'W3CDTF', content: new Date().toISOString() }), _react2.default.createElement('meta', { name: 'author', content: authorsStr }), _react2.default.createElement('meta', { name: 'keywords', content: tags.join(',') }), _react2.default.createElement('meta', { name: 'description', content: description }), _react2.default.createElement('meta', { name: 'viewport', content: 'user-scalable=no,width=device-width' }), _react2.default.createElement('meta', { name: 'twitter:card', value: 'summary' }), _react2.default.createElement('meta', { name: 'twitter:site', content: url }), _react2.default.createElement('meta', { name: 'twitter:title', content: title }), _react2.default.createElement('meta', { name: 'twitter:description', content: description }), _react2.default.createElement('meta', { itemProp: 'name', content: title }), _react2.default.createElement('meta', { itemProp: 'description', content: description }), _react2.default.createElement('meta', { property: 'og:title', content: title }), _react2.default.createElement('meta', { property: 'og:type', content: 'website' }), _react2.default.createElement('meta', { property: 'og:url', content: url }), _react2.default.createElement('meta', { property: 'og:description', content: description }), children);
};