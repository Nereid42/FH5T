const http = require("./js/http/http.js");


console.log("FH5 - Telemetry");


function test(response) {
    console.log("test called");
    response.writeHead(200);
    response.end("THIS IS A TEST");      
}

const server = new http.HttpServer(8000, __dirname+"/html");
server.register("/test",test);
server.start();