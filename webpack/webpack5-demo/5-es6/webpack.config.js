const path = require('path');

module.exports = (env) => {
  console.log(1, env);  //  { WEBPACK_BUNDLE: true, NODE_ENV: 'local', production: true }
  return {
    entry: './src/index.js',
    output: {
      filename: '[name].[contenthash].js',
      path: path.resolve(__dirname, 'dist')
    }
  }
};