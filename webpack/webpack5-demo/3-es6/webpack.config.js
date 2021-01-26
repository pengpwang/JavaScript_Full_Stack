const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  mode: 'development',
  // entry: {
  //   index: {
  //     import: './src/index.js',
  //     dependOn: 'shared'
  //   },
  //   another: {
  //     import: './src/another-module.js',
  //     dependOn: 'shared'
  //   },
  //   shared: 'lodash'
  // },
  // entry: {
  //   index: './src/index.js',
  //   another: './src/another-module.js'
  // },
  entry: {
    index: './src/index.js'
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  // optimization: {
  //   runtimeChunk: 'single'
  // },
  // optimization: {
  //   splitChunks: {
  //     chunks: 'all'
  //   }
  // },
  plugins: [
    new CleanWebpackPlugin({ cleanStaleWebpackAssets: false }),
    new HtmlWebpackPlugin({ 
      title: 'Development'
    })
  ]
};