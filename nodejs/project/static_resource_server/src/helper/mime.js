const path = require('path');

const mimeTypes = {
    "html":"text/html",
    "css":"text/css",
    "js":"text/javascript",
    "gif": "image/gif",
    "ico": "image/x-icon",
    "jpeg": "image/jpeg",
    "jpg": "image/jpeg",
    "json": "application/json",
    "pdf": "application/pdf",
    "png": "image/png",
    "svg": "image/svg+xml",
    "swf": "application/x-shockwave-flash",
    "tiff": "image/tiff",
    "txt": "text/plain",
    "wav": "audio/x-wav",
    "wma": "audio/x-ms-wma",
    "wmv": "video/x-ms-wmv",
    "xml": "text/xml"
};

module.exports = (filePath) => {
    let ext = path.extname(filePath)
        .split('.')
        .pop()
        .toLowerCase();

    if(!ext) {
        ext = filePath;
    }

    return mimeTypes[ext] || mimeTypes['txt'];
};
