const express = require('express');
const favicon = require('express-favicon');
const path = require('path');
const { createProxyMiddleware } = require('http-proxy-middleware');
const port = process.env.PORT || 8080;

const app = express();
app.use(favicon(__dirname + '/build/favicon.ico'));
app.use(express.static(__dirname));
app.use(express.static(path.join(__dirname, 'build')));

app.get('/ping', function (req, res) {
  return res.send('pong');
});

app.use('/api', createProxyMiddleware({ target: 'http://localhost:3001', changeOrigin: true }));

app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

console.log('Server listening on port ', port);
app.listen(port);