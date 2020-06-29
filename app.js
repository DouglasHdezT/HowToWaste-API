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
logger.token("statusColored", (req, res) => {
	var status = (typeof res.headersSent !== 'boolean' ? Boolean(res.header) : res.headersSent)
        ? res.statusCode
        : undefined

    var color = status >= 500 ? 31 // red
        : status >= 400 ? 33 // yellow
            : status >= 300 ? 36 // cyan
                : status >= 200 ? 32 // green
                    : 0; // no color

    return '\x1b[' + color + 'm' + status + '\x1b[0m';
});
logger.format('logFormat', ':myDate -> :method:url :statusColored, :response-time ms');

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
