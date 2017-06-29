//Simple database insertion and query for MongoDB
"use strict";
const Mongo = require("mongodb");
console.log("Database starting LOLOLOLOL");
let databaseURL = "mongodb://localhost:27017/Test";
let db;
let students;
if (process.env.NODE_ENV == "production")
    databaseURL = "mongodb://username:password@hostname:port/database";
Mongo.MongoClient.connect(databaseURL, handleConnect);
function handleConnect(_e, _db) {
    if (_e)
        console.log("Unable to connect to database, error: ", _e);
    else {
        console.log("Connected to database!");
        db = _db;
        students = _db.collection("students");
    }
}
function insert(_doc) {
    students.insertOne(_doc, handleInsert);
}
exports.insert = insert;
function handleInsert(_e) {
    console.log("Database insertion returned -> " + _e);
}
function findOne(_value, _callback) {
    students.findOne({ "matrikel": _value }, prepareAnswer);
    function prepareAnswer(_e, student) {
        if (_e)
            _callback("Error" + _e);
        else
            _callback(JSON.stringify(student));
    }
}
exports.findOne = findOne;
function findAll(_callback) {
    var cursor = students.find(); //Kriterien nach was man sucht 
    cursor.toArray(prepareAnswer);
    function prepareAnswer(_e, studentArray) {
        if (_e)
            _callback("Error" + _e);
        else
            _callback(JSON.stringify(studentArray));
    }
}
exports.findAll = findAll;
//# sourceMappingURL=Database.js.map