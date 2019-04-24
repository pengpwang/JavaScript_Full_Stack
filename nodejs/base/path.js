const path = require('path'); // path模块处理文件路径和目录路径

// 1. path.normalize(); 把路径变成标准的路径形式
console.log(
    path.normalize('/usr//local/bin'),
    path.normalize(''),  //  .
    path.normalize('/usr/local/../bin')
); // 参数必须是字符串，否则会报错TypeError


// 2. path.join(); 拼接多个路径，内部会调用normalize
// 任何参数都必须是字符串，否则会报错TypeError
console.log(
    path.join('/usr', 'local', 'bin/'),
    path.join('/usr','../local','/bin'),
    path.join('')  // .
);


// 3. path.resolve(); 把相对路径解析成绝对路径；(可多个参数)从右到左进行处理，每个后续的 path 前置，直到构造出一个绝对路径
// path.isAbsolute(path); 检测path是否为绝对路径
// path.relative(from, to); 根据当前目录返回from到to的相对路径
console.log(
    path.resolve('./'),
    path.resolve('/usr/','/local','bin'),  // local/bin
    path.resolve('root', 'ss'),  // 如果在处理完所有给定的 path 片段之后还未生成绝对路径，则再加上当前工作目录。
    path.resolve(),  // 返回当前工作目录的绝对路径
    path.resolve('')  // 返回当前工作目录的绝对路径
); //  参数不是字符串，则抛出 TypeError
console.log(
    path.isAbsolute('/usr/local/bin'),
    path.isAbsolute('usr/local/bin'),
    path.isAbsolute(''),
    path.isAbsolute('.')
); // path参数如果不是字符串，则报错TypeError
console.log(
    path.relative('/data/f1/temp/aaa', '/data/f1/test/bbb'),
    path.relative('/data/f1/temp/aaa', '/data/f1/temp/aaa'),
    path.relative('', ''),
    path.relative('/data/f1', '')  // 如果将零长度的字符串传入 from 或 to，则使用当前工作目录代替该零长度的字符串
);  // 参数如果不是字符串，则报错TypeError

// 4. 
// path.basename(path[,ext]);  文件的名字 
// path.dirname();   文件夹的名字
// path.extname();   文件的扩展名
const filePath = '/usr/local/bin/n/n.txt/';

console.log(
    path.basename(filePath),
    path.dirname(filePath),  
    path.extname(filePath)
);  // 参数必须是字符串，否则会报错TypeError

console.log(
    path.basename(filePath, '.txt')  // n
);

// path最后一部分没有. 或者基本名称的第一个字符为. 均返回空字符串
console.log(
    path.extname('.html')  // 空字符串
);
console.log(
    path.extname('index.') // .
);
console.log(
    path.extname('index')  // 空字符串
);



// 5. 
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

console.log(
    path.format(path.parse(filePath))
);
// format时参数pathObject内的属性有优先级，
// 如果提供了 pathObject.dir，则忽略 pathObject.root
// 如果 pathObject.base 存在，则忽略 pathObject.ext 和 pathObject.name


// 6. 属性
// sep   路径的分隔符; windows上\  posix/
// delimiter  $PATH的分隔符; windows上为;  posix上为:
// win32   windows系统对应的path方法 
// posix   posix系统对应的path方法
console.log(
    path.sep,
    path.delimiter
);

console.log(
    process.env.PATH,
    process.env.PATH.split(path.delimiter)
);

console.log(
    path.win32.sep,
    path.win32.delimiter
);

console.log(
    path.posix.sep,
    path.posix.delimiter
);


//7.  其他路径相关的 require('./'); 总是相对当前文件所在文件夹; ***其他的和process.cwd()一样，相对node启动的文件夹
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
























































