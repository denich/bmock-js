import noop from 'lodash/utility/noop';
import isFunction from 'lodash/lang/isFunction';
import merge from 'lodash/object/merge';
var fs = require('fs');

var _config = {
  responseDir: './data'
};

export default {
  response: response,
  config: config
};

function config(params) {
  _config = merge(_config, params);
}

function response(command, rules) {
  return function(req, res) {
    res.json(JSON.parse(getResponse(req, toCommandName(command, req), rules)));
  };
}

function getResponse(req, commandName, rules) {
  return fs.readFileSync(getResponsePath(getFileName(commandName, rules, req)));
}

function getFileName(commandName, rules, req) {
  return commandName + makePostfix(getMark(rules, commandName, req));
}

function getMark(rules, commandName, req) {
  return getRule(rules, commandName)(req);
}

function getRule(rules, commandName) {
  if (isFunction(rules)) {
    return rules;
  }

  return rules[commandName] || noop;
}

function makePostfix(mark) {
  return mark ? '-' + mark : '';
}

function toCommandName(command, req) {
  return isFunction(command) ? command(req) : command;
}

function getResponsePath(fileName) {
  return _config.responseDir + '/' + fileName + '.json';
}

