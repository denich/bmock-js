var path = require('path');
var app = require('../server');

var bmock = require('../../index.js');
var mark = bmock.mark;
var response = bmock.response;

bmock.config(app, {
  responseDir: path.join(__dirname, './data')
});

var rules = {
  deposit: mark('error').if.queryProp('amount').equal('200'),
  purchase: mark().by.queryProp('type'),
  registration: [
    mark('error').if.queryProp('name').equal('invalid'),
    mark('unfinished').if.queryProp('hobby').equal('none')
  ]
};

app.use('/api/:command*', response(getRequestCommand, rules));

function getRequestCommand(req) {
  return req.param.command;
}
