import Ember from 'ember';

export function isEmptyArray([val]) {
  return (Array.isArray(val) && val.length === 0) ? 'this is an empty array' : 'something';
}

export default Ember.Helper.helper(isEmptyArray);
