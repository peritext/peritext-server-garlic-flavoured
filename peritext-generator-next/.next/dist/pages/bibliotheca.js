'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault2(_react);

function _interopRequireDefault2(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

Object.defineProperty(exports, "__esModule", {
  value: true
});


var _peritextConfig = require('../peritextConfig');

var _GlobalsProvider = require('../components/GlobalsProvider');

var _GlobalsProvider2 = _interopRequireDefault(_GlobalsProvider);

var _bibliography = require('../static/generated/bibliography');

var _bibliography2 = _interopRequireDefault(_bibliography);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

var Bibliotheca = _peritextConfig.templates.web.Bibliotheca;

exports.default = function () {
  return _react2.default.createElement(_GlobalsProvider2.default, { activeViewId: 'bibliotheca' }, _react2.default.createElement(Bibliotheca, { bibliography: _bibliography2.default }));
};