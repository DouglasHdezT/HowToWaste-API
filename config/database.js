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