/**
 * Imports and dependencies
 */

var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const dotenv = require("dotenv");

const database = require('./config/database');

var utilsRouter = require('./routes/utils');

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

app.use("/utils", utilsRouter);

module.exports = app;
