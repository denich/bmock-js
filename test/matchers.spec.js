import chai from 'chai';
import lib from '../lib/mock-backend';

const expect = chai.expect;
var matchers;

describe('Matchers', function() {
  before(function() {
    matchers = lib.matchers;
  });

  describe('count', function() {
    it('will be true if received same count array', function() {
      var arr = [1, 2, 3];

      expect(matchers.count(3)(arr)).to.be.true;
    });

    it('will be false if receive diff count array', function() {
      var arr = [1, 2];

      expect(matchers.count(3)(arr)).to.be.false;
    });
  });

  describe('in list', function() {
    it('will be true if value presents in the list', function() {
      expect(matchers.inList(['a', 'b', 'c'])('b')).to.be.true;
    });

    it('will be false if value NOT in the list', function() {
      expect(matchers.inList(['a', 'b', 'c'])('d')).to.be.false;
    });
  });

  describe('contain', function() {
    it('will be true if array contains value', function() {
      expect(matchers.contain('b')(['a', 'b', 'c'])).to.be.true;
    });

    it('will be false if array NOT contains value', function() {
      expect(matchers.contain('d')(['a', 'b', 'c'])).to.be.false;
    });
  });

  describe('equal', function() {
    it('will be true if value is the same', function() {
      expect(matchers.equal('a')('a')).to.be.true;
    });

    it('will be false if value is different', function() {
      expect(matchers.equal('a')('b')).to.be.false;
    });
  });
});