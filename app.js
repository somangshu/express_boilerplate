var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var passport = require('passport');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

// Router variables
var indexRouter = require('./routes/index');
var authRouter = require('./routes/auth');
var apiRouter = require('./routes/api');

var config = require('./config/database');
mongoose.Promise = global.Promise;
mongoose.connect(config.database)
  .then(() => console.log('connection succesful'))
  .catch((err) => console.error(err));

//init express app
var app = express();

// enable url encoding
app.use(bodyParser.urlencoded({
  extended: true
}));

//enable CORS support
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.use(passport.initialize());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//define router
app.use('/', indexRouter);
app.use('/app', authRouter);
app.use('/api', apiRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json(res.locals);
});

module.exports = app;