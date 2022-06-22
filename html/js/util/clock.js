function setclock() {
    const now = new Date();
    var seconds = now.getSeconds().toString();
    var minutes = now.getMinutes().toString();
    var hours = now.getHours().toString();
    var time = lpad(hours,2,"0")+":"+lpad(minutes,2,"0")+":"+lpad(seconds,2,"0")
    document.getElementById("clock").innerHTML = time;
}

function startclock() {
    setclock();        
    setInterval(() => {
        setclock();        
    }, 1000);
}