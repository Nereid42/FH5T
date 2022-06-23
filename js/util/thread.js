function delay(millis) {
    return new Promise(resolve => setTimeout(resolve, millis));
}

exports.sleep = async function(millis) {
    await delay(millis);
}