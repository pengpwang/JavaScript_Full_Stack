const { createGzip, createDeflate } = require('zlib');

// rs 需要压缩的流; req获取浏览器支持的压缩方式; res告诉浏览器返回内容的压缩方式
module.exports = (rs, req, res) => {
    const acceptEncoding = req.headers['accept-encoding'];

    // 浏览器不支持压缩，或者支持的压缩不是gzip或deflate
    if(!acceptEncoding || !acceptEncoding.match(/\b(gzip|deflate)\b/)){
        return rs;
    } else if(acceptEncoding.match(/\bgzip\b/)) {
        res.setHeader('Content-Encoding', 'gzip');
        return rs.pipe(createGzip());
    } else if(acceptEncoding.match(/\bdeflate\b/)) {
        res.setHeader('Content-Encoding', 'deflate');
        return rs.pipe(createDeflate());
    }

};