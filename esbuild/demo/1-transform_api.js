const eb = require('esbuild');

console.log(
  eb.transformSync('let x: number = 1', {
    loader: 'ts'
  })
);