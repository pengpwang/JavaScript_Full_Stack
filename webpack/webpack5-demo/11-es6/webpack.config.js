
module.exports = {
  entry: './src/index.jsx',
  module: {
    rules: [
      {
        test: /\.jsx$/i,
        // use: [ 'babel-loader' ]
      }
    ]
  }
};