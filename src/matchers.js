var _ = require('lodash');

module.exports = {
  queryCompare: queryCompare,
  bodyCompare: bodyCompare,
  queryContain: queryContain,
  bodyContain: bodyContain,
  queryInList: queryInList,
  bodyInList: bodyInList,
  bodyLength: bodyLength
};

function queryCompare(propPath, value) {
  return _.flow(query(), propCompare(propPath, value));
}

function queryContain(propPath, value) {
  return _.flow(query(), propContain(propPath, value));
}

function queryInList(propPath, valueArray) {
  return _.flow(query(), propInList(propPath, valueArray));
}

function bodyInList(propPath, valueArray) {
  return _.flow(body(), propInList(propPath, valueArray));
}

function bodyCompare(propPath, value) {
  return _.flow(body(), propCompare(propPath, value));
}

function bodyContain(propPath, value) {
  return _.flow(body(), propContain(propPath, value));
}

function bodyLength(propPath, length) {
  return _.flow(body(), propLength(propPath, length));
}

function propCompare(propPath, value) {
  return _.flow(_.property(propPath), compare(value));
}

function propContain(propPath, value) {
  return _.flow(_.property(propPath), contain(value));
}

function propInList(propPath, valueArray) {
  return _.flow(_.property(propPath), inList(valueArray));
}

function propLength(propPath, length) {
  return _.flow(_.property(propPath), _.property('length'), compare(length));
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

function body() {
  return _.property('body');
}

function query() {
  return _.property('query');
}

