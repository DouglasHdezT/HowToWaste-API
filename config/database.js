/*
Copyright (c) 2020 AKHeroes.

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to use,
copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the
Software, and to permit persons to whom the Software is furnished to do so, subject
to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED,
INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR
PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE
FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
DEALINGS IN THE SOFTWARE.
*/

const Mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config()

const username = process.env.DBUSER;
const password = process.env.DBPASS;
const authSource = process.env.AUTHSOURCE;

const database = "HowToWaste";
const host = process.env.DBHOST || "localhost";
const port = process.env.DBPORT || "27017";

const uri = `mongodb://${host}:${port}/${database}`;

const connect = ()=>{
    Mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true, user: username, pass: password, authSource: authSource })
    .then(()=>{
        console.log(`Conection to ${database} successful`);
    })
    .catch((err)=>{
		console.log(err);
        console.log(`An error happened trying to connect ${database} database`);
    });;

    Mongoose.Promise = global.Promise;
}



module.exports = {
    connect,
};