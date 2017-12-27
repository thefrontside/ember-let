// Support for 2.15+
const { registerMacros } = Ember.__loader.require('ember-glimmer/syntax');
const { compileList } = Ember.__loader.require('@glimmer/runtime');

registerMacros(blocks => {
  blocks.add('let', (params, hash, _default, inverse, builder) => {
    compileList(params, builder);
    builder.invokeStatic(_default, params.length);
  });
});
