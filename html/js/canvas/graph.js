function fillCanvas(ctx) {
    ctx.fillStyle = "#FF0000";
    ctx.fillRect(0, 0, 150, 75);
}


function drawTelemetryAsBars(telemetry, canvas) {
    var w = canvas.width;
    var h = canvas.height;
    var dx = 2;
    var gap = 2;
    var x0 = 0;
    var botomMargin = 20;
    var y0 = h - botomMargin;
    var cnt = Math.min( w / (dx+gap), telemetry.size());
    if(telemetry.max > 0) {
        var dy = y0 / telemetry.max;
    }
    else {
        var dy = 0;
    }

    var ctx = canvas.getContext("2d");
    ctx.fillStyle = "#000000";
    ctx.fillRect(0, 0, w, h );
    ctx.fillStyle = "#FF0000";
    for(var i=0; i<cnt; i++) {
        var x = x0 + i * (dx+gap);
        var b = dy*telemetry.get(telemetry.size()-cnt+i);
        //console.log("draw "+i+" = " +telemetry.get(i)+ " at "+x+"/"+dx+ " b="+b+" y0="+y0);
        if(i==cnt-1) {
            ctx.fillStyle = "#9090FF";
        }
        ctx.fillRect(x, y0-b, dx, b );
    }

    // scale
    ctx.fillStyle = "#9090FF";
    ctx.fillRect(0, y0, w, 2 );    
    var marks = cnt/10;
    var mx = cnt*(dx+gap);
    var sdx = mx/marks;
    for(var i=0; i<marks; i++) {
        //console.log("mark at "+i*sdx+", marks="+marks);
        ctx.fillRect(i*sdx, y0, 2, 5);    
    }
    // 
    ctx.font = "14px sans serif";
    var dt = telemetry.getLastTime() - telemetry.getTime(telemetry.size()-cnt);;
    //console.log("dt="+dt);
    //console.log("dt-string="+millisAsString(dt));
    ctx.fillText(millisAsString(dt),2,h-2);
    if(mx >70) {
      ctx.fillText("00:00",mx-33,h-2);
    }

} 
