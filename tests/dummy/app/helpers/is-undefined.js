import Ember from 'ember';

export function isUndefined([val]) {
  return val === undefined ? 'this is undefined' : 'something';
}

export default Ember.Helper.helper(isUndefined);
