const { exec } = require('child_process');
const process = require('process');

const http = require("./js/http/http.js");

const PORT=8000;

function exit(response) {
    console.log("process exit");
    response.writeHead(200);
    response.end("server stopped");      
    process.exit();     
}

console.log("starting FH5T");
//
// start HTTP server
const server = new http.HttpServer(PORT, __dirname+"/html");
server.register("/stop-server",exit);
server.start();
//
// open browser
const URL="http://localhost:"+PORT+"/index.html";
exec('start /max '+URL);    

