
// demo1
// let proxy = new Proxy({}, {
//   get(target, propKey) {
//     return 15;
//   }
// });

// console.log(
//   proxy.name,
//   proxy.title
// );


// demo2
// let target = {};
// let handler = {};
// let proxy = new Proxy(target, handler);
// proxy.a = 1;
// console.log(
//   target.a
// );


// 3，  Proxy.revocable()
// 返回一个可取消的 Proxy 实例
// let target = {};
// let handler = {};
// let { proxy, revoke } = Proxy.revocable(target, handler);

// proxy.foo = 123;
// console.log(
//   proxy.foo
// );

// revoke();
// console.log(
//   proxy
// );





