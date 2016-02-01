const size = require('lodash/collection/size');
const includes = require('lodash/collection/includes');
const flow = require('lodash/function/flow');
const partial = require('lodash/function/partial');
const partialRight = require('lodash/function/partialRight');
const isEqual = require('lodash/lang/isEqual');

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
