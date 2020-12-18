const path = require('path');
const nodeExternals = require('webpack-node-externals'); 
const { merge } = require('webpack-merge');
const baseConfig = require('./webpack.base');

const serverConfig = {
  target: 'node',  // node 核心包不会被打包
  entry: './src/server/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'build')
  },
  externals: [nodeExternals({
    allowlist: [ /\.(css|less|sass|scss)$/ ]
  })], // node_modules下的模块无需打包
  module: {
    rules: [{
      test: /\.css$/,
      use: ['isomorphic-style-loader', {
        loader: 'css-loader',
        options: {
          // importLoaders: 1,
          // esModule: true,
          // modules: {
          //   compileType: 'module',
          //   auto: true,
          //   localIdentName: '[name]_[local]_[hash:base64:5]'
          // }
          modules: true,
        }
      }]
    }]
  }
};

module.exports = merge(baseConfig, serverConfig);


