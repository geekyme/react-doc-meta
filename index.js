'use strict';

var React = require('react'),
    createSideEffect = require('react-side-effect'),
    PropTypes = require('prop-types');

var _serverMeta = [];

function getMetaFromPropsList(propsList) {
  var innermostProps = propsList[propsList.length - 1];
  if (innermostProps) {
    return innermostProps.tags;
  }
}

function removeMetaNodes() {
  if (typeof document !== 'undefined') {
    var nodes = document.querySelectorAll('meta[data-doc-meta="true"]');
    Array.prototype.slice.call(nodes).forEach(function (node) {
      node.parentNode.removeChild(node);
    });
  }
}

function insertMetaNode(tag) {
  var newNode = document.createElement('meta');
  for (var property in tag) {
    if (tag.hasOwnProperty(property)) {
      newNode.setAttribute(property, tag[property]);
    }
  }
  newNode.setAttribute('data-doc-meta', 'true');
  document.getElementsByTagName('head')[0].appendChild(newNode);
}

function insertMetaNodes(tags) {
  if (typeof document !== 'undefined') {
    Array.prototype.slice.call(tags).forEach(function (tag) {
      insertMetaNode(tag);
    });
  }
}

removeMetaNodes(); // required unless html5mode

var DocumentMeta = createSideEffect(function handleChange(propsList) {
  _serverMeta = getMetaFromPropsList(propsList) || [];

  removeMetaNodes();
  insertMetaNodes(_serverMeta);
}, {
  displayName: 'DocumentMeta',

  propTypes: {
    tags: PropTypes.array
  },

  statics: {
    peek: function peek() {
      return _serverMeta;
    },

    rewind: function rewind() {
      var meta = _serverMeta;
      this.dispose();
      return meta;
    }
  }
});

module.exports = DocumentMeta;
