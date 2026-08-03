#!/usr/bin/env node
const http = require('http');
const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..', 'website');
const port = Number(process.env.PORT || 4173);

const mimeTypes = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.webp': 'image/webp',
  '.ico': 'image/x-icon'
};

function sendFile(res, filePath) {
  const extension = path.extname(filePath).toLowerCase();
  const contentType = mimeTypes[extension] || 'text/plain; charset=utf-8';

  const stream = fs.createReadStream(filePath);
  stream.on('open', () => {
    res.writeHead(200, { 'Content-Type': contentType });
  });
  stream.on('error', () => {
    res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end('500 Internal Server Error');
  });
  stream.pipe(res);
}

const server = http.createServer((req, res) => {
  const requestPath = decodeURIComponent(req.url.split('?')[0]);
  let normalizedPath = path.normalize(requestPath).replace(/^[/\\]+/, '');
  if (normalizedPath === '.') {
    normalizedPath = '';
  }
  const filePath = path.join(rootDir, normalizedPath);
  const relativePath = path.relative(rootDir, filePath);

  if (relativePath.startsWith('..') || path.isAbsolute(relativePath)) {
    res.writeHead(403, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end('403 Forbidden');
    return;
  }

  const targetPath = normalizedPath === '' ? rootDir : filePath;

  fs.stat(targetPath, (err, stats) => {
    if (err) {
      const fallbackPath = path.join(rootDir, 'index.html');
      if (normalizedPath === '' || normalizedPath === '.') {
        sendFile(res, fallbackPath);
      } else {
        res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
        res.end('404 Not Found');
      }
      return;
    }

    if (stats.isDirectory()) {
      const indexPath = path.join(targetPath, 'index.html');
      fs.access(indexPath, fs.constants.R_OK, accessErr => {
        if (accessErr) {
          res.writeHead(403, { 'Content-Type': 'text/plain; charset=utf-8' });
          res.end('403 Forbidden');
        } else {
          sendFile(res, indexPath);
        }
      });
      return;
    }

    sendFile(res, targetPath);
  });
});

server.listen(port, () => {
  console.log(`Static preview available at http://localhost:${port}`);
  console.log(`Serving files from: ${rootDir}`);
});
