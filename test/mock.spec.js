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
  var mock;

  before(function() {
    mock = rewire('../src/mock');
  });

  describe('response', function() {
    var response;

    before(function() {
      response = mock.response;
    });

    function mockReadFile(readFileSync) {
      const mockFs = {
        readFileSync: readFileSync
      };

      mock.__set__('fs', mockFs);
    }

    function stubJsonRes() {
      return { json: sinon.spy() };
    }

    it('will respond with read file data', function() {
      const fileData = 'file data';
      const req = {};
      const res = stubJsonRes();
      const command = 'command';
      const rules = noop;

      mockReadFile(sinon.stub().returns(fileData));
      response(command, rules)(req, res);

      expect(res.json).to.have.been.calledWith(fileData);
    });

    it('will combine file name as command and mark', function() {
      const req = {};
      const res = stubJsonRes();
      const command = 'command';
      const rules = constant('mark');

      mockReadFile(sinon.mock().withArgs('./mock-data/command-mark.json'));

      response(command, rules)(req, res);
    });

    it('will support command name as function', function() {
      const req = { prop: 'req-value' };
      const res = stubJsonRes();
      const command = property('prop');
      const rules = noop;

      mockReadFile(sinon.mock().withArgs('./mock-data/req-value.json'));

      response(command, rules)(req, res);
    });

    it('will support rule as map of command names to rules', function() {
      const req = {};
      const res = stubJsonRes();
      const command = 'command';
      const rules = { command: constant('mark') };

      mockReadFile(sinon.mock().withArgs('./mock-data/command-mark.json'));

      response(command, rules)(req, res);
    });

  });
});
