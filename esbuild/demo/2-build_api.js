const eb = require('esbuild');

console.log(
  eb.buildSync({
    entryPoints: ['../src/in.ts'],
    outfile: '../src/out.js'
  })
);