const udp = require("dgram");

exports.Receiver = class {
    constructor(port) {
        this.server = udp.createSocket('udp4');
        this.server.on('message',function(msg,info){
            console.log('Data received from client : ' + msg.toString());
            console.log('Received %d bytes from %s:%d\n',msg.length, info.address, info.port);
          
        });
        this.server.bind(port);
    }
}