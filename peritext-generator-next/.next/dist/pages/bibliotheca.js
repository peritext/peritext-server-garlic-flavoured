'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault2(_react);

function _interopRequireDefault2(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _jsxFileName = '/Users/rawbin/Documents/Projets/peritext/peritext-2/peritext-server-garlic-flavoured/peritext-generator-next/pages/bibliotheca.js?entry';


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
  return _react2.default.createElement(_GlobalsProvider2.default, { activeViewId: 'bibliotheca', __source: {
      fileName: _jsxFileName,
      lineNumber: 13
    }
  }, _react2.default.createElement(Bibliotheca, { bibliography: _bibliography2.default, __source: {
      fileName: _jsxFileName,
      lineNumber: 14
    }
  }));
};