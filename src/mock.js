import noop from 'lodash/utility/noop';
import isFunction from 'lodash/lang/isFunction';
var fs = require('fs');

var BASE_RESPONSE_DIR = './mock-data';

export default {
  response: response
};

function response(command, rules) {
  return function(req, res) {
    res.json(getResponse(req, toCommandName(command, req), rules));
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
  return BASE_RESPONSE_DIR + '/' + fileName + '.json';
}

