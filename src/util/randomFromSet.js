const R = require('ramda');

function getRndmFromSet() {
    const set = R.range(23, 28);
    const randomPosition = Math.floor(Math.random() * set.length);

    return set[randomPosition];
}

module.exports = { getWaitSeconds: getRndmFromSet };