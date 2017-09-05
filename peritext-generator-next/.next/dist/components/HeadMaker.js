'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _jsxFileName = '/Users/rawbin/Documents/Projets/peritext/peritext-2/peritext-server-garlic-flavoured/peritext-generator-next/components/HeadMaker.js';

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

  return _react2.default.createElement(_head2.default, {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 15
    }
  }, _react2.default.createElement('title', {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 16
    }
  }, title), _react2.default.createElement('meta', { name: 'generator', content: 'peritext', __source: {
      fileName: _jsxFileName,
      lineNumber: 17
    }
  }), _react2.default.createElement('meta', { name: 'DC.Title', lang: 'fr', content: title, __source: {
      fileName: _jsxFileName,
      lineNumber: 19
    }
  }), _react2.default.createElement('meta', { name: 'DC.Date.created', schema: 'W3CDTF', content: new Date().toISOString(), __source: {
      fileName: _jsxFileName,
      lineNumber: 20
    }
  }), _react2.default.createElement('meta', { name: 'author', content: authorsStr, __source: {
      fileName: _jsxFileName,
      lineNumber: 27
    }
  }), _react2.default.createElement('meta', { name: 'keywords', content: tags.join(','), __source: {
      fileName: _jsxFileName,
      lineNumber: 28
    }
  }), _react2.default.createElement('meta', { name: 'description', content: description, __source: {
      fileName: _jsxFileName,
      lineNumber: 29
    }
  }), _react2.default.createElement('meta', { name: 'viewport', content: 'user-scalable=no,width=device-width', __source: {
      fileName: _jsxFileName,
      lineNumber: 30
    }
  }), _react2.default.createElement('meta', { name: 'twitter:card', value: 'summary', __source: {
      fileName: _jsxFileName,
      lineNumber: 34
    }
  }), _react2.default.createElement('meta', { name: 'twitter:site', content: url, __source: {
      fileName: _jsxFileName,
      lineNumber: 35
    }
  }), _react2.default.createElement('meta', { name: 'twitter:title', content: title, __source: {
      fileName: _jsxFileName,
      lineNumber: 36
    }
  }), _react2.default.createElement('meta', { name: 'twitter:description', content: description, __source: {
      fileName: _jsxFileName,
      lineNumber: 37
    }
  }), _react2.default.createElement('meta', { itemProp: 'name', content: title, __source: {
      fileName: _jsxFileName,
      lineNumber: 43
    }
  }), _react2.default.createElement('meta', { itemProp: 'description', content: description, __source: {
      fileName: _jsxFileName,
      lineNumber: 44
    }
  }), _react2.default.createElement('meta', { property: 'og:title', content: title, __source: {
      fileName: _jsxFileName,
      lineNumber: 49
    }
  }), _react2.default.createElement('meta', { property: 'og:type', content: 'website', __source: {
      fileName: _jsxFileName,
      lineNumber: 50
    }
  }), _react2.default.createElement('meta', { property: 'og:url', content: url, __source: {
      fileName: _jsxFileName,
      lineNumber: 51
    }
  }), _react2.default.createElement('meta', { property: 'og:description', content: description, __source: {
      fileName: _jsxFileName,
      lineNumber: 52
    }
  }), children);
};