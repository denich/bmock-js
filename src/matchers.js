import size from 'lodash/collection/size';
import includes from 'lodash/collection/includes';
import flow from 'lodash/function/flow';
import partial from 'lodash/function/partial';
import partialRight from 'lodash/function/partialRight';
import isEqual from 'lodash/lang/isEqual';

export default {
  inList,
  contain,
  equal,
  count
};

function count(value) {
  return flow(size, equal(value));
}

function inList(valueArray) {
  return partial(includes, valueArray);
}

function contain(value) {
  return partialRight(includes, value);
}

function equal(value) {
  return partial(isEqual, value);
}
