// inserts data into database  and query for MongoDB

import Mongo = require("mongodb");
console.log("Database starting");

let db: Mongo.Db;
let databaseURL: string = "mongodb://localhost:27017/Test";
let iceRequests: Mongo.Collection;

if (process.env.NODE_ENV == "production")
    databaseURL = "mongodb://username:password@hostname:port/database";

Mongo.MongoClient.connect(databaseURL, handleConnect);

interface AssocStringString {
    [key: string]: string;
}

interface iceData {
    nr: number;
    selection: string;
}
//   let data: iceData = {
//        nr: parseInt(Url.parse(_request.url, true).query["nr"]),
//        selection: Url.parse(_request.url, true).query["selection"]
//    };



function handleConnect(_err: Mongo.MongoError, _db: Mongo.Db): void {
    if (_err)
        console.log("Can't connect to database, error: ", _err);
    else {
        console.log("Connected to database!");
        db = _db;
        iceRequests = _db.collection("iceRequests");
    }
}

export function insert(_doc: iceData): void {
    iceRequests.insertOne(_doc, handleInsert);
}

function handleInsert(_e: Mongo.MongoError): void {
    console.log("Error! Database insertion returned -> " + _e);
}

export function findAll(_callback: Function): void {
    var cursor: Mongo.Cursor = iceRequests.find();
    cursor.toArray(prepareAnswer);

    function prepareAnswer(_e: Mongo.MongoError, iceRequestArray: iceData[]): void {
        if (_e)
            _callback("Error" + _e);
        else
            _callback(JSON.stringify(iceRequestArray));
    }
}