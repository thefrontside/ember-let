import Ember from 'ember';
const { registerHelper } = Ember.__loader.require('ember-htmlbars/helpers');

export default {
  name: 'register-let-helper',
  initialize: function registerLetHelper() {
    registerHelper('let', function letHelper(params, hash, options) {

      let isBlock = !!options.template.yield;
      // when used as a block
      if (isBlock) {
        options.template.yield(params);
      }

      // when used inline
      if (!isBlock && this.params && this.params.length) {
        let stream;
        for (let i = 0; i < this.params.length; i++) {
          if (i % 2) {
            stream.setValue(params[i]);            
          } else {
            stream = this.params[i];            
          }
        }
      }

    });
  }
};
