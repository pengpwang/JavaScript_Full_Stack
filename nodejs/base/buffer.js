
// 1/ 创建buffer
console.log(Buffer.alloc(5));
console.log(Buffer.alloc(5, 1));
console.log(Buffer.allocUnsafe(5));
console.log(Buffer.from([1,2,3]));
console.log(Buffer.from('test')); // 默认是utf8
console.log(Buffer.from('test','base64'));


// 2. Buffer类提供的属性和方法（静态属性和静态方法）
// Buffer.byteLength(); 传入的字符串有多少个字节；英文2个字节，汉字3个字节
// Buffer.isBuffer(); 判断传入的参数是不是buffer
// Buffer.concat(); 拼接buffer，参数为buffer组成的数组

// 文档中其他的





// 2. buffer实例的属性和方法
// buf.length; buf本身的长度
// buf.toString(); buf转换成字符串，参数为字符编码。不传默认是utf8
// buf.fill(value, start?, end?); 向buf内填充值
// buf.equals();  两个buf里的内容是否相等
// buf.indexOf(); buf.lastIndexOf(); 跟数组一样
// buf.copy();
























