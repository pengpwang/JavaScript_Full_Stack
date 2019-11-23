#!/usr/bin/env node

const readFile = require('fs').readFile;
const yargs = require('yargs');
const { concat } = require('mississippi');

// 1.获取命令行参数

// 命令行：node index.js -f filename -g search --save file
// a.原生node
// console.log(
//   process.argv
// );
// [ '/Users/wpp/.nvm/versions/node/v10.15.3/bin/node',
//   '/Users/wpp/Documents/next/JavaScript_Full_Stack/nodejs/project/yargs/index.js',
//   '-f',
//   'filename',
//   '-g',
//   'search',
//   '--save',
//   'file' ]

// b. 使用yargs
// console.log(
//   yargs.argv
// );
// { _: [],
//   f: 'filename',
//   g: 'search',
//   save: 'file',
//   '$0': 'index.js' }

// 2. 描述和验证参数
const argv = yargs.usage('parse-json [options]')
  .help('h')
  .alias('h', 'help')
  .demand('f')  // -f参数必需
  .nargs('f', 1)  // -f参数后面1个值
  .describe('f', 'JSON file to parse')  // 参数-f的描述
  .argv;

const file = argv.f;
function parse(str) {
  const value = JSON.parse(str);
  console.log(JSON.stringify(value));
}

if(file === '-'){
  process.stdin.pipe(concat(parse))
}else{
  readFile(file, (err, dataBuffer) => {
    if(err) throw err;
    console.log(dataBuffer.toString());
  });
}


