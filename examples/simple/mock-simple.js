var express = require('express');
var bodyParser = require('body-parser');
var mockBackend = require('../../lib/mock-backend');
var path = require('path');

var mock = mockBackend.mock;
var g = mockBackend.getters;
var r = mockBackend.rules;
var m = mockBackend.matchers;

var app = express();

app.use(bodyParser.json());

mock.config({
  responseDir: path.join(__dirname, './data')
});

var rules = {
  deposit: r.mark('error', g.queryProp('amount'), m.equal('200'))
};

app.use('/api/v1/purchase', mock.response('purchase', r.mark('bonus', g.queryProp('count'), m.equal('2'))));
app.use('/api/v2/:command*', mock.response(g.param('command'), rules));

app.listen(5000);
