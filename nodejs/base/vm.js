// vm模块提供了在 V8 虚拟机上下文中编译和运行代码的一系列 API。vm 模块不是一个安全的虚拟机。
const vm = require('vm');
const util = require('util');

// const script = new vm.Script('globalVar += 1; anotherGlobalVar = 1;');
// const sandbox = { globalVar: 1 };
// const contextifiedSandbox = vm.createContext(sandbox);
// const result = script.runInContext(contextifiedSandbox);

// console.log(sandbox === contextifiedSandbox);  // true
// console.log(util.inspect(sandbox));  // { globalVar: 2, anotherGlobalVar: 1 }
// console.log(result);  // 1


// 2. 外层如何得到代码运行结果
// a. 把结果作为最后一个表达式的值传给外层
// b. 作为context的属性给外层使用
// c. 对于异步操作，可在context里放回调函数实现
// const sandbox = {
//   globalVar: 1,
//   setTimeout: setTimeout,
//   cb: (res) => {
//     console.log(res);
//   }
// };
// vm.createContext(sandbox);
// const script = new vm.Script(`
//   setTimeout(function(){
//     globalVar++;
//     cb("async result");
//   }, 1000);
// `, { });

// script.runInContext(sandbox);
// console.log(sandbox.globalVar);  // 1
//                                  // async result

// setTimeout(() => {
//   console.log(sandbox.globalVar);  // 2
// }, 1500)


// 3, 代码运行时间限制
// a. 同步代码
// const sandbox = {};
// const contextifiedSandbox = vm.createContext(sandbox);
// const script = new vm.Script('while (true) {}');
// const result = script.runInContext(contextifiedSandbox, { timeout: 1000 });
 // Error: Script execution timed out after 1000ms

// b. 异步代码 ==== 没报错。  timeout选项不能限制异步代码的运行时间  ==》解决方案，采用在子进程内运行vm,控制子进程
// const sandbox = {globalVar: 1, setTimeout: setTimeout, cb: function(result) {
//   console.log(result);
// }};
// vm.createContext(sandbox);
// const script = new vm.Script(`
//   setTimeout(function(){
//       globalVar++;
//       cb("async result");
//   }, 1000);
//   globalVar;
// `,{});
// const result = script.runInContext(sandbox, {timeout: 500});
// console.log(`result: ${result}`);

