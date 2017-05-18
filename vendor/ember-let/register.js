/* global require */
(function() {

  var Ember = require('ember').default;

  if (Ember.__loader.registry['ember-glimmer/syntax']) {
    var registerMacros = Ember.__loader.require('ember-glimmer/syntax').registerMacros;

    if (registerMacros) {
      // Support for >= 2.13.0.
      var compileArgs = Ember.__loader.require('@glimmer/runtime').compileArgs;

      registerMacros(function(blocks) {
        blocks.add('let', function(sexp, builder) {
          var params = sexp[2];
          var hash = sexp[3];
          var _default = sexp[4];
          var args = compileArgs(params, hash, builder);

          builder.putArgs(args);

          builder.labelled(null, function(b) {
            b.evaluate(_default);
          });
        });
      });
    } else {
      // Support for < 2.13.0.
      var registerSyntax = Ember.__loader.require('ember-glimmer').registerSyntax;
      var StatementSyntax = Ember.__loader.require('glimmer-runtime').StatementSyntax;

      function LetSyntax(args, templates) {
        StatementSyntax.call(this);

        this.args = args;
        this.templates = templates;
      }

      LetSyntax.prototype.compile = function LetSyntax_compile(dsl) {
        var args = this.args;

        // added just before 2.10.0 final in https://github.com/tildeio/glimmer/pull/349
        if (args.blocks) {
          var blocks = args.blocks;

          dsl.putArgs(args);

          dsl.block(null, function(dsl) {
            dsl.evaluate('default', blocks.default);
          });
        } else {
          // supports 2.9.0-beta.1 - 2.9.0.beta.5, 2.10.0-beta.1 - 2.10.0-beta.4
          dsl.block({ templates: this.templates, args: args }, function(dsl) {
            dsl.evaluate('default');
          });
        }
      };

      LetSyntax.create = function(environment, args, templates) {
        return new this(args, templates);
      };

      registerSyntax('let', LetSyntax);
    }
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
