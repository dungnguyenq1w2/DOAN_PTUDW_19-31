require('dotenv').config();

const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const firebaseAdmin = require('firebase-admin');
const passport = require('passport');
const session = require('express-session');

const indexRouter = require('./routes/index.route');
const authRouter = require('./routes/auth.route');
const cakeRouter = require('./routes/cake.route');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'public')));

// session and passport config
app.use(session({
  secret: process.env.SECRET_SESSION,
  resave: true,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());

// for passport
app.use((req, res, next) => {
  res.locals.user = req.user;
  next();
});

// router
app.use('/', indexRouter);
app.use('/', cakeRouter);
app.use('/', authRouter);

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
  res.render('error');
});

// connect to mongodb via mongoose
(async () => {
  try {
    await mongoose.connect(process.env.MONGODB_ATLAS_CONNECTION, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    console.log('Connect to MongoDB successfully');
  } catch (error) {
    console.log(error);
  }
})();

// connect to firebase admin
const serviceAccount = require('./cake-8819c-firebase-adminsdk-r5f1z-7b3e253890.json');

(async () => {
  try {
    await firebaseAdmin.initializeApp({
      credential: firebaseAdmin.credential.cert(serviceAccount),
      storageBucket: 'cake-8819c.appspot.com'
    });

    console.log('Connect to Firebase Admin successfully');
  } catch (error) {
    console.log(error);
  }
})();

module.exports = app;
