import Ember from 'ember';
const { registerHelper } = Ember.__loader.require('ember-htmlbars/helpers');
import isStream from '../-private/is-stream';

const {
  assert
} = Ember;

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
      if (!isBlock && this.params) {
        if (this.params.length < 2) {
          assert('let helper requires at least one path and one value', this.params.length > 2);
        }
        let stream;
        for (let i = 0; i < this.params.length; i++) {
          if (i % 2) {
            assert(`let helper expects path to be quoteless - got ${stream} instead`, isStream(stream));
            stream.setValue(params[i]);
           } else {
            stream = this.params[i];            
          }
        }
      }

    });
  }
};
