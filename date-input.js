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
import '@polymer/iron-input/iron-input.js';
import '@polymer/iron-flex-layout/iron-flex-layout.js';
import '@polymer/paper-input/paper-input-container.js';
import '@polymer/paper-styles/default-theme.js';
import '@polymer/paper-styles/typography.js';
import './date-validator.js';

import {IronA11yKeysBehavior} from '@polymer/iron-a11y-keys-behavior/iron-a11y-keys-behavior.js';
import {IronValidatableBehavior} from '@polymer/iron-validatable-behavior/iron-validatable-behavior.js';
import {Polymer} from '@polymer/polymer/lib/legacy/polymer-fn.js';
import {html} from '@polymer/polymer/lib/utils/html-tag.js';

Polymer({

  _template: html`
    <style>
      span {
        @apply --paper-input-container-font;
        opacity: 0.33;
        text-align: center;
      }

      input[is="iron-input"], iron-input input {
        position: relative; /* to make a stacking context */
        outline: none;
        box-shadow: none;
        padding: 0;
        width: 100%;
        background: transparent;
        border: none;
        color: var(--paper-input-container-input-color, var(--primary-text-color));
        text-align: center;

        @apply --layout-flex;
        @apply --paper-font-subhead;
        @apply --paper-input-container-input;
      }

      .container {
        @apply --layout-horizontal;
      }
    </style>

    <date-validator id="validator"></date-validator>

    <span aria-hidden id="monthLabel" hidden>Month</span>
    <span aria-hidden id="yearLabel" hidden>Year</span>

    <div class="container">
      <iron-input
          id="expirationMonth"
          bind-value="{{month}}"
          allowed-pattern="[0-9]"
          invalid="{{invalid}}">
        <input
            id="nativeMonthInput"
            aria-labelledby$="[[_computeAriaLabel(ariaLabelPrefix,'monthLabel')]]"
            required$="[[required]]"
            maxlength="2"
            placeholder="MM"
            autocomplete="cc-exp-month"
            type="tel"
            disabled$="[[disabled]]"
            autofocus$="[[autofocus]]"
            inputmode$="[[inputmode]]"
            readonly$="[[readonly]]">
      </iron-input>
      <span>/</span>
      <iron-input
          id="expirationYear"
          bind-value="{{year}}"
          allowed-pattern="[0-9]"
          invalid="{{invalid}}">
        <input
            id="nativeYearInput"
            aria-labelledby$="[[_computeAriaLabel(ariaLabelPrefix,'yearLabel')]]"
            required$="[[required]]"
            maxlength="2"
            placeholder="YY"
            autocomplete="cc-exp-year"
            type="tel"
            disabled$="[[disabled]]"
            inputmode$="[[inputmode]]"
            readonly$="[[readonly]]">
      </iron-input>
    </div>
  `,

  is: 'date-input',

  behaviors: [IronA11yKeysBehavior, IronValidatableBehavior],

  properties: {
    /**
     * Set to true to mark the input as required.
     */
    required: {
      type: Boolean,
      value: false,
    },

    /**
     * The month component of the date displayed.
     */
    month: {
      type: Number,
    },

    /**
     * The year component of the date displayed.
     */
    year: {
      type: Number,
    },

    /**
     * The date object used by the validator. Has two properties, month and
     * year.
     */
    date: {
      notify: true,
      type: Object,
    },

    validator: {
      type: String,
      value: 'date-validator',
    },

    ariaLabelPrefix: {
      type: String,
    },

    /**
     * Set to true to disable the month and year input elements.
     */
    disabled: {
      type: Boolean,
      value: false,
    },

    /**
     * Set to true to autofocus the month input element.
     */
    autofocus: {
      type: Boolean,
    },

    /**
     * Bound to the month and year input elements' `inputmode` property.
     */
    inputmode: {
      type: String,
    },

    /**
     * Set to true to mark the month and year inputs as not editable.
     */
    readonly: {
      type: Boolean,
      value: false,
    }
  },

  /**
   * @type {!Object}
   */
  keyBindings: {'/': '_selectYear'},

  observers: ['_computeDate(month, year)'],

  created: function() {
    // Polymer 2+ does not call _computeDate observer before
    // paper-input-container calls _handleValue in the parent's
    // connectedCallback unlike in Polymer 1
    this._computeDate('', '');
  },

  _selectYear: function() {
    var yearInput = this.$.nativeYearInput || this.$.expirationYear;
    yearInput.focus();
  },

  _computeDate: function(month, year) {
    // Months are 0-11.
    this.date = {month: month, year: year};
    // Advance cursor to year after month entry
    if (month && month.length === 2) {
      this._selectYear();
    }
  },

  validate: function() {
    // Empty, non-required input is valid.
    if (!this.required && this.month == '' && this.year == '') {
      return true;
    }
    this.invalid = !this.$.validator.validate(this.date);
    this.fire('iron-input-validate');
    return !this.invalid;
  },

  _computeAriaLabel: function(dateLabel, monthLabel) {
    return dateLabel + ' ' + monthLabel;
  }
});
