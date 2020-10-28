const path = require('path');
const { merge } = require('webpack-merge');
const baseConfig = require('./webpack.base');

const clientConfig = {
  entry: './src/client/index.js',
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'public')
  },
  module: {
    rules: [{
      test: /\.css$/,
      use: ['style-loader', {
        loader: 'css-loader',
        options: {
          importLoaders: 1,
          // esModule: true,
          modules: { auto: true }
          // modules: {
          //   localIdentName: '[name]_[local]_[hash:base64:5]'
          // }
        }
      }]
    }]
  }
};

module.exports = merge(baseConfig, clientConfig);