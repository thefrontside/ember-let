/* global require */
(function() {

  var Ember = require('ember').default;

  if (Ember.__loader.registry['ember-glimmer/syntax']) {
    var registerSyntax = Ember.__loader.require('ember-glimmer').registerSyntax;
    var StatementSyntax = Ember.__loader.require('glimmer-runtime').StatementSyntax;

    function LetSyntax(args, templates) {
      StatementSyntax.call(this);

      this.args = args;
      this.templates = templates;
    }

    LetSyntax.prototype.compile = function LetSyntax_compile(dsl) {
      dsl.block({ templates: this.templates, args: this.args }, function(dsl) {
        dsl.evaluate('default');
      });
    };

    LetSyntax.create = function(environment, args, templates) {
      return new this(args, templates);
    };

    registerSyntax('let', LetSyntax);
  } else if (Ember.__loader.registry['ember-htmlbars/helpers']) {
    var registerHelper = Ember.__loader.require('ember-htmlbars/helpers').registerHelper;

    registerHelper('let', function letHelper(params, hash, options) {
      var isBlock = !!options.template.yield;
      // when used as a block
      if (isBlock) {
        options.template.yield(params);
      }
    });
  }

})();

