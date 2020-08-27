var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bcrypt = require('bcryptjs'); // เข้ารหัส password

// import database
var mongo= require('mongodb');
var mongoose = require('mongoose'); // library ODM Object Document mapping
const db = mongoose.connection;

// passport
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var session = require('express-session')  // for login session and have to initial next

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

app.use(session({  // initial for express-session
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true//,
  // cookie: { secure: true }
}))



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// middle ware  สำหรับ passport *ต้องทำ
app.use(passport.initialize());  // ตั้งค่าเริ่มต้น
app.use(passport.session());

//  messages
app.use(require('connect-flash')());
app.use(function (req, res, next) {
  res.locals.messages = require('express-messages')(req, res);
  next();
});

// set global session var 
app.get('*',function(req,res,next){ //statement นี้เรียกทุกครั้งที่มีการ call
  res.locals.user = req.user || null;  // ถึงแม้จะมีการกำหนดค่าตรงนี้ แต่ถ้าไม่เปิด express-session ก็จะใช้งานไม่ได้
  next();
})

app.use('/', indexRouter);
app.use('/users', usersRouter);

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
