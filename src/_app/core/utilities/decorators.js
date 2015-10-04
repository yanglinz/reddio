import { memoize as _memoize, once as _once } from 'lodash';

export function memoize() {
  return function(target, key, descriptor) {
    descriptor.value = _memoize(descriptor.value);
    return descriptor;
  };
}

export function once() {
  return function(target, key, descriptor) {
    descriptor.value = _once(descriptor.value);
    return descriptor;
  };
}
