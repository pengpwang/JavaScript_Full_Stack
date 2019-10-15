// 交互式解释器 
// repl模块提供了一种“读取-求值-输出”循环（REPL）的实现
// 它可作为一个独立的程序或嵌入到其他应用中
const repl = require('repl');

const msg = 'message';
const replServer = repl.start('> ');

// repl环境的局部作用域
replServer.context.m = msg;

// 当接收到 .exit 命令、或按下两次 <ctrl>-C 发出 SIGINT 信号、或按下 <ctrl>-D 发出 'end' 信号而使 REPL 被退出时，触发 'exit' 事件。
replServer.on('exit', () => {
  console.log('从 REPL 接收到 "exit" 事件！');
  process.exit();
});

