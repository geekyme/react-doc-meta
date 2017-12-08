'use strict';

var React = require('react'),
    Component = require('react').Component,
    withSideEffect = require('react-side-effect'),
    PropTypes = require('prop-types');

class DocumentMeta extends Component {
  render() {
    if (this.props.children) {
      return Children.only(this.props.children);
    } else {
      return null;
    }
  }
}

DocumentMeta.propTypes = {
  tags: PropTypes.array
}

/**
 * TO HANDLE CHANGE
 */
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
  if (tag){
    var newNode = document.createElement('meta');
    for (var property in tag) {
      if (tag.hasOwnProperty(property)) {
        newNode.setAttribute(property, tag[property]);
      }
    }
    newNode.setAttribute('data-doc-meta', 'true');
    document.getElementsByTagName('head')[0].appendChild(newNode);
  }
}

function insertMetaNodes(tags) {
  if (typeof document !== 'undefined' && tags) {
    Array.prototype.slice.call(tags).forEach(function (tag) {
      insertMetaNode(tag);
    });
  }
}

/**
 * FUNCTIONS TO EXPORT
 */

function reducePropsToState(propsList) {
  var innermostProps = propsList[propsList.length - 1];
  if (innermostProps) {
    return innermostProps.tags;
  }
}

function handleStateChangeOnClient(meta) {
  let _serverMeta = meta ? getMetaFromPropsList(meta) : [];
  removeMetaNodes();

  insertMetaNodes(_serverMeta);
}

module.exports = withSideEffect(
  reducePropsToState,
  handleStateChangeOnClient
)(DocumentMeta);