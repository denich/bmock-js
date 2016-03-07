import _ from 'lodash';
const getters = require('./getters');
const matchers = require('./matchers');

export default mark;

function mark(marker) {
  return {
    if: getIfMark(marker),
    by: getByMark()
  };
}

function getByMark() {
  return getters;
}

function getIfMark(marker) {
  return wrapGetters(_.flow(curryComposeMark(marker), wrapMatchers));
}

function curryComposeMark(marker) {
  return _.curry(composeMark)(marker);
}

function wrapGetters(wpapper) {
  return wrapObjValues(getters, wpapper);
}

function wrapMatchers(wpapper) {
  return wrapObjValues(matchers, wpapper);
}

function wrapObjValues(obj, wpapper) {
  return _.mapValues(obj, (method) => _.flow(method, wpapper));
}

function composeMark(marker, getter, condition) {
  return _.flow(getter, condition, truthyResult(marker));
}

function truthyResult(result) {
  return isTruthy => isTruthy ? result : null;
}
