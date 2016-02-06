import flow from 'lodash/function/flow';
import find from 'lodash/collection/find';
import toArray from 'lodash/lang/toArray';

export default {
  mark,
  markBy,
  suite
};

function mark(marker, getter, condition) {
  return flow(getter, condition, truthyResult(marker));
}

function markBy(getter) {
  return function(req) {
    return getter(req);
  };
}

function suite() {
  var rules = toArray(arguments);

  return function(req) {
    var result = null;

    find(rules, function(rule) {
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
