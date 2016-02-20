import _ from 'lodash';
var getters = require('./getters');
var matchers = require('./matchers');

export default {
  mark,
  markBy,
  suite
};

function mark(marker) {
  return {
    if: getIfMark(marker)
  };
}

function curryComposeMark(marker) {
  return _.curry(composeMark)(marker);
}

function getIfMark(marker) {
  var composeMarkCurry = curryComposeMark(marker);

  return wrapGetters(_.flow(composeMarkCurry, wrapMatchers));
}

function wrapObjValues(obj, wpapper) {
  return _.mapValues(obj, (method) => {
    return _.flow(method, wpapper);
  });
}

function wrapGetters(wpapper) {
  return wrapObjValues(getters, wpapper);
}

function wrapMatchers(wpapper) {
  return wrapObjValues(matchers, wpapper);
}

function composeMark(marker, getter, condition) {
  return _.flow(getter, condition, truthyResult(marker));
}

function markBy(getter) {
  return function(req) {
    return getter(req);
  };
}

function suite() {
  var rules = _.toArray(arguments);

  return function(req) {
    var result = null;

    _.find(rules, function(rule) {
      result = rule(req);
      return result;
    });

    return result;
  };
}

function truthyResult(result) {
  return function(isTruthy) {
    return isTruthy ? result : null;
  };
}
