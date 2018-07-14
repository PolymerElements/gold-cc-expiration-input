/**
@license
Copyright (c) 2015 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at
http://polymer.github.io/LICENSE.txt The complete set of authors may be found at
http://polymer.github.io/AUTHORS.txt The complete set of contributors may be
found at http://polymer.github.io/CONTRIBUTORS.txt Code distributed by Google as
part of the polymer project is also subject to an additional IP rights grant
found at http://polymer.github.io/PATENTS.txt
*/
import '@polymer/polymer/polymer-legacy.js';
import '@polymer/paper-input/paper-input-container.js';
import '@polymer/paper-input/paper-input-error.js';
import '@polymer/iron-input/iron-input.js';
import './date-input.js';

import {IronFormElementBehavior} from '@polymer/iron-form-element-behavior/iron-form-element-behavior.js';
import {PaperInputBehavior} from '@polymer/paper-input/paper-input-behavior.js';
import {Polymer} from '@polymer/polymer/lib/legacy/polymer-fn.js';
import {html} from '@polymer/polymer/lib/utils/html-tag.js';

/**
`gold-cc-expiration-input` is a  single-line text field with Material Design
styling for entering a credit card's expiration date

    <gold-cc-expiration-input></gold-cc-expiration-input>
    <gold-cc-expiration-input value="11/15"></gold-cc-expiration-input>

It may include an optional label, which by default is "Expiration Date".

    <gold-cc-expiration-input label="Date"></gold-cc-expiration-input>


### Validation

The input can check whether the entered date is a valid, future date.

The input can be automatically validated as the user is typing by using
the `auto-validate` and `required` attributes. For manual validation, the
element also has a `validate()` method, which returns the validity of the
input as well sets any appropriate error messages and styles.

See `Polymer.PaperInputBehavior` for more API docs.

### Styling

See `Polymer.PaperInputContainer` for a list of custom properties used to
style this element.

@group Gold Elements
@demo demo/index.html
@class gold-cc-expiration-input
*/
Polymer({
  _template: html`
    <style>
      :host {
        display: block;
      }
    </style>

    <paper-input-container
        id="container"
        no-label-float="[[noLabelFloat]]"
        always-float-label="[[alwaysFloatLabel]]"
        attr-for-value="date"
        disabled$="[[disabled]]"
        invalid="[[invalid]]">
      <label slot="label" hidden$="[[!label]]">[[label]]</label>

      <date-input
          class="paper-input-input"
          id="input"
          slot="input"
          aria-label-prefix="[[_ariaLabelledBy]]"
          required$="[[required]]"
          autocomplete$="[[autocomplete]]"
          disabled$="[[disabled]]"
          invalid="{{invalid}}"
          autofocus$="[[autofocus]]"
          inputmode$="[[inputmode]]"
          placeholder$="[[placeholder]]"
          readonly$="[[readonly]]"
          on-date-changed="_onDateChanged">
      </date-input>

      <template is="dom-if" if="[[errorMessage]]">
        <paper-input-error slot="add-on" id="error">
          [[errorMessage]]
        </paper-input-error>
      </template>

    </paper-input-container>
  `,

  is: 'gold-cc-expiration-input',

  /* The underlying dateInput is tabbable */
  hostAttributes: {'tabindex': -1},

  behaviors: [PaperInputBehavior, IronFormElementBehavior],

  properties: {
    /**
     * The label for this input.
     */
    label: {
      type: String,
      value: 'Expiration Date',
    },

    value: {
      type: String,
      value: '',
      observer: '_onValueChanged',
    }
  },

  observers: ['_onFocusedChanged(focused)'],

  ready: function() {
    // If there's an initial input, validate it.
    if (this.value) {
      this._handleAutoValidate();
    }
  },

  created() {
    // Polymer 2+ propagates `autoValidate` earlier in the lifecycle than in
    // Polymer 1
    this.__ignoreAutoValidation = true;
  },

  /**
   * A handler that is called on input
   */
  _onValueChanged: function(value, oldValue) {
    // The initial property assignment is handled by `ready`.
    if (oldValue == undefined && value === '') {
      return;
    }

    this.$.input.setProperties({
      month: this._computeMonth(value),
      year: this._computeYear(value),
    });
    this._handleAutoValidate();
  },

  _onDateChanged: function(event) {
    // date-input's _computeDate gets called on created which is called before
    // the first __onValueChanged is called
    if (!this.__firstDateComputeSkipped) {
      this.__firstDateComputeSkipped = true;
      return;
    }
    var month = event.detail.value.month || '';
    var year = event.detail.value.year || '';
    var value = year ? (month + '/' + year) : month;

    this.value = String(value);
  },

  _computeMonth: function(value) {
    // Date is in MM/YY format.
    return value.split('/')[0];
  },

  _computeYear: function(value) {
    // Date is in MM/YY format.
    return value.split('/')[1] || '';
  },

  /**
   * Overidden from Polymer.PaperInputBehavior.
   */
  validate: function() {
    return this.$.input.validate();
  },

  /**
   * Overidden from Polymer.IronControlState.
   */
  _onFocusedChanged: function(focused) {
    if (this.__ignoreAutoValidation) {
      this.__ignoreAutoValidation = false;
      return;
    }

    if (!focused) {
      this._handleAutoValidate();
    }
  }
});
