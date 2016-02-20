var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');

var bmock = require('../../index.js');
var mark = bmock.mark;
var response = bmock.response;

var app = express();

app.use(bodyParser.json());

bmock.config({
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

app.use('/api/v2/:command*', response(bmock.getters.param('command'), rules));
app.use('/api/v1/validate', response('validate', mark('error').if.queryProp('valid').equal('false')));

app.listen(5000);
