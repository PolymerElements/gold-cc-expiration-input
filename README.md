[![Published on NPM](https://img.shields.io/npm/v/@polymer/gold-cc-expiration-input.svg)](https://www.npmjs.com/package/@polymer/gold-cc-expiration-input)
[![Build status](https://travis-ci.org/PolymerElements/gold-cc-expiration-input.svg?branch=master)](https://travis-ci.org/PolymerElements/gold-cc-expiration-input)
[![Published on webcomponents.org](https://img.shields.io/badge/webcomponents.org-published-blue.svg)](https://webcomponents.org/element/@polymer/gold-cc-expiration-input)

##&lt;gold-cc-expiration-input&gt;

`gold-cc-expiration-input` is a  single-line text field with Material Design styling
for entering a credit card's expiration date
See: [Documentation](https://www.webcomponents.org/element/@polymer/gold-cc-expiration-input),
  [Demo](https://www.webcomponents.org/element/@polymer/gold-cc-expiration-input/demo/demo/index.html).

## Changes in 3.0
* `date-input` will no longer fire the `dateChanged` event.
  * Instead listen to the non-bubbling `date-changed` event.
* Values set delcaratively will be visible.

## Usage

### Installation
```
npm install --save @polymer/gold-cc-expiration-input
```

### In an html file
```html
<html>
  <head>
    <script type="module">
      import '@polymer/gold-cc-expiration-input/gold-cc-expiration-input.js';
    </script>
  </head>
  <body>
    <gold-cc-expiration-input></gold-cc-expiration-input>
    <gold-cc-expiration-input value="11/15"></gold-cc-expiration-input>
    <gold-cc-expiration-input label="Date"></gold-cc-expiration-input>
  </body>
</html>
```
### In a Polymer 3 element
```js
import {PolymerElement, html} from '@polymer/polymer';
import '@polymer/gold-cc-expiration-input/gold-cc-expiration-input.js';

class SampleElement extends PolymerElement {
  static get template() {
    return html`
      <gold-cc-expiration-input></gold-cc-expiration-input>
      <gold-cc-expiration-input value="11/15"></gold-cc-expiration-input>
      <gold-cc-expiration-input label="Date"></gold-cc-expiration-input>
    `;
  }
}
customElements.define('sample-element', SampleElement);
```

## Contributing
If you want to send a PR to this element, here are
the instructions for running the tests and demo locally:

### Installation
```sh
git clone https://github.com/PolymerElements/gold-cc-expiration-input
cd gold-cc-expiration-input
npm install
npm install -g polymer-cli
```

### Running the demo locally
```sh
polymer serve --npm
open http://127.0.0.1:<port>/demo/
```

### Running the tests
```sh
polymer test --npm
```