var _ = require('lodash');

module.exports = {
  inList: inList,
  contain: contain,
  compare: compare,
  count: count
};

function count(value) {
  return _.flow(_.property('length'), compare(value));
}

function inList(valueArray) {
  return _.partial(_.includes, valueArray);
}

function contain(value) {
  return _.partial(_.includes, _, value);
}

function compare(value) {
  return _.partial(_.isEqual, value);
}
