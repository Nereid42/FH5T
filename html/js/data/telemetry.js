const SAMPLE_COUNT = 5000;




class RingBuffer {
    constructor(capacity) {
        this.capacity = capacity;
        this.data = [];
        this.first = 0;
        this.next = 0;

        console.log("c --- "+this.data.length);
        for(var i=0; i< this.data.length; i++) {
            console.log("c ["+i+"] = "+this.data[i]);
        }        
    }    

    toString() {
        var sdata = "";
        for(var i=0; i< this.data.length; i++) {
            sdata = sdata + this.data[i] + "/";
        }        
        return "RingBuffer:"+this.first+":"+this.next+":"+this.data.length+":"+this.capacity+"="+sdata;
    }
    
    push(value) {
        if(this.data.length == this.capacity) {
            this.first++;
            if(this.first >= this.data.length) {
                this.first = 0;
            } 
        }
        this.data[this.next] = value;
        this.next++;
        if(this.next >= this.capacity) {
            this.next = 0;
        }

    }

    get(index) {
        if(this.data.length==0) return 0;

        if(this.data.length < this.capacity) {
            var pos = (this.first + index) % this.data.length;
        }
        else {
            var pos = (this.first + index) % this.capacity;
        }
        if(pos < this.data.length) {
            return this.data[pos];
        }
        return 0;
    }

    getFirst() {
        if(this.data.length==0) return 0;
        return this.data[this.first];
    }

    getLast() {
        if(this.data.length==0) return 0;
        var last = this.first - 1;
        if(last < 0) {
            last = this.data.length - 1;
        }
        return this.data[last];
    }

    size() {
        return  this.data.length;
    }

} 


class Telemetry {
    constructor(name) {
        this.name = name;
        this.data = new RingBuffer(SAMPLE_COUNT);
        this.timestamps = new RingBuffer(SAMPLE_COUNT);
        this.capacity = this.data.capacity;
        this.max = 0;
    }    

    toString() {
        var sdata = "";
        for(var i=0; i< this.data.size(); i++) {
            sdata = sdata + " " + this.data.get(i);
        }
        return "Telemetry:<"+this.name+"> ="+sdata+" > "+this.data;
    } 
    
    sample(sample) {
        this.data.push(sample);
        this.timestamps.push(now());
        if(sample > this.max) {
            this.max = sample;
        }
    }

    get(index) {
        return this.data.get(index);
    }

    getTime(index) {
        return this.timestamps.get(index);
    }

    getFirstTime() {
        return this.timestamps.getFirst();
    }

    getLastTime() {
        return this.timestamps.getLast();
    }

    size() {
        return this.data.size();
    }
}
