const udp = require("dgram");
const Buffer = require("buffer").Buffer;

exports.Fh5Datagram = class {
    constructor(buf) {
        this.isRaceOn = buf.readInt32LE(0);
        this.timestampMS = buf.readInt32LE(4);
        this.engineIdleRpm = buf.readFloatLE(8);
        this.engineMaxRpm = buf.readFloatLE(12);
        this.currentEngineRpm = buf.readFloatLE(16);
    }

    toString() {
        return "FH5D: race=" + this.isRaceOn + " / ts="+this.timestampMS  + " / EngMaxRpm=" + this.engineMaxRpm + " / EngIdleRpm=" + this.engineIdleRpm + " / EngCurRpm="+this.currentEngineRpm;
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