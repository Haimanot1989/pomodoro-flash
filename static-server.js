const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

const root = path.resolve(__dirname, 'server');
const port = 5000;

const server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url); // <-- parse the request
    let pathname = parsedUrl.pathname;

    // Handle kill-server endpoint
    if (pathname === '/kill-server' && req.method === 'POST') {
        console.log('Received kill-server request. Shutting down...');
        res.writeHead(200, {
            'Content-Type': 'text/plain',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'POST, OPTIONS',
        });
        res.end('Shutting down');
        server.close(() => {
            process.exit(0);
        });
        return;
    }

    // Default to popup.html if root
    let filePath = path.join(root, pathname === '/' ? '/popup.html' : pathname);

    // Add .html if there's no extension
    if (!path.extname(filePath)) filePath += '.html';

    // MIME types
    const mimeTypes = {
        '.html': 'text/html',
        '.jpg': 'image/jpeg',
        '.jpeg': 'image/jpeg',
        '.png': 'image/png',
        '.mp3': 'audio/mpeg',
        '.js': 'text/javascript',
        '.css': 'text/css'
    };

    const ext = path.extname(filePath).toLowerCase();
    const contentType = mimeTypes[ext] || 'application/octet-stream';

    fs.readFile(filePath, (err, data) => {
        if (err) {
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            return res.end('404 Not Found');
        }

        res.writeHead(200, { 'Content-Type': contentType });
        res.end(data);
    });
});

server.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
