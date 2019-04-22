const path = require('path');

// 1. path.normalize(); 把路径变成标准的路径形式
console.log(
    path.normalize('/usr//local/bin')
);

console.log(
    path.normalize('/usr/local/../bin')
);


// 2. path.join(); 拼接多个路径，内部会调用normalize
console.log(
    path.join('/usr', 'local', 'bin/')
);

console.log(
    path.join('/usr','../local','/bin')
);


// 3. path.resolve(); 把相对路径解析成绝对路径
console.log(
    path.resolve('./')
);

// 4. 
// path.basename();  文件的名字 
// path.dirname();   文件夹的名字
// path.extname();   文件的扩展名
const filePath = '/usr/local/bin/n/n.txt';

console.log(
    path.basename(filePath),
    path.dirname(filePath),
    path.extname(filePath)
);


// 5. 
// path.parse();  将一个路径解析成一个对象，简单分析一个路径
// path.format(); parse的逆操作。
console.log(
    path.parse(filePath)
);

// { root: '/',
//   dir: '/usr/local/bin/n',
//   base: 'n.txt',
//   ext: '.txt',
//   name: 'n' }

console.log(
    path.format(path.parse(filePath))
);

// 6. 属性
// sep   路径的分隔符
// delimiter  $PATH的分隔符
// win32   windows系统对应的path方法 
// posix   posix系统对应的path方法
console.log(
    path.sep,
    path.delimiter
);

console.log(
    process.env.PATH
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
























































