import { helper } from '@ember/component/helper';
import { get, set } from '@ember/object';

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

export default helper(boolean);
