const fs = require('fs');
const handlebars = require('handlebars');
const promisify = require('util').promisify;
const stat = promisify(fs.stat);
const readdir = promisify(fs.readdir);

const source = fs.readFileSync()

module.exports = async function (req, res, filePath) {
    try {
        const stats = await stat(filePath);
        if(stats.isFile()){
            res.statusCode = 200;
            res.setHeader('Content-Type', 'text/plain');
            // fs.readFile(filePath, (err, data) => { res.end(data) }); 全部读完为data才传给data
            fs.createReadStream(filePath).pipe(res);
        }else if(stats.isDirectory()) {
            const files = await readdir(filePath);
            res.statusCode = 200;
            res.setHeader('Content-Type', 'text/plain');
            res.end(files.join(','));
        }
    } catch (ex) {
        console.error(ex);
        res.statusCode = 404;
        res.setHeader('Content-Type', 'text/plain');
        res.end(`${filePath} is not a diirectory or file\n ${ex.toString()}`);
    }
}