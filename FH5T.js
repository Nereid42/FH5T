const http = require("./js/http/http.js");


console.log("FH5T");


function exit(response) {
    console.log("process exit");
    response.writeHead(200);
    response.end("server stopped");      
    process.exit();     
}

const server = new http.HttpServer(8000, __dirname+"/html");
server.register("/stop-server",exit);
server.start();