const udp = require("dgram");
const Buffer = require("buffer").Buffer;

exports.Fh5Datagram = class {
    constructor(buf) {
        this.data = [];
        this.buffer = buf;

        this.index=0;
        this.pos=0;
        // race & timestamp
        this.readInt(2);
        // rpm
        this.readFloatAsInt(3);
        // acceleration
        this.readFloat(3);
        // velocity
        this.readFloat(3);
        // angular velocity
        this.readFloat(3);
        // yaw, pitch, roll
        this.readFloat(3);
        // suspensiontravel
        this.readFloat(4);
        // tireslip
        this.readFloat(4);
        // wheel rotation
        this.readFloat(4);
        // wheel on rumble strip
        this.readInt(4);
        // wheel in puddle depth
        this.readInt(4);
        // surface rumble
        this.readFloat(4);
        // tire slip angle
        this.readFloat(4);
        // suspension travel meters
        this.readFloat(4);
        // car Id, class, performance index
        this.readInt(3)
        // drive train type
        this.readInt(1)
        // num cylinders
        this.readInt(1)
        // car category
        this.readInt(1)
        // unknown (crashing)
        this.readInt(1)
        // position x, y, z
        this.readFloat(3);

        // tire combined slip
        this.readFloat(4);
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