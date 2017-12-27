// Support for 2.13 - 2.14
const { registerMacros } = Ember.__loader.require('ember-glimmer/syntax');
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
