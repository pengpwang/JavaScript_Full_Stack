// url模块用于处理与解析URL
// const url = require('url');

const href = 'http://user:pass@sub.example.com:8080/p/a/t/h?query=string#hash';

// ***
// "  https:   //    user   :   pass   @ sub.example.com : 8080   /p/a/t/h  ?  query=string   #hash "
// │          │  │          │          │    hostname     │ port │          │                │       │
// │          │  │          │          ├─────────────────┴──────┤          │                │       │
// │ protocol │  │ username │ password │          host          │          │                │       │
// ├──────────┴──┼──────────┴──────────┼────────────────────────┤          │                │       │
// │   origin    │                     │         origin         │ pathname │     search     │ hash  │
// ├─────────────┴─────────────────────┴────────────────────────┴──────────┴────────────────┴───────┤
// │                                              href                                              │
// └────────────────────────────────────────────────────────────────────────────────────────────────┘

// 一。URL
// 1. new URL(input[, base])
// input <string> 要解析的绝对或相对的 URL。如果 input 是相对路径，则需要 base。 如果 input 是绝对路径，则忽略 base。
// base <string> | <URL> 如果 input 不是绝对路径，则为要解析的基本 URL。
console.log(
  new URL(href)
);
// URL {
//   href:
//    'http://user:pass@sub.example.com:8080/p/a/t/h?query=string#hash',
//   origin: 'http://sub.example.com:8080',
//   protocol: 'http:',
//   username: 'user',
//   password: 'pass',
//   host: 'sub.example.com:8080',
//   hostname: 'sub.example.com',
//   port: '8080',
//   pathname: '/p/a/t/h',
//   search: '?query=string',
//   searchParams: URLSearchParams { 'query' => 'string' },
//   hash: '#hash' }

// a.通过将 input 相对于 base 进行解析，创建一个新的 URL 对象。 如果 base 是一个字符串，则解析方法与 new URL(base) 相同。
console.log(
  new URL('/foo', 'http://example.com/')
);
// URL {
//   href: 'http://example.com/foo',
//   origin: 'http://example.com',
//   protocol: 'http:',
//   username: '',
//   password: '',
//   host: 'example.com',
//   hostname: 'example.com',
//   port: '',
//   pathname: '/foo',
//   search: '',
//   searchParams: URLSearchParams {},
//   hash: '' }


// b. 如果 input 或 base 是无效的 URL，则将会抛出 TypeError。 注意，给定值将会被强制转换为字符串。
console.log(
  new URL({ toString: () => { return 'http://example.com/foo' } })
);
// URL {
//   href: 'http://example.com/foo',
//   origin: 'http://example.com',
//   protocol: 'http:',
//   username: '',
//   password: '',
//   host: 'example.com',
//   hostname: 'example.com',
//   port: '',
//   pathname: '/foo',
//   search: '',
//   searchParams: URLSearchParams {},
//   hash: '' }

// new URL([])
// TypeError [ERR_INVALID_URL]: Invalid URL:

// c.存在于 input 主机名中的 Unicode 字符将被使用 Punycode 算法自动转换为 ASCII
console.log(
  new URL('https://測試')
);
// URL {
//   href: 'https://xn--g6w251d/',
//   origin: 'https://xn--g6w251d',
//   protocol: 'https:',
//   username: '',
//   password: '',
//   host: 'xn--g6w251d',
//   hostname: 'xn--g6w251d',
//   port: '',
//   pathname: '/',
//   search: '',
//   searchParams: URLSearchParams {},
//   hash: '' }


console.log(
  1, 
  new URL('http://Example.com/', 'https://example.org/'),  // href: http://example.com/
  new URL('https://Example.com/', 'https://example.org/'), // href: https://example.com/
  new URL('foo://Example.com/', 'https://example.org/'),   // href: foo://Example.com/
  new URL('http:Example.com/', 'https://example.org/'),    // href: http://example.com/
  new URL('https:Example.com/', 'https://example.org/'),   // href: https://example.org/Example.com/
  new URL('foo:Example.com/', 'https://example.org/'),     // href: foo:Example.com/

);

console.log(
  2,
  new URL('/foo', new URL(href))  // href: http://user:pass@sub.example.com:8080/foo
);

console.log(
  new URL('http://localhost:3000/😸')  // href: http://localhost:3000/%F0%9F%98%B8
);

// 2; url.hash  获取及设置 URL 的片段部分。
//分配给 hash 属性的值中包含的无效 URL 字符是百分比编码的
const myURL = new URL('https://example.org/foo#bar');
console.log(myURL.hash);  // #bar
myURL.hash = 'baz';
console.log(myURL.href);  // https://example.org/foo#baz

