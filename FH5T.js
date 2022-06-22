const { exec } = require('child_process');
const process = require('process');

const http = require("./js/http/http.js");
const udp = require("./js/network/udp.js")

const UDP_PORT=7999;
const HTTP_PORT=8000;

function exit(response) {
    console.log("process exit");
    response.writeHead(200);
    response.end("server stopped");      
    process.exit();     
}

console.log("starting FH5T");
//
// start HTTP server
const server = new http.HttpServer(HTTP_PORT, __dirname+"/html");
server.register("/stop-server",exit);
server.start();
//
// start udp receiver
const receiver = new udp.Receiver(UDP_PORT);
//
// open browser
const URL="http://localhost:"+HTTP_PORT+"/index.html";
exec('start /max '+URL);    

