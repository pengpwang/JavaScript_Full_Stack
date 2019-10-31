
// 调试控制台
const { Console } = require('console');
const fs = require('fs');

// 1. Console 类
const output = fs.createWriteStream('./static/stdout.log');
const errorOutput = fs.createWriteStream('./static/stderr.log');

const logger = new Console({
  stdout: output,
  stderr: errorOutput
});


logger.log('hahha');
logger.error('error');

// 2. console.assert(value, [...message]);  简单断言，验证value是否为true
// 只会打印messgae到控制台，不会中断后续代码的执行
console.assert(true, '什么都不做');
console.assert(false, '%s 工作', '无法'); // Assertion failed: 无法 工作

// 3. console.clear() 当stdout是TTY时，清除TTY，不是TTY时，不执行任何操作
// console.clear();

// 4. console.count(label) 计数器；label <string> 计数器的显示标签。默认值: 'default'。
// 给定 label 调用 console.count() 的次数输出到 stdout
console.count(); // default: 1
console.count('default'); // default: 2
console.count('abc'); // abc: 1
console.count('abc'); // abc: 2
console.count('abc'); // abc: 3

// 5. console.countReset([label]) 重置label的计数器
console.count('x');  // x: 1
console.count('x');  // x: 2
console.count('x');  // x: 3
console.countReset('x');
console.count('x');  // x: 1

// 6. console.debug(data[, ...args])
// 同 console.log()

console.profile('myprofile');
for(let i =0; i < 1000000;i++){}
console.profileEnd('myprofile')