const { constants } = require("crypto");
const http = require("http");
const { url } = require("inspector");
const fs = require('fs').promises;
const path = require('path');

exports.HttpServer = class {
    constructor(port,root) {
        this.root = root;
        this.port = port;
        this.running = false;
        this.registeredUrls = {};

        this.server = http.createServer( (request, response) => {
            const url = request.url;
    
            console.log("request "+url);

            var func =  this.registeredUrls[url];
            
            if(func !== undefined) {
                console.log("calling "+func.name);
                func(response);
            }
            else {
                this.processFileRequest(request, response);
            }
        });
    }

    processFileRequest(request, response) {
        const url = request.url;
        const path = this.root + request.url;

        console.log("file request "+url);
    
        var headerSecFetchDest = request.headers['sec-fetch-dest'];

        // check if file is existent
        fs.access(path, fs.constants.R_OK).then(
            () => {
                // file is existent
                //
                // check if css-style is requestet
                if(headerSecFetchDest == "style") {
                    // set content to css
                    response.setHeader("Content-Type", "text/css");
                }
                // check if image is requestet
                else if(headerSecFetchDest == "image") {
                    // set content to image
                    response.setHeader("Content-Type", "image");
                }
                // send text in all other cases
                else {
                    // set content to text
                    response.setHeader("Content-Type", "text/html");
                }
                // read and send file
                fs.readFile(path).then(contents => {
                    response.writeHead(200);
                    response.end(contents);    
            })
        }).catch(() => {
            console.error('file '+path+" cannot be accessed");
            response.writeHead(404);
            response.end();    
});  

    }


    start() {
        if(!this.running) {
            this.running = true;
            this.server.listen(this.port, "127.0.0.1", () => {
                console.log("Server is running on http://127.0.0.1:${this.port}");
            });
        }
    }

    register(url, func) {
        this.registeredUrls[url] = func;
    }

    toString() {
        return "http server on 127.0.0.1, port "+this.port;
    }
    
}
