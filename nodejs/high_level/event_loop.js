const fs = require('fs');
const EventEmitter = require('events');

class CusEv extends EventEmitter {}
const myev = new CusEv();

myev.on('event', () => {
    console.log('event 事件触发');
});

setTimeout(() => {
    console.log(`0ms setTimeout`);
}, 0);

setTimeout(() => {
    console.log(`100ms setTimeout`);
}, 100);

setTimeout(() => {
    console.log(`200ms setTimeout`);
}, 200);

fs.readFile('./event_loop.js', 'utf-8', (err , data) => {
    console.log(`fs.readFile 1`);
});

fs.readFile('./Nodejs事件循环.md', 'utf-8', (err, data) => {
    console.log(`fs.readFile 2`);
});

setImmediate(() => {
    console.log(`setImmediate`);
});

process.nextTick(() => {
    console.log(`process.next 1`);
});

Promise.resolve()
    .then(() => {
        myev.emit('event');

        process.nextTick(() => {
            console.log(`process.next 2`);
        });

        console.log(`promise 1`);
    })
    .then(() => {
        console.log(`promise 2`);
    });