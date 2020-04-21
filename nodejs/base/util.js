
// 1. promisify
const util = require('util');
const fs = require('fs');

fs.readFile[util.promisify.custom] = () => {
  return Promise.reject('该文件暂时禁止读取');
};
const readFilePromisify = util.promisify(fs.readFile);

readFilePromisify('./util.js', 'utf8')
  .then(res => console.log(res))
  .catch(err => console.log(err));


// 自定义promisify TODO 待完善
function cusPromisify (original) {
  if(typeof original !== 'function'){
    throw new TypeError(`The "original" argument must be of type Function`);
  }

  function fn(...args) {
    return new Promise((resolve, reject) => {
      try {
        original.call(this, ...args, (err, result) => {
          if(err){
            reject(err);
          }else{
            resolve(result);
          }
        })
      } catch (error) {
        reject(error)
      }
    });
  }

  return fn;
}

// const cusReadFilePromisify = cusPromisify(fs.readFile);
// cusReadFilePromisify('./util.js', 'utf8')
//   .then(res => console.log(res))
//   .catch(err => console.error(err));