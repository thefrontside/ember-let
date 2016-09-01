/* jshint node: true */
'use strict';

var VersionChecker = require('ember-cli-version-checker');

module.exports = {
  name: 'ember-let',

  setupPreprocessorRegistry: function(type, registry) {
    this._super.included.apply(this, arguments);

    // Inline let is only supported in Ember 2.0 and up.
    var checker = new VersionChecker(this);
    if (checker.for('ember', 'bower').lt('2.0.0')) {
      return;
    }

    registry.add('htmlbars-ast-plugin', {
      name: 'inline-let',
      plugin: require('./lib/inline-let-transform')
    });
  },

  included: function(app) {
    this._super.included.apply(app, arguments);
    
    app.import('vendor/ember-let/register.js');
  }
};
