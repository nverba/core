var express     = require('express');
var app         = express();
var bodyParser  = require('body-parser');
// var morgan      = require('morgan');

var jwt    = require('jsonwebtoken'); // used to create, sign, and verify tokens
var config = require('./config'); // get our config file

// =======================
// configuration =========
// =======================

var port = process.env.PORT || 8080; // used to create, sign, and verify tokens
app.set('superSecret', config.secret); // secret variable

// use body parser so we can get info from POST and/or URL parameters
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// use morgan to log requests to the console
// app.use(morgan('dev'));

// =======================
// routes ================
// =======================

if (process.env.NODE_ENV === 'development') {
  app.use(express.static(__dirname + '/build'));
} else {
  app.use(express.static(__dirname + '/public'));
}


// basic route
// app.get('/', function(req, res) {
//     res.send('Hello! The API is at http://localhost:' + port + '/api');
// });

// =======================
// start the server ======
// =======================

app.listen(port);
// console.log('Server running @ http://localhost:' + port);