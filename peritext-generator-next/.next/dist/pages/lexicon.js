'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault2(_react);

function _interopRequireDefault2(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _jsxFileName = '/Users/rawbin/Documents/Projets/peritext/peritext-2/peritext-server-garlic-flavoured/peritext-generator-next/pages/lexicon.js?entry';


var _GlobalsProvider = require('../components/GlobalsProvider');

var _GlobalsProvider2 = _interopRequireDefault(_GlobalsProvider);

var _peritextConfig = require('../peritextConfig');

var _glossary = require('../static/generated/glossary');

var _glossary2 = _interopRequireDefault(_glossary);

var _authorsIndex = require('../static/generated/authorsIndex');

var _authorsIndex2 = _interopRequireDefault(_authorsIndex);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

var Lexicon = _peritextConfig.templates.web.Lexicon;

exports.default = function () {
  return _react2.default.createElement(_GlobalsProvider2.default, { activeViewId: 'lexicon', __source: {
      fileName: _jsxFileName,
      lineNumber: 14
    }
  }, _react2.default.createElement(Lexicon, {
    glossary: _glossary2.default,
    authorsIndex: _authorsIndex2.default,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 15
    }
  }));
};