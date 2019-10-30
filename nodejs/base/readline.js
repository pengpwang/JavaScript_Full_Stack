// 用于一次一行的读取可读流中的数据
const readline = require('readline');

// 1. 
// const rl = readline.createInterface({
//   input: process.stdin,
//   output: process.stdout
// });

// rl.question('你如何看待 Node.js 中文网？', (answer) => {
//   console.log(`感谢您的宝贵意见：${answer}`);
//   // rl.close();
// });

// rl.on('line', (input) => {
//   console.log(`接收到：${input}`);
// });


// 2. 微型 CLI
// const rl = readline.createInterface({
//   input: process.stdin,
//   output: process.stdout,
//   prompt: '请输入> '
// });

// rl.prompt();

// rl.on('line', (line) => {
//   switch (line.trim()) {
//     case 'hello':
//       console.log('world!');
//       break;
//     default:
//       console.log(`你输入的是：'${line.trim()}'`);
//       break;
//   }
//   rl.prompt();
// }).on('close', () => {
//   console.log('再见!');
//   process.exit(0);
// });

// 3. 逐行读取文件流：
// a.
// const fs = require('fs');

// async function processLineByLine() {
//   const rs = fs.createReadStream('./readline.js');
//   const rl = readline.createInterface({
//     input: rs,
//     crlfDelay: Infinity
//   });

//   for await (const line of rl) {
//     console.log(`Line from file: ${line}`);
//   }
// }

// processLineByLine();


// b.
// const fs = require('fs');
// const rl = readline.createInterface({
//   input: fs.createReadStream('./readline.js'),
//   crlfDelay: Infinity
// });

// rl.on('line', (line) => {
//   console.log(`line: ${line}`);
// });

// c.
const { once } = require('events');
const { createReadStream } = require('fs');
const { createInterface } = require('readline');

(async function processLineByLine() {
  try {
    const rl = createInterface({
      input: createReadStream('./readline.js'),
      crlfDelay: Infinity
    });

    rl.on('line', (line) => {
      console.log(`---: ${line}`);
    });

    await once(rl, 'close');

    console.log('文件已处理');
  } catch (err) {
    console.error(err);
  }
})();