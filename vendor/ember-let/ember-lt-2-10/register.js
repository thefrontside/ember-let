const { registerHelper } = Ember.__loader.require('ember-htmlbars/helpers');

registerHelper('let', function letHelper(params, hash, options) {
  let isBlock = !!options.template.yield;

  // when used as a block
  if (isBlock) {
    options.template.yield(params);
  }
});