// 3; url.host 获取及设置 URL 的主机部分
// 分配给 host 属性的无效主机值将会被忽略
const myURL1 = new URL('https://example.org:81/foo');
console.log(myURL1.host);  // example.org:81
myURL1.host = 'example.com:82';
myURL1.host = ''; // 无效主机值
console.log(myURL1.href);  // https://example.com:82/foo

// 4; url.hostname 获取及设置 URL 的主机名部分。 url.host 和 url.hostname 之间的区别是 url.hostname 不包含端口
// 为 hostname 属性设置无效的值则会被忽略。
const myURL2 = new URL('https://example.org:81/foo');
console.log(myURL2.hostname); // example.org
myURL2.hostname = 'example.com:82';
console.log(myURL2.href); // https://example.com:81/foo

// 5; url.href 获取及设置序列化的 URL
// 如果给 href 属性设置的值是无效的 URL，则将会抛出 TypeError
const myURL3 = new URL('https://example.org/foo');
console.log(myURL3.href);  // https://example.org/foo
myURL3.href = 'https://example.com/bar';
// myURL3.href = ''; // TypeError [ERR_INVALID_URL]: Invalid URL:
console.log(myURL3.href);  // https://example.com/bar
// 将此属性的值设置为新值等同于使用 new URL(value) 创建新的URL对象。 URL 对象的每个属性都将被修改。

//6; url.origin 获取只读的序列化的 URL 的 origin。
console.log(
  new URL('https://example.org/foo/bar?baz').origin  // https://example.org
);

// 7; url.password 获取及设置 URL 的密码部分。
const myURL4 = new URL('https://abc:xyz@example.com');
console.log(myURL4.password);  // xyz
myURL4.password = '123';
console.log(myURL4.href);  // https://abc:123@example.com/
// 分配给 password 属性的值中包含的无效 URL 字符是百分比编码的

// 8; url.pathname 获取及设置 URL 的路径部分
const myURL5 = new URL('https://example.org/abc/xyz?123');
console.log(myURL5.pathname);  // /abc/xyz
myURL5.pathname = '/abcdef';
console.log(myURL5.href);  // https://example.org/abcdef?123
//分配给 pathname 属性的值中包含的无效 URL 字符是百分比编码的

// 9; url.port 获取及设置 URL 的端口部分
// a.端口值可以是数字或包含 0 到 65535（含）范围内的数字字符串。 将值设置为给定 protocol 的 URL 对象的默认端口将会导致 port 值变为空字符串（''）
// b.端口值可以是空字符串，在这种情况下，端口取决于协议/规范
// 协议	端口
// "ftp"	21
// "file"	
// "gopher"	70
// "http"	80
// "https"	443
// "ws"	80
// "wss"	443
// c.在为端口分配值后，将首先使用 .toString() 将值转换为字符串
// d.如果该字符串无效但以数字开头，则将前导号码分配给 port
// e.如果数字位于上述范围之外，则忽略它
const myURL6 = new URL('https://example.org:8888');
console.log(myURL6.port); // 8888
// 默认端口将自动转换为空字符。
// (HTTPS 协议默认端口是 443)
myURL6.port = '443';
console.log(myURL6.port);  // ''
console.log(myURL6.href);  // https://example.org/
myURL6.port = 1234;
console.log(myURL6.port);  // 1234
console.log(myURL6.href);  // https://example.org:1234/
// 完全无效的端口字符串将被忽略。
myURL6.port = 'abcd';
console.log(myURL6.port);  // 1234
// 开头的数字将会被当做端口号。
myURL6.port = '5678abcd';
console.log(myURL6.port);  // 5678
// 非整形数字将会被截断。
myURL6.port = 1234.5678;
console.log(myURL6.port);  // 1234
// 超出范围的数字将被忽略。
myURL6.port = 1e10; // 10000000000，将按如下所述进行范围检查。
console.log(myURL6.port);  // 1234
myURL6.port = 4.567e21;
console.log(myURL6.port);  // 4  因为它是字符串 '4.567e21' 中的前导数字

// 10;url.protocol 获取及设置 URL 的协议部分
const myURL7 = new URL('https://example.org');
console.log(myURL7.protocol); // https:
myURL7.protocol = 'ftp';
console.log(myURL7.href); // ftp://example.org/
// 分配给 protocol 属性的无效协议值将会被忽略。也不允许从非特殊协议更改为特殊协议
myURL7.protocol = '_ftp11';
console.log(myURL7.href); // ftp://example.org/
// 根据 WHATWG URL 标准，特殊协议规范是 ftp、 file、 gopher、 http、 https、 ws 和 wss。

