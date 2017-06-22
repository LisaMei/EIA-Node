//manages between client and database
"use strict";
const http = require("http");
const url = require("url");
const Database = require("./Database");
let port = process.env.PORT;
if (port == undefined)
    port = 8100;
let server = http.createServer();
server.addListener("listening", handleListen);
server.addListener("request", handleRequest);
server.listen(port);
function handleListen() {
    console.log("Server listening on port: " + process.env.port);
}
function handleRequest(_request, _response) {
    console.log("Request recieved");
    console.log(_request.url);
    let query = url.parse(_request.url, true).query;
    console.log(query);
    var command = query["command"];
    let key;
    for (key in query)
        console.log(key + ":" + query[key]);
    _response.setHeader("Access-Control-Allow-Origin", "*");
    _response.setHeader("content-type", "text/html; charset=utf-8");
    _response.write("First Name: " + query["FirstName"] + "<br>");
    _response.write("Last Name: " + query["LastName"] + "<br>");
    _response.write("Address Line 1: " + query["AddressLine1"] + "<br>");
    _response.write("Address Line 2: " + query["AddressLine2"] + "<br>");
    _response.write("Town/City: " + query["Town/City"] + "<br>");
    _response.write("Postal Code: " + query["PostalCode"] + "<br>");
    _response.write("Town/City: " + query["Town/City"] + "<br>");
    _response.write("Postal Code: " + query["PostalCode"] + "<br>");
    _response.end();
    switch (command) {
        case "insert":
            let iceRequest = {
                nr: parseInt(query["numberInput"]),
                selection: query["firstname"],
            };
            Database.insert(iceRequest);
            respond(_response, "storing data");
            break;
        case "find":
            Database.findAll(function (json) {
                respond(_response, json);
            });
            break;
        default:
            respond(_response, "unknown command: " + command);
            break;
    }
    let data = {
        nr: parseInt(url.parse(_request.url, true).query["nr"]),
        selection: url.parse(_request.url, true).query["selection"]
    };
}
function respond(_response, _text) {
    _response.setHeader("Access-Control-Allow-Origin", "*");
    _response.setHeader("content-type", "text/html; charset=utf-8");
    _response.write(_text);
    _response.end();
}
//# sourceMappingURL=iceServer.js.map