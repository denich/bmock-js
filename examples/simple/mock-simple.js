var path = require('path');
var app = require('../server');
var b = require('../../index.js');

b.config(app, {
  responseDir: path.join(__dirname, './data')
});

app.use('/api/validate', b.response('validate', b.mark('error').if.queryProp('valid').equal('false')));
app.use('/api/purchase', b.response('purchase'));
