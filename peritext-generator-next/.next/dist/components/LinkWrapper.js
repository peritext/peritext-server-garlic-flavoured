'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _link = require('next/dist/lib/link.js');

var _link2 = _interopRequireDefault(_link);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

exports.default = function (_ref) {
  var to = _ref.to,
      as = _ref.as,
      _ref$query = _ref.query,
      query = _ref$query === undefined ? {} : _ref$query,
      title = _ref.title;

  var queryString = (0, _keys2.default)(query)
  // .filter(quer => quer !== 'id')
  .map(function (quer) {
    return quer + '=' + query[quer];
  }).join('&');
  queryString = queryString.length > 0 ? '?' + queryString : '';
  var idSuffix = query.id ? '/' + query.id : '';
  var asFinal = '/' + (as || to) + idSuffix + queryString;
  var toFinal = '/' + to + queryString;
  return _react2.default.createElement(_link2.default, {
    href: toFinal,
    as: asFinal
  }, _react2.default.createElement('a', null, title));
};