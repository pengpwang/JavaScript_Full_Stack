
const co = require('co');

co(function* () {
  let res = yield [
    Promise.resolve(1),
    Promise.resolve(2)
  ];


  let res1 = yield Promise.resolve(3);

  console.log(res);
  console.log(res1);
}).catch(e => console.log(e));