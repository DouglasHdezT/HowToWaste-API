const Mongoose = require("mongoose");

const username = process.env.DBUSER || "root";
const password = process.env.DBPASS || "root";

const database = "HowToWaste";
const host = process.env.DBHOST || "localhost";
const port = process.env.DBPORT || "27017";

const uri = `mongodb://${username}:${password}@${host}:${port}/${database}?authSource=admin`;

const connect = ()=>{
    Mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(()=>{
        console.log(`Conection to ${database} successful`);
    })
    .catch(()=>{
        console.log(`An error happened trying to connect ${database} database`);
    });;

    Mongoose.Promise = global.Promise;
}



module.exports = {
    connect,
};