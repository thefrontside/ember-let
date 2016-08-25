import Ember from 'ember';
const { registerHelper } = Ember.__loader.require('ember-htmlbars/helpers');

export default {
  name: 'register-let-helper',
  initialize: function registerLetHelper() {
    registerHelper('let', function letHelper(params, hash, options) {

      // when used as a block
      if (options.template.yield) {
        options.template.yield(params);
      }

      // when used inline
      if (this.params.length === 2) {
        let [stream] = this.params;
        let [,value] = params;

        if (stream && stream.path) {
          stream.setValue(value);
        }
      }
    });
  }
};
