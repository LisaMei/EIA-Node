//manages between client and database
"use strict";
const http = require("http"); //imports HTTP module into cache
const Url = require("url"); //splits web address into readable parts
let port = process.env.PORT;
if (port == undefined)
    port = 8100;
let server = http.createServer(); //creates HTTP server that listsnes to ports 
server.addListener("listening", handleListen);
server.addListener("request", handleRequest);
server.listen(port);
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/mydb";
function handleListen() {
    console.log("Server listening on port: " + process.env.port);
}
//incoming message, response are created by the server
function handleRequest(_request, _response) {
    console.log("Request recieved");
    console.log(_request.url);
    let query = Url.parse(_request.url, true).query; //splits string into readable parts, returns URL object with the parts as properties
    console.log(query); //show whole string in console
    var command = query["command"];
    let key;
    for (key in query)
        console.log(key + ":" + query[key]);
    _response.setHeader("Access-Control-Allow-Origin", "*");
    _response.setHeader("content-type", "text/html; charset=utf-8"); //displays server response as HTML
    _response.write("CUSTOMER INFO" + "<br>" + "<br>");
    _response.write("First Name: " + query["FirstName"] + "<br>");
    _response.write("Last Name: " + query["LastName"] + "<br>");
    _response.write("Address Line 1: " + query["AddressLine1"] + "<br>");
    _response.write("Address Line 2: " + query["AddressLine2"] + "<br>");
    _response.write("Town/City: " + query["Town/City"] + "<br>");
    _response.write("Postal Code: " + query["PostalCode"] + "<br>" + "<hr>");
    _response.write("SELECTION" + "<br>" + "<br>");
    _response.write("Container: " + query["containerChoice"] + "<br>");
    _response.write("Chocolate: " + query["Chocolate"] + "<br>");
    _response.write("Strawberry: " + query["Strawberry"] + "<br>");
    _response.write("Vanilla: " + query["Vanilla"] + "<br>");
    _response.write("Cinnamon: " + query["Cinnamon"] + "<br>");
    _response.write("Lemon: " + query["Lemon"] + "<br>");
    _response.write("Stracciatella: " + query["Stracciatella"] + "<br>");
    _response.write("Walnut: " + query["Walnut"] + "<br>");
    _response.write("Toppings: " + query["toppingCheckbox"] + "<br>");
    _response.write("SHIPPING: " + "<br>" + "<br>");
    _response.write("Delivery: " + query["Delivery"] + "<br>");
    _response.end();
    //switch statement for filling the database with data
    /*switch (command) {
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
    }*/
} //handleRequest end tag
function respond(_response, _text) {
    _response.setHeader("Access-Control-Allow-Origin", "*"); //allows all domains
    _response.setHeader("content-type", "text/html; charset=utf-8");
    _response.write(_text);
    _response.end();
}
//# sourceMappingURL=iceServer.js.map