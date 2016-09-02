import Ember from 'ember';

if (Ember.__loader.registry['ember-glimmer/syntax']) {
  let { registerSyntax } = Ember.__loader.require('ember-glimmer');
  let { StatementSyntax } = Ember.__loader.require('glimmer-runtime');

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
      let { args, templates } = this;

      dsl.block({ templates, args }, (dsl) => {
        dsl.evaluate('default');
      });
    }
  }

  registerSyntax('let', LetSyntax);
} else if (Ember.__loader.registry['ember-htmlbars/helpers']) {
  let { registerHelper } = Ember.__loader.require('ember-htmlbars/helpers');

  registerHelper('let', function letHelper(params, hash, options) {
    let isBlock = !!options.template.yield;
    // when used as a block
    if (isBlock) {
      options.template.yield(params);
    }
  });
}

export default {
  name: 'register-let-helper',

  // registration is done once at module eval time
  // no need to do anything per-application boot
  initialize() { }
};
