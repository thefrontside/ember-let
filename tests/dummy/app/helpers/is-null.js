import Ember from 'ember';

export function isNull([val]) {
  return val === null ? 'this is null' : 'something';
}

export default Ember.Helper.helper(isNull);
