import http = require("http");
import url = require("url");

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
    let key: string;
    for (key in query)
        console.log(key + ":" + query[key]);


    _response.setHeader("Access-Control-Allow-Origin", "*");
    _response.setHeader("content-type", "text/html; charset=utf-8");
    _response.write("First Name: " + query["FirstName"] +  "<br>");
    _response.write("Last Name: " + query["LastName"]);
    _response.end();



   
    let data: MyData = {
        nr: parseInt(url.parse(_request.url, true).query["nr"]),
        selection: url.parse(_request.url, true).query["selection"]
    };

}


interface MyData {
    nr: number;
    selection: string;
}