const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose')
const passport = require("passport");
const session = require("express-session");

require('./config/passport.js')(passport);
require('dotenv').config()

const indexRouter = require('./routes/index');
const signUpRouter = require('./routes/signUp');
const joinRouter = require('./routes/join');
const messageRouter = require('./routes/message');

//MongoDB
const mongoDb = process.env.MONGO_STRING;
mongoose.connect(mongoDb, { useUnifiedTopology: true, useNewUrlParser: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'mongo connection error'));

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(session(
  { 
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { sameSite: 'strict'}
  }
));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use((req, res, next) => {
   // To access user as variable without passing into controllers for views.
  res.locals.currentUser = req.user;
  next();
});

app.use('/', indexRouter);
app.use('/sign-up', signUpRouter);
app.use('/join', joinRouter);
app.use('/message', messageRouter);

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
