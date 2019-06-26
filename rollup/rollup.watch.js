const rollup = require('rollup');
const json = require('rollup-plugin-json');

const inputOptions = {
  input: './main.js',
  plugins: [ json() ]
};

const outputOptions = {
  file: 'bundle.watch.js',
  format: 'cjs'
};

const watchOptions = {
  ...inputOptions,
  output: outputOptions
};

const watcher = rollup.watch(watchOptions);
watcher.on('event', event => {
  console.log(event);
});



