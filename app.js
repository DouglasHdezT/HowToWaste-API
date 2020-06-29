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

var app = express();
dotenv.config();
process.title = "HowToWasteAPI";

/**
 * Morgan Middleware
 */


app.use((req, res, next) => {
	const myDate = new Date();
	req.myDate = `${myDate.getDate()}/${myDate.getMonth()}/${myDate.getFullYear()} ${myDate.getHours()}:${myDate.getMinutes()}`;
	next();
})

logger.token("myDate", req => req.myDate);
logger.format('logFormat', ':myDate, :remote-addr, :status, :method:url :response-time ms');

database.connect();

app.use(logger('logFormat'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

/**
 * Routing
 */

app.use("/utils", utilsRouter);

module.exports = app;
