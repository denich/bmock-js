import chai from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import constant from 'lodash/utility/constant';
import rewire from 'rewire';

import noop from 'lodash/utility/noop';
import property from 'lodash/utility/property';

chai.use(sinonChai);

const expect = chai.expect;

describe('Mock', function() {
  var response;

  before(function() {
    response = rewire('../src/response');
  });

  describe('response', function() {
    var fileData;

    before(function() {
      fileData = { response: 'response' };
    });

    function mockReadFile(readFileSync) {
      const mockFs = {
        readFileSync: readFileSync.returns(JSON.stringify(fileData))
      };

      response.__set__('fs', mockFs);
    }

    function stubJsonRes() {
      return { json: sinon.spy() };
    }

    it('will respond with read file data', function() {
      const req = {};
      const res = stubJsonRes();
      const command = 'command';
      const rules = noop;

      mockReadFile(sinon.stub());
      response.response(command, rules)(req, res);
      expect(res.json).to.have.been.calledWith(fileData);
    });

    it('will use config base directory for file path', function() {
      const req = {};
      const res = stubJsonRes();
      const command = 'command';
      const rules = constant('mark');

      response.__set__('config', sinon.stub().returns({ responseDir: 'responseDir' }));
      mockReadFile(sinon.mock().withArgs(sinon.match('responseDir')));

      response.response(command, rules)(req, res);
    });

    it('will combine file name as command and mark', function() {
      const req = {};
      const res = stubJsonRes();
      const command = 'command';
      const rules = constant('mark');

      mockReadFile(sinon.mock().withArgs(sinon.match('command-mark.json')));

      response.response(command, rules)(req, res);
    });

    it('will support command name as function', function() {
      const req = { prop: 'req-value' };
      const res = stubJsonRes();
      const command = property('prop');
      const rules = noop;

      mockReadFile(sinon.mock().withArgs(sinon.match('req-value.json')));

      response.response(command, rules)(req, res);
    });

    it('will support rule as map of command names to rules', function() {
      const req = {};
      const res = stubJsonRes();
      const command = 'command';
      const rules = { command: constant('mark') };

      mockReadFile(sinon.mock().withArgs(sinon.match('command-mark.json')));

      response.response(command, rules)(req, res);
    });
  });
});
