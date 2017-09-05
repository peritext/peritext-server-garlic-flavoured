'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault2(_react);

function _interopRequireDefault2(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _jsxFileName = '/Users/rawbin/Documents/Projets/peritext/peritext-2/peritext-server-garlic-flavoured/peritext-generator-next/pages/section.js?entry';


var _router = require('next/dist/lib/router/index.js');

var _router2 = _interopRequireDefault(_router);

var _GlobalsProvider = require('../components/GlobalsProvider');

var _GlobalsProvider2 = _interopRequireDefault(_GlobalsProvider);

var _peritextConfig = require('../peritextConfig');

var _citations = require('../static/generated/citations');

var _citations2 = _interopRequireDefault(_citations);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

var Section = _peritextConfig.templates.web.Section;

exports.default = function (_ref) {
  var query = _ref.url.query;

  if (query.contextualizationId) {
    setTimeout(function () {
      _router2.default.replace('/section?id=' + query.id, '/section/' + query.id);
    }, 1000);
  }
  return _react2.default.createElement(_GlobalsProvider2.default, { activeViewId: query.id, __source: {
      fileName: _jsxFileName,
      lineNumber: 23
    }
  }, _react2.default.createElement(Section, {
    id: query.id,
    citations: _citations2.default,
    query: query,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 24
    }
  }));
};