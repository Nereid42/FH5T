const udp = require("dgram");
const Buffer = require("buffer").Buffer;

exports.Fh5Datagram = class {
    constructor(buf) {
        this.data = [];
        this.buffer = buf;

        this.index=0;
        this.pos=0;
        // 0-1 0 race & timestamp
        this.readInt32(2);
        // 2-4 8 rpm (current, idle, max)
        this.readFloatAsInt(3);
        // 5-7 20 acceleration (X,Y,Z)
        this.readFloat(3);
        // 8-10 32 velocity  (X,Y,Z)
        this.readFloat(3);
        // 11-13 44 angular velocity  (X,Y,Z)
        this.readFloat(3);
        // 14-16 56 yaw, pitch, roll
        this.readFloat(3);
        // 17-20 68 normalized suspensiontravel
        this.readFloat(4);
        // 21-24 84 tire slip ratio
        this.readFloat(4);
        // 25-28 100 wheel rotation
        this.readFloat(4);
        // 29-32 116 wheel on rumble strip
        this.readInt32(4);
        // 33-36 132 wheel in puddle depth
        this.readInt32(4);
        // 37-40 148 surface rumble
        this.readFloat(4);
        // 41-44 164 tire slip angle
        this.readFloat(4);
        // 45-48 180 tire combined slip
        this.readFloat(4);
        // 49-52 196 suspension travel meters
        this.readFloat(4);
        // 53-55 212 car id, car class, car performance index (OK)
        this.readInt32(3)
        // 56 224 drive train type
        this.readInt32(1)
        // 57 228 num cylinders
        this.readInt32(1)
        // 58 232 car category -- V2
        this.readInt32(1)
        // 59 236 unknown (crashing)
        this.readInt32(1)
        // 60-62 240 position x, y, z
        this.readFloat(3);
        // 63-65 252 speed, power, torque
        this.readFloat(3);
        // 66-69 264 tire temp
        this.readFloat(4);
        // 70-71 280 boost, fuel
        this.readFloat(2);
        // 72 288 distance traveled
        this.readFloat(1);
        // 73-75 292 best lap, last lab, current lap
        this.readFloat(3);
        // 76 304 current race time
        this.readFloat(1);
        // 77 308 lap numer
        this.readInt16(1);
        // 78 310 race position
        this.readInt8(1);
        // 79 311 throttle
        this.readInt8(1);
        // 80 312 brake
        this.readInt8(1);
        // 81 313 clutch
        this.readInt8(1);
        // 82 314 handbrake
        this.readInt8(1);
        // 83 315 gear
        this.readInt8(1);
        // 84-86 316 steer, driving lane, normalized brake diff
        this.readInt8(3);
        // 87 319 unknown
        this.readInt8(1);
        // 88 320 unknown
        this.readInt8(1);
        // 320
        console.log("end  at "+this.pos);

        

    }
    
    readInt32(n) {
        for(var i=0; i<n; i++) {
            this.data[this.index++] = this.buffer.readInt32LE(this.pos);
            this.pos += 4;
        }
    }

    readInt16(n) {
        for(var i=0; i<n; i++) {
            this.data[this.index++] = this.buffer.readInt16LE(this.pos);
            this.pos += 2;
        }
    }    

    readInt8(n) {
        for(var i=0; i<n; i++) {
            this.data[this.index++] = this.buffer.readInt8(this.pos);
            this.pos += 1;
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