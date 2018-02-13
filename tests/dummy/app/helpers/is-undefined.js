import { helper } from '@ember/component/helper';

export function isUndefined([val]) {
  return val === undefined ? 'this is undefined' : 'something';
}

export default helper(isUndefined);
