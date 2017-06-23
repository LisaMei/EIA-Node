// inserts data into database  and query for MongoDB
"use strict";
const Mongo = require("mongodb");
console.log("Database starting");
let databaseURL = "mongodb://localhost:27017/Test";
let db;
let iceRequests;
//   let data: iceData = {
//        nr: parseInt(Url.parse(_request.url, true).query["nr"]),
//        selection: Url.parse(_request.url, true).query["selection"]
//    };
if (process.env.NODE_ENV == "production")
    databaseURL = "mongodb://username:password@hostname:port/database";
Mongo.MongoClient.connect(databaseURL, handleConnect);
function handleConnect(_e, _db) {
    if (_e)
        console.log("Can't connect to database, error: ", _e);
    else {
        console.log("Connected to database!");
        db = _db;
        iceRequests = _db.collection("iceRequests");
    }
}
function insert(_doc) {
    iceRequests.insertOne(_doc, handleInsert);
}
exports.insert = insert;
function handleInsert(_e) {
    console.log("Error! Database insertion returned -> " + _e);
}
function findAll(_callback) {
    var cursor = iceRequests.find();
    cursor.toArray(prepareAnswer);
    function prepareAnswer(_e, iceRequestArray) {
        if (_e)
            _callback("Error" + _e);
        else
            _callback(JSON.stringify(iceRequestArray));
    }
}
exports.findAll = findAll;
//# sourceMappingURL=database.js.map