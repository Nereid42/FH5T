const udp = require("dgram");
const Buffer = require("buffer").Buffer;

exports.Fh5Datagram = class {
    constructor(buf) {
        this.data = [];
        this.buffer = buf;

        this.index=0;
        this.pos=0;
        this.readInt(2);
        this.readFloatAsInt(3);
        this.readFloat(5);

        /*var index=0;
        this.isRaceOn = this.data[index++];
        this.timestampMS = this.data[index++];
        this.engineIdleRpm =  this.data[index++];
        this.engineMaxRpm = this.data[index++];
        this.currentEngineRpm = this.data[index++];
        this.accellerationX = this.data[index++];
        this.accellerationY = this.data[index++];
        this.accellerationZ = this.data[index++];
        this.velocityX = this.data[index++];
        this.velocityY = this.data[index++];*/
    }
    
    readInt(n) {
        for(var i=0; i<n; i++) {
            this.data[this.index++] = this.buffer.readInt32LE(this.pos);
            this.pos += 4;
        }
    }

    readFloat(n) {
        for(var i=0; i<n; i++) {
            this.data[this.index++] = this.buffer.readFloatLE(this.pos);
            this.pos += 4;
        }
    }    

    readFloatAsInt(n) {
        for(var i=0; i<n; i++) {
            this.data[this.index++] = Math.trunc(this.buffer.readFloatLE(this.pos)+0.5);
            this.pos += 4;
        }
    }    


    toString() {
        var result = "";
        for(var i=0; i<this.data.length; i++) {
            if(i>0) {
                result += " ";
            }
            result += this.data[i].toString();
        }
        return result;
    }
}

exports.Receiver = class {
    constructor(port,callback) {        
        this.server = udp.createSocket('udp4');
        this.server.on('message',function(msg,info){
            var fh5data = new exports.Fh5Datagram(msg);
            callback(fh5data);
        });
        this.server.bind(port,"127.0.0.1");
    }
}