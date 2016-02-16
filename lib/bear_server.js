const express = require('express');
const app = module.exports = exports = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://localhost/bears_app_dev');

const bearsRouter = require(__dirname + '/router');


// parse application/vnd.api+json as json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); 

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true })); 

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:5000');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  next();
});

app.use('/api', bearsRouter);

var PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log('Server up on port: ' + PORT));
