const R = require('ramda');

function getRndmFromSet() {
    const set = R.range(8, 16);
    const randomPosition = Math.floor(Math.random() * set.length);

    // return set[randomPosition];
    return 12;
}

module.exports = { getWaitSeconds: getRndmFromSet };