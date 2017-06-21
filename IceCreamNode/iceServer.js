"use strict";
const http = require("http");
let server = http.createServer();
server.addListener("listen", onListen);
server.addListener("request", onRequest);
server.listen(process.env.port || 8100); //nicht gefunden oder 8100
function onListen() { }
function onRequest(_request, _response) {
}
//# sourceMappingURL=iceServer.js.map