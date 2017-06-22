//manages between client and database

import http = require("http");
import url = require("url");
import Database = require("./Database");

interface AssocStringString {
    [key: string]: string;
}

let port: number = process.env.PORT;
if (port == undefined)
    port = 8100;


let server: http.Server = http.createServer();
server.addListener("listening", handleListen);
server.addListener("request", handleRequest);
server.listen(port);


function handleListen(): void {
    console.log("Server listening on port: " + process.env.port);
}

function handleRequest(_request: http.IncomingMessage, _response: http.ServerResponse): void {
    console.log("Request recieved");
    console.log(_request.url);

    let query: AssocStringString = url.parse(_request.url, true).query;
    console.log(query);
     var command: string = query["command"];
    let key: string;
    for (key in query)
        console.log(key + ":" + query[key]);
    
    switch (command) {
        case "insert":
            let iceRequest: iceData = {
                nr: parseInt(query["numberInput"]),
                selection: query["firstname"],
                
                
            };
            Database.insert(iceRequest);
            respond(_response, "storing data");
            break;
        case "find":
            Database.findAll(function(json: string): void {
                respond(_response, json);
            });
            break;
        default:
            respond(_response, "unknown command: " + command);
            break;
    }



    _response.setHeader("Access-Control-Allow-Origin", "*");
    _response.setHeader("content-type", "text/html; charset=utf-8");
    _response.write("First Name: " + query["FirstName"] +  "<br>");
    _response.write("Last Name: " + query["LastName"]+  "<br>");
    _response.write("Address Line 1: " + query["AddressLine1"]+  "<br>");
    _response.write("Address Line 2: " + query["AddressLine2"]+  "<br>");
    _response.write("Town/City: " + query["Town/City"]+  "<br>");
    _response.write("Postal Code: " + query["PostalCode"]+  "<br>");
     _response.write("Town/City: " + query["Town/City"]+  "<br>");
    _response.write("Postal Code: " + query["PostalCode"]+  "<br>");
    _response.end();
   
    let data: iceData = {
        nr: parseInt(url.parse(_request.url, true).query["nr"]),
        selection: url.parse(_request.url, true).query["selection"]
    };
}


function respond(_response: http.ServerResponse, _text: string): void {
    _response.setHeader("Access-Control-Allow-Origin", "*");
    _response.setHeader("content-type", "text/html; charset=utf-8");
    _response.write(_text);
    _response.end();
}

interface iceData {
    nr: number;
    selection: string;
}