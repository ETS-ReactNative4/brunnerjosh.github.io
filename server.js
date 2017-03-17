require('dotenv').config();
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const port = process.env.PORT || 8080;
const app = express();
const config = require('./static.json');
const routes = require('./routes/api-router');

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.use('/api', routes);

console.log('__dirname: ', __dirname);

app.use(express.static(__dirname + '/build'));
app.get('*', function (req, res) {
  console.log('hit here!');
  res.sendFile('index.html');
});
// app.use(__dirname, express.static('/build'))

// app.get('*', (req, res) => res.sendFile('index.html') );

app.listen(port, function (err) {
  if (err) {
    console.error(err);
    return;
  }

  console.log('Express server listening on %d, in %s mode', port, app.get('env'));
});
