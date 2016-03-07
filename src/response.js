import _ from 'lodash';
const config = require('./config');
const path = require('path');
const fs = require('fs');

export default response;

function response(command, rules) {
  return (req, res) => {
    const commandName = toCommandName(command, req);

    sendResponse(res, useBaseDir(getFileName(commandName, getMark(rules, commandName, req))));
  };
}

function getMark(rules, commandName, req) {
  return getRule(rules, commandName)(req);
}

function sendResponse(res, filePath) {
  res.json(JSON.parse(fs.readFileSync(`${filePath}.json`)));
}

function getFileName(commandName, mark) {
  return mark ? `${commandName}-${mark}` : commandName;
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

function toCommandName(command, req) {
  return _.isFunction(command) ? command(req) : command;
}

function useBaseDir(fileName) {
  return path.join(config().responseDir, fileName);
}

function makeRulesSuite(rules) {
  return req => {
    let result = null;

    _.find(rules, rule => {
      result = rule(req);
      return result;
    });

    return result;
  };
}

