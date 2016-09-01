/* global require */
(function() {
  var Ember = require('ember').default;
  var registerHelper = Ember.__loader.require('ember-htmlbars/helpers').registerHelper;

  var utils;
  if ('ember-metal/streams/utils' in Ember.__loader.registry) {
    utils = Ember.__loader.require('ember-metal/streams/utils');
  } else {
    utils = Ember.__loader.require('ember-htmlbars/streams/utils');
  }

  registerHelper('let', function letHelper(params, hash, options) {

    var isBlock = !!options.template.yield;
    // when used as a block
    if (isBlock) {
      options.template.yield(params);
    }

    // when used inline
    if (!isBlock && this.params) {
      if (this.params.length < 2) {
        Ember.assert('let helper requires at least one path and one value', this.params.length > 2);
      }
      var stream;
      for (var i = 0; i < this.params.length; i++) {
        if (i % 2) {
          Ember.assert('let helper expects path to be quoteless - got ' + stream + ' instead', utils.isStream(stream));
          stream.setValue(params[i]);
          } else {
          stream = this.params[i];      
        }
      }
    }

  });

})();

