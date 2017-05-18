import Ember from 'ember';

if (Ember.__loader.registry['ember-glimmer/syntax']) {
  const { registerMacros } = Ember.__loader.require('ember-glimmer/syntax');

  if (registerMacros) {
    // Support for >= 2.13.0.
    const { compileArgs } = Ember.__loader.require('@glimmer/runtime');

    registerMacros(blocks => {
      blocks.add('let', (sexp, builder) => {
        let [,, params, hash, _default] = sexp;
        let args = compileArgs(params, hash, builder);

        builder.putArgs(args);

        builder.labelled(null, b => {
          b.evaluate(_default);
        });
      });
    });
  } else {
    // Support for < 2.13.0.
    const { registerSyntax } = Ember.__loader.require('ember-glimmer');
    const { StatementSyntax } = Ember.__loader.require('glimmer-runtime');

    class LetSyntax extends StatementSyntax {
      static create(environment, args, templates) {
        return new this(args, templates);
      }

      constructor(args, templates) {
        super();
        this.args = args;
        this.templates = templates;
      }

      compile(dsl) {
        let args = this.args;

        // added just before 2.10.0 final in https://github.com/tildeio/glimmer/pull/349
        if (args.blocks) {
          let blocks = args.blocks;

          dsl.putArgs(args);

          dsl.block(null, dsl => {
            dsl.evaluate('default', blocks.default);
          });
        } else {
          // supports 2.9.0-beta.1 - 2.9.0.beta.5, 2.10.0-beta.1 - 2.10.0-beta.4
          dsl.block({ templates: this.templates, args: args }, dsl => {
            dsl.evaluate('default');
          });
        }
      }
    }

    registerSyntax('let', LetSyntax);
  }
} else if (Ember.__loader.registry['ember-htmlbars/helpers']) {
  const { registerHelper } = Ember.__loader.require('ember-htmlbars/helpers');

  registerHelper('let', function letHelper(params, hash, options) {
    let isBlock = !!options.template.yield;
    // when used as a block
    if (isBlock) {
      options.template.yield(params);
    }
  });
}
