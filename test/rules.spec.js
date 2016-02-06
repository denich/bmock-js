import chai from 'chai';
import spies from 'chai-spies';
import lib from '../lib/mock-backend';
import identity from 'lodash/utility/identity';
import constant from 'lodash/utility/constant';

chai.expect();
chai.use(spies);

const expect = chai.expect;
var rules;

describe('Rules', function() {
  before(function() {
    rules = lib.rules;
  });

  describe('mark', function() {
    var mark;

    before(function() {
      mark = rules.mark;
    });

    it('will pass getter result to the condition', function() {
      var condition = chai.spy();
      var value = 'value';
      var sut = mark('whatever', req => req.prop, condition);

      sut({ prop: value });

      expect(condition).to.have.been.called.with(value);
    });

    it('will return marker if condition returns truthy', function() {
      var marker = 'marker';
      var req = {};

      var sut = mark(marker, identity, constant(true));

      expect(sut(req)).to.be.equal(marker);
    });

    it('will return null if condition returns falsy', function() {
      const req = {};

      const sut = mark('marker', identity, constant(false));

      expect(sut(req)).to.be.null;
    });
  });

  describe('mark by', function() {
    var markBy;

    before(function() {
      markBy = rules.markBy;
    });

    it('will return getter result', function() {
      var value = 'value';
      var req = {
        prop: value
      };

      var sut = markBy(r => r.prop)(req);

      expect(sut).to.be.equal(value);
    });
  });

  describe('suite', function() {
    var suite;

    before(function() {
      suite = rules.suite;
    });

    it('will return result of first matched rules', function() {
      var rule1 = constant(null);
      var rule2 = constant('marker2');
      var rule3 = constant('marker3');
      var req = {};

      var sut = suite(rule1, rule2, rule3);

      expect(sut(req)).to.be.equal('marker2');
    });
  });
});
