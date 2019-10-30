
// 终端命令行运行： node inspect debugger.js 


global.x = 5;
setTimeout(() => {
  debugger;
  console.log('世界');
}, 1000);
console.log('你好');