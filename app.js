/**
 * Imports and dependencies
 */
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const dotenv = require("dotenv");

const database = require('./config/database');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var auxRouter = require('./routes/aux');

/**
 * Basic configuration
 */

dotenv.config();
process.title = "HowToWasteAPI";

var app = express();
database.connect();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

/**
 * Routing
 */

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use("/aux", auxRouter);

module.exports = app;
