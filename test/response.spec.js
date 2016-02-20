import chai from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import rewire from 'rewire';

import _ from 'lodash';

chai.use(sinonChai);

const expect = chai.expect;

describe('response', () => {
  var response;
  var fileData;
  var res;

  before(() => {
    response = rewire('../src/response');
    fileData = { response: 'response' };
    res = stubJsonRes();
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

  it('will respond with read file data', () => {
    const req = {};
    const command = 'command';
    const rules = _.noop;

    mockReadFile(sinon.stub());
    response(command, rules)(req, res);
    expect(res.json).to.have.been.calledWith(fileData);
  });

  it('will use config base directory for file path', () => {
    const req = {};
    const command = 'command';
    const rules = _.constant('mark');

    response.__set__('config', sinon.stub().returns({ responseDir: 'responseDir' }));
    mockReadFile(sinon.mock().withArgs(sinon.match('responseDir')));

    response(command, rules)(req, res);
  });

  it('will combine file name as command and mark', () => {
    const req = {};
    const command = 'command';
    const rules = _.constant('mark');

    mockReadFile(sinon.mock().withArgs(sinon.match('command-mark.json')));

    response(command, rules)(req, res);
  });

  it('will support command name as function', () => {
    const req = { prop: 'req-value' };
    const command = _.property('prop');
    const rules = _.noop;

    mockReadFile(sinon.mock().withArgs(sinon.match('req-value.json')));

    response(command, rules)(req, res);
  });

  it('will support rule as map of command names to rules', () => {
    const req = {};
    const command = 'command';
    const rules = { command: _.constant('mark') };

    mockReadFile(sinon.mock().withArgs(sinon.match('command-mark.json')));

    response(command, rules)(req, res);
  });

  it('will return result of first matched rules', () => {
    const req = {};
    const command = 'command';
    const rules = { command: _.constant('mark') };

    mockReadFile(sinon.mock().withArgs(sinon.match('command-mark.json')));

    response(command, rules)(req, res);
  });

  it('will support rules suite usage', () => {
    const rules = [_._.constant(null), _._.constant('marker2'), _._.constant('marker3')];
    const req = {};
    const command = 'command';

    mockReadFile(sinon.mock().withArgs(sinon.match('marker2.json')));

    response(command, rules)(req, res);
  });
});
