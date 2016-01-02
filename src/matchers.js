var _ = require('lodash');

module.exports = {
  inList: inList,
  contain: contain,
  equal: equal,
  count: count
};

function count(value) {
  return _.flow(_.size, equal(value));
}

function inList(valueArray) {
  return _.partial(_.includes, valueArray);
}

function contain(value) {
  return _.partial(_.includes, _, value);
}

function equal(value) {
  return _.partial(_.isEqual, value);
}
