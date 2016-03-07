import property from 'lodash/property';
import flow from 'lodash/flow';

export default {
  bodyProp,
  queryProp,
  param
};

function bodyProp(propPath) {
  return flow(property('body'), property(propPath));
}

function queryProp(propPath) {
  return flow(property('query'), property(propPath));
}

function param(paramName) {
  return flow(property('params'), property(paramName));
}
