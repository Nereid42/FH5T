function delay(millis) {
    return new Promise(resolve => setTimeout(resolve, millis));
}

async function sleep(millis) {
    await delay(millis);
}