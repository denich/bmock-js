import chai from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import rewire from 'rewire';
import _ from 'lodash';

chai.use(sinonChai);

const expect = chai.expect;

describe('Config', function() {
  var config;
  var mockServer = {};

  function mockBodyParser(bodyParser) {
    config.__set__('bodyParser', bodyParser);
  }

  before(() => {
    config = rewire('../src/config');

    mockServer = {
      use: sinon.spy()
    };
  });

  it('will set default value for response directory', function() {
    expect(config().responseDir).to.be.defined;
  });

  it('will support changing of parameters', function() {
    config(mockServer, {
      customParam: 'customValue'
    });

    expect(config().customParam).to.be.equal('customValue');
  });

  describe('Request parsers', function() {
    it('will use json request parser by default', function() {
      expect(config().format.request).to.be.equal('json');
    });

    it('will add json parser if it\'s specified', function() {
      const mockJsonParser = {};

      mockBodyParser({ json: sinon.stub().returns(mockJsonParser) });

      config(mockServer);

      expect(mockServer.use).to.have.been.calledWith(mockJsonParser);
    });
  });
});
