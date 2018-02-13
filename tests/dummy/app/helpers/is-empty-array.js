import { helper } from '@ember/component/helper';

export function isEmptyArray([val]) {
  return (Array.isArray(val) && val.length === 0) ? 'this is an empty array' : 'something';
}

export default helper(isEmptyArray);
