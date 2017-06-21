import http = require("http");
import url = require("url");

let server: http.Server = http.createServer();
server.addListener("listen", onListen);
server.addListener("request", onRequest);
server.listen(process.env.port || 8100);  //nicht gefunden oder 8100


function onListen():void{}

function onRequest(_request: http.IncomingMessage, _response: http.ServerResponse):void{
    
}
