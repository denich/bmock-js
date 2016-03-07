const webpack = require('webpack');
const RewirePlugin = require('rewire-webpack');
const path = require('path');
const env = require('yargs').argv.mode;
const fs = require('fs');

const libraryName = 'bmock';

module.exports = {
  entry: './src/index.js',
  target: 'node',
  devtool: 'source-map',
  output: {
    path: path.join(__dirname, '/dist'),
    filename: outputFileName(env, libraryName),
    library: libraryName,
    libraryTarget: 'commonjs2'
  },
  externals: externals(),
  module: {
    loaders: [
      {
        test: /(\.js)$/,
        loader: 'babel',
        exclude: /(node_modules)/
      },
      {
        test: /(\.jsx|\.js)$/,
        loader: 'eslint-loader',
        exclude: /node_modules/
      }
    ]
  },
  plugins: plugins()
};

function isBuild() {
  return env === 'build';
}

function getEnvPlugins() {
  if (isBuild()) {
    return [new webpack.optimize.UglifyJsPlugin({ minimize: true })];
  }
  return [new RewirePlugin()];
}

function plugins() {
  return [
    new webpack.BannerPlugin('require("source-map-support").install();',
      {
        raw: true,
        entryOnly: false
      })
  ].concat(getEnvPlugins(plugins));
}

function externals() {
  var nodeModules = {};

  fs.readdirSync('node_modules')
    .filter(function(x) {
      return ['.bin'].indexOf(x) === -1;
    })
    .forEach(function(mod) {
      nodeModules[mod] = 'commonjs ' + mod;
    });

  return nodeModules;
}

function outputFileName(env, libraryName) {
  return env === 'build' ? libraryName + '.min.js' : libraryName + '.js';
}

