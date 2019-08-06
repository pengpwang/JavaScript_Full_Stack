// 处理与解析URL
const url = require('url');

const href = 'http://user:pass@sub.example.com:8080/p/a/t/h?query=string#hash';

// console.log(
//   new URL(href)
// );

// console.log(
//   new URL('/foo', 'http://example.com/')
// );

// console.log(
//   new URL({ toString: () => { return 'http://example.com/foo' } })
// );


// console.log(
//   new URL('/foo', new URL(href))
// );

// console.log(
//   new URL('http://localhost:3000/😸')
// );

const myURL = new URL('https://example.org:81/foo');
console.log(myURL.hostname);

myURL.hostname = 'example.com:82';

console.log(myURL);