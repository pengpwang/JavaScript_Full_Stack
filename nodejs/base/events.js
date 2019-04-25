const EventEmitter = require('events');
// 1.  events模块综述 ***
//所有能触发事件的对象都是 EventEmitter 类的实例
// 事件名的类型为 <string> 或 <symbol>


// 2. 注册事件，触发事件 on(eventName, listener) 同 addListener(eventName, listener)
class MyEvent21 extends EventEmitter {}

const myE21 = new MyEvent21();
myE21.on('ev', () => {
  console.log('事件被触发');
});
myE21.emit('ev');  // emit方法。事件有监听器返回true，否则返回false

// 3. 往事件处理程序里传递参数
// ce.emit('error', ...args)
class MyEvent31 extends EventEmitter {}

const myE31 = new MyEvent31();
myE31.on('ev', (a, b) => {
  console.log('事件被触发', a, b, this);
});// this => {}
myE31.on('ev', function (a, b) {
  console.log('事件被触发', a, b, this);
}); // this => 指向监听器所绑定的 EventEmitter 实例(myE31)
myE31.emit('ev', 'a', 'b');


// 4. once 只绑定触发一次
class MyEvent41 extends EventEmitter {}

const myE41 = new MyEvent41();
myE41.once('ev', () => {
  console.log('1');
});
myE41.emit('ev');
myE41.emit('ev');

// 5. error事件  EventEmitter实例没有注册error事件监听器，当 EventEmitter实例出错会抛出错误、打印堆栈跟踪、并退出 Node.js 进程
class MyEmitter51 extends EventEmitter {}
const myE51 = new MyEmitter51();
myE51.on('error', (err) => {
  console.error('错误信息');
});
myE51.emit('error', new Error('错误信息'));

// 6. newListener事件和removeListener事件
// 当新增监听器时，会触发 'newListener' 事件
// 当移除已存在的监听器时，则触发 'removeListener' 事件. **在 listener 被移除后触发。**
class MyEmitter61 extends EventEmitter {}
const myE61 = new MyEmitter61();

myE61.once('newListener', (event /* 事件名称 */, listener /* 事件句柄函数 */) => {
  if(event === 'ev'){
    myE61.on('ev', () => {
      console.log('B');
    }) // 在 'newListener' 回调中注册到相同 name 的任何其他监听器将插入到正在添加的监听器之前。
  }
}); // EventEmitter 实例在新的监听器被添加到其内部监听器数组之前，会触发自身的 'newListener' 事件。


myE61.on('ev', () => {
  console.log('A');
});

myE61.emit('ev');

// 7. EventEmitter.defaultMaxListeners   // 10； 所以EventEmitter实例的默认值10
// emitter.getMaxListeners() EventEmitter实例上应用
// emitter.setMaxListeners() EventEmitter实例上应用；设置最多多少监听器
console.log(
  EventEmitter.defaultMaxListeners
);

// 8. emitter.eventNames(); 返回已注册监听器的事件名数组
class MyEmitter81 extends EventEmitter {}
const myE81 = new MyEmitter81();
myE81.on('op', () => {});
myE81.on('ev', () => {});
const sym = Symbol.for('dasd');
myE81.on(sym, () => {});

console.log(
  myE81.eventNames(),
  myE81.listenerCount('ev'),  // 返回指定事件名的监听器数量
  myE81.listeners('ev'),   // 返回指定事件名的监听器数组的副本
  myE81.getMaxListeners() // 获取myE81 的最大事件限制监听数
);


// 9. 移除事件监听器
// ce.removeListener('事件名', '事件处理函数') 移除单个事件处理函数
// ce.removeAllListeners('事件名') 移除全部事件
class MyEmitter91 extends EventEmitter {}
const myE91 = new MyEmitter91();

function fn1() {
  console.log('fn1');
}

function fn2() {
  console.log('fn2');
}

function fn3() {
  console.log('fn3');
}

function fn4() {
  console.log('fn4');
}

myE91.on('ev', fn1);
myE91.addListener('ev', fn2);  // addListener() 同 on()

myE91.emit('ev');

myE91.off('ev', fn1);
myE91.emit('ev');

myE91.removeListener('ev', fn2);  // removeListener() 同 off()
myE91.emit('ev');

myE91.on('ev', fn3);
myE91.on('ev', fn4);
myE91.emit('ev');
myE91.on('ev1', fn3);
myE91.on('ev1', fn4);

myE91.removeAllListeners('ev');  // 移除指定事件名的所有事件监听器
myE91.emit('ev');

myE91.removeAllListeners();  // 移除所有事件的事件监听器
console.log(
  myE91.eventNames()
);


// 10. emitter.prependListener() // 将事件监听器添加到监听器数组的开头
// emitter.prependOnceListener() 
class MyEmitter101 extends EventEmitter {}
const myE101 = new MyEmitter101();

myE101.on('ev', () => {
  console.log(1);
});

myE101.prependListener('ev', () => {
  console.log(2);
});

myE101.emit('ev');

