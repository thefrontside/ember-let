/* jshint expr:true */
import { expect } from 'chai';
import {
  describeComponent,
  it
} from 'ember-mocha';
import hbs from 'htmlbars-inline-precompile';

import LetHelperInitializer from 'ember-let/initializers/register-let-helper';

LetHelperInitializer.initialize();

describeComponent('let', 'Integration: let helper', { 
  integration: true 
},
  function() {
    
    it('throws an error when path and value are not specified', function() {
      let render = () => this.render(hbs`{{let}}`);
      expect(render).to.throw(/let helper requires at least one path and one value/);
    });

    it('throws an error when a path is not a stream', function(){
      let render = () => this.render(hbs`{{let "bad" path}}`);
      expect(render).to.throw(/let helper expects path to be quoteless - got bad instead/);
    });
  }
);
