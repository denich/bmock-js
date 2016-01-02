var _ = require('lodash');

module.exports = {
  mark: mark,
  markBy: markBy,
  suite: suite
};

function mark(marker, getter, condition) {
  return _.flow(getter, condition || _.identity, truthyResult(marker));
}

function markBy(getter) {
  return function(req) {
    return getter(req);
  };
}

function suite() {
  var matchers = _.toArray(arguments);

  return function(req) {
    var result = null;

    _.find(matchers, function(matcher) {
      result = matcher(req);
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
