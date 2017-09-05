'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault2(_react);

function _interopRequireDefault2(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _jsxFileName = '/Users/rawbin/Documents/Projets/peritext/peritext-2/peritext-server-garlic-flavoured/peritext-generator-next/pages/index.js?entry';


var _GlobalsProvider = require('../components/GlobalsProvider');

var _GlobalsProvider2 = _interopRequireDefault(_GlobalsProvider);

var _peritextConfig = require('../peritextConfig');

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

var Home = _peritextConfig.templates.web.Home;

exports.default = function () {
  return _react2.default.createElement(_GlobalsProvider2.default, { activeViewId: 'home', __source: {
      fileName: _jsxFileName,
      lineNumber: 11
    }
  }, _react2.default.createElement(Home, {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 12
    }
  }));
};