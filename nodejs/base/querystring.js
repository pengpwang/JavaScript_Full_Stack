// querystring模块用于解析和格式化 URL 查询字符串
const querystring = require('querystring');

// 1;
// querystring.encode() 是 querystring.stringify()的别名
// querystring.decode() 是 querystring.parse()的别名


// 2;
// querystring.stringify(obj[, sep[, eq[, options]]])
// obj <Object> 要序列化为 URL 查询字符串的对象。
// sep <string> 用于在查询字符串中分隔键值对的子字符串。默认值: '&'。
// eq <string> 用于在查询字符串中分隔键和值的子字符串。默认值: '='。
// options
//   encodeURIComponent <Function> 在查询字符串中将 URL 不安全字符转换为百分比编码时使用的函数。默认值: querystring.escape()。
//querystring.stringify() 方法通过迭代对象的自身属性从给定的 obj 生成 URL 查询字符串。
//它序列化了传入 obj 中的以下类型的值：<string> | <number> | <boolean> | <string[]> | <number[]> | <boolean[]>。 任何其他输入值都将被强制转换为空字符串。
console.log(
  querystring.stringify({ a: 1, b: true, c: 'str' }),  // a=1&b=true&c=str
  querystring.stringify({ a: [true, 1, 'str'], b: {} }, '#', '=')  // a=true#a=1#a=str#b=
);


// // querystring.parse(str[, sep[, eq[, options]]])
// str <string> 要解析的 URL 查询字符串。
// sep <string> 用于在查询字符串中分隔键值对的子字符串。默认值: '&'。
// eq <string> 用于在查询字符串中分隔键和值的子字符串。默认值: '='。
// options <Object>
//   decodeURIComponent <Function> 解码查询字符串中的百分比编码字符时使用的函数。默认值: querystring.unescape()。
//   maxKeys <number> 指定要解析的键的最大数量。指定 0 可移除键的计数限制。默认值: 1000。
// querystring.parse() 方法将 URL 查询字符串 str 解析为键值对的集合

console.log(
  querystring.parse('a=1&b=2&c=3'), // [Object: null prototype] { a: '1', b: '2', c: '3' }
  querystring.parse([]),  // [Object: null prototype] {}
  querystring.parse(''),  // [Object: null prototype] {}
  querystring.parse('a=1#a=2#a=true#b=str#c=false', '#', null) // [Object: null prototype] { a: [ '1', '2', 'true' ], b: 'str', c: 'false' }
);

// 3; 不常用
// querystring.escape(str)  对给定的 str 执行 URL 百分比编码。
// querystring.unescape(str) 在给定的 str 上执行 URL 百分比编码字符的解码

