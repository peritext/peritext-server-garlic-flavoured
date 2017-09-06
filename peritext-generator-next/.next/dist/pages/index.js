'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault2(_react);

function _interopRequireDefault2(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

Object.defineProperty(exports, "__esModule", {
  value: true
});


var _GlobalsProvider = require('../components/GlobalsProvider');

var _GlobalsProvider2 = _interopRequireDefault(_GlobalsProvider);

var _peritextConfig = require('../peritextConfig');

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

var Home = _peritextConfig.templates.web.Home;

exports.default = function () {
  return _react2.default.createElement(_GlobalsProvider2.default, { activeViewId: 'home' }, _react2.default.createElement(Home, null));
};