var _ = require('lodash');

module.exports = {
  mark: mark,
  suite: suite
};

function mark(marker, condition) {
  return function(req) {
    return condition(req) && marker;
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