import chai from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import rules from '../src/rules';
import identity from 'lodash/utility/identity';
import constant from 'lodash/utility/constant';

chai.use(sinonChai);

const expect = chai.expect;

describe('Rules', () => {
  describe('mark', () => {
    var mark;

    before(() => {
      mark = rules.mark;
    });

    it('will pass getter result to the condition', () => {
      var condition = sinon.spy();
      var value = 'value';
      var sut = mark('whatever', req => req.prop, condition);

      sut({ prop: value });

      expect(condition).to.have.been.calledWith(value);
    });

    it('will return marker if condition returns truthy', () => {
      var marker = 'marker';
      var req = {};

      var sut = mark(marker, identity, constant(true));

      expect(sut(req)).to.be.equal(marker);
    });

    it('will return null if condition returns falsy', () => {
      const req = {};

      const sut = mark('marker', identity, constant(false));

      expect(sut(req)).to.be.null;
    });
  });

  describe('mark by', () => {
    var markBy;

    before(() => {
      markBy = rules.markBy;
    });

    it('will return getter result', () => {
      var value = 'value';
      var req = {
        prop: value
      };

      var sut = markBy(r => r.prop)(req);

      expect(sut).to.be.equal(value);
    });
  });

  describe('suite', () => {
    var suite;

    before(() => {
      suite = rules.suite;
    });

    it('will return result of first matched rules', () => {
      var rule1 = constant(null);
      var rule2 = constant('marker2');
      var rule3 = constant('marker3');
      var req = {};

      var sut = suite(rule1, rule2, rule3);

      expect(sut(req)).to.be.equal('marker2');
    });
  });
});
