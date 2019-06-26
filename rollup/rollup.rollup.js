const rollup = require('rollup');
const json = require('rollup-plugin-json');

const inputOptions = {
  input: './main.js',
  plugins: [ json() ]
};

const outputOptions = {
  file: 'bundle.js',
  format: 'cjs'
};

(async function build() {
  const bundle = await rollup.rollup(inputOptions);

  console.log(bundle.imports);
  console.log(bundle.exports);
  console.log(bundle.modules);

  const { code, map } = await bundle.generate(outputOptions);

  console.log('code', code);
  console.log('map', map);

  await bundle.write(outputOptions);

})();