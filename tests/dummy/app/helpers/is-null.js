import { helper } from '@ember/component/helper';

export function isNull([val]) {
  return val === null ? 'this is null' : 'something';
}

export default helper(isNull);
