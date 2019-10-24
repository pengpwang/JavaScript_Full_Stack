// 工作线程  适用于cpu密集型操作。不适用于I/O密集型操作
const { 
  Worker, 
  isMainThread,
  parentPort,
  MessageChannel,
  receiveMessageOnPort,
  workerData
} = require('worker_threads');

// 1. worker.isMainThread  <boolean>
// 如果为 true 的话说明代码不是运行在 Worker 线程中

// if(isMainThread){
//   new Worker(__filename);
// }else{
//   console.log('Inside Workers!');
//   console.log(isMainThread);
// }


// 2. worker.parentPort
// 消息端口被使用来进行线程间通信
// if(isMainThread){
//   const worker = new Worker(__filename);
//   worker.once('message', (message) => {
//     console.log(message);
//   });

//   worker.postMessage('Hello, world~');
// }else{
//   parentPort.once('message', (message) => {
//     parentPort.postMessage(message);
//   });
// }

// 3. worker.receiveMessageOnPort(port);
// const { port1, port2 } = new MessageChannel();
// port1.postMessage({ hello: 'world~' });
// console.log(receiveMessageOnPort(port2));
// console.log(receiveMessageOnPort(port2));

// 4.worker.workerData
// 是用于传输启动数据。在多个线程间使用 postMessgae 进行传输的时候，数据会被克隆，并将克隆的数据传输到线程的 contructor 中。
if (isMainThread) {
  const worker = new Worker(__filename, { workerData: 'Hello, world!' });
} else {
  console.log(workerData);  // Prints 'Hello, world!'.
}