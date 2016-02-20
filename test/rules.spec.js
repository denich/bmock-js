import chai from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import rewire from 'rewire';
import _ from 'lodash';

chai.use(sinonChai);

const expect = chai.expect;

describe('mark', function() {
  var mark;

  function mockGetters(getters) {
    mark.__set__('getters', getters);
  }

  function mockMatchers(matchers) {
    mark.__set__('matchers', matchers);
  }

  before(() => {
    mark = rewire('../src/rules');
  });

  describe('if', () => {

    it('will return a function', function() {
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
        var getter = sinon.spy();

        mockGetters({
          mockGetter: sinon.stub().returns(getter)
        });

        mockMatchers({
          mockMatcher: sinon.stub().returns(_.noop)
        });

        var sut = mark('any').if.mockGetter().mockMatcher();
        var param = {};

        sut(param);

        expect(getter).to.have.been.calledWith(param);
      });

      it('will pass getter result to the matcher', () => {
        var matcher = sinon.spy();

        mockGetters({
          mockGetter: sinon.stub().returns(_.constant('getterResult'))
        });

        mockMatchers({
          mockMatcher: sinon.stub().returns(matcher)
        });

        var sut = mark('any').if.mockGetter().mockMatcher();

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

        var sut = mark('marker').if.mockGetter().mockMatcher();

        var result = sut();

        expect(result).to.be.equal('marker');
      });

      it('will return null if condition returns falsy', () => {
        mockGetters({
          mockGetter: sinon.stub().returns(_.noop)
        });

        mockMatchers({
          mockMatcher: sinon.stub().returns(sinon.stub().returns(false))
        });

        var sut = mark('marker').if.mockGetter().mockMatcher();

        var result = sut();

        expect(result).to.be.null;
      });
    });
  });

  describe('by', () => {

    it('will return a function', function() {
      mockGetters({
        mockGetter: sinon.stub().returns(_.noop)
      });

      var sut = mark().by.mockGetter('any');

      expect(sut).to.be.instanceof(Function);
    });

    describe('execution', function() {
      it('will pass param to getter', () => {
        var param = {};
        var getter = sinon.spy();

        mockGetters({
          mockGetter: sinon.stub().returns(getter)
        });

        var sut = mark().by.mockGetter('any');

        sut(param);

        expect(getter).to.have.been.calledWith(param);
      });

      it('will return getter result', () => {
        var value = 'value';

        mockGetters({
          mockGetter: sinon.stub().returns(_.constant(value))
        });

        var sut = mark().by.mockGetter();

        expect(sut()).to.be.equal('value');
      });
    });
  });

});
