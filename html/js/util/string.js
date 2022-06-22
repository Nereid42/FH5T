function lpad(s,length,char) {
    while(s.length < length) {
        s = char + s;
    }
    return s;
}