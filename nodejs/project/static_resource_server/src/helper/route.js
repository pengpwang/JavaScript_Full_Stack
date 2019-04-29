const fs = require('fs');
const path = require('path');
const Handlebars = require('handlebars');
const promisify = require('util').promisify;
const config = require('../config/defaultConfig');
const mime = require('./mime');
const compress = require('./compress');
const range = require('./range');
const isFresh = require('./cache');
const stat = promisify(fs.stat);
const readdir = promisify(fs.readdir);

const tplPath = path.join(__dirname, '../template/dir.tpl');  // 除了require()其他尽量使用绝对路径
const source = fs.readFileSync(tplPath); // 1.后面必须等待全部读取结果； 2.只会执行一次，nodejs项目启动后缓存。3.返回结果Buffer（未指定字符编码）
const template = Handlebars.compile(source.toString());

module.exports = async function (req, res, filePath) {
    try {
        const stats = await stat(filePath);
        if(stats.isFile()){
            const contentType = mime(filePath);
            res.setHeader('Content-Type', contentType);

            if(isFresh(stats, req, res)){
                res.statusCode = 304;
                res.end();
                return;
            }


            // fs.readFile(filePath, (err, data) => { res.end(data) }); 全部读完为data才传给data
            
            let rs;
            const { code, start, end } = range(stats.size, req, res);
            if(code === 200){
                res.statusCode = 200;
                rs = fs.createReadStream(filePath);
            }else{
                res.statusCode = 206;
                rs = fs.createReadStream(filePath, { start, end });
            }
            
            if(filePath.match(config.compress)){
                rs = compress(rs, req, res);
            }
            rs.pipe(res);
        }else if(stats.isDirectory()) {
            const files = await readdir(filePath);
            res.statusCode = 200;
            res.setHeader('Content-Type', 'text/html');

            const dir = path.relative(config.root, filePath);
            const data = {
                title: path.basename(filePath),
                dir: dir ? `/${dir}` : '', // 相对于网站的根路径，当filePath为当前路径，（根路径）时，返回的是空。 ？？？？
                files: files.map((v) => {
                    return {
                        file: v,
                        icon: mime(v)
                    }
                })
            };

            res.end(template(data));
        }
    } catch (ex) {
        console.error(ex);
        res.statusCode = 404;
        res.setHeader('Content-Type', 'text/plain');
        res.end(`${filePath} is not a diirectory or file\n ${ex.toString()}`);
    }
}