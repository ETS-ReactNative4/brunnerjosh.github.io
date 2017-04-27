require('dotenv').config();
const fs = require('fs');
const path = require('path');
const http = require('http');
const https = require('https');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const routes = require('./routes/api-router');
const socket = require('./routes/socket');
const config = require('./static.json');

var options = process.env.NODE_ENV === 'development' ? {
  key: fs.readFileSync('../.localhost-ssl/key.pem'),
  cert: fs.readFileSync('../.localhost-ssl/cert.pem')
} : {};

 var forceSsl = function (req, res, next) {
    if (req.headers['x-forwarded-proto'] !== 'https') {
        return res.redirect(['https://', req.get('Host'), req.url].join(''));
    }
    return next();
 };

const secureMode = process.env.HTTPS === 'true' && process.env.NODE_ENV === 'development';
const server = secureMode ? https.createServer(options, app) : http.createServer(app);
socket.listen(server);

const port = process.env.PORT || 8080;

if (process.env.NODE_ENV === 'production') {
  console.log('forcing ssl!');
  app.use(forceSsl);
}
app.use(bodyParser.json());                         // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use('/api', routes);
app.use(express.static(__dirname + `/${config['root']}`));

app.get('*', (req, res) => res.sendFile( path.resolve(__dirname, config['root'], config.routes['/**'])) );

server.listen(port, function (err) {
  if (err) {
    console.error(err);
    return;
  }

  console.log( (secureMode ? 'HTTPS' : 'HTTP') + ' Express server listening on %d, in %s mode', port, app.get('env'));
});

