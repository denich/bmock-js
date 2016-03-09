var path = require('path');
var app = require('../server');
var b = require('../../index.js');

b.config(app, {
  responseDir: path.join(__dirname, './data')
});

var rules = {
  deposit: b.mark('error').if.queryProp('amount').equal('200'),
  purchase: b.mark().by.queryProp('type'),
  registration: [
    b.mark('error').if.queryProp('name').equal('invalid'),
    b.mark('unfinished').if.queryProp('hobby').equal('none')
  ]
};

app.use('/api/:command*', b.response(getRequestCommand, rules));

function getRequestCommand(req) {
  return req.param.command;
}
