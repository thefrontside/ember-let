// Support for 2.10 - 2.12
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
