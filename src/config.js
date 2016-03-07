import _ from 'lodash';

var _config = {
  responseDir: './data'
};

function config(params) {
  if (_.isUndefined(params)) {
    return _config;
  }
  _config = _.merge(_config, params);
}

export default config;
