//Simple database insertion and query for MongoDB

import Mongo = require("mongodb");
console.log("Database starting LOLOLOLOL");

let databaseURL: string = "mongodb://localhost:27017/Test";
let db: Mongo.Db;
let students: Mongo.Collection;

if (process.env.NODE_ENV == "production")
    databaseURL = "mongodb://username:password@hostname:port/database";

Mongo.MongoClient.connect(databaseURL, handleConnect);

function handleConnect(_e: Mongo.MongoError, _db: Mongo.Db): void {
    if (_e)
        console.log("Unable to connect to database, error: ", _e);
    else {
        console.log("Connected to database!");
        db = _db;
        students = _db.collection("students");
    }
}

export function insert(_doc: StudentData): void { //einen best. Studenten raussuchen
    students.insertOne(_doc, handleInsert);
}

function handleInsert(_e: Mongo.MongoError): void {
    console.log("Database insertion returned -> " + _e);
}


export function findOne(_value: number, _callback: Function): void {
    students.findOne({"matrikel": _value}, prepareAnswer);
    function prepareAnswer(_e: Mongo.MongoError, student: StudentData): void {
        if (_e)
            _callback("Error" + _e);
        else
            _callback(JSON.stringify(student));
    }
}

export function findAll(_callback: Function): void {
    var cursor: Mongo.Cursor = students.find(); //Kriterien nach was man sucht 
    cursor.toArray(prepareAnswer);

    function prepareAnswer(_e: Mongo.MongoError, studentArray: StudentData[]): void {
        if (_e)
            _callback("Error" + _e);
        else
            _callback(JSON.stringify(studentArray));
    }
}
