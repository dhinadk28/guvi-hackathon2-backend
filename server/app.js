var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session')
var dotenv = require('dotenv');
var cors = require('cors');
var indexRouter = require('../../Scalaplex-Web-APP-main/server/routes/index');
var usersRouter = require('../../Scalaplex-Web-APP-main/server/routes/users');
var customer =require('../../Scalaplex-Web-APP-main/server/routes/customer')
var app = express();
dotenv.config({ path: './config.env' })

require('../../Scalaplex-Web-APP-main/server/models/conn')


app.use(cors());

app.use(session(
  {
    name: 'sid',
    secret: 'random message', //this is needed for making a session key
    saveUninitialized: false, //for login sessions set it to false, setting to true means store blank sessions
    resave: false,
    
  }
)
);

// view engine setup

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/', usersRouter)
app.use('/index', indexRouter);
app.use('/customer',customer)



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

});

module.exports = app;
