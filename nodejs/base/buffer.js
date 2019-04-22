
// 1/ 创建buffer
console.log(Buffer.alloc(5));
console.log(Buffer.alloc(5, 1));
console.log(Buffer.allocUnsafe(5));
console.log(Buffer.from([1,2,3]));
console.log(Buffer.from('test')); // 默认是utf8
console.log(Buffer.from('test','base64'));


// 2. Buffer类提供的属性和方法（静态属性和静态方法）






















