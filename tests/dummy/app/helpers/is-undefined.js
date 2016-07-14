import Ember from 'ember';

export function isUndefined([val]) {
  console.log(val);
  return val === undefined ? 'this is undefined' : 'something';
}

export default Ember.Helper.helper(isUndefined);
