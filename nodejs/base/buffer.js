
// 1/ 创建buffer
console.log(Buffer.alloc(5)); // 默认用0填充
console.log(Buffer.alloc(5, 1));
console.log(Buffer.allocUnsafe(5));
console.log(Buffer.from([1,2,3]));
console.log(Buffer.from('test')); // 默认是utf8
console.log(Buffer.from('test','base64'));
console.log(Buffer.from(Buffer.alloc(5)));

// 2. Buffer与字符编码：字符串存入Buffer实例，和从Buffer实例中提取出来，都可指定一个字符编码
// 支持的字符编码：utf8, base64, hex, binary, latin1(同binary), utf16le, ucs2(同utf16le), ascii
const buf21 = Buffer.from('hello', 'ascii');
console.log(buf21);
console.log(buf21.toString('hex'));
console.log(buf21.toString('base64'));
console.log(buf21.toString('ascii'));

console.log(Buffer.from('hello'));
console.log(Buffer.from('hello', 'base64'));
console.log(Buffer.from('hello', 'utf16le'));

// 3. Buffer与迭代器
const buf31 = Buffer.from([3, 4, 5, 6, 7]);
// for(let v of buf31){
//   console.log(v);
// }

// for(let k of buf31.keys()){
//   console.log(k);
// }

// for(let v of buf31.values()){
//   console.log(v);
// }

for(let [k, v] of buf31.entries()){
  console.log(k, v)
}

// 4. Buffer.alloc(size[, fill[, encoding]]);
// size 必须是数字，否则TypeError; size大于buffer.constants.MAX_LENGTH 或size小于0 报错ERR_INVALID_OPT_VALUE；
// fill 可以是<string> <Buffer> <integer> 默认值为0
// encoding 当fill为string时，则为字符编码，默认utf8
const buf41 = Buffer.alloc(11, 'aGVsbG8gd29ybGQ=', 'base64');
const buf42 = Buffer.alloc(0);
console.log(buf41);
console.log(buf42);
// Buffer.alloc(-1);


// 5. Buffer类提供的属性和方法（静态属性和静态方法）
// Buffer.byteLength(); 传入的字符串有多少个字节；英文2个字节，汉字3个字节
// Buffer.isBuffer(); 判断传入的参数是不是buffer
// Buffer.concat(list[, totalLength]); 拼接buffer，参数为buffer组成的数组; totalLength 合并后buffer的总长度
console.log(
  Buffer.byteLength('he'), //  2
  Buffer.byteLength('你好') //  6
);

const buf51 = Buffer.alloc(5);
const buf52 = Buffer.alloc(6);
const buf53 = Buffer.alloc(9);
console.log(
  Buffer.concat([buf51, buf52, buf53]).length,
  Buffer.concat([buf51, buf52, buf53], 12).length
);

console.log(
  Buffer.isBuffer(1),
  Buffer.isBuffer(Buffer.from([1]))
);

console.log(
  Buffer.poolSize  // 默认值：8192 （字节） 指定预分配的Buffer池的大小
);




// 6. buffer实例的属性和方法
// buf.length; buf本身的长度;内存中分配给buf的字节数
// buf.toString(); buf转换成字符串，参数为字符编码。不传默认是utf8
// buf.fill(value, start?, end?); 向buf内填充值
// buf.equals();  两个buf里的内容是否相等
// buf.indexOf(); buf.lastIndexOf(); 跟数组一样
// buf.copy();
// buf.includes(value[, byteOffset][, encoding]); // buf中是否存在value

const buf61 = Buffer.from('hello');
const buf62 = Buffer.allocUnsafe(3);
buf61.copy(buf62);

console.log(
  buf61.length,
  buf61.toString(),
  buf61.equals(Buffer.from('hello')),
  buf61.indexOf('e'),
  buf62.toString(),
  buf61.includes('e')
);

// 7. require('buffer')
const buffer = require('buffer');

console.log(
  buffer.INSPECT_MAX_BYTES,  // 调用 buf.inspect() 时返回的最大字节数, 默认值: 50 
  buffer.kMaxLength,  // 分配给单个 Buffer 实例的最大内存。  
  buffer.constants.MAX_LENGTH, // 同buffer.kMaxLength，32位架构为1G，64位架构为2G
  buffer.constants.MAX_STRING_LENGTH // 单个 string 实例允许的最大长度, 取决于js引擎
);

