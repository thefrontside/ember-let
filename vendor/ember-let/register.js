/* global require */
var Ember = require('ember').default;
var registerHelper = Ember.__loader.require('ember-htmlbars/helpers').registerHelper;
var letKeywordModule = require('ember-let/-private/keyword').default; // => we would need to move the keyword implementation here
registerHelper('let', letKeywordModule);
