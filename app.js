// server.js
// load the things we need
var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');

var PORT = process.env.port || 3000;

// set the view engine to ejs
app.set('view engine', 'ejs');
app.set('views',path.join(__dirname,'/views'));

//static assets
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json() );
app.use(bodyParser.urlencoded({extended: true}));

app.use('/',require ('./routes/index'));
app.use('/table',require ('./routes/table'));
app.use('/db',require('./routes/db'));
app.use('/console',require('./routes/console'));

//error handler
app.use(function(req,res,next) {
  var err = new Error();
  err.status = 404;
  next(err);
}, function (err, req, res, next) {
  res.render('pages/404');
});

app.listen(PORT, function () {
  console.log('Magic Happens on Port '+PORT);
});
