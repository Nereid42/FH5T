const { constants } = require("crypto");
const http = require("http");
const { url } = require("inspector");
const fs = require('fs').promises;
const path = require('path');

const requestListener = function (req, res) {
    const url = req.url;
    const path = exports.WWW_ROOT + req.url; //.replace(/\//g,"\\");

    headerSecFetchDest = req.headers['sec-fetch-dest'];

    // check if file is existent
    fs.access(path, fs.constants.R_OK).then(
        () => {
            // file is existent
            //
            // check if css-style is requestet
            if(headerSecFetchDest == "style") {
                // set content to css
                res.setHeader("Content-Type", "text/css");
            }
            // check if image is requestet
            else if(headerSecFetchDest == "image") {
                // set content to image
                res.setHeader("Content-Type", "image");
            }
            // send text in all other cases
            else {
                // set content to text
                res.setHeader("Content-Type", "text/html");
            }
            // read and send file
            fs.readFile(path).then(contents => {
                res.writeHead(200);
                res.end(contents);    
        })
    }).catch(() => console.error('file '+path+" cannot be accessed"));  

    if(url=="/STOP") {
        console.log("STOP received");
        process.exit();        
    }
}

exports.WWW_ROOT = __dirname;

exports.HttpServer = class {
    constructor(port,root) {
        this.port = port;
        this.server = http.createServer(requestListener);
        this.running = false;
    }

    start() {
        if(!this.running) {
            this.running = true;
            this.server.listen(this.port, "127.0.0.1", () => {
                console.log("Server is running on http://${host}:${port}");
            });
        }
    }

    toString() {
        return "http server on 127.0.0.1, port "+this.port;
    }
    
}
