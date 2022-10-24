var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var logger = require('morgan');
var app = express();
app.use(session({
  secret: "6d19d0ce563450c02c5b1bc7987f4bd6d4315c20b2ec70a46ae841d5d580060b",
  saveUninitialized: false,
  resave: false,
  cookie:{
    maxAge: 87000000,
  }
}));
// app.use(function (req, res, next) {
//   req.session.nombre = "FelipeZura";
//   next();
// });
var indexRouter = require('./routes/index');
var libroRouter= require('./routes/libro');
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/biblioteca/', indexRouter);
app.use('/biblioteca/libro', libroRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
