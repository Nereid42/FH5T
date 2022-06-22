const http = require("./http/http.js");


console.log("FH5 - Telemetry");

http.WWW_ROOT = __dirname+"/html";
const server = new http.HttpServer(8000);
server.start();