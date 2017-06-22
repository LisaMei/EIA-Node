"use strict";
const http = require("http");
const url = require("url");
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
    let key;
    for (key in query)
        console.log(key + ":" + query[key]);
    _response.setHeader("Access-Control-Allow-Origin", "*");
    _response.setHeader("content-type", "text/html; charset=utf-8");
    _response.write("First Name: " + query["FirstName"] + "<br>");
    _response.write("Last Name: " + query["LastName"]);
    _response.end();
    let data = {
        nr: parseInt(url.parse(_request.url, true).query["nr"]),
        selection: url.parse(_request.url, true).query["selection"]
    };
}
//# sourceMappingURL=iceServer.js.map