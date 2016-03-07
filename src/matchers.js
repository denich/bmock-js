import _ from 'lodash';

export default {
  inList,
  contain,
  equal,
  count
};

function count(value) {
  return _.flow(_.size, equal(value));
}

function inList(valueArray) {
  return _.partial(_.includes, valueArray);
}

function contain(value) {
  return _.partialRight(_.includes, value);
}

function equal(value) {
  return _.partial(_.isEqual, value);
}
