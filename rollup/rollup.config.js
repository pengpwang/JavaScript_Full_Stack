import json from 'rollup-plugin-json'

export default {
  input: './main.js',
  output: [{
    file: './dist/bundle_cjs.js',
    format: 'cjs',
    banner: `/**
      *Hello, This is a javascript.
      *@author amx
      */
    `,
    footer: `/**
      *This is footer. 
      *end
      */
    `,
    intro: '// intro',
    outro: '// outro'
  }, {
    file: './dist/bundle_iife.js',
    name: 'iife_res',
    format: 'iife'
  }, {
    file: './dist/bundle_umd.js',
    name: 'umd_res',
    format: 'umd'
  }, {
    file: './dist/bundle_amd.js',
    format: 'amd'
  }, {
    file: './dist/bundle_system.js',
    format: 'system'
  }, {
    file: './dist/bundle_esm.js',
    format: 'esm'
  }],
  plugins: [ json() ]
}