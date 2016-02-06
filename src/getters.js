import property from 'lodash/utility/property';
import flow from 'lodash/function/flow';

export default {
  bodyProp: bodyProp,
  queryProp: queryProp,
  param: param
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
