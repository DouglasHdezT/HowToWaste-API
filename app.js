/**
 * Imports and dependencies
 */

var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const dotenv = require("dotenv");

const database = require('./config/database');

const utilsRouter = require('./routes/utils');
const apiRouter = require('./routes/api');

/**
 * Basic configuration
 */

var app = express();

dotenv.config();
database.connect();

process.title = "HowToWasteAPI";

/**
 * Morgan Middleware
 */


app.use((req, res, next) => {
	const myDate = new Date();
	const { day, month, year, hours, minutes } = {
		day: String(myDate.getDate()).padStart(2, '0'),
		month: String(myDate.getMonth()).padStart(2, '0'),
		year: String(myDate.getFullYear()),
		hours: String(myDate.getHours()).padStart(2, '0'),
		minutes: String(myDate.getMinutes()).padStart(2, '0'),
	}
	req.myDate = `${day}/${month}/${year} ${hours}:${minutes}`;
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
logger.format('logFormat', ':myDate -> :method:url :statusColored, :response-time ms -> from :remote-addr');


app.use(logger('logFormat'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

/**
 * Routing
 */

app.use("/utils", utilsRouter);
app.use("/api", apiRouter);

module.exports = app;
