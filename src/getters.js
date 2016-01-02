var _ = require('lodash');

module.exports = {
  bodyProp: bodyProp,
  queryProp: queryProp
};

function bodyProp(propPath) {
  return _.flow(_.property('body'), _.property(propPath));
}

function queryProp(propPath) {
  return _.flow(_.property('query'), _.property(propPath));
}
