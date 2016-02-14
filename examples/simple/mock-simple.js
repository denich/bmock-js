var express = require('express');
var bodyParser = require('body-parser');
var bmock = require('../../index.js');
var path = require('path');

var app = express();

app.use(bodyParser.json());

bmock.config({
  responseDir: path.join(__dirname, './data')
});

var rules = {
  deposit: bmock.mark('error').if.queryProp('amount').equal('200'),
  purchase: bmock.mark().by.queryProp('type'),
  registration: [
    bmock.mark('error').if.queryProp('name').equal('invalid'),
    bmock.mark('unfinished').if.queryProp('hobby').equal('none')
  ]
};

app.use('/api/v2/:command*', bmock.response(bmock.getters.param('command'), rules));
app.use('/api/v1/validate', bmock.response('validate', bmock.mark('error').if.queryProp('valid').equal('false')));

app.listen(5000);
