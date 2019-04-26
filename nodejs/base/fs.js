// 0. fs模块综述
// 所以文件系统操作都有同步和异步的形式
// 异步的形式，最后一个参数都是异步完成的回调
// 异步回调的参数取决于具体方法，但第一个参数始终预留用于异常，没有异常则err为null或undefined
// 回调最好不要省略


// 1. fs.readFile();读文件 异步
// fs.readFileSync(); 同步




// 2. fs.writeFile(); 写文件
// fs.writeFileSync(); 


// 3. fs.stat(); 获取指定文件的信息



// 4. fs.rename(); 重命名


//5 . fs.unlink(); 删除文件


// 6. fs.readdir(); 读取文件夹内的所有文件


// 7. fs.mkdir(); 创建一个文件夹


// 8. fs.rmdir(); 删除文件夹


//9.fs.watch(); 监控文件夹或文件的变化   =====>用来做本地构建
// fs.watchFile();

//10. 流； fs.createReadStream() ******


// 11. fs.createWriteStream() ********




