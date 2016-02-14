import chai from 'chai';
import matchers from '../src/matchers';

const expect = chai.expect;

describe('Matchers', () => {
  describe('count', () => {
    it('will be true if received same count array', () => {
      var arr = [1, 2, 3];

      expect(matchers.count(3)(arr)).to.be.true;
    });

    it('will be false if receive diff count array', () => {
      var arr = [1, 2];

      expect(matchers.count(3)(arr)).to.be.false;
    });
  });

  describe('in list', () => {
    it('will be true if value presents in the list', () => {
      expect(matchers.inList(['a', 'b', 'c'])('b')).to.be.true;
    });

    it('will be false if value NOT in the list', () => {
      expect(matchers.inList(['a', 'b', 'c'])('d')).to.be.false;
    });
  });

  describe('contain', () => {
    it('will be true if array contains value', () => {
      expect(matchers.contain('b')(['a', 'b', 'c'])).to.be.true;
    });

    it('will be false if array NOT contains value', () => {
      expect(matchers.contain('d')(['a', 'b', 'c'])).to.be.false;
    });
  });

  describe('equal', () => {
    it('will be true if value is the same', () => {
      expect(matchers.equal('a')('a')).to.be.true;
    });

    it('will be false if value is different', () => {
      expect(matchers.equal('a')('b')).to.be.false;
    });
  });
});