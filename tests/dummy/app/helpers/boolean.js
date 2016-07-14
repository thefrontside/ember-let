import Ember from 'ember';

const { set, get } = Ember;

class BoolState {
  constructor(val) {
    this.value = val;
  }

  get toggle() {
    return () => {
      set(this, 'value', !get(this, 'value'));
    };
  }
}

function boolean([initialValue = false]) {
  return new BoolState(initialValue);
}

export default Ember.Helper.helper(boolean);
