import _ from 'lodash';
var config = require('./config');
var path = require('path');
var fs = require('fs');

export default response;

function response(command, rules) {
  return (req, res) => {
    var commandName = toCommandName(command, req);

    sendResponse(res, useBaseDir(getFileName(commandName, getMark(rules, commandName, req))));
  };
}

function getMark(rules, commandName, req) {
  return getRule(rules, commandName)(req);
}

function sendResponse(res, path) {
  res.json(JSON.parse(fs.readFileSync(path + '.json')));
}

function getFileName(commandName, mark) {
  return commandName + makePostfix(mark);
}

function getRule(rules, commandName) {
  if (_.isUndefined(rules)) {
    return _.noop;
  }

  if (_.isFunction(rules)) {
    return rules;
  }

  if (_.isArray(rules)) {
    return makeRulesSuite(rules);
  }

  return rules[commandName] || _.noop;
}

function makePostfix(mark) {
  return mark ? '-' + mark : '';
}

function toCommandName(command, req) {
  return _.isFunction(command) ? command(req) : command;
}

function useBaseDir(fileName) {
  return path.join(config().responseDir, fileName);
}

function makeRulesSuite(rules) {
  return function(req) {
    var result = null;

    _.find(rules, function(rule) {
      result = rule(req);
      return result;
    });

    return result;
  };
}

