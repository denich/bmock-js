import chai from 'chai';

const expect = chai.expect;

describe('Config', function() {
  var config;

  before(function() {
    config = require('../src/config');
  });

  it('will set default value for response directory', function() {
    expect(config().responseDir).to.be.defined;
  });

  it('will support changing of parameters', function() {
    config({
      customParam: 'customValue'
    });

    expect(config().customParam).to.be.equal('customValue');
  });
});