// 11; url.search 获取及设置 URL 的序列化查询部分
const myURL8 = new URL('https://example.org/abc?123');
console.log(myURL8.search);  // ?123
myURL8.search = 'abc=xyz';
console.log(myURL8.href); // https://example.org/abc?abc=xyz
// 分配给 search 属性的值中包含的无效 URL 字符是百分比编码的。

// 12; url.searchParams 
// 获取表示 URL 查询参数的 URLSearchParams 对象。 该属性是只读的。 使用 url.search 设置来替换 URL 的整个查询参数

// 13; url.username 获取及设置 URL 的用户名部分
const myURL9 = new URL('https://abc:xyz@example.com');
console.log(myURL9.username);  // abc
myURL9.username = '123';
console.log(myURL9.href);  // https://123:xyz@example.com/
// 分配给 username 属性的值中包含的无效 URL 字符是百分比编码的。

// 14; url.toString()
// 在 URL 对象上调用 toString() 方法将返回序列化的 URL。 返回值与 url.href 和 url.toJSON() 的相同
//由于需要符合标准，此方法不允许用户自定义 URL 的序列化过程。 如果需要更大灵活性，require('url').format() 可能更合适。
console.log(
  new URL(href).toString(),   // http://user:pass@sub.example.com:8080/p/a/t/h?query=string#hash
  new URL(href).toJSON()      // http://user:pass@sub.example.com:8080/p/a/t/h?query=string#hash
);

// 15; url.toJSON()
// 在 URL 对象上调用 toJSON() 方法将返回序列化的 URL。 返回值与 url.href 和 url.toString() 的相同。
// 当 URL 对象使用 JSON.stringify() 序列化时将自动调用该方法。
const myURLs = [
  new URL('https://www.example.com'),
  new URL('https://test.example.org')
];
console.log(JSON.stringify(myURLs)); // ["https://www.example.com/","https://test.example.org/"]
console.log(
  JSON.stringify(new URL(href))
); // "http://user:pass@sub.example.com:8080/p/a/t/h?query=string#hash"



// 二。URLSearchParams
// URLSearchParams API 提供对 URL 查询部分的读写权限
const myURL10 = new URL('https://example.org/?abc=123');
console.log(myURL10.searchParams.get('abc'));  // 123
myURL10.searchParams.append('abc', 'xyz');
console.log(myURL10.href); // https://example.org/?abc=123&abc=xyz
myURL10.searchParams.delete('abc');  // 两个都被删掉
myURL10.searchParams.set('a', 'b');
console.log(myURL10.href);  // https://example.org/?a=b
const newSearchParams = new URLSearchParams(myURL10.searchParams);
// 上面的代码等同于：
// const newSearchParams = new URLSearchParams(myURL10.search);
newSearchParams.append('a', 'c');
console.log(myURL10.href);// https://example.org/?a=b
console.log(newSearchParams.toString()); // a=b&a=c

// newSearchParams.toString() 会被隐式调用。
myURL10.search = newSearchParams;
console.log(myURL10.href); // https://example.org/?a=b&a=c
newSearchParams.delete('a');
console.log(myURL10.href); // https://example.org/?a=b&a=c

//1; new URLSearchParams()
// 实例化一个新的空的URLSearchParams对象。
console.log(
  new URLSearchParams() // URLSearchParams {}
);

//2; new URLSearchParams(string)  // string <string> 查询字符串。
// 将 string 解析成一个查询字符串, 并且使用它来实例化一个新的 URLSearchParams 对象。 如果以 '?' 开头，则忽略.
let params = new URLSearchParams('user=abc&query=xyz');
console.log(params.get('user')); // abc
console.log(params.toString());  // user=abc&query=xyz
console.log(
  new URLSearchParams('?user=abc&query=xyz').toString() // user=abc&query=xyz
);

// 3;new URLSearchParams(obj)  // obj <Object> 表示键值对集合的对象
// 通过使用查询哈希映射实例化一个新的 URLSearchParams 对象。 obj 的每一个属性的键和值都将被强制转换为字符串。
// 和 querystring 模块不同的是，在数组的形式中，重复的键是不允许的。 数组使用 array.toString() 进行字符串化时，只需用逗号连接所有的数组元素即可
const params1 = new URLSearchParams({
  user: 'abc',
  query: ['first', 'second']
});
console.log(params1.getAll('query')); // [ 'first,second' ]
console.log([ 'a', 'b' ].toString()); // a,b
console.log(params1.toString()); // user=abc&query=first%2Csecond

