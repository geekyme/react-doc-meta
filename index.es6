var React = require('react'),
    createSideEffect = require('react-side-effect');

var _serverMeta = [];

function getMetaFromPropsList(propsList) {
  var innermostProps = propsList[propsList.length - 1];
  if (innermostProps) {
    return innermostProps.tags;
  }
}

var DocumentMeta = createSideEffect(function handleChange(propsList) {
  var tags = getMetaFromPropsList(propsList);

  if(!tags || tags.length === 0) return undefined;

  if (typeof document !== 'undefined') {
    // this chunk here gets rid of the doc-meta nodes
    let nodes = document.querySelectorAll(`meta[data-doc-meta="true"]`);

    _.forEach(nodes, (node) => {
      node.parentNode.removeChild(node);
    });

    // then reinsert new ones
    _.forEach(tags, (tag) => {
      // tag can contain many property.
      let newNode = document.createElement("meta")

      for (let property in tag) {
        if (tag.hasOwnProperty(property)) {
          // add the properties
          newNode.setAttribute(property, tag[property]);
        }
      }

      // add the lib-signature
      newNode.setAttribute("data-doc-meta", "true")

      // add the node to head
      document.getElementsByTagName('head')[0].appendChild(newNode);
    })

  } else {
    _serverMeta = _serverMeta.concat(tags);
  }
}, {
  displayName: 'DocumentMeta',

  propTypes: {
    tags: React.PropTypes.array
  },

  statics: {
    peek: function () {
      return _serverMeta;
    },

    rewind: function () {
      var meta = _serverMeta;
      this.dispose();
      return meta;
    }
  }
});

module.exports = DocumentMeta;