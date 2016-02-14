var webpack = require('webpack');
var RewirePlugin = require('rewire-webpack');
var path = require('path');
var env = require('yargs').argv.mode;
var fs = require('fs');

const libraryName = 'mock-backend';

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
  plugins: plugins(env)
};

function plugins(env) {
  var plugins = [
    new webpack.BannerPlugin('require("source-map-support").install();',
      {
        raw: true,
        entryOnly: false
      })
  ];

  if (env === 'build') {
    plugins.push(new webpack.optimize.UglifyJsPlugin({ minimize: true }));
  } else {
    plugins.push(new RewirePlugin());
  }

  return plugins;
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