// 4; new URLSearchParams(iterable)  // iterable <Iterable> 元素是键值对的迭代对象。
// 以一种类似于 Map 的构造函数的迭代映射方式实例化一个新的 URLSearchParams 对象
// a.iterable 可以是一个 Array 或者任何迭代对象
// b.这就意味着 iterable 能够是另一个 URLSearchParams，这种情况下，构造函数将简单地根据提供的 URLSearchParams 创建一个克隆 URLSearchParams
// c.iterable 的元素是键值对，并且其本身也可以是任何迭代对象。
// d.允许重复的键

// 使用数组。
let params2 = new URLSearchParams([
  ['user', 'abc'],
  ['query', 'first'],
  ['query', 'second']
]);
console.log(params2.toString()); // user=abc&query=first&query=second

// 使用 Map 对象。
const map2 = new Map();
map2.set('user', 'abc');
map2.set('query', 'xyz');
params2 = new URLSearchParams(map2);
console.log(params2.toString()); // user=abc&query=xyz

// 使用 generator 函数。
function* getQueryPairs() {
  yield ['user', 'abc'];
  yield ['query', 'first'];
  yield ['query', 'second'];
}
params2 = new URLSearchParams(getQueryPairs());
console.log(params2.toString());  // user=abc&query=first&query=second

// 每个键值对必须有两个元素。
// new URLSearchParams([
//   ['user', 'abc', 'error']
// ]);
// 抛出 TypeError [ERR_INVALID_TUPLE]:
//        Each query pair must be an iterable [name, value] tuple


const params3 = new URLSearchParams();
// 4; urlSearchParams.append(name<string>, value<string>)
// 在查询字符串中附加一个新的键值对。
params3.append('a', 'foo');
params3.append('a', 'foz');
params3.append('b', 'jj');
console.log(params3.toString());  // a=foo&a=foz&b=jj

// 5; urlSearchParams.delete(name)
// 删除所有键为name的键值对
params3.delete('a');
console.log(params3.toString()); // b=jj

// 6; urlSearchParams.get(name)
// 返回键是name的第一个键值对的值。如果没有对应的键值对，则返回null
console.log(params3.get('b')); // jj
console.log(params3.get('c')); // null


// 7; urlSearchParams.getAll(name)  // 返回值为数组
// 返回键是name的所有键值对的值，如果没有满足条件的键值对，则返回一个空的数组。
params3.append('a','1')
params3.append('a','2')
console.log(params3.getAll('a')); // [ '1', '2' ]
console.log(params3.getAll('b')); // [ 'jj' ]

// 8; urlSearchParams.has(name)
// 如果存在至少一对键是 name 的键值对则返回 true。
console.log(params3.has('a')); // true

// 9; urlSearchParams.set(name, value)
// 将 URLSearchParams 对象中与 name 相对应的值设置为 value。 如果已经存在键为 name 的键值对，则将第一对的值设为 value 并且删除其他对。 如果不存在，则将此键值对附加在查询字符串后。
params3.set('a', 1);
console.log(params3.toString()); // b=jj&a=1


// 11; urlSearchParams.toString()
// 返回查询参数序列化后的字符串，必要时存在百分号编码字符

// 12; urlSearchParams.forEach(fn[, thisArg])
// fn <Function> 在查询字符串中的每个键值对的调用函数。
// thisArg <Object> 当 fn 调用时，被用作 this 值的对象。
// 在查询字符串中迭代每个键值对，并调用给定的函数
const myURL11 = new URL('https://example.org/?a=b&c=d');
myURL11.searchParams.forEach((value, name, searchParams) => {
  console.log(name, value, myURL11.searchParams === searchParams);
});
// a b true
// c d true

// 12; urlSearchParams.sort()
// 按现有名称就地排列所有的名称-值对。 使用稳定排序算法完成排序，因此保留具有相同名称的名称-值对之间的相对顺序。
const params4 = new URLSearchParams('query[]=abc&type=search&query[]=123');
params4.sort();
console.log(params4.toString()); // query%5B%5D=abc&query%5B%5D=123&type=search

// 13; urlSearchParams.keys() // 返回: <Iterator>
// 在每一个键值对上返回一个键的 ES6 Iterator
for(let k of new URLSearchParams('a=1&a=2&b=3').keys()){
  console.log(k);  // a  a  b
}

// 14; urlSearchParams.values() // 返回: <Iterator>
// 在每一个键值对上返回一个值的 ES6 Iterator
for(let v of new URLSearchParams('a=1&a=2&b=3').values()){
  console.log(v);  // 1  2  3
}

