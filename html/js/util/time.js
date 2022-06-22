window.performance = window.performance || {};
performance.now = (function() {
    return performance.now       ||
        performance.mozNow    ||
        performance.msNow     ||
        performance.oNow      ||
        performance.webkitNow ||            
        Date.now  /*none found - fallback to browser default */
})();

function now() {
    return performance.now();
}

function millisAsString(millis) {
    var seconds = Math.trunc(millis / 1000);
    var minutes =  Math.trunc(seconds / 60);
    var ss = (seconds % 60).toString();
    if (ss.length<2) {
        ss = "0" + ss;
    }
    var mm = (minutes % 60).toString();
    if (mm.length<2) {
        mm = "0" + mm;
    }
    return mm+":"+ss;
}