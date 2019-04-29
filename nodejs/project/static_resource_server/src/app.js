const http = require('http');
const path = require('path');
const chalk = require('chalk');

const conf = require('./config/defaultConfig');
const route = require('./helper/route');

const server = http.createServer((req, res) => {
    const filePath = path.join(conf.root, req.url);
    route(req, res, filePath);
});

server.listen(conf.port, conf.hostname, () => {
    const addr = `http://${conf.hostname}:${conf.port}`;
    console.info(`Server started at ${chalk.green(addr)}`);
});

// 终端：  curl -r 0-10 -i http://127.0.0.1:9527/src/app.js 测试range 206等