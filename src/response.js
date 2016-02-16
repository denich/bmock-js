import _ from 'lodash';
var config = require('./config');
var path = require('path');
var fs = require('fs');

export default {
  response: response
};

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
  if (_.isFunction(rules)) {
    return rules;
  }

  return rules[commandName] || _.noop;
}

function makePostfix(mark) {
  return mark ? '-' + mark : '';
}

function toCommandName(command, req) {
  return _.isFunction(command) ? command(req) : command;
}

function getResponsePath(fileName) {
  return path.join(config().responseDir, fileName + '.json');
}

