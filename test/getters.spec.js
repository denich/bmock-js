import chai from 'chai';
import getters from '../src/getters';

const expect = chai.expect;

describe('Getters', () => {
  describe('body property', () => {
    it('will return req body property value', () => {
      const req = {
        body: {
          prop: 'value'
        }
      };

      expect(getters.bodyProp('prop')(req)).to.be.equal('value');
    });
  });

  describe('query property', () => {
    it('will return query property value', () => {
      const req = {
        query: {
          prop: 'value'
        }
      };

      expect(getters.queryProp('prop')(req)).to.be.equal('value');
    });
  });

  describe('parameter', () => {
    it('will return parameter value', () => {
      const req = {
        params: {
          name: 'value'
        }
      };

      expect(getters.param('name')(req)).to.be.equal('value');
    });
  });
});
