/* jshint expr:true */
import { expect } from 'chai';
import {
  describeComponent,
  it
} from 'ember-mocha';
import hbs from 'htmlbars-inline-precompile';
import emberVersionIs from 'ember-version-is';

import LetHelperInitializer from 'ember-let/initializers/register-let-helper';

LetHelperInitializer.initialize();

describeComponent('let', 'Integration: let helper', { 
  integration: true 
},
  function() {

    if (emberVersionIs('lessThan', "2.0.0")) {
      return ;
    }

    it('does not mutate the context', function(){
      this.set('name', 'Alice');
      this.render(hbs`{{let name "Bob"}}`);
      expect(this.get('name')).to.eq('Alice');
    });

    it('works correctly in a loop', function(){
      this.set('pets', [{ type: 'cat' }, { type: 'dog' }, { type: 'pig' }]);
      this.render(hbs`
        <span class="before">{{type}}</span>
        {{#each pets as |pet|}}
          {{let type pet.type}}
          <span class="item">{{type}}</span>
        {{/each}}
        <span class="after">{{type}}</span>
      `);

      expect(this.$('.before').text()).to.eq('');
      expect(this.$('.after').text()).to.eq('');
      expect(this.$('.item').text()).to.eq('catdogpig');
    });

    it('creates bindings in parallel', function(){
      this.set('pets', [{ type: 'cat' }, { type: 'dog' }, { type: 'pig' }]);
      this.render(hbs`
        {{let a 'a' b 'b'}}
        <span class="before">{{a}} {{b}}</span>
        {{let a 'A' b 'B' c (concat a b)}}
        <span class="after">{{a}} {{b}} {{c}}</span>
      `);

      expect(this.$('.before').text()).to.eq('a b');
      expect(this.$('.after').text()).to.eq('A B ab');
    });
  }
);
