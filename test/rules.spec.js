import chai from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import rewire from 'rewire';
import _ from 'lodash';

chai.use(sinonChai);

const expect = chai.expect;

describe('mark', () => {
  let mark;

  function mockGetters(getters) {
    mark.__set__('getters', getters);
  }

  function mockMatchers(matchers) {
    mark.__set__('matchers', matchers);
  }

  before(() => {
    mark = rewire('../src/mark');
  });

  describe('if', () => {
    it('will return a function', () => {
      mockGetters({
        mockGetter: sinon.stub().returns(_.noop)
      });

      mockMatchers({
        mockMatcher: sinon.stub().returns(_.noop)
      });

      expect(mark('val').if.mockGetter('any').mockMatcher('any')).to.be.instanceof(Function);
    });

    describe('execution', () => {
      it('will pass execution param to getter', () => {
        const getter = sinon.spy();

        mockGetters({
          mockGetter: sinon.stub().returns(getter)
        });

        mockMatchers({
          mockMatcher: sinon.stub().returns(_.noop)
        });

        const sut = mark('any').if.mockGetter().mockMatcher();
        const param = {};

        sut(param);

        expect(getter).to.have.been.calledWith(param);
      });

      it('will pass getter result to the matcher', () => {
        const matcher = sinon.spy();

        mockGetters({
          mockGetter: sinon.stub().returns(_.constant('getterResult'))
        });

        mockMatchers({
          mockMatcher: sinon.stub().returns(matcher)
        });

        const sut = mark('any').if.mockGetter().mockMatcher();

        sut();

        expect(matcher).to.have.been.calledWith('getterResult');
      });

      it('will return marker if matcher returns truthy', () => {
        mockGetters({
          mockGetter: sinon.stub().returns(_.noop)
        });

        mockMatchers({
          mockMatcher: sinon.stub().returns(sinon.stub().returns(true))
        });

        const sut = mark('marker').if.mockGetter().mockMatcher();

        const result = sut();

        expect(result).to.be.equal('marker');
      });

      it('will return null if condition returns falsy', () => {
        mockGetters({
          mockGetter: sinon.stub().returns(_.noop)
        });

        mockMatchers({
          mockMatcher: sinon.stub().returns(sinon.stub().returns(false))
        });

        const sut = mark('marker').if.mockGetter().mockMatcher();

        const result = sut();

        expect(result).to.be.null;
      });
    });
  });

  describe('by', () => {
    it('will return a function', () => {
      mockGetters({
        mockGetter: sinon.stub().returns(_.noop)
      });

      const sut = mark().by.mockGetter('any');

      expect(sut).to.be.instanceof(Function);
    });

    describe('execution', () => {
      it('will pass param to getter', () => {
        const param = {};
        const getter = sinon.spy();

        mockGetters({
          mockGetter: sinon.stub().returns(getter)
        });

        const sut = mark().by.mockGetter('any');

        sut(param);

        expect(getter).to.have.been.calledWith(param);
      });

      it('will return getter result', () => {
        const value = 'value';

        mockGetters({
          mockGetter: sinon.stub().returns(_.constant(value))
        });

        const sut = mark().by.mockGetter();

        expect(sut()).to.be.equal('value');
      });
    });
  });
});
