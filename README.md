React Doc Meta
====================

Render meta tags on the server & client for ReactJS. You can render meta tags with any kind of attributes / properties.

Built with [React Side Effect](https://github.com/gaearon/react-side-effect).

====================

## Installation

```
npm install --save react-doc-meta
```

Dependencies: React >= 0.12.0

## Example

```javascript
var App = React.createClass({
  render: function () {
    var tags = [
      {name: "description", content: "lorem ipsum dolor"},
      {itemProp: "name", content: "The Name or Title Here"},
      {itemProp: "description", content: "This is the page description"},
      {itemProp: "image", content: "http://www.example.com/image.jpg"},
      {name: "twitter:card", content: "product"},
      {name: "twitter:site", content: "@publisher_handle"},
      {name: "twitter:title", content: "Page Title"},
      {name: "twitter:description", content: "Page description less than 200 characters"},
      {name: "twitter:creator", content: "@author_handle"},
      {name: "twitter:image", content: "http://www.example.com/image.html"},
      {name: "twitter:data1", content: "$3"},
      {name: "twitter:label1", content: "Price"},
      {name: "twitter:data2", content: "Black"},
      {name: "twitter:label2", content: "Color"},
      {property: "og:title", content: "Title Here"},
      {property: "og:type", content: "article"},
      {property: "og:url", content: "http://www.example.com/"},
      {property: "og:image", content: "http://example.com/image.jpg"},
      {property: "og:description", content: "Description Here"},
      {property: "og:site_name", content: "Site Name, i.e. Moz"},
      {property: "og:price:amount", content: "15.00"},
      {property: "og:price:currency", content: "USD"},
      {weirdfield: "something", content: "really really cool", hello:"world", meh: "hahaha"}
    ]

    // DocMeta will construct meta tags with properties & values mirroring the above key-value pairs
    return (
      <DocMeta tags={tags}>
        <this.props.activeRouteHandler />
      </DocMeta>
    );
  }
});
```

On the browser the above will produce:

```
<meta name="description" content="lorem ipsum dolor" data-doc-meta="true">
<meta itemprop="name" content="The Name or Title Here" data-doc-meta="true">
<meta itemprop="description" content="This is the page description" data-doc-meta="true">
<meta itemprop="image" content="http://www.example.com/image.jpg" data-doc-meta="true">
<meta name="twitter:card" content="product" data-doc-meta="true">
<meta name="twitter:site" content="@publisher_handle" data-doc-meta="true">
<meta name="twitter:title" content="Page Title" data-doc-meta="true">
<meta name="twitter:description" content="Page description less than 200 characters" data-doc-meta="true">
<meta name="twitter:creator" content="@author_handle" data-doc-meta="true">
<meta name="twitter:image" content="http://www.example.com/image.html" data-doc-meta="true">
<meta name="twitter:data1" content="$3" data-doc-meta="true">
<meta name="twitter:label1" content="Price" data-doc-meta="true">
<meta name="twitter:data2" content="Black" data-doc-meta="true">
<meta name="twitter:label2" content="Color" data-doc-meta="true">
<meta property="og:title" content="Title Here" data-doc-meta="true">
<meta property="og:type" content="article" data-doc-meta="true">
<meta property="og:url" content="http://www.example.com/" data-doc-meta="true">
<meta property="og:image" content="http://example.com/image.jpg" data-doc-meta="true">
<meta property="og:description" content="Description Here" data-doc-meta="true">
<meta property="og:site_name" content="Site Name, i.e. Moz" data-doc-meta="true">
<meta property="og:price:amount" content="15.00" data-doc-meta="true">
<meta property="og:price:currency" content="USD" data-doc-meta="true">
<meta weirdfield="something" content="really really cool" hello="world" meh="hahaha" data-doc-meta="true">
```

Works for nested components too!

Also, you don't need to wrap components with ```<DocMeta tags={tags}>...</DocMeta>```, writing ```<DocMeta tags={tags} />``` should work just fine.


```javascript

class JoinPage extends Component {
  static propTypes = {
    status: PropTypes.string,
    user: PropTypes.object
  }

  render() {
    var tags = [
      {name: "description", content: "test"}
    ]

    // only this meta should render in the DOM
    var tags2 = [
      {name: "description", content: "test 2"}
    ]

    return (
      <div>
        <DocMeta tags={tags} />
        <DocMeta tags={tags2} />
        <JoinForm {...this.props} />
      </div>
    );
  }
}

class JoinForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render(){
    var tags = [
      {name: "description", content: "a nested doc meta"}
    ]


    return (
      <div>
        <DocMeta tags={tags} />
        <p>Join</p>
        <NavLink routeName="account">Test</NavLink>
      </div>
    )
  }
}

```

On the browser the above will produce

```
<meta name="description" content="a nested doc meta" data-doc-meta="true">
```


## Server Usage

If you use it on server, call `DocMeta.rewind()` **after rendering components to string** to retrieve the array of meta tags given to the innermost `DocMeta`. You can then embed this meta tags into HTML page template like this using es6 spread props:

```javascript

  //... the rest of the html-document.jsx...

  render() {
    const { state, markup, script, css, lang } = this.props;
    let metaTags = DocMeta.rewind();

    return (
      <html >
        <head>
          {
            metaTags.map((tag, index) =>
              <meta data-doc-meta="true" key={index} {...tag} />)
          }
        </head>

        <body>
          <div id="root" dangerouslySetInnerHTML={{__html: markup}} />

          <script dangerouslySetInnerHTML={{__html: state}} />
        </body>
      </html>
    );
  }

```

Because this component keeps track of mounted instances, **you have to make sure to call `rewind` on server**, or you'll get a memory leak.

## TODO

TEST!

## Contributing

Contributions welcomed! Raise issues / submit pull requests thank you!

## Release History

* 0.1.0 Adapted solution for react-document-title for meta tags

* 0.1.1 Removed undeclared underscore dependency. Using native array prototype functions instead.