// 15; urlSearchParams.entries() // 返回: <Iterator>
// 在查询中的每个键值对上返回一个 ES6 Iterator。 迭代器的每一项都是一个 JavaScript Array。 Array 的第一个项是键 name， Array 的第二个项是值 value。
// urlSearchParams[@@iterator]() 的别名。
for(let [k, v] of new URLSearchParams('a=1&a=2&b=3').entries()){
  console.log([k, v]);  
}
// [ 'a', '1' ]
// [ 'a', '2' ]
// [ 'b', '3' ]

// 14; urlSearchParams[Symbol.iterator]()  // Returns: <Iterator>
// 根据查询字符串，返回一个键值对形式的 ES6 Iterator。 每个迭代器的项是一个 JavaScript Array。 其中， Array 的第一项是 name，第二个是 value。
// urlSearchParams.entries() 的别名。
for(let [k, v] of new URLSearchParams('a=1&a=2&b=3')){
  console.log([k, v]);  
}
// [ 'a', '1' ]
// [ 'a', '2' ]
// [ 'b', '3' ]


const url = require('url');
// 三。
// url.domainToASCII(domain<string>)  // Returns string
// 返回 Punycode ASCII 序列化的 domain。 如果 domain 是无效域名，则返回空字符串。
// 它执行的是 url.domainToUnicode() 的逆运算。
console.log(
  url.domainToASCII('español.com'), // xn--espaol-zwa.com
  url.domainToASCII('中文.com'),  // xn--fiq228c.com
  url.domainToASCII('xn--iñvalid.com'), // ''
);

//url.domainToUnicode(domain<string>)  // Returns string
// 返回 Unicode 序列化的 domain。 如果 domain 是无效域名，则返回空字符串。
// 它执行的是 url.domainToASCII() 的逆运算。
console.log(
  url.domainToUnicode('xn--espaol-zwa.com'),  // español.com
  url.domainToUnicode('xn--fiq228c.com'),  // 中文.com
  url.domainToUnicode('xn--iñvalid.com'), // ''
);

// url.fileURLToPath(url)
//  url <URL> | <string> 要转换为路径的文件 URL 字符串或者 URL 对象。
//  返回: <string> 完全解析的平台特定的 Node.js 文件路径
//此方法保证百分号编码字符解码结果的正确性，同时也确保绝对路径字符串在不同平台下的有效性。
console.log(
  url.fileURLToPath('file:///dir/txt.js')  // /dir/txt.js
);

// url.pathToFileURL(path)
// path <string> 要转换为文件 URL 的路径。
// 返回: <URL> 文件 URL 对象。
// 此函数可确保 path 会被解析为绝对路径，并在转换为文件 URL 时正确编码 URL 控制字符。
console.log(
  url.pathToFileURL('/dir/txt.js'),
  url.pathToFileURL(__dirname)
);
// URL {
//   href: 'file:///dir/txt.js',
//   origin: 'null',
//   protocol: 'file:',
//   username: '',
//   password: '',
//   host: '',
//   hostname: '',
//   port: '',
//   pathname: '/dir/txt.js',
//   search: '',
//   searchParams: URLSearchParams {},
//   hash: '' }


// url.format(URL[, options])
// URL <URL> WHATWG URL 对象。
// options <Object>
  // auth <boolean> 如果序列化的 URL 字符串应该包含用户名和密码则为 true，否则为 false。默认值: true。
  // fragment <boolean> 如果序列化的 URL 字符串应该包含分段则为 true，否则为 false。默认值: true。
  // search <boolean> 如果序列化的 URL 字符串应该包含搜索查询则为 true，否则为 false。默认值: true。
  // unicode <boolean> 如果出现在 URL 字符串主机元素里的 Unicode 字符应该被直接编码而不是使用 Punycode 编码则为 true。默认值: false。
// 返回: <string></string>
// 返回代表 WHATWG URL 对象的可自定义序列化的 URL String
// 虽然 URL 对象的 toString() 方法和 href 属性都可以返回 URL 的序列化的字符串。 然而，两者都不可以被自定义。 而 url.format(URL[, options]) 方法允许输出的基本自定义
console.log(
  url.format(new URL(href), {}), // http://user:pass@sub.example.com:8080/p/a/t/h?query=string#hash
  url.format(new URL(href), { auth: false }), // http://sub.example.com:8080/p/a/t/h?query=string#hash
  url.format(new URL(href), {
    auth: false,
    search: false,
    fragment: false
  }),  // http://sub.example.com:8080/p/a/t/h
  url.format(new URL('http://测试.com')), //  http://xn--0zwm56d.com/
  url.format(new URL('http://测试.com'), {
    unicode: true
  }),  // http://测试.com/
);
