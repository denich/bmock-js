var _ = require('lodash');

module.exports = {
  bodyProp: bodyProp,
  queryProp: queryProp
};

function bodyProp(propPath, condition) {
  return _.flow(_.property('body'), _.property(propPath), condition);
}

function queryProp(propPath, condition) {
  return _.flow(_.property('query'), _.property(propPath), condition);
}
