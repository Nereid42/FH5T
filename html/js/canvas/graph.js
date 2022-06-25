const BACKGROUND="#000000";
const BARCOLOR="#FF0000";
const ACTIVEBARCOLOR="#9090FF";
const AXISCOLOR="#9090FF";


function drawTelemetryAsBars(telemetry, canvas, max) {
    var w = canvas.width;
    var h = canvas.height;
    var dx = 2;
    var gap = 2;
    var x0 = 0;
    var botomMargin = 15;
    var y0 = h - botomMargin;
    var cnt = Math.min( w / (dx+gap), telemetry.size());
    if(max > 0) {
        var dy = y0 / max;
    }
    else {
        var dy = 0;
    }

    var ctx = canvas.getContext("2d");
    ctx.fillStyle = BACKGROUND;
    ctx.fillRect(0, 0, w, h );
    ctx.fillStyle = BARCOLOR;
    for(var i=0; i<cnt; i++) {
        var x = x0 + i * (dx+gap);
        var value = telemetry.get(telemetry.size()-cnt+i);
        var b = dy*value;
        if(i==cnt-1) {
            ctx.fillStyle = ACTIVEBARCOLOR;
        }
        ctx.fillRect(x, y0-b, dx, b );
    }

    // scale
    ctx.fillStyle = AXISCOLOR;
    ctx.fillRect(0, y0, w, 2 );    
    var marks = cnt/10;
    var mx = cnt*(dx+gap);
    var sdx = mx/marks;
    for(var i=0; i<marks; i++) {
        ctx.fillRect(i*sdx, y0, 2, 5);    
    }
    // 
    ctx.font = "11px sans serif";
    var dt = telemetry.getLastTime() - telemetry.getTime(telemetry.size()-cnt);;
    ctx.fillText(millisAsString(dt),2,h);
    if(mx >70) {
      ctx.fillText("00:00",mx-25,h);
    }

} 


function drawTelemetryAsCenteredBars(telemetry, canvas, max) {
    var w = canvas.width;
    var h = canvas.height;
    var dx = 2;
    var gap = 2;
    var x0 = 0;
    var botomMargin = 15;
    var y0 = h/2;
    var cnt = Math.min( w / (dx+gap), telemetry.size());
    if(max > 0) {
        var dy = y0 / max;
    }
    else {
        var dy = 0;
    }

    var ctx = canvas.getContext("2d");
    ctx.fillStyle = BACKGROUND;
    ctx.fillRect(0, 0, w, h);
    ctx.fillStyle = BARCOLOR;
    for(var i=0; i<cnt; i++) {
        var x = x0 + i * (dx+gap);
        var value = telemetry.get(telemetry.size()-cnt+i);
        var b = dy*value;
        if(i==cnt-1) {
            ctx.fillStyle = ACTIVEBARCOLOR;
        }
        ctx.fillRect(x, y0-b, dx, b );
    }

    // scale
    ctx.fillStyle = AXISCOLOR;
    ctx.fillRect(0, y0, w, 2 );    
    // 
    /*ctx.font = "11px sans serif";
    var dt = telemetry.getLastTime() - telemetry.getTime(telemetry.size()-cnt);;
    ctx.fillText(millisAsString(dt),2,h);
    if(mx >70) {
      ctx.fillText("00:00",mx-25,h);
    }*/

} 

