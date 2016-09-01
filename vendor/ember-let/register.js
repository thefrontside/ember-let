/* global require */
(function() {
  var Ember = require('ember').default;
  var registerHelper = Ember.__loader.require('ember-htmlbars/helpers').registerHelper;

  registerHelper('let', function letHelper(params, hash, options) {

    var isBlock = !!options.template.yield;
    // when used as a block
    if (isBlock) {
      options.template.yield(params);
    }

  });

})();

