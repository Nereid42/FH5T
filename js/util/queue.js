
exports.Blocking = class {
    constructor() {
        this.N = 0;
        this.data= [];
    }
  
    push(value) {
        //this.N++;
        //if(this.N%1000==0) {
            this.data.push(value);
        //}
    }
  
    pull() {
        return new Promise( async resolve => {
          while( this.data.length == 0 ) { 
            await new Promise(resolve => setTimeout(resolve, 10));
          }
          resolve(this.data.shift());
        } );
    }
  }