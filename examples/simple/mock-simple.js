var path = require('path');
var app = require('../server');

var bmock = require('../../index.js');
var mark = bmock.mark;
var response = bmock.response;

bmock.config({
  responseDir: path.join(__dirname, './data')
});

app.use('/api/validate', response('validate', mark('error').if.queryProp('valid').equal('false')));
