const path = require('path'); // path模块处理文件路径和目录路径

// 1. 属性
// sep   路径片段分隔符; windows上\  posix/
// delimiter  $PATH (process.env.PATH) 的定界符; windows上为;  posix上为:
// win32   windows系统对应的path方法 
// posix   posix系统对应的path方法
console.log(1,
    process.env.PATH,
    path.sep,
    path.delimiter,
    path.win32.sep,
    path.posix.sep,
    path.win32.delimiter,
    path.posix.delimiter,
    // path.win32,
    // path.posix
);

console.log(
    process.env.PATH,
    process.env.PATH.split(path.delimiter)
);


// 2. 
// path.basename(path[,ext]);  文件的名字 
// path.dirname();   文件夹的名字
// path.extname();   文件的扩展名
const filePath = '/usr/local/bin/n/n.txt/';

console.log(
    path.basename(filePath),  // n.txt
    path.dirname(filePath),   // /usr/local/bin/n
    path.extname(filePath)    // .txt
);  

// console.log(
//     path.basename({})  // TypeError [ERR_INVALID_ARG_TYPE]: The "path" argument must be of type string. Received type object
// );
// 参数必须是字符串，否则会报错TypeError

// a. path.basename(path[, ext])
// 类似于 Unix 的 basename 命令
// 忽略尾部的目录分隔符  eg. /usr/local/bin/n/n.txt/
// 若path 不是字符串或者给定了 ext【可选的文件扩展名】且不是字符串，则抛出 TypeError。
console.log(
    path.basename(filePath, '.txt')  // n
);

// b. path.dirname(path)  返回 path 的目录名
// 类似于 Unix 的 dirname 命令
// 忽略尾部的目录分隔符  eg. /usr/local/bin/n/
// 如果 path 不是字符串，则抛出 TypeError
console.log(
    path.dirname('/foo/bar/baz/asdf/quux')
);  // /foo/bar/baz/asdf


// c. path.extname(path) // 返回 path 的扩展名，
// 从最后一次出现 .（句点）字符到 path 最后一部分的字符串结束
// 如果在 path 的最后一部分中没有 . ，或者如果 path 的基本名称（参阅 path.basename()）除了第一个字符以外没有 .，则返回空字符串。
// 如果 path 不是字符串，则抛出 TypeError。
console.log(
    path.extname('.html')  // 空字符串   -- 除了第一个字符以外没有.
);
console.log(
    path.extname('index.') // .         -- 最后一个点到最后
);
console.log(
    path.extname('index')  // 空字符串   -- path没有.
);


// 3. 
// path.parse();  将一个路径解析成一个对象，简单分析一个路径
// path.format(); parse的逆操作。从对象返回路径字符串
console.log(
    path.parse(filePath)
); // 参数必须是字符串，否则会报错TypeError

// { root: '/',
//   dir: '/usr/local/bin/n',
//   base: 'n.txt',
//   ext: '.txt',
//   name: 'n' }

// format时参数pathObject内的属性有优先级，
// 如果提供了 pathObject.dir，则忽略 pathObject.root
// 如果 pathObject.base 存在，则忽略 pathObject.ext 和 pathObject.name
console.log(
    path.format(path.parse(filePath))  // /usr/local/bin/n/n.txt
);


// 4. path.normalize(path); 把路径变成标准的路径形式 
// [解析 '..' 和 '.' 片段]
// 当找到多个连续的路径段分隔字符时（例如 POSIX 上的 /、Windows 上的 \ 或 /），则它们将被替换为单个平台特定的路径段分隔符（POSIX 上的 /、Windows 上的 \）
// 参数必须是字符串，否则会报错TypeError
console.log(
    path.normalize('/usr//local/bin'),   // /usr/local/bin
    path.normalize(''),                  //  .   表示当前目录
    path.normalize('/usr/local/../bin')  // /usr/bin
); 


// path.join([...paths]); // ...paths <string> 路径片段的序列。 拼接多个路径，内部会调用normalize
// 任何参数都必须是字符串，否则会报错TypeError
console.log(
    path.join('/usr', 'local', 'bin/'),  // /usr/local/bin/
    path.join('/usr','../local','/bin'),  // /local/bin
    path.join('')  // .
);


// 5. path.resolve([...paths]); 把相对路径解析成绝对路径；(可多个参数)从右到左进行处理，每个后续的 path 前置，直到构造出一个绝对路径
// path.isAbsolute(path); 检测path是否为绝对路径
// path.relative(from, to); 根据当前目录返回from到to的相对路径

// path.resolve([...paths]);
// a. 给定的路径序列从右到左进行处理，每个后续的 path 前置，直到构造出一个绝对路径。 例如，给定的路径片段序列：/foo、 /bar、 baz，调用 path.resolve('/foo', '/bar', 'baz') 将返回 /bar/baz
// b. 如果在处理完所有给定的 path 片段之后还未生成绝对路径，则再加上当前工作目录
// c. 生成的路径已规范化，并且除非将路径解析为根目录，否则将删除尾部斜杠。
// d. 零长度的 path 片段会被忽略
// e. 如果没有传入 path 片段，则 path.resolve() 将返回当前工作目录的绝对路径
// f. 如果任何参数不是字符串，则抛出 TypeError
console.log(
    path.resolve('./'),  // /Users/wpp/Documents/next/JavaScript_Full_Stack/nodejs/base
    path.resolve('/usr/','/local','bin//'),  // local/bin
    path.resolve('root', 'ss'),  // 如果在处理完所有给定的 path 片段之后还未生成绝对路径，则再加上当前工作目录。  /Users/wpp/Documents/next/JavaScript_Full_Stack/nodejs/base/root/ss
    path.resolve(),  // 返回当前工作目录的绝对路径 -- e.
    path.resolve('')  // 返回当前工作目录的绝对路径  -- d,e
); //  参数不是字符串，则抛出 TypeError

// path.isAbsolute(path)
// 如果给定的 path 是零长度字符串，则返回 false
console.log(
    path.isAbsolute('/usr/local/bin'), // true
    path.isAbsolute('usr/local/bin'),  // false
    path.isAbsolute(''),               // false
    path.isAbsolute('.')               // false
); // path参数如果不是字符串，则报错TypeError


// path.relative(from, to)
// 根据当前工作目录返回 from 到 to 的相对路径
// 如果 from 和 to 各自解析到相同的路径（分别调用 path.resolve() 之后），则返回零长度的字符串。
// 如果将零长度的字符串传入 from 或 to，则使用当前工作目录代替该零长度的字符串。
console.log(
    path.relative('/data/f1/temp/aaa', '/data/f1/test/bbb'),  // ../../test/bbb 
    path.relative('/data/f1/temp/aaa', '/data/f1/temp/aaa'),  // ''
    path.relative('', ''),  // ''
    path.relative('/data/f1', '')  // 如果将零长度的字符串传入 from 或 to，则使用当前工作目录代替该零长度的字符串  ../../Users/wpp/Documents/next/JavaScript_Full_Stack/nodejs/base
);  // 参数如果不是字符串，则报错TypeError



//6.  其他路径相关的 require('./'); 总是相对当前文件所在文件夹; ***其他的和process.cwd()一样，相对node启动的文件夹
//  每个模块__dirname,__filename; 总是返回文件的绝对路径，物理磁盘上的路径
//  process.cwd(); 总是返回执行node命令所在的文件夹
// path.resolve()

console.log(
    __dirname
);

console.log(
    __filename
);

console.log(
    process.cwd()
);

console.log(
    path.resolve('./')
);
























































