import Ember from 'ember';
import RegisterLetHelperInitializer from 'dummy/initializers/register-let-helper';
import { module, test } from 'qunit';

let application;

module('Unit | Initializer | register let helper', {
  beforeEach() {
    Ember.run(function() {
      application = Ember.Application.create();
      application.deferReadiness();
    });
  }
});

// Replace this with your real tests.
test('it works', function(assert) {
  RegisterLetHelperInitializer.initialize(application);

  // you would normally confirm the results of the initializer here
  assert.ok(true);
});
