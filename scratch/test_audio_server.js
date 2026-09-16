import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const distDir = path.join(__dirname, '..', 'dist');

const mimeTypes = {
  '.html': 'text/html',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.wav': 'audio/wav',
  '.mp3': 'audio/mpeg',
  '.png': 'image/png',
};

const server = http.createServer((req, res) => {
  let reqUrl = req.url.split('?')[0];
  if (reqUrl.startsWith('/memoverse/')) {
    reqUrl = reqUrl.replace('/memoverse/', '/');
  }
  let filePath = path.join(distDir, reqUrl === '/' ? 'index.html' : reqUrl);
  if (!fs.existsSync(filePath)) {
    filePath = path.join(distDir, 'index.html');
  }

  const ext = path.extname(filePath).toLowerCase();
  const contentType = mimeTypes[ext] || 'application/octet-stream';

  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404);
      res.end('Not Found');
    } else {
      res.writeHead(200, { 'Content-Type': contentType, 'Access-Control-Allow-Origin': '*' });
      res.end(data);
    }
  });
});

server.listen(4173, () => {
  console.log('Test server running at http://localhost:4173/');

  const testWavs = [
    'assets/gogona-UywANp4M.wav',
    'assets/bihu-dhol-DeL6LJ_a.wav',
    'assets/bamboo_flute-JTHjdbGP.wav',
    'assets/river_nature-df_70Cep.wav'
  ];

  testWavs.forEach(wav => {
    http.get(`http://localhost:4173/${wav}`, (res) => {
      let dataLen = 0;
      res.on('data', chunk => dataLen += chunk.length);
      res.on('end', () => {
        console.log(`HTTP GET ${wav} -> Status: ${res.statusCode}, Content-Type: ${res.headers['content-type']}, ReceivedBytes: ${dataLen}`);
      });
    });
  });

  setTimeout(() => {
    server.close();
    process.exit(0);
  }, 3000);
});
