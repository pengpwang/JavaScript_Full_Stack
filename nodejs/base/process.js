// 进程
// a. 提供进程相关的信息
// b. 对进程进行控制
// c. process对象是EventEmitter的实例

// 一、进程事件
// 1. beforeExit 事件
// 对于导致显式终止的条件，不会触发 'beforeExit' 事件，例如调用 process.exit() 或未捕获的异常。
// process.on('beforeExit', (code) => {
//   console.log('进程 beforeExit 事件的代码: ', code);
// });

// process.on('exit', (code) => {
//   console.log('进程 exit 事件的代码: ', code);
// });

// console.log('此消息最新显示');
// process.exit();

// 2. disconnect 事件
// 如果使用 IPC 通道衍生 Node.js 进程，则在 IPC 通道关闭时将触发 'disconnect' 事件。

// 3. exit 事件
// 以下会触发exit 事件：a, 显式调用 process.exit(); b,nodejs事件循环不再需要执行任何其他工作
// 一旦所有的exit事件的监听器都已完成运行时，Nodejs进程将终止
// 使用 process.exitCode 属性指定的退出码或传给 process.exit() 方法的 exitCode 参数调用监听器回调函数
// 监听器函数必须只执行同步操作。 在调用 'exit' 事件监听器之后，Node.js 进程将立即退出，从而导致在事件循环中仍排队的任何其他工作被放弃。
// process.on('exit', (code) => {
//   setTimeout(() => {
//     console.log('此处不会运行');
//   }, 0);
// });

// 4. message 事件
// 使用 IPC 通道衍生 Node.js 进程, 当子进程收到父进程使用 childprocess.send() 发送的消息，就会触发 'message' 事件。
// 消息会进行序列化和解析。生成的消息可能与最初发送的消息不同。

// 5. rejectionHandled 事件?????? TODO

// 6. uncaughtException 事件
// const fs = require('fs');
// process.on('uncaughtException', (err, origin) => {
//   fs.writeSync(
//     process.stderr.fd,
//     `捕获的异常: ${err}\n` +
//     `异常的来源: ${origin}` // origin为string，表示来自未处理的拒绝还是来自同步的错误
//   );
// });
// setTimeout(() => {
//   console.log('这里仍然会运行');
// }, 500);
// // 故意引起异常，但不要捕获它。
// nonexistentFunc();
// console.log('这里不会运行');




// 二、属性
// 1. process.allowedNodeEnvironmentFlags  NODE_OPTIONS环境变量中允许的特殊只读标志的Set集合。

// console.log(
//   process.allowedNodeEnvironmentFlags
// );

// 2. process.arch  // 返回操作系统CPU架构的字符串
// console.log(
//   process.arch
// );

// 3. process.argv // <string[]>  启动node进程时传入的命令行参数
// 第一个元素是 process.execPath
// 第二个元素是 正在执行的js文件路径
// 其余元素是其他命令行参数
// console.log(
//   process.argv
// );

// 4. process.argv0   // 当 Node.js 启动时传入的 argv[0] 的原始值的只读副本
// process.argv[0]
// console.log(
//   process.argv0   // /Users/wpp/.nvm/versions/node/v12.13.0/bin/node
// );

// 5. process.channel
// console.log(
//   process.channel
// );
// nodemon process.js 时  
// Pipe {
//   buffering: false,
//   pendingHandle: null,
//   sockets: { got: {}, send: {} }
// }

// node process.js 时
// undefined

// 6. process.config  // 返回用于编译当前 Node.js 可执行文件的配置选项的 JavaScript 表示形式
// console.log(
//   process.config
// );

// 7. process.connected  // IPC通道保持连接，返回true; 
// 调用 process.disconnect() 后，此返回为false
// false时，无法使用process.send() 发送信息
// console.log(
//   process.connected
// );


// 8. process.debugPort //调试所使用的端口
// console.log(
//   process.debugPort
// );

// 9. process.env  // 返回对象，用户环境
// process.env.foo = null;
// process.env.bar = undefined;
// console.log(
//   process.env,
//   process.env.foo,  // 'null'
//   process.env.bar   // 'undefined'
// );


// 10. process.execArgv // nodejs进程启动时，nodejs特定的命令行选项
// console.log(
//   process.execArgv
// );
// 命令行启动 node --harmony process.js
// [ '--harmony' ]

// 11. process.execPath  // 启动 Node.js 进程的可执行文件的绝对路径名
// console.log(
//   process.execPath   // /Users/wpp/.nvm/versions/node/v12.13.0/bin/node
// ); 

// 12. process.exitCode  
// 进程正常退出时或process.exit() 退出且未指定退出码时的进程退出码
// 指定process.exit(exitCode) 退出码，将覆盖原有的设置
console.log(
  process.exitCode
);
























