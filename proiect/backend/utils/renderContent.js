let fs = require('fs')
let mimeTypes = {
    '.html': 'text/html',
    '.js': 'text/javascript',
    '.css': 'text/css',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpg',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml',
    '.wav': 'audio/wav',
    '.mp4': 'video/mp4',
    '.woff': 'application/font-woff',
    '.ttf': 'application/font-ttf',
    '.eot': 'application/vnd.ms-fontobject',
    '.otf': 'application/font-otf',
    '.wasm': 'application/wasm'
}
module.exports = (route, mimeType, response) => {
    let contentType = mimeTypes[`.${mimeType}`] || 'application/octet-stream'

    fs.readFile(route, function (error, content) {
        if (error) {
            if (error.code == 'ENOENT') {
                fs.readFile('../frontend/404/404.html', function (error, content) {
                    response.writeHead(404, { 'Content-Type': 'text/html' })
                    response.end(content, 'utf-8');
                })

            }
            else {
                response.writeHead(500);
                response.end('Sorry, check with the site admin for error: ' + error.code + ' ..\n')
            }
        }
        else {
            response.writeHead(200, { 'Content-Type': contentType })
            response.end(content, 'utf-8');
        }
    });
}

