import { memoize as _memoize } from 'lodash';

export function memoize() {
  return function(target, key, descriptor) {
    descriptor.value = _memoize(descriptor.value);
    return descriptor;
  };
}
