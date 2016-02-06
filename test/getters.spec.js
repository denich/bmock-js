import chai from 'chai';
import lib from '../lib/mock-backend';

const expect = chai.expect;
var getters;

describe('Getters', function() {
  before(function() {
    getters = lib.getters;
  });

  describe('body property', function() {
    it('will return req body property value', () => {
      var req = {
        body: {
          prop: 'value'
        }
      };

      expect(getters.bodyProp('prop')(req)).to.be.equal('value');
    });
  });

  describe('query property', function() {
    it('will return query property value', function() {
      var req = {
        query: {
          prop: 'value'
        }
      };

      expect(getters.queryProp('prop')(req)).to.be.equal('value');
    });
  });

  describe('parameter', function() {
    it('will return parameter value', function() {
      var req = {
        params: {
          name: 'value'
        }
      };

      expect(getters.param('name')(req)).to.be.equal('value');
    });
  });
});
